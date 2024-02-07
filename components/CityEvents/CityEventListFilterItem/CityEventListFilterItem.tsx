import { CalendarDays, ChevronDown, Euro, Filter, X } from "lucide-react-native";
import { Modal, Pressable, ScrollView, View, Animated, Platform, Dimensions } from 'react-native';
import { Text } from "../../Text/Text";
import style from './CityEventListFilterItem.style';
import { useEffect, useRef, useState } from "react";
import { BlurView } from 'expo-blur';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { City } from '../../../cities/types/City';
import moment from 'moment-timezone';
import { FilterDateItem, filterDate } from "../../../utils/events";



const formatDate = (date: Date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

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
  const [itemHeight, setItemHeight] = useState(0);
  const [currSelectedItem, setCurrSelectedItem] = useState(filterDate[3]);
  const opacity = useRef(new Animated.Value(0)).current;
  

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);


  const handlePopin = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: 0,
      useNativeDriver: false,
    }).start();

    setIsPopinVisible(true);
  }

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
      const now    = moment.tz("Europe/Paris").add(1, 'hours');
      const endOfDay = moment.tz("Europe/Paris").endOf('day').add(1, 'hours');

      setStartDate(now.toDate());
      setEndDate(endOfDay.toDate());
    }
    if (item === 'tomorrow') {
      const tomorrow = moment.tz("Europe/Paris").add(1, 'days');
      const tomorrowEndOfDay = moment(tomorrow).endOf('day').add(1, 'hours');

      setStartDate(tomorrow.toDate());
      setEndDate(tomorrowEndOfDay.toDate());
    }
    if (item === 'weekend') {
      const saturday = moment.tz("Europe/Paris").isoWeekday(6);
      const sundayEndOfDay = moment(saturday).add(1, 'days').endOf('day').add(1, 'hours');
      
      setStartDate(saturday.toDate());
      setEndDate(sundayEndOfDay.toDate());
    }
    if (item === 'week') {
      const today = moment.tz("Europe/Paris").add(1, 'hours');
      const sundayEndOfDay = moment(today).add(7, 'days').endOf('day').add(1, 'hours');

      setStartDate(today.toDate());
      setEndDate(sundayEndOfDay.toDate());
    }
    setCurrSelectedItem(selectedItemDate);

    handleClose();
  }

  useEffect(() => {
    if (startDate > endDate) {
      setEndDate(startDate);
    }
  }, [startDate]);

  return (
    <>
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
                        setSelectedItemDate(item);
                      }}
                      style={[
                        style.item,
                        selectedItemDate === item && style.selectedItem
                      ]}
                    >
                      <Text 
                        styles={{
                        ...style.itemText,
                        color: selectedItemDate === item ? '#3988FD' : 'black',
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
                      setSelectedItemDate(filterDate.find(item => item.value === 'choose') ?? filterDate[0]);
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
                            setSelectedItemDate(filterDate.find(item => item.value === 'choose') ?? filterDate[0]);
                          }}
                          style={[
                            style.item,
                            selectedItemDate.value ===  'choose' && style.selectedItem
                          ]}
                        >
                          <Text 
                            styles={{
                              ...style.itemText,
                              color: '#3988FD',
                            }}
                          >
                            {startDate.toLocaleDateString('fr-FR', { timeZone: 'UTC' })}
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
                        setSelectedItemDate(filterDate.find(item => item.value === 'choose') ?? filterDate[0]);
                      }}
                      style={[
                        style.item,
                        selectedItemDate.value ===  'choose' && style.selectedItem
                      ]}
                    >
                      <Text 
                        styles={{
                          ...style.itemText,
                          color: '#3988FD',
                        }}
                      >
                        {endDate.toLocaleDateString('fr-FR', { timeZone: 'UTC' })}
                      </Text>
                      
                    </Pressable>
                  </Pressable>

                  { showStartDatePicker && (
                     Platform.OS === 'ios' ? (
                        <Pressable
                          onPress={() => {
                            setShowStartDatePicker(false);
                            console.log('dim : ', Dimensions.get('screen').height);
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
                              mode="date"
                              display="inline"
                              onChange={(event, selectedDate) => {
                                const currentDate = selectedDate || startDate;
                                console.log('currentDate', currentDate);
                                setStartDate(currentDate);
                                setShowStartDatePicker(false);
                              }}
                            />
                        </Pressable>
                    ) : (
                          <DateTimePicker
                            value={startDate}
                            
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                              const currentDate = selectedDate || startDate;
                              console.log('currentDate', currentDate);
                              setStartDate(currentDate);
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
                            console.log('dim : ', Dimensions.get('screen').height);
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
                              value={endDate}
                              mode="date"
                              display="inline"
                              testID="datePicker2"
                              minimumDate={startDate}
                              onChange={(event, selectedDate) => {
                                const currentDate = selectedDate || startDate;
                                setEndDate(currentDate);
                                setShowEndDatePicker(false);
                              }}
                            />
                        </Pressable>
                    ) : (
                          <DateTimePicker
                            value={endDate}
                            mode="date"
                            display="default"
                            testID="datePicker2"
                            minimumDate={startDate}
                            onChange={(event, selectedDate) => {
                              const currentDate = selectedDate || startDate;
                              setEndDate(currentDate);
                              setShowEndDatePicker(false);
                            }}
                          />
                        )
                    )}

                  <Pressable
                    onPress={() => handleConfirm(selectedItemDate.value)}
                    style={{
                      backgroundColor: '#3988FD',
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
                  </Pressable>
                </View>
              </View>
            </View>
          </Pressable>
      </Modal>



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
            {currSelectedItem.id !== 5
              ? currSelectedItem.label
              : formatDate(startDate) !== formatDate(endDate) 
                ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                : startDate.toLocaleDateString()
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