interface IReviewCard {
  id: number;
  name: string;
  date: string;
  type: string;
  totalGrade: number;
  qualityGrade: number;
  materialsGrade: number;
  priceGrade: number;
  experienceGrade: number;
  deadlinesGrade: number;
  communicationGrade: number;
  dignityText: string;
  flaws: string;
  reviewText: string;
  images: string[];
}

interface IStatistics {
  totalGrade: number;
  totalCount: number;
  qualityGrade: number;
  materialsGrade: number;
  priceGrade: number;
  experienceGrade: number;
  deadlinesGrade: number;
  communicationGrade: number;
}

interface ITags {
  data: {
    id: number;
    name: string;
  }[];
  activeTag: string;
  setActiveTag: (tag: string) => void;
}

export type { IReviewCard, IStatistics, ITags };
