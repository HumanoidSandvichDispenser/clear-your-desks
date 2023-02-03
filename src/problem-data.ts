export default class ProblemData {
    question: string;

    answer: string;

    constructor(question: string, answer: string) {
        this.question = question;
        this.answer = answer;
    }

    static generate(): ProblemData[] | undefined {
        return undefined;
    }

    checkAnswer(input: string) {
        // TODO: implement
    }
}
