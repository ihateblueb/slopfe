import https from '@/utils/https';
import getString from '@/utils/getString';

export default async function get_v1_timelines(
    timeline: string,
    max_id?: string
) {
    return await https.get(
        'https://' +
            (await getString('domain')) +
            '/api/v1/timelines/' +
            timeline +
            (max_id ? '?max_id=' + max_id : ''),
        true
    );
}
