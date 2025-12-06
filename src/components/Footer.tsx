import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

export default function Footer() {
  const socialLinks = [
    { name: 'WhatsApp', icon: 'MessageCircle', href: 'https://wa.me/71234567890', color: 'text-green-600' },
    { name: 'Telegram', icon: 'Send', href: 'https://t.me/memorial_studio', color: 'text-blue-500' },
    { name: 'VKontakte', icon: 'Users', href: 'https://vk.com/memorial_studio', color: 'text-blue-600' },
    { name: 'Одноклассники', icon: 'Globe', href: 'https://ok.ru/memorial_studio', color: 'text-orange-500' },
  ];

  const servicesLinks = [
    { title: 'Установка памятников', href: '/installation' },
    { title: 'Доставка', href: '/delivery' },
    { title: 'Дизайн памятников', href: '/monument-design' },
    { title: 'Выезд на кладбище', href: '/cemetery-visit' },
  ];

  const blogLinks = [
    { title: 'Как заказать', href: '/how-to-order' },
    { title: 'Сроки изготовления', href: '/production-times' },
    { title: 'Оплата', href: '/payment' },
    { title: 'Скидки', href: '/discounts' },
    { title: 'Компенсация', href: '/compensation' },
  ];

  const companyLinks = [
    { title: 'Отзывы', href: '/reviews' },
    { title: 'О гранитной мастерской', href: '/granite-workshop' },
    { title: 'Гарантии', href: '/warranty' },
    { title: 'Фото памятников', href: '/portfolio' },
    { title: 'Сертификаты', href: '/certificates' },
  ];

  const legalLinks = [
    { title: 'Публичная оферта', href: '/offer-agreement' },
    { title: 'Политика конфиденциальности', href: '/privacy-policy' },
    { title: 'Карта сайта', href: '/sitemap' },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          
          {/* Company Info & Contact */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                  <Icon name="Mountain" size={20} className="text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">Вечная Память</span>
              </div>
            </div>

            {/* Address & Schedule */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={18} className="text-primary flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <h4 className="font-semibold mb-2">Адрес или самовывоз со склада</h4>
                  <p className="text-slate-300">г. Москва, ул. Мемориальная, 15</p>
                  <p className="text-slate-400 mt-1">
                    Ежедневно с 9:00 до 22:00
                  </p>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-start space-x-3">
                <Icon name="Phone" size={18} className="text-primary flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <a href="tel:+71234567890" className="text-slate-300 hover:text-white transition-colors">
                    +7 (123) 456-78-90
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3">
                <Icon name="Mail" size={18} className="text-primary flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <a href="mailto:info@memorial.ru" className="text-slate-300 hover:text-white transition-colors">
                    info@memorial.ru
                  </a>
                </div>
              </div>
            </div>

            {/* Call Manager Button */}
            <Button className="w-full bg-primary hover:bg-primary/90">
              <Icon name="Phone" size={16} className="mr-2" />
              Вызвать менеджера
            </Button>

            {/* Social Networks */}
            <div>
              <h4 className="font-medium mb-3">Мы в социальных сетях</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors group"
                    title={social.name}
                  >
                    <Icon 
                      name={social.icon as any} 
                      size={18} 
                      className={`${social.color} group-hover:scale-110 transition-transform`} 
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Услуги</h3>
            <ul className="space-y-2">
              {servicesLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-slate-300 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Блог</h3>
            <ul className="space-y-2">
              {blogLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-slate-300 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">О компании</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-slate-300 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-slate-700" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-slate-400">
            <p>© 2024 Вечная Память. Все права защищены.</p>
            
            {/* Payment Systems */}
            <div className="flex items-center space-x-3">
              <Icon name="CreditCard" size={20} className="text-slate-500" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5 opacity-70" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 opacity-70" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/8b/MIR_logo.svg" alt="МИР" className="h-5 opacity-70" />
              <span className="text-slate-500">СБП</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 text-sm text-slate-400">
            {legalLinks.map((link, index) => (
              <span key={link.href} className="flex items-center">
                <Link 
                  to={link.href} 
                  className="hover:text-slate-300 transition-colors"
                >
                  {link.title}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="mx-2 text-slate-600">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}