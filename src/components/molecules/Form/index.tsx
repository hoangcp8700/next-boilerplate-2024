'use client';

import { withProperties } from '@/shares/utils/widthProperties';

import Field from './Field';
import SubmitButton from './Submit';
import FormProvider from './FormProvider';

export const Form = withProperties(FormProvider, {
  Field,
  SubmitButton,
});
