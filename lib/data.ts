export const PRODUCT = {
  brand: 'TitanGOAT',
  name: 'PRE-WORKOUT',
  variant: 'White TitanBeast',
  weight: '500 g',
  price: '1 091 Kč',
};

/* Karty složení pro sekci „Anatomie síly".
   Dávky dle zadání (plná denní dávka 32 g, resp. přepočty). */
export type Ingredient = {
  name: string;
  dose: string;
  detail?: string;
};

export const INGREDIENTS: Ingredient[] = [
  {
    name: 'L-Citrulin',
    dose: '11 g',
    detail:
      '11 g čistého L-citrulinu + 2.5 g malátu pro maximalizaci NO a vytrvalostního výkonu.',
  },
  {
    name: 'Betain',
    dose: '4.2 g',
    detail: '4.2 g pro lepší svalovou sílu a výkon.',
  },
  {
    name: 'L-Tyrosin',
    dose: '1.7 g',
    detail: '1.7 g pro odolnost proti duševní únavě a soustředění ve stresu.',
  },
  {
    name: 'Citicolin',
    dose: '550 mg',
    detail:
      'Na rozdíl od levného cholin-bitartrátu se citicolin (CDP-cholin) téměř kompletně vstřebává a proniká do mozku. Stimuluje tvorbu acetylcholinu, klinické studie ho spojují se zlepšením učení a paměti.',
  },
  {
    name: 'Rhodiola',
    dose: '550 mg',
  },
  {
    name: "Lion's Mane",
    dose: '550 mg',
  },
  {
    name: 'Kofein',
    dose: '218 mg',
  },
  {
    name: 'Elektrolyty',
    dose: 'Na⁺ + K⁺',
    detail:
      'Sůl a draslík udržují elektrolytovou rovnováhu – nápoje s Na+ dosáhly ~77 % zadrženého objemu vs 58 % s čistou vodou.',
  },
  {
    name: 'Hořčík',
    dose: '282 mg',
  },
  {
    name: 'B-vitamíny',
    dose: 'B3 · B6 · B12',
  },
];

/* Supplement facts – laboratorní protokol, dávka 16 g / 32 g. */
export type FactRow = {
  name: string;
  per16: number;
  per32: number;
  unit: 'mg' | 'mcg';
  note?: string;
};

export const FACTS: FactRow[] = [
  { name: 'L-Citrulline', per16: 6720, per32: 13440, unit: 'mg' },
  { name: 'Betaine Anhydrous', per16: 2726, per32: 5452, unit: 'mg' },
  { name: 'Malic Acid', per16: 1638, per32: 3277, unit: 'mg' },
  { name: 'L-Tyrosine', per16: 1088, per32: 2176, unit: 'mg' },
  { name: 'Rhodiola Rosea 10:1', per16: 550, per32: 1101, unit: 'mg' },
  { name: "Lion's Mane 10:1", per16: 550, per32: 1101, unit: 'mg' },
  { name: 'Sodium Chloride', per16: 550, per32: 1101, unit: 'mg' },
  { name: 'Citicoline', per16: 550, per32: 1101, unit: 'mg' },
  {
    name: 'Magnesium Bisglycinate',
    per16: 282,
    per32: 563,
    unit: 'mg',
    note: 'elemental 45.1 / 90.1 mg',
  },
  { name: 'Caffeine Anhydrous', per16: 218, per32: 435, unit: 'mg' },
  { name: 'Bacopa Extract', per16: 218, per32: 435, unit: 'mg' },
  { name: 'Pine Bark Extract 95% OPC', per16: 218, per32: 435, unit: 'mg' },
  { name: 'Vitamin B3', per16: 16.4, per32: 32.8, unit: 'mg' },
  { name: 'Vitamin B6 P5P', per16: 13.1, per32: 26.1, unit: 'mg' },
  { name: 'Vitamin B12 Methylcobalamin', per16: 196, per32: 392, unit: 'mcg' },
];

/* Claimy synchronizované se scroll-videem (progress 0–1 sticky sekce). */
export const VIDEO_CLAIMS = [
  { at: 0.2, title: '11 g L-Citrulinu', sub: 'MAX PUMP · NO BOOST' },
  { at: 0.45, title: 'Klinicky ověřené dávky', sub: 'ŽÁDNÉ PROPRIETÁRNÍ SMĚSI' },
  { at: 0.7, title: '435 mg kofeinu', sub: 'PLNÁ DÁVKA · 32 G' },
  { at: 0.9, title: 'Žádné kompromisy', sub: 'WHITE TITANBEAST' },
];
