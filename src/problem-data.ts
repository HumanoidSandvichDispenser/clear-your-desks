export default class ProblemData {
    /**
     * The name of the skill this problem involves.
     */
    static skillName: string;

    /**
     * The instuctions given to the user to complete the problem.
     */
    static instructions: string;

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

    get instructionsStr(): string {
        return (this.constructor as typeof ProblemData).instructions;
    }
}
