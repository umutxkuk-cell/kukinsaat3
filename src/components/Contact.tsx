import { FormEvent, useState } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { COMPANY } from "../company";
import { projectTypes, serviceTags } from "../data";

type PreparedRequest = { name: string; reference: string; mailto: string; stored: boolean };

export default function Contact() {
  const [message, setMessage] = useState("");
  const [projectType, setProjectType] = useState<string>(projectTypes[0]);
  const [prepared, setPrepared] = useState<PreparedRequest | null>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const company = String(data.get("company") || "");
    const phone = String(data.get("phone") || "");
    const role = String(data.get("role") || "");
    const location = String(data.get("location") || "");
    const reference = `KUK-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const body = [`Talep referansı: ${reference}`, `Ad soyad: ${name}`, `Rol: ${role}`, `Kurum: ${company}`, `E-posta: ${email}`, `Telefon: ${phone || "Belirtilmedi"}`, `Proje türü: ${projectType}`, `Proje konumu: ${location || "Belirtilmedi"}`, "", "Proje notu:", message || "İlk görüşmede paylaşılacak."].join("\n");
    const mailto = `mailto:${COMPANY.email}?subject=${encodeURIComponent(`${reference} — ${projectType} proje görüşmesi`)}&body=${encodeURIComponent(body)}`;
    let stored = false;
    try {
      const previous = JSON.parse(localStorage.getItem("kuk-project-requests") || "[]");
      const records = Array.isArray(previous) ? previous : [];
      localStorage.setItem("kuk-project-requests", JSON.stringify([...records.slice(-4), { reference, name, email, company, role, projectType, location, message, createdAt: new Date().toISOString() }]));
      stored = true;
    } catch { /* E-posta taslağı, depolama kapalı olsa da kullanılabilir. */ }
    setPrepared({ name, reference, mailto, stored });
    window.setTimeout(() => { window.location.href = mailto; }, 500);
  };

  return (
    <section className="terminal-contact" id="iletisim" aria-labelledby="contact-heading">
      <div className="terminal-container contact-layout">
        <div className="contact-copy" data-reveal>
          <h2 id="contact-heading" className="sr-only">{COMPANY.name} ile projeniz için görüşme planlayın</h2>
          <p>Projenizi bize anlatın; mühendislik gözüyle birlikte değerlendirelim:</p>
          <ul><li>Gizlilik esasıyla ilk keşif görüşmesi</li><li>Kapsam ve çalışma modeli değerlendirmesi</li><li>Keşif sonrası maliyet ve iş programı yaklaşımı</li></ul>
          <div className="contact-trust"><span>Hizmet alanlarımız.</span><div>{serviceTags.map((item) => <b key={item}>{item}</b>)}</div></div>
        </div>
        <div className="contact-form-panel" data-reveal>
          {prepared ? (
            <div className="form-success" role="status"><div className="success-icon"><Check size={28} /></div><span className="micro-label">TALEP ÖZETİ HAZIR / {prepared.reference}</span><h3>Teşekkürler, {prepared.name}.</h3><p>{prepared.stored ? "Bilgileriniz bu cihazda kaydedildi ve e-posta taslağınız hazırlandı." : "E-posta taslağınız hazırlandı; tarayıcı depolaması kapalı olduğu için yerel kayıt oluşturulamadı."} Gönderimi e-posta uygulamasında tamamladığınızda talebiniz bize ulaşır. Uygulama açılmazsa aşağıdaki düğmeyi kullanın.</p><a className="t-button t-primary" href={prepared.mailto} aria-label={`E-posta uygulamasında gönder: ${COMPANY.email} adresine talep taslağı`} data-ga-event="teklif_talebi_eposta_ac" data-ga-category="form" data-ga-label={`Talep ${prepared.reference}`}>E-POSTA UYGULAMASINDA GÖNDER <ArrowUpRight size={14} /></a><button className="form-reset" type="button" aria-label="Yeni bir talep oluştur" onClick={() => setPrepared(null)}>YENİ BİR TALEP OLUŞTUR <ArrowRight size={13} /></button></div>
          ) : (
            <form onSubmit={submit} aria-label="Ön görüşme formu" data-ga-event="teklif_talebi_olustur" data-ga-category="form">
              <div className="contact-form-top"><span className="micro-label">ÖN GÖRÜŞME FORMU</span><span className="micro-label">* ZORUNLU ALANLAR</span></div>
              <div className="contact-form-grid">
                <label><span>Ad Soyad *</span><input name="name" required autoComplete="name" placeholder="(Adınız ve soyadınız)" /></label>
                <label><span>Rolünüz veya pozisyonunuz *</span><input name="role" required placeholder="(Pozisyon)" /></label>
                <label><span>Şirket</span><input name="company" autoComplete="organization" placeholder="(Opsiyonel)" /></label>
                <label><span>Telefon</span><input name="phone" type="tel" autoComplete="tel" placeholder="(Opsiyonel)" /><small>Size dönüş yapmamız için kullanırız.</small></label>
                <label><span>E-posta *</span><input name="email" required type="email" autoComplete="email" placeholder="name@email.com" /><small>Talebiniz bu adres üzerinden yanıtlanır.</small></label>
                <label><span>Proje türü *</span><select name="projectType" required value={projectType} onChange={(event) => setProjectType(event.target.value)}>{projectTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
                <label className="full-field"><span>Proje konumu</span><input name="location" placeholder="(İl / ilçe veya ada-parsel bilgisi)" /><small>Keşif ve hizmet bölgesi değerlendirmesi için yeterlidir.</small></label>
                <label className="full-field"><span>Proje notu</span><textarea rows={3} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Yapı türü, yaklaşık büyüklük ve hangi aşamada olduğunuzu yazmanız yeterlidir..." /><small>Henüz net olmayan bilgileri ilk görüşmede birlikte tamamlarız.</small></label>
              </div>
              <label className="contact-consent"><input type="checkbox" required /><span>Bu talep özetinin cihazımda saklanmasını ve e-posta taslağı oluşturulmasını kabul ediyorum.</span></label>
              <div className="contact-submit-row"><p>Form bir sunucuya veri göndermez; e-posta taslağı oluşturur. Paylaştığınız bilgiler yalnızca talebinizi değerlendirmek ve size dönüş yapmak için kullanılır.</p><button className="t-button t-primary" type="submit" aria-label="Talebi hazırla: e-posta taslağı oluştur" data-cursor-magnetic><span data-magnetic-inner>TALEBİ HAZIRLA <ArrowRight size={14} /></span></button></div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
