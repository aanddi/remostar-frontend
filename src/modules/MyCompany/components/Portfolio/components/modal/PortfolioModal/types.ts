interface IPortfolioModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  actionType?: 'edit' | 'create';
  portfolioId?: number;
}

export type { IPortfolioModalProps };
