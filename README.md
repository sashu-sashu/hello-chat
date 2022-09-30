# Chat App (hello-chat)

<br>

## Description

This application is a chat room where multiple users can join and share text messages, images, and their location.

<br>

## Installation & Configuration

### Expo

Expo provides tools that can help get you started and speeds up the app development. It has its own SDK(software development kit) which offers features that include access to the camera, retrieving geolocations and so on.

1. To create new projects and start running Expo, you’ll need to install the Expo Command Line Interface (CLI) on your machine.

```
npm install expo-cli --g
```

2. Download Expo App to your device
3. Signup for an Expo account
4. Go to your terminal, navigate to the repository and enter
5. create an .env file with:
   REACT_APP_API_KEY=<REACT_APP_API_KEY>
   REACT_APP_AUTH_DOMAIN=<REACT_APP_AUTH_DOMAIN>
   REACT_APP_PROJECT_ID=<REACT_APP_PROJECT_ID>
   REACT_APP_STORAGE_BUCKET=<REACT_APP_STORAGE_BUCKET>
   REACT_APP_MESSAGING_SENDER_ID=<REACT_APP_MESSAGING_SENDER_ID>
   REACT_APP_ID=<REACT_APP_ID>

```
expo start
```

(be sure to configure your database and emulator prior to launching the demo)

<br>d R

### [Android Studio](https://developer.android.com/studio)

Android Studio creates virtual devices to allow testing and preview of the app on a android operating system.

- Android Studio Emulator <br>
  - For information to run the Android Emulator, [please click here for full instuctions](https://developer.android.com/studio/run/emulator).

### [Google Firebase](https://firebase.google.com/)

Firebase is being used as a cloud-based storage platform for the app.

1. Sign in to Google Firebase and select **Add Project**, then set up your project.
2. Then select **Firebase Database** from the options on the left under **Build**.
3. Select **Start in Test Mode**, choose your region, then create a collection.
4. To set authentication, go to **Project Settings** and click **Register** to recieve the configuration code.
5. This code is required for your app in order to use the firebase as your data storage.
   - This code can be viewed in my chatscreen.js file.

<br>

## Dependencies:

- React-Native
- Expo
- Google Firebase
- Android Studio - Emulator
- xCode - Simulator
