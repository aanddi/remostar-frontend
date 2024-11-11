interface IRibbonContractorResponse {
  found: number;
  page: number;
  pages: number;
  page_per: number;
  items: IRibbonContractorItem[];
}

interface IRibbonContractorQuery {
  page: number;
  perPage: number;
  region: string;
  type?: string;
  veryfi?: string;
  tags?: string;
  sort?: string;
  search?: string;
}

interface IRibbonContractorItem {
  id: number;
  name: string;
  veryfi: false;
  mainCity: string;
  pathLogo: string;
  citys: string;
  typeCompany: string;
  descCompany: null;
  tags: string;
  reviewCount: number;
  gradeTotal: number;
  services: [
    {
      id: number;
      servicesName: string;
      servicesSalary: number;
    },
  ];
}

interface IPopularContractorResponse {
  id: number;
  name: string;
  veryfi: boolean;
  pathLogo: string;
  reviewCount: number;
  gradeTotal: number;
}

export type {
  IRibbonContractorResponse,
  IRibbonContractorItem,
  IRibbonContractorQuery,
  IPopularContractorResponse,
};
