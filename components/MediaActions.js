/* eslint-disable react/prop-types */
import React from 'react';
//import necessary components from react-native
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';

import { pickImage, takePhoto, getLocation } from '../utils/mediaActionHelpers';

const options = [
  'Choose From Library',
  'Take Picture',
  'Send Location',
  'Cancel',
];

export const getPermissions = async () => {
  if (Platform.OS === 'android') {
    let granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
    }
  }
};

const MediaActions = ({ onSend }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const cancelButtonIndex = options.findIndex((name) => name === 'Cancel');

  const onActionPress = () => {
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('user wants to pick an image');
            return pickImage(onSend);
          case 1:
            console.log('user wants to take a photo');
            return takePhoto(onSend);
          case 2:
            console.log('user wants to get their location');
            return getLocation(onSend);
          default:
        }
      }
    );
  };

  return (
    <TouchableOpacity
      accessible={true}
      accessibilityLabel="More options"
      accessibilityHint="Let’s you choose to send an image or your geolocation."
      style={[styles.container]}
      onPress={() => onActionPress()}
    >
      <View style={[styles.wrapper]}>
        <Text style={[styles.iconText]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default MediaActions;
