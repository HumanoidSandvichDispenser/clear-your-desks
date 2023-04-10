import { pickNFrom } from "../utils";
import ProblemData from "./problem-data";

const problems: { [key: string]: string } = {
    "\\frac{dy}{dt} = ky, y = ?": "y_0e^{kt}",
    "\\frac{dy}{dt} = ky(L - y), y = ?": "\\frac{L}{1 + Ae^{-Lkt}}",
};

export default class DifferentialEquationProblem extends ProblemData {
    get skillName() {
        return "Differential Equations";
    }

    get instruction() {
        return "Find y given dy/dx.";
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
            new DifferentialEquationProblem(question, problems[question]));
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
