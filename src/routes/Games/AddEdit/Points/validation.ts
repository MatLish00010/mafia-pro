import * as yup from 'yup';

import {formatFromThousand, formatToThousand} from '@/lib/numberFormat.ts';
import {MAX_BONUSES_LOSE, MAX_BONUSES_WIN} from '@/lib/points.ts';
import {Role} from '@/types/Role.ts';

import {DataForm} from './types';

const calculateBonuses = (
  data: DataForm,
  isWinner: boolean,
  bonusesKey: 'bonusesWinners' | 'bonusesLosers',
): number => {
  let acc = 0;

  data.points.forEach(item => {
    if (item.isWinner === isWinner) {
      acc += formatToThousand(item[bonusesKey]);
    }
  });

  return acc;
};

export const validation = () =>
  yup.object().shape({
    points: yup
      .array()
      .of(
        yup.object().shape({
          removed: yup.boolean().required(),
          breakLose: yup.boolean().required(),
          vot: yup.boolean().required(),
          role: yup.string<Role>().required(),
          isWinner: yup.boolean().required(),
          bonusesWinners: yup
            .number()
            .test('maxBonusesWin', 'You can distribute 0.7 to winners', function () {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              const allData = this.from[1].value as DataForm;
              const acc = calculateBonuses(allData, true, 'bonusesWinners');
              const isError = formatFromThousand(acc) > MAX_BONUSES_WIN;
              return !isError;
            })
            .min(0, 'Min value 0')
            .typeError('Must be a number')
            .required(),
          bonusesLosers: yup
            .number()
            .test('maxBonusesLose', 'You can distribute 0.4 to losers', function () {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              const allData = this.from[1].value as DataForm;
              const acc = calculateBonuses(allData, false, 'bonusesLosers');
              const isError = formatFromThousand(acc) > MAX_BONUSES_LOSE;
              return !isError;
            })
            .min(0, 'Min value 0')
            .typeError('Must be a number')
            .required(),
        }),
      )
      .required(),
  });
