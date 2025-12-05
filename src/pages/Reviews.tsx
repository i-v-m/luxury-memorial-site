import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Layout from '@/components/Layout';

export default function Reviews() {
  const [visibleReviews, setVisibleReviews] = useState(12);

  const reviews = [
    { name: "Анна М.", text: "Очень довольна качеством памятника. Мастера выполнили работу на высоком уровне.", date: "02.12.2025" },
    { name: "Дмитрий П.", text: "Заказывали семейный комплекс из красного гранита. Результат превзошёл ожидания.", date: "28.11.2025" },
    { name: "Елена В.", text: "Спасибо за терпение в такой трудный момент. Специалисты очень деликатно всё объяснили.", date: "24.11.2025" },
    { name: "Сергей К.", text: "Профессиональный подход на всех этапах. От эскиза до установки всё сделано идеально.", date: "18.11.2025" },
    { name: "Ольга Т.", text: "Благодарю за оперативность и внимание к деталям. Памятник получился очень красивым.", date: "12.11.2025" },
    { name: "Виктор Н.", text: "Качественная работа за разумные деньги. Рекомендую всем своим знакомым.", date: "05.11.2025" },
    { name: "Мария С.", text: "Заказывала памятник из чёрного гранита с портретом. Гравировка выполнена безупречно.", date: "29.10.2025" },
    { name: "Александр Г.", text: "Отличная компания! Помогли выбрать дизайн, подсказали лучший материал. Всё чётко и в срок.", date: "22.10.2025" },
    { name: "Наталья Л.", text: "Огромное спасибо мастерам за чуткое отношение. Памятник установили точно в оговоренные сроки.", date: "15.10.2025" },
    { name: "Игорь Р.", text: "Заказывал комплекс с оградой и столом. Всё выполнено качественно, цена адекватная.", date: "08.10.2025" },
    { name: "Татьяна К.", text: "Очень довольны работой. Мастера учли все наши пожелания по дизайну.", date: "01.10.2025" },
    { name: "Андрей В.", text: "Профессионалы своего дела. Консультация, изготовление, установка — всё на высшем уровне.", date: "25.09.2025" },
    { name: "Светлана Н.", text: "Заказывала памятник с цветником. Результат превосходный! Спасибо за качество.", date: "18.09.2025" },
    { name: "Михаил Б.", text: "Отличное соотношение цены и качества. Работа выполнена аккуратно и в срок.", date: "11.09.2025" },
    { name: "Екатерина Д.", text: "Благодарю за помощь в выборе памятника. Менеджеры очень внимательные и тактичные.", date: "04.09.2025" },
    { name: "Владимир А.", text: "Заказывал эксклюзивный проект. Дизайнер воплотил все идеи в эскизе. Очень доволен!", date: "28.08.2025" },
    { name: "Людмила П.", text: "Качественный гранит, красивая гравировка. Цена честная, без скрытых доплат.", date: "21.08.2025" },
    { name: "Константин М.", text: "Заказывали двойной памятник из мрамора. Работа выполнена безупречно!", date: "14.08.2025" },
    { name: "Юлия З.", text: "Спасибо за оперативность. Нужен был памятник в сжатые сроки — справились за неделю!", date: "07.08.2025" },
    { name: "Павел С.", text: "Хорошие мастера, качественные материалы. Рекомендую!", date: "30.07.2025" },
    { name: "Ирина Т.", text: "Заказывала памятник с фотокерамикой. Портрет получился очень реалистичным.", date: "23.07.2025" },
    { name: "Роман К.", text: "Профессиональный подход к делу. Установка прошла быстро и аккуратно.", date: "16.07.2025" },
    { name: "Вера Л.", text: "Очень довольна! Помогли с выбором формы и материала. Результат отличный.", date: "09.07.2025" },
    { name: "Николай Ф.", text: "Заказывал семейный памятник из гранита габбро. Качество на высоте!", date: "02.07.2025" },
    { name: "Алина Б.", text: "Большое спасибо за внимательное отношение и качественную работу.", date: "25.06.2025" },
    { name: "Денис Ш.", text: "Заказывал памятник с резным орнаментом. Мастера — настоящие профессионалы!", date: "18.06.2025" },
    { name: "Оксана Р.", text: "Прекрасная компания! Цены адекватные, работа выполнена в срок.", date: "11.06.2025" },
    { name: "Артём Ч.", text: "Заказывал эксклюзивный дизайн. Результат превзошёл все ожидания!", date: "04.06.2025" },
    { name: "Галина В.", text: "Спасибо за терпение и профессионализм. Памятник получился очень красивым.", date: "28.05.2025" },
    { name: "Максим Г.", text: "Качественная работа, честные цены. Рекомендую эту компанию!", date: "21.05.2025" },
    { name: "Валентина К.", text: "Заказывала памятник из красного гранита. Очень довольна качеством материала.", date: "14.05.2025" },
    { name: "Евгений Н.", text: "Профессионалы! Помогли с выбором, изготовили быстро, установили аккуратно.", date: "07.05.2025" },
    { name: "Кристина С.", text: "Большое спасибо за чуткое отношение в такое сложное время.", date: "30.04.2025" },
    { name: "Станислав Д.", text: "Заказывал памятник с золочением. Работа выполнена на отлично!", date: "23.04.2025" },
    { name: "Жанна М.", text: "Очень довольна! Мастера учли все пожелания, результат превосходный.", date: "16.04.2025" },
    { name: "Борис А.", text: "Качественные материалы, профессиональная работа. Цена соответствует качеству.", date: "09.04.2025" },
    { name: "Марина П.", text: "Заказывала памятник с цветником и оградой. Всё сделано аккуратно и красиво.", date: "02.04.2025" },
    { name: "Геннадий Л.", text: "Отличная работа! Памятник установили точно в срок, качество отличное.", date: "26.03.2025" },
    { name: "Анжела Т.", text: "Спасибо за внимание к деталям. Портрет на памятнике получился очень точным.", date: "19.03.2025" },
    { name: "Вячеслав К.", text: "Заказывал комплекс с столом и лавками. Всё выполнено качественно!", date: "12.03.2025" },
    { name: "Лариса Н.", text: "Прекрасная компания! Помогли в трудную минуту, сделали всё быстро и качественно.", date: "05.03.2025" },
    { name: "Руслан Б.", text: "Заказывал эксклюзивный памятник по индивидуальному проекту. Результат потрясающий!", date: "26.02.2025" },
    { name: "Нина В.", text: "Очень довольна работой мастеров. Памятник красивый, установка прошла отлично.", date: "19.02.2025" },
    { name: "Фёдор Р.", text: "Качественные материалы, профессиональный подход. Рекомендую!", date: "12.02.2025" },
    { name: "Зинаида С.", text: "Большое спасибо за терпение и понимание. Результат превосходный!", date: "05.02.2025" },
    { name: "Егор М.", text: "Заказывал памятник из итальянского мрамора. Работа выполнена безупречно!", date: "29.01.2025" },
    { name: "Любовь К.", text: "Прекрасное качество, адекватные цены, внимательное отношение. Спасибо!", date: "22.01.2025" },
    { name: "Тимур Г.", text: "Профессионалы своего дела! Памятник получился именно таким, как хотели.", date: "15.01.2025" },
    { name: "Раиса Д.", text: "Очень довольна! Мастера сделали всё быстро, качественно и аккуратно.", date: "08.01.2025" },
    { name: "Глеб Ф.", text: "Заказывал памятник с бронзовыми элементами. Результат превосходный! Рекомендую!", date: "03.01.2025" }
  ];

  const stats = [
    { icon: 'Star', value: '5.0', label: 'Средняя оценка' },
    { icon: 'Users', value: '2000+', label: 'Довольных клиентов' },
    { icon: 'ThumbsUp', value: '98%', label: 'Рекомендуют нас' },
    { icon: 'Calendar', value: '15', label: 'Лет на рынке' }
  ];

  const loadMore = () => {
    setVisibleReviews(prev => Math.min(prev + 12, reviews.length));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-slate-800 to-slate-600 text-white">
          <div className="container mx-auto text-center">
            <h1 className="font-heading text-4xl lg:text-6xl font-bold mb-6">
              Отзывы о нас
            </h1>
            <p className="text-xl lg:text-2xl text-slate-200 max-w-3xl mx-auto">
              Более 2000 благодарных клиентов доверили нам память о своих близких
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 -mt-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <Icon name={stat.icon} size={32} className="text-primary mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {reviews.slice(0, visibleReviews).map((review, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md border hover:shadow-lg transition-shadow">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <h4 className="font-bold text-lg mb-2">{review.name}</h4>
                  <p className="text-slate-600 mb-4">{review.text}</p>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Icon name="Calendar" size={14} />
                    {review.date}
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {visibleReviews < reviews.length && (
              <div className="text-center">
                <Button 
                  onClick={loadMore}
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  Показать ещё отзывы
                  <Icon name="ChevronDown" size={18} className="ml-2" />
                </Button>
                <p className="text-muted-foreground mt-4">
                  Показано {visibleReviews} из {reviews.length} отзывов
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="container mx-auto text-center">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
              <Icon name="MessageSquare" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="font-heading text-3xl font-bold mb-4">Оставьте свой отзыв</h3>
              <p className="text-muted-foreground mb-6">
                Поделитесь опытом сотрудничества с нами. Ваше мнение очень важно для нас!
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Icon name="MessageSquare" size={18} className="mr-2" />
                Написать отзыв
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}