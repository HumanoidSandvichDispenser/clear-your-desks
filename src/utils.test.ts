import { assert, describe, expect, it } from "vitest";
import { pickFrom, random, range } from "./utils";

describe("pickFrom method", () => {
    it("should return unique values", () => {
        let elements = pickFrom([1, 2, 3, 4], 2);
        assert(elements[0] != elements[1]);
    });

    it("should return a copy of the elements when size is too long", () => {
        let elements = pickFrom([1, 2], 3);
        expect(elements).toEqual([1, 2]);
    });
});

describe("random method", () => {
    it.each([[1, 2], [4, 7], [-5, 8]])(
        "should return a random number within a specified range",
        (a, b) => {
            let c = random(a, b);
            assert(c >= a && c <= b);
        }
    )
});

describe("range method", () => {
    it("should return a list of values from a to b", () => {
        expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
    });

    it("should increment each element by step size", () => {
        expect(range(1, 5, 2)).toEqual([1, 3]);
    });
});
