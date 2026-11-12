/* KUK İnşaat içerik modeli.
   Faaliyet çerçevesi, şirketin yayımlanmış hizmet sayfalarındaki beş başlığa dayanır:
   inşaat ve yapı uygulamaları, mühendislik, proje geliştirme ve teknik koordinasyon,
   proje ve uygulama süreçlerinin yönetimi, teknik danışmanlık.
   Doğrulanmamış hizmet, referans, rakam ve proje bilgisi bu dosyaya eklenmez. */

export type Project = {
  slug: string;
  index: string;
  name: string;
  shortName: string;
  category: string;
  location: string;
  year: string;
  status: string;
  area: string;
  duration: string;
  scope: string;
  image: string;
  gallery: string[];
  summary: string;
  description: string;
  challenge: string;
  solution: string;
  stats: { value: string; label: string }[];
  services: string[];
};

export const projects: Project[] = [];

export type ServiceFaq = { q: string; a: string };
export type Service = {
  n: string;
  slug: string;
  title: string;
  note: string;
  short: string;
  intro: string;
  needs: string[];
  scope: string[];
  process: string[];
  technical: string[];
  disciplines: string;
  benefit: string;
  faqs: ServiceFaq[];
};

export const services: Service[] = [
  {
    n: "01",
    slug: "insaat-ve-yapi-uygulamalari",
    title: "İnşaat ve Yapı Uygulamaları",
    note: "Konut, ticari ve karma kullanımlı yapılar",
    short: "Kaba yapıdan ince işlere kadar imalat kalemlerini saha organizasyonu ve iş programıyla birlikte yürütüyoruz.",
    intro: "Bir binanın sahadaki karşılığı, proje üzerinde alınan kararların ne kadar uygulanabilir olduğuyla belirlenir. İnşaat ve yapı uygulamalarında işi yalnızca imalat sırasına indirgemiyoruz; saha organizasyonunu, malzeme akışını, detay kontrollerini ve iş programını aynı plan içinde ele alıyoruz. Konut, ticari ve karma kullanımlı yapılarda kaba yapıdan ince işlere kadar uygulama kalemleri bu çerçevede yürütülür.",
    needs: [
      "Projesi hazırlanmış bir yapının sahada kontrollü biçimde uygulanması",
      "Kaba yapı, ince iş ve montaj kalemleri arasında kesintisiz koordinasyon",
      "Malzeme ve detay kararlarının imalat öncesinde netleştirilmesi",
      "İş programına bağlı, izlenebilir bir saha düzeni",
    ],
    scope: [
      "Saha organizasyonu ve uygulama planlaması",
      "Kaba yapı ve ince iş kalemlerinin yürütülmesi",
      "Yapı elemanlarının imalat ve montaj koordinasyonu",
      "Malzeme, detay ve işçilik kontrolleri",
      "İş programı ve süreç takibi",
    ],
    process: [
      "Uygulama başlamadan önce proje, keşif ve saha koşulları birlikte değerlendirilir; imalat sırası ve kritik kalemler iş programına bağlanır.",
      "Sahada her imalat kalemi bir sonraki işin koşulunu oluşturur. Bu nedenle beton, donatı, duvar, tesisat geçişi ve ince iş detayları birbirinden bağımsız değil, sırasıyla kontrol edilir.",
      "Teslim öncesinde eksik ve kusurlu işler listelenir; düzeltmeler tamamlanmadan süreç kapanmış sayılmaz.",
    ],
    technical: [
      "Taşıyıcı sistem imalatında proje ve detay paftalarına uygunluk",
      "Malzeme kabulünde kullanım yeri ve teknik şartnameye uygunluk",
      "Birleşim noktalarında sonradan kapatılacak imalatların kapanmadan önce kontrolü",
      "İnce işlerde ölçü, kot ve detay sürekliliği",
    ],
    disciplines: "Uygulama; mimari, statik, elektrik ve mekanik projelerin sahadaki ortak karşılığıdır. Bir disiplinde yapılan değişikliğin diğerine etkisi imalat başlamadan değerlendirilir.",
    benefit: "İş sahibi için karşılığı şudur: Sahada neyin, hangi sırayla ve hangi kontrolle yapıldığı bellidir. Sürprizler imalatın ortasında değil, planlama aşamasında konuşulur.",
    faqs: [
      { q: "Projesi hazır olmayan bir işle başlayabilir miyiz?", a: "Başlayabiliriz; ancak uygulama öncesinde proje geliştirme ve teknik koordinasyon kapsamının netleşmesi gerekir. İmalat, onaylı uygulama projeleri olmadan başlatılmaz." },
      { q: "Kaba yapı ve ince işleri aynı kapsamda mı yürütüyorsunuz?", a: "Proje kapsamına göre iki aşama da aynı iş programı içinde ele alınabilir. Hangi kalemlerin kapsama girdiği sözleşme öncesinde tek tek belirlenir." },
    ],
  },
  {
    n: "02",
    slug: "muhendislik-hizmetleri",
    title: "Mühendislik Hizmetleri",
    note: "Taşıyıcı sistem ve yapı mühendisliği",
    short: "Taşıyıcı sistem ve detay kararlarını statik hesaplar, yönetmelikler ve sahadaki uygulanabilirlikle birlikte değerlendiriyoruz.",
    intro: "Yapının güvenliği, çoğu zaman görünmeyen kararlarla belirlenir: taşıyıcı sistemin nasıl kurulduğu, yüklerin nasıl aktarıldığı, detayların sahada nasıl uygulanacağı. Mühendislik hizmetlerimizde bu kararları yalnızca hesap çıktısı olarak değil, imalat koşulları ve kullanım performansıyla birlikte ele alıyoruz. Amaç, kâğıt üzerinde doğru görünen bir çözümün sahada da aynı doğrulukla karşılık bulmasıdır.",
    needs: [
      "Taşıyıcı sistem yaklaşımının teknik olarak değerlendirilmesi",
      "Statik hesaplarla ilişkili kararların uygulanabilirliğinin incelenmesi",
      "Uygulama detaylarının imalat öncesinde gözden geçirilmesi",
      "Performans ve güvenlik açısından risk taşıyan noktaların erken görülmesi",
    ],
    scope: [
      "Teknik değerlendirme ve ön inceleme",
      "Taşıyıcı sistem yaklaşımının değerlendirilmesi",
      "Uygulama detaylarının mühendislik kontrolü",
      "Yönetmeliklere uygunluk yaklaşımının gözden geçirilmesi",
      "Performans ve güvenlik odaklı teknik karar desteği",
    ],
    process: [
      "Önce mevcut proje ve hesaplar, yapının kullanım amacı ve taşıyıcı sistem kurgusuyla birlikte okunur.",
      "Ardından detayların sahada nasıl imal edileceği değerlendirilir; uygulanması güç veya belirsiz noktalar imalat öncesinde işaretlenir.",
      "Bulunan konular ilgili proje disiplinleriyle ele alınır ve uygulama kararına dönüşmeden önce iş sahibine açıklanır.",
    ],
    technical: [
      "Yük aktarımının sürekliliği ve taşıyıcı eleman birleşimleri",
      "Hesap varsayımlarıyla proje detayları arasındaki uyum",
      "Yönetmelik gereklerinin proje kararlarına yansıması",
      "Sahada ölçü ve tolerans açısından kritik imalatlar",
    ],
    disciplines: "Mühendislik değerlendirmesi mimari kararlarla ayrı düşünülemez. Açıklık, kat yüksekliği veya cephe kararı değiştiğinde bunun taşıyıcı sisteme etkisi birlikte ele alınır.",
    benefit: "İş sahibi, teknik bir kararın neden alındığını ve sahada neyi değiştireceğini erken öğrenir. Böylece maliyetli düzeltmeler imalat sonrasına kalmaz.",
    faqs: [
      { q: "Statik projeyi siz mi hazırlıyorsunuz?", a: "Bu hizmet, taşıyıcı sistem ve uygulama detaylarının teknik değerlendirilmesine odaklanır. Proje müellifliği kapsamı, işin niteliğine göre ilk görüşmede ayrıca netleştirilir." },
      { q: "Mevcut statik projemizi inceleyebilir misiniz?", a: "Evet. Mevcut proje ve hesaplar; taşıyıcı sistem yaklaşımı, detay uygulanabilirliği ve diğer disiplinlerle uyum açısından değerlendirilebilir." },
    ],
  },
  {
    n: "03",
    slug: "proje-gelistirme-ve-teknik-koordinasyon",
    title: "Proje Geliştirme ve Teknik Koordinasyon",
    note: "Disiplinler arası uyum",
    short: "Mimari, statik, elektrik ve mekanik projeleri uygulama öncesinde karşılaştırıyor; uyumsuzlukları sahaya çıkmadan çözüyoruz.",
    intro: "Birçok uygulama sorunu sahada değil, proje masasında başlar. Mimari, statik, elektrik ve mekanik projeler ayrı ekiplerce hazırlandığında; birleşim noktaları, geçişler ve kotlar arasında farklar oluşabilir. Teknik koordinasyon hizmeti, bu projeleri imalat başlamadan aynı bütünün parçaları hâline getirmek için vardır. Sorun sahada fark edilirse bedeli zaman ve maliyet olur; proje aşamasında fark edilirse bir revizyonla çözülür.",
    needs: [
      "Farklı disiplinlerce hazırlanmış projelerin birbiriyle çakışması",
      "Detay ve birleşim kararlarının imalat öncesinde netleşmemesi",
      "Uygulama projelerinin sahadaki karşılığının belirsiz olması",
      "Revizyonların diğer disiplinlere etkisinin izlenememesi",
    ],
    scope: [
      "Disiplinler arası koordinasyon toplantıları ve karar takibi",
      "Uygulama projelerinin teknik açıdan gözden geçirilmesi",
      "Detay ve birleşim çözümlerinin değerlendirilmesi",
      "İmalat öncesi teknik onay süreci",
      "Revizyonların kapsam, süre ve maliyet etkisinin izlenmesi",
    ],
    process: [
      "Projeler disiplin bazında değil, aynı yapı elemanı üzerinden birlikte okunur: bir kolon, bir şaft veya bir asma tavan bütün disiplinleriyle değerlendirilir.",
      "Uyumsuzluklar liste hâline getirilir; her madde için sorumlu, çözüm ve kapanış koşulu belirlenir.",
      "İmalat, kritik detaylar teknik olarak onaylanmadan başlatılmaz. Sahada yeni bir uyumsuzluk çıkarsa aynı karar kaydına işlenir.",
    ],
    technical: [
      "Şaft, geçiş ve tesisat güzergâhlarının taşıyıcı elemanlarla ilişkisi",
      "Kot ve ölçü farklarının birleşim detaylarına etkisi",
      "Cephe, doğrama ve iç mekân detaylarının proje bütünlüğü",
      "Revizyon paftalarının güncellik ve sürüm takibi",
    ],
    disciplines: "Koordinasyonun merkezinde tek bir disiplin yoktur. Mimari kararın statik karşılığı, mekanik güzergâhın mimari etkisi ve elektrik altyapısının uygulama sırası birlikte değerlendirilir.",
    benefit: "İş sahibi sahada ‘projede yoktu’ cümlesini daha az duyar. Değişiklik gerekiyorsa nedeni, etkisi ve kararı imalat öncesinde bellidir.",
    faqs: [
      { q: "Koordinasyon ile proje hazırlamak aynı şey mi?", a: "Hayır. Koordinasyon, hazırlanan projelerin birbiriyle ve sahayla uyumunu sağlar. Projelerin hazırlanması veya hazırlatılması kapsamı ayrıca belirlenir." },
      { q: "Uygulama başladıktan sonra koordinasyon yapılabilir mi?", a: "Yapılabilir; ancak en doğru zaman imalat öncesidir. Uygulama başladıysa önce kritik imalatlar ve yaklaşan iş kalemleri üzerinden ilerlenir." },
    ],
  },
  {
    n: "04",
    slug: "proje-ve-uygulama-sureclerinin-yonetimi",
    title: "Proje ve Uygulama Süreçlerinin Yönetimi",
    note: "Süre, bütçe ve kalite takibi",
    short: "İş programı, bütçe ve kalite kontrol noktalarını aynı takip düzeni içinde yönetiyor; ilerlemeyi iş sahibiyle düzenli paylaşıyoruz.",
    intro: "Bir inşaat işinde sorunların çoğu tek bir büyük hatadan değil, küçük gecikmelerin ve belirsiz kararların birikmesinden çıkar. Süreç yönetiminde yaptığımız iş; iş programını, bütçe takibini ve kalite kontrol noktalarını ayrı ayrı değil, birbirini etkileyen tek bir düzen içinde izlemektir. Böylece bir gecikmenin maliyete, bir değişikliğin teslim tarihine etkisi ortaya çıktığı anda görülür.",
    needs: [
      "İş programının hazırlanması ve güncelliğini koruması",
      "Bütçe ile gerçekleşen imalat arasındaki ilişkinin izlenmesi",
      "Değişikliklerin süre ve maliyet etkisinin önceden görülmesi",
      "İş sahibinin düzenli ve anlaşılır biçimde bilgilendirilmesi",
    ],
    scope: [
      "İş programı ve süreç planlaması",
      "Bütçe ve gerçekleşen iş takibi",
      "Risk ve değişiklik yönetimi",
      "Kalite kontrol noktalarının tanımlanması ve izlenmesi",
      "İlerleme raporları ve iş sahibi bilgilendirmesi",
    ],
    process: [
      "Başlangıçta iş programı, bütçe planı ve kalite kontrol noktaları birlikte tanımlanır; takip bu üçlü üzerinden yürür.",
      "İlerleme, planlanan ve gerçekleşen iş karşılaştırılarak izlenir. Sapma görüldüğünde nedeni ve telafi yolu ayrıca ele alınır.",
      "Değişiklik talebi geldiğinde önce teknik gereklilik, sonra süre ve bütçe etkisi değerlendirilir; karar iş sahibiyle birlikte verilir.",
    ],
    technical: [
      "Kritik yol üzerindeki imalatların gecikme etkisi",
      "Hakediş ve gerçekleşen imalat ilişkisi",
      "Kalite kontrol noktalarında kapanış kriterleri",
      "Değişiklik kararlarının sürüm ve onay takibi",
    ],
    disciplines: "Süreç yönetimi yalnızca takvim tutmak değildir. Proje koordinasyonu ve saha uygulamasıyla aynı kararları paylaşır; bu yüzden üç hizmet gerektiğinde birlikte yürütülür.",
    benefit: "İş sahibi işin nerede olduğunu sormak zorunda kalmaz. İlerleme, gecikme ve değişiklikler düzenli aralıklarla, nedenleriyle birlikte önüne gelir.",
    faqs: [
      { q: "Bütçe takibi hangi aralıklarla paylaşılır?", a: "Aralık, işin ölçeğine göre başlangıçta belirlenir. Esas olan, gerçekleşen imalat ile bütçe arasındaki farkın dönem sonunda değil, oluştuğu sırada görülmesidir." },
      { q: "Süreç yönetimi hizmetini kendi yüklenicimiz varken alabilir miyiz?", a: "Evet. Bu hizmet iş sahibi adına yürütülür; mevcut yüklenicinin iş programı, ilerleme ve kalite kontrolleri bağımsız bir düzen içinde izlenebilir." },
    ],
  },
  {
    n: "05",
    slug: "teknik-danismanlik",
    title: "Teknik Danışmanlık",
    note: "Bağımsız teknik değerlendirme",
    short: "Yatırım kararı öncesinde veya devam eden bir işte proje ve uygulama kararlarını bağımsız bir gözle değerlendiriyoruz.",
    intro: "Bazen iş sahibinin ihtiyacı yeni bir uygulama başlatmak değil, elindeki projeyi doğru okumaktır. Teknik danışmanlık; yatırım kararı öncesinde, proje aşamasında veya devam eden bir uygulamada kararların teknik karşılığını netleştirmek için kullanılır. Kapsam işin aşamasına göre belirlenir: kimi zaman bir proje incelemesi, kimi zaman bir uygulama yönteminin karşılaştırılması yeterli olur.",
    needs: [
      "Yatırım kararı öncesinde teknik yapılabilirliğin görülmesi",
      "Mevcut projenin uygulanabilirliği hakkında bağımsız değerlendirme",
      "Devam eden işte teknik risklerin erken belirlenmesi",
      "Alternatif uygulama yöntemleri arasında karar verilmesi",
    ],
    scope: [
      "Proje ve uygulama gözden geçirme",
      "Teknik risk değerlendirmesi",
      "Alternatif çözüm ve uygulama yöntemi analizi",
      "Süreç ve kalite önerileri",
      "Karar öncesi teknik raporlama",
    ],
    process: [
      "Önce iş sahibinin karar vermek istediği konu netleştirilir; danışmanlık kapsamı bu soruya göre sınırlanır.",
      "Mevcut proje, hesap ve saha bilgileri bu kapsam içinde incelenir; varsayımlar ile doğrulanmış bilgiler birbirinden ayrılır.",
      "Bulgular, seçeneklerin teknik ve uygulama sonuçlarıyla birlikte sunulur. Karar iş sahibinindir; bizim görevimiz o kararın dayanağını görünür kılmaktır.",
    ],
    technical: [
      "Taşıyıcı sistem ve detay kararlarının uygulanabilirliği",
      "Proje ile saha koşulları arasındaki farklar",
      "Değişiklik gerektiren imalatlarda risk sırası",
      "Alternatif yöntemlerde süre, maliyet ve uygulama etkisi",
    ],
    disciplines: "Danışmanlık tek disipline kapanmaz. Konu taşıyıcı sistemle ilgiliyse mimari etkisi, uygulamayla ilgiliyse proje karşılığı birlikte değerlendirilir.",
    benefit: "İş sahibi büyük bir taahhüdün altına girmeden önce neyle karşılaşacağını öğrenir. Belirsizlik azaldıkça pazarlık, planlama ve sözleşme süreci de sağlıklı ilerler.",
    faqs: [
      { q: "Danışmanlık tek seferlik olabilir mi?", a: "Olabilir. Kapsam tek bir teknik soruya göre de tanımlanabilir; devam eden işlerde periyodik değerlendirme olarak da yürütülebilir." },
      { q: "Devam eden işimizde başka bir yüklenici çalışırken danışmanlık alabilir miyiz?", a: "Evet. Değerlendirme iş sahibi adına yapılır; mevcut uygulama ve proje kararları bağımsız biçimde incelenir." },
    ],
  },
];

