import { pickNFrom } from "../utils";
import ProblemData from "./problem-data";

const problems: { [key: string]: string } = {
    "\\frac{1}{\\sin(x)}": "\\csc(x)",
    "\\frac{1}{\\cos(x)}": "\\sec(x)",
    "\\frac{1}{\\tan(x)}": "\\cot(x)",
    "\\frac{\\sin(x)}{\\cos(x)}": "\\tan(x)",
    "\\frac{\\cos(x)}{\\sin(x)}": "\\cot(x)",
    "\\sin^2(x) + \\cos^2(x)": "1",
    "\\sec^2(x) - \\tan^2(x)": "1",
    "\\csc^2(x) - \\cot^2(x)": "1",
    "\\sin(2x)": "2\\sin(x)\\cos(x)",
    "\\cos^2(x) - \\sin^2(x)": "\\cos(2x)",
    "2\\cos^2(x) - 1": "\\cos(2x)",
    "1 - 2\\sin^2(x)": "\\cos(2x)",
};

export default class TrigIdentityProblem extends ProblemData {
    get skillName() {
        return "Trigonometric Identities";
    }

    get instruction() {
        return "Solve the trigonometric identity.";
    }

    get recallTime() {
        return 8;
    }

    static generate(count: number): ProblemData[] | undefined {
        let questions = pickNFrom(Object.keys(problems), count);
        return questions.map((question: string) =>
            new TrigIdentityProblem(question, problems[question]));
    }

    checkAnswer(input: string) {
        return this.algebraicCheck(input);
    }
}
