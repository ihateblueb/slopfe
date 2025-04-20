import { Redirect, Stack, Tabs, usePathname, useRouter } from 'expo-router';
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
import { Pressable } from 'react-native';

const Main = () => {
    const router = useRouter();
    const pathname = usePathname();
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
                        tabBarButton: () => (
                            <Pressable
                                onPress={() => {
                                    router.navigate('/');
                                }}
                                style={styles.base.tabBarIcon}
                            >
                                <IconHome
                                    color={
                                        pathname === '/'
                                            ? colors.ac1
                                            : colors.tx3
                                    }
                                    size={26}
                                ></IconHome>
                            </Pressable>
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
                        tabBarButton: () => (
                            <Pressable
                                onPress={() => {
                                    router.navigate('/notifications');
                                }}
                                style={styles.base.tabBarIcon}
                            >
                                <IconBell
                                    color={
                                        pathname === '/notifications'
                                            ? colors.ac1
                                            : colors.tx3
                                    }
                                    size={26}
                                ></IconBell>
                            </Pressable>
                        ),
                        tabBarIcon: ({ color, size }) => (
                            <IconBell color={color} size={size}></IconBell>
                        )
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                        tabBarButton: () => (
                            <Pressable
                                onPress={() => {
                                    router.navigate('/settings');
                                }}
                                style={styles.base.tabBarIcon}
                            >
                                <IconSettings
                                    color={
                                        pathname === '/settings'
                                            ? colors.ac1
                                            : colors.tx3
                                    }
                                    size={26}
                                ></IconSettings>
                            </Pressable>
                        ),
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
