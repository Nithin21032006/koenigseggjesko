export interface ConfigOption {
  id: string;
  name: string;
  price: number;
  colorHex?: string;
  image?: string;
}

export const BASE_PRICE = 3000000;

export const paintOptions: ConfigOption[] = [
  { id: 'paint-white', name: 'Crystal White', price: 0, colorHex: '#FFFFFF' },
  { id: 'paint-black', name: 'Carbon Black', price: 15000, colorHex: '#111111' },
  { id: 'paint-red', name: 'Magma Red', price: 25000, colorHex: '#8B0000' },
  { id: 'paint-silver', name: 'Liquid Silver', price: 20000, colorHex: '#C0C0C0' },
  { id: 'paint-naked-carbon', name: 'Naked Carbon Fiber', price: 125000, colorHex: '#2A2A2A' }, // representing KNC (Koenigsegg Naked Carbon)
];

export const wheelOptions: ConfigOption[] = [
  { id: 'wheel-forged', name: 'Forged Aluminum Appliqué', price: 0 },
  { id: 'wheel-carbon', name: 'Aircore Carbon Wheels', price: 45000 },
  { id: 'wheel-gold', name: 'Ghost Gold Accented Forged', price: 28000 },
];

export const interiorOptions: ConfigOption[] = [
  { id: 'int-black', name: 'Alcantara Obsidian Black', price: 0, colorHex: '#1a1a1a' },
  { id: 'int-tan', name: 'Desiato Sand Leather', price: 18000, colorHex: '#d2b48c' },
  { id: 'int-red', name: 'Lava Red Alcantara', price: 22000, colorHex: '#cc0000' },
  { id: 'int-snow', name: 'Snow Leather Detail', price: 25000, colorHex: '#f0f8ff' },
];

export const packageOptions: ConfigOption[] = [
  { id: 'pkg-track', name: 'Track Aero Package', price: 110000 },
  { id: 'pkg-gold', name: '24K Gold Leaf Accents', price: 85000 },
  { id: 'pkg-luggage', name: 'Bespoke Luggage Set', price: 14000 },
];
