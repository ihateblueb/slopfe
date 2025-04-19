import {
    Button,
    Image,
    Linking,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import styles from '@/styles/styles';
import * as mfm from 'mfm-js';
import { MfmNode } from 'mfm-js';
import { Link } from 'expo-router';
import Emoji from '@/components/Emoji';

const MisskeyMarkdown = ({
    content = '',
    simple = false,
    emojis = undefined
}) => {
    let mfmTree = simple ? mfm.parseSimple(content) : mfm.parse(content);

    function renderChild(object: MfmNode) {
        if (object.type === 'text') {
            return <Text>{object.props.text}</Text>;
        } else if (object.type === 'link') {
            return (
                <TouchableOpacity
                    onPress={() => Linking.openURL(object.props.url)}
                >
                    <Text style={styles.mfm.url}>
                        <>
                            {object.children
                                ? renderChildren(object.children)
                                : undefined}
                        </>
                    </Text>
                </TouchableOpacity>
            );
        } else if (object.type === 'bold') {
            return (
                <Text style={styles.mfm.bold}>
                    <>
                        {object.children
                            ? renderChildren(object.children)
                            : undefined}
                    </>
                </Text>
            );
        } else if (object.type === 'strike') {
            return (
                <Text style={styles.mfm.strike}>
                    <>
                        {object.children
                            ? renderChildren(object.children)
                            : undefined}
                    </>
                </Text>
            );
        } else if (object.type === 'italic') {
            return (
                <Text style={styles.mfm.italic}>
                    <>
                        {object.children
                            ? renderChildren(object.children)
                            : undefined}
                    </>
                </Text>
            );
        } else if (object.type === 'plain') {
            // todo: ??
            return (
                <Text>
                    <>
                        {object.children
                            ? renderChildren(object.children)
                            : undefined}
                    </>
                </Text>
            );
        } else if (object.type === 'small') {
            return (
                <Text style={styles.mfm.small}>
                    <>
                        {object.children
                            ? renderChildren(object.children)
                            : undefined}
                    </>
                </Text>
            );
        } else if (object.type === 'center') {
            return (
                <Text style={styles.mfm.center}>
                    <>
                        {object.children
                            ? renderChildren(object.children)
                            : undefined}
                    </>
                </Text>
            );
        } else if (object.type === 'url') {
            return (
                <TouchableOpacity
                    onPress={() => Linking.openURL(object.props.url)}
                >
                    <Text style={styles.mfm.url}>{object.props.url}</Text>
                </TouchableOpacity>
            );
        } else if (object.type === 'quote') {
            // todo
            return (
                <>
                    {object.children
                        ? renderChildren(object.children)
                        : undefined}
                </>
            );
        } else if (object.type === 'emojiCode') {
            let foundEmoji = emojis
                ? emojis.find((e) => e.shortcode === object.props.name)
                : undefined;

            return foundEmoji ? (
                <Emoji src={foundEmoji?.url ?? foundEmoji?.static_url} />
            ) : (
                <Text>:{object.props.name}:</Text>
            );
        } else if (object.type === 'unicodeEmoji') {
            return <Text>{object.props.emoji}</Text>;
        } else if (object.type === 'mention') {
            return (
                <Link style={styles.mfm.mention} href={'/' + object.props.acct}>
                    {object.props.acct}
                </Link>
            );
        } else if (object.type === 'hashtag') {
            return (
                <Link
                    style={styles.mfm.mention}
                    href={'/tag/' + object.props.hashtag}
                >
                    #{object.props.hashtag}
                </Link>
            );
        } else if (object.type === 'inlineCode') {
            // todo
            return (
                <>
                    {object.children
                        ? renderChildren(object.children)
                        : undefined}
                </>
            );
        } else if (object.type === 'blockCode') {
            // todo
            return (
                <>
                    {object.children
                        ? renderChildren(object.children)
                        : undefined}
                </>
            );
        } else {
            return (
                <>
                    {object.children
                        ? renderChildren(object.children)
                        : undefined}
                </>
            );
        }
    }

    function renderChildren(children) {
        let rendered = [];

        for (const child of children) {
            rendered.push(renderChild(child));
        }

        return rendered;
    }

    return renderChildren(mfmTree);
};

export default MisskeyMarkdown;
