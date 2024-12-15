interface IReviewModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  actionType: 'edit' | 'create';
  reviewId?: number;
  contractorId?: number;
}

export type { IReviewModalProps };
