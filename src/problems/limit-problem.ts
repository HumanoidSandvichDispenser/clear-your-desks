import { pickNFrom } from "../utils";
import ProblemData from "./problem-data";

const problems: { [key: string]: string } = {
    "\\lim_{x \\to \\infty} x": "\\infty",
    "\\lim_{x \\to 0^{+}} \\frac{a|x|}{bx}": "\\frac{a}{b}",
    "\\lim_{x \\to 0^{-}} \\frac{a|x|}{bx}": "-\\frac{a}{b}",
    "\\lim_{x \\to 0} \\frac{a|x|}{bx}": "\\textrm{DNE}",
    "\\lim_{x \\to 0} \\frac{\\sin(x)}{x}": "1",
    "\\lim_{x \\to 0} \\frac{a \\sin(x)}{bx}": "\\frac{a}{b}",
    "\\lim_{x \\to \\infty} \\frac{\\sin(x)}{x}": "0",
    "\\lim_{x \\to \\infty} \\frac{sin(x)}{x}": "0",
    "\\lim_{x \\to \\infty} \\sin(x)": "\\textrm{DNE}",
    //"\\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}": "f'(x)",
};

export default class LimitProblem extends ProblemData {
    get skillName() {
        return "Limits";
    }

    get instruction() {
        return "Find the limit.";
    }

    get recallTime() {
        return 5;
    }

    constructor(question: string, answer: string) {
        super(question, answer);
    }

    static generate(count: number): ProblemData[] | undefined {
        const questions = pickNFrom(Object.keys(problems), count);
        return questions.map((question: string) =>
            new LimitProblem(question, problems[question]));
    }

    checkAnswer(input: string): boolean {
        return problems[this.question] == input || this.algebraicCheck(input);
    }
}
