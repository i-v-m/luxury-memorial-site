import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface QuizStep {
  id: string;
  title: string;
  description: string;
  options: {
    id: string;
    title: string;
    description: string;
    icon: string;
    price?: string;
  }[];
}

const QUIZ_STEPS: QuizStep[] = [
  {
    id: 'monument-type',
    title: 'Какой тип памятника вас интересует?',
    description: 'Выберите подходящий вариант для вашего проекта',
    options: [
      {
        id: 'vertical',
        title: 'Вертикальный памятник',
        description: 'Классическая стела с портретом',
        icon: 'Square',
        price: 'от 45 000 ₽'
      },
      {
        id: 'horizontal',
        title: 'Горизонтальный памятник',
        description: 'Элегантная горизонтальная плита',
        icon: 'Minus',
        price: 'от 38 000 ₽'
      },
      {
        id: 'memorial-complex',
        title: 'Мемориальный комплекс',
        description: 'Семейный или элитный комплекс',
        icon: 'Building2',
        price: 'от 150 000 ₽'
      },
      {
        id: 'bronze-plate',
        title: 'Бронзовая плита',
        description: 'Мемориальная табличка из бронзы',
        icon: 'Medal',
        price: 'от 25 000 ₽'
      }
    ]
  },
  {
    id: 'material',
    title: 'Из какого материала изготовить?',
    description: 'Каждый материал имеет свои особенности и стоимость',
    options: [
      {
        id: 'gabro-diabase',
        title: 'Габбро-диабаз',
        description: 'Самый прочный чёрный гранит',
        icon: 'Mountain',
        price: 'Базовая цена'
      },
      {
        id: 'red-granite',
        title: 'Красный гранит',
        description: 'Благородный материал с рисунком',
        icon: 'Gem',
        price: '+15 000 ₽'
      },
      {
        id: 'grey-granite',
        title: 'Серый гранит',
        description: 'Элегантная равномерная текстура',
        icon: 'Circle',
        price: '+8 000 ₽'
      },
      {
        id: 'carrara-marble',
        title: 'Мрамор Каррара',
        description: 'Премиум белый итальянский мрамор',
        icon: 'Crown',
        price: '+25 000 ₽'
      }
    ]
  },
  {
    id: 'engraving',
    title: 'Какое оформление нужно?',
    description: 'Выберите необходимые элементы оформления',
    options: [
      {
        id: 'portrait-laser',
        title: 'Лазерная гравировка',
        description: 'Высокая детализация, быстро',
        icon: 'Zap',
        price: '+8 000 ₽'
      },
      {
        id: 'portrait-hand',
        title: 'Ручная гравировка',
        description: 'Художественная работа мастера',
        icon: 'Paintbrush',
        price: '+15 000 ₽'
      },
      {
        id: 'gold-letters',
        title: 'Золочение букв',
        description: 'Позолоченные надписи',
        icon: 'Type',
        price: '+6 000 ₽'
      },
      {
        id: 'artistic-elements',
        title: 'Художественные элементы',
        description: 'Цветы, кресты, орнаменты',
        icon: 'Palette',
        price: 'от +2 500 ₽'
      }
    ]
  },
  {
    id: 'installation',
    title: 'Нужна ли установка?',
    description: 'Выберите вариант работ по установке памятника',
    options: [
      {
        id: 'full-installation',
        title: 'Полная установка',
        description: 'Фундамент + монтаж + благоустройство',
        icon: 'Settings',
        price: 'Включено'
      },
      {
        id: 'monument-only',
        title: 'Только памятник',
        description: 'Без установки, самовывоз',
        icon: 'Package',
        price: '−15 000 ₽'
      },
      {
        id: 'installation-plus',
        title: 'Установка + благоустройство',
        description: 'Полный комплекс работ с оформлением',
        icon: 'TreePine',
        price: '+25 000 ₽'
      }
    ]
  }
];

export default function MonumentQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (stepId: string, answerId: string) => {
    setAnswers(prev => ({ ...prev, [stepId]: answerId }));
    
    if (currentStep < QUIZ_STEPS.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const progress = ((currentStep + 1) / QUIZ_STEPS.length) * 100;

  if (showResult) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">
              Ваш памятник готов к расчёту!
            </CardTitle>
            <p className="text-green-700">
              На основе ваших ответов мы подготовили персональное предложение
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Результат квиза */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Ваш выбор:</h4>
                {Object.entries(answers).map(([stepId, answerId]) => {
                  const step = QUIZ_STEPS.find(s => s.id === stepId);
                  const option = step?.options.find(o => o.id === answerId);
                  return (
                    <div key={stepId} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <Icon name={option?.icon as any} size={20} className="text-primary" />
                      <div>
                        <div className="font-medium">{option?.title}</div>
                        <div className="text-sm text-muted-foreground">{option?.description}</div>
                      </div>
                      {option?.price && (
                        <div className="ml-auto text-sm font-semibold text-primary">
                          {option.price}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="bg-white rounded-lg border p-6">
                <h4 className="font-semibold text-lg mb-4">Предварительная стоимость</h4>
                <div className="text-3xl font-bold text-primary mb-4">
                  от 68 000 ₽
                </div>
                <div className="space-y-2 text-sm text-muted-foreground mb-6">
                  <div className="flex justify-between">
                    <span>Базовая стоимость:</span>
                    <span>45 000 ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Материал:</span>
                    <span>+8 000 ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Оформление:</span>
                    <span>+15 000 ₽</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Итого:</span>
                    <span>68 000 ₽</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Icon name="Calculator" size={16} className="mr-2" />
                    Получить точный расчёт
                  </Button>
                  <Button variant="outline" className="w-full" onClick={resetQuiz}>
                    <Icon name="RotateCcw" size={16} className="mr-2" />
                    Пройти заново
                  </Button>
                </div>
              </div>
            </div>

            {/* Дополнительная информация */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-blue-800 mb-1">Что дальше?</h5>
                  <p className="text-sm text-blue-700">
                    Наш специалист свяжется с вами в течение 30 минут для уточнения деталей 
                    и подготовки точного коммерческого предложения с 3D-макетом.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const step = QUIZ_STEPS[currentStep];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Прогресс */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Шаг {currentStep + 1} из {QUIZ_STEPS.length}</span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Вопрос */}
      <Card>
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold mb-2">
            {step.title}
          </CardTitle>
          <p className="text-muted-foreground">
            {step.description}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {step.options.map((option) => (
              <Card
                key={option.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50"
                onClick={() => handleAnswer(step.id, option.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={option.icon as any} size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">{option.title}</h4>
                      <p className="text-muted-foreground text-sm mb-3">
                        {option.description}
                      </p>
                      {option.price && (
                        <div className="text-primary font-semibold">
                          {option.price}
                        </div>
                      )}
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Навигация */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
            >
              <Icon name="ChevronLeft" size={16} className="mr-2" />
              Назад
            </Button>
            
            <div className="flex gap-2">
              {QUIZ_STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index <= currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <Button variant="ghost" onClick={resetQuiz}>
              <Icon name="X" size={16} className="mr-2" />
              Отменить
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}