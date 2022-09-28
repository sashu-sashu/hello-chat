import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import backgroundImage from '../assets/bg.png';

// Create constant that holds background colors for Chat Screen
const colors = {
  black: '#090C08',
  purple: '#474056',
  grey: '#8A95A5',
  green: '#B9C6AE',
};

function Start() {
  const navigation = useNavigation();
  const [username, setUsername] = useState();
  let [color, setColor] = useState();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.title}>App title</Text>

        <View style={styles.box}>
          {/* Input box to set user name passed to chat screen */}
          <TextInput
            onChangeText={(name) => setUsername(name)}
            value={username}
            style={styles.input}
            placeholder="Your name..."
          />

          {/* Allow user to choose a background color for the chat screen */}
          <Text style={styles.text}>Choose Background Color:</Text>
          <View style={styles.colorContainer}>
            <TouchableOpacity
              style={[{ backgroundColor: colors.black }, styles.colorbutton]}
              onPress={() => setColor(colors.black)}
            />
            <TouchableOpacity
              style={[{ backgroundColor: colors.purple }, styles.colorbutton]}
              onPress={() => setColor(colors.purple)}
            />
            <TouchableOpacity
              style={[{ backgroundColor: colors.grey }, styles.colorbutton]}
              onPress={() => setColor(colors.grey)}
            />
            <TouchableOpacity
              style={[{ backgroundColor: colors.green }, styles.colorbutton]}
              onPress={() => setColor(colors.green)}
            />
          </View>

          {/* Open chatroom, passing user name and background color as props */}
          <Pressable
            onPress={() => {
              if (typeof username !== 'undefined') {
                navigation.navigate('Chat', { name: username, color });
              }
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? color : colors.black,
              },
              styles.button,
            ]}
          >
            <Text style={styles.buttontext}>Start Chatting</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#ffffff',
  },

  box: {
    width: '88%',
    backgroundColor: 'white',
    alignItems: 'center',
    height: '44%',
    justifyContent: 'space-evenly',
  },

  input: {
    height: 50,
    width: '88%',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },

  text: {
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
  },

  colorContainer: {
    width: '88%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  colorbutton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  button: {
    height: 50,
    width: '88%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttontext: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Start;
