# NOTES TO MYSELF (TURKISH):

## app.json (veya app.config.js)

- **Ne iş yapar:** Expo konfigürasyonu (app adı, slug, sdkVersion, icon, splash vb.).
- **Not:** app.config.js dinamik konfigürasyon için tercih edilir.

## babel.config.js

- **Ne iş yapar:** Babel (JS/TS => JS) ayarları ve plugin’leri barındırır.
- **Neden önemli:** NativeWind, jsxImportSource veya nativewind/babel için Babel plugin ister.

## tsconfig.json

- **Ne iş yapar:** TypeScript derleyici ayarları (hangi lib, jsx modu vb.).
- **Not:** Expo TypeScript template bunu otomatik oluşturur.

## metro.config.js

- **Ne iş yapar:** Metro bundler (React Native packager) ayarları — asset uzantıları, svg için transformer, monorepo ayarları vb.
- **Örnek kullanım:** .svg import etmek veya extraNodeModules tanımlamak için düzenlenir.

## tailwind.config.js

- **Ne iş yapar:** Tailwind (NativeWind) ayarları — content (taranacak dosyalar), custom renkler ve fontFamily gibi ayarlar.
- **Örnek:** fontFamily içine koyduğun anahtar ile Tailwind sınıf adın (font-anahtar) eşleşir.

## global.css

- **Ne iş yapar:** NativeWind ile kullanılır.
- **Not:** React Native normalde CSS kullanmaz; NativeWind bu dosyayı alıp sınıfları React Native stillerine dönüştürür. global.css projede import edilmeli (genelde root layout veya App dosyasında).

## index.tsx

- Bazı projelerde root entry veya bir “route” dosyası olabilir. (Web’de sık; RN’de genelde App.tsx kullanılır.)
- **index.ts** ise genelde barrel export (dosya dışa aktarma) için kullanılır — export \* from './MyComponent'.

## /app klasörü (expo-router)

app/ içindeki dosyalar otomatik route olur. Örnek:

- **app/\_layout.tsx** veya **app/\_layout.tsx** — root layout, tüm sayfaları saran wrapper (header, stack vs).

- **app/index.tsx** — / (ana sayfa) route.

- **app/settings.tsx** — /settings route.

- **\_layout.tsx** (başında alt çizgi) expo-router’da layout dosyasıdır — burası genelde Stack veya ortak UI bar içerir.

## images.d.ts veya declarations.d.ts

- **Ne iş yapar:** TypeScript’e import logo from './a.png' gibi importlara izin veren tip beyanı.
- **Neden:** Eğer yoksa, TS fotoğraf/font importlarında hata verir.

## Platform-spesifik dosya uzantıları

- **.js / .jsx** — JavaScript, JSX içeriyorsa **.jsx.**

- **.ts / .tsx** — TypeScript, JSX içeriyorsa **.tsx.**

- **Kural:** JSX (React elementi return) varsa .tsx kullan.

# FIGMA'DAN KODA

## Figma → Class Mapping:

- Figma’da gördüğün her renk → **tailwind.config.js colors**

- Figma’daki spacing → **Tailwind p-4, m-3 gibi utility’lere**

- Figma’daki border radius → **Tailwind rounded-xl, rounded-full**

- Figma’daki font → **Tailwind font-quicksand-bold**

- Bileşen kombinasyonları → **@layer** components içinde **@apply** ile

## Çalışma Mantığı:

- **_Tekrarlayan_** UI parçaları: _@layer components_

- **_Küçük utility_** kombinasyonları: _@layer utilities_

- **_Renk & font:_** tailwind.config.js

- **_Tek seferlik_** özel stiller: Direkt className="..." içinde yaz

---

## seed.ts HAKKINDA

Yani uygulamanın başlangıçta ihtiyacı olan kategoriler, menü öğeleri, özelleştirmeler gibi verileri Appwrite veritabanına otomatik olarak yüklüyor.

Ayrıca, menü öğelerinin resimlerini alıp Appwrite Storage’a yükleyip onların kalıcı URL’lerini veritabanına kaydediyor.

Normalde bunları tek tek elle Appwrite Console’dan girmen gerekir ama bu script otomatik yapıyor.

### TypeScript interface’leri:

Bunlar sadece tip tanımları. Senin dummyData JSON’unun nasıl görüneceğini tarif ediyor.
⚡ Bunlar runtime’da çalışmaz, sadece derleme sırasında sana hata yakalatır.

### clearAll ve clearStorage:

- `databases.listDocuments(...)` → Appwrite’tan bir koleksiyonun içindeki tüm kayıtları (documents) getiriyor.

- `map` ile her dokümanı deleteDocument çağrısı ile siliyor.

- `Promise.all([...])` → aynı anda birden fazla asenkron silme işlemi çalışsın diye.

- `async/await` → burada await yazınca JavaScript bu satır bitene kadar bekliyor.
  Yani bu fonksiyon bir koleksiyonu tamamen temizliyor.

- `clearStorage` de aynı şeyi Storage (dosyalar) için yapıyor.

### uploadImageToStorage:

Bu fonksiyon verilen `imageUrl`’i:

- İnternetten indiriyor (`fetch` ile).

- `blob` yani ham dosya haline çeviriyor.

- Appwrite Storage içine yüklüyor (`createFile`).

- Dosyayı Appwrite’tan geri alabileceğin bir URL döndürüyor (`getFileViewURL`).

**Yani: dışarıdaki görseli al → Appwrite’a yükle → kendi URL’ini döndür.**

### seed fonksiyonu:

Bu fonksiyon hepsini birleştiriyor.
_Özetle:_

- **Temizle:** tüm koleksiyonları ve dosyaları boşalt.

- **Ekle:** kategoriler, customization’lar.

- **Menü:** her menü öğesini ekle, resmini Appwrite’a yükle.

- **Bağla:** her menü öğesine hangi customization’lar aitse `menuCustomizations` koleksiyonuna ekle.

### async/await – Promise mantığı:

JavaScript’te her ağ işlemi (mesela Appwrite çağrısı) zaman alır → Promise döner.

- `await` koyarsan → _“bu satır bitmeden devam etme”_ demek.

- `async function` içinde `await` kullanabilirsin.

- `Promise.all([...])` → aynı anda birden fazla işlemi başlatır, hepsi bitince bekler.

**_SEED.TS AMACI: başlangıç verilerini Appwrite’a dolduran otomatik script._**
**_Bunu 1 kere çalıştırırsın, sonra Appwrite Console’da kategoriler/menüler hazır olur._**
