import {yupResolver} from '@hookform/resolvers/yup';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

import {supabase} from '@/providers/supabaseClient.ts';
import {Button} from '@/ui/button.tsx';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/ui/form';
import {Input} from '@/ui/input.tsx';
import {useToast} from '@/ui/toast/use-toast.ts';

type DataForm = {
  email: string;
  password: string;
};

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();

  const form = useForm<DataForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email('Should be email').required('Required'),
        password: yup.string().required('Required'),
      }),
    ),
  });

  const onSubmit = async (data: DataForm) => {
    setLoading(true);
    const res = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (res.error) {
      toast({
        title: 'SignUp Error',
        variant: 'destructive',
        description: res.error.message,
      });
    } else {
      toast({
        title: 'You need to confirm your email address before logging in',
      });
    }

    setLoading(false);
  };

  return (
    <section className="flex-1 flex flex-col justify-center items-center gap-5">
      <h1>Registration</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 max-w-64">
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@gmail.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="not 1234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            Sign Up
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default Auth;
