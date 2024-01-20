import React, { useState } from 'react';
import { View, Modal, Button, Text, Pressable, TextInput } from 'react-native';
import style from './WeatherModal.style';
import { useDispatch } from 'react-redux';
import { store } from '../../store/store';
import { setWeatherSettings } from '../../reducers/generalReducer';

type Props = {
  modalVisible: boolean,
  toggleModal: () => void
}

export const WeatherModal = ({
  modalVisible,
  toggleModal
}: Props) => {
  const dispatch = useDispatch();
  const laps = store.getState().general.weatherSettings.laps.toString();
  const range = store.getState().general.weatherSettings.range.toString();
  const [currLaps, setCurrLaps] = useState(+laps);
  const [currRange, setCurrRange] = useState(+range);

  const handleLapsChange = (value: number) => {
    setCurrLaps(value);
  };

  const handleRangeChange = (value: number) => {
    setCurrRange(value);
  };

  const handleCloseModal = () => { 
    dispatch(setWeatherSettings({
      laps: currLaps.toString(),
      range: currRange.toString()
    }));
    toggleModal();
  }

  return (
    <Modal 
      visible={modalVisible} animationType="slide"
      style={style.weatherModal}
    >
      <Text style={style.weatherModalTitle}>WEATHER SETTINGS</Text>
      <View style={style.weatherInputContainer}>
        <Text style={style.weatherInputDescription}>Hourly steps</Text>
        <View style={style.weatherInputRadioContainer}>
          <Pressable  
            style={style.weatherInputRadio}
            onPress={() => {
              if (currLaps > 1) {
                setCurrLaps(+currLaps - 1);
              }
            }} 
          >
            <Text style={style.weatherInputRadioText}>-</Text>
          </Pressable>
          <Text style={style.weatherInputText}>{currLaps}</Text>
          <Pressable 
            style={style.weatherInputRadio}
            onPress={() => {
              if (currLaps < 6) {
                setCurrLaps(currLaps + 1);
              }
            }} 
          >
            <Text style={style.weatherInputRadioText}>+</Text>
          </Pressable>
        </View>
      </View>
      <View style={style.weatherInputLine} />
      <View style={style.weatherInputContainer}>
        <Text style={style.weatherInputDescription}>Meteo forecast</Text>
        <View style={style.weatherInputRadioContainer}>
          <Pressable  
            style={style.weatherInputRadio}
            onPress={() => {
              if (currRange > 1) {
                setCurrRange(+currRange - 1);
              }
            }} 
          >
            <Text style={style.weatherInputRadioText}>-</Text>
          </Pressable>
          <Text style={style.weatherInputText}>{currRange}</Text>
          <Pressable 
            style={style.weatherInputRadio}
            onPress={() => {
              if (currRange < 24) {
                setCurrRange(currRange + 1);
              }
            }} 
          >
            <Text style={style.weatherInputRadioText}>+</Text>
          </Pressable>
        </View>
      </View>
      <Pressable
        onPress={handleCloseModal}
        style={style.closeButton}
      >
        <Text style={style.closeButtonText}>Save settings</Text>
      </Pressable>
    </Modal>
  );
};

