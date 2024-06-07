import { useTranslations } from 'next-intl';

export const useMessages = () => {
  return useTranslations('messages');
};
