import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Shield, Search } from 'lucide-react';
import { FloatingProgress } from '@/components/campaign/FloatingProgress';
import { FAQsTab } from '@/components/product/tabs/FAQsTab';
import { HeroSection } from '@/components/landing/HeroSection';
import { RewardsSection } from '@/components/landing/RewardsSection';
import { TabNav } from '@/components/landing/TabNav';
import { UpdatesTab } from '@/components/landing/UpdatesTab';
import { CommentsTab } from '@/components/landing/CommentsTab';
import { Input } from "@/components/ui/input";
import { VideoSection } from '@/components/landing/VideoSection';

export default function Landing() {
  const [progress, setProgress] = useState(65);
  const [backers, setBackers] = useState(824);
  const [days, setDays] = useState(14);
  const [raised, setRaised] = useState(32500);
  const [goal, setGoal] = useState(50000);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const rewards = [
    {
      title: "Early Bird",
      price: 25,
      description: "Get early access to our product and a special thank you in our digital booklet.",
      claimed: 342,
      limit: 500
    },
    {
      title: "Premium Supporter",
      price: 75,
      description: "Receive the product with exclusive features and a mention on our website.",
      claimed: 215,
      limit: 300
    },
    {
      title: "VIP Backer",
      price: 150,
      description: "Get our limited edition product, a signed thank you card, and join our virtual launch party.",
      claimed: 98,
      limit: 150
    },
    {
      title: "Founding Member",
      price: 500,
      description: "Everything in VIP plus a consultation call with our team and your name engraved on our 'Founders Wall'.",
      claimed: 12,
      limit: 20
    }
  ];

  return (
    <div className="font-sans">
      {/* Search Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg">
        <div className="px-4 py-2">
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              type="search"
              placeholder="Search updates, comments, or FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 h-9 bg-gray-50/50 border-0 focus:bg-white transition-colors text-sm"
            />
          </div>
        </div>
      </div>

      {/* Sticky Tabs Navigation */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabNav activeTab={activeTab} />

          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="overview" className="mt-0">
                  <VideoSection />
                  <div className="container mx-auto">
                    <HeroSection backers={backers} />
                    <RewardsSection rewards={rewards} />
                  </div>
                </TabsContent>

                <TabsContent value="updates" className="mt-6 container mx-auto">
                  <UpdatesTab />
                </TabsContent>

                <TabsContent value="comments" className="mt-6">
                  <CommentsTab />
                </TabsContent>

                <TabsContent value="faqs" className="mt-6 container mx-auto">
                  <FAQsTab />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs>
      </div>

      {/* Progress Bar */}
      <FloatingProgress
        backers={backers}
        progress={progress}
        days={days}
        raised={raised}
        goal={goal}
      />
      
      {/* Add padding at the bottom of the page to prevent content from being hidden behind the fixed bar */}
      <div className="pb-32" />

      {/* Trust Indicators */}
      <div className="fixed bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg flex items-center text-sm">
        <Shield className="text-green-600 mr-2 h-5 w-5" />
        <span>Secure Payments</span>
      </div>
    </div>
  );
}
