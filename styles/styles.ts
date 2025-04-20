import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import colorOpacity from '@/utils/colorOpacity';

const base = StyleSheet.create({
    text: {
        color: colors.tx2
    },
    textHeader: {
        color: colors.tx1
    },
    textInput: {
        padding: 8,
        borderRadius: 6,
        color: colors.tx2,
        backgroundColor: colors.bg2
    },
    textArea: {
        height: '50%'
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: colors.ac1,
        borderRadius: 6,
        padding: 8,
        gap: 4
    },
    buttonText: {
        color: colors.ac1,
        fontSize: 15
    },
    header: {
        backgroundColor: colors.bg2,
        borderBottomColor: colors.bg3,
        borderBottomWidth: 0.5
    },
    headerTitle: {
        color: colors.tx1
    },
    scene: {
        flex: 1,
        color: colors.tx2,
        backgroundColor: colors.bg1
    },
    paddedScene: {
        gap: 10,
        padding: 10
    },
    tabBar: {
        color: colors.tx2,
        backgroundColor: colors.bg2,
        borderTopColor: colors.bg3,
        borderTopWidth: 0.5
    },
    tabBarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    }
});

const login = StyleSheet.create({
    welcome: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.tx1
    }
});

const status = StyleSheet.create({
    base: {
        display: 'flex',
        padding: 12,
        borderBottomColor: colors.bg3,
        borderBottomWidth: 1
    },
    avatar: {
        display: 'flex',
        borderRadius: 8,
        backgroundColor: colors.bg3,
        objectFit: 'cover',
        overflow: 'hidden',
        maxHeight: 40,
        maxWidth: 40,
        minHeight: 40,
        minWidth: 40
    },
    avatarImg: {
        width: '100%',
        height: '100%'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingBottom: 8
    },
    headerDisplayname: {
        color: colors.tx1
    },
    headerUsername: {
        color: colors.tx2
    },
    timestamp: {
        color: colors.tx2,
        fontSize: 12
    },
    headerInfo: {
        flex: 1,
        flexGrow: 1,
        gap: 4,
        alignItems: 'flex-end'
    },
    text: {
        color: colors.tx2
    },
    reactions: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 8,
        paddingTop: 8
    },
    reaction: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        padding: 8,
        gap: 5,
        backgroundColor: colors.bg2,
        borderRadius: 6
    },
    reacted: {
        backgroundColor: colorOpacity(colors.ac1, 50)
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        gap: '10%',
        paddingTop: 8
    }
});

const mfm = StyleSheet.create({
    bold: {
        fontWeight: 'bold'
    },
    strike: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    italic: {
        fontStyle: 'italic'
    },
    small: {
        fontSize: 10
    },
    center: {
        justifyContent: 'center'
    },
    url: {
        color: colors.ac1
    },
    emojiContainer: {
        maxHeight: 20
    },
    emoji: {
        display: 'flex',
        overflow: 'hidden',
        resizeMode: 'contain',

        maxWidth: 100,
        maxHeight: 20,

        minWidth: 20,

        height: '100%',
        width: '100%',

        aspectRatio: '1'
    },
    emojiImg: {
        width: '100%',
        height: '100%'
    },
    mention: {
        color: colors.ac1
    }
});

export default {
    base: base,
    login: login,
    status: status,
    mfm: mfm
};
