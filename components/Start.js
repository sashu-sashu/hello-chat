import React from 'react'
import { useNavigation } from '@react-navigation/native';
import {View, Text, Button} from 'react-native';

function Start() {
const navigation = useNavigation();
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Start screen!</Text>
        <Button
          title="Go to Chat"
          onPress={() => navigation.navigate('Chat')}
        />
      </View>
  )
}

export default Start