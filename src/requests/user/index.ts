import {format} from 'date-fns';

import {supabase} from '@/providers/supabaseClient.ts';
import {AddUserDto} from '@/requests/user/dto/addUser.dto.ts';
import {EditUserDto} from '@/requests/user/dto/editUser.dto.ts';
import {User} from '@/types/User.ts';

export const getUsers = async () =>
  supabase
    .from('users')
    .select('*')
    .order('nick', {ascending: true})
    .throwOnError()
    .then(res => res.data);

export const addUser = async (dto: AddUserDto) =>
  supabase
    .from('users')
    .insert([
      {
        nick: dto.nick,
        data_birthday: dto.data_birthday ? format(new Date(dto.data_birthday), 'y-MM-d') : null,
        first_visit: dto.first_visit ? format(new Date(dto.first_visit), 'y-MM-d') : null,
        is_active_club_cart: dto.is_active_club_cart,
      },
    ])
    .select()
    .throwOnError()
    .then(data => data.data);

export const editUser = async (dto: EditUserDto) =>
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
