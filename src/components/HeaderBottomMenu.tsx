import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';

interface MenuSection {
  title: string;
  items: MenuItem[];
  expandable?: boolean;
}

interface MenuItem {
  title: string;
  href: string;
  isPopular?: boolean;
  description?: string;
}

interface MainSection {
  id: string;
  title: string;
  categories: MenuSection[];
  previewImage?: string;
}

// Данные для всех разделов
const mainSections: MainSection[] = [
  {
    id: 'monuments',
    title: 'Памятники',
    previewImage: 'https://cdn.poehali.dev/files/5433cf05-89d5-4a4d-af20-60160b7eb60e.png',
    categories: [
      {
        title: 'Форма',
        expandable: true,
        items: [
          { title: 'Прямые', href: '/catalog?form=straight', isPopular: true },
          { title: 'Вертикальные', href: '/catalog?form=vertical', isPopular: true },
          { title: 'Горизонтальные', href: '/catalog?form=horizontal', isPopular: true },
          { title: 'Резные', href: '/catalog?form=carved' },
          { title: 'Фигурные', href: '/catalog?form=figured' },
          { title: 'Двойные', href: '/catalog?form=double' },
          { title: 'Эксклюзивные', href: '/catalog?form=exclusive' },
          { title: 'Сердце', href: '/catalog?form=heart' },
          { title: 'С Крестом', href: '/catalog?form=cross' },
          { title: 'Кресты из гранита', href: '/catalog?form=granite-cross' },
          { title: 'Цветы', href: '/catalog?form=flowers' },
          { title: 'Деревья (Берёза)', href: '/catalog?form=trees' },
          { title: 'Ангел', href: '/catalog?form=angel' },
          { title: 'Птицы (Лебеди, голуби)', href: '/catalog?form=birds' },
          { title: 'Скорбящая', href: '/catalog?form=mourning' },
          { title: 'Свеча', href: '/catalog?form=candle' },
          { title: 'Арка', href: '/catalog?form=arch' },
          { title: 'Составные', href: '/catalog?form=composite' },
        ]
      },
      {
        title: 'Материал',
        expandable: true,
        items: [
          { title: 'Памятники из гранита', href: '/catalog?material=granite', isPopular: true },
          { title: 'Памятники из мрамора', href: '/catalog?material=marble', isPopular: true },
          { title: 'Габбро Диабаз', href: '/catalog?material=gabbro-diabaz' },
          { title: 'Мрамор Коелга', href: '/catalog?material=marble-koelga' },
          { title: 'Капустянский', href: '/catalog?material=kapustyansky' },
          { title: 'Дымовский', href: '/catalog?material=dymovsky' },
          { title: 'Мансуровский', href: '/catalog?material=mansurovsky' },
          { title: 'Сопка Бунтина', href: '/catalog?material=sopka-buntina' },
          { title: 'Балтик Грин', href: '/catalog?material=baltic-green' },
          { title: 'Гранатовый амфиболит', href: '/catalog?material=garnet-amphibolite' },
          { title: 'Змеевик', href: '/catalog?material=serpentine' },
          { title: 'Лабрадорит', href: '/catalog?material=labradorite' },
          { title: 'Лезниковский', href: '/catalog?material=leznikovsky' },
          { title: 'Блю пёрл', href: '/catalog?material=blue-pearl' },
          { title: 'Визаж Блю', href: '/catalog?material=visage-blue' },
          { title: 'Куру Грей', href: '/catalog?material=kuru-grey' },
          { title: 'Индиан Аврора', href: '/catalog?material=indian-aurora' },
          { title: 'Сюскюянсаари', href: '/catalog?material=syuskyuansaari' },
        ]
      },
      {
        title: 'Кому',
        expandable: true,
        items: [
          { title: 'Военный (СВО)', href: '/catalog?for=military-svo', isPopular: true },
          { title: 'Семейный', href: '/catalog?for=family', isPopular: true },
          { title: 'Европейские', href: '/catalog?for=european' },
          { title: 'Женский', href: '/catalog?for=women' },
          { title: 'Православный', href: '/catalog?for=orthodox' },
          { title: 'Мужской', href: '/catalog?for=men' },
          { title: 'Мусульманский', href: '/catalog?for=muslim' },
          { title: 'Родителям', href: '/catalog?for=parents' },
          { title: 'Маме', href: '/catalog?for=mother' },
          { title: 'Католический', href: '/catalog?for=catholic' },
          { title: 'Отцу', href: '/catalog?for=father' },
          { title: 'Детский', href: '/catalog?for=children' },
          { title: 'Армянские', href: '/catalog?for=armenian' },
          { title: 'Двойной', href: '/catalog?for=double' },
          { title: 'Еврейские', href: '/catalog?for=jewish' },
        ]
      },
      {
        title: 'Цвет',
        expandable: true,
        items: [
          { title: 'Чёрные', href: '/catalog?color=black', isPopular: true },
          { title: 'Белые', href: '/catalog?color=white', isPopular: true },
          { title: 'Зелёные', href: '/catalog?color=green' },
          { title: 'Красные', href: '/catalog?color=red' },
          { title: 'Серые', href: '/catalog?color=gray' },
          { title: 'Коричневые', href: '/catalog?color=brown' },
          { title: 'Синие', href: '/catalog?color=blue' },
          { title: 'Комбинированные', href: '/catalog?color=combined' },
        ]
      },
      {
        title: 'Цена',
        items: [
          { title: 'Недорогие', href: '/catalog?price=budget', isPopular: true },
          { title: 'Элитные', href: '/catalog?price=elite', isPopular: true },
        ]
      }
    ]
  },
  {
    id: 'complexes',
    title: 'Комплексы',
    previewImage: '/img/5964ad83-e43f-4005-a721-8f16011459d7.jpg',
    categories: [
      {
        title: 'Типы комплексов',
        items: [
          { title: 'Мемориальные комплексы', href: '/catalog?type=memorial', isPopular: true },
          { title: 'Комбинированный гранит', href: '/catalog?type=combined-granite' },
          { title: 'С оградой', href: '/catalog?type=with-fence' },
          { title: 'Со стеклом', href: '/catalog?type=with-glass' },
          { title: 'С лавочкой', href: '/catalog?type=with-bench' },
          { title: 'Православные', href: '/catalog?type=orthodox' },
          { title: 'Европейские', href: '/catalog?type=european' },
        ]
      },
      {
        title: 'По размеру',
        items: [
          { title: 'На одного', href: '/catalog?size=single' },
          { title: 'На двоих', href: '/catalog?size=double', isPopular: true },
          { title: 'Семейные', href: '/catalog?size=family' },
          { title: 'Угловые', href: '/catalog?size=corner' },
        ]
      }
    ]
  },
  {
    id: 'improvement',
    title: 'Благоустройство',
    previewImage: '/img/57fe978f-1872-48be-a19d-a644801ee280.jpg',
    categories: [
      {
        title: 'Облицовка',
        items: [
          { title: 'Гранитная плитка', href: '/catalog?type=granite-tiles', isPopular: true },
          { title: 'Тротуарная плитка', href: '/catalog?type=paving-stones' },
          { title: 'Брусчатка', href: '/catalog?type=cobblestone' },
          { title: 'Надгробные плиты', href: '/catalog?type=grave-slabs' },
        ]
      },
      {
        title: 'Ограждения',
        items: [
          { title: 'Кованые ограды', href: '/catalog?type=wrought-fences', isPopular: true },
          { title: 'Цоколь из гранита', href: '/catalog?type=granite-fences' },
          { title: 'Цоколь из бетона', href: '/catalog?type=concrete-base' },
          { title: 'Бордюр', href: '/catalog?type=border' },
        ]
      },
      {
        title: 'Декор',
        items: [
          { title: 'Столики и лавочки', href: '/catalog?type=furniture' },
          { title: 'Цветники', href: '/catalog?type=planters' },
          { title: 'Вазы и лампады', href: '/catalog?type=vases' },
          { title: 'Шары и балясины', href: '/catalog?type=spheres' },
          { title: 'Щебень декоративный', href: '/catalog?type=decorative-gravel' },
          { title: 'Газон', href: '/catalog?type=lawn' },
          { title: 'Мемориальные доски', href: '/catalog?type=memorial-plaques' },
        ]
      }
    ]
  },
  {
    id: 'decoration',
    title: 'Оформление',
    previewImage: '/img/9eb6e1bb-9f90-48ad-ae6f-c2aa33ffae1e.jpg',
    categories: [
      {
        title: 'Портреты',
        expandable: true,
        items: [
          { title: 'Портреты на камне', href: '/catalog?type=stone-portraits', isPopular: true },
          { title: 'Фотокерамика', href: '/catalog?type=photo-ceramics', isPopular: true },
          { title: 'Цветные портреты', href: '/catalog?type=color-portraits' },
          { title: 'Портреты во весь рост', href: '/catalog?type=bw-portraits' },
          { title: 'Портрет на стекле', href: '/catalog?type=glass-portraits' },
        ]
      },
      {
        title: 'Гравировка',
        expandable: true,
        items: [
          { title: 'Гравировка текста', href: '/catalog?type=text-engraving' },
          { title: 'Художественная резьба', href: '/catalog?type=artistic-carving' },
          { title: 'Эпитафии', href: '/catalog?type=epitaphs' },
          { title: 'Даты жизни', href: '/catalog?type=life-dates' },
          { title: 'Кресты', href: '/catalog?type=crosses' },
          { title: 'Свечи', href: '/catalog?type=candles' },
          { title: 'Цветы', href: '/catalog?type=flowers' },
          { title: 'Иконы', href: '/catalog?type=icons' },
          { title: 'Ангелочки', href: '/catalog?type=angels' },
          { title: 'Виньетки', href: '/catalog?type=vignettes' },
          { title: 'Птицы и животные', href: '/catalog?type=birds-animals' },
          { title: 'Военная тематика', href: '/catalog?type=military' },
          { title: 'Профессии', href: '/catalog?type=professions' },
          { title: 'Веточки', href: '/catalog?type=branches' },
          { title: 'Природа', href: '/catalog?type=nature' },
          { title: 'Храмы, Церкви, Мечети', href: '/catalog?type=temples' },
          { title: 'Ислам', href: '/catalog?type=islam' },
          { title: 'Одежда', href: '/catalog?type=clothing' },
          { title: 'Рамки', href: '/catalog?type=frames' },
        ]
      },
      {
        title: 'Надписи',
        expandable: true,
        items: [
          { title: 'Бронзовые буквы', href: '/catalog?type=bronze-letters' },
          { title: 'Скарпель (Рубленные буквы)', href: '/scalpel-lettering' },
          { title: 'Сусальное золото', href: '/gold-leaf' },
          { title: 'Пескоструй', href: '/catalog?type=sandblasting' },
          { title: 'Эпитафии', href: '/catalog?type=epitaphs-text' },
          { title: 'Шрифты', href: '/catalog?type=fonts' },
        ]
      }
    ]
  },
  {
    id: 'information',
    title: 'Информация',
    categories: [
      {
        title: 'Услуги',
        items: [
          { title: 'Как заказать памятник', href: '/how-to-order' },
          { title: 'Вызов менеджера', href: '/manager-call' },
          { title: 'Дизайн памятников', href: '/monument-design' },
          { title: 'Доставка', href: '/delivery' },
          { title: 'Установка', href: '/installation' },
          { title: 'Оплата', href: '/payment' },
        ]
      },
      {
        title: 'О нас',
        items: [
          { title: 'О компании', href: '/about' },
          { title: 'Гранитная мастерская', href: '/granite-workshop' },
          { title: 'Сертификаты', href: '/certificates' },
          { title: 'Гарантии', href: '/warranty' },
          { title: 'Отзывы клиентов', href: '/reviews' },
        ]
      },
      {
        title: 'Полезная информация',
        items: [
          { title: 'Часто задаваемые вопросы', href: '/faq' },
          { title: 'Фото наших работ', href: '/portfolio' },
          { title: 'Кладбища Москвы и МО', href: '/cemeteries' },
          { title: 'Памятники в городах МО', href: '/regions/moscow-region' },
          { title: 'Сроки изготовления', href: '/production-times' },
        ]
      },
      {
        title: 'Блог',
        items: [
          { title: 'О благоустройстве могил', href: '/blog/grave-improvement' },
          { title: 'О материалах', href: '/blog/materials' },
          { title: 'Нормативные документы', href: '/blog/regulations' },
          { title: 'О кладбищах', href: '/blog/cemeteries' },
          { title: 'Уход за памятниками', href: '/care-guide' },
        ]
      }
    ]
  }
];

