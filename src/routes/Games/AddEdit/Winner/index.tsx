import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

import {Team} from '@/types/Team.ts';
import {Button} from '@/ui/button.tsx';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/ui/form';
import {RadioGroup, RadioGroupItem} from '@/ui/radio-group.tsx';

type Props = {
  onSubmit: (winner: Team) => void;
  defaultValues?: Team;
};

type DataForm = {
  winner: Team;
};

const Winner = ({onSubmit, defaultValues}: Props) => {
  const form = useForm<DataForm>({
    defaultValues: {
      winner: defaultValues || 'RED',
    },
    resolver: yupResolver(
      yup.object().shape({
        winner: yup.mixed<Team>().oneOf(['RED', 'BLACK']).required(),
      }),
    ),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => onSubmit(data.winner))}
        className="flex flex-col justify-between flex-1">
        <FormField
          control={form.control}
          name="winner"
          render={({field}) => (
            <FormItem className="flex flex-col items-center flex-1 ">
              <FormLabel>Select the winning team</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col justify-center flex-1">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="RED" />
                    </FormControl>
                    <FormLabel className="font-normal">Red</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="BLACK" />
                    </FormControl>
                    <FormLabel className="font-normal">Black</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="self-end" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default Winner;
