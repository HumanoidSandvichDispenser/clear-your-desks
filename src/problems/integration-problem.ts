import { pickNFrom } from "../utils";
import ProblemData from "./problem-data";

const problems: { [key: string]: string } = {
    "\\int f^{\\prime}(x) dx": "f(x) + C",
    "\\int x^n dx": "\\frac{x^{n + 1}}{n + 1} + C",
    "\\int \\log(x) dx": "x \\log(x) - x + C",
    "\\int e^x dx": "e^x + C",
    "\\int \\sin(x) dx": "-\\cos(x) + C",
    "\\int \\cos(x) dx": "\\sin(x) + C",
    "\\int \\frac{1}{x} dx": "\\ln\\left|x\\right|+C",
    "\\int udv": "uv-\\int vdu",
    "\\frac{d}{dx} \\int_{0}^{g(x)} f(t) dt":
        "f\\left(g\\left(x\\right)\\right)g^{\\prime}\\left(x\\right)",
    "\\int_a^b f(x) dx + \\int_b^c f(x) dx": "\\int_a^cf\\left(x\\right)dx",
};

export default class LimitProblem extends ProblemData {
    get skillName() {
        return "Integration";
    }

    get instruction() {
        return "Integrate the expression.";
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
            new LimitProblem(question, problems[question]));
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
