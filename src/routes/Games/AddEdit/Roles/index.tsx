import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect, useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {Role} from '@/types/Role.ts';
import {User} from '@/types/User.ts';
import {Button} from '@/ui/button.tsx';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/ui/select.tsx';

type Props = {
  players: User[];
  onSubmit: (roles: Role[]) => void;
  defaultValues?: Role[];
};

type DataForm = {
  roles: {
    value: Role;
  }[];
};

const options: {value: Role; label: string}[] = [
  {value: 'RED', label: 'Red'},
  {value: 'BLACK', label: 'Black'},
  {value: 'DON', label: 'Don'},
  {value: 'SHERIFF', label: 'Sheriff'},
];

const initialRoles = Array.from({length: 10}, () => ({value: ''})) as unknown as DataForm['roles'];

const Roles = ({players, onSubmit, defaultValues}: Props) => {
  const [disabledKeys, setDisabledKeys] = useState<Role[]>([]);

  const form = useForm<DataForm>({
    defaultValues: {
      roles: defaultValues?.length ? defaultValues.map(item => ({value: item})) : initialRoles,
    },

    resolver: yupResolver(
      yup.object().shape({
        roles: yup
          .array()
          .of(
            yup.object().shape({
              value: yup.string<Role>().required('Role is required'),
            }),
          )
          .required(),
      }),
    ),
  });

  const {fields} = useFieldArray({
    control: form.control,
    name: 'roles',
  });

  const getThreshold = (role: Role): number => {
    switch (role) {
      case 'RED':
        return 6;
      case 'BLACK':
        return 2;
      case 'SHERIFF':
      case 'DON':
        return 1;
    }
  };

  const getDisabledKeys = () => {
    const valuesRoles = form.getValues('roles');

    const keys: Role[] = [];
    const counts = {
      DON: 0,
      RED: 0,
      SHERIFF: 0,
      BLACK: 0,
    };

    valuesRoles.forEach(item => {
      if (item.value) {
        counts[item.value] += 1;

        if (counts[item.value] >= getThreshold(item.value)) {
          keys.push(item.value);
        }
      }
    });

    setDisabledKeys(keys);
  };

  useEffect(() => {
    getDisabledKeys();
  }, []);

  const onReset = () => {
    setDisabledKeys([]);
    form.setValue('roles', initialRoles);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => onSubmit(data.roles.map(item => item.value)))}
        className="flex flex-col gap-4">
        {fields.map((item, index) => (
          <FormField
            key={item.id}
            control={form.control}
            name={`roles.${index}.value`}
            render={({field}) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel className="shrink-0 w-20">
                    {index + 1}. {players[index].nick}:
                  </FormLabel>
                  <div className="flex-1 flex flex-col gap-2">
                    <Select
                      onValueChange={val => {
                        field.onChange(val);
                        getDisabledKeys();
                      }}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {options.map(option => (
                          <SelectItem
                            disabled={disabledKeys.includes(option.value)}
                            key={option.value}
                            value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </div>
                </div>
              </FormItem>
            )}
          />
        ))}
        <div className="self-end mt-2 flex items-center gap-5">
          <Button type="button" variant="outline" onClick={onReset}>
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default Roles;
