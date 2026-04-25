export interface CarModel {
  id: string;
  name: string;
  tagline: string;
  basePrice: number;
  sequenceFolder: string;
  sequencePrefix: string;
  totalFrames: number;
  coverImage: string;
}

export const CAR_MODELS: CarModel[] = [
  {
    id: 'jesko',
    name: 'Koenigsegg Jesko',
    tagline: 'The Ultimate Mega Car',
    basePrice: 3000000,
    sequenceFolder: '/images/jesko-sequence',
    sequencePrefix: '',
    totalFrames: 240,
    coverImage: '/images/jesko-sequence/1.jpg'
  },
  {
    id: 'ccxr-trevita',
    name: 'Koenigsegg CCXR Trevita',
    tagline: 'A Diamond on Wheels',
    basePrice: 4800000,
    sequenceFolder: '/images/trevita-sequence',
    sequencePrefix: 'ezgif-frame-',
    totalFrames: 240,
    coverImage: '/images/trevita-sequence/ezgif-frame-001.jpg'
  },
  {
    id: 'ccr',
    name: 'Koenigsegg CCR',
    tagline: 'The Record Breaker',
    basePrice: 1500000,
    sequenceFolder: '/images/ccr-sequence',
    sequencePrefix: 'ezgif-frame-',
    totalFrames: 240,
    coverImage: '/images/ccr-sequence/ezgif-frame-001.jpg'
  },
  {
    id: 'cc8s',
    name: 'Koenigsegg CC8S',
    tagline: 'The Genesis',
    basePrice: 1200000,
    sequenceFolder: '/images/cc8s-sequence',
    sequencePrefix: 'ezgif-frame-',
    totalFrames: 240,
    coverImage: '/images/cc8s-sequence/ezgif-frame-001.jpg'
  },
  {
    id: 'gemera',
    name: 'Koenigsegg Gemera',
    tagline: 'The Ultimate Grand Tourer',
    basePrice: 1700000,
    sequenceFolder: '/images/gemera-sequence',
    sequencePrefix: 'ezgif-frame-',
    totalFrames: 240,
    coverImage: '/images/gemera-sequence/ezgif-frame-001.jpg'
  }
];

export const getCarById = (id: string) => {
  return CAR_MODELS.find(c => c.id === id) || CAR_MODELS[0];
};
