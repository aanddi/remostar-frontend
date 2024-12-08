interface ITendersRibbon {
  id: string;
  name: string;
  address: string;
  desc: string;
  budget: number;
  gallery: string;
  user: {
    id: string;
    name: string;
    surname: string;
    patronymic: string;
  };
}

interface IRibbonTendersResponse {
  found: number;
  page: number;
  pages: number;
  page_per: number;
  items: ITendersRibbon[];
}

interface ITender {
  id: number;
  createdAt: string;
  updateAt: string;
  userId: string;
  name: string;
  budget: number;
  address: string;
  desc: string;
  gallery: string;
  rooms: number;
  type: string;
  footage: number;
  squareKitchen: number;
  squareLived: number;
  floor: string;
  finishing: string;
  user: {
    id: string;
    name: string;
    surname: string;
    patronymic: string;
  };
}

interface ITenderActions {
  name: string;
  budget: number;
  address: string;
  desc: string;
  gallery: string;
  rooms: number;
  type: string;
  footage: number;
  squareKitchen: number;
  squareLived: number;
  floor: string;
  finishing: string;
}

export type { ITendersRibbon, IRibbonTendersResponse, ITender, ITenderActions };
