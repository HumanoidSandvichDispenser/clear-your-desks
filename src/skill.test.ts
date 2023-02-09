import { assert, describe, expect, it } from "vitest";
import Skill from "./skill";

describe("predictRetentionDecay method", () => {
    it("should correctly predict the retention decay", () => {
        const skill = new Skill("", 1);
        skill.k = 1;
        let hours = 1;
        let ms = hours * 3600 * 1000;
        let y = skill.predictRetentionDecay(skill.lastRetainTime + ms);
        expect(y).toBeCloseTo(0.368, 2);
    });

    it("should correctly predict the retention decay", () => {
        const skill = new Skill("", 1);
        skill.k = 2;
        let hours = 4;
        let ms = hours * 3600 * 1000;
        let y = skill.predictRetentionDecay(skill.lastRetainTime + ms);
        expect(y).toBeCloseTo(0.000335, 6);
    });
});

describe("retain method", () => {
    it("should increase k if score is positive", () => {
        const skill = new Skill("", 1);
        skill.k = 2;
        skill.retain(1);
        expect(skill.k).toBeCloseTo(1.5);
    });

    it("should decrease k if score is negative", () => {
        const skill = new Skill("", 1);
        skill.k = 3;
        skill.retain(-2);
        expect(skill.k).toBeCloseTo(3.705, 1);
    });
});
