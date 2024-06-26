
//#region PokemonCardModel
export interface PokemonCard {
  count: number,
  data: PokemonCardData[],
  page: number,
  pageSize: number,
  totalCount: number
}

export interface PokemonCardData {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  level?: string;
  hp: string;
  types: string[];
  evolvesFrom?: string;
  evolvesTo?: string[];
  rules?: string[];
  attacks: Attack[];
  abilities: Abilities[]
  weaknesses: Weakness[];
  resistances: Resistances[];
  retreatCost: string[];
  convertedRetreatCost: number;
  set: Set;
  number: string;
  artist: string;
  rarity: string;
  flavorText?: string;
  nationalPokedexNumbers: number[];
  legalities: {
    unlimited: string;
    expanded?: string;
  };
  images: Image;
  tcgplayer: TcgPlayer;
  cardmarket: CardMarket;
}

interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

interface Abilities {
  name: string;
  text: string;
  type: string;
}

interface Weakness {
  type: string;
  value: string;
}

interface Resistances {
  type: string;
  value: number;
}

interface Set {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: {
    unlimited: string;
    expanded?: string;
  };
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: {
    symbol: string;
    logo: string;
  };
}

interface Image {
  small: string;
  large: string;
}

interface PriceDetails {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow?: number;
}

interface Prices {
  holofoil?: PriceDetails;
  reverseHolofoil?: PriceDetails;
  normal?: PriceDetails;
}

interface TcgPlayer {
  url: string;
  updatedAt: string;
  prices: Prices;
}

interface CardMarket {
  url: string;
  updatedAt: string;
  prices: {
    averageSellPrice: number;
    lowPrice: number;
    trendPrice: number;
    germanProLow: number;
    suggestedPrice: number;
    reverseHoloSell: number;
    reverseHoloLow: number;
    reverseHoloTrend: number;
    lowPriceExPlus: number;
    avg1: number;
    avg7: number;
    avg30: number;
    reverseHoloAvg1: number;
    reverseHoloAvg7: number;
    reverseHoloAvg30: number;
  };
}
//#endregion

export interface PokemonCardInfo {
  data: PokemonCardData
}

//#region PokemonSetModel


export interface PokemonSet {
  data: CardSet[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

interface CardSet {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: {
    unlimited: string;
  };
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: {
    symbol: string;
    logo: string;
  };
}


export interface PokemonSearchedSet {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: {
    logo: string;
    symbol: string;
  };
  legalities: {
    unlimited: string;
  };
}
//endregion