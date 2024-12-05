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

interface IContractorInfo {
  id: number;
  createdAt: string;
  updateAt: string;
  legalName?: string;
  name: string;
  veryfi: boolean;
  typeCompany: string;
  pathLogo?: string;
  mainCity: string;
  adress?: string;
  citys?: string;
  countEmployees: number;
  phone: string;
  email?: string;
  cite?: string;
  inn: string;
  descCompany?: string;
  tags?: string;
}

interface IContractorServices {
  id: number;
  contractorsId: number;
  servicesName: string;
  servicesDesc: string;
  servicesUnit: string;
  servicesSalary: number;
}

interface IReview {
  id: number;
  createdAt: string;
  updateAt: string;
  contractorsId: number;
  userId: string;
  typeWork: string;
  gradeTotal: number;
  gradeQuality: number;
  gradeMaterials: number;
  gradePrice: number;
  gradeExperience: number;
  gradeDeadlines: number;
  gradeCommunication: number;
  descDignity: string;
  descFlaws: string;
  descReview: string;
  images: string;
}

interface IReviewStatistics {
  gradeTotal: number;
  gradeQuality: number;
  gradeMaterials: number;
  gradePrice: number;
  gradeExperience: number;
  gradeDeadlines: number;
  gradeCommunication: number;
}

interface IContractorReviews {
  items: IReview[];
  statistics: IReviewStatistics;
}

interface IContractorPortfolio {
  id: number;
  createdAt: string;
  updateAt: string;
  contractorsId: number;
  name: string;
  type: string;
  rooms: number;
  category: string;
  footage: number;
  budget: number;
  time: string;
  desc: string;
  gallery?: string;
  author: string;
}

interface IContractorProfile {
  info: IContractorInfo;
  services: IContractorServices[];
  reviews: IContractorReviews;
  portfolio: IContractorPortfolio[];
}

export type {
  IRibbonContractorResponse,
  IRibbonContractorItem,
  IRibbonContractorQuery,
  IReview,
  IReviewStatistics,
  IContractorProfile,
  IContractorInfo,
  IContractorServices,
  IContractorReviews,
  IContractorPortfolio,
};
