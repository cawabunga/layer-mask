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
    collection: any,
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
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function withoutSingle<T>(arr: T[], ...values: T[]): T[] {
    return values.reduce((memo, value) => {
        const i = memo.indexOf(value);
        return ~i ? withoutIndex(memo, i) : memo;
    }, arr);
}
