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
    k: number;

    /**
     * The UNIX timestamp when the skill was last modified (for skill drain).
     */
    lastRetainTime: number;
}

export default class Skill implements ISkill {
    name: string;
    retention: number;
    k: number = 1;
    lastRetainTime: number;

    constructor(name: string, retention: number, timeOrigin?: number) {
        this.name = name;
        this.retention = retention ?? 0;
        this.lastRetainTime = timeOrigin ?? new Date().getTime();
    }

    static fromInfo(info: ISkill) {
        const s = new Skill(info.name, info.retention, info.lastRetainTime);
        s.k = info.k;
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
        this.retention = 1;
        this.lastRetainTime = new Date().getTime();
        return this.k = this.predictK(score);
    }

    predictK(score: number): number {
        // let `factor` be the score normalized from all reals to (-1, 1) using
        // the curve of arctan
        let factor = Math.atan(score) * 2 / Math.PI;
        return this.k - factor;
        //return this.k * (-factor + 1);
    }

    get retentionPercentage(): string {
        return Math.round(this.predictRetentionDecay() * 100) + "%";
    }
}
