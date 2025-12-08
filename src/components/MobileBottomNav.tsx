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
        ]
      },
      {
        title: 'Материал',
        items: [
          { title: 'Гранит', href: '/catalog?material=granite' },
          { title: 'Мрамор', href: '/catalog?material=marble' },
          { title: 'Габбро Диабаз', href: '/catalog?material=gabbro-diabaz' },
          { title: 'Мансуровский', href: '/catalog?material=mansurovsky' },
        ]
      },
      {
        title: 'Кому',
        items: [
          { title: 'Военный (СВО)', href: '/catalog?for=military-svo' },
          { title: 'Семейный', href: '/catalog?for=family' },
          { title: 'Женский', href: '/catalog?for=women' },
          { title: 'Мужской', href: '/catalog?for=men' },
          { title: 'Детский', href: '/catalog?for=children' },
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
          { title: 'С оградой', href: '/catalog?type=with-fence' },
          { title: 'С лавочкой', href: '/catalog?type=with-bench' },
          { title: 'Православные', href: '/catalog?type=orthodox' },
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
        ]
      },
      {
        title: 'Ограждения',
        items: [
          { title: 'Кованые ограды', href: '/catalog?type=wrought-fences' },
          { title: 'Цоколь из гранита', href: '/catalog?type=granite-fences' },
          { title: 'Бордюр', href: '/catalog?type=border' },
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
          { title: 'Гравировка портрета', href: '/catalog?type=portrait-engraving' },
          { title: 'Ручная работа', href: '/catalog?type=portrait-hand' },
          { title: 'Фотокерамика', href: '/catalog?type=photo-ceramics' },
        ]
      },
      {
        title: 'Надписи',
        items: [
          { title: 'Гравировка ФИО', href: '/catalog?type=fio-engraving' },
          { title: 'Скарпель', href: '/scalpel-lettering' },
          { title: 'Золочение букв', href: '/catalog?type=gilding' },
        ]
      }
    ]
  }
];

const infoSections = [
  {
    title: 'Информация',
    items: [
      { title: 'Как заказать памятник', href: '/how-to-order' },
      { title: 'О компании', href: '/about' },
      { title: 'Фото наших работ', href: '/portfolio' },
      { title: 'Доставка и установка', href: '/delivery' },
      { title: 'Гарантии', href: '/warranty' },
      { title: 'Часто задаваемые вопросы', href: '/faq' },
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
            onClick={() => setCatalogOpen(true)}
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
            onClick={() => setMenuOpen(true)}
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
