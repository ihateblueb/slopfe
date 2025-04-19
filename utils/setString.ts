import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function (key: string, val: string) {
    try {
        await AsyncStorage.setItem(key, val);
        return;
    } catch (e) {
        return;
    }
}
