import {Role} from '@/types/Role';

export type DataForm = {
  points: {
    isWinner: boolean;
    role: Role;
    bonusesWinners: number;
    bonusesLosers: number;
    wills: number;
  }[];
};
