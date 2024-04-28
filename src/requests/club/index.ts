import {supabase} from '@/providers/supabaseClient.ts';
import {Tables} from '@/types/supabase.ts';

export async function getClubs(ids?: Array<Tables<'clubs'>['id'] | null>) {
  if (ids?.length) {
    return supabase
      .from('clubs')
      .select('*')
      .in('id', ids)
      .throwOnError()
      .then(res => res.data);
  }

  return supabase
    .from('clubs')
    .select('*')
    .throwOnError()
    .then(res => res.data);
}
