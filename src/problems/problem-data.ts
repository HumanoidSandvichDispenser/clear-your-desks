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
