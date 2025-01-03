import {
	damageData,
	rotationTestSetup,
	rotationTestTeardown,
	makeTestWithConfigFn,
	applySkill,
	compareDamageTables,
} from "./utils";

import { controller } from "../Controller/Controller";
import { ShellJob } from "../Controller/Common";
import { PotencyModifierType } from "../Game/Potency";
import { ResourceType, SkillName } from "../Game/Common";
import { XIVMath } from "../Game/XIVMath";
import { SAMState } from "../Game/Jobs/SAM";
import { getResourceInfo, ResourceInfo } from "../Game/Resources";

beforeEach(rotationTestSetup);

afterEach(rotationTestTeardown);

const testWithConfig = makeTestWithConfigFn(ShellJob.SAM);

it("has correct GCD under fuka", () => {
	testWithConfig({}, () => {
		const state = controller.game as SAMState;
		const speedModifier = state.getFukaModifier();

		// 2.5 base
		expect(XIVMath.preTaxGcd(100, 420, 2.5, speedModifier)).toEqual(2.17);
		// 2.47 base
		expect(XIVMath.preTaxGcd(100, 693, 2.5, speedModifier)).toEqual(2.14);
	});
});

it(
	"continues combos after a meikyo",
	testWithConfig({}, () => {
		[
			SkillName.MeikyoShisui,
			SkillName.Shifu,
			SkillName.Shifu,
			SkillName.Shifu,
			SkillName.Kasha, // combo'd
		].forEach(applySkill);
		// wait for damage applications
		controller.step(4);
		const state = controller.game as SAMState;
		expect(state.resources.get(ResourceType.Kenki).availableAmount()).toEqual(25);
		compareDamageTables([
			{
				skillName: SkillName.Shifu,
				displayedModifiers: [PotencyModifierType.COMBO],
				hitCount: 3,
			},
			{
				skillName: SkillName.Kasha,
				displayedModifiers: [PotencyModifierType.COMBO, PotencyModifierType.POSITIONAL],
				hitCount: 1,
			},
			{
				skillName: SkillName.MeikyoShisui,
				displayedModifiers: [],
				hitCount: 1,
			},
		]);
	}),
);

it(
	"generates kenki and shoha in meditation",
	testWithConfig({}, () => {
		const state = controller.game as SAMState;
		state.resources.get(ResourceType.InCombat).overrideCurrentValue(1);
		applySkill(SkillName.Meditate);
		controller.step(30); // longer than the duration to make sure we don't keep ticking
		expect(state.resources.get(ResourceType.Kenki).availableAmount()).toEqual(50);
		expect(state.resources.get(ResourceType.Meditation).availableAmount()).toEqual(3);
	}),
);
