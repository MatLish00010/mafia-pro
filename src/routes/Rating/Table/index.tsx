import {useState} from 'react';

import useRating from '@/hooks/rating/useRating.ts';
import {Months} from '@/types/Months.ts';
import {DataTable} from '@/ui/data-table.tsx';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/ui/select.tsx';

import {columns} from './columns.tsx';

const monthOptions: Array<{value: Months; label: string}> = [
  {
    value: Months.January,
    label: 'January',
  },
  {value: Months.February, label: 'February'},
  {value: Months.March, label: 'March'},
  {value: Months.April, label: 'April'},
  {value: Months.May, label: 'May'},
  {value: Months.June, label: 'June'},
  {value: Months.July, label: 'July'},
  {value: Months.August, label: 'August'},
  {value: Months.September, label: 'September'},
  {value: Months.October, label: 'October'},
  {value: Months.November, label: 'November'},
  {value: Months.December, label: 'December'},
];

const Table = () => {
  const [month, setMonth] = useState<Months>(new Date().getMonth());
  const {data, isLoading} = useRating({
    month,
  });

  return (
    <div>
      <div className="max-w-64">
        <Select onValueChange={val => setMonth(parseInt(val))} defaultValue={`${month}`}>
          <SelectTrigger>
            <SelectValue placeholder="Select a verified email to display" />
          </SelectTrigger>
          <SelectContent>
            {monthOptions.map(item => (
              <SelectItem key={item.value} value={`${item.value}`}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DataTable columns={columns} data={data || []} isLoading={isLoading} />
    </div>
  );
};

export default Table;
