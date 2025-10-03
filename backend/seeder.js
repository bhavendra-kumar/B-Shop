const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const products = [
    // ---------- Mobiles ----------
    {
        name: "Apple iPhone 15",
        price: 109999,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-og-202309?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1695483848",
        description: "Apple iPhone 15 comes with a stunning 6.1-inch Super Retina XDR display, A17 Bionic chip for lightning-fast performance, dual 48MP + 12MP camera system for professional-quality photos and videos, and up to 20 hours of video playback. Supports 5G connectivity and MagSafe accessories for a complete ecosystem experience.",
        category: "Mobiles"
    },
    {
        name: "Samsung Galaxy S23",
        price: 129999,
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/sm-s911bzkdinu/gallery/in-galaxy-s23-s911-435430-sm-s911bzkdinu-530405927?$720_576_PNG$",
        description: "Samsung Galaxy S23 features a 6.1-inch Dynamic AMOLED display with 120Hz refresh rate, Snapdragon 8 Gen 2 processor, and 50MP triple camera setup with advanced night photography. Comes with 8GB RAM, 128GB storage, and IP68 water resistance for durability.",
        category: "Mobiles"
    },
    {
        name: "Google Pixel 8",
        price: 79999,
        image: "https://store.google.com/product/images/phone_pixel_8_front.png",
        description: "Google Pixel 8 offers a pure Android experience with a 6.2-inch OLED display, Google Tensor G3 chip, and a dual rear camera system with 50MP main sensor for pro-level photography. Includes features like real-time translation, security updates directly from Google, and long-lasting battery life.",
        category: "Mobiles"
    },
    {
        name: "OnePlus 11",
        price: 64999,
        image: "https://image01.oneplus.net/ebp/202302/15/1-m00-12-1f-rb8bwl-jx7kac4xaqaaawqqaaaf-1600-1200.png",
        description: "OnePlus 11 comes with a 6.7-inch Fluid AMOLED display with 120Hz refresh rate, Snapdragon 8 Gen 2 processor, and triple camera system co-developed with Hasselblad for vibrant and natural images. Features 16GB RAM, 256GB storage, and Warp Charge 100 for ultra-fast charging.",
        category: "Mobiles"
    },
    {
        name: "Xiaomi 13",
        price: 45999,
        image: "https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi13/specs.png",
        description: "Xiaomi 13 features a 6.36-inch AMOLED display, Snapdragon 8 Gen 2 processor, 50MP dual rear camera system with advanced AI photography, and 4500mAh battery supporting 67W fast charging. Sleek design with MIUI 15 for smooth user experience.",
        category: "Mobiles"
    },
    {
        name: "Realme GT 3",
        price: 35999,
        image: "https://www.realme.com/in/realme-gt-3/images/product.png",
        description: "Realme GT 3 sports a 6.7-inch AMOLED display with 120Hz refresh rate, MediaTek Dimensity 9200+ chipset, 200MP ultra-clear main camera, and 5000mAh battery supporting 240W UltraDart fast charging. Lightweight and stylish with high-performance gaming capabilities.",
        category: "Mobiles"
    },
    {
        name: "Apple iPhone 14",
        price: 74999,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-og-202209?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1662583165667",
        description: "Apple iPhone 14 comes with a 6.1-inch Super Retina XDR display, A15 Bionic chip, dual 12MP camera system with Photonic Engine for incredible low-light photos, and Ceramic Shield front cover. Supports 5G, MagSafe accessories, and up to 20 hours of video playback.",
        category: "Mobiles"
    },
    {
        name: "Samsung Galaxy S22",
        price: 106999,
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/sm-s901bzkdinu/gallery/in-galaxy-s22-s901-435430-sm-s901bzkdinu-530405928?$720_576_PNG$",
        description: "Samsung Galaxy S22 features a 6.1-inch Dynamic AMOLED display with HDR10+, Snapdragon 8 Gen 1 processor, 50MP triple camera system with advanced AI photography, 8GB RAM, 128GB storage, and IP68 water and dust resistance.",
        category: "Mobiles"
    },
    {
        name: "Google Pixel 7",
        price: 59999,
        image: "https://store.google.com/product/images/pixel_7_front.png",
        description: "Google Pixel 7 offers a 6.3-inch AMOLED display, Google Tensor G2 processor, and dual rear camera system (50MP main + 12MP ultrawide) optimized for Night Sight and HDR+ photography. Features adaptive battery and pure Android experience with timely updates.",
        category: "Mobiles"
    },
    {
        name: "OnePlus 10 Pro",
        price: 69999,
        image: "https://image01.oneplus.net/ebp/202203/16/1-m00-1b-7e-rb8bwl-jz7kac3qaaakl.png",
        description: "OnePlus 10 Pro sports a 6.7-inch AMOLED display with LTPO 2.0 adaptive refresh rate, Snapdragon 8 Gen 1 processor, and Hasselblad triple camera setup with 48MP main sensor. Comes with 12GB RAM, 256GB storage, and 5000mAh battery supporting 80W fast charging.",
        category: "Mobiles"
    },


    // ---------- Laptops ----------
     {
        name: "Apple MacBook Air M2",
        price: 119999,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-m2-og-202206?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1653493200208",
        description: "Apple MacBook Air M2 features a stunning 13.6-inch Liquid Retina display, Apple M2 chip for lightning-fast performance, up to 24GB unified memory, and up to 2TB SSD storage. Extremely thin and lightweight, it provides up to 18 hours of battery life and supports fast charging for all-day productivity.",
        category: "Laptops"
    },
    {
        name: "Dell XPS 13",
        price: 109999,
        image: "https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/xps-13-9310-laptop.jpg",
        description: "Dell XPS 13 comes with a 13.4-inch InfinityEdge FHD+ display, 11th Gen Intel Core i7 processor, 16GB RAM, and 512GB SSD storage. Sleek and durable design, long battery life, and powerful performance for both work and entertainment. Features Windows 11 and premium build quality.",
        category: "Laptops"
    },
    {
        name: "HP Spectre x360",
        price: 99999,
        image: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06701886.png",
        description: "HP Spectre x360 2-in-1 convertible laptop offers a 13.5-inch 4K AMOLED touch display, Intel Core i7 12th Gen processor, 16GB RAM, and 1TB SSD storage. Ultra-portable design with 360-degree hinge, long-lasting battery, and premium audio for immersive multimedia experience.",
        category: "Laptops"
    },
    {
        name: "Lenovo ThinkPad X1 Carbon",
        price: 129999,
        image: "https://www.lenovo.com/medias/lenovo-laptop-thinkpad-x1-carbon-gen9-front.png",
        description: "Lenovo ThinkPad X1 Carbon Gen 9 features a 14-inch UHD display, Intel Core i7 processor, 16GB RAM, and 512GB SSD storage. Known for its robust build, lightweight design, excellent keyboard, and enterprise-grade security features. Perfect for professionals and business users.",
        category: "Laptops"
    },
    {
        name: "Asus ROG Zephyrus G14",
        price: 124999,
        image: "https://dlcdnwebimgs.asus.com/gain/8AB4AAB6-DC25-4E90-AE0C-C5DF5A6F67F3",
        description: "Asus ROG Zephyrus G14 gaming laptop comes with a 14-inch QHD display with 120Hz refresh rate, AMD Ryzen 9 processor, NVIDIA GeForce RTX 3060 GPU, 16GB RAM, and 1TB SSD storage. Compact yet powerful gaming laptop with excellent thermal management and immersive audio.",
        category: "Laptops"
    },
    {
        name: "Acer Swift 5",
        price: 74999,
        image: "https://static.acer.com/up/Resource/Acer/Laptops/Swift5/SF514-55.png",
        description: "Acer Swift 5 features a 14-inch Full HD touchscreen display, Intel Core i7 processor, 16GB RAM, and 512GB SSD storage. Ultra-lightweight at just 1kg, with long battery life and antimicrobial coating on the chassis. Ideal for students and professionals on-the-go.",
        category: "Laptops"
    },
    {
        name: "MSI Prestige 14",
        price: 84999,
        image: "https://www.msi.com/Laptop/Prestige-14-A11-045/Mobile-1",
        description: "MSI Prestige 14 is a sleek ultrabook with a 14-inch Full HD display, Intel Core i7 11th Gen processor, NVIDIA GeForce GTX 1650 Max-Q graphics, 16GB RAM, and 512GB SSD. Lightweight design, high performance for content creators, and long battery life for uninterrupted workflow.",
        category: "Laptops"
    },
    {
        name: "Razer Blade 15",
        price: 159999,
        image: "https://assets2.razerzone.com/images/pnx.assets/3f695b38bfb54d3a9276e6f33ed1702f/razer-blade-15-2022-laptop.png",
        description: "Razer Blade 15 gaming laptop features a 15.6-inch Full HD display with 360Hz refresh rate, Intel Core i7 12th Gen processor, NVIDIA GeForce RTX 3070 GPU, 16GB RAM, and 1TB SSD storage. Premium build quality, ultra-thin design, and high-end gaming performance for enthusiasts.",
        category: "Laptops"
    },
    {
        name: "Apple MacBook Pro 16 M1 Pro",
        price: 249999,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-pro-16-m1-pro-og-202110?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1633657405000",
        description: "Apple MacBook Pro 16-inch with M1 Pro chip offers exceptional performance with up to 10-core CPU, 16-core GPU, 32GB RAM, and up to 2TB SSD. Stunning Liquid Retina XDR display, advanced thermal system, long battery life, and perfect for creative professionals handling video editing, 3D modeling, and software development.",
        category: "Laptops"
    },
    // ---------- Accessories ----------
   {
        name: "Sony WH-1000XM5 Headphones",
        price: 39999,
        image: "https://m.media-amazon.com/images/I/61hOd5l8UQL._SL1500_.jpg",
        description: "Sony WH-1000XM5 wireless headphones offer industry-leading noise cancellation, exceptional sound quality with deep bass, and up to 30 hours of battery life. Lightweight and comfortable for all-day use, with touch controls and voice assistant support.",
        category: "Accessories"
    },
    {
        name: "Bose QuietComfort Earbuds",
        price: 14999,
        image: "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/quietcomfort_earbuds/product_silo_images/QC_EB_ProductImage_1.png",
        description: "Bose QuietComfort Earbuds feature world-class noise cancellation, rich high-fidelity audio, and secure, comfortable fit. IPX4 water-resistant design with touch controls, ideal for travel, workouts, and daily use.",
        category: "Accessories"
    },
    {
        name: "Logitech MX Master 3",
        price: 7999,
        image: "https://resource.logitech.com/content/dam/logitech/en/products/mx/mx-master-3/gallery/mx-master-3-top-view.png",
        description: "Logitech MX Master 3 is an ergonomic wireless mouse designed for productivity. Features ultra-fast MagSpeed scrolling, customizable buttons, cross-computer control, and long battery life up to 70 days per charge.",
        category: "Accessories"
    },
    {
        name: "Razer BlackWidow V3",
        price: 11999,
        image: "https://assets.razerzone.com/razer-blackwidow-v3-top.png",
        description: "Razer BlackWidow V3 mechanical gaming keyboard comes with Razer Green switches for tactile feedback, customizable RGB Chroma lighting, durable aluminum top plate, and programmable keys for an enhanced gaming experience.",
        category: "Accessories"
    },
    {
        name: "Apple Watch Series 9",
        price: 39999,
        image: "https://www.apple.com/newsroom/images/product/watch/standard/apple_watch_series9_product_091223.jpg.og.jpg?202309230901",
        description: "Apple Watch Series 9 combines fitness, health, and connectivity. Features Always-On Retina display, ECG, blood oxygen monitoring, sleep tracking, and seamless integration with iPhone. Water-resistant design and extensive app ecosystem for daily productivity and health tracking.",
        category: "Accessories"
    },
    {
        name: "Fitbit Charge 6",
        price: 14999,
        image: "https://static.fitbit.com/product-images/charge6.png",
        description: "Fitbit Charge 6 is a fitness tracker with 24/7 heart rate monitoring, sleep tracking, stress management, built-in GPS, and up to 7 days battery life. Sleek, lightweight design ideal for workouts, running, and daily activity tracking.",
        category: "Accessories"
    },
    {
        name: "Apple AirPods Pro 2",
        price: 24999,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-og-202209?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1662583165667",
        description: "Apple AirPods Pro 2 feature active noise cancellation, spatial audio with dynamic head tracking, adaptive EQ, and sweat/water resistance. Wireless charging case provides more than 24 hours of listening time. Perfect for music, calls, and immersive audio experiences.",
        category: "Accessories"
    },
    {
        name: "Samsung Galaxy Buds 2",
        price: 8999,
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/sm-r177nzkrinu/gallery/in-galaxy-buds-2-sm-r177-435430-sm-r177nzkrinu-530405924?$720_576_PNG$",
        description: "Samsung Galaxy Buds 2 are lightweight true wireless earbuds with active noise cancellation, rich 3D sound, and comfortable secure fit. IPX2 water resistance and seamless connection with Galaxy devices make them ideal for daily use and workouts.",
        category: "Accessories"
    },
    {
        name: "Logitech G502 Mouse",
        price: 4999,
        image: "https://resource.logitech.com/content/dam/logitech/en/products/g502/gallery/g502-top.png",
        description: "Logitech G502 gaming mouse offers high-precision HERO 25K sensor, customizable RGB lighting, 11 programmable buttons, and adjustable weights. Designed for gamers seeking accurate performance and comfort during long sessions.",
        category: "Accessories"
    },
    {
        name: "Corsair K70 RGB Keyboard",
        price: 8999,
        image: "https://www.corsair.com/medias/sys_master/images/images/hb0/h26/8865030535934/Corsair-K70-RGB-MK2.png",
        description: "Corsair K70 RGB mechanical keyboard features Cherry MX switches, dynamic per-key RGB backlighting, durable aluminum frame, and dedicated media controls. Designed for gamers and typists seeking responsive and tactile feedback.",
        category: "Accessories"
    },
    {
        name: "Garmin Venu 2",
        price: 29999,
        image: "https://static.garmincdn.com/en/products/010-02442-10/010-02442-10-large.png",
        description: "Garmin Venu 2 is a premium GPS smartwatch with AMOLED display, health monitoring, sleep tracking, stress tracking, animated workouts, and up to 11 days battery life. Ideal for fitness enthusiasts and outdoor activities.",
        category: "Accessories"
    },
    // ---------- Electronics ----------
     {
        name: "JBL Flip 6 Speaker",
        price: 4999,
        image: "https://www.jbl.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwea1cb84a/primary/JBL_Flip_6_Product_Image.png",
        description: "JBL Flip 6 is a portable Bluetooth speaker with punchy bass, 12 hours of battery life, waterproof IPX7 rating, and robust design. Ideal for outdoor adventures, pool parties, and on-the-go music.",
        category: "Electronics"
    },
    {
        name: "Amazon Echo Dot",
        price: 4999,
        image: "https://images-na.ssl-images-amazon.com/images/I/61u0y9ADElL._AC_SL1000_.jpg",
        description: "Amazon Echo Dot is a smart speaker with Alexa voice assistant, allowing hands-free control of music, smart home devices, weather updates, reminders, and more. Compact design fits anywhere in your home.",
        category: "Electronics"
    },
    {
        name: "Canon EOS R6 Camera",
        price: 189999,
        image: "https://store.canon.com/media/catalog/product/cache/1/image/1200x1200/9df78eab33525d08d6e5fb8d27136e95/e/o/eos_r6_01.png",
        description: "Canon EOS R6 is a full-frame mirrorless camera offering 20fps continuous shooting, 4K video recording, Dual Pixel autofocus, and low-light performance for professional photography and videography.",
        category: "Electronics"
    },
    {
        name: "Nikon Z6 II",
        price: 159999,
        image: "https://cdn.mos.cms.futurecdn.net/xAHE25.png",
        description: "Nikon Z6 II is a versatile mirrorless camera with 24.5MP full-frame sensor, 4K UHD video, dual EXPEED 6 processors, and enhanced autofocus. Perfect for both professional photographers and content creators.",
        category: "Electronics"
    },
    {
        name: "Sony Alpha a7 III",
        price: 149999,
        image: "https://www.sony.com/image/alpha-a7-iii.png",
        description: "Sony Alpha a7 III is a professional full-frame mirrorless camera with 24.2MP sensor, 4K HDR video, 5-axis stabilization, and exceptional low-light performance. Ideal for photography enthusiasts and videographers.",
        category: "Electronics"
    },
    {
        name: "Kindle Paperwhite",
        price: 12999,
        image: "https://images-na.ssl-images-amazon.com/images/I/61+Jt8e6HPL._AC_SL1000_.jpg",
        description: "Kindle Paperwhite is an e-reader with 6.8-inch high-resolution display, adjustable warm light, waterproof design, and weeks of battery life. Perfect for avid readers anywhere, anytime.",
        category: "Electronics"
    },
    {
        name: "Apple iPad Air",
        price: 59999,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-10-9-select-202203?wid=470&hei=556&fmt=png-alpha&.v=1645050732342",
        description: "Apple iPad Air features a 10.9-inch Liquid Retina display, A14 Bionic chip, lightweight design, and support for Apple Pencil and Magic Keyboard. Ideal for productivity, entertainment, and creative work.",
        category: "Electronics"
    },
    {
        name: "Samsung Galaxy Tab S8",
        price: 54999,
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/galaxy-tab-s8/gallery/in-galaxy-tab-s8-5g-t970-460796-sm-t970nznainu-530437906?$720_576_PNG$",
        description: "Samsung Galaxy Tab S8 is a flagship Android tablet with 11-inch display, Snapdragon 8 Gen 1 processor, S Pen support, and long battery life. Perfect for work, gaming, and multimedia consumption.",
        category: "Electronics"
    },
    {
        name: "GoPro Hero 11",
        price: 39999,
        image: "https://gopro.com/content/dam/gopro/en/en/product-hero11-black/gallery/hero11-black.png",
        description: "GoPro Hero 11 is a rugged action camera with 5.3K video recording, HyperSmooth stabilization, waterproof design, and versatile mounting options. Ideal for capturing sports, adventure, and travel moments.",
        category: "Electronics"
    },
    {
        name: "DJI Mini 3 Pro",
        price: 75999,
        image: "https://www.dji.com/product-media/mini-3-pro/images/mini3-pro.png",
        description: "DJI Mini 3 Pro is a compact drone camera with 4K video, 48MP photos, obstacle sensing, and up to 34 minutes flight time. Lightweight and foldable, perfect for aerial photography and creative filming.",
        category: "Electronics"
    },
    {
        name: "Samsung 49-inch Curved Monitor",
        price: 89999,
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/odyssey-g9/gallery/in-odyssey-g9-lc49g95tssuxen-front.png",
        description: "Samsung 49-inch Curved Monitor provides ultra-wide 5120x1440 resolution, 240Hz refresh rate, HDR1000, and immersive gaming experience. Perfect for multitasking and professional content creation.",
        category: "Electronics"
    },
    {
        name: "Bose SoundLink Mini",
        price: 9999,
        image: "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/speakers/soundlink_mini/product_silo_images/SoundLink-Mini-II_ProductImage_1.png",
        description: "Bose SoundLink Mini is a compact portable Bluetooth speaker delivering balanced audio, deep bass, and reliable battery performance. Ideal for indoor and outdoor music playback.",
        category: "Electronics"
    },
    {
        name: "Canon EOS 90D",
        price: 94999,
        image: "https://store.canon.com/media/catalog/product/cache/1/image/1200x1200/9df78eab33525d08d6e5fb8d27136e95/e/o/eos_90d.png",
        description: "Canon EOS 90D DSLR camera offers 32.5MP sensor, 4K video, Dual Pixel autofocus, and fast continuous shooting. Perfect for photography enthusiasts and semi-professional use.",
        category: "Electronics"
    },
    {
        name: "DJI Air 2S",
        price: 129999,
        image: "https://www.dji.com/product-media/air-2s/images/air-2s.png",
        description: "DJI Air 2S drone features 1-inch CMOS sensor, 5.4K video recording, obstacle sensing, and intelligent flight modes. Compact and portable for aerial photography enthusiasts.",
        category: "Electronics"
    },
    {
        name: "Kindle Oasis",
        price: 24999,
        image: "https://images-na.ssl-images-amazon.com/images/I/61ZyO2oTnhL._AC_SL1000_.jpg",
        description: "Kindle Oasis is a premium e-reader with 7-inch high-resolution display, adaptive warm light, waterproof design, and ergonomic page-turn buttons. Ideal for serious readers.",
        category: "Electronics"
    },
    {
        name: "Samsung Odyssey G7 Monitor",
        price: 79999,
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/odyssey-g7-gallery.png",
        description: "Samsung Odyssey G7 is a curved gaming monitor with 27/32-inch QHD display, 240Hz refresh rate, 1ms response time, and NVIDIA G-SYNC support for ultra-smooth gameplay.",
        category: "Electronics"
    },
    {
        name: "Samsung 55-inch QLED TV",
        price: 79999,
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/qn55q70baafxzn/gallery/in-qled-q70b-qn55q70baafxzn-534031072?$720_576_PNG$",
        description: "Samsung 55-inch QLED 4K Smart TV delivers vibrant colors, Quantum HDR, AI upscaling, and built-in smart apps for immersive entertainment and cinematic experience.",
        category: "Electronics"
    },
    {
        name: "LG 50-inch UHD TV",
        price: 59999,
        image: "https://www.lg.com/in/images/tvs/md07505621/gallery/50UQ7500PSF_01.jpg",
        description: "LG 50-inch UHD TV features 4K resolution, HDR10 support, AI ThinQ for smart home integration, and dynamic color enhancement for an immersive viewing experience.",
        category: "Electronics"
    },
    {
        name: "Sony Bravia 65-inch TV",
        price: 124999,
        image: "https://www.sony.com/image/65x85j-65inch-bravia-tv.jpg",
        description: "Sony Bravia 65-inch 4K Smart TV with HDR, X1 processor, and Triluminos Pro technology delivers stunning picture quality and lifelike colors for home entertainment.",
        category: "Electronics"
    },
    {
        name: "TCL 55-inch LED TV",
        price: 45999,
        image: "https://www.tcl.com/global/en/images/product/55p735.png",
        description: "TCL 55-inch LED TV features 4K UHD resolution, Dolby Vision, HDR10+, and Roku smart TV platform for seamless streaming and entertainment.",
        category: "Electronics"
    },
    {
        name: "Panasonic 43-inch LED TV",
        price: 34999,
        image: "https://www.panasonic.com/content/dam/Panasonic/Panasonic-Products/TVs/43HX600-43-inch-TV.png",
        description: "Panasonic 43-inch LED TV with Full HD resolution, HDR support, and versatile connectivity options, offering great performance for daily viewing.",
        category: "Electronics"
    },
    {
        name: "Bose SoundLink Revolve",
        price: 19999,
        image: "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/speakers/soundlink_revolve/product_silo_images/soundlink_revolve_primary.png",
        description: "Bose SoundLink Revolve is a portable Bluetooth speaker with 360° sound, deep bass, water-resistant design, and up to 12 hours of playtime. Perfect for parties and outdoor use.",
        category: "Electronics"
    },
    {
        name: "JBL Charge 5",
        price: 14999,
        image: "https://www.jbl.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw374e3b9c/primary/JBL_Charge5_Product_Image.png",
        description: "JBL Charge 5 is a waterproof Bluetooth speaker with powerful sound, up to 20 hours of playtime, and USB charging for devices. Great for outdoor adventures and poolside music.",
        category: "Electronics"
    },
    {
        name: "Sony SRS-XB43",
        price: 15999,
        image: "https://www.sony.com/image/srs-xb43-portable-speaker.png",
        description: "Sony SRS-XB43 Extra Bass portable speaker delivers deep bass, high-power audio, waterproof and dustproof design, and up to 24 hours battery life for extended outdoor use.",
        category: "Electronics"
    },
    {
        name: "Marshall Emberton",
        price: 12999,
        image: "https://www.marshallheadphones.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw7bfa5b8c/primary/Emberton_Black.png",
        description: "Marshall Emberton is a compact Bluetooth speaker with classic Marshall design, rich multi-directional sound, waterproof IPX7 rating, and up to 20 hours of portable playtime.",
        category: "Electronics"
    },
    {
        name: "Ultimate Ears Boom 3",
        price: 13999,
        image: "https://www.ultimateears.com/content/dam/ultimate-ears/images/products/boom3/boom3_black.png",
        description: "Ultimate Ears Boom 3 is a 360° waterproof Bluetooth speaker with deep bass, durable design, 15-hour battery life, and outdoor-ready sound quality. Ideal for adventures and pool parties.",
        category: "Electronics"
    },
    {
        name: "Canon EOS 200D",
        price: 44999,
        image: "https://store.canon.in/media/catalog/product/cache/1/image/1200x1200/9df78eab33525d08d6e5fb8d27136e95/e/o/eos_200d.png",
        description: "Canon EOS 200D DSLR camera for beginners with 24.1MP sensor, 1080p video, and easy-to-use interface. Lightweight and portable, perfect for learning photography.",
        category: "Electronics"
    },
    {
        name: "Nikon D5600",
        price: 49999,
        image: "https://www.nikon.com/content/dam/nikon/product/dslr/D5600/D5600_body.png",
        description: "Nikon D5600 DSLR camera features 24.2MP sensor, full HD video recording, vari-angle touchscreen, and Bluetooth/Wi-Fi connectivity. Ideal for beginners and hobbyist photographers.",
        category: "Electronics"
    },
    {
        name: "Sony Alpha a6400",
        price: 79999,
        image: "https://www.sony.com/image/a6400-camera.png",
        description: "Sony Alpha a6400 mirrorless camera with 24.2MP APS-C sensor, real-time Eye autofocus, 4K video recording, and compact body. Perfect for photography enthusiasts and content creators.",
        category: "Electronics"
    },
    {
        name: "GoPro Hero 10 Black",
        price: 49999,
        image: "https://gopro.com/content/dam/gopro/en/en/product-hero10-black/gallery/hero10-black.png",
        description: "GoPro Hero 10 Black is an action camera with 5.3K video, HyperSmooth 4.0 stabilization, waterproof design, and enhanced low-light performance. Ideal for sports, adventure, and travel filming.",
        category: "Electronics"
    },
    {
        name: "DJI Osmo Pocket",
        price: 39999,
        image: "https://www.dji.com/product-media/osmo-pocket/images/osmo-pocket.png",
        description: "DJI Osmo Pocket is a compact handheld camera with 4K video, 3-axis gimbal stabilization, and intelligent shooting modes. Perfect for travel, vlogs, and smooth cinematic shots.",
        category: "Electronics"
    },


    // ---------- Consoles ----------
    {
        name: "Sony PlayStation 5",
        price: 49999,
        image: "https://www.playstation.com/content/dam/global/ps5/console/ps5-console.png",
        description: "Sony PlayStation 5 is a next-gen gaming console with ultra-fast SSD, 4K gaming, ray tracing support, and immersive DualSense controller haptics. Ideal for hardcore gamers seeking cutting-edge performance.",
        category: "Console"
    },
    {
        name: "Xbox Series X",
        price: 49999,
        image: "https://compass-ssl.xbox.com/assets/0f/5b/0f5bffb8-cac4-4f47-b8ea-464df858ebd8.png?n=Xbox-Series-X-Hero-0.png",
        description: "Xbox Series X is a next-gen console featuring 12 teraflops GPU, 4K resolution, fast load times, and backward compatibility. Perfect for gamers looking for high-end performance and extensive game library.",
        category: "Console"
    },
    {
        name: "Nintendo Switch",
        price: 29999,
        image: "https://www.nintendo.com/content/dam/noa/en_US/hardware/switch/nintendo-switch-oled/model-select.png",
        description: "Nintendo Switch is a versatile portable gaming console that transforms between handheld and docked modes. Offers a wide variety of exclusive games and family-friendly entertainment.",
        category: "Console"
    },
    {
        name: "PlayStation 4 Slim",
        price: 24999,
        image: "https://www.playstation.com/content/dam/global/ps4/console/ps4-slim.png",
        description: "PlayStation 4 Slim is a compact previous-gen PlayStation console with full HD gaming, extensive game library, and online multiplayer capabilities. Ideal for casual and dedicated gamers.",
        category: "Console"
    },
    {
        name: "Xbox Series S",
        price: 34999,
        image: "https://compass-ssl.xbox.com/assets/f5/4b/f54bffb8-xbox-series-s.png",
        description: "Xbox Series S is a compact next-gen console offering 1440p gaming, fast load speeds, and full access to Game Pass library. Perfect for budget-conscious gamers seeking next-gen features.",
        category: "Console"
    },
    {
        name: "Nintendo Switch Lite",
        price: 19999,
        image: "https://www.nintendo.com/content/dam/noa/en_US/hardware/switch/nintendo-switch-lite/model-select.png",
        description: "Nintendo Switch Lite is a handheld-only portable console with a lightweight design, ideal for gaming on the go. Supports most Switch games and perfect for travel or casual gaming.",
        category: "Console"
    },
    
    // ---------- Fashion ----------
    { name: "Men's Leather Jacket", price: 7999, image: "https://cdn.pixabay.com/photo/2017/08/07/08/20/jacket-2600630_1280.jpg", description: "Premium genuine leather jacket with durable stitching and a stylish fit, perfect for casual and semi-formal occasions.", category: "Fashion" },
    { name: "Women's Denim Jacket", price: 4999, image: "https://cdn.pixabay.com/photo/2016/11/18/12/44/jacket-1839991_1280.jpg", description: "Classic denim jacket with comfortable fit and trendy look, ideal for layering in casual outfits.", category: "Fashion" },
    { name: "Men's Running Shoes", price: 3999, image: "https://cdn.pixabay.com/photo/2016/11/19/14/00/shoes-1838594_1280.jpg", description: "Lightweight and breathable running shoes with cushioned soles for maximum comfort during workouts or daily runs.", category: "Fashion" },
    { name: "Women's Sneakers", price: 3499, image: "https://cdn.pixabay.com/photo/2016/11/18/14/20/shoes-1839894_1280.jpg", description: "Fashionable and versatile sneakers with soft soles, suitable for casual wear and light sports activities.", category: "Fashion" },
    { name: "Men's Formal Shirt", price: 1999, image: "https://cdn.pixabay.com/photo/2016/03/27/21/40/shirt-1281580_1280.jpg", description: "Elegant cotton formal shirt with tailored fit, perfect for office wear and formal occasions.", category: "Fashion" },
    { name: "Women's Summer Dress", price: 2999, image: "https://cdn.pixabay.com/photo/2016/03/27/21/51/dress-1281588_1280.jpg", description: "Lightweight and breathable summer dress with stylish patterns, ideal for casual outings or vacations.", category: "Fashion" },
    { name: "Unisex Sunglasses", price: 1499, image: "https://cdn.pixabay.com/photo/2014/11/11/10/45/sunglasses-524237_1280.jpg", description: "UV-protected sunglasses with sleek design, suitable for all genders and everyday use.", category: "Fashion" },
    { name: "Leather Belt", price: 999, image: "https://cdn.pixabay.com/photo/2016/11/22/19/06/belt-1853915_1280.jpg", description: "Genuine leather belt with durable buckle, perfect to complement formal and casual attire.", category: "Fashion" },
    { name: "Wristwatch Men", price: 4999, image: "https://cdn.pixabay.com/photo/2016/11/29/10/07/watch-1866405_1280.jpg", description: "Elegant wristwatch with classic design, water-resistant and suitable for daily wear.", category: "Fashion" },
    { name: "Wristwatch Women", price: 4499, image: "https://cdn.pixabay.com/photo/2015/11/19/21/03/watch-1059730_1280.jpg", description: "Stylish wristwatch with a sleek design and durable strap, perfect for casual and office wear.", category: "Fashion" },
    { name: "Men's Hoodie", price: 1999, image: "https://cdn.pixabay.com/photo/2015/12/01/20/28/man-1078880_1280.jpg", description: "Comfortable hoodie with soft fabric, perfect for casual wear and chilly weather.", category: "Fashion" },
    { name: "Women's Hoodie", price: 1999, image: "https://cdn.pixabay.com/photo/2016/11/21/15/59/woman-1846715_1280.jpg", description: "Cozy hoodie with relaxed fit and soft interior, ideal for lounging or casual outings.", category: "Fashion" },
    { name: "Men's T-Shirt", price: 999, image: "https://cdn.pixabay.com/photo/2016/03/27/21/42/tshirt-1281582_1280.jpg", description: "Casual cotton t-shirt with comfortable fit, perfect for everyday wear.", category: "Fashion" },
    { name: "Women's T-Shirt", price: 999, image: "https://cdn.pixabay.com/photo/2016/03/27/21/53/tshirt-1281589_1280.jpg", description: "Soft and breathable t-shirt with modern fit, ideal for casual outfits.", category: "Fashion" },
    { name: "Men's Jeans", price: 2499, image: "https://cdn.pixabay.com/photo/2014/12/16/22/25/jeans-570356_1280.jpg", description: "Slim-fit denim jeans with durable stitching, suitable for casual and semi-formal wear.", category: "Fashion" },
    { name: "Women's Jeans", price: 2499, image: "https://cdn.pixabay.com/photo/2017/08/06/15/48/jeans-2598853_1280.jpg", description: "Trendy slim-fit jeans with comfortable stretch, perfect for everyday wear.", category: "Fashion" },
    { name: "Men's Casual Shirt", price: 1499, image: "https://cdn.pixabay.com/photo/2016/03/27/21/47/shirt-1281585_1280.jpg", description: "Everyday casual shirt with lightweight fabric and relaxed fit.", category: "Fashion" },
    { name: "Women's Blouse", price: 1299, image: "https://cdn.pixabay.com/photo/2017/03/27/14/20/blouse-2175717_1280.jpg", description: "Elegant blouse with soft fabric and flattering fit, ideal for office or casual wear.", category: "Fashion" },
    { name: "Men's Shorts", price: 999, image: "https://cdn.pixabay.com/photo/2016/03/27/21/44/shorts-1281583_1280.jpg", description: "Comfortable casual shorts with breathable fabric, perfect for summer.", category: "Fashion" },
    { name: "Women's Skirt", price: 1299, image: "https://cdn.pixabay.com/photo/2016/03/27/21/49/skirt-1281587_1280.jpg", description: "Lightweight casual skirt with stylish design, ideal for daily wear.", category: "Fashion" },
    { name: "Nike Air Max 270", price: 11999, image: "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/air-max-270-shoe.png", description: "Comfortable sports shoes with Air Max cushioning for superior comfort and style.", category: "Fashion" },
    { name: "Adidas Ultraboost", price: 13999, image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/Ultraboost_21_Shoes_Black.png", description: "High-performance running shoes with responsive cushioning, ideal for athletes and daily runs.", category: "Fashion" },
    { name: "Puma RS-X Sneakers", price: 8999, image: "https://in.puma.com/media/catalog/product/p/u/puma-rs-x.png", description: "Stylish casual sneakers with comfortable sole, perfect for streetwear or sports.", category: "Fashion" },
    { name: "Reebok Classic Leather", price: 7999, image: "https://assets.reebok.com/images/w_600,f_auto,q_auto/classic-leather.png", description: "Timeless leather sneakers with cushioned sole, perfect for casual wear.", category: "Fashion" },
    { name: "Converse Chuck Taylor All Star", price: 6999, image: "https://www.converse.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw64de3abc/primary/ChuckTaylor_AllStar.png", description: "Iconic canvas sneakers with classic high-top design, perfect for everyday wear.", category: "Fashion" },
    { name: "Fossil Men's Chronograph", price: 8999, image: "https://www.fossil.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw12345678/primary/FS5151_1.png", description: "Stylish chronograph wristwatch with multiple dials and leather strap, ideal for formal or casual outfits.", category: "Fashion" },
    { name: "Titan Women's Analog Watch", price: 4999, image: "https://www.titan.co.in/women-analog-watch.png", description: "Elegant analog watch with minimalist design and durable strap, perfect for daily wear.", category: "Fashion" },
    { name: "Casio G-Shock", price: 6999, image: "https://www.casio.com/content/dam/casio/product/images/G-Shock.png", description: "Rugged sports watch with shock resistance, water resistance, and multiple functions.", category: "Fashion" },
    { name: "Daniel Wellington Classic", price: 7999, image: "https://www.danielwellington.com/images/classic-watch.png", description: "Minimalist wristwatch with leather strap, perfect for formal and casual styling.", category: "Fashion" },
    { name: "Apple Watch Series 9", price: 39999, image: "https://www.apple.com/newsroom/images/product/watch/standard/apple_watch_series9_product_091223.jpg.og.jpg?202309230901", description: "Smartwatch with advanced fitness tracking, heart rate monitoring, and customizable watch faces.", category: "Fashion" },
    { name: "Levi's 501 Jeans", price: 3999, image: "https://www.levi.com/501-jeans.png", description: "Classic straight-fit jeans with durable denim and authentic Levi's style.", category: "Fashion" },
    { name: "H&M Men's T-Shirt", price: 799, image: "https://www2.hm.com/content/dam/men-tshirt.png", description: "Soft cotton t-shirt with casual fit, perfect for everyday wear.", category: "Fashion" },
    { name: "Zara Women's Dress", price: 2999, image: "https://www.zara.com/women-dress.png", description: "Elegant summer dress with lightweight fabric and stylish cut, ideal for casual and semi-formal occasions.", category: "Fashion" },
    { name: "Polo Ralph Lauren Shirt", price: 4999, image: "https://www.ralphlauren.com/men-shirt.png", description: "Formal men's shirt with premium cotton fabric and tailored fit.", category: "Fashion" },
    { name: "Uniqlo Women's Hoodie", price: 1999, image: "https://www.uniqlo.com/women-hoodie.png", description: "Comfortable hoodie with soft fabric and casual fit, ideal for lounging or daily wear.", category: "Fashion" },
    { name: "Ray-Ban Aviator Sunglasses", price: 9999, image: "https://www.ray-ban.com/aviator-sunglasses.png", description: "Classic aviator sunglasses with UV protection and iconic metal frame.", category: "Fashion" },
    { name: "Adidas Cap", price: 799, image: "https://www.adidas.com/men-cap.png", description: "Casual cotton baseball cap with adjustable strap, perfect for outdoor wear.", category: "Fashion" },
    { name: "Gucci Leather Belt", price: 14999, image: "https://www.gucci.com/leather-belt.png", description: "Luxury leather belt with iconic buckle design, suitable for premium fashion styling.", category: "Fashion" },
    { name: "Puma Backpack", price: 3999, image: "https://www.puma.com/backpack.png", description: "Stylish and durable sports backpack with multiple compartments for daily essentials.", category: "Fashion" },
    { name: "Herschel Wallet", price: 1999, image: "https://www.herschel.com/wallet.png", description: "Compact and durable wallet with multiple slots for cards and cash.", category: "Fashion" },

// ---------- Groceries ----------
    { name: "Organic Apples - 1kg", price: 299, image: "https://cdn.pixabay.com/photo/2016/09/08/19/45/apples-1657015_1280.jpg", description: "Fresh and juicy organic apples, naturally grown without pesticides.", category: "Groceries" },
    { name: "Bananas - 1 Dozen", price: 99, image: "https://cdn.pixabay.com/photo/2014/12/21/23/28/bananas-577431_1280.jpg", description: "Sweet and ripe bananas, perfect for snacking or smoothies.", category: "Groceries" },
    { name: "Brown Bread", price: 49, image: "https://cdn.pixabay.com/photo/2016/11/18/16/29/bread-1839910_1280.jpg", description: "Whole wheat brown bread, soft texture and high in fiber.", category: "Groceries" },
    { name: "Eggs - 12 pcs", price: 79, image: "https://cdn.pixabay.com/photo/2016/03/27/21/33/egg-1281577_1280.jpg", description: "Fresh farm eggs with rich yolk, ideal for daily consumption.", category: "Groceries" },
    { name: "Rice - 5kg", price: 399, image: "https://cdn.pixabay.com/photo/2017/01/20/00/30/rice-1995098_1280.jpg", description: "Premium quality rice, fluffy and aromatic after cooking.", category: "Groceries" },
    { name: "Cooking Oil - 1L", price: 179, image: "https://cdn.pixabay.com/photo/2017/06/27/19/45/olive-oil-2447860_1280.jpg", description: "Pure and healthy cooking oil, ideal for frying and cooking.", category: "Groceries" },
    { name: "Sugar - 1kg", price: 49, image: "https://cdn.pixabay.com/photo/2017/06/12/14/34/sugar-2391798_1280.jpg", description: "Refined white sugar, perfect for beverages and baking.", category: "Groceries" },
    { name: "Salt - 1kg", price: 39, image: "https://cdn.pixabay.com/photo/2016/11/22/19/20/salt-1853918_1280.jpg", description: "Pure mineral salt, ideal for cooking and seasoning.", category: "Groceries" },
    { name: "Tea Leaves - 500g", price: 199, image: "https://cdn.pixabay.com/photo/2015/01/21/14/14/tea-606504_1280.jpg", description: "Premium quality tea leaves with rich aroma and flavor.", category: "Groceries" }

];

const importData = async () => {
    try {
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log(`✅ Inserted ${products.length} products with fast-loading CDN images!`);
        await mongoose.connection.close();
        process.exit();
    } catch (error) {
        console.error('❌ Error inserting products:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
};

importData();
