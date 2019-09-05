import AsyncStorage from '@react-native-community/async-storage';

export default class LocalStorageManager {
    
    saveDriverInLocalStorage = async (driverId) => {
        const res = await AsyncStorage.setItem(driverId, true);
        return res;
    }

    removeDriverFromLocalStorage = async (driverId) => {
        const res = await AsyncStorage.getItem(driverId);
        return res;
      }
}
