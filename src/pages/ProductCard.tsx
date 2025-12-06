import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import Layout from '@/components/Layout';
import { useApp } from '@/contexts/AppContext';

export default function ProductCard() {
  const { addToCart } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState('granite-black');
  const [selectedElements, setSelectedElements] = useState({
    stela: { enabled: true, size: 'standard' },
    tumba: { enabled: false, size: 'standard' },
    cvetnik: { enabled: false, size: 'standard' }
  });
  const [selectedServices, setSelectedServices] = useState<string[]>(['gravir-epitafiya', 'gravir-cvety']);
  const [serviceQuantities, setServiceQuantities] = useState<Record<string, number>>({
    'portrait-gravir': 1,
    'portrait-hand': 1,
    'fio-gravir': 1,
    'fio-skarpel': 1
  });
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const getTotalPrice = () => {
    const selectedMaterialData = materials.find(m => m.id === selectedMaterial);
    const materialPrice = selectedMaterialData?.price || 0;
    
    const elementsPrice = Object.entries(selectedElements)
      .filter(([, config]) => config.enabled)
      .reduce((total, [elementId, config]) => {
        const element = monumentElements[elementId as keyof typeof monumentElements];
        const size = element.sizes.find(s => s.id === config.size);
        return total + (size?.price || 0);
      }, 0);
    
    const servicesPrice = [
      { id: 'portrait-gravir', price: 8000 },
      { id: 'portrait-hand', price: 15000 },
      { id: 'fio-gravir', price: 2000 },
      { id: 'fio-skarpel', price: 4000 },
      { id: 'fio-gold', price: 6000 },
      { id: 'gravir-cross', price: 3000 },
      { id: 'gravir-cvety', price: 0 },
      { id: 'gravir-epitafiya', price: 0 },
      { id: 'gravir-vinetka', price: 2500 },
      { id: 'gravir-svechi', price: 1500 },
      { id: 'gravir-ikona', price: 5000 },
      { id: 'gravir-kartinka', price: 3500 },
      { id: 'retush-photo', price: 1000 },
      { id: 'protection', price: 4000 },
      { id: 'storage', price: 500 }
    ]
      .filter(service => selectedServices.includes(service.id))
      .reduce((total, service) => {
        const quantity = serviceQuantities[service.id] || 1;
        return total + (service.price * quantity);
      }, 0);
    
    return product.basePrice + materialPrice + elementsPrice + servicesPrice;
  };

  const handleAddToCart = () => {
    const selectedMaterialData = materials.find(m => m.id === selectedMaterial);
    
    addToCart({
      id: product.id,
      title: product.title,
      price: getTotalPrice(),
      image: product.images[0],
      category: 'vertical',
      quantity: quantity,
      selectedMaterial: selectedMaterialData?.name,
      selectedSize: 'standard'
    });
  };

  const product = {
    id: 1,
    title: 'Классический вертикальный памятник',
    subtitle: 'Модель "Традиция"',
    basePrice: 45000,
    originalPrice: 52000,
    isNew: false,
    isPopular: true,
    rating: 4.8,
    reviewsCount: 24,
    images: [
      'https://cdn.poehali.dev/files/f8c87ddf-cfee-41b9-a522-244254aebd83.png',
      '/img/bd3b35cb-7942-470f-96ca-243f4defe519.jpg',
      '/img/2eee8912-7f02-4a25-ae89-caf7d0d5e3ee.jpg'
    ],
    description: 'Элегантный классический памятник, выполненный в традиционных пропорциях. Идеально подходит для установки на любом кладбище.',
    features: [
      'Полированная поверхность',
      'Гравировка портрета включена',
      'Установка в стоимости',
      'Гарантия 10 лет'
    ],
    specifications: {
      'Артикул': '№ AM4000',
      'Статус': 'В наличии',
      'Гарантия — материал': '30 лет',
      'Гарантия — установка': '3 года',
      'Материал': 'Мансуровский гранит',
      'Качество': 'Высшая категория',
      'Полировка': '1 сторона',
      'Фаска': 'Техническая (1-10 мм.)',
      'Изготовление': 'от 14 дней',
      'Вес комплекта': '78 кг.',
      'Высота с тумбой': '92 см.'
    }
  };

  const materials = [
    { 
      id: 'granite-black', 
      name: 'Гранит чёрный (габбро-диабаз)', 
      price: 0, 
      color: '#2c2c2c',
      description: 'Классический чёрный гранит высочайшего качества'
    },
    { 
      id: 'granite-red', 
      name: 'Гранит красный (Лезники)', 
      price: 3000, 
      color: '#8b4513',
      description: 'Благородный красный гранит с натуральным рисунком'
    },
    { 
      id: 'granite-gray', 
      name: 'Гранит серый (Возрождение)', 
      price: 2000, 
      color: '#708090',
      description: 'Элегантный серый гранит с равномерной текстурой'
    },
    { 
      id: 'marble', 
      name: 'Мрамор белый (Каррара)', 
      price: 8000, 
      color: '#f5f5f5',
      description: 'Итальянский мрамор премиум-класса'
    }
  ];

  const monumentElements = {
    stela: {
      name: 'Стела',
      description: 'Основная часть памятника с портретом и надписями',
      required: true,
      sizes: [
        { id: 'small', name: '70×35×4 см', price: 22000 },
        { id: 'standard', name: '80×40×5 см', price: 25000 },
        { id: 'large', name: '90×45×6 см', price: 28000 },
        { id: 'xl', name: '100×50×8 см', price: 32000 }
      ]
    },
    tumba: {
      name: 'Тумба',
      description: 'Подставка под стелу для большей устойчивости',
      required: false,
      sizes: [
        { id: 'compact', name: '40×15×12 см', price: 6000 },
        { id: 'standard', name: '50×20×15 см', price: 8000 },
        { id: 'wide', name: '60×25×18 см', price: 10000 }
      ]
    },
    cvetnik: {
      name: 'Цветник',
      description: 'Ограждение для цветов и декоративных элементов',
      required: false,
      sizes: [
        { id: 'small', name: '80×6×8×40 см', price: 9000 },
        { id: 'standard', name: '100×8×10×50 см', price: 12000 },
        { id: 'large', name: '120×10×12×60 см', price: 15000 },
        { id: 'family', name: '150×12×15×70 см', price: 20000 }
      ]
    }
  };

  const getCurrentPrice = () => {
    const materialPrice = materials.find(m => m.id === selectedMaterial)?.price || 0;
    
    let elementsPrice = 0;
    Object.entries(selectedElements).forEach(([elementId, config]) => {
      if (config.enabled) {
        const element = monumentElements[elementId as keyof typeof monumentElements];
        const size = element.sizes.find(s => s.id === config.size);
        if (size) {
          elementsPrice += size.price;
        }
      }
    });
    
    const servicesPrice = [
      { id: 'portrait-gravir', price: 8000 },
      { id: 'portrait-hand', price: 15000 },
      { id: 'fio-gravir', price: 2000 },
      { id: 'fio-skarpel', price: 4000 },
      { id: 'fio-gold', price: 6000 },
      { id: 'gravir-cross', price: 3000 },
      { id: 'gravir-cvety', price: 0 },
      { id: 'gravir-epitafiya', price: 0 },
      { id: 'gravir-vinetka', price: 2500 },
      { id: 'gravir-svechi', price: 1500 },
      { id: 'gravir-ikona', price: 5000 },
      { id: 'gravir-kartinka', price: 3500 },
      { id: 'retush-photo', price: 1000 },
      { id: 'protection', price: 4000 },
      { id: 'storage', price: 500 }
    ]
      .filter(service => selectedServices.includes(service.id))
      .reduce((total, service) => {
        const quantity = serviceQuantities[service.id] || 1;
        return total + (service.price * quantity);
      }, 0);
    
    return elementsPrice + materialPrice + servicesPrice;
  };

  const toggleElement = (elementId: string) => {
    if (elementId === 'stela') return; // Стела обязательна
    
    setSelectedElements(prev => ({
      ...prev,
      [elementId]: {
        ...prev[elementId as keyof typeof prev],
        enabled: !prev[elementId as keyof typeof prev].enabled
      }
    }));
  };

  const updateElementSize = (elementId: string, sizeId: string) => {
    setSelectedElements(prev => ({
      ...prev,
      [elementId]: {
        ...prev[elementId as keyof typeof prev],
        size: sizeId
      }
    }));
  };

  const relatedProducts = [
    { id: 2, title: 'Горизонтальный элегант', price: '38 000 ₽', image: '/img/bd3b35cb-7942-470f-96ca-243f4defe519.jpg' },
    { id: 3, title: 'Семейный комплекс', price: '85 000 ₽', image: 'https://cdn.poehali.dev/files/f8c87ddf-cfee-41b9-a522-244254aebd83.png' },
    { id: 4, title: 'Мемориальная плита', price: '25 000 ₽', image: '/img/2eee8912-7f02-4a25-ae89-caf7d0d5e3ee.jpg' }
  ];

  return (
    <Layout>
      <div className="bg-background">

      {/* Main Content */}
      <section className="pt-4 pb-12 px-2 sm:px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Product Images */}
            <div className="space-y-3 w-full min-w-0">
              <div className="aspect-square bg-muted rounded-xl overflow-hidden">
                <img 
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Mobile: Move services below product info on small screens */}
              <div className="lg:block hidden">
                <h3 className="font-medium text-sm mb-2 text-muted-foreground">Дополнительное оформление</h3>
                <div className="grid grid-cols-1 gap-1.5 max-h-[280px] overflow-y-auto pr-1">
                  {[
                    { id: 'portrait-gravir', name: 'Портрет гравировка', price: 8000, category: 'Портрет' },
                    { id: 'portrait-hand', name: 'Портрет ручной', price: 15000, category: 'Портрет' },
                    { id: 'fio-gravir', name: 'ФИО гравировка', price: 2000, category: 'Текст' },
                    { id: 'fio-skarpel', name: 'ФИО скарпель', price: 4000, category: 'Текст' },
                    { id: 'fio-gold', name: 'ФИО сусальное золото', price: 6000, category: 'Текст' },
                    { id: 'gravir-cross', name: 'Гравировка креста', price: 3000, category: 'Символы' },
                    { id: 'gravir-cvety', name: 'Гравировка цветы', price: 0, category: 'Декор' },
                    { id: 'gravir-epitafiya', name: 'Гравировка эпитафия', price: 0, category: 'Текст' },
                    { id: 'gravir-vinetka', name: 'Гравировка виньетки', price: 2500, category: 'Декор' },
                    { id: 'gravir-svechi', name: 'Гравировка свечи', price: 1500, category: 'Декор' },
                    { id: 'gravir-ikona', name: 'Гравировка иконы', price: 5000, category: 'Символы' },
                    { id: 'gravir-kartinka', name: 'Гравировка картинки', price: 3500, category: 'Декор' },
                    { id: 'retush-photo', name: 'Ретушь фотографии', price: 1000, category: 'Обработка' },
                    { id: 'protection', name: 'Защитное покрытие', price: 4000, category: 'Обработка' },
                    { id: 'storage', name: 'Хранение на складе', price: 500, category: 'Услуги' }
                  ].map((service) => {
                    const isSelected = selectedServices.includes(service.id);
                    const isFree = service.price === 0;
                    
                    return (
                      <div 
                        key={service.id}
                        className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors hover:bg-muted/30 min-w-0 ${
                          isSelected ? 'border-primary bg-primary/5' : 'border-border'
                        }`}
                        onClick={() => {
                          setSelectedServices(prev => 
                            prev.includes(service.id) 
                              ? prev.filter(id => id !== service.id)
                              : [...prev, service.id]
                          );
                        }}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-primary bg-primary'
                              : 'border-muted-foreground'
                          }`}>
                            {isSelected && (
                              <Icon name="Check" size={8} className="text-primary-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium truncate">{service.name}</div>
                            <div className="text-[10px] text-muted-foreground truncate">{service.category}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          {isSelected && ['portrait-gravir', 'portrait-hand', 'fio-gravir', 'fio-skarpel'].includes(service.id) && (
                            <Select 
                              value={serviceQuantities[service.id]?.toString() || '1'} 
                              onValueChange={(value) => {
                                setServiceQuantities(prev => ({
                                  ...prev,
                                  [service.id]: parseInt(value)
                                }));
                              }}
                            >
                              <SelectTrigger className="w-10 h-6 text-xs p-0.5">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4].map(num => (
                                  <SelectItem key={num} value={num.toString()} className="text-xs">
                                    {num}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                          <div className="text-xs font-semibold whitespace-nowrap">
                            {isFree ? (
                              <span className="text-green-500">0₽</span>
                            ) : (
                              <span className="text-primary">
                                {(['portrait-gravir', 'portrait-hand', 'fio-gravir', 'fio-skarpel'].includes(service.id) && isSelected
                                  ? (service.price * (serviceQuantities[service.id] || 1))
                                  : service.price
                                ).toLocaleString()}₽
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4 w-full min-w-0">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {product.isNew && <Badge className="bg-green-500 text-xs">Новинка</Badge>}
                  {product.isPopular && <Badge className="bg-orange-500 text-xs">Популярный</Badge>}
                </div>
                <h1 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold mb-1 break-words">{product.title}</h1>
                <p className="text-base sm:text-lg text-muted-foreground mb-3 break-words">{product.subtitle}</p>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <Icon 
                        key={star}
                        name="Star" 
                        size={16} 
                        className={star <= Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-muted-foreground"}
                      />
                    ))}
                    <span className="text-xs sm:text-sm text-muted-foreground ml-1">
                      {product.rating} ({product.reviewsCount})
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="bg-muted/30 p-3 sm:p-4 rounded-xl">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                  <span className="text-xl sm:text-2xl font-bold text-primary">
                    {getCurrentPrice().toLocaleString()} ₽
                  </span>
                  {product.originalPrice && (
                    <span className="text-base sm:text-lg line-through text-muted-foreground">
                      {product.originalPrice.toLocaleString()} ₽
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Цена включает изготовление, гравировку портрета и установку
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3 w-full">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full sm:flex-1 bg-primary hover:bg-primary/90 text-sm"
                  >
                    <Icon name="ShoppingCart" className="mr-2" size={16} />
                    В корзину
                  </Button>
                  <Button 
                    className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-white text-sm"
                  >
                    <Icon name="Zap" className="mr-2" size={16} />
                    Заказать в 1 клик
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={`shrink-0 transition-all duration-300 hover:scale-110 ${
                      isFavorite 
                        ? 'bg-red-50 border-red-500 text-red-500' 
                        : 'hover:border-red-400 hover:text-red-400'
                    }`}
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Icon 
                      name="Heart" 
                      size={16} 
                      className={`transition-all duration-300 ${
                        isFavorite ? 'fill-current text-red-500' : ''
                      }`}
                    />
                  </Button>
                </div>
              </div>

              {/* Material Selection */}
              <div className="space-y-3 w-full">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Материал</label>
                  <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                    <SelectTrigger className="h-auto p-3 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {materials.map(material => (
                        <SelectItem key={material.id} value={material.id} className="p-3">
                          <div className="flex items-center gap-3 w-full">
                            <div 
                              className="w-6 h-6 rounded-full border-2 border-muted shrink-0" 
                              style={{ backgroundColor: material.color }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm">{material.name}</div>
                              <div className="text-xs text-muted-foreground truncate">{material.description}</div>
                              {material.price > 0 && (
                                <div className="text-xs font-medium text-primary">+{material.price.toLocaleString()} ₽</div>
                              )}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Комплектация памятника</label>
                  <div className="space-y-2">
                    {Object.entries(monumentElements).map(([elementId, element]) => {
                      const isEnabled = selectedElements[elementId as keyof typeof selectedElements].enabled;
                      const currentSize = selectedElements[elementId as keyof typeof selectedElements].size;
                      const currentSizeData = element.sizes.find(s => s.id === currentSize);
                      
                      return (
                        <div 
                          key={elementId} 
                          className={`border rounded-lg p-3 sm:p-4 transition-colors cursor-pointer hover:shadow-md w-full min-w-0 ${
                            isEnabled 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/30'
                          }`}
                          onClick={() => !element.required && toggleElement(elementId)}
                        >
                          <div className="flex items-start gap-3 mb-2">
                            <div 
                              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                                isEnabled
                                  ? 'border-primary bg-primary'
                                  : 'border-muted-foreground'
                              } ${element.required ? 'opacity-50' : ''}`}
                            >
                              {isEnabled && (
                                <Icon name="Check" size={10} className="text-primary-foreground" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm flex flex-wrap items-center gap-2">
                                <span className="break-words">{element.name}</span>
                                {element.required && (
                                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 shrink-0">Обязательно</Badge>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5 break-words">
                                {element.description}
                              </div>
                            </div>
                            {isEnabled && currentSizeData && (
                              <div className="text-sm font-bold text-primary shrink-0">
                                {currentSizeData.price.toLocaleString()} ₽
                              </div>
                            )}
                          </div>
                          
                          {isEnabled && (
                            <div className="ml-7 mt-2" onClick={(e) => e.stopPropagation()}>
                              <Select 
                                value={currentSize} 
                                onValueChange={(value) => updateElementSize(elementId, value)}
                              >
                                <SelectTrigger className="h-9 text-sm w-full">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="w-full">
                                  {element.sizes.map(size => (
                                    <SelectItem key={size.id} value={size.id} className="text-sm">
                                      <div className="flex justify-between items-center w-full">
                                        <span className="font-medium">{size.name}</span>
                                        <span className="text-primary font-semibold ml-3 shrink-0">
                                          {size.price.toLocaleString()} ₽
                                        </span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>

              {/* Features */}
              <div className="bg-card border rounded-xl p-3 sm:p-4 w-full">
                <h3 className="font-heading text-sm font-semibold mb-3">Что входит в стоимость</h3>
                <div className="grid grid-cols-1 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Icon name="Check" size={14} className="text-green-500 shrink-0" />
                      <span className="text-xs break-words">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Services Section */}
              <div className="lg:hidden w-full">
                <h3 className="font-medium text-sm mb-2 text-muted-foreground">Дополнительное оформление</h3>
                <div className="grid grid-cols-1 gap-1.5 max-h-[280px] overflow-y-auto pr-1">
                  {[
                    { id: 'portrait-gravir', name: 'Портрет гравировка', price: 8000, category: 'Портрет' },
                    { id: 'portrait-hand', name: 'Портрет ручной', price: 15000, category: 'Портрет' },
                    { id: 'fio-gravir', name: 'ФИО гравировка', price: 2000, category: 'Текст' },
                    { id: 'fio-skarpel', name: 'ФИО скарпель', price: 4000, category: 'Текст' },
                    { id: 'fio-gold', name: 'ФИО сусальное золото', price: 6000, category: 'Текст' },
                    { id: 'gravir-cross', name: 'Гравировка креста', price: 3000, category: 'Символы' },
                    { id: 'gravir-cvety', name: 'Гравировка цветы', price: 0, category: 'Декор' },
                    { id: 'gravir-epitafiya', name: 'Гравировка эпитафия', price: 0, category: 'Текст' },
                    { id: 'gravir-vinetka', name: 'Гравировка виньетки', price: 2500, category: 'Декор' },
                    { id: 'gravir-svechi', name: 'Гравировка свечи', price: 1500, category: 'Декор' },
                    { id: 'gravir-ikona', name: 'Гравировка иконы', price: 5000, category: 'Символы' },
                    { id: 'gravir-kartinka', name: 'Гравировка картинки', price: 3500, category: 'Декор' },
                    { id: 'retush-photo', name: 'Ретушь фотографии', price: 1000, category: 'Обработка' },
                    { id: 'protection', name: 'Защитное покрытие', price: 4000, category: 'Обработка' },
                    { id: 'storage', name: 'Хранение на складе', price: 500, category: 'Услуги' }
                  ].map((service) => {
                    const isSelected = selectedServices.includes(service.id);
                    const isFree = service.price === 0;
                    
                    return (
                      <div 
                        key={service.id}
                        className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors hover:bg-muted/30 min-w-0 ${
                          isSelected ? 'border-primary bg-primary/5' : 'border-border'
                        }`}
                        onClick={() => {
                          setSelectedServices(prev => 
                            prev.includes(service.id) 
                              ? prev.filter(id => id !== service.id)
                              : [...prev, service.id]
                          );
                        }}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-primary bg-primary'
                              : 'border-muted-foreground'
                          }`}>
                            {isSelected && (
                              <Icon name="Check" size={8} className="text-primary-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium truncate">{service.name}</div>
                            <div className="text-[10px] text-muted-foreground truncate">{service.category}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          {isSelected && ['portrait-gravir', 'portrait-hand', 'fio-gravir', 'fio-skarpel'].includes(service.id) && (
                            <Select 
                              value={serviceQuantities[service.id]?.toString() || '1'} 
                              onValueChange={(value) => {
                                setServiceQuantities(prev => ({
                                  ...prev,
                                  [service.id]: parseInt(value)
                                }));
                              }}
                            >
                              <SelectTrigger className="w-10 h-6 text-xs p-0.5">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4].map(num => (
                                  <SelectItem key={num} value={num.toString()} className="text-xs">
                                    {num}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                          <div className="text-xs font-semibold whitespace-nowrap">
                            {isFree ? (
                              <span className="text-green-500">0₽</span>
                            ) : (
                              <span className="text-primary">
                                {(['portrait-gravir', 'portrait-hand', 'fio-gravir', 'fio-skarpel'].includes(service.id) && isSelected
                                  ? (service.price * (serviceQuantities[service.id] || 1))
                                  : service.price
                                ).toLocaleString()}₽
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-8 sm:mt-12 px-2 sm:px-0">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
                <TabsTrigger value="description" className="text-xs sm:text-sm py-2">Описание</TabsTrigger>
                <TabsTrigger value="specifications" className="text-xs sm:text-sm py-2">Характеристики</TabsTrigger>
                <TabsTrigger value="reviews" className="text-xs sm:text-sm py-2">Отзывы</TabsTrigger>
                <TabsTrigger value="delivery" className="text-xs sm:text-sm py-2">Доставка</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Описание товара</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Памятник изготавливается из высококачественного карельского гранита, который отличается 
                      исключительной прочностью и долговечностью. Поверхность обрабатывается до зеркального блеска, 
                      что обеспечивает превосходный внешний вид на долгие годы.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      В стоимость включена художественная гравировка портрета, выполненная нашими мастерами 
                      с многолетним опытом. Мы используем современное оборудование для создания 
                      фотореалистичных изображений высочайшего качества.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Технические характеристики</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-muted">
                          <span className="font-medium">{key}</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-heading">Общая оценка</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">{product.rating}</div>
                        <div className="flex justify-center gap-1 mb-2">
                          {[1,2,3,4,5].map((star) => (
                            <Icon 
                              key={star}
                              name="Star" 
                              size={20} 
                              className={star <= Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-muted-foreground"}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{product.reviewsCount} отзывов</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="lg:col-span-2 space-y-6">
                    {[1,2,3].map((review) => (
                      <Card key={review}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                                <Icon name="User" size={20} />
                              </div>
                              <div>
                                <p className="font-medium">Анна М.</p>
                                <div className="flex gap-1">
                                  {[1,2,3,4,5].map((star) => (
                                    <Icon key={star} name="Star" size={14} className="text-yellow-400 fill-current" />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">2 недели назад</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">
                            Очень довольны качеством памятника. Мастера выполнили работу на высоком уровне, 
                            портрет получился очень похожим. Установили быстро и аккуратно.
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="delivery" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Доставка и установка</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="production">
                        <AccordionTrigger>Сроки изготовления</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">
                            Стандартный срок изготовления памятника составляет 14-21 рабочий день с момента 
                            подтверждения заказа и получения предоплаты. В сезон высокой загруженности 
                            (весна-лето) сроки могут увеличиваться до 30 дней.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="delivery">
                        <AccordionTrigger>Доставка</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground mb-3">
                            Доставка осуществляется нашим транспортом по Москве и Московской области. 
                            Стоимость доставки зависит от удаленности кладбища:
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>В пределах МКАД - бесплатно</li>
                            <li>До 30 км от МКАД - 3 000 ₽</li>
                            <li>До 50 км от МКАД - 5 000 ₽</li>
                            <li>Свыше 50 км - по договоренности</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="installation">
                        <AccordionTrigger>Установка</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">
                            Установка памятника включена в стоимость и выполняется нашими специалистами. 
                            Мы подготавливаем фундамент, устанавливаем памятник и проводим финальную обработку. 
                            На все работы предоставляется гарантия 10 лет.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div className="mt-8 sm:mt-12 px-2 sm:px-0">
            <h3 className="font-heading text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Похожие товары</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedProducts.map(product => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow w-full">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="p-3 sm:p-4">
                    <CardTitle className="font-heading text-sm sm:text-base break-words">{product.title}</CardTitle>
                    <CardDescription className="text-sm sm:text-base font-semibold text-primary">
                      {product.price}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0">
                    <Button className="w-full text-xs sm:text-sm">Подробнее</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      </div>
    </Layout>
  );
}