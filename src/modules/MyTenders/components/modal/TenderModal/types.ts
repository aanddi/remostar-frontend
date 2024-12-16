type TypeActions = 'edit' | 'create';

interface IModalTenderProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  typeActions: TypeActions;
  tenderId?: string;
}

export type { IModalTenderProps, TypeActions };
