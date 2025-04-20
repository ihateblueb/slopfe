import { Text, TextInput, View } from 'react-native';
import styles from '@/styles/styles';
import colors from '@/styles/colors';
import { Link } from 'expo-router';

const Compose = () => {
    return (
        <View style={[styles.base.scene, styles.base.paddedScene]}>
            <Link href="../">Dismiss modal</Link>
            <TextInput
                placeholder="Content warning"
                placeholderTextColor={colors.tx3}
                style={styles.base.textInput}
            />
            <TextInput
                multiline
                placeholder="What's going on?"
                style={[styles.base.textInput, styles.base.textArea]}
            />
        </View>
    );
};

export default Compose;
