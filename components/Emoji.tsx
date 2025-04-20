import { Image, View } from 'react-native';
import styles from '@/styles/styles';

const Emoji = ({ src }) => {
    return src ? (
        <View style={styles.mfm.emojiContainer}>
            <Image style={styles.mfm.emoji} src={src} />
        </View>
    ) : undefined;
};

export default Emoji;
