import {yupResolver} from '@hookform/resolvers/yup';
import {useFieldArray, useForm} from 'react-hook-form';
import * as yup from 'yup';

import useUsers from '@/hooks/user/useUsers.ts';
import {User} from '@/types/User.ts';
import {Button} from '@/ui/button.tsx';
import ComboBoxResponsive from '@/ui/comeboxResponsive';
import {DialogDescription, DialogHeader, DialogTitle} from '@/ui/dialog.tsx';
import {Form, FormField, FormItem, FormLabel, FormMessage} from '@/ui/form.tsx';

type DataForm = {
  players: Pick<User, 'id' | 'nick'>[];
};

type Props = {
  onSubmit: (data: User[]) => void;
  defaultValues?: User[];
};

const Players = ({onSubmit, defaultValues}: Props) => {
  const {data, isLoading} = useUsers();

  const form = useForm<DataForm>({
    defaultValues: {
      players: defaultValues?.length
        ? defaultValues.map(item => ({
            id: item.id,
            nick: item.nick,
          }))
        : Array.from({length: 10}, () => ({id: '', nick: ''})),
    },
    resolver: yupResolver(
      yup.object().shape({
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

    onSubmit(players);
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Add Players</DialogTitle>
        <DialogDescription>Choose Nick of players</DialogDescription>
      </DialogHeader>
      {isLoading && 'Loading...'}
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
