import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { TextItem } from '../../../../components/atoms/TextItem';
import { EventCardEmptyItem } from '../molecules/EventCardEmptyItem';

interface CityEventListFooterItemProps {
  isLoading: boolean;
  isError: boolean;
  eventLength: number;
}

export const CityEventListFooterItem = ({
  isLoading,
  isError,
  eventLength
}: CityEventListFooterItemProps): ReactNode => {
  const { t } = useTranslation();

  return isLoading ? (
    <>
      <EventCardEmptyItem large />
      <EventCardEmptyItem large />
      <EventCardEmptyItem large />
    </>
  ) : (
    <View
      style={{
        paddingHorizontal: 40,
        paddingVertical: 40,
        width: '100%'
      }}
    >
      <TextItem
        style={{
          textAlign: 'center'
        }}
      >
        {isError
          ? t('screens.events.text.error')
          : t(
              eventLength === 0
                ? 'screens.events.text.noEventsAvailable'
                : 'screens.events.text.noMoreEventsAvailable'
            )}
      </TextItem>
    </View>
  );
};
