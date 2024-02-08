import {TablesInsert} from '@/types/supabase.ts';

export type AddGameDto = TablesInsert<'games'> & {
  players_data: TablesInsert<'game_details'>[];
};
