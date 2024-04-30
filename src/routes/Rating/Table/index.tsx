import {useState} from 'react';

import useClubs from '@/hooks/club/useClubs.ts';
import useRating from '@/hooks/rating/useRating.ts';
import {Months} from '@/types/Months.ts';
import {Tables} from '@/types/supabase.ts';
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

interface Props {
  club_id?: Tables<'clubs'>['id'];
}

const Table = ({club_id}: Props) => {
  const {data: clubs, isLoading: isLoadingClubs} = useClubs();

  const [club, setClub] = useState<Tables<'clubs'>['id'] | undefined>(club_id);

  const [month, setMonth] = useState<Months>(new Date().getMonth());
  const {data, isLoading} = useRating({
    club_id: club || '',
    month,
  });

  return (
    <div>
      <div className="max-w-64">
        <div className="flex flex-col items-start gap-2">
          {!club_id && (
            <Select onValueChange={val => setClub(val)}>
              <SelectTrigger className="gap-2 w-50">
                <p className="font-light text-xs">Club:</p>
                <SelectValue className="ml-auto" placeholder="Choose club" />
              </SelectTrigger>
              <SelectContent>
                {clubs?.map(item => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Select onValueChange={val => setMonth(parseInt(val))} defaultValue={`${month}`}>
            <SelectTrigger className="gap-2 w-50">
              <p className="font-light text-xs">Month:</p>
              <SelectValue placeholder="Choose month" />
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
      </div>
      <DataTable columns={columns} data={data || []} isLoading={isLoading || isLoadingClubs} />
    </div>
  );
};

export default Table;
