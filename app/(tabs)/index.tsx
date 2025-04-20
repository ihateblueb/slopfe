import { Button, RefreshControl, ScrollView, Text, View } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import get_v1_timelines from '@/api/get_v1_timelines';
import Status from '@/components/Status';
import styles from '@/styles/styles';
import queryClient from '@/utils/queryClient';
import { useIsFocused } from '@react-navigation/core';

export default function Index() {
    const isFocused = useIsFocused();

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
                        <React.Fragment key={page.id ?? 'page-0'}>
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