export default function HeaderBottomMenu() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedSections, setMobileExpandedSections] = useState<string[]>([]);
  const [mobileExpandedCategories, setMobileExpandedCategories] = useState<string[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { state, getCartCount } = useApp();

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryTitle) 
        ? prev.filter(t => t !== categoryTitle)
        : [...prev, categoryTitle]
    );
  };

  const getVisibleItems = (category: MenuSection) => {
    if (!category.expandable) return category.items;
    
    const isExpanded = expandedCategories.includes(category.title);
    return isExpanded ? category.items : category.items.slice(0, 6);
  };

  const hasMoreItems = (category: MenuSection) => {
    return category.expandable && category.items.length > 6;
  };

  const handleMouseEnter = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const handleMouseLeave = () => {
    setActiveSection(null);
  };

  const toggleMobileSection = (sectionId: string) => {
    setMobileExpandedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleMobileCategory = (categoryTitle: string) => {
    setMobileExpandedCategories(prev => 
      prev.includes(categoryTitle)
        ? prev.filter(title => title !== categoryTitle)
        : [...prev, categoryTitle]
    );
  };

  return (
    <div className="bg-slate-50 border-t border-slate-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Основная навигация */}
          <div 
            className="flex items-center justify-between py-3"
            onMouseLeave={handleMouseLeave}
          >
            {/* Логотип слева */}
            <Link to="/" className="flex items-center space-x-2 mr-8">

              <span className="font-serif text-xl font-semibold text-green-600">Pamyatniki-ritual.ru</span>
            </Link>

            {/* Навигационные разделы - скрыто на мобильных */}
            <div className="hidden lg:flex items-center space-x-6">
              {mainSections.map((section) => (
                <div key={section.id} className="relative">
                  <Button
                    variant="ghost"
                    className={cn(
                      "text-slate-700 hover:text-primary hover:bg-primary/5 px-4 py-2 text-sm font-medium transition-all duration-200 flex items-center space-x-1 cursor-default",
                      activeSection === section.id && "bg-primary/5 text-primary shadow-sm",
                      section.id === 'monuments' && ""
                    )}
                    onMouseEnter={() => handleMouseEnter(section.id)}
                  >
                    <span>{section.title}</span>
                    {section.categories.length > 0 && <ChevronDown className="h-3 w-3" />}
                  </Button>
                </div>
              ))}

              {/* Контакты без выпадающего меню */}
              <Button
                variant="ghost"
                className="text-slate-700 hover:text-primary hover:bg-primary/5 px-4 py-2 text-sm font-medium transition-all duration-200"
                asChild
              >
                <Link to="/contacts">Контакты</Link>
              </Button>
            </div>

            {/* Мобильное меню */}
            <div className="lg:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Icon name="Menu" size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[320px] overflow-y-auto">
                  <SheetHeader className="mb-6">
                    <SheetTitle className="text-left">Каталог товаров</SheetTitle>
                  </SheetHeader>
                  
                  <div className="space-y-4">
                    {/* Основные разделы */}
                    {mainSections.map((section) => (
                      <Collapsible key={section.id}>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between p-4 h-auto text-left border rounded-lg hover:bg-slate-50"
                            onClick={() => toggleMobileSection(section.id)}
                          >
                            <div className="font-semibold text-slate-900">{section.title}</div>
                            <Icon 
                              name={mobileExpandedSections.includes(section.id) ? "ChevronUp" : "ChevronDown"} 
                              size={16} 
                            />
                          </Button>
                        </CollapsibleTrigger>
                        
                        {mobileExpandedSections.includes(section.id) && (
                          <CollapsibleContent className="mt-2 ml-4 space-y-3">
                            {/* Ссылка на весь раздел */}
                            <Link
                              to={section.href}
                              className="block p-2 text-sm font-medium text-primary hover:bg-primary/5 rounded"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              Все {section.title.toLowerCase()}
                            </Link>
                            
                            {/* Категории раздела */}
                            {section.categories.map((category) => (
                              <Collapsible key={category.title}>
                                <CollapsibleTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="w-full justify-between p-2 h-auto text-left text-sm"
                                    onClick={() => toggleMobileCategory(category.title)}
                                  >
                                    <span className="font-medium text-primary">{category.title}</span>
                                    <Icon 
                                      name={mobileExpandedCategories.includes(category.title) ? "ChevronUp" : "ChevronDown"} 
                                      size={14} 
                                    />
                                  </Button>
                                </CollapsibleTrigger>
                                
                                {mobileExpandedCategories.includes(category.title) && (
                                  <CollapsibleContent className="ml-2 mt-2 space-y-1">
                                    {category.items.map((item) => (
                                      <Link
                                        key={item.title}
                                        to={item.href}
                                        className="block p-2 text-xs rounded hover:bg-slate-50 transition-colors text-slate-600"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        <span>{item.title}</span>
                                      </Link>
                                    ))}
                                  </CollapsibleContent>
                                )}
                              </Collapsible>
                            ))}
                          </CollapsibleContent>
                        )}
                      </Collapsible>
                    ))}

                    {/* Контакты */}
                    <Link
                      to="/contacts"
                      className="block p-4 border rounded-lg font-medium text-slate-900 hover:bg-slate-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Контакты
                    </Link>

                    {/* Функциональные ссылки */}
                    <div className="pt-4 border-t space-y-3">
                      <div className="text-xs font-medium text-slate-500 px-2">ФУНКЦИИ</div>
                      
                      {/* Поиск */}
                      <div className="bg-slate-50 rounded-lg">
                        {!mobileSearchOpen && (
                          <Button
                            variant="ghost"
                            className="w-full justify-start p-3 h-auto hover:bg-slate-100"
                            onClick={() => setMobileSearchOpen(true)}
                          >
                            <Icon name="Search" size={18} className="mr-3 text-slate-500" />
                            <span className="font-medium">Поиск товаров</span>
                          </Button>
                        )}
                        {mobileSearchOpen && (
                          <div className="p-3 space-y-3">
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                placeholder="Введите запрос для поиска..."
                                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                autoFocus
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9"
                                onClick={() => setMobileSearchOpen(false)}
                              >
                                <Icon name="X" size={16} />
                              </Button>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" className="flex-1">
                                <Icon name="Search" size={14} className="mr-1" />
                                Найти
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => setMobileSearchOpen(false)}>
                                Отмена
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      <Link
                        to="/favorites"
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon name="Heart" size={18} className="text-red-500" />
                          <span className="font-medium">Избранное</span>
                        </div>
                        {state.favorites.length > 0 && (
                          <Badge variant="destructive" className="rounded-full">
                            {state.favorites.length}
                          </Badge>
                        )}
                      </Link>

                      <Link
                        to="/comparison"
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon name="BarChart3" size={18} className="text-blue-500" />
                          <span className="font-medium">Сравнение</span>
                        </div>
                        {state.comparison.length > 0 && (
                          <Badge variant="secondary" className="rounded-full">
                            {state.comparison.length}
                          </Badge>
                        )}
                      </Link>

                      <Link
                        to="/recently-viewed"
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon name="Eye" size={18} className="text-slate-500" />
                          <span className="font-medium">Просмотренные</span>
                        </div>
                        {state.recentlyViewed.length > 0 && (
                          <Badge variant="outline" className="rounded-full">
                            {state.recentlyViewed.length}
                          </Badge>
                        )}
                      </Link>

                      <Link
                        to="/cart"
                        className="flex items-center justify-between p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors border border-primary/20"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon name="ShoppingCart" size={18} className="text-primary" />
                          <span className="font-medium text-primary">Корзина</span>
                        </div>
                        {getCartCount() > 0 && (
                          <Badge className="rounded-full bg-primary">
                            {getCartCount()}
                          </Badge>
                        )}
                      </Link>
                    </div>

                    {/* Контактная информация */}
                    <div className="pt-4 border-t space-y-3">
                      <div className="text-xs font-medium text-slate-500 px-2">КОНТАКТЫ</div>
                      
                      <div className="space-y-3 px-2">
                        <div className="flex items-center space-x-3">
                          <Icon name="Phone" size={16} className="text-green-500" />
                          <div>
                            <div className="font-medium text-sm">+7 (495) 201-32-27</div>
                            <div className="text-xs text-slate-500">Звонки с 9:00 до 21:00</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Icon name="Mail" size={16} className="text-blue-500" />
                          <div>
                            <div className="font-medium text-sm">info@postament.ru</div>
                            <div className="text-xs text-slate-500">Ответим в течение часа</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Icon name="MapPin" size={16} className="text-red-500" />
                          <div>
                            <div className="font-medium text-sm">Москва и область</div>
                            <div className="text-xs text-slate-500">Выезд мастера бесплатно</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Выпадающее меню */}
          {activeSection && (
            <div 
              className="absolute top-full left-0 right-0 bg-white border border-slate-200 shadow-lg z-50 animate-in fade-in-0 slide-in-from-top-2 duration-300 max-h-[80vh] overflow-y-auto"
              onMouseEnter={() => setActiveSection(activeSection)}
              onMouseLeave={handleMouseLeave}
            >
              {(() => {
                const section = mainSections.find(s => s.id === activeSection);
                if (!section || section.categories.length === 0) return null;

                return (
                  <div className="p-4">
                    {/* Основная сетка с изображением справа */}
                    <div className="grid grid-cols-4 gap-6">
                      {/* Первые 3 столбца для категорий */}
                      <div className="col-span-3">
                        <div className={cn(
                          "grid gap-4",
                          section.id === 'information' ? "grid-cols-3" :
                          section.categories.length <= 2 ? "grid-cols-2" :
                          section.categories.length === 3 ? "grid-cols-3" :
                          "grid-cols-3"
                        )}>
                          {section.categories.slice(0, section.id === 'information' ? 3 : section.categories.length).map((category) => (
                            <div 
                              key={category.title} 
                              className="space-y-2"
                              onMouseEnter={() => setHoveredCategory(category.title)}
                              onMouseLeave={() => setHoveredCategory(null)}
                            >
                              {/* Заголовок категории */}
                              <div className="border-b border-slate-200 pb-1">
                                <h4 className="font-semibold text-sm text-primary uppercase tracking-wide">
                                  {category.title}
                                </h4>
                              </div>

                              {/* Список элементов категории */}
                              <div className="space-y-1">
                                {getVisibleItems(category).map((item) => (
                                  <Link
                                    key={item.title}
                                    to={item.href}
                                    className="block text-sm text-slate-600 hover:text-primary transition-colors duration-200 py-0.5 px-1 rounded hover:bg-slate-50"
                                  >
                                    <span>{item.title}</span>
                                    {item.description && (
                                      <p className="text-xs text-slate-500 mt-0.5">
                                        {item.description}
                                      </p>
                                    )}
                                  </Link>
                                ))}
                              </div>

                              {/* Кнопка "Развернуть" */}
                              {hasMoreItems(category) && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleCategory(category.title)}
                                  className="w-full justify-between text-xs hover:bg-slate-50"
                                  style={{ 
                                    color: 'rgb(46, 184, 45)',
                                  }}
                                >
                                  <span>
                                    {expandedCategories.includes(category.title) 
                                      ? 'Свернуть' 
                                      : 'Развернуть'
                                    }
                                  </span>
                                  {expandedCategories.includes(category.title) ? (
                                    <ChevronDown className="h-3 w-3" />
                                  ) : (
                                    <ChevronRight className="h-3 w-3" />
                                  )}
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 4-й столбец для изображения предпросмотра или блога */}
                      <div className="col-span-1">
                        {section.id === 'information' ? (
                          /* Блок "Блог" для раздела Информация */
                          <div className="sticky top-4">
                            {(() => {
                              const blogCategory = section.categories.find(cat => cat.title === 'Блог');
                              if (!blogCategory) return null;
                              
                              return (
                                <div className="space-y-2">
                                  {/* Заголовок блога */}
                                  <div className="border-b border-slate-200 pb-1">
                                    <h4 className="font-semibold text-sm text-primary uppercase tracking-wide">
                                      {blogCategory.title}
                                    </h4>
                                  </div>

                                  {/* Список элементов блога */}
                                  <div className="space-y-1">
                                    {blogCategory.items.map((item) => (
                                      <Link
                                        key={item.title}
                                        to={item.href}
                                        className="block text-sm text-slate-600 hover:text-primary transition-colors duration-200 py-0.5 px-1 rounded hover:bg-slate-50"
                                      >
                                        <span>{item.title}</span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : (
                          /* Изображение для остальных разделов */
                          section.previewImage && (
                            <div className="sticky top-4">
                              <div className="aspect-square overflow-hidden rounded-lg bg-white border border-slate-200">
                                <img 
                                  src={section.previewImage} 
                                  alt={`Предпросмотр ${section.title}`}
                                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>


                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}