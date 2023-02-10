import ProblemData from "./problem-data";
import { pickNFrom } from "../utils";

const problems: { [key: string]: string } = {
    "\\int_{a}^{b} v(t) dt": "s\\left(b\\right)-s\\left(a\\right)",
    "\\int_{a}^{b} a(t) dt": "v\\left(b\\right)-v\\left(a\\right)",
    "\\frac{d}{dt} v(t)": "a\\left(t\\right)",
    "\\frac{d}{dt} s(t)": "v\\left(t\\right)",
    "\\int_{a}^{b} \\int_{a}^{b} a(t) dt": "s(a)-s(b)",
};

export default class ParticleMotionProblem extends ProblemData {
    get skillName() {
        return "Particle Motion";
    }

    get instruction() {
        return "Solve the particle motion problem.";
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
            new ParticleMotionProblem(question, problems[question]));
    }

    checkAnswer(input: string): boolean {
        return problems[this.question] == input;
    }
}
