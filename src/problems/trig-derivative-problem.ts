import { pickNFrom } from "../utils";
import ProblemData from "./problem-data";

const problems: { [key: string]: string } = {
    "\\sin(x)": "\\cos(x)",
    "\\cos(x)": "-\\sin(x)",
    //"\\tan(x)": "\\sec^{2}(x)",
    //"\\cot(x)": "-\\csc^{2}(x)",
    "\\sec(x)": "\\sec(x)\\tan(x)",
    "\\csc(x)": "-\\csc(x)\\cot(x)",
    "\\sin^{-1}(x)": "\\frac{1}{\\sqrt{1-x^2}}",
    "\\cos^{-1}(x)": "-\\frac{1}{\\sqrt{1-x^2}}",
    "\\tan^{-1}(x)": "\\frac{1}{1+x^2}",
    "\\cot^{-1}(x)": "-\\frac{1}{1+x^2}",
    "\\sec^{-1}(x)": "\\frac{1}{\\left|x\\right|\\sqrt{x}}",
    "\\-csc^{-1}(x)": "-\\frac{1}{\\left|x\\right|\\sqrt{x}}",
};

export default class DifferentiationProblem extends ProblemData {
    get skillName() {
        return "Trigonometric Derivatives";
    }

    get instruction() {
        return "Differentiate the trigonometric expression.";
    }

    get recallTime() {
        return 8;
    }

    constructor(question: string, answer: string) {
        super(question, answer);
    }

    static generate(count: number): ProblemData[] | undefined {
        const questions = pickNFrom(Object.keys(problems), count);
        return questions.map((question: string) =>
            new DifferentiationProblem(
                "\\frac{d}{dx}" + question, problems[question]));
    }

    checkAnswer(input: string): boolean {
        return problems[this.question] == input || this.algebraicCheck(input);
    }
}
