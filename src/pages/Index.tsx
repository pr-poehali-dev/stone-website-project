import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/5ab73d4f-4f3d-41cb-a11b-1bb97f356310/files/a193565e-a128-4ad9-b184-333263f0bb0d.jpg";
const GALLERY_IMG_1 = "https://cdn.poehali.dev/projects/5ab73d4f-4f3d-41cb-a11b-1bb97f356310/files/286c2810-b6a7-4fbf-906f-56e5a1cdcb29.jpg";
const GALLERY_IMG_2 = "https://cdn.poehali.dev/projects/5ab73d4f-4f3d-41cb-a11b-1bb97f356310/files/502eb180-694b-4e07-a7e7-dacd43133860.jpg";

const services = [
  { icon: "Gem", title: "Авторские проекты", desc: "Создаём уникальные памятники по идеям и пожеланиям клиента — от эскиза до готового изделия" },
  { icon: "Layers", title: "Обработка камня", desc: "Профессиональная резка, шлифовка и полировка гранита, мрамора и других натуральных пород" },
  { icon: "PenTool", title: "Гравировка", desc: "Точная художественная гравировка портретов, орнаментов и надписей на камне" },
  { icon: "Hammer", title: "Установка", desc: "Выезд на место, профессиональный монтаж памятника с соблюдением всех требований" },
  { icon: "Package", title: "Изготовление памятников", desc: "Полный цикл производства: от выбора материала до финальной отделки и доставки" },
];

const advantages = [
  { icon: "Shield", title: "Качественные материалы", desc: "Только натуральный гранит и мрамор высшего сорта из проверенных карьеров" },
  { icon: "Heart", title: "Индивидуальный подход", desc: "Каждый заказ — это история. Мы слушаем и воплощаем именно то, что важно вам" },
  { icon: "Eye", title: "Контроль качества", desc: "Лично проверяем каждое изделие на всех этапах производства" },
  { icon: "Handshake", title: "Сопровождение", desc: "Помогаем на каждом шаге — от первой консультации до установки и послепродажной поддержки" },
  { icon: "BadgeCheck", title: "Честные цены", desc: "Прозрачное ценообразование без скрытых доплат. Называем полную стоимость сразу" },
  { icon: "Award", title: "Семейный бизнес", desc: "Мы несём личную ответственность за каждый заказ. За каждым памятником — наше имя" },
];

const steps = [
  { num: "01", title: "Консультация", desc: "Обсуждаем пожелания, бюджет и сроки. Отвечаем на все вопросы без давления" },
  { num: "02", title: "Подбор дизайна", desc: "Разрабатываем эскиз, согласовываем материал, форму и элементы оформления" },
  { num: "03", title: "Изготовление", desc: "Мастера создают изделие с вниманием к каждой детали, соблюдая все договорённости" },
  { num: "04", title: "Установка", desc: "Привозим и профессионально устанавливаем памятник. Убираем за собой рабочее место" },
];

const reviews = [
  { name: "Ирина К.", text: "Обратились в очень тяжёлый момент. Даниил Васильевич встретил с пониманием, помог выбрать достойный вариант. Результатом очень довольны — всё сделано аккуратно и в срок.", stars: 5 },
  { name: "Алексей М.", text: "Заказывали авторский проект по фотографии. Гравировка получилась невероятно точной. Родственники были в слезах от красоты работы. Спасибо огромное.", stars: 5 },
  { name: "Светлана Г.", text: "Компания профессиональная. Всё объяснили, ничего не навязывали. Цена оказалась именно такой, как говорили. Рекомендую всем, кто хочет качество и честность.", stars: 5 },
  { name: "Николай Т.", text: "Уже второй раз обращаемся. Качество материала и исполнения на высоком уровне. Установка прошла быстро и аккуратно. Настоящие мастера своего дела.", stars: 5 },
];

