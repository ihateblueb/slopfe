import { Redirect, Slot, Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/utils/queryClient';
import { SafeAreaView, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import colors from '@/styles/colors';
import styles from '@/styles/styles';
import { Suspense } from 'react';

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <Stack
                screenOptions={{
                    headerStyle: styles.base.header,
                    headerTitleStyle: styles.base.headerTitle,
                    headerBackTitle: 'Back',
                    headerTintColor: colors.ac1
                }}
            >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="compose"
                    options={{ headerShown: false, presentation: 'modal' }}
                />
            </Stack>
        </QueryClientProvider>
    );
}
