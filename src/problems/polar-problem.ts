import nerdamer from "nerdamer";
import { pickNFrom } from "../utils";
import ProblemData from "./problem-data";

const problems: { [key: string]: string } = {
    "y": "r\\sin\\theta",
    "x": "r\\cos\\theta",
    "x = a, r(\\theta) = ?": "a\\sec\\theta",
    "y = a, r(\\theta) = ?": "a\\csc\\theta",
    //"Ax + By = C, r(\\theta) = ?": "\\frac{C}{A\\cos\\theta + B\\sin\\theta}",
};

export default class PolarProblem extends ProblemData {
    get skillName() {
        return "Polar Equations";
    }

    get instruction() {
        return "Convert the rectangular expression to polar.";
    }

    static generate(count: number): ProblemData[] | undefined {
        const questions = pickNFrom(Object.keys(problems), count);
        return questions.map((question: string) =>
            new PolarProblem(question, problems[question]));
    }

    checkAnswer(input: string) {
        return this.algebraicCheck(input) || this.evalCheck(input);
    }
}
