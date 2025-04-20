import { Image, Text, View } from 'react-native';
import styles from '@/styles/styles';
import { Link } from 'expo-router';
import MisskeyMarkdown from '@/components/MisskeyMarkdown';
import Time from '@/components/Time';
import { State } from 'react-native-gesture-handler';
import Status from '@/components/Status';
import Emoji from '@/components/Emoji';
import {
    IconAt,
    IconChartBar,
    IconDental,
    IconMoodSmile,
    IconNote,
    IconPencil,
    IconPlus,
    IconQuestionMark,
    IconRepeat,
    IconStar,
    IconUserPlus,
    IconUserQuestion
} from '@tabler/icons-react-native';
import colors from '@/styles/colors';

const Notification = ({ notification }) => {
    const renderUserLink = () => {
        return (
            <Link
                href={{
                    pathname: '/user/[handle]',
                    params: { handle: '@' + notification?.account?.fqn }
                }}
            >
                <Text style={styles.notification.userLink}>
                    <MisskeyMarkdown
                        content={
                            notification?.account?.display_name ??
                            notification?.account?.username
                        }
                        emojis={notification?.account?.emojis}
                        simple
                    />
                </Text>
            </Link>
        );
    };

    const renderIcon = () => {
        switch (notification?.type) {
            case 'favourite':
                return <IconStar size={18} color={colors.like} />;
            case 'reaction':
                return <IconMoodSmile size={18} color={colors.ac1} />;
            case 'reblog':
                return <IconRepeat size={18} color={colors.boost} />;
            case 'follow':
                return <IconUserPlus size={18} color={colors.ac1} />;
            case 'follow_request':
                return <IconUserQuestion size={18} color={colors.ac1} />;
            case 'mention':
                return <IconAt size={18} color={colors.ac1} />;
            case 'update':
                return <IconPencil size={18} color={colors.ac1} />;
            case 'status':
                return <IconNote size={18} color={colors.ac1} />;
            case 'poll':
                return <IconChartBar size={18} color={colors.ac1} />;
            case 'bite':
                return <IconDental size={18} color={colors.ac1} />;
            default:
                return <IconQuestionMark size={18} color={colors.ac1} />;
        }
    };

    const renderText = () => {
        switch (notification?.type) {
            case 'favourite':
                return (
                    <Text style={styles.base.text}>
                        {renderUserLink()} liked your post
                    </Text>
                );
            case 'reaction':
                return notification?.emoji || notification?.emoji_url ? (
                    <Text style={styles.base.text}>
                        {renderUserLink()} reacted to your post with{' '}
                        {notification?.emoji_url ? (
                            <Emoji src={notification?.emoji_url} />
                        ) : (
                            notification?.emoji
                        )}
                    </Text>
                ) : (
                    <Text style={styles.base.text}>
                        {renderUserLink()} reacted to your post
                    </Text>
                );
            case 'reblog':
                return (
                    <Text style={styles.base.text}>
                        {renderUserLink()} boosted your post
                    </Text>
                );
            case 'follow':
                return (
                    <Text style={styles.base.text}>
                        {renderUserLink()} followed you
                    </Text>
                );
            case 'follow_request':
                return (
                    <Text style={styles.base.text}>
                        {renderUserLink()} requested to follow you
                    </Text>
                );
            case 'mention':
                return (
                    <Text style={styles.base.text}>
                        {renderUserLink()} mentioned you
                    </Text>
                );
            case 'update':
                return (
                    <Text style={styles.base.text}>
                        {renderUserLink()} edited a post
                    </Text>
                );
            case 'status':
                return (
                    <Text style={styles.base.text}>
                        {renderUserLink()} made a post
                    </Text>
                );
            case 'poll':
                return <Text style={styles.base.text}>A poll has ended</Text>;
            case 'bite':
                return notification?.status ? (
                    <Text style={styles.base.text}>
                        {renderUserLink()} bit your post
                    </Text>
                ) : (
                    <Text style={styles.base.text}>
                        {renderUserLink()} bit you
                    </Text>
                );
        }
    };

    return (
        <View style={styles.notification.base}>
            <View style={styles.notification.header}>
                {renderIcon()}

                <Text style={styles.notification.headerText}>
                    {renderText()}
                </Text>

                <View style={styles.notification.headerInfo}>
                    <Time time={notification?.created_at} />
                </View>
            </View>

            {notification?.status ? (
                <Status status={notification?.status} simple />
            ) : undefined}
        </View>
    );
};

export default Notification;
