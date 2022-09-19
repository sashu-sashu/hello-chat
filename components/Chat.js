import React, {useState,useLayoutEffect,useCallback} from 'react'
import {View, Text,Platform,
    KeyboardAvoidingView,StyleSheet} from 'react-native';
import { GiftedChat, Bubble} from 'react-native-gifted-chat'
import { useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';


import { db } from '../firebase';


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

    useLayoutEffect(() => {
        const firebaseQuery = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(firebaseQuery, (snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
            }))
        ));
       return () => {
          unsubscribe();
        };
      }, [])
    
    const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const { _id, createdAt, text, user,} = messages[0]

    addDoc(collection(db, 'messages'), { _id, createdAt,  text, user });
}, []);
    
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