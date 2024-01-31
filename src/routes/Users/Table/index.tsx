import useUsers from '@/hooks/useUsers.ts';
import {DataTable} from '@/ui/data-table.tsx';

import {columns} from './columns.tsx';

const Table = () => {
  const {data, isLoading} = useUsers();

  return <div>{data && <DataTable columns={columns} data={data} isLoading={isLoading} />}</div>;
};

export default Table;
