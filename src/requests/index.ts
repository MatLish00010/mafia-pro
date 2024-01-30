import {supabase} from '@/providers/supabaseClient.ts';
import {AddUserDto} from '@/requests/types/addUserDto.ts';

export const getUsers = async () =>
  supabase
    .from('users')
    .select('*')
    .throwOnError()
    .then(res => res.data);

export const addUser = async (dto: AddUserDto) =>
  supabase
    .from('users')
    .insert({nick: dto.nick, data_birthday: dto.data_birthday})
    .select()
    .throwOnError()
    .then(data => data.data);
