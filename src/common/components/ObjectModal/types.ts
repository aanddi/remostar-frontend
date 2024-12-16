interface ICreateObjectModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  actionType?: 'edit' | 'create';
  objectId?: string;
}

export type { ICreateObjectModalProps };
