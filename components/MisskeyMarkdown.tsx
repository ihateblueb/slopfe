import {
    Button,
    Image,
    Linking,
    Pressable,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import styles from '@/styles/styles';
import * as mfm from 'mfm-js';
import { MfmNode } from 'mfm-js';
import { Link } from 'expo-router';
import Emoji from '@/components/Emoji';
import { Fragment } from 'react';

const MisskeyMarkdown = ({
    keyPrefix = 'prefix-',
    content = '',
    simple = false,
    emojis = undefined
}) => {
    let mfmTree = simple ? mfm.parseSimple(content) : mfm.parse(content);

    function renderChild(object: MfmNode, count: number) {
        const nodeKey = `${keyPrefix}-mfm-node-${count}-${object.type}`;

        if (object.type === 'text') {
            return <Text key={nodeKey}>{object.props.text}</Text>;
        } else if (object.type === 'link') {
            return (
                <Text
                    key={nodeKey}
                    onPress={() => Linking.openURL(object.props.url)}
                    style={styles.mfm.url}
                >
                    <>
                        {object.children
                            ? renderChildren(object.children)
                            : undefined}
                    </>
                </Text>
            );
        } else if (object.type === 'bold') {
            return (
                <Text key={nodeKey} style={styles.mfm.bold}>
                    <>
                        {object.children
                            ? renderChildren(object.children)
                            : undefined}
                    </>
                </Text>
            );
        } else if (object.type === 'strike') {
            return (
                <Text key={nodeKey} style={styles.mfm.strike}>
                    <>
                        {object.children
                            ? renderChildren(object.children)
                            : undefined}
                    </>
                </Text>
            );
        } else if (object.type === 'italic') {
            return (
                <Text key={nodeKey} style={styles.mfm.italic}>
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
                <Text key={nodeKey}>
                    <>
                        {object.children
                            ? renderChildren(object.children)
                            : undefined}
                    </>
                </Text>
            );
        } else if (object.type === 'small') {
            return (
                <Text key={nodeKey} style={styles.mfm.small}>
                    <>
                        {object.children
                            ? renderChildren(object.children)
                            : undefined}
                    </>
                </Text>
            );
        } else if (object.type === 'center') {
            return (
                <Text key={nodeKey} style={styles.mfm.center}>
                    <>
                        {object.children
                            ? renderChildren(object.children)
                            : undefined}
                    </>
                </Text>
            );
        } else if (object.type === 'url') {
            return (
                <Text
                    key={nodeKey}
                    onPress={() => Linking.openURL(object.props.url)}
                >
                    <Text style={styles.mfm.url}>{object.props.url}</Text>
                </Text>
            );
        } else if (object.type === 'quote') {
            // todo
            return (
                <Fragment key={nodeKey}>
                    {object.children
                        ? renderChildren(object.children)
                        : undefined}
                </Fragment>
            );
        } else if (object.type === 'emojiCode') {
            let foundEmoji = emojis
                ? emojis.find((e) => e.shortcode === object.props.name)
                : undefined;

            return foundEmoji ? (
                <Emoji
                    key={nodeKey}
                    src={foundEmoji?.url ?? foundEmoji?.static_url}
                />
            ) : (
                <Text key={nodeKey}>:{object.props.name}:</Text>
            );
        } else if (object.type === 'unicodeEmoji') {
            return <Text key={nodeKey}>{object.props.emoji}</Text>;
        } else if (object.type === 'mention') {
            return (
                <Link
                    key={nodeKey}
                    style={styles.mfm.mention}
                    href={'/' + object.props.acct}
                >
                    {object.props.acct}
                </Link>
            );
        } else if (object.type === 'hashtag') {
            return (
                <Link
                    key={nodeKey}
                    style={styles.mfm.mention}
                    href={'/tag/' + object.props.hashtag}
                >
                    #{object.props.hashtag}
                </Link>
            );
        } else if (object.type === 'inlineCode') {
            // todo
            return (
                <Fragment key={nodeKey}>
                    {object.children
                        ? renderChildren(object.children)
                        : undefined}
                </Fragment>
            );
        } else if (object.type === 'blockCode') {
            // todo
            return (
                <Fragment key={nodeKey}>
                    {object.children
                        ? renderChildren(object.children)
                        : undefined}
                </Fragment>
            );
        } else {
            return (
                <Fragment key={nodeKey}>
                    {object.children
                        ? renderChildren(object.children)
                        : undefined}
                </Fragment>
            );
        }
    }

    function renderChildren(children) {
        let rendered = [];
        let count = 1;

        for (const child of children) {
            rendered.push(renderChild(child, count));
            count++;
        }

        return rendered;
    }

    return renderChildren(mfmTree);
};

export default MisskeyMarkdown;
