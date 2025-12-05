import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import HeaderBottomMenu from '@/components/HeaderBottomMenu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';

const menuItems = [
  {
    title: 'Памятники',
    href: '/catalog?category=monuments',
    items: [
      { title: 'Гранитные памятники', href: '/catalog?category=monuments&type=granite' },
      { title: 'Мраморные памятники', href: '/catalog?category=monuments&type=marble' },
      { title: 'Детские памятники', href: '/catalog?category=monuments&type=children' },
      { title: 'Семейные памятники', href: '/catalog?category=monuments&type=family' },
      { title: 'Эксклюзивные памятники', href: '/catalog?category=monuments&type=exclusive' },
    ],
  },
  {
    title: 'Комплексы',
    href: '/catalog?category=complexes',
    items: [
      { title: 'Мемориальные комплексы', href: '/catalog?category=complexes&type=memorial' },
      { title: 'Семейные захоронения', href: '/catalog?category=complexes&type=family' },
      { title: 'Элитные комплексы', href: '/catalog?category=complexes&type=elite' },
      { title: 'Склепы и усыпальницы', href: '/catalog?category=complexes&type=crypts' },
    ],
  },
  {
    title: 'Благоустройство',
    href: '/catalog?category=improvement',
    items: [
      { title: 'Облицовка могил', href: '/catalog?category=improvement&type=tiling' },
      { title: 'Цветники и вазы', href: '/catalog?category=improvement&type=flowers' },
      { title: 'Ограды и заборы', href: '/catalog?category=improvement&type=fences' },
      { title: 'Скамейки и столы', href: '/catalog?category=improvement&type=furniture' },
      { title: 'Дорожки и ступени', href: '/catalog?category=improvement&type=paths' },
    ],
  },
  {
    title: 'Оформление',
    href: '/catalog?category=decoration',
    items: [
      { title: 'Портреты на камне', href: '/catalog?category=decoration&type=portraits' },
      { title: 'Гравировка текста', href: '/catalog?category=decoration&type=engraving' },
      { title: 'Скарпель (Рубленные буквы)', href: '/scalpel-lettering' },
      { title: 'Художественная резьба', href: '/catalog?category=decoration&type=carving' },
      { title: 'Сусальное золото', href: '/gold-leaf' },
      { title: 'Золочение букв', href: '/catalog?category=decoration&type=gilding' },
      { title: 'Фотокерамика', href: '/catalog?category=decoration&type=photo-ceramics' },
    ],
  },
  {
    title: 'Информация',
    href: '/info',
    items: [
      { title: 'Как заказать памятник', href: '/how-to-order' },
      { title: 'Троекуровское кладбище', href: '/troekurovskoye-cemetery' },
      { title: 'Памятники в Балашихе', href: '/balashiha-monuments' },
      { title: 'Фото наших работ', href: '/portfolio' },
      { title: 'О компании', href: '/about' },
      { title: 'Доставка и установка', href: '/delivery' },
      { title: 'Гарантии', href: '/warranty' },
      { title: 'Контакты', href: '/contacts' },
      { title: 'Часто задаваемые вопросы', href: '/faq' },
    ],
  },
];

