import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Mail, MapPin, Phone } from "lucide-react";
import Header, { Logo } from "./components/Header";
import HeroScene from "./components/HeroScene";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import { faqs, phases, principles, projects, projectTypes, services, type Project } from "./data";
import { COMPANY } from "./company";
import "./sections.css";
import "./redesign.css";

type RouteName = "home" | "kurumsal" | "hizmetler" | "hizmet" | "projeler" | "iletisim" | "proje" | "404";
type RouteState = { name: RouteName; slug?: string; anchor?: string };

const pageRoutes: Record<string, RouteName> = {
  kurumsal: "kurumsal",
  hizmetler: "hizmetler",
  hizmetlerimiz: "hizmetler",
  projelerimiz: "projeler",
  projeler: "projeler",
  iletisim: "iletisim",
};

function parseRoute(): RouteState {
  const rawHash = window.location.hash.replace(/^#/, "");
  const pathSegment = window.location.pathname.replace(/\/+$/, "").split("/").filter(Boolean).pop()?.toLocaleLowerCase("tr-TR");

  if (!rawHash && pathSegment && pageRoutes[pathSegment]) return { name: pageRoutes[pathSegment] };
  if (!rawHash || rawHash === "/") return { name: "home" };
  if (rawHash.startsWith("/proje/")) return { name: "proje", slug: decodeURIComponent(rawHash.slice("/proje/".length)) };
  if (rawHash.startsWith("/hizmetler/")) return { name: "hizmet", slug: decodeURIComponent(rawHash.slice("/hizmetler/".length)) };
  if (rawHash.startsWith("/")) {
    const key = rawHash.slice(1).replace(/\/+$/, "").toLocaleLowerCase("tr-TR");
    return pageRoutes[key] ? { name: pageRoutes[key] } : { name: "404" };
  }

  const anchor = rawHash.replace(/^\//, "");
  if (["top", "kurumsal", "hizmetler", "sistem", "anlayis", "sss", "iletisim"].includes(anchor)) {
    return { name: "home", anchor };
  }
  return { name: "404" };
}

function SectionLabel({ children, light = false, as: Tag = "div" }: { children: React.ReactNode; light?: boolean; as?: "div" | "h2" | "h3" }) {
  return <Tag className={`terminal-section-label ${light ? "light" : ""}`}><i />{children}</Tag>;
}

function PageHero({ eyebrow, title, lead, meta, dark = false }: { eyebrow: string; title: React.ReactNode; lead: string; meta: string[]; dark?: boolean }) {
  return (
    <section className={`page-hero${dark ? " page-hero--dark" : ""}`}>
      <div className="terminal-container">
        <p className="page-hero__eyebrow"><span /> {eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero__lead">{lead}</p>
        <div className="page-hero__meta">{meta.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="terminal-partners kt-after-hero" id="kurumsal">
      <div className="terminal-container" data-reveal data-motion="editorial">
        <div className="home-about">
          <div>
            <SectionLabel>Kurumsal</SectionLabel>
            <h2>Kocaeli&apos;de mühendislik odaklı inşaat, taahhüt ve anahtar teslim yapım.</h2>
          </div>
          <div className="home-about__body">
            <p className="strip-lede">Bir yapının uygulama sürecinde alınan teknik kararlar; bütçeyi, iş programını ve teslim tarihini doğrudan etkiler. {COMPANY.name}; inşaat, mühendislik ve proje koordinasyonunu ayrı işler olarak değil, aynı sürecin birbirine bağlı parçaları olarak ele alır. Kocaeli ve çevresinde konut, ticari ve karma kullanımlı yapılar için çalışıyoruz.</p>
            <a className="text-link" href="#/kurumsal" aria-label="Kurumsal sayfamızı inceleyin" data-ga-event="kurumsal_incele_tikla" data-ga-category="navigasyon">KURUMSAL YAKLAŞIMIMIZ <ArrowRight size={14} /></a>
            <dl className="home-about__facts">
              <div><dt>Merkez</dt><dd>Başiskele, Kocaeli</dd></div>
              <div><dt>Faaliyet</dt><dd>İnşaat · Proje · Mühendislik</dd></div>
              <div><dt>Çalışma Biçimi</dt><dd>Tek muhatap, kayıtlı süreç</dd></div>
            </dl>
            <figure className="home-about__figure" data-reveal data-motion="image-reveal" data-parallax="about-image">
              <img src={phases[1].image} alt="Şantiyede proje çizimlerini birlikte inceleyen mimar ve mühendisler" loading="lazy" />
              <figcaption>Projelendirme aşamasında mimari, statik ve mekanik disiplinler aynı masada değerlendirilir.</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisualBand() {
  return (
    <section className="visual-band-wrap" aria-label="Uygulama ve denetim görseli">
      <figure className="visual-band" data-reveal data-motion="image-reveal" data-parallax="visual-band">
        <img src={phases[2].image} alt="Betonarme imalatı devam eden şantiyede yükselen yapı ve kule vinçler" loading="lazy" />
        <figcaption className="visual-band__caption">
          <span>Uygulama + Denetim</span>
          <strong>Her imalat, projesine ve şartnamesine uygunluk açısından izlenir.</strong>
        </figcaption>
      </figure>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="services-section services-preview" id="hizmetler">
      <div className="terminal-container services-layout">
        <div className="services-intro" data-reveal data-motion="slide-left">
          <SectionLabel>Hizmetlerimiz</SectionLabel>
          <h2>Müteahhitlikten <br />anahtar teslime.</h2>
          <p>İhtiyacınıza uygun yürütme modelini birlikte belirler; projeyi mühendislik disipliniyle sonuna kadar götürürüz.</p>
          <a href="#/hizmetler" aria-label="Tüm hizmetlerimizi inceleyin" data-ga-event="hizmetler_incele_tikla" data-ga-category="navigasyon">TÜM HİZMETLER <ArrowUpRight size={13} /></a>
        </div>
        <div className="services-list" data-reveal data-motion="stagger-rows">
          {services.slice(0, 4).map((service) => (
            <a className="service-row" href={`#/hizmetler/${service.slug}`} key={service.n} aria-label={`${service.title} hizmetini incele`}><span>{service.n}</span><h3>{service.title}</h3><p>{service.short}</p></a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPageList() {
  return (
    <section className="page-section services-page-list">
      <div className="terminal-container">
        {services.map((service) => (
          <article className="service-detail" id={`hizmet-${service.n}`} key={service.n} data-reveal>
            <span>{service.n}</span>
            <div>
              <p>{service.note}</p>
              <h2>{service.title}</h2>
            </div>
            <div><p>{service.short}</p><a className="text-link" href={`#/hizmetler/${service.slug}`} aria-label={`${service.title} detay sayfasına git`}>HİZMETİ İNCELEYİN <ArrowRight size={13} /></a></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Approach() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const select = (index: number) => setActive((index + phases.length) % phases.length);
  return (
    <section className="approach-section" id="sistem">
      <div className="terminal-container">
        <div className="approach-intro" data-reveal data-motion="editorial"><SectionLabel as="h2">Çalışma Yöntemimiz</SectionLabel><p>Her projeyi keşiften teslime aynı mühendislik disipliniyle yürüten dört aşamalı çalışma yöntemimiz:</p></div>
        <ul className="feature-accordion" tabIndex={0} ref={listRef} onKeyDown={(event) => { if (event.key === "ArrowRight") select(active + 1); if (event.key === "ArrowLeft") select(active - 1); }} aria-label="Çalışma aşamaları" data-reveal data-motion="mask" data-parallax="approach">
          {phases.map((phase, index) => (
            <li key={phase.number} aria-label={`${index + 1} / ${phases.length}: ${phase.label}`}>
              <article className={active === index ? "expanded" : ""} aria-expanded={active === index} aria-label={phase.label} style={{ backgroundImage: `url(${phase.image})` }}>
                <button type="button" className="feature-hit" onClick={() => select(index)} aria-label={`${phase.label} bölümünü aç`} />
                <div className="feature-shade" />
                <div className="feature-collapsed"><span>{phase.label}</span><small>0{index + 1}</small></div>
                <div className="feature-expanded-content"><div className="feature-title"><p><span>{phase.label}</span></p><h3>{phase.title}</h3></div><p className="feature-description">{phase.text}</p><a href="#/iletisim" aria-label={`Projenizi anlatın: ${phase.short} aşaması için iletişim sayfasına git`} data-ga-event="proje_anlat_tikla" data-ga-category="iletisim" data-ga-label={`Yöntem · ${phase.short}`}>PROJENİZİ ANLATIN <ArrowUpRight size={14} /></a></div>
              </article>
            </li>
          ))}
        </ul>
        <div className="feature-position"><span>0{active + 1}</span><i><b style={{ width: `${((active + 1) / phases.length) * 100}%` }} /></i><span>0{phases.length}</span><div><button type="button" onClick={() => select(active - 1)} aria-label="Önceki aşama"><ArrowLeft /></button><button type="button" onClick={() => select(active + 1)} aria-label="Sonraki aşama"><ArrowRight /></button></div></div>
      </div>
    </section>
  );
}

function Showcase() {
  if (!projects.length) return null;
  return (
    <section className="showcase-section" id="projeler">
      <div className="terminal-container">
        <div className="showcase-head" data-reveal>
          <div><SectionLabel>Projelerimiz</SectionLabel><h2>Dikkatle tamamlanmış, <br />uzun ömürlü yapılar.</h2></div>
          <p>Her biri farklı bir ölçekte; hepsi aynı standartta. Projelerimizi yakından inceleyin.</p>
        </div>
        <div className="showcase-grid">
          {projects.map((project, index) => (
            <a key={project.slug} href={`#/proje/${project.slug}`} className={`showcase-card showcase-${index % 4}`} data-reveal data-cursor="view" data-cursor-label="İNCELE ↗" aria-label={`${project.name} projesini incele`} data-ga-event="proje_incele_tikla" data-ga-category="projeler" data-ga-label={project.name}>
              <img src={project.image} alt={`${project.name} — ${project.category}, ${project.location}`} loading="lazy" />
              <div className="showcase-shade" />
              <span className="showcase-status"><i />{project.status.toLocaleUpperCase("tr-TR")}</span>
              <span className="showcase-open"><ArrowUpRight /></span>
              <div className="showcase-caption"><span className="micro-label">{project.index} / {project.category.toLocaleUpperCase("tr-TR")}</span><h3>{project.name}</h3><p>{project.location} · {project.year} · {project.area}</p></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectStatus() {
  if (projects.length) return <Showcase />;
  return (
    <section className="project-status">
      <div className="terminal-container project-status__inner" data-reveal data-motion="dark-rise">
        <div>
          <SectionLabel light>Proje Portföyü</SectionLabel>
          <h2>Portföy, doğrulanmış proje kayıtlarıyla yayımlanır.</h2>
        </div>
        <div>
          <p>Şu anda herkese açık proje kaydı bulunmuyor. Tamamlanmamış veya doğrulanmamış hiçbir işi referans olarak göstermiyoruz.</p>
          <a className="text-link text-link--light" href="#/projelerimiz" aria-label="Projelerimiz sayfasına git">PROJE PORTFÖYÜ <ArrowRight size={14} /></a>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="industry-section" id="anlayis">
      <div className="terminal-container">
        <div data-reveal><SectionLabel as="h2">Yönetim Anlayışımız</SectionLabel></div>
        <div className="industry-quote" data-reveal data-motion="quote">
          <p>“İyi uygulama, sahada verilen küçük kararların toplamıdır. Biz o kararların her birinin kaydını tutarız.”</p>
          <div><span>{COMPANY.name.toLocaleUpperCase("tr-TR")}</span><span>YÖNETİM İLKESİ</span></div>
          <a href="#/iletisim" aria-label="Projenizi konuşalım: iletişim sayfasına git" data-ga-event="proje_konus_tikla" data-ga-category="iletisim">PROJENİZİ KONUŞALIM <ArrowUpRight size={14} /></a>
        </div>
        <div className="principles" data-reveal data-motion="stagger">
          {principles.map((item) => <div key={item.n}><span>{item.n}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="home-cta">
      <div className="terminal-container home-cta__inner" data-reveal data-motion="cta">
        <div>
          <SectionLabel light>İletişim</SectionLabel>
          <h2>Projenizi mühendislik gözüyle değerlendirelim.</h2>
        </div>
        <div className="home-cta__actions">
          <a className="t-button t-primary" href="#/iletisim" aria-label="İletişim sayfasına git" data-ga-event="gorusme_planla_tikla" data-ga-category="iletisim" data-ga-label="Ana sayfa · iletişim CTA" data-cursor-magnetic><span data-magnetic-inner>GÖRÜŞME PLANLA <ArrowUpRight size={14} /></span></a>
          <a className="home-cta__phone" href={`tel:${COMPANY.phoneHref}`} aria-label={`${COMPANY.name}'ı ara: ${COMPANY.phone}`} data-ga-event="telefon_tikla" data-ga-category="iletisim"><Phone size={16} /> {COMPANY.phone}</a>
        </div>
      </div>
    </section>
  );
}

function FAQs() {
  return (
    <section className="terminal-faq" id="sss">
      <div className="terminal-container faq-layout">
        <div className="faq-intro" data-reveal data-motion="slide-left"><h2>Sık Sorulan Sorular</h2><p>{COMPANY.name} ile çalışmaya başlamadan önce sıkça sorulan sorular.</p><a href="#/iletisim" aria-label="Başka bir sorum var: iletişim sayfasına git" data-ga-event="soru_sor_tikla" data-ga-category="iletisim">BAŞKA BİR SORUM VAR <ArrowUpRight size={13} /></a></div>
        <div className="faq-items" data-reveal data-motion="faq">{faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary><span>{faq.question}</span></summary><div><p>{faq.answer}</p></div></details>)}</div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="terminal-footer">
      <div className="terminal-container">
        <div className="footer-directory">
          <div className="footer-card footer-card--brand">
            <a href="#/" className="footer-logo" aria-label={`${COMPANY.name} ana sayfaya dön`}><Logo /></a>
            <p>{COMPANY.slogan}. Kocaeli merkezli inşaat, proje ve mühendislik firması.</p>
            <span>{COMPANY.address[0]}<br />{COMPANY.address[1]}</span>
          </div>
          <div className="footer-card"><span className="micro-label">KEŞFET</span><a href="#/" aria-label="Ana sayfaya git">Ana Sayfa</a><a href="#/kurumsal" aria-label="Kurumsal sayfasına git">Kurumsal</a><a href="#/hizmetler" aria-label="Hizmetlerimiz sayfasına git">Hizmetlerimiz</a><a href="#/projelerimiz" aria-label="Projelerimiz sayfasına git">Projelerimiz</a></div>
          <div className="footer-card"><span className="micro-label">HİZMETLER</span>{services.slice(0, 4).map((service) => <a key={service.n} href="#/hizmetler" aria-label={`${service.title} hizmetini incele`}>{service.title}</a>)}</div>
          <div className="footer-card footer-card--contact"><span className="micro-label">BİZE ULAŞIN</span><a href={`mailto:${COMPANY.email}`} aria-label={`${COMPANY.name}'a e-posta gönder: ${COMPANY.email}`} data-ga-event="eposta_tikla" data-ga-category="iletisim" data-ga-label="Alt bilgi · e-posta">{COMPANY.email}</a><a href={`tel:${COMPANY.phoneHref}`} aria-label={`${COMPANY.name}'ı ara: ${COMPANY.phone}`} data-ga-event="telefon_tikla" data-ga-category="iletisim" data-ga-label="Alt bilgi · telefon">{COMPANY.phone}</a><p>{COMPANY.address[0]}<br />{COMPANY.address[1]}</p><a className="t-button t-primary footer-card__cta" href="#/iletisim" aria-label="İletişim sayfasına git" data-ga-event="iletisim_sayfasi_tikla" data-ga-category="navigasyon" data-ga-label="Alt bilgi · iletişim sayfası" data-cursor-magnetic><span data-magnetic-inner>İLETİŞİM SAYFASI</span></a></div>
        </div>
        <div className="footer-legal"><span>{COMPANY.name} © {new Date().getFullYear()} — {COMPANY.slogan}.</span><div><a href={`mailto:${COMPANY.email}`} aria-label={`E-posta gönder: ${COMPANY.email}`} data-ga-event="eposta_tikla" data-ga-category="iletisim" data-ga-label="Alt çizgi · e-posta">E-POSTA</a><a href={`tel:${COMPANY.phoneHref}`} aria-label={`Telefon: ${COMPANY.phone} numarasını ara`} data-ga-event="telefon_tikla" data-ga-category="iletisim" data-ga-label="Alt çizgi · telefon">TELEFON</a><a href="#/" aria-label="Ana sayfaya dön">ANA SAYFA ↑</a></div></div>
      </div>
    </footer>
  );
}

function HomePage() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (!elements.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const centre = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        const shift = Math.max(-22, Math.min(22, -centre * 30));
        element.style.setProperty("--parallax", `${shift.toFixed(1)}px`);
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <main><HeroScene /><About /><ServicesPreview /><VisualBand /><Approach /><ProjectStatus /><Philosophy /><FAQs /><ContactCTA /></main>;
}

function CorporatePage() {
  return (
    <main>
      <PageHero eyebrow="Kurumsal" title={<>İnşaata mühendislik<br />gözüyle bakan bir firma.</>} lead="KUK İnşaat; Kocaeli merkezli bir inşaat ve mühendislik firmasıdır. Teknik uzmanlığı, çağdaş tasarım yaklaşımını ve sürdürülebilirliği aynı çatı altında toplar." meta={["Başiskele, Kocaeli", "İnşaat · Proje · Mühendislik", "Tek elden yönetim"]} />
      <section className="page-section corporate-story">
        <div className="terminal-container corporate-story__grid">
          <div data-reveal>
            <SectionLabel>Yaklaşımımız</SectionLabel>
            <h2>Değer, doğru hesap ve denetlenebilir uygulamayla oluşur.</h2>
          </div>
          <div className="corporate-story__body" data-reveal>
            <p>{COMPANY.name}; mühendislik disiplini, kalite anlayışı ve güvenilirlik ilkeleriyle inşaat sektöründe değer üretmeyi hedefler. Sahibi inşaat mühendisi olan firmamızda kararlar; statik hesap, detay çözümü ve sahadaki uygulanabilirlik birlikte değerlendirilerek alınır.</p>
            <p>Malzeme seçiminden işçiliğe, imalat aşamalarından teslim öncesi son kontrole kadar her adım belirli ölçütlere göre denetlenir. Süreç, bütçe ve ilerleme iş sahibiyle açık biçimde paylaşılır.</p>
            <p>Kalite anlayışımız bir kontrol listesiyle sınırlı değildir. Malzeme kabulünden, kapatılacak imalatların kontrolüne ve teslim öncesi eksik listesine kadar her adımın ölçütü baştan bellidir. Yapılan kontroller kayıt altına alınır; böylece bir kararın nedeni sonradan da izlenebilir.</p>
            <p>Bir yapıyı yalnızca taşıyıcı sistem üzerinden ya da yalnızca mimari kararlar üzerinden okumuyoruz. Açıklık, cephe ve iç mekân kararlarının mühendislik karşılığı; mühendislik kararlarının da kullanım ve uygulama karşılığı vardır. Bu ilişkiyi baştan kurmak, sahada sonradan verilen kararların sayısını azaltır.</p>
            <figure>
              <img src={phases[1].image} alt="Şantiyede proje çizimlerini inceleyen mimar ve mühendisler" loading="lazy" />
              <figcaption>Projelendirme aşamasında mimari, statik ve mekanik disiplinler birlikte değerlendirilir.</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="page-section page-section--surface">
        <div className="terminal-container">
          <div className="section-heading-row" data-reveal><SectionLabel>Değerlerimiz</SectionLabel><h2>Her işte gözettiğimiz dört temel ilke.</h2></div>
          <div className="principles principles--page" data-reveal>
            {principles.map((item) => <div key={item.n}><span>{item.n}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}
          </div>
        </div>
      </section>
      <section className="page-section corporate-facts">
        <div className="terminal-container corporate-facts__grid">
          <div data-reveal><SectionLabel>Şirket Bilgileri</SectionLabel><h2>KUK Proje Mühendislik İnşaat Ticaret Limited Şirketi</h2></div>
          <dl data-reveal>
            <div><dt>Merkez</dt><dd>{COMPANY.address[0]}, {COMPANY.address[1]}</dd></div>
            <div><dt>Hizmet Bölgesi</dt><dd>Kocaeli ve çevresi</dd></div>
            <div><dt>Faaliyet</dt><dd>İnşaat · Proje · Mühendislik</dd></div>
            <div><dt>E-posta</dt><dd><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></dd></div>
            <div><dt>Telefon</dt><dd><a href={`tel:${COMPANY.phoneHref}`}>{COMPANY.phone}</a></dd></div>
          </dl>
        </div>
      </section>
      <section className="page-section corporate-notes">
        <div className="terminal-container corporate-notes__grid">
          <article data-reveal><span>01</span><h2>Proje ile saha arasındaki mesafe</h2><p>Birçok uygulama sorunu, projenin sahada nasıl karşılık bulacağı erken düşünülmediğinde ortaya çıkar. Bu nedenle detayları yalnızca çizim olarak değil, imalat sırası ve birleşim koşullarıyla birlikte değerlendiririz. Proje masasında çözülen bir konu, sahada günler kazandırır.</p></article>
          <article data-reveal><span>02</span><h2>İşverenle iletişim nasıl yürür?</h2><p>İşin başlangıcında kapsamı, uygulama koşullarını ve beklenen teslim sürecini netleştiririz. Süreç ilerledikçe ortaya çıkan değişiklikleri tek taraflı kararlarla değil; teknik gereklilik, süre ve bütçe etkisiyle birlikte iş sahibiyle değerlendiririz. Bilgi, sorulduğunda değil, düzenli aralıklarla paylaşılır.</p></article>
          <article data-reveal><span>03</span><h2>Gelişim yaklaşımımız</h2><p>Büyümeyi üstlenilen iş sayısıyla ölçmeyiz. Bizim için ölçüt, kapsamı doğru tanımlanmış ve sonucu izlenebilir işler teslim etmektir. Bu nedenle her yeni işte önce yapılabilirliği, sonra taahhüdü konuşuruz.</p></article>
        </div>
      </section>
      <Approach />
      <ContactCTA />
    </main>
  );
}

function ServicesPage() {
  return (
    <main>
      <PageHero eyebrow="Hizmetlerimiz" title={<>Fikirden teslime,<br />tek çatı altında.</>} lead="Beş hizmet alanı tek başına da alınabilir, aynı işin birbirini tamamlayan parçaları olarak da. Önemli olan kapsamın baştan doğru tanımlanmasıdır." meta={["İnşaat & Uygulama", "Mühendislik", "Teknik Koordinasyon", "Süreç Yönetimi", "Danışmanlık"]} />
      <section className="page-section services-intro-band">
        <div className="terminal-container services-intro-band__grid">
          <div data-reveal><SectionLabel>Nereden Başlamalı?</SectionLabel><h2>İhtiyaç, hizmeti belirler.</h2></div>
          <div data-reveal>
            <p>Elinizde uygulanacak bir proje varsa inşaat ve yapı uygulamaları gündeme gelir. Karar veremediğiniz konu taşıyıcı sistem veya detay çözümüyse mühendislik değerlendirmesi gerekir. Projeler birbiriyle çakışıyorsa sorun uygulama değil koordinasyondur. Devam eden işte kontrolü kaybetmek istemiyorsanız süreç yönetimi, karar öncesinde bağımsız bir görüş arıyorsanız teknik danışmanlık doğru başlangıçtır.</p>
            <p>Bu hizmetler birbirinin alternatifi değildir. Aynı işte önce danışmanlıkla kapsam netleşir, koordinasyonla proje olgunlaşır, uygulamayla yapı yükselir ve süreç yönetimiyle iş baştan sona izlenir.</p>
          </div>
        </div>
      </section>
      <ServicesPageList />
      <section className="page-section page-section--surface">
        <div className="terminal-container services-method" data-reveal>
          <div><SectionLabel>Nasıl Çalışıyoruz</SectionLabel><h2>Önce değerlendirir, sonra taahhüt ederiz.</h2></div>
          <ol>
            {phases.map((phase) => <li key={phase.number}><span>{phase.number}</span><div><h3>{phase.short}</h3><p>{phase.text}</p></div></li>)}
          </ol>
        </div>
      </section>
      <ContactCTA />
    </main>
  );
}

function ProjectsPage() {
  return (
    <main>
      <PageHero dark eyebrow="Projelerimiz" title={<>Portföy, doğrulanmış<br />kayıtlarla yayımlanır.</>} lead="Tamamlanmamış, doğrulanmamış veya başkasına ait hiçbir işi referans olarak göstermiyoruz. Yayımlanmış proje kaydı oluştuğunda portföy bu sayfada yer alacak." meta={["Konut", "Ticari", "Karma Kullanım", "Endüstriyel"]} />
      {projects.length ? <Showcase /> : (
        <section className="page-section projects-empty">
          <div className="terminal-container projects-empty__grid">
            <div data-reveal>
              <SectionLabel>Portföy Durumu</SectionLabel>
              <h2>Şu anda yayımlanmış proje kaydı bulunmuyor.</h2>
            </div>
            <div data-reveal>
              <p>Hizmet kapsamımız ve çalışma yöntemimiz hakkında bilgi almak, devam eden veya planladığınız işi değerlendirmek için bizimle iletişime geçebilirsiniz.</p>
              <div className="projects-empty__types">{projectTypes.map((type) => <span key={type}>{type}</span>)}</div>
              <a className="t-button t-primary" href="#/iletisim" aria-label="Projenizi konuşmak için iletişim sayfasına git" data-cursor-magnetic><span data-magnetic-inner>PROJENİZİ KONUŞALIM <ArrowUpRight size={14} /></span></a>
            </div>
          </div>
        </section>
      )}
      <ContactCTA />
    </main>
  );
}

function ServiceDetail({ service }: { service: (typeof services)[number] }) {
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  return (
    <main>
      <PageHero eyebrow={`Hizmet ${service.n} / 05`} title={service.title} lead={service.short} meta={[service.note, "Kocaeli ve çevresi", "KUK İnşaat"]} />
      <section className="page-section service-detail-intro">
        <div className="terminal-container service-detail-intro__grid">
          <div data-reveal><SectionLabel>Hizmetin Tanımı</SectionLabel><h2>Önce kapsamı netleştiriyoruz.</h2></div>
          <p data-reveal>{service.intro}</p>
        </div>
      </section>
      <section className="page-section page-section--surface">
        <div className="terminal-container service-detail-columns">
          <div data-reveal>
            <SectionLabel>Hangi İhtiyaçlarda?</SectionLabel>
            <ul className="check-list">{service.needs.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div data-reveal>
            <SectionLabel>Kapsam</SectionLabel>
            <ul className="check-list">{service.scope.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="terminal-container service-detail-columns">
          <div data-reveal>
            <SectionLabel>Süreç Nasıl İlerler?</SectionLabel>
            <div className="service-process">{service.process.map((item, index) => <p key={item}><span>0{index + 1}</span>{item}</p>)}</div>
          </div>
          <div data-reveal>
            <SectionLabel>Teknik Konular</SectionLabel>
            <ul className="check-list">{service.technical.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="service-benefit"><h3>Diğer disiplinlerle ilişkisi</h3><p>{service.disciplines}</p><h3>İş sahibine karşılığı</h3><p>{service.benefit}</p></div>
          </div>
        </div>
      </section>
      <section className="page-section page-section--surface">
        <div className="terminal-container faq-layout">
          <div className="faq-intro" data-reveal><SectionLabel>Bu Hizmetle İlgili</SectionLabel><h2>Sık sorulan sorular</h2><p>Yanıtını bulamadığınız konu için bize doğrudan ulaşabilirsiniz.</p><a href="#/iletisim" aria-label="İletişim sayfasına git">SORUNUZU İLETİN <ArrowUpRight size={13} /></a></div>
          <div className="faq-items" data-reveal>{service.faqs.map((faq, index) => <details key={faq.q} open={index === 0}><summary><span>{faq.q}</span></summary><div><p>{faq.a}</p></div></details>)}</div>
        </div>
      </section>
      <section className="page-section related-services">
        <div className="terminal-container">
          <SectionLabel>İlgili Hizmetler</SectionLabel>
          <div className="related-services__grid">{related.map((item) => <a key={item.slug} href={`#/hizmetler/${item.slug}`} data-reveal><span>{item.n}</span><h3>{item.title}</h3><p>{item.short}</p><ArrowRight size={16} /></a>)}</div>
        </div>
      </section>
      <ContactCTA />
    </main>
  );
}

function ContactPage() {
  return (
    <main>
      <PageHero eyebrow="İletişim" title={<>Projenizi<br />konuşalım.</>} lead="Yeni bir yapı, arsanız için bir fikir ya da devam eden bir iş; hangi aşamada olursanız olun bize ulaşın, birlikte değerlendirelim." meta={["Başiskele, Kocaeli", COMPANY.phone, COMPANY.email]} />
      <section className="contact-methods">
        <div className="terminal-container contact-methods__grid">
          <a href={`tel:${COMPANY.phoneHref}`} data-reveal aria-label={`${COMPANY.name}'ı telefonla ara`} data-ga-event="telefon_tikla" data-ga-category="iletisim" data-ga-label="İletişim sayfası · telefon"><Phone size={20} /><span>Telefon</span><strong>{COMPANY.phone}</strong><small>Mesai saatleri içinde doğrudan ulaşın.</small></a>
          <a href={`mailto:${COMPANY.email}`} data-reveal aria-label={`${COMPANY.name}'a e-posta gönder`} data-ga-event="eposta_tikla" data-ga-category="iletisim" data-ga-label="İletişim sayfası · e-posta"><Mail size={20} /><span>E-posta</span><strong>{COMPANY.email}</strong><small>Proje özetinizi ve beklentinizi paylaşın.</small></a>
          <div data-reveal><MapPin size={20} /><span>Merkez</span><strong>Başiskele, Kocaeli</strong><small>{COMPANY.address[0]}, {COMPANY.address[1]}</small></div>
        </div>
      </section>
      <Contact />
    </main>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  const next = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length];
  return (
    <main className="project-detail">
      <section className="detail-hero" style={{ backgroundImage: `url(${project.image})` }}><div className="detail-hero-shade" /><div className="terminal-container detail-hero-content"><a href="#/projelerimiz" className="detail-back" aria-label="Tüm projeler: projeler sayfasına dön"><ArrowLeft size={14} /> TÜM PROJELER</a><div className="detail-title"><span className="micro-label">{project.index} / {project.category.toLocaleUpperCase("tr-TR")}</span><h1>{project.name}</h1><p>{project.summary}</p></div><div className="detail-hero-meta"><div><span>KONUM</span><strong>{project.location}</strong></div><div><span>DURUM</span><strong>{project.status} / {project.year}</strong></div><div><span>KAPSAM</span><strong>{project.scope}</strong></div></div></div></section>
      <section className="detail-overview"><div className="terminal-container"><div className="detail-overview-grid"><div><SectionLabel>Projeye Genel Bakış</SectionLabel><h2>Mimari niyetin hiçbir ayrıntıda seyrelmediği bir yapı.</h2></div><p>{project.description}</p></div><div className="detail-stats">{project.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}<div><strong>{project.area}</strong><span>Toplam inşaat alanı</span></div></div><div className="detail-narrative"><article><span className="micro-label">01 / ZORLUK</span><h3>{project.challenge}</h3></article><article><span className="micro-label">02 / ÇÖZÜM</span><h3>{project.solution}</h3></article></div></div></section>
      <section className="detail-gallery terminal-container" aria-label="Proje galerisi">{project.gallery.map((image, index) => <figure key={image} className={index === 0 ? "wide" : ""}><img src={image} alt={`${project.name}, ${project.category} — detay görünüm ${index + 1}`} loading="lazy" /><figcaption>0{index + 1} / {project.shortName.toLocaleUpperCase("tr-TR")}</figcaption></figure>)}</section>
      <section className="detail-scope"><div className="terminal-container"><div><SectionLabel light>KUK Kapsamı</SectionLabel><h2>Tek ekip. <br />Uçtan uca sorumluluk.</h2></div><ul>{project.services.map((service, index) => <li key={service}><span>0{index + 1}</span>{service}<Check size={16} /></li>)}</ul></div></section>
      <section className="next-project"><a href={`#/proje/${next.slug}`} data-cursor="view" data-cursor-label="İNCELE ↗" style={{ backgroundImage: `url(${next.image})` }} aria-label={`Sonraki proje: ${next.name}`} data-ga-event="proje_incele_tikla" data-ga-category="projeler" data-ga-label={`Sonraki proje · ${next.name}`}><div><span className="micro-label">SONRAKİ PROJE / {next.index}</span><h2>{next.name}</h2><span className="t-button t-primary">PROJEYİ İNCELE <ArrowRight size={14} /></span></div></a></section>
      <ContactCTA />
    </main>
  );
}

function NotFound() {
  return <main className="not-found"><span className="micro-label">404 / SAYFA BULUNAMADI</span><h1>Aradığınız sayfa <br />bulunamadı.</h1><p>Bağlantı değişmiş veya kaldırılmış olabilir.</p><div className="not-found__actions"><a className="t-button t-primary" href="#/" aria-label="Ana sayfaya dön">ANA SAYFAYA DÖN <ArrowRight size={14} /></a><a className="t-button t-secondary" href="#/kurumsal" aria-label="Kurumsal sayfasına git">KURUMSAL</a></div></main>;
}

export default function App() {
  const [route, setRoute] = useState<RouteState>(() => parseRoute());

  useEffect(() => {
    const onRoute = () => setRoute(parseRoute());
    window.addEventListener("hashchange", onRoute);
    window.addEventListener("popstate", onRoute);
    return () => {
      window.removeEventListener("hashchange", onRoute);
      window.removeEventListener("popstate", onRoute);
    };
  }, []);

  useEffect(() => {
    const seo: Record<string, { title: string; desc: string; path: string }> = {
      home: { title: "Kocaeli İnşaat ve Mühendislik Firması | KUK İnşaat", desc: "KUK İnşaat; Kocaeli ve çevresinde konut, ticari ve karma kullanımlı yapılar için inşaat uygulamaları, mühendislik, teknik koordinasyon ve süreç yönetimi hizmetleri sunar.", path: "/" },
      kurumsal: { title: "Kurumsal | Kocaeli İnşaat ve Mühendislik Firması — KUK İnşaat", desc: "KUK İnşaat'ın mühendislik yaklaşımı, çalışma prensipleri ve şirket bilgileri. Başiskele, Kocaeli merkezli inşaat ve mühendislik firması.", path: "/#/kurumsal" },
      hizmetler: { title: "İnşaat, Mühendislik ve Proje Hizmetleri | KUK İnşaat", desc: "İnşaat ve yapı uygulamaları, mühendislik, teknik koordinasyon, süreç yönetimi ve teknik danışmanlık hizmetlerinin kapsamını inceleyin.", path: "/#/hizmetler" },
      projeler: { title: "Projelerimiz ve Çalışma Alanlarımız | KUK İnşaat", desc: "KUK İnşaat proje portföyü ve çalıştığı yapı türleri. Doğrulanmamış hiçbir iş referans olarak yayımlanmaz.", path: "/#/projelerimiz" },
      iletisim: { title: "İletişim | KUK İnşaat — Başiskele, Kocaeli", desc: "Projenizi değerlendirmek için KUK İnşaat ile iletişime geçin. Ovacık Mah. Çuhane Cad. No:176, Başiskele, Kocaeli.", path: "/#/iletisim" },
      "404": { title: "Sayfa Bulunamadı | KUK İnşaat", desc: "Aradığınız sayfa bulunamadı.", path: "/" },
    };
    const service = route.name === "hizmet" ? services.find((item) => item.slug === route.slug) : undefined;
    const current = service
      ? { title: `${service.title} — Kocaeli | KUK İnşaat`, desc: service.short, path: `/#/hizmetler/${service.slug}` }
      : seo[route.name] || seo.home;
    document.title = current.title;
    const setMeta = (selector: string, value: string) => document.querySelector(selector)?.setAttribute("content", value);
    setMeta('meta[name="description"]', current.desc);
    setMeta('meta[property="og:title"]', current.title);
    setMeta('meta[property="og:description"]', current.desc);
    setMeta('meta[name="twitter:title"]', current.title);
    setMeta('meta[name="twitter:description"]', current.desc);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", `https://kukinsaat.com${current.path}`);
  }, [route]);

  useEffect(() => {
    if (route.anchor) {
      const timer = window.setTimeout(() => {
        document.getElementById(route.anchor as string)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 90);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [route]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) { elements.forEach((element) => element.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: .08, rootMargin: "0px 0px -30px" });
    const revealPassed = () => elements.forEach((element) => {
      if (element.getBoundingClientRect().bottom < window.innerHeight * .92) element.classList.add("is-visible");
    });
    const timer = window.setTimeout(() => { elements.forEach((element) => observer.observe(element)); revealPassed(); }, 30);
    window.addEventListener("scroll", revealPassed, { passive: true });
    return () => { window.clearTimeout(timer); window.removeEventListener("scroll", revealPassed); observer.disconnect(); };
  }, [route]);

  let page: React.ReactNode;
  if (route.name === "kurumsal") page = <CorporatePage />;
  else if (route.name === "hizmetler") page = <ServicesPage />;
  else if (route.name === "projeler") page = <ProjectsPage />;
  else if (route.name === "iletisim") page = <ContactPage />;
  else if (route.name === "hizmet") {
    const service = services.find((item) => item.slug === route.slug);
    page = service ? <ServiceDetail service={service} /> : <NotFound />;
  }
  else if (route.name === "proje") {
    const project = projects.find((item) => item.slug === route.slug);
    page = project ? <ProjectDetail project={project} /> : <NotFound />;
  } else if (route.name === "404") page = <NotFound />;
  else page = <HomePage />;

  return <><CustomCursor /><Header />{page}<Footer /></>;
}
