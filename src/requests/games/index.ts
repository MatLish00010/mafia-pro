import {supabase} from '@/providers/supabaseClient.ts';
import {AddGame} from '@/requests/games/types/AddGame.ts';
import {Game} from '@/types/Game.ts';
import {Tables} from '@/types/supabase.ts';

export const addGame = async (props: AddGame) =>
  supabase
    .rpc('add_game', {
      winner_team: props.winner,
      game_date: props.date,
      game_notes: props.notes || '',
      players_data: props.players_data.map(item => {
        return {
          role: item.role,
          win: item.win,
          user_id: item.user_id,
          first_killed: item.first_killed,
          hand_lose: item.hand_lose,
          first_killed_boneses: item.first_killed_boneses || 0,
          removed: item.removed,
          victory_opposing_team: item.victory_opposing_team,
          break_and_lose: item.break_and_lose,
          bonuses: item.bonuses,
          position: item.position,
          wills: item.wills,
        };
      }),
      club_id: props.club_id,
    })
    .throwOnError();

export const getGames = async (club_id?: Tables<'clubs'>['id']) => {
  if (club_id) {
    return supabase
      .from('games')
      .select()
      .eq('club_id', club_id)
      .order('date', {ascending: false})
      .throwOnError()
      .then(res => res.data);
  }
  return supabase
    .from('games')
    .select()
    .order('date', {ascending: false})
    .throwOnError()
    .then(res => res.data);
};

export const getGamePlayers = async (id: Game['id']) =>
  supabase
    .from('game_details')
    .select(
      `
    *,
    users (nick)
    `,
    )
    .eq('game_id', id)

    .throwOnError()
    .then(res => res.data);

export const removeGame = async (id: Game['id']) =>
  supabase.from('games').delete().eq('id', id).throwOnError();
