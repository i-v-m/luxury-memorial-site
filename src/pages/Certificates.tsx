import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Layout from '@/components/Layout';

export default function Certificates() {
  const certificates = [
    {
      id: 1,
      title: 'Сертификат соответствия ГОСТ Р',
      description: 'Подтверждает соответствие продукции требованиям государственных стандартов',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=1000&fit=crop&q=80',
      number: 'РОСС RU.АБ98.Н12345',
      validUntil: '2026-12-31'
    },
    {
      id: 2,
      title: 'Сертификат качества гранита',
      description: 'Гарантирует высокое качество используемых материалов',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=1000&fit=crop&q=80',
      number: 'СК-ГР-2024-007',
      validUntil: '2027-06-30'
    },
    {
      id: 3,
      title: 'ISO 9001:2015',
      description: 'Международный стандарт системы менеджмента качества',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=1000&fit=crop&q=80',
      number: 'ISO 9001:2015',
      validUntil: '2026-08-15'
    },
    {
      id: 4,
      title: 'Санитарно-эпидемиологическое заключение',
      description: 'Подтверждает безопасность материалов и технологий',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&q=80',
      number: 'RU.77.01.34.П.000123.02.24',
      validUntil: '2029-02-28'
    },
    {
      id: 5,
      title: 'Сертификат пожарной безопасности',
      description: 'Подтверждает соответствие требованиям пожарной безопасности',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&h=1000&fit=crop&q=80',
      number: 'ССПБ.RU.ПБ01.В.00156',
      validUntil: '2026-11-20'
    },
    {
      id: 6,
      title: 'Сертификат экологической безопасности',
      description: 'Гарантирует отсутствие вредных веществ в материалах',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=1000&fit=crop&q=80',
      number: 'ЭС-2024-00789',
      validUntil: '2027-03-15'
    }
  ];

  return (
    <Layout>
      <div className="bg-background">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
                <Icon name="Award" size={40} className="text-primary" />
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Сертификаты качества на памятники из гранита
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Наша компания имеет все необходимые сертификаты и разрешения, подтверждающие высокое качество продукции и соответствие всем требованиям безопасности
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle2" size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3">Подтверждённое качество</h3>
                  <p className="text-muted-foreground">
                    Все материалы и технологии производства соответствуют государственным и международным стандартам
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Shield" size={32} className="text-blue-600" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3">Гарантия надёжности</h3>
                  <p className="text-muted-foreground">
                    Наличие сертификатов даёт дополнительную уверенность в долговечности и безопасности наших изделий
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="FileCheck" size={32} className="text-purple-600" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3">Прозрачность</h3>
                  <p className="text-muted-foreground">
                    Мы открыты к проверкам и готовы предоставить все необходимые документы по запросу
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certificates Grid */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Наши сертификаты
              </h2>
              <p className="text-xl text-muted-foreground">
                Полный комплект документов, подтверждающих качество
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.map((cert) => (
                <Card key={cert.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="aspect-[4/5] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                    <img 
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <Icon name="Award" size={24} className="text-primary flex-shrink-0 mt-1" />
                      <h3 className="font-heading text-lg font-bold">{cert.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {cert.description}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="Hash" size={16} className="text-muted-foreground" />
                        <span className="text-muted-foreground">Номер:</span>
                        <span className="font-medium">{cert.number}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={16} className="text-muted-foreground" />
                        <span className="text-muted-foreground">Действителен до:</span>
                        <span className="font-medium">{cert.validUntil}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      <Icon name="Download" size={16} className="mr-2" />
                      Скачать копию
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What Certificates Confirm Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">
                Что подтверждают наши сертификаты
              </h2>
              
              <div className="space-y-6">
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="CheckCircle2" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold mb-2">Качество материалов</h3>
                        <p className="text-muted-foreground">
                          Мы используем только сертифицированный гранит высшего сорта из проверенных карьеров. Материалы проходят строгий контроль качества и соответствуют ГОСТ 9479-2011.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Leaf" size={24} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold mb-2">Экологическая безопасность</h3>
                        <p className="text-muted-foreground">
                          Все используемые материалы экологически чисты, не содержат вредных веществ и безопасны для окружающей среды. Подтверждено радиологическими исследованиями.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Hammer" size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold mb-2">Технология производства</h3>
                        <p className="text-muted-foreground">
                          Производство ведётся на современном оборудовании с соблюдением всех технологических норм. Система менеджмента качества сертифицирована по стандарту ISO 9001:2015.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Users" size={24} className="text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold mb-2">Квалификация специалистов</h3>
                        <p className="text-muted-foreground">
                          Наши мастера имеют необходимые квалификационные сертификаты и регулярно проходят повышение квалификации. Стаж работы специалистов — от 5 до 20 лет.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Guarantees */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">
                Дополнительные гарантии
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon name="FileText" size={24} className="text-primary" />
                      <h3 className="font-heading text-lg font-bold">Договор с гарантией</h3>
                    </div>
                    <p className="text-muted-foreground">
                      На все изделия предоставляется письменная гарантия сроком 10 лет. Условия гарантии прописываются в договоре.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon name="BadgeCheck" size={24} className="text-primary" />
                      <h3 className="font-heading text-lg font-bold">Паспорт изделия</h3>
                    </div>
                    <p className="text-muted-foreground">
                      К каждому памятнику прилагается технический паспорт с указанием характеристик материала и даты изготовления.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon name="Camera" size={24} className="text-primary" />
                      <h3 className="font-heading text-lg font-bold">Фото-отчёт</h3>
                    </div>
                    <p className="text-muted-foreground">
                      На всех этапах изготовления мы предоставляем фотографии, чтобы вы могли контролировать процесс работы.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon name="HeadphonesIcon" size={24} className="text-primary" />
                      <h3 className="font-heading text-lg font-bold">Сервисное обслуживание</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Предоставляем бесплатное сервисное обслуживание в течение гарантийного срока при необходимости.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <Icon name="Award" size={48} className="mx-auto mb-6 text-primary" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Убедитесь в качестве сами
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Приглашаем вас посетить наше производство и ознакомиться со всеми сертификатами лично. Мы открыты и прозрачны в своей работе.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg">
                  <Icon name="Phone" size={20} className="mr-2" />
                  Записаться на экскурсию
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900 text-lg">
                  <Icon name="Download" size={20} className="mr-2" />
                  Скачать все сертификаты
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