export const projectTypes = ["Konut Yapıları", "Ticari Yapılar", "Karma Kullanım", "Diğer"] as const;
export const serviceTags = ["İnşaat & Uygulama", "Mühendislik", "Teknik Koordinasyon", "Süreç Yönetimi", "Danışmanlık"];

export const phases = [
  {
    number: "01",
    label: "GÖRÜŞME + KEŞİF",
    short: "Görüşme ve Keşif",
    title: "Önce işi ve sahayı anlamak",
    text: "İhtiyacı dinler; arsa, mevcut yapı ve proje koşullarını yerinde inceleriz. Bu aşamanın çıktısı bir söz değil, işin hangi kapsamda ele alınabileceğine dair net bir çerçevedir.",
    image: "https://images.pexels.com/photos/17909242/pexels-photo-17909242.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    number: "02",
    label: "DEĞERLENDİRME",
    short: "Değerlendirme",
    title: "Yapılabilirlik, bütçe ve risk aynı masada",
    text: "İşin yapılabilirliğini, yaklaşık bütçe aralığını ve teknik risklerini birlikte ele alırız. Belirsiz kalan konular varsayımla kapatılmaz; neyin, ne zaman netleşeceği baştan bellidir.",
    image: "https://images.pexels.com/photos/8961146/pexels-photo-8961146.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    number: "03",
    label: "PROJELENDİRME",
    short: "Projelendirme",
    title: "Disiplinler sahaya çıkmadan uyumlanır",
    text: "Mimari, statik, elektrik ve mekanik projelerin hazırlanmasını koordine eder, birbirleriyle uyumunu kontrol ederiz. Amaç, sahada revizyonla vakit kaybetmemektir.",
    image: "https://images.pexels.com/photos/8961073/pexels-photo-8961073.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    number: "04",
    label: "UYGULAMA",
    short: "Uygulama",
    title: "İş programına bağlı, denetlenen imalat",
    text: "İnşaatı iş programına göre yürütür; imalatı proje ve şartnameye uygunluk açısından aşama aşama denetleriz. İlerleme ve değişiklikler iş sahibiyle düzenli paylaşılır.",
    image: "https://images.pexels.com/photos/18283538/pexels-photo-18283538.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    number: "05",
    label: "TESLİM",
    short: "Teslim",
    title: "Teslim, ilişkinin bittiği nokta değildir",
    text: "Eksik ve kusurlu işler kapatılarak yapı teslim edilir. Teslim sonrasında da garanti ve bakım konularında muhatap aynı ekiptir.",
    image: "https://images.pexels.com/photos/20578678/pexels-photo-20578678.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
];

export const principles = [
  { n: "01", title: "Teknik Değerlendirme", text: "Kararların dayanağı; hesap, proje ve saha koşulunun birlikte okunmasıdır." },
  { n: "02", title: "Disiplin Uyumu", text: "Mimari, statik ve mekanik kararlar birbirinden kopuk ele alınmaz." },
  { n: "03", title: "Uygulama Kontrolü", text: "İmalat, kapatılmadan önce kontrol edilir; kayıt altına alınır." },
  { n: "04", title: "Açık Süreç Bilgisi", text: "İlerleme, gecikme ve değişiklik iş sahibiyle nedenleriyle paylaşılır." },
];

export const faqs = [
  {
    question: "Hangi tür yapılarla çalışıyorsunuz?",
    answer: "Konut, ticari ve karma kullanımlı yapıların projelendirme ve inşaat süreçlerini yürütüyoruz. İşin ölçeği kadar proje olgunluğu ve uygulama koşulları da kapsamı belirler; bu nedenle her iş önce keşif ve değerlendirmeyle başlar.",
  },
  {
    question: "Projenin hangi aşamasında devreye girebilirsiniz?",
    answer: "Fikir aşamasından teslim sonrasına kadar her aşamada. Erken katılım, proje kararlarının sahada karşılık bulmasını kolaylaştırır; devam eden bir işte ise önce mevcut durumun teknik değerlendirmesi yapılır.",
  },
  {
    question: "Mevcut mimari ve statik projelerimizi inceleyebilir misiniz?",
    answer: "Evet. Projeleri taşıyıcı sistem yaklaşımı, detay uygulanabilirliği ve diğer disiplinlerle uyum açısından gözden geçiriyoruz. Bulunan uyumsuzluklar imalat öncesinde ilgili disiplinlerle ele alınır.",
  },
  {
    question: "İnşaat uygulamasını hangi kapsamda yürütüyorsunuz?",
    answer: "Kapsam sözleşme öncesinde kalem kalem belirlenir: saha organizasyonu, kaba yapı ve ince işler, imalat ve montaj koordinasyonu ile malzeme ve detay kontrolleri bu kapsamın parçalarıdır.",
  },
  {
    question: "Teknik koordinasyonu nasıl sağlıyorsunuz?",
    answer: "Mimari, statik, elektrik ve mekanik projeleri aynı yapı elemanı üzerinden karşılaştırıyoruz. Uyumsuzluklar listelenir; her biri için çözüm ve kapanış koşulu belirlenmeden ilgili imalat başlatılmaz.",
  },
  {
    question: "Bütçe ve iş programı nasıl takip ediliyor?",
    answer: "Başlangıçta iş programı ve bütçe planı birlikte tanımlanır. İlerleme, planlanan ile gerçekleşen karşılaştırılarak izlenir; değişiklik gerektiğinde süre ve maliyet etkisi iş sahibiyle birlikte değerlendirilir.",
  },
  {
    question: "Başiskele ve İzmit dışında hizmet veriyor musunuz?",
    answer: "Merkezimiz Başiskele'de. Kocaeli genelinde ve çevresinde çalışıyoruz. İlçe ve iş kapsamına göre değerlendirme ilk görüşmede netleşir.",
  },
  {
    question: "İlk görüşmede hangi bilgiler gerekiyor?",
    answer: "Arsanın veya mevcut yapının konumu, düşünülen yapı türü ve yaklaşık büyüklük başlangıç için yeterlidir. Varsa mevcut proje, imar durumu ve hedef tarih de değerlendirmeyi hızlandırır.",
  },
  {
    question: "Mimari ve statik projeleri siz mi hazırlıyorsunuz?",
    answer: "Projelerin hazırlanmasını koordine ediyor, teknik açıdan gözden geçiriyoruz. Doğrudan proje müellifliği hizmeti, işin kapsamına göre ilk görüşmede ayrıca netleştirilir.",
  },
  {
    question: "Uygulama sırasında değişiklik gerekirse ne oluyor?",
    answer: "Önce değişikliğin teknik gerekliliği, ardından süre ve bütçeye etkisi değerlendirilir. Karar iş sahibiyle birlikte verilir ve iş programına işlenir; sahada kendiliğinden büyüyen bir kapsam oluşmaz.",
  },
];
