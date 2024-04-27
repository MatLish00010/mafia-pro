import {supabase} from '@/providers/supabaseClient.ts';

export const getClubs = async () =>
  supabase
    .from('clubs')
    .select('*')
    .throwOnError()
    .then(res => res.data);
