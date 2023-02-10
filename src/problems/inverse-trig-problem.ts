import ProblemData from "./problem-data";
import { pickFrom, pickNFrom, } from "../utils";
import nerdamer from "nerdamer";
import "nerdamer/Algebra.js";

export const DOMAIN: { [key: string]: string[] } = {
    "sin": [
        "-\\frac{\\pi}{2}",
        "-\\frac{\\pi}{3}",
        "-\\frac{\\pi}{4}",
        "-\\frac{\\pi}{6}",
        "0",
        "\\frac{\\pi}{6}",
        "\\frac{\\pi}{4}",
        "\\frac{\\pi}{3}",
        "\\frac{\\pi}{2}",
    ],
    "cos": [
        "0",
        "\\frac{\\pi}{6}",
        "\\frac{\\pi}{4}",
        "\\frac{\\pi}{3}",
        "\\frac{\\pi}{2}",
        "\\frac{2\\pi}{3}",
        "\\frac{3\\pi}{4}",
        "\\frac{5\\pi}{6}",
        "\\pi",
    ],
    "tan": [
        "-\\frac{\\pi}{3}",
        "-\\frac{\\pi}{4}",
        "-\\frac{\\pi}{6}",
        "0",
        "\\frac{\\pi}{6}",
        "\\frac{\\pi}{4}",
        "\\frac{\\pi}{3}",
    ],
    "csc": [
        "\\frac{\\pi}{6}",
        "\\frac{\\pi}{4}",
        "\\frac{\\pi}{3}",
        "\\frac{\\pi}{2}",
        "-\\frac{\\pi}{6}",
        "-\\frac{\\pi}{4}",
        "-\\frac{\\pi}{3}",
        "-\\frac{\\pi}{2}",
    ],
    "sec": [
        "0",
        "\\frac{\\pi}{6}",
        "\\frac{\\pi}{4}",
        "\\frac{\\pi}{3}",
        "\\frac{2\\pi}{3}",
        "\\frac{3\\pi}{4}",
        "\\frac{5\\pi}{6}",
        "\\pi",
    ],
    "cot": [
        "\\frac{\\pi}{6}",
        "\\frac{\\pi}{4}",
        "\\frac{\\pi}{3}",
        "\\frac{\\pi}{2}",
        "\\frac{2\\pi}{3}",
        "\\frac{3\\pi}{4}",
        "\\frac{5\\pi}{6}",
        "\\pi",
    ],
};

export default class InverseTrigProblem extends ProblemData {
    get skillName() {
        return "Trigonometry";
    }

    get instruction() {
        return "Evaluate the expression.";
    }

    get recallTime() {
        return 8;
    }

    fn: string = "";

    constructor(question: string, answer: string, fn?: string) {
        super(question, answer);
        this.fn = fn ?? "";
        //this.angle = angle;
    }

    static generate(count: number): ProblemData[] | undefined {
        const functions = pickNFrom(Object.keys(DOMAIN), count);

        return functions.map((fn) => {
            let angle = pickFrom(DOMAIN[fn]);
            //let fn = pickFrom(["sin", "cos", "tan", "sec", "csc", "cot"]);
            return this.generateSingle(fn, angle);
        });
    }

    static generateSingle(fn: string, angle: string) {
        let original = `\\${fn}(${angle})`;
        let out = nerdamer.convertFromLaTeX(original).toTeX();
        let tex = `\\${fn}^{-1}(${out})`;
        return new InverseTrigProblem(tex, angle);
    }

    checkAnswer(input: string): boolean {
        return input == this.answer || this.algebraicCheck(input) ||
            this.evalCheck(input);
    }
}
