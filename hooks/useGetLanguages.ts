import { t } from 'i18next';
import { type Choice } from '../components/molecules/SelectItem';

export const useGetLanguages = (): Choice[] => [
  { label: t('languages.french'), value: 'fr' },
  { label: t('languages.english'), value: 'en' }
];
