import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import ProductCard from './ProductCard';

// Типы для размеров памятников
type MonumentSize = 'стела' | 'тумба' | 'цветник';

interface SizeVariant {
  id: string;
  dimensions: string;
  priceModifier: number;
}

interface SizeOption {
  value: MonumentSize;
  label: string;
  variants: SizeVariant[];
}

interface Monument {
  id: number;
  title: string;
  subtitle?: string;
  price: string;
  originalPrice?: string | null;
  image: string;
  material: string;
  category: string;
  dimensions?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

interface ProductGridProps {
  monuments: Monument[];
  sizeOptions: SizeOption[];
  selectedSizes: Record<string, MonumentSize>;
  selectedVariants: Record<string, string>;
  onSizeChange: (monumentId: string, size: MonumentSize) => void;
  onVariantChange: (monumentId: string, variantId: string) => void;
  getCurrentPrice: (monument: Monument, monumentId: string) => number;
  getSelectedSize: (monumentId: string) => MonumentSize;
  getSelectedVariant: (monumentId: string) => string;
  onResetFilters: () => void;
}

export default function ProductGrid({
  monuments,
  sizeOptions,
  selectedSizes,
  selectedVariants,
  onSizeChange,
  onVariantChange,
  getCurrentPrice,
  getSelectedSize,
  getSelectedVariant,
  onResetFilters
}: ProductGridProps) {
  return (
    <section className="pb-16 px-4">
      <div className="container mx-auto">
        <div>
          {/* Results header */}
          <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <h2 className="font-heading text-xl font-semibold text-muted-foreground">
                Страница 1 из 1 (Количество товаров: {monuments.length} шт.)
              </h2>
            </div>
            <Select defaultValue="popular">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">По популярности</SelectItem>
                <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                <SelectItem value="newest">Сначала новые</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-0">
            {monuments.map(monument => (
              <ProductCard
                key={monument.id}
                monument={monument}
                sizeOptions={sizeOptions}
                selectedSize={getSelectedSize(monument.id)}
                selectedVariant={getSelectedVariant(monument.id)}
                currentPrice={getCurrentPrice(monument, monument.id)}
                onSizeChange={(size) => onSizeChange(monument.id, size)}
                onVariantChange={(variantId) => onVariantChange(monument.id, variantId)}
              />
            ))}
          </div>

          {/* No results */}
          {monuments.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-semibold mb-2">
                Не найдено памятников по выбранным фильтрам
              </h3>
              <p className="text-muted-foreground mb-6">
                Попробуйте изменить параметры поиска или сбросить фильтры
              </p>
              <Button onClick={onResetFilters}>
                Сбросить фильтры
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}