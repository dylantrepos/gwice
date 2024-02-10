import { CalendarDays, ChevronDown, Euro, Filter, List, X } from "lucide-react-native";
import { Modal, Pressable, ScrollView, View, Animated, Platform, Dimensions } from 'react-native';
import { Text } from "../../Text/Text";
import style from './CityEventListFilterItem.style';
import { useEffect, useRef, useState } from "react";
import { BlurView } from 'expo-blur';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { City } from '../../../cities/types/City';
import moment from 'moment-timezone';
import { FilterDateItem, filterDate } from "../../../utils/events";



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


  const handlePopin = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: 0,
      useNativeDriver: false,
    }).start();

    setIsPopinVisible(true);
  }

  useEffect(() => {
    console.log('[USE EFFECT] : ',{
      startDate,
      endDate,
    });
  }, [startDate, endDate]);

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
          style={style.filter}
          onPress={handlePopin}
        >
          <CalendarDays
            size={22}
            color="black"
            strokeWidth={2}
            style={style.filterIcon}
          />
          <Text 
            styles={style.filterTitle}
          >
            {selectedItemDate.id !== 5
              ? selectedItemDate.label
              : moment.utc(startDate).format('DDMMYYYY').toString() !== moment.utc(endDate).format('DDMMYYYY').toString()
                ? `${moment.utc(startDate).format('DD/MM/YYYY')} - ${moment.utc(endDate).format('DD/MM/YYYY')}`
                : moment.utc(startDate).format('DD/MM/YYYY')
            }
          </Text>
          <ChevronDown
            size={22}
            color="black"
            strokeWidth={2}
            style={style.filterIcon}
          />
        </Pressable>
        <View
          style={style.filter}
        >
          <Euro
            size={22}
            color="black"
            strokeWidth={2}
            style={style.filterIcon}
          />
          <Text 
            styles={style.filterTitle}
          >
            Tous les prix
          </Text>
          <ChevronDown
            size={22}
            color="black"
            strokeWidth={2}
            style={style.filterIcon}
          />
        </View>
        <View
          style={style.filter}
        >
          <Filter
            size={22}
            color="black"
            strokeWidth={2}
            style={style.filterIcon}
          />
          <Text 
            styles={style.filterTitle}
          >
            Trier par
          </Text>
          <ChevronDown
            size={22}
            color="black"
            strokeWidth={2}
            style={style.filterIcon}
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
  const opacity = useRef(new Animated.Value(0)).current;
  const [currAnimValue, setCurrAnimValue] = useState(0);
  const [currStartDate, setCurrStartDate] = useState(startDate);
  const [currEndDate, setCurrEndDate] = useState(endDate);


  useEffect(() => {
    const listener = animatedValue.addListener(({ value }) => setCurrAnimValue(value));
    if (currSelectedItem.value === 'choose') {
      if (
        (moment(currStartDate).format('DDMMYYYY').toString() === moment.utc(startDate).format('DDMMYYYY').toString() && moment(currEndDate).format('DDMMYYYY').toString() === moment.utc(endDate).format('DDMMYYYY').toString())) {
          console.log('yes : ', {
            currStartDate,
            startDate,
            currEndDate,
            endDate,
          });
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
    
    if (currSelectedItem.id === selectedItemDate.id) {
      if(currAnimValue === 0) return;

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
    } else {
      if (currAnimValue === 1) return;

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

    return () => {
      animatedValue.removeListener(listener);
    };
  }, [currSelectedItem, currStartDate, currEndDate, isPopinVisible]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['lightgrey', '#3988FD'],
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

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
    if (item === 'today') {
      const now = moment.utc().add(1, 'hour');
      const endOfDay = moment.utc().add(1, 'hour').endOf('day');
      

      setStartDate(now.toDate());
      setEndDate(endOfDay.toDate());
    }
    if (item === 'tomorrow') {
      const tomorrow = moment.utc().add(1, 'day').startOf('day');
      const tomorrowEndOfDay = moment.utc().add(1, 'day').endOf('day');

      setStartDate(tomorrow.toDate());
      setEndDate(tomorrowEndOfDay.toDate());
    }
    if (item === 'weekend') {
      const saturday = moment.utc().isoWeekday(6).startOf('day');
      const sundayEndOfDay = moment.utc().isoWeekday(7).endOf('day');
      
      setStartDate(saturday.toDate());
      setEndDate(sundayEndOfDay.toDate());
    }
    if (item === 'week') {
      const today = moment.utc().add(1, 'hours');
      const sundayEndOfDay = moment.utc().isoWeekday(7).endOf('day');

      setStartDate(today.toDate());
      setEndDate(sundayEndOfDay.toDate());
    }
    if (item === 'choose') {

      const start = moment(currStartDate).utc().add(1, 'hour').startOf('day');
      const end = moment(currEndDate).utc().add(1, 'hour').endOf('day');

      setStartDate(start.toDate());
      setEndDate(end.toDate());
    }
    setSelectedItemDate(currSelectedItem);

    handleClose();
  }

  useEffect(() => {
    if (currStartDate > currEndDate) {
      setCurrEndDate(currStartDate);
    }
    console.log('currStartDate :', currStartDate);
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
                <Text 
                  weight="600"
                  styles={{
                    fontSize: 18,
                    marginLeft: 10,
                  }}
                >Choisir la période</Text>

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
                      <Text 
                        styles={{
                        ...style.itemText,
                        color: currSelectedItem === item ? '#3988FD' : 'black',
                        }}
                      >
                        {item.label}
                      </Text>
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
                    <Text 
                      weight="400"
                      styles={{
                        fontSize: 14,
                      }}
                    >Du</Text>
                    <Pressable
                          onPress={() => {
                            setShowStartDatePicker(true);
                            setCurrSelectedItem(filterDate.find(item => item.value === 'choose') ?? filterDate[0]);
                          }}
                          style={[
                            style.item,
                            currSelectedItem.value ===  'choose' && style.selectedItem
                          ]}
                        >
                          <Text 
                            styles={{
                              ...style.itemText,
                              color: '#3988FD',
                            }}
                          >
                            {moment(currStartDate).utc().toDate().toLocaleDateString('fr-FR')}
                          </Text>
                          
                        </Pressable>
                    <Text
                      weight="400"
                      styles={{
                        fontSize: 14,
                      }}  
                    >au</Text>
                    <Pressable
                      onPress={() => {
                        setShowEndDatePicker(true);
                        setCurrSelectedItem(filterDate.find(item => item.value === 'choose') ?? filterDate[0]);
                      }}
                      style={[
                        style.item,
                        currSelectedItem.value ===  'choose' && style.selectedItem
                      ]}
                    >
                      <Text 
                        styles={{
                          ...style.itemText,
                          color: '#3988FD',
                        }}
                      >
                         {moment(currEndDate).utc().toDate().toLocaleDateString('fr-FR')}
                      </Text>
                      
                    </Pressable>
                  </Pressable>

                  { showStartDatePicker && (
                     Platform.OS === 'ios' ? (
                        <Pressable
                          onPress={() => {
                            setShowStartDatePicker(false);
                          }}
                          style={{
                            position: 'absolute',
                            // top: 0,
                            height: Dimensions.get('screen').height,
                            bottom: -30,
                            justifyContent: 'center',
                            alignContent: 'center',
                            left: -20,
                            right: -20,
                            zIndex: 1000,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            paddingHorizontal: 5,
                            flex: 1,
                          }}
                        >
                            <DateTimePicker
                              value={startDate}
                              style={{
                                borderRadius: 10,
                                // backgroundColor: 'white',
                                padding: 10,
                                shadowColor: '#000',
                                shadowOffset: {
                                  width: 0,
                                  height: 5,
                                },
                                shadowOpacity: .5,
                                shadowRadius: 6,
                              }}
                              mode="date"
                              display="inline"
                              minimumDate={currStartDate}
                              onChange={(event, selectedDate) => {
                                const currentDate = selectedDate || startDate;
                                setCurrStartDate(currentDate);
                                setShowStartDatePicker(false);
                              }}
                              />
                        </Pressable>
                    ) : (
                      <DateTimePicker
                        value={startDate}
                      
                        minimumDate={currStartDate}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                              const currentDate = selectedDate || startDate;
                              setCurrStartDate(currentDate);
                              setShowStartDatePicker(false);
                            }}
                          />
                        )
                    )}

                  { showEndDatePicker && (
                     Platform.OS === 'ios' ? (
                        <Pressable
                          onPress={() => {
                            setShowEndDatePicker(false);
                          }}
                          style={{
                            position: 'absolute',
                            // top: 0,
                            height: Dimensions.get('screen').height,
                            bottom: -30,
                            justifyContent: 'center',
                            alignContent: 'center',
                            left: -20,
                            right: -20,
                            zIndex: 1000,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            paddingHorizontal: 5,
                            flex: 1,
                          }}
                        >
                            <DateTimePicker
                             
                              style={{
                                borderRadius: 10,
                                backgroundColor: 'white',
                                padding: 10,
                                shadowColor: '#000',
                                shadowOffset: {
                                  width: 0,
                                  height: 5,
                                },
                                shadowOpacity: .5,
                                shadowRadius: 6,
                              }}
                              value={currEndDate}
                              mode="date"
                              display="inline"
                              testID="datePicker2"
                              minimumDate={currStartDate}
                              onChange={(event, selectedDate) => {
                                const currentDate = selectedDate || currStartDate;
                                setCurrEndDate(currentDate);
                                setShowEndDatePicker(false);
                              }}
                            />
                        </Pressable>
                    ) : (
                          <DateTimePicker
                            value={currEndDate}
                            mode="date"
                            display="default"
                            testID="datePicker2"
                            minimumDate={currStartDate}
                            onChange={(event, selectedDate) => {
                              const currentDate = selectedDate || currStartDate;
                              setCurrEndDate(currentDate);
                              setShowEndDatePicker(false);
                            }}
                          />
                        )
                    )}

                  <Pressable
                    onPress={() => {
                      if (currSelectedItem.value === 'choose'
                        && moment.utc(currStartDate).format('DDMMYYYY').toString() !== moment.utc(startDate).format('DDMMYYYY').toString() && moment.utc(currEndDate).format('DDMMYYYY').toString() !== moment.utc(endDate).format('DDMMYYYY').toString()
                      ) {
                        handleConfirm(currSelectedItem.value)
                      } else if (currSelectedItem.id !== selectedItemDate.id) {
                        console.log('currSelectedItem.id !== selectedItemDate.id : ', currSelectedItem.id !== selectedItemDate.id);
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
                      <Text 
                        weight="600"
                        styles={{
                          color: 'white',
                        }}
                      >Valider</Text>
                    </Animated.View>
                  </Pressable>
                </View>
              </View>
            </View>
          </Pressable>
      </Modal>
  );
}