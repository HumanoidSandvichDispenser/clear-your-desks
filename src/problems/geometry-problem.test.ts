import { assert, describe, expect, it } from "vitest";
import GeometryProblem from "./geometry-problem";

describe("trig problem generation", () => {
    it("should correctly evaluate different ways of writing formulae", () => {
        let problem = new GeometryProblem("", "\\pi r^2");
        expect(problem.checkAnswer("r^2 \\cdot \\pi")).toBeTruthy();
        problem = new GeometryProblem("", "\\frac{b_1 + b_2}{2} h");
        expect(problem.checkAnswer("\\frac{1}{2} \\cdot (b_1 + b_2) \\cdot h")).toBeTruthy();
    });
});

