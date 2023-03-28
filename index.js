/**
 * @format
 */

// index.js
import { AppRegistry } from 'react-native';
import { ScriptManager, Script } from '@callstack/repack/client';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import App from './src/App';
import { name as appName } from './app.json';

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

  // In production mode, resolve script location to URL
  const url = Script.getRemoteURL(`http://somewhere-on-the-internet.com/${scriptId}`);
  console.log('Resolved script URL:', url);
  return {
    url,
    cache: true,
  };
});

AppRegistry.registerComponent(appName, () => App);
