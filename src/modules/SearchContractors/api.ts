import { useQuery } from '@tanstack/react-query';

import ApiTags from '@common/api/services/apiTags';
import { ContractorsServices, IRibbonContractorQuery } from '@common/api/services/contractor';

const useRibbonContractor = (params: IRibbonContractorQuery) => {
  console.log(params);
  return useQuery({
    queryKey: [ApiTags.GET_CONTRACTOR_RIBBON],
    queryFn: async () => ContractorsServices.getRibbonContractors(params),
  });
};

export { useRibbonContractor };