const galleryItems = [
  { img: HERO_IMG, label: "Гранит чёрный, авторский проект" },
  { img: GALLERY_IMG_1, label: "Коллекция памятников" },
  { img: GALLERY_IMG_2, label: "Художественная гравировка" },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Icon key={i} name="Star" size={14} className="fill-[hsl(var(--copper))] text-[hsl(var(--copper))]" />
      ))}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const about = useInView();
  const servicesRef = useInView();
  const advantagesRef = useInView();
  const processRef = useInView();
  const reviewsRef = useInView();
  const contactRef = useInView();

  const navLinks = [
    { href: "#about", label: "О компании" },
    { href: "#services", label: "Услуги" },
    { href: "#gallery", label: "Галерея" },
    { href: "#advantages", label: "Преимущества" },
    { href: "#process", label: "Процесс" },
    { href: "#reviews", label: "Отзывы" },
    { href: "#contact", label: "Контакты" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--graphite-dark))]/90 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[hsl(var(--copper))] flex items-center justify-center">
              <span className="text-[hsl(var(--copper))] text-xs font-cormorant font-bold">КК</span>
            </div>
            <span className="font-cormorant text-lg font-semibold text-[hsl(var(--stone))] tracking-wider">КавказКамень</span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <a key={link.href} href={link.href}
                className="text-[hsl(var(--stone-muted))] hover:text-[hsl(var(--copper))] transition-colors duration-300 text-xs font-montserrat tracking-wide">
                {link.label}
              </a>
            ))}
          </nav>

          <a href="tel:+79183629359"
            className="hidden md:flex items-center gap-2 text-[hsl(var(--copper))] border border-[hsl(var(--copper))]/40 px-4 py-2 text-xs hover:bg-[hsl(var(--copper))]/10 transition-colors duration-300 font-montserrat">
            <Icon name="Phone" size={13} />
            8-918-362-93-59
          </a>

          <button className="md:hidden text-[hsl(var(--stone))]" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[hsl(var(--graphite-dark))] border-t border-border px-6 py-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <a key={link.href} href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[hsl(var(--stone-muted))] hover:text-[hsl(var(--copper))] transition-colors text-sm font-montserrat">
                {link.label}
              </a>
            ))}
            <a href="tel:+79183629359" className="text-[hsl(var(--copper))] text-sm flex items-center gap-2 font-montserrat">
              <Icon name="Phone" size={14} /> 8-918-362-93-59
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="КавказКамень" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--graphite-dark))]/80 via-[hsl(var(--graphite-dark))]/60 to-[hsl(var(--graphite-dark))]/95" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="copper-line mx-auto mb-8 animate-fade-in" />

          <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-light text-[hsl(var(--stone))] mb-4 animate-fade-in-up delay-100">
            КавказКамень
          </h1>

          <p className="font-cormorant text-xl md:text-2xl text-[hsl(var(--stone-muted))] italic mb-6 animate-fade-in-up delay-200">
            Памятники с уважением к памяти<br className="hidden md:block" /> и вниманием к каждой детали
          </p>

          <div className="copper-line mx-auto mb-10 animate-fade-in delay-300" />

          <p className="font-montserrat text-sm md:text-base text-[hsl(var(--stone-muted))] mb-10 max-w-xl mx-auto leading-relaxed animate-fade-in-up delay-300">
            Авторские проекты памятников из натурального камня.<br />
            Индивидуальный подход. Семейное дело.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-400">
            <a href="#contact"
              className="px-8 py-4 bg-[hsl(var(--copper))] text-[hsl(var(--graphite-dark))] font-montserrat font-semibold text-sm tracking-widest uppercase hover:bg-[hsl(var(--copper-light))] transition-colors duration-300">
              Заказать консультацию
            </a>
            <a href="#gallery"
              className="px-8 py-4 border border-[hsl(var(--stone))]/30 text-[hsl(var(--stone))] font-montserrat text-sm tracking-widest uppercase hover:border-[hsl(var(--copper))] hover:text-[hsl(var(--copper))] transition-colors duration-300">
              Посмотреть работы
            </a>
          </div>
        </div>

        <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[hsl(var(--stone-muted))] animate-bounce">
          <Icon name="ChevronDown" size={24} />
        </a>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32">
        <div ref={about.ref} className={`container mx-auto px-6 max-w-6xl transition-all duration-1000 ${about.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-montserrat text-[hsl(var(--copper))] text-xs tracking-[0.3em] uppercase mb-4">О компании</p>
              <h2 className="section-title mb-6">
                Семейное дело,<br />
                <em className="font-light">основанное на доверии</em>
              </h2>
              <div className="copper-line mb-8" />
              <div className="space-y-4 text-[hsl(var(--stone-muted))] font-montserrat text-sm leading-relaxed">
                <p>
                  Компания «КавказКамень» специализируется на изготовлении авторских памятников и художественной обработке натурального камня. Мы создаём изделия, которые достойно хранят память о близких людях.
                </p>
                <p>
                  Основатель и руководитель — <span className="text-[hsl(var(--stone))] font-medium">Чепелов Даниил Васильевич</span>. Каждый проект проходит через его личный контроль, потому что для нас важно не количество заказов, а качество каждого из них.
                </p>
                <p>
                  Мы работаем с гранитом, мрамором и другими натуральными породами, создавая изделия, которые простоят десятилетия и сохранят свой вид в любых условиях.
                </p>
              </div>
              <div className="mt-10 flex gap-10">
                <div>
                  <p className="font-cormorant text-4xl font-semibold text-[hsl(var(--copper))]">100%</p>
                  <p className="font-montserrat text-xs text-[hsl(var(--stone-muted))] mt-1">натуральный камень</p>
                </div>
                <div>
                  <p className="font-cormorant text-4xl font-semibold text-[hsl(var(--copper))]">Авторские</p>
                  <p className="font-montserrat text-xs text-[hsl(var(--stone-muted))] mt-1">проекты по вашим идеям</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img src={GALLERY_IMG_2} alt="Мастерство гравировки" className="w-full h-[500px] object-cover" />
              <div className="absolute -bottom-6 -left-6 bg-[hsl(var(--graphite))] border border-[hsl(var(--copper))]/30 p-6 max-w-xs">
                <p className="font-cormorant text-xl text-[hsl(var(--stone))] italic">"Каждый памятник — это наша личная ответственность"</p>
                <p className="font-montserrat text-xs text-[hsl(var(--copper))] mt-3">— Чепелов Даниил Васильевич</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32 bg-[hsl(var(--graphite))]">
        <div ref={servicesRef.ref} className={`container mx-auto px-6 max-w-6xl transition-all duration-1000 ${servicesRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-center mb-16">
            <p className="font-montserrat text-[hsl(var(--copper))] text-xs tracking-[0.3em] uppercase mb-4">Что мы делаем</p>
            <h2 className="section-title mb-4">Наши услуги</h2>
            <div className="copper-line mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="card-stone p-8 group cursor-default">
                <div className="w-12 h-12 border border-[hsl(var(--copper))]/30 flex items-center justify-center mb-6 group-hover:border-[hsl(var(--copper))] transition-colors duration-300">
                  <Icon name={s.icon} size={20} className="text-[hsl(var(--copper))]" fallback="Gem" />
                </div>
                <h3 className="font-cormorant text-xl font-semibold text-[hsl(var(--stone))] mb-3">{s.title}</h3>
                <p className="font-montserrat text-sm text-[hsl(var(--stone-muted))] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <p className="font-montserrat text-[hsl(var(--copper))] text-xs tracking-[0.3em] uppercase mb-4">Наши работы</p>
            <h2 className="section-title mb-4">Галерея</h2>
            <div className="copper-line mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {galleryItems.map((item, i) => (
              <div key={i} className="relative overflow-hidden group cursor-pointer">
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--graphite-dark))]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <p className="font-cormorant text-[hsl(var(--stone))] text-lg italic">{item.label}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--copper))] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-24 md:py-32 bg-[hsl(var(--graphite))]">
        <div ref={advantagesRef.ref} className={`container mx-auto px-6 max-w-6xl transition-all duration-1000 ${advantagesRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-center mb-16">
            <p className="font-montserrat text-[hsl(var(--copper))] text-xs tracking-[0.3em] uppercase mb-4">Почему нас выбирают</p>
            <h2 className="section-title mb-4">Наши преимущества</h2>
            <div className="copper-line mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((a, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 border border-[hsl(var(--copper))]/30 flex items-center justify-center mt-1">
                  <Icon name={a.icon} size={18} className="text-[hsl(var(--copper))]" fallback="CheckCircle" />
                </div>
                <div>
                  <h3 className="font-cormorant text-lg font-semibold text-[hsl(var(--stone))] mb-2">{a.title}</h3>
                  <p className="font-montserrat text-sm text-[hsl(var(--stone-muted))] leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 md:py-32">
        <div ref={processRef.ref} className={`container mx-auto px-6 max-w-6xl transition-all duration-1000 ${processRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-center mb-16">
            <p className="font-montserrat text-[hsl(var(--copper))] text-xs tracking-[0.3em] uppercase mb-4">Как мы работаем</p>
            <h2 className="section-title mb-4">Процесс работы</h2>
            <div className="copper-line mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((p, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-[hsl(var(--copper))]/40 to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className="font-cormorant text-5xl font-light text-[hsl(var(--copper))]/25 mb-4">{p.num}</div>
                  <div className="w-8 h-0.5 bg-[hsl(var(--copper))] mb-5" />
                  <h3 className="font-cormorant text-xl font-semibold text-[hsl(var(--stone))] mb-3">{p.title}</h3>
                  <p className="font-montserrat text-sm text-[hsl(var(--stone-muted))] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 md:py-32 bg-[hsl(var(--graphite))]">
        <div ref={reviewsRef.ref} className={`container mx-auto px-6 max-w-6xl transition-all duration-1000 ${reviewsRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-center mb-16">
            <p className="font-montserrat text-[hsl(var(--copper))] text-xs tracking-[0.3em] uppercase mb-4">Они нам доверились</p>
            <h2 className="section-title mb-4">Отзывы клиентов</h2>
            <div className="copper-line mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="card-stone p-8">
                <Stars count={r.stars} />
                <p className="font-cormorant text-lg text-[hsl(var(--stone))] italic mt-4 mb-6 leading-relaxed">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[hsl(var(--copper))]/20 border border-[hsl(var(--copper))]/30 flex items-center justify-center">
                    <Icon name="User" size={14} className="text-[hsl(var(--copper))]" />
                  </div>
                  <span className="font-montserrat text-sm text-[hsl(var(--stone-muted))]">{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={GALLERY_IMG_1} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[hsl(var(--graphite-dark))]/95" />
        </div>

        <div ref={contactRef.ref} className={`relative z-10 container mx-auto px-6 max-w-6xl transition-all duration-1000 ${contactRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-center mb-16">
            <p className="font-montserrat text-[hsl(var(--copper))] text-xs tracking-[0.3em] uppercase mb-4">Свяжитесь с нами</p>
            <h2 className="section-title mb-4">Контакты</h2>
            <div className="copper-line mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="font-cormorant text-2xl text-[hsl(var(--stone))] mb-8">Готовы ответить на ваши вопросы</h3>

              <div className="space-y-6">
                <a href="tel:+79183629359" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 border border-[hsl(var(--copper))]/30 flex items-center justify-center group-hover:border-[hsl(var(--copper))] transition-colors duration-300">
                    <Icon name="Phone" size={18} className="text-[hsl(var(--copper))]" />
                  </div>
                  <div>
                    <p className="font-montserrat text-xs text-[hsl(var(--stone-muted))] uppercase tracking-widest mb-1">Телефон</p>
                    <p className="font-cormorant text-xl text-[hsl(var(--stone))] group-hover:text-[hsl(var(--copper))] transition-colors">8-918-362-93-59</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-[hsl(var(--copper))]/30 flex items-center justify-center">
                    <Icon name="User" size={18} className="text-[hsl(var(--copper))]" />
                  </div>
                  <div>
                    <p className="font-montserrat text-xs text-[hsl(var(--stone-muted))] uppercase tracking-widest mb-1">Основатель</p>
                    <p className="font-cormorant text-xl text-[hsl(var(--stone))]">Чепелов Даниил Васильевич</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-[hsl(var(--copper))]/30 flex items-center justify-center">
                    <Icon name="Clock" size={18} className="text-[hsl(var(--copper))]" />
                  </div>
                  <div>
                    <p className="font-montserrat text-xs text-[hsl(var(--stone-muted))] uppercase tracking-widest mb-1">Режим работы</p>
                    <p className="font-cormorant text-xl text-[hsl(var(--stone))]">Пн–Сб, 9:00 — 18:00</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <a href="tel:+79183629359"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[hsl(var(--copper))] text-[hsl(var(--graphite-dark))] font-montserrat font-semibold text-sm tracking-widest uppercase hover:bg-[hsl(var(--copper-light))] transition-colors duration-300">
                  <Icon name="Phone" size={16} />
                  Позвонить сейчас
                </a>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-[hsl(var(--copper))]/30 bg-[hsl(var(--graphite))]">
                  <Icon name="CheckCircle" size={48} className="text-[hsl(var(--copper))] mb-4" />
                  <h3 className="font-cormorant text-2xl text-[hsl(var(--stone))] mb-2">Заявка отправлена</h3>
                  <p className="font-montserrat text-sm text-[hsl(var(--stone-muted))]">Мы свяжемся с вами в ближайшее время</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-cormorant text-2xl text-[hsl(var(--stone))] mb-6">Оставить заявку</h3>
                  <div>
                    <label className="font-montserrat text-xs text-[hsl(var(--stone-muted))] uppercase tracking-widest mb-2 block">Ваше имя</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[hsl(var(--graphite))] border border-border focus:border-[hsl(var(--copper))] outline-none px-4 py-3 text-[hsl(var(--stone))] font-montserrat text-sm transition-colors duration-300"
                      placeholder="Как к вам обращаться"
                    />
                  </div>
                  <div>
                    <label className="font-montserrat text-xs text-[hsl(var(--stone-muted))] uppercase tracking-widest mb-2 block">Телефон</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[hsl(var(--graphite))] border border-border focus:border-[hsl(var(--copper))] outline-none px-4 py-3 text-[hsl(var(--stone))] font-montserrat text-sm transition-colors duration-300"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div>
                    <label className="font-montserrat text-xs text-[hsl(var(--stone-muted))] uppercase tracking-widest mb-2 block">Сообщение</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[hsl(var(--graphite))] border border-border focus:border-[hsl(var(--copper))] outline-none px-4 py-3 text-[hsl(var(--stone))] font-montserrat text-sm transition-colors duration-300 resize-none"
                      placeholder="Опишите ваш запрос"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-[hsl(var(--copper))] text-[hsl(var(--graphite-dark))] font-montserrat font-semibold text-sm tracking-widest uppercase hover:bg-[hsl(var(--copper-light))] transition-colors duration-300">
                    Отправить заявку
                  </button>
                  <p className="font-montserrat text-xs text-[hsl(var(--stone-muted))] text-center">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[hsl(var(--graphite-dark))] border-t border-border py-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-[hsl(var(--copper))]/40 flex items-center justify-center">
                <span className="text-[hsl(var(--copper))] text-xs font-cormorant font-bold">КК</span>
              </div>
              <div>
                <p className="font-cormorant text-[hsl(var(--stone))] font-semibold">КавказКамень</p>
                <p className="font-montserrat text-xs text-[hsl(var(--stone-muted))]">Авторские памятники из натурального камня</p>
              </div>
            </div>

            <p className="font-cormorant text-[hsl(var(--stone-muted))] italic text-sm text-center">
              С уважением к памяти и вниманием к каждой детали
            </p>

            <div className="text-right">
              <a href="tel:+79183629359" className="font-montserrat text-sm text-[hsl(var(--copper))] hover:text-[hsl(var(--copper-light))] transition-colors">
                8-918-362-93-59
              </a>
              <p className="font-montserrat text-xs text-[hsl(var(--stone-muted))] mt-1">© 2024 КавказКамень</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}