import * as yup from 'yup';

export const validation = yup.object().shape({
  wills: yup
    .array()
    .of(
      yup.object().shape({
        removed: yup.boolean().required(),
        breakLose: yup.boolean().required(),
        vot: yup.boolean().required(),
      }),
    )
    .required(),
});
