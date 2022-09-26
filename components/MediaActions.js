/* eslint-disable react/prop-types */
import React from 'react';
//import necessary components from react-native
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import onActionPress from '../utils/mediaActions'


const MediaActions = () => {
    return (
      <TouchableOpacity
       accessible={true}
       accessibilityLabel="More options"
       accessibilityHint="Let’s you choose to send an image or your geolocation."
       style={[styles.container]}
       onPress={onActionPress}>
        <View style={[styles.wrapper]}>
          <Text style={[styles.iconText]}>+</Text>
        </View>
      </TouchableOpacity>
    );
}

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