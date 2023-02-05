import ProblemData from "./problem-data";
import { pickFrom, pickNFrom, random, range } from "./utils";
import nerdamer, { diff } from "nerdamer";
import "nerdamer/Algebra.js";

export const ANGLES = [
    "0",
    "\\frac{\\pi}{6}",
    "\\frac{\\pi}{4}",
    "\\frac{\\pi}{3}",
    "\\frac{\\pi}{2}",
    "\\frac{2\\pi}{3}",
    "\\frac{3\\pi}{4}",
    "\\frac{5\\pi}{6}",
    "\\pi",
    "\\frac{7\\pi}{6}",
    "\\frac{5\\pi}{4}",
    "\\frac{4\\pi}{3}",
    "\\frac{3\\pi}{2}",
    "\\frac{5\\pi}{3}",
    "\\frac{7\\pi}{4}",
    "\\frac{11\\pi}{6}",
];

export default class TrigProblem extends ProblemData {
    fn: string = "";
    args: string = "";

    constructor(question: string, answer: string, fn: string) {
        super(question, answer);
        this.fn = fn;
    }

    static generate(count: number): ProblemData[] | undefined {
        // randomly pick `count` amount of angles
        let numerators = pickNFrom(ANGLES, count);

        return numerators.map((numerator) => {
            // generate random function
            let fn = pickFrom(["sin", "cos", "tan", "sec", "csc", "cot"]);
            return this.generateSingle(fn, numerator);
        });
    }

    static generateSingle(fn: string, angle: string) {
        let tex = `\\${fn}(${angle})`;
        try {
            let expr = nerdamer.convertFromLaTeX(tex);
            return new TrigProblem(tex, expr.toTeX(), fn);
        } catch (err) {
            if (err instanceof Error) {
                if (err.message.includes(" is undefined for ")) {
                    return new TrigProblem(tex, "\\textrm{undefined}", fn);
                }
            }
            throw err;
        }
    }

    checkAnswer(input: string): boolean {
        if (this.answer.includes("undefined")) {
            return input.includes("undefined");
        }
        let nInput = nerdamer(input);
        let nQuestion = nerdamer(this.answer);
        return nInput.eq(nQuestion);
    }
}
