import getString from '@/utils/getString';
import { Component, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Slot, useRouter } from 'expo-router';
import setString from '@/utils/setString';
import colors from '@/styles/colors';
import styles from '@/styles/styles';

const LoginPage = () => {
    const router = useRouter();

    const [domain, setDomain] = useState('');
    const [token, setToken] = useState('');

    async function login() {
        console.log('login ' + domain + ', ' + token);

        await setString('token', token);
        await setString('domain', domain);

        router.navigate('/');
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.bg1
            }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    padding: 20,
                    gap: 10,
                    width: '100%'
                }}
            >
                <Text style={styles.login.welcome}>Welcome</Text>
                <Text style={styles.base.text}>Domain of instance</Text>
                <TextInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="example.com"
                    style={styles.base.textInput}
                    onChangeText={(newDomain) => setDomain(newDomain)}
                    defaultValue={domain}
                />
                <Text style={styles.base.text}>Token of user</Text>
                <TextInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="auth token"
                    style={styles.base.textInput}
                    onChangeText={(newToken) => setToken(newToken)}
                    defaultValue={token}
                />
                <Button title="Login" onPress={login} />
            </View>
        </View>
    );
};

export default LoginPage;
