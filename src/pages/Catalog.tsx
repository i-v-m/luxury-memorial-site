import { useState } from 'react';
import Layout from '@/components/Layout';
import CatalogHeader from '@/components/catalog/CatalogHeader';
import CatalogFilters from '@/components/catalog/CatalogFilters';
import ProductGrid from '@/components/catalog/ProductGrid';
import CatalogPagination from '@/components/catalog/CatalogPagination';
import CatalogAbout from '@/components/catalog/CatalogAbout';
import CustomOrderBanner from '@/components/catalog/CustomOrderBanner';
import { monuments, sizeOptions, type MonumentSize, type Monument } from '@/components/catalog/CatalogData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Catalog() {
  const [selectedForm, setSelectedForm] = useState('all');
  const [selectedRecipient, setSelectedRecipient] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  // Состояние для выбранных размеров и вариантов каждого товара
  const [selectedSizes, setSelectedSizes] = useState<Record<string, MonumentSize>>({});
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(true);

  // Функции для работы с размерами
  const handleSizeChange = (monumentId: string, size: MonumentSize) => {
    setSelectedSizes(prev => ({ ...prev, [monumentId]: size }));
    // Сбрасываем выбранный вариант при смене типа
    const sizeOption = sizeOptions.find(opt => opt.value === size);
    if (sizeOption) {
      setSelectedVariants(prev => ({ ...prev, [monumentId]: sizeOption.variants[0].id }));
    }
  };

  const handleVariantChange = (monumentId: string, variantId: string) => {
    setSelectedVariants(prev => ({ ...prev, [monumentId]: variantId }));
  };

  const getSelectedSize = (monumentId: string): MonumentSize => {
    return selectedSizes[monumentId] || 'стела';
  };

  const getSelectedVariant = (monumentId: string): string => {
    const selectedSize = getSelectedSize(monumentId);
    const sizeOption = sizeOptions.find(opt => opt.value === selectedSize);
    return selectedVariants[monumentId] || sizeOption?.variants[0].id || '';
  };

  const getCurrentPrice = (monument: Monument, monumentId: string): number => {
    const variantId = getSelectedVariant(monumentId);
    const basePrice = parseInt(monument.price.replace(/[^\d]/g, ''));
    
    for (const sizeOption of sizeOptions) {
      const variant = sizeOption.variants.find(v => v.id === variantId);
      if (variant) {
        return Math.round(basePrice * variant.priceModifier);
      }
    }
    return basePrice;
  };

  const filteredMonuments = monuments.filter(monument => {
    const formMatch = selectedForm === 'all' || monument.category === selectedForm;
    // Пока все памятники подходят для всех категорий получателей
    const recipientMatch = selectedRecipient === 'all' || true;
    
    let priceMatch = true;
    if (selectedPrice !== 'all') {
      const price = parseInt(monument.price.replace(/[^\d]/g, ''));
      switch (selectedPrice) {
        case 'budget':
          priceMatch = price <= 30000;
          break;
        case 'medium':
          priceMatch = price > 30000 && price <= 60000;
          break;
        case 'premium':
          priceMatch = price > 60000 && price <= 100000;
          break;
        case 'luxury':
          priceMatch = price > 100000;
          break;
      }
    }
    
    return formMatch && recipientMatch && priceMatch;
  });

  const handleResetFilters = () => {
    setSelectedForm('all');
    setSelectedRecipient('all');
    setSelectedPrice('all');
  };

  const handleLoadMore = () => {
    console.log('Loading more items...');
    if (currentPage >= 8) {
      setShowLoadMore(false);
    }
  };

  return (
    <Layout>
      <div className="bg-background">
        <CatalogHeader />
        
        <CatalogFilters
          selectedForm={selectedForm}
          selectedRecipient={selectedRecipient}
          selectedPrice={selectedPrice}
          onFormChange={setSelectedForm}
          onRecipientChange={setSelectedRecipient}
          onPriceChange={setSelectedPrice}
          onReset={handleResetFilters}
        />

        <ProductGrid
          monuments={filteredMonuments}
          sizeOptions={sizeOptions}
          selectedSizes={selectedSizes}
          selectedVariants={selectedVariants}
          onSizeChange={handleSizeChange}
          onVariantChange={handleVariantChange}
          getCurrentPrice={getCurrentPrice}
          getSelectedSize={getSelectedSize}
          getSelectedVariant={getSelectedVariant}
          onResetFilters={handleResetFilters}
        />

        <CatalogPagination
          currentPage={currentPage}
          showLoadMore={showLoadMore}
          onPageChange={setCurrentPage}
          onLoadMore={handleLoadMore}
        />

        <CatalogAbout />
        
        <CustomOrderBanner />

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h3 className="font-heading text-4xl font-bold mb-4">Часто задаваемые вопросы</h3>
              <p className="text-xl text-muted-foreground">Ответы на популярные вопросы об изготовлении памятников</p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="materials" className="border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Какие материалы используются для изготовления памятников?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  <p className="mb-4">Мы используем только премиальные материалы высочайшего качества:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li><strong>Гранит габбро-диабаз</strong> — самый прочный и долговечный материал, устойчив к любым погодным условиям</li>
                    <li><strong>Красный гранит (Лезники)</strong> — благородный материал с натуральным рисунком</li>
                    <li><strong>Серый гранит (Возрождение)</strong> — элегантный материал с равномерной текстурой</li>
                    <li><strong>Итальянский мрамор Каррара</strong> — премиум материал для эксклюзивных проектов</li>
                    <li><strong>Бронзовые элементы</strong> — для декоративных деталей и надписей</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="production-time" className="border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Сколько времени занимает изготовление памятника?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  <p>Стандартные памятники изготавливаются за 14-21 рабочий день. Сложные проекты требуют 25-40 рабочих дней. В сезон высокой загруженности (весна-лето) сроки могут увеличиваться до 30-45 дней. Точные сроки сообщаем при заказе.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="portrait-engraving" className="border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Как происходит гравировка портрета на памятнике?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  <p>Мы предлагаем два способа гравировки портретов: лазерную и ручную. Лазерная гравировка — современная технология с высокой детализацией, точной передачей деталей и полутонов, долговечностью изображения и быстрым выполнением (2-3 дня). Ручная гравировка — художественная работа мастера-гравёра, которая обеспечивает уникальность каждого портрета, живую объёмную передачу черт и эксклюзивность исполнения.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="installation" className="border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Включена ли установка памятника в стоимость?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  <p>Да, установка включена в стоимость памятника и включает: подготовку фундамента, доставку на кладбище, монтаж всех элементов, финальную обработку, уборку территории и гарантию 10 лет. Установка выполняется только нашими сертифицированными мастерами с опытом работы более 5 лет.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="price-factors" className="border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  От чего зависит стоимость памятника?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  <p>Цена зависит от размера, материала (гранит, мрамор, бронза), сложности оформления и дополнительных услуг.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </div>
    </Layout>
  );
}