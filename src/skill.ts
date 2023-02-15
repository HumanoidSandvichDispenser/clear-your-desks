import ProblemData from "./problems/problem-data";

export interface ISkill {
    /**
     * The name of the skill.
     */
    name: string;

    /**
     * The probability of retaining this skill.
     */
    retention: number;

    /**
     * The rate of retention decay (`k` in dy/dt = ky).
     */
    //k: number;

    /**
     * The score of this skill.
     */
    score: number;

    /**
     * The UNIX timestamp when the skill was last modified (for skill drain).
     */
    lastRetainTime: number;
}

export default class Skill implements ISkill {
    name: string;
    retention: number;
    lastRetainTime: number;
    score: number = 0;
    problem?: typeof ProblemData;

    constructor(
        name: string,
        retention: number,
        timeOrigin?: number,
        problem?: typeof ProblemData,
    ) {
        this.name = name;
        this.retention = retention ?? 0;
        this.lastRetainTime = timeOrigin ?? new Date().getTime();
        this.problem = problem;
    }

    static fromInfo(info: ISkill) {
        const s = new Skill(info.name, info.retention, info.lastRetainTime);
        s.score = info.score;
        return s;
    }

    /**
     * Predicted retention over a period of time.
     * @param endTime The time at which the prediction should be calculated
     * @returns The predicted retention from 0 to 1.
     */
    predictRetentionDecay(endTime?: number): number {
        // this is in ms
        const dTime = (endTime ?? new Date().getTime()) - this.lastRetainTime;

        const hours = dTime / 1000 / 3600;

        // forgetting curve is modeled with dy/dt = -ky
        let y = Math.pow(Math.E, -this.k * hours);

        // predicted value can not be less than 0
        return Math.max(y, 0);
    }

    /**
     * Retain this skill and change the rate of forgetting or retention decay.
     * @param score The factor to change the rate of forgetting by. Negative
     * numbers causes the retention/forgetting curve to be steeper.
     */
    retain(score: number): number {
        score = Math.sign(score) * (Math.min(Math.abs(score), 8));
        this.retention = 1;
        this.lastRetainTime = new Date().getTime();
        //return this.k = this.predictK(score);
        //this.score = (this.score ?? 0) + score;
        if (this.score == undefined) {
            this.score = 0;
        }
        this.score += score;
        return this.score;
    }

    predictK(score: number): number {
        // let `factor` be the score normalized from all reals to (-1, 1) using
        // the curve of arctan
        let factor = Math.atan(score) * 2 / Math.PI;

        // absolute min this can go is 0.005
        return Math.max(this.k * (1 - factor), 0.005);
    }

    get retentionPercentage(): string {
        return Math.round(this.predictRetentionDecay() * 100) + "% retention";
    }

    get k(): number {
        let k = Math.atan(-this.score) * 2 / Math.PI + 1;
        if (Number.isNaN(k)) {
            return 1;
        }
        return k;
    }
}
