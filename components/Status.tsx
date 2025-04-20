import { Button, Text, View } from 'react-native';
import styles from '@/styles/styles';
import {
    IconArrowBackUp,
    IconBookmark,
    IconDots,
    IconGlobe,
    IconHome,
    IconLock,
    IconMail,
    IconPlus,
    IconRepeat,
    IconStar,
    IconWorld
} from '@tabler/icons-react-native';
import colors from '@/styles/colors';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import post_v1_statuses_favourite from '@/api/post_v1_statuses_favourite';
import post_v1_statuses_unfavourite from '@/api/post_v1_statuses_unfavourite';
import post_v1_statuses_bookmark from '@/api/post_v1_statuses_bookmark';
import post_v1_statuses_unbookmark from '@/api/post_v1_statuses_unbookmark';
import { Link } from 'expo-router';

const Time = lazy(() => import('@/components/Time'));
const Avatar = lazy(() => import('@/components/Avatar'));
const Emoji = lazy(() => import('@/components/Emoji'));
const MisskeyMarkdown = lazy(() => import('@/components/MisskeyMarkdown'));

const Status = ({ status, simple = false }) => {
    const [iBoosted, setIBoosted] = useState(status?.reblogged ?? false);
    const [iLiked, setILiked] = useState(status?.favourited ?? false);
    const [iBookmarked, setIBookmarked] = useState(status?.bookmarked ?? false);
    const [cwOpen, setCwOpen] = useState(!status?.spoiler_text);

    function like() {
        if (iLiked) {
            post_v1_statuses_unfavourite(status?.id).then((e) => {
                setILiked(false);
                status = e;
            });
        } else {
            post_v1_statuses_favourite(status?.id).then((e) => {
                setILiked(true);
                status = e;
            });
        }
    }

    function bookmark() {
        if (iBookmarked) {
            post_v1_statuses_unbookmark(status?.id).then((e) => {
                setIBookmarked(false);
                status = e;
            });
        } else {
            post_v1_statuses_bookmark(status?.id).then((e) => {
                setIBookmarked(true);
                status = e;
            });
        }
    }

    return (
        <View style={simple ? styles.status.baseSimple : styles.status.base}>
            <View style={styles.status.header}>
                <Avatar account={status?.account} />
                <Link
                    href={{
                        pathname: '/user/[handle]',
                        params: { handle: '@' + status?.account?.fqn }
                    }}
                >
                    <View>
                        <Text style={styles.status.headerDisplayname}>
                            <MisskeyMarkdown
                                keyPrefix={`status-${status.id}-display_name`}
                                content={
                                    status?.account?.display_name ??
                                    status?.account?.username
                                }
                                emojis={status?.account?.emojis}
                                simple={true}
                            />
                        </Text>
                        <Text style={styles.status.headerUsername}>
                            @{status?.account?.fqn}
                        </Text>
                    </View>
                </Link>
                <View style={styles.status.headerInfo}>
                    {status?.visibility === 'public' ? (
                        <IconWorld size={16} color={colors.tx2} />
                    ) : status?.visibility === 'unlisted' ? (
                        <IconHome size={16} color={colors.tx2} />
                    ) : status?.visibility === 'private' ? (
                        <IconLock size={16} color={colors.tx2} />
                    ) : status?.visibility === 'direct' ? (
                        <IconMail size={16} color={colors.tx2} />
                    ) : undefined}

                    <Text>
                        <Time time={status?.edited_at ?? status?.created_at} />
                        {status?.edited_at ? (
                            <Text style={styles.status.timestamp}>*</Text>
                        ) : undefined}
                    </Text>
                </View>
            </View>
            {status?.spoiler_text ? (
                <Button
                    onPress={() => setCwOpen(!cwOpen)}
                    title={status?.spoiler_text}
                />
            ) : undefined}

            <Text style={styles.status.text}>
                {cwOpen ? (
                    <MisskeyMarkdown
                        keyPrefix={`status-${status.id}-content`}
                        content={status?.text ?? status?.content}
                        emojis={status?.emojis}
                    />
                ) : undefined}
            </Text>

            {status?.reactions && status?.reactions.length > 0 ? (
                <View style={styles.status.reactions}>
                    {status?.reactions.map((reaction) => (
                        <React.Fragment key={reaction?.name}>
                            <View
                                style={[
                                    styles.status.reaction,
                                    reaction?.me
                                        ? styles.status.reacted
                                        : undefined
                                ]}
                            >
                                {(reaction?.url ?? reaction?.static_url) ? (
                                    <Emoji
                                        src={
                                            reaction?.url ??
                                            reaction?.static_url
                                        }
                                    />
                                ) : (
                                    <Text>{reaction?.name}</Text>
                                )}

                                <Text style={styles.status.text}>
                                    {reaction?.count}
                                </Text>
                            </View>
                        </React.Fragment>
                    ))}
                </View>
            ) : undefined}

            <View style={styles.status.footer}>
                <IconArrowBackUp size={18} color={colors.tx3} />
                <IconRepeat
                    size={18}
                    color={iBoosted ? colors.boost : colors.tx3}
                />
                <IconStar
                    size={18}
                    fill={iLiked ? colors.like : 'transparent'}
                    color={iLiked ? colors.like : colors.tx3}
                    onPress={like}
                />
                <IconPlus size={18} color={colors.tx3} />
                <IconBookmark
                    size={18}
                    fill={iBookmarked ? colors.bookmark : 'transparent'}
                    color={iBookmarked ? colors.bookmark : colors.tx3}
                    onPress={bookmark}
                />
                <IconDots size={18} color={colors.tx3} />
            </View>
        </View>
    );
};

export default Status;
