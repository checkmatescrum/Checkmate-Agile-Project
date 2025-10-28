# Proje README

## Açıklama
Bu proje **Node.js** ve **JavaScript** kullanılarak geliştirilmiştir. Projede kullanılan paketler `package.json` dosyasında listelenmiştir. Veritabanı olarak **MySQL** kullanılmaktadır.

## Ekran Görüntüsü

![Proje Ekran Görüntüsü](https://raw.githubusercontent.com/checkmatescrum/Checkmate-Agile-Project/main/Proje_ss.png)

## Kurulum
1. Depoyu klonla veya proje dosyalarını uygun bir klasöre al.
```bash
git clone <REPO_URL>
cd <REPO_FOLDER>
```
2. Proje kök dizininde gerekli paketleri yükle:
```bash
npm install
```

## Veritabanı yapılandırması
1. MySQL üzerinde bir veritabanı oluşturun.
2. Oluşturduğunuz veritabanı bilgilerini proje içindeki `config.js` dosyasına girin. 
```
(`config.js` dosyanda alan adları farklıysa kendi dosyana göre uygun yerleri güncelle.)

## İlk çalıştırma (tabloların oluşturulması)
Gerekli kurulumlar tamamlandıktan sonra projeyi başlat:
```bash
npm start
```
İlk çalıştırıldığında proje, veritabanındaki gerekli tablo işlemlerini otomatik olarak gerçekleştirecektir.

> **ÖNEMLİ:** İlk çalıştırmadan sonra `index.js` dosyasında şu satırı bulun:
> ```js
> await sequelize.sync({ force:true });
> ```
> ve **`{ force:true }`** kısmını silin. Aksi halde her çalıştırmada veritabanı baştan silinip yeniden oluşturulur.

## Sunucu çalıştırma ve erişim
Proje çalışırken uygulamayı tarayıcıdan şu adresten görüntüleyebilirsiniz:
```
http://localhost:3000
```


