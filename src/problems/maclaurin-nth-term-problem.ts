import ProblemData from "./problem-data";
import { pickNFrom } from "../utils";
import MaclaurinProblem from "./maclaurin-problem";

const problems: { [key: string]: string } = {
    "\\frac{1}{1 + x}": "\\left(-1\\right)^nx^n",
    "\\frac{1}{1 - x}": "x^n",
    "e^x": "\\frac{x^n}{n!}",
    "\\sin x": "\\frac{\\left(-1\\right)^nx^{2n+1}}{\\left(2n+1\\right)!}",
    "\\cos x": "\\frac{\\left(-1\\right)^nx^{2n}}{\\left(2n\\right)!}",
    "\\tan^{-1} x": "\\frac{\\left(-1\\right)^nx^{2n+1}}{2n+1}",
    "\\ln(1 + x)": "\\frac{\\left(-1\\right)^nx^{n+1}}{n+1}",
};

// \\frac{\\left(-1\\right)^nx^{2n+1}}{\\left(2n+1\\right)!}

export default class MaclaurinNthTermProblem extends MaclaurinProblem {
    get skillName() {
        return "Maclaurin Series (nth term)";
    }

    get instruction() {
        return "Find the nth term of the Maclaurin series generated";
    }

    get recallTime() {
        return 10;
    }

    constructor(question: string, answer: string) {
        super(question, answer);
    }

    static generate(count: number): ProblemData[] | undefined {
        const questions = pickNFrom(Object.keys(problems), count);
        return questions.map((question: string) =>
            new MaclaurinNthTermProblem(question, problems[question]));
    }
}
