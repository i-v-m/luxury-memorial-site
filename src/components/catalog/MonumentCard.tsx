import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { Monument } from './CatalogData';

interface MonumentCardProps {
  monument: Monument;
  onAddToFavorites: (monument: Monument) => void;
  onAddToComparison: (monument: Monument) => void;
  isInFavorites: (id: number) => boolean;
  isInComparison: (id: number) => boolean;
}

export default function MonumentCard({
  monument,
  onAddToFavorites,
  onAddToComparison,
  isInFavorites,
  isInComparison
}: MonumentCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg md:hover:shadow-xl transition-shadow group">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={monument.image}
          alt={monument.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 md:top-3 left-2 md:left-3 flex gap-1 md:gap-2">
          {monument.isNew && (
            <Badge className="bg-green-600 hover:bg-green-700 text-xs px-2 py-1">Новинка</Badge>
          )}
          {monument.isPopular && (
            <Badge className="bg-orange-500 hover:bg-orange-600 text-xs px-2 py-1">Популярный</Badge>
          )}
        </div>
        {monument.originalPrice && (
          <div className="absolute top-2 md:top-3 right-2 md:right-3">
            <Badge variant="destructive" className="text-xs px-2 py-1">Скидка</Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2 p-3 md:p-4">
        <CardTitle className="font-heading text-sm sm:text-base md:text-lg line-clamp-2">
          {monument.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-2 md:space-y-3 p-3 md:p-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="text-base sm:text-lg md:text-xl font-bold text-primary">{monument.price}</span>
            {monument.originalPrice && (
              <span className="text-xs sm:text-sm md:text-sm line-through text-muted-foreground">
                {monument.originalPrice}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-1 md:gap-2">
          <Button 
            size="sm"
            className="flex-1 bg-primary hover:bg-primary/90 h-8 sm:h-9 md:h-9 text-xs sm:text-sm md:text-sm px-2 md:px-3"
            asChild
          >
            <Link to={`/product/${monument.id}`}>
              Подробнее
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => onAddToFavorites(monument)}
            className={`h-8 w-8 sm:h-9 sm:w-9 md:h-9 md:w-9 ${isInFavorites(monument.id) ? "text-red-500" : ""}`}
          >
            <Icon 
              name="Heart" 
              size={16} 
              className={`sm:size-18 md:size-18 ${isInFavorites(monument.id) ? "fill-current" : ""}`} 
            />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => onAddToComparison(monument)}
            className={`h-8 w-8 sm:h-9 sm:w-9 md:h-9 md:w-9 ${isInComparison(monument.id) ? "text-blue-500" : ""}`}
          >
            <Icon name="BarChart3" size={16} className="sm:size-18 md:size-18" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}