import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { phases, projects, services } from "../data";
import { COMPANY } from "../company";

type MenuLink = { label: string; href: string; note?: string };
type NavItem = { label: string; title: string; text: string; links: MenuLink[]; directHref?: string };

const navItems: NavItem[] = [
  {
    label: "KURUMSAL",
    directHref: "#/kurumsal",
    title: "Mühendislik disipliniyle yönetilen bir inşaat şirketi.",
    text: "Sahibi inşaat mühendisi olan KUK İnşaat; hesabı, standardı ve denetimi her şeyin önünde tutan, ayrıntıya saygı duyan bir müteahhitlik firmasıdır.",
    links: [
      { label: "Kurumsal", href: "#/kurumsal" },
      { label: "Yönetim Anlayışımız", href: "#/kurumsal" },
      { label: "Çalışma Yöntemimiz", href: "#/kurumsal" },
      { label: "İletişim", href: "#/iletisim" },
    ],
  },
  {
    label: "HİZMETLER",
    title: "Müteahhitlikten anahtar teslime.",
    text: "İhtiyacınıza uygun yürütme modelini birlikte belirler; projeyi mühendislik disipliniyle sonuna kadar götürürüz.",
    links: services.map((service) => ({ label: service.title, href: `#/hizmetler/${service.slug}`, note: service.note })),
  },
  {
    label: "YÖNTEM",
    title: "Dört aşamada, tek standart.",
    text: "Keşiften teslime her projeyi aynı mühendislik disipliniyle yürüten çalışma yöntemimiz.",
    links: [
      { label: "Çalışma Yöntemimiz", href: "#/kurumsal", note: "Dört aşamalı disiplin" },
      ...phases.map((phase) => ({ label: phase.short, href: "#/kurumsal" })),
    ],
  },
  {
    label: "PROJELERİMİZ",
    directHref: "#/projelerimiz",
    title: "Projelerimiz.",
    text: "Yayımlanmış proje kayıtları bu alanda listelenir. Tamamlanmamış veya doğrulanmamış hiçbir iş portföye eklenmez.",
    links: [
      { label: "Proje Portföyü", href: "#/projelerimiz" },
      ...projects.map((project) => ({ label: project.name, href: `#/proje/${project.slug}`, note: project.location })),
      { label: "Projenizi Konuşalım", href: "#/iletisim" },
    ],
  },
];

