import Redis, { Redis as RedisClient} from 'ioredis'
import cacheConfig from '@config/cache'
import ICacheProvider from "../models/ICacheProvider";
import { keys } from 'lodash';

interface ICacheData {
    [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
    private cache: ICacheData = {};
    constructor() {}

    public async save(key: string, value: any): Promise<void> {
        this.cache[key] = JSON.stringify(value);
    }

    public async recover<T>(key: string): Promise<T | null> {
        const data = this.cache[key];

        if (!data) {
            return null;
        }
        const pardedData = JSON.parse(data) as T;

        return pardedData;
    }

    public async invalidate(key: string): Promise<void> {
        delete this.cache[key];
    }

    public async invalidatePrefix(prefix: string): Promise<void> {
        const keys = Object.keys(this.cache).filter(key => key.startsWith(`${prefix}`));

        keys.forEach(key => {
            delete this.cache[key];
        })

    }
}