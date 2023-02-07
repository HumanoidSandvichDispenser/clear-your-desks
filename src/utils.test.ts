import { assert, describe, expect, it } from "vitest";
import { pickFrom, pickNFrom, random, range } from "./utils";
import nerdamer from "nerdamer";

describe("pickFrom methods", () => {
    it("should return unique values", () => {
        for (let i = 0; i < 25; i++) {
            let elements = pickNFrom([1, 2, 3, 4], 2);
            assert(elements[0] != undefined);
            assert(elements[1] != undefined);
            assert(elements[0] != elements[1]);
        }
    });

    it("should return `count` elements for all values of `count`", () => {
        let elements = pickNFrom([1, 2], 3);
        expect(elements.length).toEqual(3);
        elements = pickNFrom([2, 4], 4);
        expect(elements.length).toEqual(4);
        elements = pickNFrom([1], 4);
        expect(elements).toEqual([1, 1, 1, 1]);
    });

    it("should throw an exception if array is empty", () => {
        expect(() => pickFrom([])).toThrow(RangeError);
        expect(() => pickNFrom([], 1)).toThrow(RangeError);
    });
});

describe("random method", () => {
    it.each([[1, 2], [4, 7], [-5, 8]])(
        "should return a random number within a specified range",
        (a, b) => {
            let c = random(a, b);
            assert(c >= a && c <= b);
        }
    );
});

describe("range method", () => {
    it("should return a list of values from a to b", () => {
        expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
    });

    it("should increment each element by step size", () => {
        expect(range(1, 5, 2)).toEqual([1, 3]);
    });
});

describe("nerdamer", () => {
    it("should have equivalent rational denominator things", () => {
        let a = nerdamer("sqrt(3)/2");
        let b = nerdamer("3/(sqrt(3) * 2)");
        console.log(a.pow(2).eq(b.pow(2)));
    });
});;
