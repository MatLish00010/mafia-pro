import {yupResolver} from '@hookform/resolvers/yup';
import {DialogProps} from '@radix-ui/react-dialog';
import {CalendarIcon} from '@radix-ui/react-icons';
import {format} from 'date-fns';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

import useAddUser from '@/hooks/user/useAddUser.ts';
import useEditUser from '@/hooks/user/useEditUser.ts';
import useUsers from '@/hooks/user/useUsers.ts';
import {cn} from '@/lib/utils.ts';
import {User} from '@/types/User.ts';
import {Button} from '@/ui/button';
import {Calendar} from '@/ui/calendar.tsx';
import {DialogDescription, DialogHeader, DialogTitle} from '@/ui/dialog.tsx';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/ui/form.tsx';
import {Input} from '@/ui/input.tsx';
import {Popover, PopoverContent, PopoverTrigger} from '@/ui/popover';
import {Switch} from '@/ui/switch.tsx';

type Props = {
  prevData?: User;
  onOpenChange: DialogProps['onOpenChange'];
};

export type DataForm = {
  nick: string;
  data_birthday?: null | Date;
  first_visit?: null | Date;
  is_active_club_cart?: boolean;
};

const AddEdit = ({onOpenChange, prevData}: Props) => {
  const {data: users, isLoading} = useUsers();

  const form = useForm<DataForm>({
    defaultValues: {
      nick: prevData?.nick || '',
      data_birthday: prevData?.data_birthday ? new Date(prevData?.data_birthday) : null,
      first_visit: prevData?.first_visit ? new Date(prevData?.first_visit) : null,
      is_active_club_cart: !!prevData?.is_active_club_cart,
    },
    resolver: yupResolver(
      yup.object().shape({
        first_visit: yup.date().nullable(),
        data_birthday: yup.date().nullable(),
        is_active_club_cart: yup.boolean(),
        nick: yup
          .string()
          .test('isUniq', 'Nick already used', val => {
            const isUsed =
              users?.find(user => user.nick.trim().toLowerCase() === val?.trim().toLowerCase()) &&
              val?.trim().toLowerCase() !== prevData?.nick?.trim().toLowerCase();
            return !isUsed;
          })
          .required('Nick is required'),
      }),
    ),
  });

  const {mutate, isPending} = useAddUser(() => {
    onOpenChange && onOpenChange(false);
    form.reset();
  });

  const {mutate: mutateEdit, isPending: isPendingEdit} = useEditUser(() => {
    onOpenChange && onOpenChange(false);
    form.reset();
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add Player</DialogTitle>
        <DialogDescription>Make changes. Click save when you're done.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          className="space-y-8 flex flex-col"
          onSubmit={form.handleSubmit(data =>
            prevData ? mutateEdit({...data, id: prevData.id}) : mutate(data),
          )}>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="nick"
              render={({field}) => {
                return (
                  <FormItem>
                    <FormLabel>Nick</FormLabel>
                    <FormControl>
                      <Input required placeholder="Don Carlos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="data_birthday"
              render={({field}) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
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
            <FormField
              control={form.control}
              name="first_visit"
              render={({field}) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Firs visit</FormLabel>
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
            <FormField
              control={form.control}
              name="is_active_club_cart"
              render={({field}) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Club card is active</FormLabel>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            className="self-end"
            disabled={isLoading || isPending || isPendingEdit}
            type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddEdit;
