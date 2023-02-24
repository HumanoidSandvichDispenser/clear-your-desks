import { pickNFrom } from "../utils";
import ProblemData from "./problem-data";

const problems: { [key: string]: string } = {
    "\\frac{d}{dx}x^n": "nx^{n - 1}",
    "\\frac{d}{dx}e^x": "e^x",
    "\\frac{d}{dx}a^x": "a^x\\ln(a)", // it's ln(a) but nerdamer uses `log` for `ln`
    "\\frac{d}{dx}a^b": "\\frac{db}{dx}a^b\\ln(a)", // same here
    "\\frac{d}{dx}\\log_b(x)": "\\frac{1}{x\\ln b}", // same here
    "\\frac{d}{dx}\\ln(x)": "\\frac{1}{x}",
    "\\frac{d}{dx}f(g(x))": "f^{\\prime}\\left(g\\left(x\\right)\\right)g^{\\prime}\\left(x\\right)",
};

export default class DifferentiationProblem extends ProblemData {
    get skillName() {
        return "Differentiation";
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
            new DifferentiationProblem(question, problems[question]));
    }

    checkAnswer(input: string): boolean {
        if (problems[this.question] == input) {
            return true;
        }
        // nerdamer uses `log` instead of `ln`
        let answer = this.answer;
        input = input.replace("\\ln", "\\log");
        this.answer = this.answer.replace("\\ln", "\\log");
        let r = this.algebraicCheck(input);
        this.answer = answer;
        return r;
    }
}