const ListItem = ({ className, title, children, href, ...props }: any) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-green-500 hover:text-white focus:bg-green-500 focus:text-white',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { state, getCartCount } = useApp();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Contact Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left side - User actions */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 ml-4">
                {/* 1. Address */}
                <div className="hidden xl:flex items-center space-x-1.5 text-gray-600">
                  <Icon name="MapPin" size={16} />
                  <span className="text-sm">г.Москва, Адмирала Корнилова, 29А</span>
                </div>

                {/* 2. Schedule */}
                <div className="hidden lg:flex items-center space-x-1.5 text-gray-600">
                  <Icon name="Clock" size={16} />
                  <span className="text-sm">Без выходных: с 9:00 до 21:00</span>
                </div>

                {/* 3. Cart */}
                <Button variant="ghost" className="relative h-auto px-3 py-2 text-green-600 hover:text-green-700 hover:bg-green-50" asChild>
                  <Link to="/cart" className="flex items-center space-x-2">
                    <Icon name="ShoppingBasket" size={18} />
                    <span className="text-sm font-medium">Корзина</span>
                    {getCartCount() > 0 && (
                      <Badge 
                        variant="default" 
                        className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-green-500 text-white animate-pulse"
                      >
                        {getCartCount()}
                      </Badge>
                    )}
                  </Link>
                </Button>

                {/* 4. Recently Viewed */}
                <Button variant="ghost" size="icon" className="relative h-9 w-9 text-gray-600 hover:text-gray-900 hover:bg-gray-50 hidden sm:inline-flex" asChild>
                  <Link to="/recently-viewed">
                    <Icon name="Eye" size={18} />
                    {state.recentlyViewed.length > 0 && (
                      <Badge 
                        variant="default" 
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-purple-500 text-white"
                      >
                        {state.recentlyViewed.length}
                      </Badge>
                    )}
                  </Link>
                </Button>

                {/* 4. Search */}
                <div className="relative hidden sm:block">
                  {!searchOpen && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-9 w-9 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setSearchOpen(true)}
                    >
                      <Icon name="Search" size={16} />
                    </Button>
                  )}
                  {searchOpen && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Поиск..."
                        className="w-48 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        autoFocus
                        onBlur={() => setSearchOpen(false)}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') {
                            setSearchOpen(false);
                          }
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* 4. Favorites */}
                <Button variant="ghost" size="icon" className="relative h-9 w-9 text-gray-600 hover:text-gray-900 hover:bg-gray-50 hidden sm:inline-flex" asChild>
                  <Link to="/favorites">
                    <Icon name="Heart" size={18} />
                    {state.favorites.length > 0 && (
                      <Badge 
                        variant="default" 
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-pink-500 text-white"
                      >
                        {state.favorites.length}
                      </Badge>
                    )}
                  </Link>
                </Button>

                {/* 4. Comparison */}
                <Button variant="ghost" size="icon" className="relative h-9 w-9 text-gray-600 hover:text-gray-900 hover:bg-gray-50 hidden sm:inline-flex" asChild>
                  <Link to="/comparison">
                    <Icon name="BarChart3" size={18} />
                    {state.comparison.length > 0 && (
                      <Badge 
                        variant="default" 
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-500 text-white"
                      >
                        {state.comparison.length}
                      </Badge>
                    )}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right side - Phone and call request */}
            <div className="flex items-center space-x-3">
              {/* Telegram button */}
              <a 
                href="https://t.me/memorial_ru" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 transition-colors"
                title="Написать в Telegram"
              >
                <Icon name="Send" size={20} />
              </a>

              {/* WhatsApp button */}
              <a 
                href="https://wa.me/71234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600 transition-colors"
                title="Написать в WhatsApp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.924 3.488"/>
                </svg>
              </a>

              {/* Call request button - скрыт на мобильных */}
              <button 
                className="hidden sm:flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors"
                title="Заказать звонок"
              >
                <Icon name="PhoneCall" size={16} />
                <span className="hidden lg:inline text-sm">Заказать звонок</span>
              </button>

              {/* Email */}
              <a 
                href="mailto:info@memorial.ru" 
                className="hidden md:inline text-gray-600 hover:text-green-600 text-sm transition-colors"
                title="Написать на почту"
              >
                info@memorial.ru
              </a>

              {/* Phone number */}
              <a 
                href="tel:+71234567890" 
                className="text-gray-800 hover:text-green-600 font-medium transition-colors"
              >
                +7 (123) 456-78-90
              </a>
            </div>
          </div>
        </div>
      </div>

      
      {/* Нижнее меню навигации */}
      <HeaderBottomMenu />
    </header>
  );
}