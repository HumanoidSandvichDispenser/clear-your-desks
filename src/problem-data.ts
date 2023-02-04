export default class ProblemData {
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
    }
}
