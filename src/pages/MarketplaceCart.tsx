import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, X, ArrowLeft, ChevronRight, Tag, CreditCard, Shield, Truck, Clock, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MarketplaceNav } from "@/components/marketplace/MarketplaceNav";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color: string;
  size: string;
  seller: {
    name: string;
    verified: boolean;
  };
  deliveryEstimate: string;
}

const initialItems: CartItem[] = [
  {
    id: "1",
    name: "Gaming Chair XR-500",
    price: 299,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300",
    quantity: 1,
    color: "Black",
    size: "Standard",
    seller: {
      name: "Pro Gaming Store",
      verified: true
    },
    deliveryEstimate: "2-4 business days"
  },
  {
    id: "2",
    name: "Mechanical Keyboard K95",
    price: 159,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300",
    quantity: 2,
    color: "RGB",
    size: "Full",
    seller: {
      name: "Pro Gaming Store",
      verified: true
    },
    deliveryEstimate: "1-2 business days"
  }
];

export default function MarketplaceCart() {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = isPromoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 500 ? 0 : 15;
  const total = subtotal - discount + shipping;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
    toast("Cart updated");
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast("Item removed from cart");
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "summer10") {
      setIsPromoApplied(true);
      toast.success("Promo code applied successfully!");
    } else {
      toast.error("Invalid promo code");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold">Shopping Cart</h1>
          </div>
        </div>
        
        <div className="px-4 py-12 text-center pt-[80px]">
          <div className="max-w-md mx-auto">
            <div className="mb-6 p-8 rounded-full bg-gray-100 inline-flex">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button
              className="w-full"
              onClick={() => navigate('/marketplace')}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
        <MarketplaceNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Shopping Cart ({items.length})</h1>
        </div>
      </div>

      {/* Content */}
      <div className="pt-[60px] pb-[180px]">
        <div className="px-4 py-6 space-y-6">
          {/* Cart Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <Card
                key={item.id}
                className="p-4 animate-fade-in border-none shadow-lg"
              >
                <div className="flex gap-4">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="absolute -top-2 -right-2">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-6 w-6 rounded-full"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div>
                      <h3 className="font-medium truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {item.color} · {item.size}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {item.deliveryEstimate}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-semibold">${item.price * item.quantity}</span>
                        <span className="text-xs text-gray-500">${item.price} each</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Promo Code */}
          <Card className="p-4 border-none shadow-lg">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                variant={isPromoApplied ? "secondary" : "default"}
                size="sm"
                onClick={applyPromoCode}
                disabled={isPromoApplied}
              >
                {isPromoApplied ? "Applied" : "Apply"}
              </Button>
            </div>
            {isPromoApplied && (
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <Badge className="h-4 bg-green-100 text-green-600 hover:bg-green-100">10% OFF</Badge>
                Promo code applied successfully!
              </p>
            )}
          </Card>

          {/* Order Summary */}
          <Card className="border-none shadow-lg overflow-hidden">
            <div className="p-4">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
                </div>
                <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50/50 px-4 py-3 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Shield className="h-3.5 w-3.5" />
                <span>Secure checkout with buyer protection</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-white/95">
        <Button 
          className="w-full h-12 text-base flex items-center justify-between px-6"
          onClick={() => {
            toast.success("Proceeding to checkout...");
            navigate('/checkout');
          }}
        >
          <span className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Proceed to Checkout
          </span>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Truck className="h-4 w-4 text-gray-400" />
          <p className="text-xs text-gray-500">
            Free shipping on orders over $500
          </p>
        </div>
      </div>

      <MarketplaceNav />
    </div>
  );
}
