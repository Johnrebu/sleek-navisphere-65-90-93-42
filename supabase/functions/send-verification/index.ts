
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from "npm:resend@2.0.0"
import { Twilio } from "npm:twilio@4.22.0"

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
const twilio = new Twilio(
  Deno.env.get('TWILIO_ACCOUNT_SID') || '',
  Deno.env.get('TWILIO_AUTH_TOKEN') || ''
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  let supabaseClient;

  try {
    const { email, phoneNumber, method } = await req.json()
    const verificationCode = generateVerificationCode()
    const contactMethod = method === 'email' ? email : phoneNumber
    
    console.log(`Generating verification code for ${method}:`, contactMethod);
    console.log('Generated code:', verificationCode);
    
    supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()
    console.log('Expiration time:', expiresAt);

    // First, invalidate all existing unverified codes for this contact method
    console.log('Invalidating old codes for:', contactMethod);
    const { error: invalidateError } = await supabaseClient
      .from('verification_codes')
      .update({ verified: true })
      .eq(method === 'email' ? 'email' : 'phone', contactMethod)
      .eq('verified', false);

    if (invalidateError) {
      console.error('Error invalidating old codes:', invalidateError);
      throw invalidateError;
    }
    console.log('Successfully invalidated old codes');

    // Store verification code
    const { data: insertData, error: dbError } = await supabaseClient
      .from('verification_codes')
      .insert({
        [method === 'email' ? 'email' : 'phone']: contactMethod,
        code: verificationCode,
        expires_at: expiresAt,
        verified: false
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database insertion error:', dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log('Verification code stored successfully:', insertData);

    // Send verification code based on method
    if (method === 'email') {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Your Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Verification Code</h2>
            <p>Your verification code is:</p>
            <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
              <strong>${verificationCode}</strong>
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
          </div>
        `
      });

      if (emailError) {
        console.error('Email sending error:', emailError);
        throw new Error(`Email error: ${emailError.message}`);
      }
      console.log('Email sent successfully:', emailData);
    } else {
      // Send SMS via Twilio
      const { sid: smsData, error: smsError } = await twilio.messages.create({
        body: `Your verification code is: ${verificationCode}. This code will expire in 10 minutes.`,
        to: phoneNumber,
        from: Deno.env.get('TWILIO_PHONE_NUMBER') || '',
      });

      if (smsError) {
        console.error('SMS sending error:', smsError);
        throw new Error(`SMS error: ${smsError}`);
      }
      console.log('SMS sent successfully:', smsData);
    }

    return new Response(
      JSON.stringify({ message: 'Verification code sent successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in send-verification function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  } finally {
    if (supabaseClient) {
      try {
        await supabaseClient.auth.signOut();
      } catch (error) {
        console.error('Error cleaning up Supabase client:', error);
      }
    }
  }
})
