import nerdamer from "nerdamer";
import Algebrite from "algebrite";
import AlgebraLatex from "algebra-latex";

export default class ProblemData {
    /**
     * The name of the skill this problem involves.
     */
    get skillName() {
        return "";
    }

    /**
     * The instuctions given to the user to complete the problem.
     */
    get instruction() {
        return "";
    }

    /**
     * Expected recall time in seconds.
     */
    get recallTime() {
        return 5;
    }

    /**
     * The question of the problem in LaTeX.
     */
    question: string;

    /**
     * The answer to the problem in LaTeX.
     */
    answer: string;

    constructor(question: string, answer: string) {
        this.question = question;
        this.answer = answer;
    }

    static generate(count: number): ProblemData[] | undefined {
        return undefined;
    }

    checkAnswer(input: string): boolean {
        // TODO: implement
        throw new Error("Not implemented.");
    }

    algebraicCheck(input: string): boolean {
        try {
            let nInput = nerdamer.convertFromLaTeX(input);
            let nAnswer = nerdamer.convertFromLaTeX(this.answer);

            let algebraicCheck = nInput.eq(nAnswer);

            if (algebraicCheck) {
                return true;
            }

            // raise both numbers to the second power since nerdamer can not
            // rationalize denominators by itself
            algebraicCheck = nInput.pow(2).eq(nAnswer.pow(2));

            if (algebraicCheck) {
                return true;
            }
        } catch (err) {
            if (err instanceof Error) {
                if (err.name == "ParseError") {
                    console.log("parse error!");
                    return false;
                }
            }
            throw err;
        }

        // at this point nerdamer is sucking at doing this so let's use
        // algebrite
        return false;
    }

    algebriteCheck(input: string): boolean {
        let inputObj = new AlgebraLatex().parseLaTeX(input);
        let answerObj = new AlgebraLatex().parseLaTeX(this.answer);
        let res = Algebrite.check(`${inputObj} = ${answerObj}`);
        return res == "1";
    }

    evalCheck(input: string): boolean {
        try {
            let nInput = nerdamer.convertFromLaTeX(input);
            let nQuestion = nerdamer.convertFromLaTeX(this.answer);

            return nInput.evaluate().eq(nQuestion.evaluate());
        } catch (err) {
            if (err instanceof Error) {
                if (err.name == "ParseError") {
                    return false;
                }
            }
            throw err;
        }
    }

    /**
     * @param dt The time in seconds it took to answer
     */
    calculateScore(dt: number): number {
        let penalty = 0;

        // just for rewarding even faster players
        let fastRecallTime = this.recallTime / 4;
        if (dt > fastRecallTime) {
            penalty += (dt - fastRecallTime) * 2;
        }

        return 100 - penalty;
    }
}
