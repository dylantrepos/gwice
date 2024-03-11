import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { TextItem } from '../../general/TextItem/TextItem';

interface CityEventListFooterItemProps {
  isLoading: boolean;
  eventLength: number;
}

export const CityEventListFooterItem = ({
  isLoading,
  eventLength
}: CityEventListFooterItemProps) => {
  const { t } = useTranslation();

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 40,
        width: '100%',
        height: 600
      }}
    >
      <TextItem
        style={{
          textAlign: 'center'
        }}
      >
        {eventLength === 0
          ? t('screens.events.text.noEventsAvailable')
          : t('screens.events.text.noMoreEventsAvailable')}
      </TextItem>
    </View>
  );
};
