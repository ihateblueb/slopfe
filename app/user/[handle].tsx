import { Button, ScrollView, Text, View } from 'react-native';
import setString from '@/utils/setString';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MisskeyMarkdown from '@/components/MisskeyMarkdown';
import styles from '@/styles/styles';
import getString from '@/utils/getString';
import { useNavigation } from '@react-navigation/core';

const User = () => {
    const { handle } = useLocalSearchParams();

    return (
        <View style={styles.base.scene}>
            <ScrollView>
                <Text>user page for {handle}</Text>
            </ScrollView>
        </View>
    );
};

export default User;
