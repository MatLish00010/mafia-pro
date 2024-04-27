import {useQuery} from '@tanstack/react-query';

import {getClubs} from '@/requests/club';

export default function useClubs() {
  return useQuery({
    queryKey: ['clubs'],
    queryFn: getClubs,
    placeholderData: [],
  });
}
