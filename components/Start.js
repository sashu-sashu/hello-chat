/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import backgroundImage from '../assets/bg.png';

export default class Start extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
    this.state = {
      bgColor: '#5f9ea0',
    };
  }

  // Update background color for chatscreen
  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  colors = {
    black: '#090C08',
    purple: '#474056',
    gray: '#8A95A5',
    green: '#B9C6AE',
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={{ flex: 1, justifyContent: 'center', width: 400 }}
        >
          <View style={{ flex: 0.48, alignItems: 'center', marginTop: 60 }}>
            <Text style={{ fontSize: 45, fontWeight: '600', color: '#fff' }}>
              Chat App
            </Text>
          </View>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'space-between',
              backgroundColor: 'white',
              width: 350,
              height: 150,
              margin: 25,
              opacity: 0.9,
            }}
          >
            <TextInput
              style={{
                flex: 0.7,
                margin: 18,
                borderColor: 'gray',
                borderWidth: 1,
                padding: 10,
                fontWeight: '300',
                fontSize: 16,
                color: '#757083',
                textAlign: 'center',
              }}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder="Your Name"
            ></TextInput>
            <View style={{ flex: 2, paddingTop: 15 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '300',
                  color: '#757083',
                  opacity: 1,
                  marginLeft: 15,
                  marginBottom: 12,
                }}
              >
                Choose Background Color:
              </Text>

              {/* Background color options - User can select the color of the chatscreen */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: '#090C08',
                    width: 50,
                    height: 50,
                    borderRadius: 50 / 2,
                  }}
                  onPress={() => this.changeBgColor(this.colors.black)}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#474056',
                    width: 50,
                    height: 50,
                    borderRadius: 50 / 2,
                  }}
                  onPress={() => this.changeBgColor(this.colors.purple)}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#8A95A5',
                    width: 50,
                    height: 50,
                    borderRadius: 50 / 2,
                  }}
                  onPress={() => this.changeBgColor(this.colors.gray)}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#B9C6AE',
                    width: 50,
                    height: 50,
                    borderRadius: 50 / 2,
                  }}
                  onPress={() => this.changeBgColor(this.colors.green)}
                />
              </View>
            </View>
            <View style={{ flex: 1, margin: 15, height: 50 }}>
              <TouchableOpacity
                title="Start Chatting"
                onPress={() =>
                  this.props.navigation.navigate('Chat', {
                    name: this.state.name,
                    bgColor: this.state.bgColor,
                  })
                }
                style={{
                  flex: 1,
                  height: 100,
                  backgroundColor: '#757083',

                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: '600', color: '#FFF' }}
                >
                  Start Chatting
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
