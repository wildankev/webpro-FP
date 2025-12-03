export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  desc: string;
}

export interface CartItem extends Product {
  qty: number;
}

export const PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: "ITS Hoodie Navy", 
    category: "Apparel", 
    price: 185000, 
    stock: 50, 
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80", 
    desc: "Bahan Cotton Fleece premium, nyaman dipakai sehari-hari dengan bordir logo ITS eksklusif." 
  },
  { 
    id: 2, 
    name: "Tumbler Smart LED", 
    category: "Accessories", 
    price: 85000, 
    stock: 100, 
    image: "https://images.unsplash.com/photo-1602143407151-0111419500be?w=800&q=80", 
    desc: "Tumbler stainless steel dengan indikator suhu LED. Tahan panas/dingin hingga 12 jam." 
  },
  { 
    id: 3, 
    name: "Kaos Teknik Informatika", 
    category: "Apparel", 
    price: 95000, 
    stock: 75, 
    image: "https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?w=800&q=80", 
    desc: "Cotton Combed 30s. Desain minimalis 'Code Sleep Repeat' khas anak IT." 
  },
  { 
    id: 4, 
    name: "Sticker Pack Vivan", 
    category: "Stationery", 
    price: 15000, 
    stock: 200, 
    image: "https://images.unsplash.com/photo-1572375992501-4f9f6ca7fc29?w=800&q=80", 
    desc: "Paket stiker vinyl tahan air dengan berbagai maskot dan slogan kampus." 
  },
  { 
    id: 5, 
    name: "Lanyard ITS Official", 
    category: "Accessories", 
    price: 25000, 
    stock: 150, 
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80", 
    desc: "Tali ID Card bahan tisu lembut, print 2 sisi. Wajib punya untuk maba." 
  },
  { 
    id: 6, 
    name: "Varsity Jacket Pride", 
    category: "Apparel", 
    price: 250000, 
    stock: 20, 
    image: "https://images.unsplash.com/photo-1559563458-52c485da6509?w=800&q=80", 
    desc: "Jaket Varsity gaya amerika dengan inisial fakultas. Limited Edition." 
  },
  { 
    id: 7, 
    name: "Tote Bag Canvas", 
    category: "Bags", 
    price: 45000, 
    stock: 60, 
    image: "https://images.unsplash.com/photo-1597484662317-9bd7bd12a018?w=800&q=80", 
    desc: "Tas kanvas tebal muat laptop 14 inch. Cocok untuk ngampus santai." 
  },
  { 
    id: 8, 
    name: "Notebook Hardcover", 
    category: "Stationery", 
    price: 35000, 
    stock: 80, 
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80", 
    desc: "Buku catatan hardcover dengan kertas bookpaper cream yang enak buat nulis." 
  }
];
