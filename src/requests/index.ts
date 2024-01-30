import {PostgrestSingleResponse} from '@supabase/supabase-js';

import {supabase} from '@/providers/supabaseClient.ts';

const handleResponse = <T>(res: PostgrestSingleResponse<T>) => {
  if (res.error) {
    throw new Error(res.error.message);
  }
  return res.data;
};

export const getUsers = async () => supabase.from('users').select('*').then(handleResponse);
