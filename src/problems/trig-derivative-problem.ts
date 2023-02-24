import { pickNFrom } from "../utils";
import ProblemData from "./problem-data";

const problems: { [key: string]: string } = {
    "\\frac{d}{dx}\\sin(x)": "\\cos(x)",
    "\\frac{d}{dx}\\cos(x)": "-\\sin(x)",
    "\\frac{d}{dx}\\sec(x)": "\\sec(x)\\tan(x)",
    "\\frac{d}{dx}\\csc(x)": "-\\csc(x)\\cot(x)",
    "\\frac{d}{dx}\\sin^{-1}(x)": "\\frac{1}{\\sqrt{1-x^2}}",
    "\\frac{d}{dx}\\cos^{-1}(x)": "-\\frac{1}{\\sqrt{1-x^2}}",
    "\\frac{d}{dx}\\tan^{-1}(x)": "\\frac{1}{1+x^2}",
    "\\frac{d}{dx}\\cot^{-1}(x)": "-\\frac{1}{1+x^2}",
    "\\frac{d}{dx}\\sec^{-1}(x)": "\\frac{1}{\\left|x\\right|\\sqrt{x^2-1}}",
    "\\frac{d}{dx}\\csc^{-1}(x)": "-\\frac{1}{\\left|x\\right|\\sqrt{x^2-1}}",
    //"\\tan(x)": "\\sec^{2}(x)",
    //"\\cot(x)": "-\\csc^{2}(x)",
};

export default class TrigDerivativeProblem extends ProblemData {
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
            new TrigDerivativeProblem(question, problems[question]));
    }

    checkAnswer(input: string): boolean {
        console.log(problems[this.question]);
        console.log(input);
        return problems[this.question] == input || this.algebraicCheck(input);
    }
}
