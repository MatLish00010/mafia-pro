import useRating from '@/hooks/rating/useRating.ts';
import {DataTable} from '@/ui/data-table.tsx';

import {columns} from './columns.tsx';

const Table = () => {
  const {data, isLoading} = useRating();
  return <>{data && <DataTable columns={columns} data={data} isLoading={isLoading} />}</>;
};

export default Table;
