import React, {useState,useEffect,useCallback} from 'react'
import {View, Text,Platform,
    KeyboardAvoidingView,StyleSheet} from 'react-native';
import { GiftedChat, Bubble} from 'react-native-gifted-chat'
import { useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';

const initialMessages = [
    {
      _id: 1,
      text: 'Hi Sasha, i hope you are fine today',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Can you please send me the pictures of yesterday?',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
    {
      _id: 2,
      text: 'Yes, I am doing fine',
      createdAt: new Date(),
      user: {
        _id: 1,
      },
    },
    {
      _id: 3,
      text: 'Could you please send me the pictures you took at the museum?',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },  
    {
      _id: 4,
      text: 'I am busy now finishing my chat app. maybe later.',
      createdAt: new Date(),
      user: {
        _id: 1,
      },
    },
    {
      _id: 5,
      text: 'Sure, take your timne.',
      createdAt: new Date(),
      user: {
        _id: 1,
      },
    },  
  ];

const renderBubble = (props)=> {
    return <Bubble {...props} 
      wrapperStyle={{
          left: {
            backgroundColor: '#00E6BE',
          },
          right: {
            backgroundColor: '#0059F0'
          }
        }} 

      timeTextStyle={{
        left: {
          color: '#000',
        },
        right: {
          color: '#000',
        },
      }}
    />
}


function Chat() {
    const [messages, setMessages] = useState([]);
    const route = useRoute();

    const username = route.params.name

    useEffect(() => {
        setMessages(initialMessages)
      }, [])
    
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])
    
  return (
    <View style={styles.container}>
        <Text>Hi {username}!</Text>
        <Text>Welcome to the chat</Text>
        <GiftedChat
            inverted={true}
            renderBubble={renderBubble}
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
                name: username,
                avatar: 'https://placeimg.com/140/140/any'
            }}
        />
        {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#fff',
      padding: 8,
    },
    checkboxView: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      flex: 1,
    }
  });

export default Chat