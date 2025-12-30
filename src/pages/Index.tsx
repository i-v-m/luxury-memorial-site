import { lazy, Suspense, memo, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import Layout from '@/components/Layout';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

// Lazy loading для компонентов
const Accordion = lazy(() => import('@/components/ui/accordion').then(module => ({
  default: module.Accordion
})));
const AccordionContent = lazy(() => import('@/components/ui/accordion').then(module => ({
  default: module.AccordionContent
})));
const AccordionItem = lazy(() => import('@/components/ui/accordion').then(module => ({
  default: module.AccordionItem
})));
const AccordionTrigger = lazy(() => import('@/components/ui/accordion').then(module => ({
  default: module.AccordionTrigger
})));

// Мемоизированные компоненты для оптимизации
const MonumentCard = memo(({ monument }: { monument: any }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <div className="aspect-square overflow-hidden">
      <img 
        src={monument.image}
        alt={monument.title}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        loading="lazy"
        decoding="async"
      />
    </div>
    <CardHeader className="p-3 md:p-6 pb-2">
      <CardTitle className="font-heading text-sm sm:text-base md:text-lg line-clamp-2">{monument.title}</CardTitle>
      <CardDescription className="text-base sm:text-lg md:text-xl font-semibold text-primary mt-1">
        {monument.price}
      </CardDescription>
    </CardHeader>
    <CardContent className="p-3 md:p-6 pt-0">
      <Button className="w-full h-9 text-xs sm:text-sm md:h-10 md:text-base">Подробнее</Button>
    </CardContent>
  </Card>
));

const ServiceCard = memo(({ service }: { service: any }) => (
  <Card className="text-center hover:shadow-lg transition-shadow">
    <CardHeader>
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name={service.icon as any} size={32} className="text-primary" />
      </div>
      <CardTitle className="font-heading text-xl">{service.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-base">
        {service.description}
      </CardDescription>
    </CardContent>
  </Card>
));

MonumentCard.displayName = 'MonumentCard';
ServiceCard.displayName = 'ServiceCard';

export default function Index() {
  const [reviewsApi, setReviewsApi] = useState<CarouselApi>();
  const [currentReview, setCurrentReview] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
    if (!reviewsApi) return;

    setReviewsCount(reviewsApi.scrollSnapList().length);
    setCurrentReview(reviewsApi.selectedScrollSnap());

    reviewsApi.on('select', () => {
      setCurrentReview(reviewsApi.selectedScrollSnap());
    });
  }, [reviewsApi]);

  // Оптимизированные данные
  const monuments = [
    { id: 1, title: 'Классический вертикальный', price: 'от 45 000 ₽', image: '/img/2f39360b-4fa5-4b2a-8359-d7b41b051bb0.jpg' },
    { id: 2, title: 'Горизонтальный элегант', price: 'от 38 000 ₽', image: '/img/bd3b35cb-7942-470f-96ca-243f4defe519.jpg' },
    { id: 3, title: 'Бронзовая мемориальная плита', price: 'от 25 000 ₽', image: '/img/2eee8912-7f02-4a25-ae89-caf7d0d5e3ee.jpg' },
  ];

  const catalogProducts = [
    { id: 1, title: 'Памятник из габбро-диабаза', oldPrice: 'от 65 000 ₽', price: 'от 52 000 ₽', image: '/img/2f39360b-4fa5-4b2a-8359-d7b41b051bb0.jpg' },
    { id: 2, title: 'Семейный комплекс', oldPrice: 'от 150 000 ₽', price: 'от 120 000 ₽', image: '/img/bd3b35cb-7942-470f-96ca-243f4defe519.jpg' },
    { id: 3, title: 'Памятник с крестом', oldPrice: 'от 60 000 ₽', price: 'от 48 000 ₽', image: '/img/2eee8912-7f02-4a25-ae89-caf7d0d5e3ee.jpg' },
    { id: 4, title: 'Элитный гранитный памятник', oldPrice: 'от 115 000 ₽', price: 'от 95 000 ₽', image: '/img/2f39360b-4fa5-4b2a-8359-d7b41b051bb0.jpg' },
    { id: 5, title: 'Мраморный памятник', oldPrice: 'от 80 000 ₽', price: 'от 65 000 ₽', image: '/img/bd3b35cb-7942-470f-96ca-243f4defe519.jpg' },
    { id: 6, title: 'Детский памятник', oldPrice: 'от 42 000 ₽', price: 'от 35 000 ₽', image: '/img/2eee8912-7f02-4a25-ae89-caf7d0d5e3ee.jpg' },
    { id: 7, title: 'Памятник с цветником', oldPrice: 'от 72 000 ₽', price: 'от 58 000 ₽', image: '/img/2f39360b-4fa5-4b2a-8359-d7b41b051bb0.jpg' },
    { id: 8, title: 'Гранитный комплекс с оградой', oldPrice: 'от 185 000 ₽', price: 'от 150 000 ₽', image: '/img/bd3b35cb-7942-470f-96ca-243f4defe519.jpg' },
  ];

  const services = [
    { title: 'Изготовление памятников', description: 'Индивидуальное изготовление из премиальных материалов', icon: 'Hammer' },
    { title: 'Установка и монтаж', description: 'Профессиональная установка с гарантией качества', icon: 'Settings' },
    { title: 'Гравировка и оформление', description: 'Художественная гравировка портретов и надписей', icon: 'PenTool' },
    { title: 'Благоустройство места', description: 'Комплексное обустройство мемориального участка', icon: 'TreePine' }
  ];

  const materials = [
    { name: 'Габбро-диабаз', description: 'Прочная горная порода вулканического происхождения с выраженной зернистой структурой.', image: 'https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/254932d2-9059-486d-939d-01b32729401f.jpg' },
    { name: 'Дымовский', description: 'Оттенки варьируются от темно-серого с алыми вкраплениями до шоколадного. Идеально комбинируется с элементами из бронзы и темным гранитом.', image: 'https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/8e1369ca-3cda-48fc-a213-850e11fbf6a4.jpg' },
    { name: 'Капустинский', description: 'Насыщенный красный или розово-красный тон. Нанесение портрета непосредственно на камень не рекомендуется.', image: 'https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/ca5b4a5f-4bf9-41f6-b7e1-3da1a8ffff81.jpg' },
    { name: 'Сопка Бунтина', description: 'Глубокий черный фон с вкраплениями темной зелени. Обеспечивает высокую четкость и контрастность для надписей.', image: 'https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/1701e879-829f-42c0-8fc7-4ef27026e241.jpg' },
    { name: 'Мрамор Коелга', description: 'Классический белоснежный материал с эффектом легкой полупрозрачности, известный со времен античности.', image: 'https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/c8668546-660f-4126-a8a4-098bc0d0e616.jpg' },
    { name: 'Мансуровский', description: 'Светло-серый однородный цвет, имеющий легкий жемчужный подтон.', image: 'https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/254932d2-9059-486d-939d-01b32729401f.jpg' },
    { name: 'Возрождение', description: 'Монолитный гранит, сочетающий в своей палитре приглушенные розовые и серые тона.', image: 'https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/8e1369ca-3cda-48fc-a213-850e11fbf6a4.jpg' },
    { name: 'Сюскюянсаари', description: 'Богатый красный оттенок с вишневыми или малиновыми нотками. Каждый срез камня обладает уникальным, неповторяющимся узором.', image: 'https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/ca5b4a5f-4bf9-41f6-b7e1-3da1a8ffff81.jpg' },
    { name: 'Лезниковский', description: 'Цветовая гамма охватывает всю палитру красного — от светлого бордо до глубокого темно-красного.', image: 'https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/ca5b4a5f-4bf9-41f6-b7e1-3da1a8ffff81.jpg' },
    { name: 'Змеевик', description: 'Разновидность серпентинита, представленная в широком спектре зеленых тонов — от темного изумруда до светлого желто-зеленого.', image: 'https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/1701e879-829f-42c0-8fc7-4ef27026e241.jpg' },
    { name: 'Лабрадорит', description: 'Темно-серый, почти черный камень с включениями синих и зеленых оттенков и характерным перламутровым сиянием.', image: 'https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/1701e879-829f-42c0-8fc7-4ef27026e241.jpg' },
    { name: 'Гранатовый Амфиболит', description: 'Обладает эксклюзивным рисунком, созданным за счет причудливого сочетания вкраплений черного, серого и алого цветов.', image: 'https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/8e1369ca-3cda-48fc-a213-850e11fbf6a4.jpg' },
    { name: 'Мрамор Уфалей', description: 'Имеет благородную окраску серо-голубых тонов с выразительным рисунком из контрастных светлых и угольно-серых прожилок.', image: 'https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/c8668546-660f-4126-a8a4-098bc0d0e616.jpg' },
    { name: 'Калгуваара', description: 'Структура камня образована сросшимися кристаллами в красной, розовой и серой гамме.', image: 'https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/ca5b4a5f-4bf9-41f6-b7e1-3da1a8ffff81.jpg' },
    { name: 'Масловский', description: 'Относится к гранитам, обладает уникальной зеленой палитрой от темного изумрудного до светлого оливкового оттенка.', image: 'https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/1701e879-829f-42c0-8fc7-4ef27026e241.jpg' },
    { name: 'Цветок Урала', description: 'Один из видов гранита, характеризующийся спокойным, однородным серым цветом.', image: 'https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/254932d2-9059-486d-939d-01b32729401f.jpg' },
    { name: 'Балтик Грин', description: 'Предлагает разнообразие зеленых оттенков: от травянистого и зелено-коричневого до серо-зеленого. Обладает высокими декоративными качествами.', image: 'https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/1701e879-829f-42c0-8fc7-4ef27026e241.jpg' },
    { name: 'Куртинский', description: 'Отличается утонченным бежевым цветом.', image: 'https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/c8668546-660f-4126-a8a4-098bc0d0e616.jpg' },
    { name: 'Покостовский', description: 'Главное преимущество — постоянство и стабильность цвета. Прекрасно сочетается с черным гранитом и позолоченными элементами.', image: 'https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/254932d2-9059-486d-939d-01b32729401f.jpg' },
  ];

  return (
    <Layout>
      <div className="bg-background">

      {/* Hero Section */}
      <section className="pt-4 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
                Изготовление памятников <br />
                <span className="text-primary">в Москве</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Создаём вечные памятники из лучших материалов с индивидуальным подходом к каждому заказу
              </p>

            </div>
            
            {/* 3D Model Request Form - Mobile Optimized */}
            <div className="order-1 lg:order-2 bg-card rounded-xl p-3 sm:p-4 md:p-6 shadow-lg border border-primary/10 overflow-hidden">
              <div className="space-y-3 sm:space-y-4">
                {/* Header */}
                <div className="text-center">
                  <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold mb-2">3D макет памятника</h3>
                  <p className="text-sm sm:text-base text-muted-foreground px-2">
                    Получите реалистичную визуализацию перед изготовлением
                  </p>
                </div>
                
                {/* Compact 3D Visualization Image */}
                <div className="relative">
                  <img 
                    src="https://cdn.poehali.dev/files/2f6194d4-96fc-4373-a105-199c5a4748d6.png"
                    alt="3D макет памятника - мемориальный комплекс"
                    className="w-full max-h-48 sm:max-h-64 md:max-h-80 rounded-lg object-contain bg-gradient-to-br from-gray-50 to-gray-100"
                  />
                  <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                    <Icon name="Cube" size={12} className="inline mr-1" />
                    3D
                  </div>
                </div>



                {/* Compact Form */}
                <div className="bg-muted/30 rounded-lg p-3 sm:p-4">
                  <form className="space-y-2 sm:space-y-3">
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary"
                      required
                    />

                    <Button className="w-full bg-primary hover:bg-primary/90 h-9 sm:h-10 text-sm font-medium">
                      <Icon name="Cube" size={14} className="mr-1" />
                      Заказать бесплатно
                    </Button>

                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-2 border border-green-200">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Icon name="Gift" size={12} className="text-green-600" />
                          <span className="font-semibold text-green-800 text-xs">Бесплатный макет</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          При заказе памятника
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Blocks Section */}
      <section id="catalog" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Заказать изготовление памятника */}
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Icon name="Mountain" size={32} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Заказать изготовление памятника
                    </h3>
                    <p className="text-muted-foreground">
                      Индивидуальное изготовление памятников из гранита и мрамора
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Мемориальные комплексы */}
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center group-hover:bg-blue-300 transition-colors">
                    <Icon name="Building" size={32} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Мемориальные комплексы
                    </h3>
                    <p className="text-muted-foreground">
                      Полные мемориальные комплексы с благоустройством территории
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Заказать цоколь */}
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-emerald-200 rounded-full flex items-center justify-center group-hover:bg-emerald-300 transition-colors">
                    <Icon name="Square" size={32} className="text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Заказать цоколь
                    </h3>
                    <p className="text-muted-foreground">
                      Изготовление и установка цоколей различных размеров и форм
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Заказать благоустройство */}
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center group-hover:bg-amber-300 transition-colors">
                    <Icon name="Flower2" size={32} className="text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Заказать благоустройство
                    </h3>
                    <p className="text-muted-foreground">
                      Благоустройство могил: плитка, ограды, озеленение
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Consultation CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row sm:inline-flex items-center gap-4 bg-white rounded-2xl sm:rounded-full px-6 sm:px-8 py-4 shadow-lg max-w-md sm:max-w-none mx-auto">
              <Icon name="Phone" size={20} className="text-primary flex-shrink-0" />
              <div className="text-center sm:text-left">
                <p className="font-medium text-sm sm:text-base">Не знаете, что выбрать?</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Получите бесплатную консультацию</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                Позвонить
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Products Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-heading text-4xl font-bold mb-4">Популярные памятники</h3>
            <p className="text-xl text-muted-foreground">Готовые решения из нашего каталога</p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 px-2 sm:px-0">
            {catalogProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 md:top-3 right-2 md:right-3">
                    <div className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-2 py-0.5 md:px-2.5 md:py-1 rounded">
                      Скидка
                    </div>
                  </div>
                </div>
                
                <CardHeader className="p-2 sm:p-3 md:p-6 pb-2">
                  <CardTitle className="font-heading text-sm sm:text-base md:text-lg line-clamp-2">
                    {product.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-2 md:space-y-3 p-2 sm:p-3 md:p-6 pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                      <span className="text-base sm:text-lg md:text-xl font-bold text-primary">
                        {product.price}
                      </span>
                      <span className="text-xs sm:text-sm md:text-sm line-through text-muted-foreground">
                        {product.oldPrice}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 sm:gap-2">
                    <Button 
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90 h-8 sm:h-9 md:h-9 text-xs sm:text-sm md:text-sm px-2"
                    >
                      Подробнее
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-8 w-8 sm:h-9 sm:w-9 md:h-9 md:w-9"
                    >
                      <Icon name="Heart" size={16} className="sm:size-18 md:size-18" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-8 w-8 sm:h-9 sm:w-9 md:h-9 md:w-9"
                    >
                      <Icon name="BarChart3" size={16} className="sm:size-18 md:size-18" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-12">
              Перейти в каталог
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-heading text-4xl font-bold mb-4">Наши услуги</h3>
            <p className="text-xl text-muted-foreground">Полный цикл работ от проектирования до установки</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={`service-${index}`} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-heading text-4xl font-bold mb-4">Галерея наших работ</h3>
            <p className="text-xl text-muted-foreground">Примеры наших лучших проектов</p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {monuments.map((monument) => (
                <CarouselItem key={monument.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="aspect-square bg-muted rounded-xl overflow-hidden">
                    <img 
                      src={monument.image}
                      alt={monument.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* Payment Order Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-heading text-4xl font-bold mb-4">Порядок оплаты памятника</h3>
            <p className="text-xl text-muted-foreground">Прозрачная и удобная схема оплаты</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
                <CardContent className="p-10 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="FileSignature" size={40} className="text-green-600" />
                  </div>
                  <div className="text-6xl font-bold text-green-600 mb-3">50%</div>
                  <h4 className="font-heading text-2xl font-bold mb-4">Предоплата</h4>
                  <p className="text-lg text-muted-foreground">
                    При подписании договора и утверждении эскиза
                  </p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
                <CardContent className="p-10 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="CheckCircle2" size={40} className="text-green-600" />
                  </div>
                  <div className="text-6xl font-bold text-green-600 mb-3">50%</div>
                  <h4 className="font-heading text-2xl font-bold mb-4">Окончательный расчёт</h4>
                  <p className="text-lg text-muted-foreground">
                    После установки и приёмки работ
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-slate-50 to-white border-2">
              <CardContent className="p-8">
                <h4 className="font-heading text-2xl font-bold mb-6 text-center">Способы оплаты</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="CreditCard" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2">Банковские карты</h5>
                      <p className="text-sm text-muted-foreground">
                        Visa, MasterCard, МИР — безопасные онлайн-платежи
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Building2" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2">Банковский перевод</h5>
                      <p className="text-sm text-muted-foreground">
                        Для юридических лиц и индивидуальных предпринимателей
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Wallet" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2">Наличный расчёт</h5>
                      <p className="text-sm text-muted-foreground">
                        Оплата в офисе компании с выдачей кассового чека
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Percent" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2">Рассрочка</h5>
                      <p className="text-sm text-muted-foreground">
                        Возможность оформления беспроцентной рассрочки на 6 месяцев
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Icon name="Info" size={24} className="text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-green-900 mb-2">Гарантии безопасности</h5>
                  <p className="text-green-800">
                    Все платежи осуществляются по официальному договору. Мы предоставляем полный пакет документов: договор, 
                    смету, кассовые чеки и акт выполненных работ. Ваши средства защищены.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-heading text-4xl font-bold mb-6">О нашей компании</h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Более 15 лет мы создаём памятники, которые станут достойной памятью о ваших близких. 
                Используем только лучшие материалы и современные технологии обработки.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-muted-foreground">Установленных памятников</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">15</div>
                  <div className="text-muted-foreground">Лет опыта</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100">
              <img 
                src="https://cdn.poehali.dev/files/1f6e9f37-646c-458a-ba44-aac1996ce96c.png"
                alt="Мемориальный комплекс с ангелом и цветами"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Discount Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Text and CTA */}
            <div className="space-y-6">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                ПОЛУЧИТЕ СКИДКУ 15%<br />
                <span className="text-green-600">НА ДОСТАВКУ И УСТАНОВКУ</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Оставьте заявку и мы закрепим за вами скидку
              </p>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 h-auto">
                Оставить заявку
              </Button>
            </div>

            {/* Right Side - Image */}
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://cdn.poehali.dev/projects/08048ba4-919f-4578-8945-c83f39de97ee/files/7eb347b4-322d-4c1a-8846-16614639960f.jpg"
                alt="Доставка и установка памятников"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="font-heading text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Отзывы о нас
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Что говорят наши клиенты о качестве работы и сервисе
            </p>
          </div>

          {/* Carousel Reviews */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setReviewsApi}
            className="w-full max-w-7xl mx-auto mb-8"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {[
                { name: "Анна М.", date: "15 ноября 2025", text: "Очень довольна качеством памятника. Мастера выполнили работу на высоком уровне. Все этапы изготовления были выполнены точно в срок, а результат превзошёл все наши ожидания. Особенно хочу отметить внимательное отношение менеджеров и профессионализм мастеров.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=80" },
                { name: "Дмитрий П.", date: "8 ноября 2025", text: "Заказывали семейный комплекс из красного гранита. Результат превзошёл ожидания. Качество обработки камня на высочайшем уровне, гравировка портрета выполнена очень точно и красиво. Установка прошла быстро и аккуратно. Рекомендую эту компанию всем, кто ищет качественную работу.", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80" },
                { name: "Елена В.", date: "2 ноября 2025", text: "Спасибо за терпение в такой трудный момент. Специалисты очень деликатно всё объяснили и помогли с выбором. Учли все наши пожелания, предложили несколько вариантов дизайна. Памятник получился именно таким, как мы хотели. Очень благодарна за чуткое отношение.", avatar: "https://images.unsplash.com/photo-1574701148212-8518049c7b2c?w=400&h=400&fit=crop&q=80" },
                { name: "Сергей К.", date: "28 октября 2025", text: "Профессиональный подход на всех этапах. От эскиза до установки всё сделано идеально. Порадовало качество материалов и точность работы. Мастера учли все детали, которые мы обсуждали. Сроки были соблюдены, цена осталась такой же, как договаривались изначально.", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&q=80" },
                { name: "Ольга Т.", date: "22 октября 2025", text: "Благодарю за оперативность и внимание к деталям. Памятник получился очень красивым и достойным. Особенно впечатлила работа художника-гравёра - портрет получился живым и узнаваемым. Установили аккуратно, убрали за собой. Очень довольна выбором этой компании.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80" },
                { name: "Виктор Н.", date: "15 октября 2025", text: "Качественная работа за разумные деньги. Рекомендую всем своим знакомым. Обращался в несколько компаний, здесь предложили лучшее соотношение цены и качества. Материал использовали отличный, работу выполнили быстро. Гарантию дали на 10 лет, что очень важно.", avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop&q=80" },
                { name: "Наталья С.", date: "10 октября 2025", text: "Заказывали памятник из чёрного гранита с золочением. Работа выполнена безупречно. Особенно понравилась консультация на начальном этапе - помогли определиться с дизайном и размерами. Мастера настоящие профессионалы своего дела.", avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop&q=80" },
                { name: "Михаил Л.", date: "5 октября 2025", text: "Обратился в эту компанию по рекомендации друга и не пожалел. Качество изготовления на высоте, сроки соблюдены чётко. Цена адекватная, без скрытых доплат. Установка прошла быстро и профессионально. Спасибо за отличную работу!", avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop&q=80" },
                { name: "Людмила Р.", date: "28 сентября 2025", text: "Хочу выразить благодарность всей команде компании. Помогли с выбором материала, предложили несколько вариантов оформления. Портрет получился очень красивым и похожим. Установили аккуратно, всё убрали за собой. Очень довольна результатом.", avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&q=80" },
                { name: "Александр Б.", date: "20 сентября 2025", text: "Заказывал семейный памятник из красного гранита. Результат превзошёл все ожидания. Качество обработки камня отличное, все детали выполнены точно по эскизу. Менеджер всегда был на связи, информировал о ходе работы. Рекомендую!", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&q=80" },
                { name: "Татьяна Г.", date: "12 сентября 2025", text: "Очень довольна качеством работы. Памятник изготовили точно в срок, установили профессионально. Особенно хочу отметить работу гравёра - портрет получился живым, очень похожим. Цены адекватные, без накруток. Спасибо за чуткое отношение в трудный момент.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80" },
                { name: "Игорь М.", date: "5 сентября 2025", text: "Обращался в несколько фирм, выбрал эту компанию и не пожалел. Качество материалов отличное, работа выполнена профессионально. Все этапы прошли в срок, установка быстрая и аккуратная. Гарантия 10 лет внушает доверие. Всем рекомендую.", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=400&fit=crop&q=80" },
                { name: "Светлана К.", date: "28 августа 2025", text: "Заказывали мемориальный комплекс с благоустройством территории. Очень довольны результатом. Дизайнер помог с проектом, мастера всё выполнили качественно. Территория выглядит очень достойно и ухоженно. Спасибо за профессионализм и внимание к деталям.", avatar: "https://images.unsplash.com/photo-1596215143922-eedeaba0d91d?w=400&h=400&fit=crop&q=80" },
                { name: "Владимир Ж.", date: "18 августа 2025", text: "Качественная работа от начала до конца. Менеджер подробно всё объяснил, помог с выбором. Изготовление заняло 3 недели, как и обещали. Установили быстро, всё аккуратно. Памятник получился очень красивым. Цена соответствует качеству. Рекомендую эту компанию.", avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca44?w=400&h=400&fit=crop&q=80" },
                { name: "Марина З.", date: "10 августа 2025", text: "Хочу поблагодарить компанию за отличную работу. Заказывали памятник из габбро-диабаза с художественной гравировкой. Мастера учли все наши пожелания, результат превосходный. Установка прошла без нареканий. Очень довольны качеством и сервисом.", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&q=80" },
                { name: "Анатолий П.", date: "1 августа 2025", text: "Обратился в компанию по рекомендации. Очень доволен результатом. Памятник изготовлен из качественного материала, гравировка выполнена отлично. Все сроки соблюдены, цена честная. Менеджеры вежливые, всегда на связи. Спасибо за профессиональную работу!", avatar: "https://images.unsplash.com/photo-1559548331-f9cb98001426?w=400&h=400&fit=crop&q=80" },
                { name: "Валентина Н.", date: "22 июля 2025", text: "Заказывала памятник для мамы. Очень благодарна сотрудникам компании за чуткое отношение и профессионализм. Помогли выбрать дизайн, подобрали подходящий материал. Памятник получился очень красивым и достойным. Установили аккуратно, территорию убрали.", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&q=80" },
                { name: "Константин Д.", date: "12 июля 2025", text: "Отличная работа! Заказывал комплекс из красного гранита. Качество на высшем уровне, все детали выполнены точно. Особенно понравилась работа с портретом - очень живой и похожий. Установка быстрая, профессиональная. Цены адекватные. Всем рекомендую эту компанию!", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&q=80" }
              ].map((review, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/3">
                  <Card className="bg-white shadow-md border h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Author Info and Stars */}
                      <div className="flex items-start gap-3 mb-4">
                        <img 
                          src={review.avatar}
                          alt={review.name}
                          className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-1">{review.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{review.date}</p>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Icon key={i} name="Star" size={18} className="text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Review Text */}
                      <p className="text-slate-700 text-base leading-relaxed">
                        {review.text}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mb-12">
            {Array.from({ length: reviewsCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => reviewsApi?.scrollTo(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentReview
                    ? 'w-8 bg-primary'
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Перейти к отзыву ${index + 1}`}
              />
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5.0</div>
              <div className="text-sm text-muted-foreground">Средняя оценка</div>
              <div className="flex justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2000+</div>
              <div className="text-sm text-muted-foreground">Довольных клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Рекомендуют нас</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">15</div>
              <div className="text-sm text-muted-foreground">Лет на рынке</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg max-w-md sm:max-w-none mx-auto">
              <div className="text-center sm:text-left">
                <h4 className="font-heading text-lg sm:text-xl font-semibold mb-2">Оставьте свой отзыв</h4>
                <p className="text-muted-foreground text-sm">Поделитесь опытом сотрудничества с нами</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 whitespace-nowrap shrink-0">
                <Icon name="MessageSquare" size={16} className="mr-2" />
                Написать отзыв
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Catalog Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-heading text-4xl font-bold mb-4">Каталог материалов</h3>
            <p className="text-xl text-muted-foreground">Премиальные материалы для изготовления памятников</p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {materials.map((material, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/4">
                  <Card className="h-full hover:shadow-xl transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-square overflow-hidden rounded-lg mb-4">
                        <img 
                          src={material.image}
                          alt={material.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <h4 className="font-heading font-bold text-lg mb-2">{material.name}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-3">{material.description}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-green-600 hover:bg-green-700 text-white border-green-600" />
            <CarouselNext className="bg-green-600 hover:bg-green-700 text-white border-green-600" />
          </Carousel>
        </div>
      </section>

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

      {/* Useful Information Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-heading text-4xl font-bold mb-4">Полезная информация</h3>
            <p className="text-xl text-muted-foreground">Статьи и советы по выбору памятников</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&h=600&fit=crop&q=80"
                  alt="Выбор материала для памятника"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-heading text-xl">
                  Как выбрать материал для памятника
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&h=600&fit=crop&q=80"
                  alt="Этапы изготовления памятника"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-heading text-xl">
                  Этапы изготовления памятника
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80"
                  alt="Уход за памятником"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-heading text-xl">
                  Правильный уход за памятником
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-12">
              Перейти в блог
            </Button>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-heading text-4xl font-bold mb-4">Контакты</h3>
            <p className="text-xl text-muted-foreground">Свяжитесь с нами для консультации</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <Icon name="Phone" size={32} className="text-primary mx-auto mb-4" />
                <CardTitle>Телефон</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">+7 (495) 123-45-67</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Icon name="MapPin" size={32} className="text-primary mx-auto mb-4" />
                <CardTitle>Адрес</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">г. Москва, ул. Примерная, 123</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Icon name="Clock" size={32} className="text-primary mx-auto mb-4" />
                <CardTitle>Режим работы</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">Пн-Пт: 9:00-18:00<br />Сб-Вс: 10:00-16:00</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-12">
              Заказать консультацию
            </Button>
          </div>
        </div>
      </section>

      </div>
    </Layout>
  );
}