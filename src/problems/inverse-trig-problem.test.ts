import { describe, expect, it } from "vitest";
import InverseTrigProblem from "./inverse-trig-problem";

describe("inverse trig generateSingle", () => {
    it("should return the proper value of arcsin(1)", () => {
        let p = InverseTrigProblem.generateSingle("sin", "\\frac{pi}{2}");
        expect(p.answer).toBe("\\frac{pi}{2}");
        expect(p.question).toBe("\\sin^{-1}(1)");
        expect(p.checkAnswer("\\frac{pi}{2}")).toBeTruthy();
    });

    it("should generate problems", () => {
        expect(InverseTrigProblem.generate(5)?.length).toBe(5);
    });
});
