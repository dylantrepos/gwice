import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { TextItem } from '../../general/TextItem/TextItem';
import { CityEventCardEmptyItem } from '../CityEventCardItem/CityEventCardItem';

interface CityEventListFooterItemProps {
  isLoading: boolean;
  eventLength: number;
}

export const CityEventListFooterItem = ({
  isLoading,
  eventLength
}: CityEventListFooterItemProps): ReactNode => {
  const { t } = useTranslation();

  return isLoading ? (
    <>
      <CityEventCardEmptyItem large />
      <CityEventCardEmptyItem large />
      <CityEventCardEmptyItem large />
    </>
  ) : (
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
