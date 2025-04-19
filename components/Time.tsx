import styles from '@/styles/styles';
import { Text } from 'react-native';
import { useEffect, useState } from 'react';

let timer = 0;

function timeAgo(time) {
    switch (typeof time) {
        case 'number':
            break;
        case 'string':
            time = +new Date(time);
            break;
        case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
        default:
            time = +new Date();
    }
    let time_formats = [
        [60, 's', 1],
        [120, '1m', '1m'],
        [3600, 'm', 60],
        [7200, '1h', '1h'],
        [86400, 'h', 3600],
        [604800, 'd', 86400],
        [2419200, 'w', 604800],
        [29030400, 'mo', 2419200],
        [2903040000, 'y', 29030400]
    ];
    let seconds = (+new Date() - time) / 1000,
        list_choice = 1;
    if (seconds <= 5) {
        return 'now';
    }
    let i = 0,
        format;
    while ((format = time_formats[i++]))
        if (seconds < format[0]) {
            if (typeof format[2] == 'string') return format[list_choice];
            else return Math.floor(seconds / format[2]) + format[1];
        }
    return time;
}

const Time = ({ time = '' }) => {
    const [timer, setTimer] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setTimer(Date.now()), 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Text style={styles.status.timestamp} key={timer}>
            {timeAgo(time)}
        </Text>
    );
};

export default Time;
