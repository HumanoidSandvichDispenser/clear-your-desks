import { describe, expect, it } from "vitest";
import TrigIdentityProblem from "./trig-identity-problem";

describe("trig identity problem evaluation", () => {
    it("should evaluate sin(2x) correctly", () => {
        //let question = TrigIdentityProblem.generate(1)[0];
        let question = new TrigIdentityProblem("", "2\\sin(x)\\cos(x)");
        expect(question.checkAnswer("2\\sin x \\cos x")).toBeTruthy();
        expect(question.checkAnswer("2\\cos x * \\sin x")).toBeTruthy();
    });
});
