import { Image, View } from 'react-native';
import styles from '@/styles/styles';

const Avatar = ({ account }) => {
    return (
        <View style={styles.status.avatar}>
            <Image style={styles.status.avatarImg} src={account.avatar} />
        </View>
    );
};

export default Avatar;
