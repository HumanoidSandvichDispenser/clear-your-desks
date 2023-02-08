export function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) % max + min;
}

export function pickFrom<T>(elements: T[]): T {
    if (elements.length == 0) {
        throw new RangeError("can not pick from an empty array");
    }

    return elements[random(0, elements.length - 1)];
}

export function pickNFrom(elements: any[], count: number) {
    if (elements.length == 0) {
        throw new RangeError("can not pick from an empty array");
    }

    const indices = new Set<number>();
    const ret = [];

    for (let i = 0; i < count; i++) {
        let offset = random(1, elements.length);
        let idx = 0;
        let iterations = 0;
        for (let j = 0; j < offset; j++) {
            iterations = 0;
            while (indices.has(idx)) {
                idx = (idx + 1) % elements.length;
                iterations++;
                if (iterations > 1024) {
                    throw "max iterations reached";
                }
            }
            idx = (idx + 1) % elements.length;
            while (indices.has(idx)) {
                idx = (idx + 1) % elements.length;
                iterations++;
                if (iterations > 1024) {
                    throw "max iterations reached";
                }
            }
        }

        indices.add(idx);
        ret.push(idx);

        if (indices.size >= elements.length) {
            // every index is marked as used, so we should make every index
            // possible to reach again
            indices.clear();
        }
    }

    return Array.from(ret.values()).map(i => elements[i]);
}

export function range(a: number, b: number, step: number = 1): number[] {
    const ret = [];

    for (let i = a; i < b; i += step) {
        ret.push(i);
    }

    return ret;
}

export function shuffle<T>(array: Array<T>) {
    for (let i = array.length; i >= 0; i--) {
        let randomIdx = random(0, array.length - 1);
        let buf = array[i];
        array[i] = array[randomIdx];
        array[randomIdx] = array[i];
    }

    return array;
}
