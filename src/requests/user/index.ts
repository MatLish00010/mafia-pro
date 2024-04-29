import {format} from 'date-fns';

import {supabase} from '@/providers/supabaseClient.ts';
import {AddUser} from '@/requests/user/types/AddUser.ts';
import {EditUser} from '@/requests/user/types/EditUser.ts';
import {User} from '@/types/User.ts';
import {Tables} from '@/types/supabase.ts';

export const getUsers = async (club_id?: Tables<'clubs'>['id']) => {
  if (club_id) {
    return supabase
      .from('users')
      .select('*')
      .eq('club_id', club_id)
      .order('nick', {ascending: true})
      .throwOnError()
      .then(res => res.data);
  }
  return supabase
    .from('users')
    .select('*')
    .order('nick', {ascending: true})
    .throwOnError()
    .then(res => res.data);
};

export const addUser = async (body: AddUser) =>
  supabase
    .from('users')
    .insert([
      {
        nick: body.nick,
        data_birthday: body.data_birthday ? format(new Date(body.data_birthday), 'y-MM-d') : null,
        first_visit: body.first_visit ? format(new Date(body.first_visit), 'y-MM-d') : null,
        is_active_club_cart: body.is_active_club_cart,
        club_id: body.club_id,
      },
    ])
    .select()
    .throwOnError()
    .then(data => data.data);

export const editUser = async (dto: EditUser) =>
  supabase
    .from('users')
    .update({
      nick: dto.nick,
      data_birthday: dto.data_birthday ? format(new Date(dto.data_birthday), 'y-MM-d') : null,
      first_visit: dto.first_visit ? format(new Date(dto.first_visit), 'y-MM-d') : null,
      is_active_club_cart: dto.is_active_club_cart,
    })
    .eq('id', dto.id)
    .select();

export const removeUser = async (id: User['id']) => supabase.from('users').delete().eq('id', id);
