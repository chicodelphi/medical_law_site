import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Menu,
  MessageCircle,
  Plus,
  X,
} from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5548999424894";
const INSTAGRAM_URL = "https://www.instagram.com/alanjantsch.adv/";

const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Atuação", href: "#atuacao" },
  { label: "Sobre", href: "#sobre" },
  { label: "Dúvidas", href: "#duvidas" },
];

const practiceAreas = [
  {
    number: "01",
    title: "Profissionais da saúde",
    description:
      "Orientação e defesa em questões ligadas ao exercício profissional e à responsabilidade na assistência à saúde.",
  },
  {
    number: "02",
    title: "Pacientes e famílias",
    description:
      "Apoio jurídico em situações que envolvem acesso a tratamentos, negativas de cobertura e direitos dos pacientes.",
  },
  {
    number: "03",
    title: "Clínicas e consultórios",
    description:
      "Assessoria preventiva para decisões, relações contratuais e rotinas que pedem mais segurança jurídica.",
  },
];

const questions = [
  {
    question: "Quando procurar orientação em Direito Médico e da Saúde?",
    answer:
      "Sempre que houver uma dúvida ou situação jurídica relacionada à assistência à saúde, ao exercício profissional, a contratos, a tratamentos ou a planos de saúde. Uma análise individual ajuda a identificar os caminhos possíveis.",
  },
  {
    question: "Quais informações devo reunir para o primeiro contato?",
    answer:
      "Uma breve descrição dos fatos e os documentos relacionados ao caso, como contratos, comunicações, pedidos ou negativas, ajudam a compreender melhor a situação. Cada demanda tem suas particularidades.",
  },
  {
    question: "Como posso entrar em contato com o Dr. Alan?",
    answer:
      "Basta clicar em um dos botões de WhatsApp desta página para iniciar uma conversa e apresentar a sua demanda.",
  },
];

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="18" cy="6.1" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <a className="brand" href="#inicio" onClick={onClick} aria-label="Dr. Alan Jantsch, voltar ao início">
      <span className="brand-monogram" aria-hidden="true">
        AJ<span className="brand-dot">.</span>
      </span>
      <span className="brand-wordmark">
        <strong>ALAN JANTSCH</strong>
        <small>ADVOCACIA · OAB/SC 73.129</small>
      </span>
    </a>
  );
}

function WhatsAppButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a
      className={`button button-primary ${className}`}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${children} (abre o WhatsApp em uma nova aba)`}
    >
      <MessageCircle size={18} strokeWidth={1.9} aria-hidden="true" />
      <span>{children}</span>
      <ArrowUpRight size={18} strokeWidth={1.9} aria-hidden="true" />
    </a>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("has-motion");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("has-motion");
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-is-open" : ""}`}>
        <div className="header-inner shell">
          <Brand onClick={closeMenu} />

          <nav className="desktop-nav" aria-label="Navegação principal">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="header-contact" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            Fale com o Dr. Alan <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" />
          </a>

          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={25} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <div id="mobile-navigation" className={`mobile-navigation ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Navegação para dispositivos móveis">
          {navigation.map((item, index) => (
            <a key={item.href} href={item.href} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
              <span>0{index + 1}</span>
              {item.label}
              <ArrowUpRight size={23} strokeWidth={1.2} aria-hidden="true" />
            </a>
          ))}
          <a href="#contato" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
            <span>05</span>
            Contato
            <ArrowUpRight size={23} strokeWidth={1.2} aria-hidden="true" />
          </a>
        </nav>
        <a className="mobile-instagram" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" tabIndex={menuOpen ? 0 : -1}>
          <InstagramIcon /> @alanjantsch.adv
        </a>
      </div>

      <main>
        <section id="inicio" className="hero" aria-labelledby="hero-title">
          <div className="hero-image-wrap" aria-hidden="true">
            <img className="hero-image" src="/images/hero-escritorio.jpg" alt="" fetchPriority="high" />
          </div>
          <div className="hero-overlay" aria-hidden="true" />

          <div className="hero-inner shell">
            <div className="hero-content">
              <p className="hero-eyebrow"><span /> DIREITO MÉDICO E DA SAÚDE</p>
              <h1 id="hero-title" className="hero-title">
                <span>Dr. Alan</span>
                <span>Jantsch<span className="hero-period">.</span></span>
              </h1>
              <p className="hero-description">
                Atuação jurídica especializada para quem busca clareza e segurança nas questões que envolvem a saúde.
              </p>
              <div className="hero-actions">
                <WhatsAppButton>Falar pelo WhatsApp</WhatsAppButton>
                <a className="hero-secondary" href="#atuacao">
                  Conheça a atuação <ArrowDown size={16} strokeWidth={1.6} aria-hidden="true" />
                </a>
              </div>
            </div>

            <figure className="hero-portrait">
              <div className="hero-portrait-frame">
                <img
                  src="/images/alan-jantsch.jpg"
                  alt="Retrato do advogado Dr. Alan Jantsch"
                  width={563}
                  height={563}
                  fetchPriority="high"
                />
              </div>
              <figcaption>
                <strong>Dr. Alan Jantsch</strong>
                <span>Advogado · OAB/SC 73.129</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="atuacao" className="expertise-section section-space" aria-labelledby="expertise-title">
          <div className="shell">
            <div className="section-kicker reveal"><span>01 /</span> ÁREAS DE ATUAÇÃO</div>
            <div className="expertise-intro reveal">
              <h2 id="expertise-title">Direito que entende<br />o valor do <em>cuidado.</em></h2>
              <p>
                Na interseção entre o Direito e a saúde, cada situação exige uma análise atenta. Uma atuação especializada faz diferença na busca por caminhos mais seguros.
              </p>
            </div>

            <div className="practice-list">
              {practiceAreas.map((area) => (
                <a
                  className="practice-item reveal"
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={area.number}
                  aria-label={`Conversar sobre ${area.title} pelo WhatsApp`}
                >
                  <span className="practice-number">{area.number}</span>
                  <span className="practice-copy">
                    <strong>{area.title}</strong>
                    <span>{area.description}</span>
                  </span>
                  <ArrowUpRight className="practice-arrow" size={25} strokeWidth={1.3} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className="about-section" aria-labelledby="about-title">
          <figure className="about-image">
            <img
              src="/images/escritorio-fachada.jpg"
              alt="Fachada do edifício onde fica o escritório do Dr. Alan Jantsch"
              width={900}
              height={1190}
              loading="lazy"
            />
            <figcaption className="about-image-caption">
              <img src="/images/alan-jantsch.jpg" alt="" width={563} height={563} loading="lazy" />
              <span>
                <strong>O escritório</strong>
                <small>Dr. Alan Jantsch · OAB/SC 73.129</small>
              </span>
            </figcaption>
          </figure>
          <div className="about-content">
            <div className="about-content-inner reveal">
              <div className="section-kicker section-kicker-light"><span>02 /</span> SOBRE O ADVOGADO</div>
              <h2 id="about-title">A escuta é parte essencial de uma boa <em>orientação.</em></h2>
              <div className="about-divider" />
              <p>
                Dr. Alan Jantsch é advogado inscrito na OAB/SC 73.129, com atuação especializada em Direito Médico e da Saúde.
              </p>
              <p>
                Seu trabalho parte de uma compreensão cuidadosa de cada contexto, aliando conhecimento jurídico, comunicação clara e atenção às pessoas envolvidas.
              </p>
              <div className="about-signature">
                <span>Dr. Alan Jantsch</span>
                <small>OAB/SC 73.129</small>
              </div>
            </div>
          </div>
        </section>

        <section id="duvidas" className="faq-section section-space" aria-labelledby="faq-title">
          <div className="shell faq-layout">
            <div className="faq-intro reveal">
              <div className="section-kicker"><span>03 /</span> DÚVIDAS FREQUENTES</div>
              <h2 id="faq-title">Informação para seguir com mais <em>clareza.</em></h2>
              <p>Algumas respostas para ajudar você a dar o primeiro passo.</p>
            </div>
            <div className="faq-list reveal">
              {questions.map((item, index) => (
                <div className={`faq-item ${openQuestion === index ? "is-open" : ""}`} key={item.question}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                      aria-expanded={openQuestion === index}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span>{item.question}</span>
                      <Plus size={19} strokeWidth={1.4} aria-hidden="true" />
                    </button>
                  </h3>
                  <div className="faq-answer" id={`faq-answer-${index}`}>
                    <div><p>{item.answer}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="contact-section" aria-labelledby="contact-title">
          <div className="contact-bg" aria-hidden="true">
            <img src="/images/contato-cafe.jpg" alt="" loading="lazy" />
          </div>
          <div className="shell contact-inner reveal">
            <div className="section-kicker section-kicker-light"><span>04 /</span> CONTATO</div>
            <h2 id="contact-title">O próximo passo começa com uma <em>conversa.</em></h2>
            <p>Conte um pouco sobre a sua situação. O caminho para uma orientação jurídica começa com a escuta.</p>
            <WhatsAppButton>Iniciar conversa no WhatsApp</WhatsAppButton>
          </div>
          <span className="contact-ornament" aria-hidden="true">AJ</span>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-main">
          <div className="footer-brand-block">
            <Brand />
            <p>Direito Médico e da Saúde com atenção ao que realmente importa.</p>
          </div>
          <div className="footer-links">
            <span>NAVEGAÇÃO</span>
            <a href="#atuacao">Áreas de atuação</a>
            <a href="#sobre">Sobre o advogado</a>
            <a href="#duvidas">Dúvidas frequentes</a>
          </div>
          <div className="footer-links footer-contact">
            <span>CONTATO</span>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              Instagram <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} Dr. Alan Jantsch. Todos os direitos reservados.</span>
          <span>OAB/SC 73.129 <ArrowRight size={13} strokeWidth={1.4} aria-hidden="true" /> Advocacia especializada</span>
        </div>
      </footer>
    </>
  );
}
