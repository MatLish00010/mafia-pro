import {yupResolver} from '@hookform/resolvers/yup';
import {ClassValue} from 'clsx';
import {useFieldArray, useForm} from 'react-hook-form';

import {cn} from '@/lib/utils.ts';
import {Role} from '@/types/Role.ts';
import {Team} from '@/types/Team.ts';
import {User} from '@/types/User.ts';
import {Badge} from '@/ui/badge.tsx';
import {Button} from '@/ui/button.tsx';
import {Checkbox} from '@/ui/checkbox.tsx';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/ui/form.tsx';
import {Input} from '@/ui/input.tsx';

import {DataForm} from './types.ts';
import {getIsWinner} from './utils.ts';
import {validation} from './validation.ts';

type Props = {
  winnerTeam: Team;
  roles: Role[];
  players: User[];
  onSubmit: (data: DataForm['points']) => void;
  defaultValues?: DataForm['points'];
};

const Header = ({value, className}: {value: string; className?: ClassValue[]}) => {
  return (
    <p className={cn(['mb-2 absolute top-[-25px] text-zinc-500 font-semibold text-xs'], className)}>
      {value}
    </p>
  );
};

const Points = ({roles, winnerTeam, players, onSubmit, defaultValues}: Props) => {
  const form = useForm<DataForm>({
    defaultValues: {
      points: defaultValues?.length
        ? defaultValues
        : roles.map((role, index) => ({
            isWinner: getIsWinner({index, roles, winner: winnerTeam}),
            removed: false,
            vot: false,
            breakLose: false,
            bonusesWinners: 0,
            bonusesLosers: 0,
            role,
          })),
    },
    mode: 'onChange',
    resolver: yupResolver(validation()),
  });

  const {fields} = useFieldArray({
    control: form.control,
    name: 'points',
  });

  const points = form.watch('points');
  const indexOfSelectedGTV = points.findIndex(f => f.vot);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => onSubmit(data.points))}
        className="flex flex-col justify-between flex-1 gap-4">
        <div className="flex flex-col gap-5 relative">
          {fields.map((item, index) => (
            <div className="grid grid-cols-6 space-y-0 items-center" key={item.id}>
              <FormLabel className=" flex flex-col ">
                {index + 1}. {players[index].nick}:
              </FormLabel>
              <Badge
                variant={item.isWinner ? 'default' : 'destructive'}
                className="justify-self-center w-max">
                {item.isWinner ? 'Win' : 'Lose'}
              </Badge>
              <div>
                {index === 0 && <Header value="Bonuses" />}
                <FormField
                  control={form.control}
                  name={
                    item.isWinner
                      ? `points.${index}.bonusesWinners`
                      : `points.${index}.bonusesLosers`
                  }
                  render={({field}) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="justify-self-center">
                {index === 0 && <Header value="Removed" className={['translate-x-[-33%]']} />}
                <FormField
                  control={form.control}
                  name={`points.${index}.removed`}
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
                  name={`points.${index}.vot`}
                  render={({field}) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={
                              (indexOfSelectedGTV >= 0 && indexOfSelectedGTV !== index) ||
                              item.isWinner
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
                  name={`points.${index}.breakLose`}
                  render={({field}) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={item.isWinner}
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

export default Points;