export function Logo() {
  return (
    <span className="brand">
      <svg className="brand-mark" viewBox="0 0 329.28 372.5" aria-hidden="true" focusable="false">
        <path
          fillRule="evenodd"
          d="M297.08 261.26 164.79 341.36 31 259.41V113.09L164.79 30.22l132.29 82.41ZM164.79 3.36 6.48 98.83v174.45l158.31 95.86 156.35-95.86V98.83Z"
        />
        <path d="M67.56 173.29 101.8 109.85V89.02L74.5 105.22l-45.35 82.42.46 49.08 24.07-38.43 49.97 83.8v-46.76Z" />
        <path d="m253.14 105.22-27.3-16.2v20.83l34.25 63.44-36.1 62.04v46.76l49.98-83.8 24.06 38.43.46-49.08Z" />
        <path d="M183.24 62.6v204.68l-18.51 12.96-18.97-12.96.93-204.68-26.38 15.31V289.5l43.96 29.17 44.42-28.24V76.98Z" />
      </svg>
      <span className="brand-word">{COMPANY.brand}<small>{COMPANY.descriptor}</small></span>
    </span>
  );
}

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [routeHash, setRouteHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 28);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onRoute = () => setRouteHash(window.location.hash);
    window.addEventListener("hashchange", onRoute);
    window.addEventListener("popstate", onRoute);
    return () => {
      window.removeEventListener("hashchange", onRoute);
      window.removeEventListener("popstate", onRoute);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className={`terminal-header${scrolled ? " is-scrolled" : ""}${mobileOpen ? " is-menu-open" : ""}`} onMouseLeave={() => setActiveMenu(null)}>
      <div className="terminal-header-bar">
        <a className="header-logo" href="#/" aria-label={`${COMPANY.name} ana sayfa`} onClick={() => { setActiveMenu(null); setMobileOpen(false); }}><Logo /></a>
        <nav className="header-nav" aria-label="Ana navigasyon">
          {navItems.map((item, index) => {
            const isActive = item.directHref ? routeHash === item.directHref : item.label === "HİZMETLER" && routeHash.startsWith("#/hizmetler");
            return (
              <div className={`header-nav-item${isActive ? " is-active" : ""}`} key={item.label} onMouseEnter={() => setActiveMenu(index)}>
                {item.directHref ? (
                  <a className="header-nav-link" href={item.directHref} aria-label={`${item.label} sayfasına git`} aria-current={isActive ? "page" : undefined} onFocus={() => setActiveMenu(index)} onClick={() => setActiveMenu(null)}>
                    {item.label}<ChevronDown size={11} className={activeMenu === index ? "rotated" : ""} />
                  </a>
                ) : (
                  <button type="button" aria-haspopup="true" aria-controls="mega-menu" aria-label={`${item.label} menüsünü aç`} aria-expanded={activeMenu === index} onFocus={() => setActiveMenu(index)} onClick={() => setActiveMenu(index)}>
                    {item.label}<ChevronDown size={11} className={activeMenu === index ? "rotated" : ""} />
                  </button>
                )}
              </div>
            );
          })}
        </nav>
        <div className="header-context" aria-hidden="true">
          <span>KOCAELİ</span>
          <i />
          <span>40.7255° N / 29.9999° E</span>
        </div>
        <div className="header-ctas">
          <a className="t-button t-primary" href="#/iletisim" aria-label="Görüşme planla: iletişim sayfasına git" data-ga-event="gorusme_planla_tikla" data-ga-category="iletisim" data-ga-label="Üst menü · görüşme planla">GÖRÜŞME PLANLA</a>
        </div>
        <button className="header-menu-toggle" type="button" aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
      </div>

      {activeMenu !== null && (
        <div className="mega-menu" id="mega-menu">
          <div className="mega-intro"><span className="micro-label">{navItems[activeMenu].label}</span><h2>{navItems[activeMenu].title}</h2><p>{navItems[activeMenu].text}</p></div>
          <div className="mega-links">
            {navItems[activeMenu].links.map((link, index) => (
              <a href={link.href} key={link.label} aria-label={link.note ? `${link.label}: ${link.note}` : link.label} data-ga-event={link.href.startsWith("#/proje") ? "proje_incele_tikla" : "menu_link_tikla"} data-ga-category={link.href.startsWith("#/proje") ? "projeler" : "navigasyon"} data-ga-label={`Menü · ${link.label}`} onClick={() => setActiveMenu(null)}><span>0{index + 1}</span><strong>{link.label}</strong>{link.note && <small>{link.note}</small>}<ArrowUpRight size={15} /></a>
            ))}
          </div>
        </div>
      )}

      <div className={`mobile-drawer ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-drawer-scroll">
          {navItems.map((item, index) => (
            <div className="mobile-nav-group" key={item.label}>
              {item.directHref ? (
                <a className="mobile-nav-direct" tabIndex={mobileOpen ? 0 : -1} href={item.directHref} aria-label={`${item.label} sayfasına git`} aria-current={routeHash === item.directHref ? "page" : undefined} onClick={() => setMobileOpen(false)}><span>0{index + 1}</span>{item.label}<ArrowUpRight size={17} /></a>
              ) : (
                <>
                  <button type="button" tabIndex={mobileOpen ? 0 : -1} aria-label={`${item.label} menüsünü ${mobileSection === index ? "kapat" : "aç"}`} onClick={() => setMobileSection(mobileSection === index ? null : index)} aria-expanded={mobileSection === index}><span>0{index + 1}</span>{item.label}<ChevronDown className={mobileSection === index ? "rotated" : ""} /></button>
                  <div className={`mobile-sub-links ${mobileSection === index ? "open" : ""}`}>
                    {item.links.map((link) => <a tabIndex={mobileOpen && mobileSection === index ? 0 : -1} href={link.href} key={link.label} aria-label={link.label} data-ga-event={link.href.startsWith("#/proje") ? "proje_incele_tikla" : "menu_link_tikla"} data-ga-category={link.href.startsWith("#/proje") ? "projeler" : "navigasyon"} data-ga-label={`Mobil menü · ${link.label}`} onClick={() => setMobileOpen(false)}>{link.label}<ArrowUpRight size={14} /></a>)}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="mobile-drawer-actions"><a className="t-button t-primary" tabIndex={mobileOpen ? 0 : -1} href="#/iletisim" aria-label="Görüşme planla: iletişim sayfasına git" data-ga-event="gorusme_planla_tikla" data-ga-category="iletisim" data-ga-label="Mobil menü · görüşme planla" onClick={() => setMobileOpen(false)}>GÖRÜŞME PLANLA</a></div>
      </div>
    </header>
  );
}
