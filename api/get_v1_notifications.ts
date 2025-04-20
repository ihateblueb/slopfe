import https from '@/utils/https';
import getString from '@/utils/getString';

export default async function get_v1_notifications(max_id?: string) {
    return await https.get(
        'https://' +
            (await getString('domain')) +
            '/api/v1/notifications/' +
            (max_id ? '?max_id=' + max_id : ''),
        true
    );
}
