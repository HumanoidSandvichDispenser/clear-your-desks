import nerdamer from "nerdamer";
import { pickNFrom } from "../utils";
import ProblemData from "./problem-data";

const problems: { [key: string]: string } = {
    "V_\\textrm{cylinder}": "\\pi r^2 h",
    "V_\\textrm{cone}": "\\frac{1}{3} \\pi r^2 h",
    "A_\\textrm{trapezoid}": "\\frac{1}{2} (b_1 + b_2) h",
    "A_\\textrm{circle}": "\\pi r^2",
    "V_\\textrm{sphere}": "\\frac{4}{3} \\pi r^3",
    "\\textrm{distance formula}": "\\sqrt{x^2 + y^2}",
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

    static generate(count: number): ProblemData[] | undefined {
        const questions = pickNFrom(Object.keys(problems), count);
        return questions.map((question: string) =>
            new GeometryProblem(question, problems[question]));
    }

    checkAnswer(input: string) {
        return this.algebraicCheck(input) || this.evalCheck(input);
    }
}
