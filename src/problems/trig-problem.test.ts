import { assert, describe, expect, it } from "vitest";
import TrigProblem from "./trig-problem";

describe("trig problem generation", () => {
    it("should generate unique numbers", () => {
        for (let i = 0; i < 3; i++) {
            const trigProblems = TrigProblem.generate(4);
            assert(trigProblems != undefined);
            assert(trigProblems[0] != undefined);
            assert(trigProblems[1] != undefined);
            assert(trigProblems[2] != undefined);
            assert(trigProblems[3] != undefined);
            assert(trigProblems[0].question != trigProblems[1].question);
            assert(trigProblems[1].question != trigProblems[2].question);
            assert(trigProblems[2].question != trigProblems[3].question);
        }
    });

    it("should correctly generate undefined", () => {
        const undef = "\\textrm{undefined}";
        expect(TrigProblem.generateSingle("csc", "pi").answer).toBe(undef);
        expect(TrigProblem.generateSingle("sec", "pi/2").answer).toBe(undef);
        expect(TrigProblem.generateSingle("cot", "pi").answer).toBe(undef);
    });
});

describe("checkAnswer", () => {
    it("should return true for correct answers", () => {
        let problem = new TrigProblem("", "2pi/3", "");
        expect(problem.checkAnswer("2 * pi / 3")).toBe(true);
    });

    it("should return false for incorrect answers", () => {
        let problem = new TrigProblem("", "2pi/3", "");
        expect(problem.checkAnswer("pi / 3")).toBe(false);
    });

    it("should generate a correct answer given an angle", () => {
        expect(TrigProblem.generateSingle("sin", "0").answer).toBe("0");
        expect(TrigProblem.generateSingle("cos", "0").answer).toBe("1");
    });

    it("should handle un/rationalized denominators", () => {
        let problem = TrigProblem.generateSingle("sin", "pi/4");
        expect(problem.checkAnswer("sqrt(2)/2")).toBeTruthy();
        expect(problem.checkAnswer("1/sqrt(2)")).toBeTruthy();
    });

    it("should evaluate tan(0) correctly", () => {
        let problem = TrigProblem.generateSingle("tan", "0");
        expect(problem.checkAnswer("0")).toBeTruthy();
    });
});
