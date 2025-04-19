import https from '@/utils/https';
import getString from '@/utils/getString';

export default async function post_v1_statuses_unbookmark(id: string) {
    return await https.post(
        'https://' +
            (await getString('domain')) +
            '/api/v1/statuses/' +
            id +
            '/unbookmark'
    );
}
