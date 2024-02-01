import { ActivityIndicator, Text, View } from "react-native"
import { PropsWithChildren } from 'react';

type Props = {
  type: 'error' | 'unavailable' | 'loader';
}

const defaultErrorMessage = 'Une erreur est survenue, merci de réessayer plus tard...';
const defaultUnavailableMessage = 'Indisponible, merci de réessayer plus tard...';

export const WarningScreenItem = ({ 
  type, 
  children
}: PropsWithChildren<Props>) => {
  return (
    <View style={{flex: 1, display: 'flex', justifyContent: "center", alignItems: 'center', width: '100%'}}>
      { type === 'loader' && (
        <ActivityIndicator
          size="large"
          color="#0D89CE"
        />
      )}
      { type === 'error' && (
        <Text>
          { children || defaultErrorMessage }
        </Text>
      )}
      { type === 'unavailable' && (
        <Text>
          { children || defaultUnavailableMessage }
        </Text>
      )}
    </View>
  )
}