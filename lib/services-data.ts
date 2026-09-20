export interface ServiceSlide {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  note: string;
  ctaLabel: string;
  image: string | null;
}

export const serviceSlides: ServiceSlide[] = [
  {
    number: "01",
    title: "Авто у вашому розпорядженні",
    subtitle: "Одеса · Автопарк 20+ авто",
    description: "Обираємо ідеальне авто під вашу подію чи поїздку — швидка подача в будь-яку точку Одеси.",
    tags: ["Вибір моделі", "Огляд авто", "Розрахунок вартості"],
    note: "Кожне бронювання — з фото стану авто, чистим договором і фіксованою ціною без доплат.",
    ctaLabel: "Детальніше",
    image: "/images/services-slide-1.jpg",
  },
  {
    number: "02",
    title: "Подача в будь-яку точку",
    subtitle: "Одеса та передмістя · До 60 хв",
    description: "Привозимо авто до готелю, аеропорту чи офісу — точно у зазначений час, без затримок.",
    tags: ["Аеропорт", "Готель", "Офіс"],
    note: "Водій передає авто, перевіряє документи та коротко знайомить з особливостями моделі.",
    ctaLabel: "Детальніше",
    image: "/images/services-slide-2.jpg",
  },
  {
    number: "03",
    title: "Авто для особливої події",
    subtitle: "Весілля · Фотосесії · Бізнес-зустрічі",
    description: "Підбираємо преміум-авто під стиль події — від класичного седана до спортивного купе.",
    tags: ["Весілля", "Фотосесія", "Бізнес"],
    note: "За запитом додаємо декор, водія у костюмі та узгоджений маршрут поїздки.",
    ctaLabel: "Детальніше",
    image: "/images/services-slide-3.jpg",
  },
  {
    number: "04",
    title: "Оренда на тривалий термін",
    subtitle: "Від 7 днів · Гнучкі умови",
    description: "Знижки при довгостроковій оренді та можливість заміни авто протягом терміну.",
    tags: ["Від тижня", "Заміна авто", "Гнучка оплата"],
    note: "Укладаємо єдиний договір на весь період — без повторного оформлення документів.",
    ctaLabel: "Детальніше",
    image: "/images/services-slide-4.jpg",
  },
];

export const TOTAL_PLANNED_SLIDES = serviceSlides.length;
