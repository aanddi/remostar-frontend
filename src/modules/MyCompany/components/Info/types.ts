import { IResponseContractorInfo } from '@common/api/services/contractor';

interface IInfoProps {
  contractorId: string;
  info?: IResponseContractorInfo;
  loading: boolean;
}

export type { IInfoProps };
