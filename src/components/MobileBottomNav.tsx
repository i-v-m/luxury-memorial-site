import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Icon from '@/components/ui/icon';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const catalogSections = [
  {
    title: 'Памятники',
    icon: 'Monument',
    subcategories: [
      {
        title: 'Форма',
        items: [
          { title: 'Прямые', href: '/catalog?form=straight' },
          { title: 'Вертикальные', href: '/catalog?form=vertical' },
          { title: 'Горизонтальные', href: '/catalog?form=horizontal' },
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
        items: [
          { title: 'Памятники из гранита', href: '/catalog?material=granite' },
          { title: 'Памятники из мрамора', href: '/catalog?material=marble' },
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
        items: [
          { title: 'Военный (СВО)', href: '/catalog?for=military-svo' },
          { title: 'Семейный', href: '/catalog?for=family' },
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
        items: [
          { title: 'Чёрные', href: '/catalog?color=black' },
          { title: 'Белые', href: '/catalog?color=white' },
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
          { title: 'Недорогие', href: '/catalog?price=budget' },
          { title: 'Элитные', href: '/catalog?price=elite' },
        ]
      }
    ]
  },
  {
    title: 'Комплексы',
    icon: 'Package',
    subcategories: [
      {
        title: 'Типы комплексов',
        items: [
          { title: 'Мемориальные комплексы', href: '/catalog?type=memorial' },
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
          { title: 'На двоих', href: '/catalog?size=double' },
          { title: 'Семейные', href: '/catalog?size=family' },
          { title: 'Угловые', href: '/catalog?size=corner' },
        ]
      }
    ]
  },
  {
    title: 'Благоустройство',
    icon: 'Hammer',
    subcategories: [
      {
        title: 'Облицовка',
        items: [
          { title: 'Гранитная плитка', href: '/catalog?type=granite-tiles' },
          { title: 'Тротуарная плитка', href: '/catalog?type=paving-stones' },
          { title: 'Брусчатка', href: '/catalog?type=cobblestone' },
          { title: 'Надгробные плиты', href: '/catalog?type=grave-slabs' },
        ]
      },
      {
        title: 'Ограждения',
        items: [
          { title: 'Кованые ограды', href: '/catalog?type=wrought-fences' },
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
    title: 'Оформление',
    icon: 'PaintBucket',
    subcategories: [
      {
        title: 'Портреты',
        items: [
          { title: 'Портреты на камне', href: '/catalog?type=stone-portraits' },
          { title: 'Фотокерамика', href: '/catalog?type=photo-ceramics' },
          { title: 'Цветные портреты', href: '/catalog?type=color-portraits' },
          { title: 'Портреты во весь рост', href: '/catalog?type=bw-portraits' },
          { title: 'Портрет на стекле', href: '/catalog?type=glass-portraits' },
        ]
      },
      {
        title: 'Гравировка',
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
  }
];

const infoSections = [
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
  },
  {
    title: 'Контакты',
    items: [
      { title: 'Связаться с нами', href: '/contacts' },
      { title: 'Троекуровское кладбище', href: '/troekurovskoye-cemetery' },
      { title: 'Памятники в Балашихе', href: '/balashiha-monuments' },
    ]
  }
];

export default function MobileBottomNav() {
  const location = useLocation();
  const { state, getCartCount } = useApp();
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (catalogOpen && menuOpen) {
      setMenuOpen(false);
    }
  }, [catalogOpen]);

  useEffect(() => {
    if (menuOpen && catalogOpen) {
      setCatalogOpen(false);
    }
  }, [menuOpen]);

  return (
    <>
      {/* Overlay */}
      {(catalogOpen || menuOpen) && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => {
            setCatalogOpen(false);
            setMenuOpen(false);
          }}
        />
      )}

      {/* Каталог (слева) */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 md:hidden transform transition-transform duration-300 ease-out ${
          catalogOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold">Каталог</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCatalogOpen(false)}
            className="h-8 w-8"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
        
        <div className="overflow-y-auto h-[calc(100%-64px)] p-4">
          {catalogSections.map((section, idx) => (
            <Collapsible key={idx} className="mb-2">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Icon name={section.icon as any} size={20} className="text-green-600" />
                  <span className="font-medium">{section.title}</span>
                </div>
                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2 pl-9 space-y-1">
                {section.subcategories.map((subcategory, subIdx) => (
                  <Collapsible key={subIdx} className="mb-2">
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium text-gray-700 hover:text-green-600">
                      <span>{subcategory.title}</span>
                      <ChevronDown className="h-3 w-3 transition-transform duration-200" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-1 pt-1">
                      {subcategory.items.map((item, itemIdx) => (
                        <Link
                          key={itemIdx}
                          to={item.href}
                          onClick={() => setCatalogOpen(false)}
                          className="block p-2 text-sm text-gray-600 hover:text-green-600 hover:bg-gray-50 rounded transition-colors"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>

      {/* Меню (справа) */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 md:hidden transform transition-transform duration-300 ease-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold">Меню</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(false)}
            className="h-8 w-8"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
        
        <div className="overflow-y-auto h-[calc(100%-64px)] p-4">
          {infoSections.map((section, idx) => (
            <Collapsible key={idx} className="mb-4" defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900">{section.title}</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2 space-y-1">
                {section.items.map((item, itemIdx) => (
                  <Link
                    key={itemIdx}
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block p-3 text-sm text-gray-600 hover:text-green-600 hover:bg-gray-50 rounded transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>

      {/* Нижняя панель навигации (только мобильная) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
        <div className="grid grid-cols-4 h-16">
          {/* Каталог */}
          <button 
            onClick={() => setCatalogOpen(!catalogOpen)}
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-green-600 active:bg-gray-50"
          >
            <Icon name="Grid3x3" size={22} />
            <span className="text-xs">Каталог</span>
          </button>

          {/* Корзина */}
          <Link
            to="/cart"
            className={`flex flex-col items-center justify-center space-y-1 relative ${
              location.pathname === '/cart' ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            <Icon name="ShoppingBasket" size={22} />
            <span className="text-xs">Корзина</span>
            {getCartCount() > 0 && (
              <Badge 
                variant="default" 
                className="absolute top-1 right-1/4 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-green-500 text-white"
              >
                {getCartCount()}
              </Badge>
            )}
          </Link>

          {/* Избранное */}
          <Link
            to="/favorites"
            className={`flex flex-col items-center justify-center space-y-1 relative ${
              location.pathname === '/favorites' ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            <Icon name="Heart" size={22} />
            <span className="text-xs">Избранное</span>
            {state.favorites.length > 0 && (
              <Badge 
                variant="default" 
                className="absolute top-1 right-1/4 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-pink-500 text-white"
              >
                {state.favorites.length}
              </Badge>
            )}
          </Link>

          {/* Меню */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-green-600 active:bg-gray-50"
          >
            <Icon name="Menu" size={22} />
            <span className="text-xs">Меню</span>
          </button>
        </div>
      </div>

      {/* Отступ снизу для контента (только мобильная) */}
      <div className="h-16 md:hidden" />
    </>
  );
}