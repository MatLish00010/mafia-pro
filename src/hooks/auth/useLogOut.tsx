import {useState} from 'react';

import {supabase} from '@/providers/supabaseClient.ts';
import {useToast} from '@/ui/toast/use-toast.ts';

const useLogOut = () => {
  const {toast} = useToast();
  const [loading, setLoading] = useState(false);

  const logOut = async () => {
    setLoading(true);
    const {error} = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Log out',
        variant: 'destructive',
        description: error?.message,
      });
    }
    setLoading(false);
  };

  return {
    logOut,
    loading,
  };
};

export default useLogOut;
