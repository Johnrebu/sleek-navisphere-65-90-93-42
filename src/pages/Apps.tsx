import { Grid2X2, ShoppingCart, ActivitySquare, Gamepad2, Trophy, CreditCard, Users, Gift, Settings, Mail, Bell, Clock, Star, Store, BookOpen, Wallet, PiggyBank, Briefcase, Search, Ticket, Calendar, Bitcoin, Globe, Heart, Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import { AppsHeader } from "@/components/apps/AppsHeader";
import { BannerSlider } from "@/components/BannerSlider";
import { FavoritesSection } from "@/components/apps/FavoritesSection";
import { AppGrid } from "@/components/apps/AppGrid";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { CategoryTabs } from "@/components/apps/CategoryTabs";
import { AppControls } from "@/components/apps/AppControls";
import { App, Category } from "@/components/apps/types";

const apps: App[] = [
  {
    name: "Evnto",
    description: "Discover and host amazing seminars & conferences",
    icon: Calendar,
    route: "/events",
    color: "bg-blue-500",
    category: "Business",
    status: "new",
    users: "5.2K+",
    lastUsed: "1 hour ago",
    rating: 4.8,
    updates: 2
  },
  {
    name: "Novus",
    description: "Premium newsletters for passionate readers",
    icon: Mail,
    route: "/newsletters",
    color: "bg-indigo-500",
    category: "Content",
    users: "8.7K+",
    rating: 4.6,
    updates: 1
  },
  {
    name: "Stash",
    description: "Buy and sell high-quality study notes",
    icon: BookOpen,
    route: "/study-notes",
    color: "bg-emerald-500",
    category: "Education",
    status: "popular",
    users: "16.3K+",
    lastUsed: "2 hours ago",
    rating: 4.9
  },
  {
    name: "Careo",
    description: "Support and manage nonprofit fundraising",
    icon: Heart,
    route: "/fundraising",
    color: "bg-pink-500",
    category: "Nonprofit",
    users: "4.8K+",
    rating: 4.7
  },
  {
    name: "Rise",
    description: "Smart investment platform for everyone",
    icon: PiggyBank,
    route: "/invest",
    color: "bg-purple-500",
    category: "Finance",
    status: "popular",
    users: "12.9K+",
    rating: 4.8,
    updates: 3
  },
  {
    name: "Druck",
    description: "Create and sell custom printed products",
    icon: Store,
    route: "/print",
    color: "bg-cyan-500",
    category: "Business",
    users: "7.1K+",
    rating: 4.5
  },
  {
    name: "Skilt",
    description: "Connect with top freelancers worldwide",
    icon: Briefcase,
    route: "/freelance",
    color: "bg-sky-500",
    category: "Work",
    status: "new",
    users: "7.3K+",
    lastUsed: "5 mins ago",
    rating: 4.7,
    updates: 2
  },
  {
    name: "Vocar",
    description: "Find your dream job opportunity",
    icon: Search,
    route: "/jobs",
    color: "bg-purple-500",
    category: "Work",
    users: "18.9K+",
    rating: 4.8,
    updates: 1
  },
  {
    name: "GoTix",
    description: "Book tickets for events and shows",
    icon: Ticket,
    route: "/tickets",
    color: "bg-yellow-500",
    category: "Entertainment",
    status: "popular",
    users: "21.4K+",
    lastUsed: "3 hours ago",
    rating: 4.9
  },
  {
    name: "Resby",
    description: "Easy scheduling and booking platform",
    icon: Calendar,
    route: "/booking",
    color: "bg-green-500",
    category: "Business",
    users: "11.2K+",
    rating: 4.6
  },
  {
    name: "TrdeX",
    description: "Trade cryptocurrencies securely",
    icon: Bitcoin,
    route: "/crypto",
    color: "bg-orange-500",
    category: "Finance",
    status: "popular",
    users: "14.7K+",
    rating: 4.8,
    updates: 3
  },
  {
    name: "Tribr",
    description: "Build and manage your community",
    icon: Globe,
    route: "/community",
    color: "bg-indigo-500",
    category: "Social",
    users: "9.8K+",
    rating: 4.7
  },
  {
    name: "Shopr",
    description: "Your ultimate marketplace for buying and selling",
    icon: Store,
    route: "/marketplace",
    color: "bg-emerald-500",
    category: "Shopping",
    status: "popular",
    users: "12.5K+",
    lastUsed: "2 hours ago",
    rating: 4.8,
    updates: 2
  },
  {
    name: "Winnr",
    description: "Compete in tournaments and win prizes",
    icon: Trophy,
    route: "/tournaments",
    color: "bg-amber-500",
    category: "Gaming",
    status: "popular",
    users: "8.2K+",
    lastUsed: "1 day ago",
    rating: 4.7,
    updates: 1
  },
  {
    name: "LernX",
    description: "Learn new skills with interactive online courses",
    icon: BookOpen,
    route: "/courses",
    color: "bg-blue-500",
    category: "Education",
    users: "15.3K+",
    rating: 4.9
  },
  {
    name: "Zendy",
    description: "Fast and secure money transfers worldwide",
    icon: Wallet,
    route: "/transfer",
    color: "bg-violet-500",
    category: "Finance",
    users: "9.1K+",
    rating: 4.6,
    updates: 3
  },
  {
    name: "FundX",
    description: "Crowdfunding platform for innovative projects",
    icon: PiggyBank,
    route: "/crowdfunding",
    color: "bg-rose-500",
    category: "Finance",
    users: "6.8K+",
    rating: 4.5
  },
  {
    name: "Games",
    description: "Play your favorite games",
    icon: Gamepad2,
    route: "/games-pages",
    color: "bg-violet-500",
    category: "Entertainment"
  },
  {
    name: "Activity",
    description: "Track your gaming stats",
    icon: ActivitySquare,
    route: "/activity",
    color: "bg-rose-500",
    category: "Analytics"
  },
  {
    name: "Social",
    description: "Connect with friends",
    icon: Users,
    route: "/social",
    color: "bg-pink-500",
    category: "Social"
  },
  {
    name: "Payments",
    description: "Manage transactions",
    icon: CreditCard,
    route: "/payments",
    color: "bg-indigo-500",
    category: "Finance"
  },
  {
    name: "Rewards",
    description: "Claim your rewards",
    icon: Gift,
    route: "/rewards",
    color: "bg-orange-500",
    category: "Rewards"
  },
  {
    name: "Messages",
    description: "Chat with others",
    icon: Mail,
    route: "/messages",
    color: "bg-teal-500",
    category: "Communication"
  },
  {
    name: "Notifications",
    description: "Stay updated",
    icon: Bell,
    route: "/notifications",
    color: "bg-cyan-500",
    category: "Updates"
  },
  {
    name: "Settings",
    description: "Customize your experience",
    icon: Settings,
    route: "/settings",
    color: "bg-gray-600",
    category: "System"
  }
];

const categories: Category[] = [
  { id: "all", label: "All Apps", icon: Grid2X2, count: apps.length },
  { id: "recent", label: "Recent", icon: Clock, count: apps.filter(app => app.status === "new").length },
  { id: "popular", label: "Popular", icon: Star, count: apps.filter(app => app.status === "popular").length },
  { id: "favorites", label: "Favorites", icon: Star }
];

const appCategories = [
  "All",
  "Shopping",
  "Finance",
  "Entertainment",
  "Gaming",
  "Analytics",
  "Social",
  "Communication",
  "System",
  "Education",
  "Work",
  "Business",
  "Content",
  "Nonprofit"
];

export default function Apps() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "rating" | "users">("name");
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteApps");
    return saved ? JSON.parse(saved) : [];
  });
  const [showUpdatesOnly, setShowUpdatesOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem("favoriteApps", JSON.stringify(favorites));
  }, [favorites]);

  const filteredApps = apps.filter(app => {
    if (showUpdatesOnly) return app.updates > 0;
    if (activeTab === "favorites") return favorites.includes(app.name);
    if (activeTab === "popular") return app.status === "popular";
    if (activeTab === "recent") return app.status === "new";
    if (selectedCategory !== "All") return app.category === selectedCategory;
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "users":
        return (b.users?.replace("K+", "000") || "0").localeCompare(a.users?.replace("K+", "000") || "0");
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleToggleFavorite = (appName: string) => {
    setFavorites(prev => 
      prev.includes(appName) 
        ? prev.filter(name => name !== appName)
        : [...prev, appName]
    );
  };

  const favoriteApps = apps.filter(app => favorites.includes(app.name));
  const updatesCount = apps.filter(app => app.updates > 0).length;

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden">
      <AppsHeader onOpenSearch={() => setIsSearchOpen(true)} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="bg-gradient-to-b from-gray-50 to-white">
          <BannerSlider />
          
          <div className="max-w-7xl mx-auto px-4">
            <div className="py-8">
              <FavoritesSection favoriteApps={favoriteApps} />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex-1 min-w-0">
                  <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <CategoryTabs categories={categories} />
                  </Tabs>
                </div>

                <div className="flex-shrink-0">
                  <AppControls
                    selectedCategory={selectedCategory}
                    viewMode={viewMode}
                    showUpdatesOnly={showUpdatesOnly}
                    updatesCount={updatesCount}
                    categories={appCategories}
                    onCategoryChange={setSelectedCategory}
                    onSortChange={setSortBy}
                    onViewModeChange={setViewMode}
                    onUpdatesToggle={() => setShowUpdatesOnly(!showUpdatesOnly)}
                  />
                </div>
              </div>

              <AppGrid 
                apps={filteredApps}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                viewMode={viewMode}
              />
            </div>
          </div>
        </div>
      </div>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        apps={apps}
      />
    </div>
  );
}
