import { pickNFrom } from "../utils";
import ProblemData from "./problem-data";

const problems: { [key: string]: string } = {
    "\\sin(x)": "\\cos(x)",
    "\\cos(x)": "-\\sin(x)",
    //"\\tan(x)",
    //"\\cot(x)",
    "\\sec(x)": "\\sec(x) \\tan(x)",
    "\\csc(x)": "-\\csc(x) \\cot(x)",
    "x^n": "nx^{n - 1}",
    "e^x": "e^x",
    "a^x": "a^x \\ln(a)", // it's ln(a)rbut nerdamer uses `log` for `ln`
    "a^b": "\\frac{db}{dx} a^b \\ln(a)", // same here
    "\\log_b(x)": "\\frac{1}{x\\ln b}", // same here
    "\\ln(x)": "\\frac{1}{x}",
};

export default class LimitProblem extends ProblemData {
    get skillName() {
        return "Limits";
    }

    get instruction() {
        return "Differentiate the expression.";
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
            new LimitProblem("\\frac{d}{dx}" + question, problems[question]));
    }

    checkAnswer(input: string): boolean {
        // nerdamer uses `log` instead of `ln`
        let answer = this.answer;
        input = input.replace("\\ln", "\\log");
        this.answer.replace("\\ln", "\\log");
        let r = problems[this.question] == input || this.algebraicCheck(input);
        this.answer = answer;
        return r;
    }
}
