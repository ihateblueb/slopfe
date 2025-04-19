import getString from '@/utils/getString';

class ApiError extends Error {
    constructor(
        public status: number,
        public message: string
    ) {
        super();
        Object.setPrototypeOf(this, ApiError.prototype);
        this.name = 'ApiError';
        this.status = status ?? 0;
    }
}

class https {
    private async start() {}

    private async end(res: Response) {
        let apiRes = undefined;
        try {
            apiRes = await res.json();
        } catch {}

        if (!res.ok)
            throw new ApiError(
                res.status,
                apiRes?.message ?? 'Something went wrong'
            );

        console.log(apiRes);

        return apiRes ?? undefined;
    }

    public async get(url: string, auth?: boolean) {
        await this.start();

        console.log('GET ' + url);

        let req = await fetch(url, {
            method: 'GET',
            headers: auth
                ? {
                      Authorization: 'Bearer ' + (await getString('token'))
                  }
                : {}
        });

        return await this.end(req);
    }
    public async post(url: string, body?: any) {
        await this.start();

        console.log('POST ' + url);

        let headers: any = {
            Authorization: 'Bearer ' + (await getString('token'))
        };
        if (body) headers['content-type'] = 'application/json';

        let req = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });

        return await this.end(req);
    }
    public async postRaw(url: string, body?: any) {
        await this.start();

        console.log('POST (raw) ' + url);

        let req = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + (await getString('token'))
            },
            body: body
        });

        return await this.end(req);
    }
    public async patch(url: string, body: any) {
        await this.start();

        console.log('PATCH ' + url);

        let headers: any = {
            Authorization: 'Bearer ' + (await getString('token'))
        };
        if (body) headers['content-type'] = 'application/json';

        let req = await fetch(url, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(body)
        });

        return await this.end(req);
    }
    public async delete(url: string) {
        await this.start();

        console.log('DELETE ' + url);

        let req = await fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + (await getString('token'))
            }
        });

        return await this.end(req);
    }
}

export default new https();
