import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function (key: string) {
    try {
        const value = (await AsyncStorage.getItem(key)) ?? undefined;
        return value;
    } catch (e) {
        return undefined;
    }
}
