import { Button, ScrollView, Text, View } from 'react-native';
import setString from '@/utils/setString';
import { useRouter } from 'expo-router';
import MisskeyMarkdown from '@/components/MisskeyMarkdown';
import styles from '@/styles/styles';
import getString from '@/utils/getString';

const Settings = () => {
    const router = useRouter();

    const mfmTest =
        'ew $[x128 sdfsd inside unknown function] hello **h** hi *hey look at this' +
        ' long line of text surely this will overflow wont it* and look more normal stuff' +
        ' https://google.com/ <small>this is small text jere</small> normal <center>center doesnt work though</center>' +
        ' :emojiTest: ❤️ @mention@remlit.site';

    return (
        <View
            style={{
                flex: 1,
                padding: 20
            }}
        >
            <ScrollView>
                <Button
                    title="Logout"
                    onPress={() => {
                        setString('token', '').then(() => {
                            setString('domain', '').then(() => {
                                router.navigate('/login');
                            });
                        });
                    }}
                />

                <Text style={styles.status.text}>
                    <MisskeyMarkdown content={mfmTest} />
                </Text>
            </ScrollView>
        </View>
    );
};

export default Settings;
