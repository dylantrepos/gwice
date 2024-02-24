import { Animated, Modal, Pressable, View, Platform } from 'react-native';
import { FilterDateItem } from "../../utils/date";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useGetPeriod } from "../../hooks/useGetPeriod";
import moment from "moment";
import { BlurView } from "expo-blur";
import { TextItem } from '../../../../components/TextItem/TextItem';
import { PERIODS } from '../../../../types/Date';
import { DateTimePickerModalItem } from '../../../../components/DateTimePickerModalItem/DateTimePickerModalItem';
import style from './CityEventPeriodModal.style';
import palette from '../../../../assets/palette';
import { RootState } from '../../../../store/store';
import { setCurrentPeriod } from '../../../../reducers/eventReducer';

type FilterDateModalProps = {
  animatedValue: Animated.Value;
  isPopinVisible: boolean;
  setIsPopinVisible: React.Dispatch<React.SetStateAction<boolean>>;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedItemDate: FilterDateItem;
  setSelectedItemDate: React.Dispatch<React.SetStateAction<FilterDateItem>>;
}


export const FilterDateModal = ({
  animatedValue,
  isPopinVisible,
  setIsPopinVisible,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedItemDate,
  setSelectedItemDate
}: FilterDateModalProps) => {
  // Replace with your actual view
  const [currAnimValue, setCurrAnimValue] = useState(0);
  const [currStartDate, setCurrStartDate] = useState(startDate);
  const [currEndDate, setCurrEndDate] = useState(endDate);
  const [showDatePicker, setShowDatePicker] = useState<'start' | 'end' | undefined>();
  const opacity = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { updatePeriod, periodsAvailable } = useGetPeriod();
  const { currentPeriod } = useSelector((state: RootState) => state.eventReducer);
  const [currSelectedItem, setCurrSelectedItem] = useState(currentPeriod);


  useEffect(() => {
    const listener = animatedValue.addListener(({ value }) => setCurrAnimValue(value));
    // if (PERIODS[currSelectedItem] !== undefined) {
    //   if (
    //     (moment(currStartDate).format('DDMMYYYY').toString() === moment.utc(startDate).format('DDMMYYYY').toString() && moment(currEndDate).format('DDMMYYYY').toString() === moment.utc(endDate).format('DDMMYYYY').toString())) {
    //       Animated.sequence([
    //         Animated.timing(animatedValue, {
    //           toValue: 1,
    //           duration: 150,
    //           useNativeDriver: false,
    //         }),
    //         Animated.timing(animatedValue, {
    //           toValue: 0,
    //           duration: 150,
    //           useNativeDriver: false,
    //         }),
    //       ]).start();

    //       return;
    //     }
    //   else {
    //     if (currAnimValue === 0) {
    //       Animated.sequence([
    //         Animated.timing(animatedValue, {
    //           toValue: 0,
    //           duration: 150,
    //           useNativeDriver: false,
    //         }),
    //         Animated.timing(animatedValue, {
    //           toValue: 1,
    //           duration: 150,
    //           useNativeDriver: false,
    //         }),
    //       ]).start();
    //     }

    //     return;
    //   }
    // }

    // const animateValue = (toValue1: number, toValue2: number) => {
    //   if (currAnimValue === toValue2) return;
    
    //   Animated.sequence([
    //     Animated.timing(animatedValue, {
    //       toValue: toValue1,
    //       duration: 0,
    //       useNativeDriver: false,
    //     }),
    //     Animated.timing(animatedValue, {
    //       toValue: toValue2,
    //       duration: 150,
    //       useNativeDriver: false,
    //     }),
    //   ]).start();
    // }
    
    // animateValue(
    //   currSelectedItem === selectedItemDate ? 1 : 0, 
    //   currSelectedItem === selectedItemDate ? 0 : 1
    // );

    return () => {
      animatedValue.removeListener(listener);
    };
  }, [currSelectedItem, currStartDate, currEndDate, isPopinVisible]);

  // const backgroundColor = animatedValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['lightgrey', '#3988FD'],
  // });

  const handleClose = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      setIsPopinVisible(false);
    }, 5);
  }

  const handleUpdatePeriod= (item: string) => {
    console.log('item', item);
    setCurrSelectedItem(item);
  }

  const handleConfirm = () => {
    dispatch(setCurrentPeriod(currSelectedItem));
    handleClose();
  }

  // const handleConfirm = (item: string) => {
  //   switch (item) {
  //     case 'always':
  //       const nowHour = moment.utc().add(1, 'hour');
  //       const endYear = moment.utc().add(5, 'year').endOf('day');
  //       setStartDate(nowHour.toDate());
  //       setEndDate(endYear.toDate());
  //       break;
  //     case 'today':
  //       const now = moment.utc().add(1, 'hour');
  //       const endOfDay = moment.utc().add(1, 'hour').endOf('day');
  //       setStartDate(now.toDate());
  //       setEndDate(endOfDay.toDate());
  //       break;
  //     case 'tomorrow':
  //       const tomorrow = moment.utc().add(1, 'day').startOf('day');
  //       const tomorrowEndOfDay = moment.utc().add(1, 'day').endOf('day');
  //       setStartDate(tomorrow.toDate());
  //       setEndDate(tomorrowEndOfDay.toDate());
  //       break;
  //     case 'weekend':
  //       const saturday = moment.utc().isoWeekday(6).startOf('day');
  //       const sundayEndOfDay = moment.utc().isoWeekday(7).endOf('day');
  //       setStartDate(saturday.toDate());
  //       setEndDate(sundayEndOfDay.toDate());
  //       break;
  //     case 'week':
  //       const today = moment.utc().add(1, 'hours');
  //       const weekEndDay = moment.utc().isoWeekday(7).endOf('day');
  //       setStartDate(today.toDate());
  //       setEndDate(weekEndDay.toDate());
  //       break;
  //     case 'choose':
  //       const start = moment(currStartDate).utc().add(1, 'hour').startOf('day');
  //       const end = moment(currEndDate).utc().add(1, 'hour').endOf('day');
  //       setStartDate(start.toDate());
  //       setEndDate(end.toDate());
  //       break;
  //   }
    
  //   // setSelectedItemDate(currSelectedItem);

  //   handleClose();
  // }

  useEffect(() => {
    if (currStartDate > currEndDate) {
      setCurrEndDate(currStartDate);
    }
  }, [currStartDate]);
  

  return (
     <Modal
        animationType="slide"
        transparent={true}
        visible={isPopinVisible}
        onRequestClose={handleClose}
      > 
        <Pressable
          style={{flex: 1}}
          onPress={handleClose}
        >
          {/* Modal background */}
          <Animated.View 
            style={{
              flex: 1,
              opacity: opacity,
            }}
          >
            <BlurView
              intensity={10}
              tint="dark"
              style={{
                flex: 1,
              }}
            />
          </Animated.View>
          <View 
            style={style.modalContentContainer}
            onStartShouldSetResponder={() => true} 
          >
            <View>
              <TextItem 
                size="lg"
                weight="bold"
                style={{
                  marginLeft: 10,
                }}
              >{t('period.choose')}</TextItem>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  paddingTop: 10,
                }}
              >
                {periodsAvailable?.map((item: string, index: number) => (
                  <Pressable
                    key={`${item}-${index}`}
                    onPress={() => {
                      handleUpdatePeriod(item);
                    }}
                    style={[
                      style.item,
                      currSelectedItem === item && style.selectedItem
                    ]}
                  >
                    <TextItem 
                      style={{
                      ...style.itemText,
                      color: currSelectedItem === item ? '#3988FD' : 'black',
                      }}
                    >
                      {t(`period.${item}`)}
                    </TextItem>
                  </Pressable>
                ))}

                {/* Custom period */}
                <Pressable
                  style={[
                    style.item,
                    currSelectedItem === 'custom' && style.selectedItem
                  ]}
                  // style={{
                  //   display: 'flex',
                  //   flexDirection: 'row',
                  //   gap: 10,
                  //   alignItems: 'center',
                  //   paddingHorizontal: 10,
                  // }}
                  onPress={() => {
                    handleUpdatePeriod('custom');
                    // setCurrSelectedItem(filterDate.find(item => item.value === 'choose') ?? filterDate[0]);
                  }}
                >
                  <TextItem 
                    weight="light"
                    size="md"
                    style={{
                      ...style.itemText,
                      color: currSelectedItem === 'custom' ? '#3988FD' : 'black',
                      }}
                  >{`${t('period.from')} ${moment.utc(currStartDate).format('DD/MM/YYYY').toString()} ${t('period.to')} ${moment.utc(currEndDate).format('DD/MM/YYYY').toString()}`}</TextItem>
                  {/* <Pressable
                        onPress={() => {
                          // setCurrSelectedItem(filterDate.find(item => item.value === 'choose') ?? filterDate[0]);
                          setShowDatePicker('start');
                        }}
                        style={[
                          style.item,
                          currSelectedItem && style.selectedItem
                        ]}
                      >
                        <TextItem 
                          style={{
                            ...style.itemText,
                            color: '#3988FD',
                          }}
                        >
                          {moment.utc(currStartDate).format('DD/MM/YYYY').toString()}
                        </TextItem>
                        
                      </Pressable> */}
                  {/* <TextItem
                    weight="light"
                    size="md"
                  >{t('period.to')}</TextItem>
                  <Pressable
                    onPress={() => {
                      setShowDatePicker('end');
                    }}
                    style={[
                      style.item,
                      currSelectedItem && style.selectedItem
                    ]}
                  >
                    <TextItem 
                      style={{
                        ...style.itemText,
                        color: '#3988FD',
                      }}
                    >
                        {moment.utc(currEndDate).format('DD/MM/YYYY').toString()}
                    </TextItem>
                  </Pressable> */}
                </Pressable>

                <Pressable
                  onPress={() => {
                    handleConfirm();
                  }}
                >
                  <Animated.View
                      style={style.confirmButton}
                  >
                    <TextItem 
                      weight="bold"
                      style={{
                        color: 'white',
                      }}
                    >{t('button.confirm')}</TextItem>
                  </Animated.View>
                </Pressable>

                { showDatePicker && (
                  <DateTimePickerModalItem
                    setShowDatePicker={() => setShowDatePicker(undefined)}
                    handleOnChange={(event, selectedDate) => {
                      const currentDate = selectedDate || currStartDate;
                      if (showDatePicker === 'start') setCurrStartDate(currentDate);
                      if (showDatePicker === 'end') setCurrEndDate(currentDate);
                      setShowDatePicker(undefined);
                    }}
                    datePickerValue={showDatePicker === 'start' ? currStartDate : currEndDate}
                    minimumDate={showDatePicker === 'start' ? new Date() : currStartDate}
                  />
                )}
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
  );
}