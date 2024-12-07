import { useQuery } from '@tanstack/react-query';

import { getTenderById, getTenders } from './endpoints';

import ApiTags from '../apiTags';

const useGetTenders = (query: string) => {
  return useQuery({
    queryKey: [ApiTags.GET_TENDERS_RIBBON],
    queryFn: () => getTenders(query),
  });
};

const useGetTenderById = (tenderId: string) => {
  return useQuery({
    queryKey: [ApiTags.GET_TENDER],
    queryFn: () => getTenderById(tenderId),
  });
};

export { useGetTenders, useGetTenderById };
