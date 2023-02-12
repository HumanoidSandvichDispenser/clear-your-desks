import { assert, describe, expect, it } from "vitest";
import Skill from "./skill";

describe("predictRetentionDecay method", () => {
    it("should correctly predict the retention decay", () => {
        const skill = new Skill("", 1);
        skill.score = 2;
        let hours = 1;
        let ms = hours * 3600 * 1000;
        let y = skill.predictRetentionDecay(skill.lastRetainTime + ms);
        expect(y).toBeCloseTo(0.744, 2);
    });

    it("should correctly predict the retention decay", () => {
        const skill = new Skill("", 1);
        skill.score = 1;
        let hours = 4;
        let ms = hours * 3600 * 1000;
        let y = skill.predictRetentionDecay(skill.lastRetainTime + ms);
        expect(y).toBeCloseTo(0.1353, 4);
    });
});

describe("retain method", () => {
    it("should increase k if score is positive", () => {
        const skill = new Skill("", 1);
        skill.score = 0;
        skill.retain(1);
        expect(skill.k).toBeCloseTo(0.5);
    });

    it("should decrease k if score is negative", () => {
        const skill = new Skill("", 1);
        skill.score = 3;
        skill.retain(-6);
        expect(skill.k).toBeCloseTo(1.795, 3);
    });
});
