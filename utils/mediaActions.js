//import permissions and imagepicker
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from "expo-location";
import firebase from "firebase";
import "firebase/firestore";

// * Upload images to firebase

export const imageUpload = async (uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const imageNameBefore = uri.split("/");
  const imageName = imageNameBefore[imageNameBefore.length - 1];

  const ref = firebase.storage().ref().child(`images/${imageName}`);
  const snapshot = await ref.put(blob);

  blob.close();

  return await snapshot.ref.getDownloadURL();
}

//* Let the user pick an image from the device's image library

export const pickImage = async (onSend) => {
  // expo permission
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  try {
    if (status === 'granted') {
       // pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,  // only images are allowed
      }).catch(error => console.log(error));

      // canceled process
      if (!result.cancelled) {
        const imageUrl = await imageUpload(result.uri);
        onSend({ image: imageUrl });
      }
    }
  } catch (error) {
    console.error(error);
  }
}

//* Let the user take a photo with device's camera

export const takePhoto = async (onSend) => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();

  try {
    if (status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      }).catch(error => console.log(error));

      if (!result.cancelled) {
        const imageUrl = await imageUpload(result.uri);
        onSend({ image: imageUrl });
      }
    }
  } catch (error) {
    console.error(error.message);
  }
}

//* get the location of the user by using GPS

export const getLocation = async (onSend) => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);

  try {
    if (status === 'granted') {
      let result = await Location.getCurrentPositionAsync({}).catch(error => console.log(error));


      if (result) {
        console.log(result);
        onSend({
          location: {
            longitude: result.coords.longitude,
            latitude: result.coords.latitude,
          },
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
}



export const onActionPress = (context) => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('user wants to pick an image');
            return pickImage();
          case 1:
            console.log('user wants to take a photo');
            return takePhoto();
          case 2:
            console.log('user wants to get their location');
            return getLocation();
          default:
        }
      },
    );
  };