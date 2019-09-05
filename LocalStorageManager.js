import AsyncStorage from '@react-native-community/async-storage';

export default class LocalStorageManager {
    
    saveDriverInLocalStorage = async (driverId) => {
        const res = await AsyncStorage.setItem(driverId, true);
        return res;
    }

    removeDriverFromLocalStorage = async (driverId) => {
        return await AsyncStorage.removeItem(driverId);
    }

    isDriverSavedLocalStorage = async (driverId) => {
        return await AsyncStorage.getItem(driverId);
    }
}