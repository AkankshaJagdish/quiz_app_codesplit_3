/**
 * @format
 */

// index.js
import { AppRegistry } from 'react-native';
import { ScriptManager, Script } from '@callstack/repack/client';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import App from './src/App';
import { name as appName } from './app.json';

import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage'; // import storage module separately
import { GOOGLE_SERVICES_JSON } from './android/app/google-services.json'; // import Firebase config object



// Initialize the Firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(GOOGLE_SERVICES_JSON);
}



ScriptManager.shared.setStorage(AsyncStorage);

// Add resolver to ScriptManager
ScriptManager.shared.addResolver(async (scriptId) => {  
  // In dev mode, resolve script location to local file
  if (__DEV__) {    
    const localFilePath = Script.getDevServerURL(scriptId);
    console.log('Resolved script URL:', localFilePath);
    return {
      url: localFilePath,
      cache: false,
    };
  }

  // In production mode, resolve script location to Firebase Cloud Storage URL
  const storageRef = storage().ref(`remote/${scriptId}.chunk.bundle`);
  console.log('Resolved script URL:', storageRef);
  const url = await storageRef.getDownloadURL();

  return {
    url,
    cache: true,
  };
});

AppRegistry.registerComponent(appName, () => App);
