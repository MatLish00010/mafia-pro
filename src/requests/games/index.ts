import {supabase} from '@/providers/supabaseClient.ts';
import {AddGameDto} from '@/requests/games/dto/addGame.dto.ts';

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
          first_killed_boneses: item.first_killed_boneses || 0,
          removed: item.removed,
          victory_opposing_team: item.victory_opposing_team,
          break_and_lose: item.break_and_lose,
          bonuses: item.bonuses,
          position: item.position,
        };
      }),
    })
    .throwOnError();
