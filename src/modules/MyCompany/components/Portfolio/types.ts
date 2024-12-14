import { IContractorPortfolio } from '@common/api/services/contractor';

interface IPortfolioProps {
  data?: IContractorPortfolio[];
  loading: boolean;
}

export type { IPortfolioProps };
