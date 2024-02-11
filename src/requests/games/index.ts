import {supabase} from '@/providers/supabaseClient.ts';
import {AddGameDto} from '@/requests/games/dto/addGame.dto.ts';
import {Game} from '@/types/Game.ts';

export const addGame = async (dto: AddGameDto) =>
  supabase
    .rpc('add_game', {
      winner_team: dto.winner,
      game_date: dto.date,
      game_notes: dto.notes || '',
      players_data: dto.players_data.map(item => {
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
    })
    .throwOnError();

export const getGames = async () =>
  supabase
    .from('games')
    .select()
    .order('date', {ascending: false})
    .throwOnError()
    .then(res => res.data);

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
