import { Pressable, Text, TextInput, View } from 'react-native';
import styles from '@/styles/styles';
import colors from '@/styles/colors';
import { Link } from 'expo-router';
import { IconSend, IconX } from '@tabler/icons-react-native';

const Compose = () => {
    return (
        <View style={[styles.base.scene, styles.base.paddedScene]}>
            <Pressable style={styles.base.button}>
                <IconSend color={colors.ac1} size={18} />
                <Text style={styles.base.buttonText}>Post</Text>
            </Pressable>
            <TextInput
                placeholder="Content warning"
                placeholderTextColor={colors.tx3}
                style={styles.base.textInput}
            />
            <TextInput
                multiline
                placeholder="What's going on?"
                placeholderTextColor={colors.tx3}
                style={[styles.base.textInput, styles.base.textArea]}
            />
        </View>
    );
};

export default Compose;
