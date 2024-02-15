import {supabase} from '@/providers/supabaseClient.ts';

export const getSession = async () =>
  supabase.auth.getSession().then(({data: {session}}) => session);
