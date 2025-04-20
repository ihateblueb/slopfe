import { Button, RefreshControl, ScrollView, Text, View } from 'react-native';
import styles from '@/styles/styles';
import { useInfiniteQuery } from '@tanstack/react-query';
import get_v1_timelines from '@/api/get_v1_timelines';
import queryClient from '@/utils/queryClient';
import React from 'react';
import Status from '@/components/Status';
import get_v1_notifications from '@/api/get_v1_notifications';
import Notification from '@/components/Notification';

const Notifications = () => {
    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
        refetch
    } = useInfiniteQuery({
        queryKey: ['notifications'],
        queryFn: async ({ pageParam }) => get_v1_notifications(pageParam),
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
            return lastPage ? lastPage.at(-1).id : undefined;
        }
    });

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={isFetching}
                    onRefresh={() => {
                        if (data) data.pages = [data?.pages[0]];
                        refetch();
                    }}
                />
            }
        >
            {status === 'pending' ? undefined : status === 'error' ? (
                <Text style={styles.base.text}>Error: {error.message}</Text>
            ) : (
                <View key={'view'}>
                    {data.pages.map((page) => (
                        <React.Fragment key={page.id}>
                            {page.map((notification) => (
                                <Notification
                                    notification={notification}
                                    key={notification.id}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                    <Button
                        title={
                            isFetchingNextPage
                                ? 'Loading more...'
                                : hasNextPage
                                  ? 'Load Older'
                                  : 'Nothing more to load'
                        }
                        onPress={() => fetchNextPage()}
                        disabled={!hasNextPage || isFetchingNextPage}
                    />
                </View>
            )}
        </ScrollView>
    );
};

export default Notifications;
