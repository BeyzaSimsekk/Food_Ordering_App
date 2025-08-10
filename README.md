# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

---

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
