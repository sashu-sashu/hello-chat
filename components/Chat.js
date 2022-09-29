/* eslint-disable react/prop-types */
import React from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

// Firebase Database
const firebase = require('firebase');
require('firebase/firestore');

import { firebaseConfig } from '../firebaseConfig';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      isConnected: false,
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      firebase
        .firestore()
        .settings({ experimentalForceLongPolling: true, merge: true });
    }
    // reference to messages collection
    this.referenceChatMessages = firebase.firestore().collection('messages');
    this.referenceMessagesUser = null;
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each doc
    querySnapshot.forEach((doc) => {
      // get the queryDocumentSnapshots data
      var data = doc.data();
      messages.push({
        _id: data._id,
        createdAt: data.createdAt.toDate(),
        text: data.text,
        uid: data.uid,
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages,
    });
  };

  // retrieve chat messages from asyncStorage
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages');
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // stores chat messages in asyncStorage
  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        'messages',
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  // deletes chat messages in asyncStorage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    // required for listing name in default message
    // used to display title/name at very top of page
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    // retrieves chat messages from asyncStorage instead of filling message state with static data
    this.getMessages();

    // reference to messages collection
    this.referenceChatMessages = firebase.firestore().collection('messages');
    // authentication listener
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }

      // update user state
      this.setState({
        uid: user.uid,
        loggedInText: 'You are logged in',
        user: {
          // anonymous user doesn't have _id attached to user object so the app breaks when trying to send a message
          // when you hit send message, the app doesn't know what _id stands for
          // thus, || user.uid was added because it is the only unique thing that can be used else
          _id: user._id || user.uid,
          name: name,
          avatar: 'https://placeholder.com/140/140/any',
        },
      });

      this.unsubscribe = this.referenceChatMessages
        .orderBy('createdAt', 'desc')
        .onSnapshot(this.onCollectionUpdate);
    });

    // reference to active messages collection
    this.referenceMessagesUser = firebase
      .firestore()
      .collection('messages')
      .where('uid', '==', this.state.uid);

    // checks if user is online or not
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log('online');
      } else {
        this.setState({ isConnected: false });
        console.log('offline');
      }
    });
  }

  componentWillUnmount() {
    // unsubscribe() used to stop receiving updates from collection
    this.unsubscribe();
    this.authUnsubscribe();
  }

  // adds messages to state
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage(messages[0]);
        this.saveMessages(messages);
        this.deleteMessages(messages);
      }
    );
  }

  // adds messages to store
  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text || '',
      user: this.state.user,
      image: message.image || null,
      location: message.location || null,
    });
  }

  // customize style of message bubble
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#5c5d5e',
          },
        }}
      />
    );
  }

  // hides chat input to prevent usage when offline
  renderInputToolbar(props) {
    if (this.state.isConnected) {
      return <InputToolbar {...props} />;
    }
    return <></>;
  }

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  renderCustomView(props) {
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
  }

  handleLongPress(context) {
    console.log('long press function');
    const options = ['Delete Message', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('deleting message');
            break;
          default:
            break;
        }
      }
    );
  }

  render() {
    // sets selected background color from start page
    let { bgColor } = this.props.route.params;

    return (
      <View
        style={{
          backgroundColor: bgColor,
          flex: 1,
        }}
      >
        <GiftedChat
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          onLongPress={this.handleLongPress}
          user={{
            _id: this.state.user._id,
            name: this.state.user.avatar,
            avatar: this.state.user.avatar,
          }}
        />

        {/* component for Android so that the input field won’t be hidden beneath the keyboard */}
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
