
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryTabsProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'home', label: 'Home' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'sports', label: 'Sports' },
  { id: 'beauty', label: 'Beauty' },
];

export const CategoryTabs = ({
  selectedCategory,
  setSelectedCategory,
}: CategoryTabsProps) => {
  return (
    <Tabs 
      defaultValue="all" 
      className="w-full"
      value={selectedCategory}
      onValueChange={setSelectedCategory}
    >
      <div className="relative">
        <ScrollArea className="w-full">
          <TabsList className="w-full inline-flex h-11 items-center justify-start gap-2 rounded-lg bg-gray-100/50 p-1 font-medium">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm hover:bg-white/50"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>
      </div>
    </Tabs>
  );
};

export { categories };

