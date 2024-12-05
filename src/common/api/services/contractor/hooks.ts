import { useQuery } from '@tanstack/react-query';

import { getContractorPortfolio } from './endpoints';

import ApiTags from '../apiTags';

const useContractorPortfolio = (id: string) => {
  return useQuery({
    queryKey: [ApiTags.GET_CONTRACTOR_PROFILE],
    queryFn: () => getContractorPortfolio(id),
  });
};

export { useContractorPortfolio };
