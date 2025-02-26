
import React from 'react';
import { GameEvent } from '@/types/game';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Star, PlayCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface EventsSectionProps {
  events: GameEvent[];
  isLoading?: boolean;
}

const EventsSection: React.FC<EventsSectionProps> = ({ events, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mb-8">
        <Skeleton className="h-8 w-64 mx-4 mb-4" />
        <ScrollArea className="w-full" type="scroll">
          <div className="flex px-4 gap-4 pb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-none w-[280px]">
                <div className="relative rounded-2xl overflow-hidden">
                  <Skeleton className="w-full aspect-[16/9]" />
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <Skeleton className="w-10 h-10 rounded-xl" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="w-20 h-8" />
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-medium text-gray-900 px-4 mb-4">Events happening now</h2>
      <ScrollArea className="w-full" type="scroll">
        <div className="flex px-4 gap-4 pb-4">
          {events.map(event => (
            <div key={event.id} className="flex-none w-[280px]">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
                <div className="absolute top-2 left-2 z-10">
                  <Badge className="bg-black/50 text-white border-none backdrop-blur-sm text-xs">
                    Ends in {event.endsIn}
                  </Badge>
                </div>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full aspect-[16/9] object-cover mix-blend-overlay"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="text-base font-bold mb-1 line-clamp-1">{event.title}</h3>
                  <p className="text-xs opacity-90 line-clamp-2 mb-1">
                    {event.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <img
                  src={event.gameIcon}
                  alt={event.gameTitle}
                  className="w-10 h-10 rounded-xl"
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate text-sm">
                    {event.gameTitle}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="truncate">{event.developer}</span>
                    <span>•</span>
                    <div className="flex items-center gap-0.5">
                      <span>{event.rating}</span>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="h-8 bg-indigo-600 hover:bg-indigo-700 text-xs font-medium transition-colors duration-200 flex items-center gap-1"
                >
                  <PlayCircle className="w-3 h-3" />
                  Demo
                </Button>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default EventsSection;
