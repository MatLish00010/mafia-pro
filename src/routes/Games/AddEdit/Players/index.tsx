import {yupResolver} from '@hookform/resolvers/yup';
import {CalendarIcon} from '@radix-ui/react-icons';
import {format} from 'date-fns';
import {useFieldArray, useForm} from 'react-hook-form';
import * as yup from 'yup';

import useUsers from '@/hooks/user/useUsers.ts';
import {cn} from '@/lib/utils.ts';
import {User} from '@/types/User.ts';
import {Button} from '@/ui/button.tsx';
import {Calendar} from '@/ui/calendar.tsx';
import ComboBoxResponsive from '@/ui/comeboxResponsive';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/ui/form.tsx';
import {Popover, PopoverContent, PopoverTrigger} from '@/ui/popover.tsx';

type DataForm = {
  date: Date;
  players: Pick<User, 'id' | 'nick'>[];
};

type Props = {
  onSubmit: (data: {players: User[]; date: Date}) => void;
  defaultValues?: {players: User[]; date: Date};
};

const Players = ({onSubmit, defaultValues}: Props) => {
  const {data, isLoading} = useUsers();

  const form = useForm<DataForm>({
    defaultValues: {
      date: defaultValues?.date || new Date(),
      players: defaultValues?.players?.length
        ? defaultValues.players.map(item => ({
            id: item.id,
            nick: item.nick,
          }))
        : Array.from({length: 10}, () => ({id: '', nick: ''})),
    },
    resolver: yupResolver(
      yup.object().shape({
        date: yup.date().required(),
        players: yup
          .array()
          .of(
            yup.object().shape({
              id: yup.string().required('Player name is required'),
              nick: yup.string().required('Player name is required'),
            }),
          )
          .required(),
      }),
    ),
  });

  const {fields, update} = useFieldArray({
    control: form.control,
    name: 'players',
  });

  const watchPlayers = form.watch('players');

  const prevSubmit = (dataVal: DataForm) => {
    const players = dataVal.players.map(player => {
      return data?.find(user => user.id === player.id);
    }) as User[];

    onSubmit({players, date: dataVal.date});
  };

  return (
    <div>
      {!isLoading && !!data?.length && (
        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(prevSubmit)}>
            <div className="flex flex-col gap-2">
              {fields.map((item, index) => (
                <FormField
                  key={item.id}
                  name={`players.${index}.id`}
                  render={() => {
                    return (
                      <FormItem className="flex items-baseline gap-2">
                        <FormLabel className="w-4">{index + 1}:</FormLabel>
                        <div>
                          <ComboBoxResponsive
                            disabledKeys={watchPlayers.map(item => item.id)}
                            onSelect={id => {
                              const currentUser = data.find(user => user.id === id);
                              update(index, {
                                id: currentUser?.id || '',
                                nick: currentUser?.nick || '',
                              });
                            }}
                            items={data.map(item => ({id: item.id, label: item.nick}))}
                            buttonLabel={item.nick || 'Select player'}
                          />
                          <FormMessage />
                        </div>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormField
              control={form.control}
              name="date"
              render={({field}) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of game</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}>
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        captionLayout="dropdown-buttons"
                        fromYear={1900}
                        toYear={new Date().getFullYear()}
                        mode="single"
                        selected={field.value as Date}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="self-end" disabled={isLoading} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default Players;
