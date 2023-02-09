import nerdamer from "nerdamer";
import { pickNFrom } from "../utils";
import ProblemData from "./problem-data";

const problems: { [key: string]: string } = {
    "\\textrm{Volume of a cylinder}": "\\pi r^2 h",
    "\\textrm{Volume of a cone}": "\\frac{1}{3} \\pi r^2 h",
    "\\textrm{Area of a trapezoid}": "\\frac{b_1 + b_2}{2} h",
    "\\textrm{Area of a circle}": "\\pi r^2",
};

export default class GeometryProblem extends ProblemData {
    get skillName() {
        return "Geometry";
    }

    get instruction() {
        return "Find the formula.";
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
            new GeometryProblem(question, problems[question]));
    }

    checkAnswer(input: string): boolean {
        try {
            let nInput = nerdamer.convertFromLaTeX(input);
            let nQuestion = nerdamer.convertFromLaTeX(this.answer);

            // raise both numbers to the second power since nerdamer can not
            // rationalize denominators by itself
            let algebraicCheck = nInput.pow(2).eq(nQuestion.pow(2));
            if (algebraicCheck) {
                return true;
            }

            let evalCheck = nInput.evaluate().eq(nQuestion.evaluate());
            if (evalCheck) {
                return true;
            }

            return false;
        } catch (err) {
            if (err instanceof Error) {
                if (err.name == "ParseError") {
                    return false;
                }
            }
            throw err;
        }
    }
}
