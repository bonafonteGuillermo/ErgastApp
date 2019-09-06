import AsyncStorage from '@react-native-community/async-storage';

export default class LocalStorageManager {
    
    saveDriverInLocalStorage = async (driverId) => {
        const res = await AsyncStorage.setItem(driverId, 'true').catch(error => {
            console.log('saveDriverInLocalStorage'+error);
          })
        return res;
    }

    removeDriverFromLocalStorage = async (driverId) => {
        return await AsyncStorage.removeItem(driverId).catch(error => {
            console.log('removeDriverFromLocalStorage'+error);
          })
    }

    isDriverSavedLocalStorage = async (driverId) => {
        return await AsyncStorage.getItem(driverId).catch(error => {
            console.log('isDriverSavedLocalStorage'+error);
          });
    }
}