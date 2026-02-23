import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_BG = "https://cdn.poehali.dev/projects/5ab73d4f-4f3d-41cb-a11b-1bb97f356310/files/0c2b1a84-9073-47af-a68f-8e878d8a9911.jpg";
const PHONE = "+79181967906";
const PHONE_DISPLAY = "8-918-196-79-06";

const values = [
  { icon: "Gem", title: "Натуральный камень", desc: "Гранит и мрамор высшего сорта из проверенных карьеров Кавказа" },
  { icon: "PenTool", title: "Авторский дизайн", desc: "Каждый проект создаётся индивидуально по вашим пожеланиям" },
  { icon: "Shield", title: "Гарантия качества", desc: "Контроль на каждом этапе. Изделия, которые простоят десятилетия" },
];

const processSteps = [
  { num: "01", title: "Анализ", desc: "Обсуждаем пожелания, бюджет и сроки" },
  { num: "02", title: "Разработка", desc: "Создаём эскиз и согласовываем детали" },
  { num: "03", title: "Результат", desc: "Изготавливаем и устанавливаем памятник" },
];

const servicesList = [
  { icon: "Layers", title: "Обработка камня", desc: "Резка, шлифовка и полировка натуральных пород" },
  { icon: "PenTool", title: "Гравировка", desc: "Художественная гравировка портретов и орнаментов" },
  { icon: "Package", title: "Изготовление", desc: "Полный цикл: от материала до финальной отделки" },
  { icon: "Hammer", title: "Установка", desc: "Профессиональный монтаж с выездом на место" },
  { icon: "Gem", title: "Авторские проекты", desc: "Уникальные памятники по индивидуальному дизайну" },
  { icon: "Heart", title: "Реставрация", desc: "Восстановление и обновление существующих памятников" },
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const valuesRef = useInView();
  const processRef = useInView();
  const telegramRef = useInView();
  const servicesRef = useInView();
  const formRef = useInView();

  const navLinks = [
    { href: "#values", label: "О нас" },
    { href: "#services", label: "Услуги" },
    { href: "#process", label: "Процесс" },
    { href: "#contact", label: "Контакты" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-inter">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-btn flex items-center justify-center">
              <span className="text-white text-xs font-bold relative z-10">КК</span>
            </div>
            <span className="text-sm font-semibold text-foreground tracking-tight">КавказКамень</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.href} href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm">
                {link.label}
              </a>
            ))}
          </nav>

          <a href={`tel:${PHONE}`}
            className="hidden md:flex items-center gap-2 gradient-btn text-white px-5 py-2 rounded-full text-sm font-medium glow-sm">
            <span className="relative z-10 flex items-center gap-2">
              <Icon name="Phone" size={14} />
              Позвонить
            </span>
          </a>

          <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 px-6 py-5 flex flex-col gap-4">
            {navLinks.map(link => (
              <a key={link.href} href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                {link.label}
              </a>
            ))}
            <a href={`tel:${PHONE}`} className="gradient-btn text-white px-5 py-3 rounded-full text-sm font-medium text-center glow-sm">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Icon name="Phone" size={14} /> {PHONE_DISPLAY}
              </span>
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(var(--glow))] opacity-[0.04] blur-[120px] animate-glow-pulse" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase mb-8 animate-fade-in">
            Авторские памятники из натурального камня
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-in-up leading-[0.95]">
            Память,<br />
            <span className="gradient-text">воплощённая</span><br />
            в камне
          </h1>

          <p className="text-muted-foreground text-base md:text-lg mb-12 max-w-lg mx-auto leading-relaxed animate-fade-in-up delay-200">
            Создаём изделия с вниманием к каждой детали. Индивидуальный подход и семейные традиции мастерства.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <a href="#contact"
              className="gradient-btn text-white px-8 py-4 rounded-full font-semibold text-sm tracking-wide glow-md">
              <span className="relative z-10">Заказать консультацию</span>
            </a>
            <a href="#services"
              className="px-8 py-4 rounded-full border border-border hover:border-[hsl(var(--glow)/0.5)] text-foreground text-sm font-medium transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--glow)/0.1)]">
              Наши услуги
            </a>
          </div>
        </div>

        <a href="#values" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce">
          <Icon name="ChevronDown" size={24} />
        </a>
      </section>

      {/* VALUES */}
      <section id="values" className="py-24 md:py-32">
        <div ref={valuesRef.ref} className={`container mx-auto px-6 max-w-5xl transition-all duration-1000 ${valuesRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-center mb-16">
            <p className="text-sm text-[hsl(var(--glow))] tracking-[0.2em] uppercase mb-4">Почему мы</p>
            <h2 className="section-heading mb-4">
              Качество, которому<br /><span className="gradient-text">можно доверять</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="glass-card rounded-2xl p-8 text-center">
                <div className="w-14 h-14 rounded-xl bg-[hsl(var(--glow)/0.1)] border border-[hsl(var(--glow)/0.2)] flex items-center justify-center mx-auto mb-6">
                  <Icon name={v.icon} size={22} className="text-[hsl(var(--glow))]" fallback="Star" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 md:py-32">
        <div ref={processRef.ref} className={`container mx-auto px-6 max-w-5xl transition-all duration-1000 ${processRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-center mb-16">
            <p className="text-sm text-[hsl(var(--glow))] tracking-[0.2em] uppercase mb-4">Как мы работаем</p>
            <h2 className="section-heading">Три простых шага</h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] line-glow" />

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {processSteps.map((step, i) => (
                <div key={i} className="text-center relative">
                  <div className="w-24 h-24 rounded-full bg-[hsl(var(--glow)/0.08)] border border-[hsl(var(--glow)/0.2)] flex items-center justify-center mx-auto mb-6 relative z-10">
                    <span className="gradient-text text-2xl font-bold">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TELEGRAM */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[hsl(var(--glow)/0.03)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[hsl(var(--glow))] opacity-[0.03] blur-[100px]" />

        <div ref={telegramRef.ref} className={`relative z-10 container mx-auto px-6 max-w-2xl text-center transition-all duration-1000 ${telegramRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--glow)/0.1)] border border-[hsl(var(--glow)/0.2)] flex items-center justify-center mx-auto mb-8">
            <Icon name="Send" size={26} className="text-[hsl(var(--glow))]" />
          </div>

          <h2 className="section-heading mb-4">
            Мы в <span className="gradient-text">Telegram</span>
          </h2>
          <p className="text-muted-foreground text-base mb-10 leading-relaxed max-w-md mx-auto">
            Напишите нам напрямую — ответим быстро, покажем примеры работ и рассчитаем стоимость
          </p>

          <a href={`https://t.me/${PHONE}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 gradient-btn text-white px-10 py-4 rounded-full font-semibold text-base glow-md">
            <span className="relative z-10 flex items-center gap-3">
              <Icon name="Send" size={18} />
              Написать в Telegram
            </span>
          </a>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32">
        <div ref={servicesRef.ref} className={`container mx-auto px-6 max-w-5xl transition-all duration-1000 ${servicesRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-center mb-16">
            <p className="text-sm text-[hsl(var(--glow))] tracking-[0.2em] uppercase mb-4">Что мы делаем</p>
            <h2 className="section-heading mb-4">Наши услуги</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((s, i) => (
              <div key={i} className="glass-card rounded-2xl p-7 group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-[hsl(var(--glow)/0.08)] border border-[hsl(var(--glow)/0.15)] flex items-center justify-center mb-5 group-hover:border-[hsl(var(--glow)/0.4)] transition-colors duration-300">
                  <Icon name={s.icon} size={20} className="text-[hsl(var(--glow))]" fallback="Gem" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[hsl(var(--glow)/0.02)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[hsl(var(--glow))] opacity-[0.03] blur-[100px]" />

        <div ref={formRef.ref} className={`relative z-10 container mx-auto px-6 max-w-xl transition-all duration-1000 ${formRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-center mb-12">
            <p className="text-sm text-[hsl(var(--glow))] tracking-[0.2em] uppercase mb-4">Оставьте заявку</p>
            <h2 className="section-heading mb-4">Свяжитесь с нами</h2>
            <p className="text-muted-foreground text-sm">Ответим в течение часа в рабочее время</p>
          </div>

          {submitted ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-[hsl(var(--glow)/0.1)] flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={32} className="text-[hsl(var(--glow))]" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">Заявка отправлена</h3>
              <p className="text-muted-foreground text-sm">Мы свяжемся с вами в ближайшее время</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 md:p-10 space-y-5">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-widest mb-2 block">Ваше имя</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground text-sm transition-all duration-300 focus:border-[hsl(var(--glow)/0.5)] focus:shadow-[0_0_15px_hsl(var(--glow)/0.1)] outline-none placeholder:text-muted-foreground/50"
                  placeholder="Как к вам обращаться"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-widest mb-2 block">Телефон</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground text-sm transition-all duration-300 focus:border-[hsl(var(--glow)/0.5)] focus:shadow-[0_0_15px_hsl(var(--glow)/0.1)] outline-none placeholder:text-muted-foreground/50"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-widest mb-2 block">Сообщение</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground text-sm transition-all duration-300 focus:border-[hsl(var(--glow)/0.5)] focus:shadow-[0_0_15px_hsl(var(--glow)/0.1)] outline-none resize-none placeholder:text-muted-foreground/50"
                  placeholder="Опишите ваш запрос"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 rounded-md border border-border bg-background/50 peer-checked:bg-[hsl(var(--glow))] peer-checked:border-[hsl(var(--glow))] transition-all duration-200 flex items-center justify-center">
                    {agreed && <Icon name="Check" size={12} className="text-white" />}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground leading-relaxed">
                  Я соглашаюсь на обработку персональных данных в соответствии с{" "}
                  <a href="#privacy" className="text-[hsl(var(--glow))] hover:underline">политикой конфиденциальности</a>
                </span>
              </label>

              <button
                type="submit"
                disabled={!agreed}
                className="w-full gradient-btn text-white py-4 rounded-xl font-semibold text-sm tracking-wide glow-sm disabled:opacity-40 disabled:cursor-not-allowed">
                <span className="relative z-10">Отправить заявку</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* PRIVACY */}
      <section id="privacy" className="py-16 border-t border-border/50">
        <div className="container mx-auto px-6 max-w-2xl">
          <h3 className="text-lg font-semibold text-foreground mb-4">Политика конфиденциальности</h3>
          <div className="text-xs text-muted-foreground leading-relaxed space-y-3">
            <p>Оставляя заявку на сайте, вы даёте согласие на обработку персональных данных (имя, телефон) с целью связи для консультации.</p>
            <p>Мы не передаём ваши данные третьим лицам. Данные хранятся в защищённом виде и используются исключительно для обработки заявки.</p>
            <p>Вы можете отозвать согласие, обратившись по телефону {PHONE_DISPLAY}.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/50 py-10">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg gradient-btn flex items-center justify-center">
                <span className="text-white text-[10px] font-bold relative z-10">КК</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">КавказКамень</p>
                <p className="text-xs text-muted-foreground">Авторские памятники</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a href={`tel:${PHONE}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {PHONE_DISPLAY}
              </a>
              <a href={`https://t.me/${PHONE}`} target="_blank" rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-[hsl(var(--glow))] transition-colors flex items-center gap-1.5">
                <Icon name="Send" size={14} /> Telegram
              </a>
            </div>

            <p className="text-xs text-muted-foreground">© 2024 КавказКамень</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
