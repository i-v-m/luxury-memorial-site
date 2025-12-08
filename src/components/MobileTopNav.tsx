import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

const managers = [
  {
    name: 'Александра',
    role: 'Старший менеджер',
    phone: '+7 (123) 456-78-90',
    telegram: 'https://t.me/alexandra_manager',
    whatsapp: 'https://wa.me/71234567890'
  },
  {
    name: 'Михаил',
    role: 'Менеджер по работе с клиентами',
    phone: '+7 (123) 456-78-91',
    telegram: 'https://t.me/mikhail_manager',
    whatsapp: 'https://wa.me/71234567891'
  }
];

export default function MobileTopNav() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 md:hidden">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Логотип/Название */}
        <Link to="/" className="text-lg font-bold text-gray-900">
          Мемориал
        </Link>

        {/* Адрес */}
        <Button
          variant="ghost"
          size="sm"
          className="text-xs px-2"
          asChild
        >
          <a href="https://yandex.ru/maps/-/CDdkjVQz" target="_blank" rel="noopener noreferrer">
            <Icon name="MapPin" size={16} className="mr-1" />
            Адрес
          </a>
        </Button>

        {/* Связаться */}
        <Sheet open={contactOpen} onOpenChange={setContactOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="text-xs px-2">
              <Icon name="Phone" size={16} className="mr-1" />
              Связаться
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
            <SheetHeader>
              <SheetTitle>Связаться с нами</SheetTitle>
            </SheetHeader>
            
            <div className="mt-6 space-y-6">
              {/* Способы связи */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Способы связи</h3>
                <div className="space-y-3">
                  <a 
                    href="tel:+71234567890" 
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 active:bg-gray-100"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Icon name="Phone" size={20} className="text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">Позвонить</div>
                      <div className="text-sm text-gray-500">+7 (123) 456-78-90</div>
                    </div>
                  </a>

                  <a 
                    href="https://wa.me/71234567890" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 active:bg-gray-100"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.924 3.488"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-sm text-gray-500">Написать в мессенджер</div>
                    </div>
                  </a>

                  <a 
                    href="https://t.me/memorial_ru" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 active:bg-gray-100"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon name="Send" size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Telegram</div>
                      <div className="text-sm text-gray-500">Написать в телеграм</div>
                    </div>
                  </a>

                  <a 
                    href="mailto:info@memorial.ru"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 active:bg-gray-100"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon name="Mail" size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-gray-500">info@memorial.ru</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Менеджеры */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Наши менеджеры</h3>
                <div className="space-y-4">
                  {managers.map((manager) => (
                    <div key={manager.name} className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900">{manager.name}</div>
                      <div className="text-sm text-gray-500 mb-3">{manager.role}</div>
                      <div className="space-y-2">
                        <a 
                          href={`tel:${manager.phone.replace(/\D/g, '')}`}
                          className="flex items-center space-x-2 text-sm text-gray-700"
                        >
                          <Icon name="Phone" size={16} />
                          <span>{manager.phone}</span>
                        </a>
                        <div className="flex items-center space-x-3">
                          <a 
                            href={manager.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.924 3.488"/>
                            </svg>
                          </a>
                          <a 
                            href={manager.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Icon name="Send" size={20} />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Кнопка обратного звонка */}
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white h-12"
                size="lg"
              >
                <Icon name="Phone" size={20} className="mr-2" />
                Заказать обратный звонок
              </Button>

              {/* Контакты */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Адрес офиса</h3>
                <a 
                  href="https://yandex.ru/maps/-/CDdkjVQz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start space-x-2 text-gray-700"
                >
                  <Icon name="MapPin" size={18} className="mt-0.5 flex-shrink-0" />
                  <span>г. Москва, Адмирала Корнилова, 29А</span>
                </a>
                <div className="flex items-center space-x-2 text-gray-700 mt-2">
                  <Icon name="Clock" size={18} />
                  <span>Без выходных: с 9:00 до 21:00</span>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
