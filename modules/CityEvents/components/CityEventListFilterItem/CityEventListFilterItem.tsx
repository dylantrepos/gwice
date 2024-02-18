import { CalendarDays, ChevronDown, Euro, Filter } from "lucide-react-native";
import { Modal, Pressable, ScrollView, View, Animated, Platform } from 'react-native';
import style, { themeStyle } from './CityEventListFilterItem.style';
import { useEffect, useRef, useState } from "react";
import { BlurView } from 'expo-blur';
import moment from 'moment-timezone';
import { useDispatch, useSelector } from "react-redux";
import { FilterDateItem, filterDate } from "../../utils/events";
import { TextItem } from "../../../../components/TextItem/TextItem";
import { DateTimePickerModalItem } from "../../../../components/DateTimePickerModalItem/DateTimePickerModalItem";
import { IconItem } from "../../../../components/IconItem/IconItem";
import { RootState } from "../../../../store/store";


type CityEventListFilterItemProps = {
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedItemDate: FilterDateItem;
  setSelectedItemDate: React.Dispatch<React.SetStateAction<FilterDateItem>>;
}

export const CityEventListFilterItem = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedItemDate,
  setSelectedItemDate
}: CityEventListFilterItemProps) => {
  // Replace with your actual view
  const [isPopinVisible, setIsPopinVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { theme } = useSelector((state: RootState) => state.generalReducer);


  const handlePopin = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: 0,
      useNativeDriver: false,
    }).start();

    setIsPopinVisible(true);
  }

  return (
    <>
      <FilterDateModal
        animatedValue={animatedValue}
        isPopinVisible={isPopinVisible}
        setIsPopinVisible={setIsPopinVisible}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        selectedItemDate={selectedItemDate}
        setSelectedItemDate={setSelectedItemDate}
      />

      <ScrollView
        style={style.filterList}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 10,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <Pressable
          style={{
            ...style.filter,
            backgroundColor: themeStyle.filterBackgroundColor[theme] as string,
          }}
          onPress={handlePopin}
        >
          <IconItem
            size="md"
            stroke="light"
            IconElt={CalendarDays}
          />
          <TextItem 
            style={style.filterTitle}
          >
            {selectedItemDate.id !== 5
              ? selectedItemDate.label
              : moment.utc(startDate).format('DDMMYYYY').toString() !== moment.utc(endDate).format('DDMMYYYY').toString()
                ? `${moment.utc(startDate).format('DD/MM/YYYY')} - ${moment.utc(endDate).format('DD/MM/YYYY')}`
                : moment.utc(startDate).format('DD/MM/YYYY')
            }
          </TextItem>
          <IconItem
            size="md"
            stroke="light"
            IconElt={ChevronDown}
          />
        </Pressable>
        <View
          style={{
            ...style.filter,
            backgroundColor: themeStyle.filterBackgroundColor[theme] as string,
          }}
        >
          <IconItem
            size="md"
            stroke="light"
            IconElt={Euro}
          />
          <TextItem 
            style={style.filterTitle}
          >
            Tous les prix
          </TextItem>
          <IconItem
            size="md"
            stroke="light"
            IconElt={ChevronDown}
          />
        </View>
        <View
          style={{
            ...style.filter,
            backgroundColor: themeStyle.filterBackgroundColor[theme] as string,
          }}
        >
          <IconItem
            size="md"
            stroke="light"
            IconElt={Euro}
          />
          <TextItem 
            style={style.filterTitle}
          >
            Trier par
          </TextItem>
          <IconItem
            size="md"
            stroke="light"
            IconElt={ChevronDown}
          />
        </View>
      </ScrollView>
    </>
  );
}

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
  const [currSelectedItem, setCurrSelectedItem] = useState(filterDate[3]);
  const [currAnimValue, setCurrAnimValue] = useState(0);
  const [currStartDate, setCurrStartDate] = useState(startDate);
  const [currEndDate, setCurrEndDate] = useState(endDate);
  const [showDatePicker, setShowDatePicker] = useState<'start' | 'end' | undefined>();
  const opacity = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  useEffect(() => {
    const listener = animatedValue.addListener(({ value }) => setCurrAnimValue(value));
    if (currSelectedItem.value === 'choose') {
      if (
        (moment(currStartDate).format('DDMMYYYY').toString() === moment.utc(startDate).format('DDMMYYYY').toString() && moment(currEndDate).format('DDMMYYYY').toString() === moment.utc(endDate).format('DDMMYYYY').toString())) {
          Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: 150,
              useNativeDriver: false,
            }),
            Animated.timing(animatedValue, {
              toValue: 0,
              duration: 150,
              useNativeDriver: false,
            }),
          ]).start();

          return;
        }
      else {
        if (currAnimValue === 0) {
          Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: 0,
              duration: 150,
              useNativeDriver: false,
            }),
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: 150,
              useNativeDriver: false,
            }),
          ]).start();
        }

        return;
      }
    }

    const animateValue = (toValue1: number, toValue2: number) => {
      if (currAnimValue === toValue2) return;
    
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: toValue1,
          duration: 0,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: toValue2,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start();
    }
    
    animateValue(
      currSelectedItem.id === selectedItemDate.id ? 1 : 0, 
      currSelectedItem.id === selectedItemDate.id ? 0 : 1
    );

    return () => {
      animatedValue.removeListener(listener);
    };
  }, [currSelectedItem, currStartDate, currEndDate, isPopinVisible]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['lightgrey', '#3988FD'],
  });

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

  const handleConfirm = (item: string) => {
    switch (item) {
      case 'always':
        const nowHour = moment.utc().add(1, 'hour');
        const endYear = moment.utc().add(5, 'year').endOf('day');
        setStartDate(nowHour.toDate());
        setEndDate(endYear.toDate());
        break;
      case 'today':
        const now = moment.utc().add(1, 'hour');
        const endOfDay = moment.utc().add(1, 'hour').endOf('day');
        setStartDate(now.toDate());
        setEndDate(endOfDay.toDate());
        break;
      case 'tomorrow':
        const tomorrow = moment.utc().add(1, 'day').startOf('day');
        const tomorrowEndOfDay = moment.utc().add(1, 'day').endOf('day');
        setStartDate(tomorrow.toDate());
        setEndDate(tomorrowEndOfDay.toDate());
        break;
      case 'weekend':
        const saturday = moment.utc().isoWeekday(6).startOf('day');
        const sundayEndOfDay = moment.utc().isoWeekday(7).endOf('day');
        setStartDate(saturday.toDate());
        setEndDate(sundayEndOfDay.toDate());
        break;
      case 'week':
        const today = moment.utc().add(1, 'hours');
        const weekEndDay = moment.utc().isoWeekday(7).endOf('day');
        setStartDate(today.toDate());
        setEndDate(weekEndDay.toDate());
        break;
      case 'choose':
        const start = moment(currStartDate).utc().add(1, 'hour').startOf('day');
        const end = moment(currEndDate).utc().add(1, 'hour').endOf('day');
        setStartDate(start.toDate());
        setEndDate(end.toDate());
        break;
    }
    
    setSelectedItemDate(currSelectedItem);

    handleClose();
  }

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
              style={{ 
                paddingHorizontal: 20, 
                paddingVertical: 30,
                backgroundColor: 'white',
                position: 'absolute',
                bottom: 0,
                width: '100%',
                ...Platform.select({
                  ios: {
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: -3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,
                  },
                  android: {
                    elevation: 20,
                  },
                }),
              }}
              onStartShouldSetResponder={() => true} 
            >
              <View>
                <TextItem 
                  size="lg"
                  weight="bold"
                  style={{
                    marginLeft: 10,
                  }}
                >Choisir la période</TextItem>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    paddingTop: 10,
                  }}
                >
                  {filterDate.map((item, index) => (
                    item.value !== 'choose' && <Pressable
                      key={index}
                      onPress={() => {
                        setCurrSelectedItem(item);
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
                        {item.label}
                      </TextItem>
                    </Pressable>
                  ))}

                  <Pressable
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center',
                      paddingHorizontal: 10,
                    }}
                    onPress={() => {
                      setCurrSelectedItem(filterDate.find(item => item.value === 'choose') ?? filterDate[0]);
                    }}
                  >
                    <TextItem 
                      weight="light"
                      size="md"
                    >Du</TextItem>
                    <Pressable
                          onPress={() => {
                            setCurrSelectedItem(filterDate.find(item => item.value === 'choose') ?? filterDate[0]);
                            setShowDatePicker('start');
                          }}
                          style={[
                            style.item,
                            currSelectedItem.value ===  'choose' && style.selectedItem
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
                          
                        </Pressable>
                    <TextItem
                      weight="light"
                      size="md"
                    >au</TextItem>
                    <Pressable
                      onPress={() => {
                        setCurrSelectedItem(filterDate.find(item => item.value === 'choose') ?? filterDate[0]);
                        setShowDatePicker('end');
                      }}
                      style={[
                        style.item,
                        currSelectedItem.value ===  'choose' && style.selectedItem
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
                      
                    </Pressable>
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

                  <Pressable
                    onPress={() => {
                      if (currSelectedItem.value === 'choose'
                        && moment.utc(currStartDate).format('DDMMYYYY').toString() !== moment.utc(startDate).format('DDMMYYYY').toString() && moment.utc(currEndDate).format('DDMMYYYY').toString() !== moment.utc(endDate).format('DDMMYYYY').toString()
                      ) {
                        handleConfirm(currSelectedItem.value)
                      } else if (currSelectedItem.id !== selectedItemDate.id) {
                        handleConfirm(currSelectedItem.value)
                      }
                    }}
                  >
                    <Animated.View
                       style={{
                        backgroundColor: backgroundColor,
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                        borderRadius: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                      }}
                    >
                      <TextItem 
                        weight="bold"
                        style={{
                          color: 'white',
                        }}
                      >Valider</TextItem>
                    </Animated.View>
                  </Pressable>
                </View>
              </View>
            </View>
          </Pressable>
      </Modal>
  );
}