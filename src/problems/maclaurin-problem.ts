import ProblemData from "./problem-data";
import { pickNFrom } from "../utils";

const problems: { [key: string]: string } = {
    "\\frac{1}{1 + x}": "1-x+x^2-x^3",
    "\\frac{1}{1 - x}": "1+x+x^2+x^3",
    "e^x": "1+\\frac{x}{1!}+\\frac{x^2}{2!}+\\frac{x^3}{3!}",
    "\\sin x": "x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\frac{x^7}{7!}",
    "\\cos x": "1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\frac{x^6}{6!}",
    "\\tan^{-1} x": "x - \\frac{x^3}{3} + \\frac{x^5}{5} - \\frac{x^7}{7}",
    "\\ln(1 + x)": "x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\frac{x^4}{4}",
};

export default class MaclaurinProblem extends ProblemData {
    get skillName() {
        return "Maclaurin Series";
    }

    get instruction() {
        return "Find the first four terms of the Maclaurin series generated";
    }

    get recallTime() {
        return 15;
    }

    constructor(question: string, answer: string) {
        super(question, answer);
    }

    static generate(count: number): ProblemData[] | undefined {
        const questions = pickNFrom(Object.keys(problems), count);
        return questions.map((question: string) =>
            new MaclaurinProblem(question, problems[question]));
    }

    checkAnswer(input: string): boolean {
        return problems[this.question] == input || this.algebraicCheck(input) ||
            this.evalCheck(input);
    }
}
