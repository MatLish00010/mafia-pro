import {yupResolver} from '@hookform/resolvers/yup';
import {ClassValue} from 'clsx';
import {useFieldArray, useForm} from 'react-hook-form';

import {cn} from '@/lib/utils.ts';
import {State} from '@/routes/Games/AddEdit/reducer.ts';
import {Team} from '@/types/Team.ts';
import {User} from '@/types/User.ts';
import {Badge} from '@/ui/badge.tsx';
import {Button} from '@/ui/button.tsx';
import {Checkbox} from '@/ui/checkbox.tsx';
import {Form, FormControl, FormField, FormItem, FormLabel} from '@/ui/form.tsx';

import {DataForm} from './types.ts';
import {validation} from './validation.ts';

type Props = {
  winnerTeam: Team;
  players: User[];
  onSubmit: (data: DataForm['wills']) => void;
  defaultValues?: DataForm['wills'];
  points: State['points'];
};

const Header = ({value, className}: {value: string; className?: ClassValue[]}) => {
  return (
    <p className={cn(['mb-2 absolute top-[-25px] text-zinc-500 font-semibold text-xs'], className)}>
      {value}
    </p>
  );
};

const Wills = ({points, players, onSubmit, defaultValues}: Props) => {
  const form = useForm<DataForm>({
    defaultValues: {
      wills: defaultValues?.length
        ? defaultValues
        : players.map(() => ({
            removed: false,
            vot: false,
            breakLose: false,
          })),
    },
    mode: 'onChange',
    resolver: yupResolver(validation),
  });

  const {fields} = useFieldArray({
    control: form.control,
    name: 'wills',
  });

  const wills = form.watch('wills');
  const indexOfSelectedGTV = wills.findIndex(f => f.vot);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => onSubmit(data.wills))}
        className="flex flex-col justify-between flex-1 gap-4">
        <div className="flex flex-col gap-5 relative">
          {fields.map((item, index) => (
            <div className="grid grid-cols-5 space-y-0 items-center" key={item.id}>
              <FormLabel className=" flex flex-col ">
                {index + 1}. {players[index].nick}:
              </FormLabel>
              <Badge
                variant={points[index].isWinner ? 'default' : 'destructive'}
                className="justify-self-center w-max">
                {points[index].isWinner ? 'Win' : 'Lose'}
              </Badge>
              <div className="justify-self-center">
                {index === 0 && <Header value="Removed" className={['translate-x-[-33%]']} />}
                <FormField
                  control={form.control}
                  name={`wills.${index}.removed`}
                  render={({field}) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="justify-self-center">
                {index === 0 && <Header value="VOT" className={['translate-x-[-15%]']} />}
                <FormField
                  control={form.control}
                  name={`wills.${index}.vot`}
                  render={({field}) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={
                              (indexOfSelectedGTV >= 0 && indexOfSelectedGTV !== index) ||
                              points[index].isWinner
                            }
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="justify-self-center">
                {index === 0 && <Header value="Break" className={['translate-x-[-24%]']} />}
                <FormField
                  control={form.control}
                  name={`wills.${index}.breakLose`}
                  render={({field}) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={points[index].isWinner}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <Button className="self-end" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default Wills;
