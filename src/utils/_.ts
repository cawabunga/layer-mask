export function uniq<T>(array: T[]): T[] {
    return array.reduce((memo, item) => {
        const includes = ~memo.indexOf(item);
        return includes ? memo : memo.concat(item);
    }, [] as T[]);
}

export function flatten<T>(array: T[][]): T[] {
    return array.flat();
}

export function forEach(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collection: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    iteratee: (item: any, key: any, collection: any) => void,
): void {
    if (collection.forEach) {
        collection.forEach(iteratee);
    } else if (typeof collection.length === 'number') {
        for (let i = 0; i < collection.length; i++) {
            iteratee(collection[i], i, collection);
        }
    } else {
        for (let keys = Object.keys(collection), i = 0; i < keys.length; i++) {
            const key = keys[i];
            iteratee(collection[key], key, collection);
        }
    }
}

function withoutIndex<T>(arr: T[], index: number): T[] {
    return ([] as T[]).concat(arr.slice(0, index), arr.slice(index + 1));
}

export function withoutSingle<T>(arr: T[], values: T[]): T[] {
    return values.reduce((memo, value) => {
        const i = memo.indexOf(value);
        return ~i ? withoutIndex(memo, i) : memo;
    }, arr);
}

/**
 * @descr Similar to Object.assign but only for plain objects
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function assign<T extends {}>(dest: T, s1: T, s2?: T, s3?: T): T {
    // eslint-disable-next-line prefer-rest-params
    const sources = [].slice.call(arguments, 1) as T[];
    sources.forEach((source) => {
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                dest[key] = source[key];
            }
        }
    });
    return dest;
}
