import { Text, TextInput, View } from 'react-native';
import styles from '@/styles/styles';
import colors from '@/styles/colors';

const Compose = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.bg1
            }}
        >
            <TextInput
                placeholder="Content warning"
                style={styles.base.textInput}
            />
        </View>
    );
};

export default Compose;
