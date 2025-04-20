import { Text, TextInput, View } from 'react-native';
import styles from '@/styles/styles';
import colors from '@/styles/colors';

const Compose = () => {
    return (
        <View style={styles.base.scene}>
            <TextInput
                placeholder="Content warning"
                placeholderTextColor={colors.tx3}
                style={styles.base.textInput}
            />
        </View>
    );
};

export default Compose;
