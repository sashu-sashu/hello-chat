import React, { useState, useLayoutEffect, useCallback } from 'react';
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  MapView,
} from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import { db } from '../firebase';
//import custom CustomActions
import MediaActions from './MediaActions';

const renderInputToolbar = (props) =>
  props.isConnected ? <InputToolbar {...props} /> : null;

const renderBubble = (props) => {
  return (
    <Bubble
      {...props}
      timeTextStyle={{
        left: {
          color: '#000',
        },
        right: {
          color: '#000',
        },
      }}
    />
  );
};

const renderCustomView = (props) => {
  const { currentMessage } = props;
  if (currentMessage.location) {
    return (
      <MapView
        style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
        region={{
          latitude: currentMessage.location.latitude,
          longitude: currentMessage.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
  return null;
};

// creating the circle button
const renderMediaActions = (props) => {
  return <MediaActions {...props} />;
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const netInfo = useNetInfo();
  const username = route.params.name;
  const props = { route, netInfo, messages, styles, onSend };

  // Reference to the Firestore collection "messages"
  const firebaseQuery = query(
    collection(db, 'messages'),
    orderBy('created_at', 'desc')
  );

  useLayoutEffect(() => {
    let unsubscribe = () => {};

    if (netInfo.isConnected) {
      unsubscribe = onSnapshot(firebaseQuery, (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => {
            const { _id, createdAt, text, user } = doc.data();
            return {
              _id,
              createdAt: createdAt.toDate(),
              text: text || '',
              user,
            };
          })
        );
        saveMessages();
      });
    } else {
      if (messages.length === 0) {
        getMessages();
      }
    }

    return () => {
      unsubscribe();
    };
  }, [firebaseQuery, messages, netInfo.isConnected, saveMessages]);

  // gets messages from aync storage when user is offline
  const getMessages = async () => {
    try {
      let messageList = (await AsyncStorage.getItem('messages')) || [];
      setMessages(JSON.parse(messageList));
    } catch (error) {
      console.error(error.message);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
      setMessages([]);
    } catch (error) {
      console.error(error.message);
    }
  };

  // saves messages in aync storage
  const saveMessages = useCallback(async () => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messages));
    } catch (error) {
      console.error(error.message);
    }
  }, [messages]);

  const onSend = useCallback(
    (messages = []) => {
      const {
        _id,
        createdAt,
        text = '',
        user,
        image = null,
        location = null,
      } = messages[0];
      if (!text && !location && !image) {
        console.error('cannot send empty message');
      } else {
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, messages)
        );
        // adds messages to cloud storage
        addDoc(collection(db, 'messages'), {
          _id,
          createdAt,
          text,
          user,
          image,
          location,
        });
        // saves messages to async storage (for offline usage)
        saveMessages();
      }
    },
    [saveMessages]
  );

  return (
    <ActionSheetProvider>
      <View style={[styles.container, { backgroundColor: route.params.color }]}>
        <Text>Hi {username}!</Text>
        <Text>Welcome to the chat</Text>
        <GiftedChat
          inverted={true}
          disableComposer={!netInfo.isConnected}
          renderActions={renderMediaActions}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar(props)}
          renderCustomView={renderCustomView}
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
            name: username,
            avatar: 'https://placeimg.com/140/140/any',
          }}
        />
        {/* Avoid keyboard to overlap text messages on older Andriod versions  */}
        {Platform.OS === 'android' && (
          <KeyboardAvoidingView behavior="height" />
        )}
      </View>
    </ActionSheetProvider>
  );
};

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
  },
});

export default Chat;
