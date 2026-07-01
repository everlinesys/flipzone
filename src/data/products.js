const products = [
  {
    id: 101,

    // ---------- BASIC ----------
    slug: "olive-linen-casual-outfit",
    brand: "Urban Loom",
    title:
      "Urban Loom Premium Olive Green Linen Shirt with White Linen Trousers & Genuine Leather Sandals Combo",
    shortTitle: "Olive Linen Outfit Set",

    category: "Fashion",
    subCategory: "Men's Clothing",

    sku: "UL-OLS-101",

    // ---------- IMAGES ----------
    images: ["/products/fashion/img1.png", "/products/fashion/img2.png"],

    thumbnail: "/products/fashion/olive-linen-set/thumb.webp",

    // ---------- PRICING ----------
    price: 1999,
    originalPrice: 4999,
    currency: "₹",

    // ---------- RATING ----------
    rating: 4.7,
    ratings: 28641,
    reviews: 4128,

    // ---------- STATUS ----------
    stock: 86,

    badge: "Best Seller",

    delivery: "Free Delivery Tomorrow",

    warranty: "No Warranty",

    replacement: "7 Days Easy Return",

    seller: "Dopcart Fashion",

    assured: true,

    // ---------- DESCRIPTION ----------
    description:
      "A premium summer-ready outfit featuring an olive green breathable linen shirt paired with elegant white linen trousers and genuine leather buckle sandals. Designed for effortless style, vacations, brunches, office casuals, and weekend outings.",

    // ---------- HIGHLIGHTS ----------
    highlights: [
      "Premium 100% Linen Shirt",
      "Regular Comfort Fit",
      "Soft Breathable Fabric",
      "Wrinkle Resistant Finish",
      "Lightweight Summer Wear",
      "Matching White Linen Trousers",
      "Premium Leather Buckle Sandals",
      "Ideal for Casual & Resort Wear",
    ],

    // ---------- SPECIFICATIONS ----------
    specifications: {
      Brand: "Urban Loom",
      Model: "UL Summer Collection 2026",
      ShirtColor: "Olive Green",
      TrouserColor: "White",
      SandalColor: "Dark Brown",
      ShirtMaterial: "100% Linen",
      TrouserMaterial: "Linen Blend",
      SandalMaterial: "Genuine Leather",
      Sleeve: "Full Sleeve",
      Collar: "Spread Collar",
      Pattern: "Solid",
      Fit: "Regular Fit",
      Occasion: "Casual, Resort, Vacation",
      WashCare: "Machine Wash",
      CountryOfOrigin: "India",
    },

    // ---------- OFFERS ----------
    offers: [
      "10% Instant Discount on HDFC Credit Cards",
      "Extra ₹500 Off on Fashion Orders Above ₹2999",
      "Buy 2 Fashion Products & Save ₹700",
      "5% Cashback Using DopPay",
      "No Cost EMI Available",
    ],

    // ---------- TAGS ----------
    tags: [
      "Trending",
      "Summer Collection",
      "Premium",
      "Men's Fashion",
      "Linen",
      "Resort Wear",
      "Best Seller",
    ],
  },
  {
    id: 102,

    // ---------- BASIC ----------
    slug: "iphone-18-pro",
    brand: "Apple",
    title:
      "Apple iPhone 18 Pro (Burgundy, 256 GB) with A20 Pro Chip, Triple 48MP Camera System & Apple Intelligence",
    shortTitle: "iPhone 18 Pro",

    category: "Electronics",
    subCategory: "Mobiles",

    sku: "APL-IP18P-256",

    // ---------- IMAGES ----------
    images: [
      "/products/apple/iphone18-1.png",
      "/products/apple/iphone18-2.png",
    ],

    thumbnail: "/products/apple/iphone18pro/thumb.webp",

    // ---------- PRICING ----------
    price: 129999,
    originalPrice: 139900,
    currency: "₹",

    // ---------- RATING ----------
    rating: 4.8,
    ratings: 24891,
    reviews: 3562,

    // ---------- STATUS ----------
    stock: 18,

    badge: "New Launch",

    delivery: "Free Delivery Tomorrow",

    warranty: "1 Year Apple Warranty",

    replacement: "7 Days Replacement",

    seller: "Apple Authorized Store",

    assured: true,

    // ---------- DESCRIPTION ----------
    description:
      "Experience the next generation of iPhone with the A20 Pro chip, Apple Intelligence, advanced triple-camera system, ProMotion OLED display, and all-day battery life. Designed for creators, professionals, and power users.",

    // ---------- VARIANTS ----------
    colors: [
      {
        name: "Burgundy",
        code: "#5A1F26",
        image: "/products/apple/iphone18pro/colors/burgundy.webp",
      },
      {
        name: "Coffee",
        code: "#8A6648",
        image: "/products/apple/iphone18pro/colors/coffee.webp",
      },
      {
        name: "Purple",
        code: "#5B437A",
        image: "/products/apple/iphone18pro/colors/purple.webp",
      },
    ],

    storageOptions: ["128 GB", "256 GB", "512 GB", "1 TB"],

    ram: "12 GB",

    // ---------- HIGHLIGHTS ----------
    highlights: [
      '6.9" Super Retina XDR OLED Display',
      "120Hz ProMotion Refresh Rate",
      "A20 Pro Processor",
      "48MP Triple Camera System",
      "8K Dolby Vision Video Recording",
      "Apple Intelligence Ready",
      "Titanium Frame",
      "Face ID",
      "USB-C Fast Charging",
      "IP68 Water Resistant",
    ],

    // ---------- SPECIFICATIONS ----------
    specifications: {
      Brand: "Apple",
      Model: "iPhone 18 Pro",
      Processor: "Apple A20 Pro",
      Display: "6.9-inch Super Retina XDR OLED",
      RefreshRate: "120Hz",
      Resolution: "2868 × 1320",
      RearCamera: "48MP + 48MP + 12MP",
      FrontCamera: "12MP TrueDepth",
      RAM: "12 GB",
      Storage: "256 GB",
      Battery: "Approx. 4800 mAh",
      Charging: "USB-C Fast Charging",
      OperatingSystem: "iOS 20",
      Security: "Face ID",
      WaterResistance: "IP68",
      Warranty: "1 Year Manufacturer Warranty",
      CountryOfOrigin: "India",
    },

    // ---------- OFFERS ----------
    offers: [
      "₹5,000 Instant Discount on HDFC Credit Cards",
      "Up to ₹65,000 Exchange Bonus",
      "No Cost EMI up to 24 Months",
      "5% Cashback with DopPay Card",
      "Free AppleCare+ for 3 Months",
    ],

    // ---------- TAGS ----------
    tags: [
      "Apple",
      "New Launch",
      "5G",
      "Flagship",
      "Premium",
      "Best Seller",
      "Camera Phone",
      "AI Phone",
    ],
  },
];

export default products;
