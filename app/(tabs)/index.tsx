import { Button, RefreshControl, ScrollView, Text, View } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import get_v1_timelines from '@/api/get_v1_timelines';
import Status from '@/components/Status';
import styles from '@/styles/styles';
import queryClient from '@/utils/queryClient';

export default function Index() {
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
        hasPreviousPage
    } = useInfiniteQuery({
        queryKey: ['timeline'],
        queryFn: async ({ pageParam }) => get_v1_timelines('home', pageParam),
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
                    onRefresh={() => queryClient.refetchQueries()}
                />
            }
        >
            {status === 'pending' ? undefined : status === 'error' ? (
                <Text style={styles.base.text}>Error: {error.message}</Text>
            ) : (
                <View key={'view'}>
                    {data.pages.map((page) => (
                        <React.Fragment key={page.id}>
                            {page.map((status) => (
                                <Status status={status} key={status.id} />
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
}
