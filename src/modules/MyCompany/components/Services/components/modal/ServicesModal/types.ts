interface IServicesModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  actionType?: 'edit' | 'create';
  serviceId?: number;
}

export type { IServicesModalProps };
