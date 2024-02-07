import {Role} from '@/types/Role';

export type DataForm = {
  points: {
    isWinner: boolean;
    removed: boolean;
    vot: boolean;
    breakLose: boolean;
    role: Role;
    bonusesWinners: number;
    bonusesLosers: number;
  }[];
};
