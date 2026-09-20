export interface ProcessCard {
  number: string;
  icon: string;
  title: string;
  text: string;
  featured?: boolean;
}

export const processCards: ProcessCard[] = [
  {
    number: "01",
    icon: "/icons/process-icon-1.svg",
    title: "Бронювання",
    text: "Обираєте авто на сайті  —підтверджуємо протягом години",
    featured: true,
  },
  {
    number: "02",
    icon: "/icons/process-icon-2.svg",
    title: "Підтвердження",
    text: "Погоджуємо деталі й фіксуємо ціну в договорі оренди",
  },
  {
    number: "03",
    icon: "/icons/process-icon-3.svg",
    title: "Подача авто",
    text: "Привозимо чисте авто у зручне місце в Одесі",
  },
  {
    number: "04",
    icon: "/icons/process-icon-4.svg",
    title: "Повернення",
    text: "Повертаєте авто в обумовлений час і місце — без зайвих питань",
  },
];
