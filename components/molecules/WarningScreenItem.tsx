import { type PropsWithChildren, type ReactNode } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { TextItem } from '../atoms/TextItem';

interface Props {
  type: 'error' | 'unavailable' | 'loader';
}

const defaultErrorMessage = 'Une erreur est survenue, merci de réessayer plus tard...';
const defaultUnavailableMessage = 'Indisponible, merci de réessayer plus tard...';

export const WarningScreenItem = ({ type, children }: PropsWithChildren<Props>): ReactNode => (
  <View
    style={{
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    }}
  >
    {type === 'loader' && <ActivityIndicator size="large" color="#0D89CE" />}
    {type === 'error' && <TextItem>{children ?? defaultErrorMessage}</TextItem>}
    {type === 'unavailable' && <TextItem>{children ?? defaultUnavailableMessage}</TextItem>}
  </View>
);
