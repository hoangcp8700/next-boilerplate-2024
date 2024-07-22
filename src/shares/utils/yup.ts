import * as yup from 'yup';

import { REGEX } from '../constants';

type ValidateOptionType = {
  noMessage?: boolean;
  customMessage?: string;
  minMessage?: string;
  maxMessage?: string;
};

export const messageRequired = (label: string, option?: ValidateOptionType) =>
  option?.customMessage || `${label} is required`;

//* Email
export const buildEmailRequired = (label: string) => {
  return yup
    .string()
    .label(label)
    .trim()
    .required(messageRequired(label))
    .email()
    .matches(REGEX.email, { message: `${label} must be a valid email` });
};

//* String
export const buildStringNullable = () => yup.string().trim().nullable();

export const buildStringRequired = (
  label: string,
  option?: ValidateOptionType,
) => {
  return yup
    .string()
    .label(label)
    .trim()
    .required(option?.noMessage ? '' : messageRequired(label, option));
};

export const buildStringRequiredAlphabet = (
  label: string,
  option?: ValidateOptionType,
) => {
  return buildStringRequired(label, option).test(
    'not-number',
    'Only accept alphabet',
    (value) => REGEX.alphabet.test(value),
  );
};

export const buildStringRequiredAlphabetAndNumber = (
  label: string,
  option?: ValidateOptionType,
) => {
  return buildStringRequired(label, option).test(
    'not-number',
    'Do not allow special characters',
    (value) => REGEX.alphabetAndNumber.test(value),
  );
};

export const buildStringMinMaxRequired = (
  label: string,
  min = 0,
  max = 255,
  option?: ValidateOptionType,
) => {
  return yup
    .string()
    .label(label)
    .min(min, `${label} must be at least ${min} character`)
    .max(max, `${label} must be at maximum ${max} character`)
    .required(messageRequired(label, option));
};

export const buildStringMaxRequired = (
  label: string,
  max = 255,
  option?: ValidateOptionType,
) => {
  return yup
    .string()
    .label(label)
    .max(max, `Max length is ${max} characters.`)
    .required(messageRequired(label, option));
};

export const buildStringMinRequired = (
  label: string,
  min: number,
  option?: ValidateOptionType,
) => {
  return buildStringRequired(label, option).test(
    'min-string',
    option?.customMessage || `${label} must be at least ${min} character`,
    (val) => val?.toString().length >= min,
  );
};

export const buildStringRequiredNoSpace = (label: string) => {
  return buildStringRequired(label).test(
    'no-space-between-character',
    'Do not allow blank space between with character',
    (value) => {
      return REGEX.noSpace.test(value);
    },
  );
};

export const buildStringNullNoSpace = () => {
  return buildStringNullable().test(
    'no-space-between-character',
    'Do not allow blank space between with character',
    (value) => {
      if (!value) return true;
      return REGEX.noSpace.test(value);
    },
  );
};

//* Boolean;
export const buildBooleanNullable = () => {
  return yup.boolean();
};
export const buildBooleanRequire = (message?: string) => {
  return yup.bool().oneOf([true], message || 'Field must be checked');
};

//* Number
export const buildNumberRequired = (
  label: string,
  option?: ValidateOptionType,
) => {
  return yup
    .number()
    .label(label)
    .required(messageRequired(label, option))
    .typeError(`That doesn't look like ${label}`);
};
export const buildNumberMinMaxRequired = (
  label: string,
  min: number,
  max: number,
  option?: ValidateOptionType,
) => {
  return buildNumberRequired(label, option)
    .min(min, option?.minMessage)
    .max(max, option?.maxMessage);
};

export const buildNumberMinRequired = (
  label: string,
  min: number,
  option?: ValidateOptionType,
) => {
  return buildNumberRequired(label, option).test(
    'min-number',
    option?.customMessage || `${label} must be at least ${min} numbers`,
    (val) => val?.toString().length >= min,
  );
};

export const buildNumberLengthRequired = (
  label: string,
  length: number,
  option?: ValidateOptionType,
) => {
  return buildNumberRequired(label, option).test(
    'length-number',
    `${label} must be exactly ${length} number`,
    (val) => val?.toString().length === length,
  );
};

//* Date

export const buildDateRequired = (label: string) => {
  return yup.date().label(label).required(messageRequired(label));
};
export const buildBirthDateRequired = (label: string) => {
  return yup
    .date()
    .label(label)
    .required(messageRequired(label))
    .max(new Date(Date.now() - 567648000000), 'You must be at least 18 years');
};

//* Password
export const buildPasswordRequired = (label: string, message?: string) => {
  return buildStringMaxRequired(label, 30).matches(REGEX.password, {
    message,
  });
};

//* Enum
export const buildEnumRequired = <T extends string>(
  label: string,
  enumObject: { [s: string]: T } | ArrayLike<T>,
) =>
  yup
    .mixed<T>()
    .oneOf(Object.values(enumObject))
    .required(messageRequired(label));

//* Other
export const buildConfirmRef = (
  label: string,
  key: string,
  message: string,
) => {
  return buildStringRequired(label).oneOf([yup.ref(key)], message);
};

export const buildConfirmEmail = (
  label: string,
  key: string,
  message: string,
) => {
  return buildEmailRequired(label).oneOf([yup.ref(key)], message);
};

export const buildPhoneRequire = (
  label: string,
  option?: ValidateOptionType,
) => {
  return buildStringRequired(label, option).test(
    'not-phone',
    "That doesn't look like Phone",
    (value) => REGEX.phone.test(value?.toString()),
  );
};
