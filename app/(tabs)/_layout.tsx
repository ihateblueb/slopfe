import { Redirect, Stack, Tabs, useRouter } from 'expo-router';
import getString from '@/utils/getString';
import { Suspense, useEffect, useState } from 'react';
import {
    IconBell,
    IconEdit,
    IconEditCircle,
    IconHome,
    IconRefresh,
    IconSettings
} from '@tabler/icons-react-native';
import colors from '@/styles/colors';
import { HeaderButton } from '@react-navigation/elements';
import queryClient from '@/utils/queryClient';
import styles from '@/styles/styles';

const Main = () => {
    const router = useRouter();
    const token = getString('token');

    if (!token) {
        return <Redirect href="/login" />;
    } else {
        return (
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: colors.ac1,
                    headerStyle: styles.base.header,
                    headerTitleStyle: styles.base.headerTitle,
                    sceneStyle: styles.base.scene,
                    tabBarStyle: styles.base.tabBar
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <IconHome color={color} size={size}></IconHome>
                        ),
                        headerRight: () => (
                            <HeaderButton
                                onPress={() => router.navigate('/compose')}
                                children={<IconEdit color={colors.ac1} />}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="notifications"
                    options={{
                        title: 'Notifications',
                        tabBarIcon: ({ color, size }) => (
                            <IconBell color={color} size={size}></IconBell>
                        )
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                        tabBarIcon: ({ color, size }) => (
                            <IconSettings
                                color={color}
                                size={size}
                            ></IconSettings>
                        )
                    }}
                />
            </Tabs>
        );
    }
};

const TabbedLayout = () => {
    return (
        <Suspense>
            <Main />
        </Suspense>
    );
};

export default TabbedLayout;
