import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Icon from '@/components/ui/icon';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';

const catalogSections = [
  {
    title: 'Памятники',
    href: '/catalog?category=monuments',
    icon: 'Monument'
  },
  {
    title: 'Комплексы',
    href: '/catalog?category=complexes',
    icon: 'Package'
  },
  {
    title: 'Благоустройство',
    href: '/catalog?category=improvement',
    icon: 'Hammer'
  },
  {
    title: 'Оформление',
    href: '/catalog?category=decoration',
    icon: 'PaintBucket'
  }
];

const infoSections = [
  { title: 'Как заказать памятник', href: '/how-to-order' },
  { title: 'О компании', href: '/about' },
  { title: 'Контакты', href: '/contacts' },
  { title: 'Доставка и установка', href: '/delivery' },
  { title: 'Гарантии', href: '/warranty' },
  { title: 'Часто задаваемые вопросы', href: '/faq' }
];

export default function MobileBottomNav() {
  const location = useLocation();
  const { state, getCartCount } = useApp();
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Нижняя панель навигации (только мобильная) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
        <div className="grid grid-cols-4 h-16">
          {/* Каталог */}
          <Sheet open={catalogOpen} onOpenChange={setCatalogOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-green-600 active:bg-gray-50">
                <Icon name="Grid3x3" size={22} />
                <span className="text-xs">Каталог</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
              <SheetHeader>
                <SheetTitle>Каталог</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-2">
                {catalogSections.map((section) => (
                  <Link
                    key={section.href}
                    to={section.href}
                    onClick={() => setCatalogOpen(false)}
                    className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <Icon name={section.icon as any} size={24} className="text-green-600" />
                    <span className="text-base font-medium">{section.title}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

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
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-green-600 active:bg-gray-50">
                <Icon name="Menu" size={22} />
                <span className="text-xs">Меню</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
              <SheetHeader>
                <SheetTitle>Меню</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Информация</h3>
                  <div className="space-y-1">
                    {infoSections.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block p-3 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                      >
                        <span className="text-base">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Отступ снизу для контента (только мобильная) */}
      <div className="h-16 md:hidden" />
    </>
  );
}
