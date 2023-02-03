export function random(min: number, max: number) {
    return Math.random() * (max - min) % max + min;
}

export function pickFrom(elements: any[], count: number) {
    if (count >= elements.length) {
        // return a clone of the array if the user wants to pick more than they can
        return Array.from(elements);
    }

    const indices = new Set<number>();

    for (let i = 0; i < count; i++) {
        let offset = random(0, elements.length);
        let idx = 0;
        let iterations = 0;
        for (let j = 0; j < offset; j++) {
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
    }

    return Array.from(indices.values()).map(i => elements[i]);
}

export function range(a: number, b: number, step: number = 1): number[] {
    const ret = [];

    for (let i = a; i < b; i += step) {
        ret.push(i);
    }

    return ret;
}
