export enum RDMResourceType {
	WhiteMana = "White Mana", // [0, 100]
	BlackMana = "Black Mana", // [0, 100]
	ManaStacks = "Mana Stacks", // [0, 3]

	Acceleration = "Acceleration", // [0, 1]
	Dualcast = "Dualcast", // [0, 1]
	Embolden = "Embolden", // [0, 1]
	GrandImpactReady = "Grand Impact Ready", // [0, 1]
	MagickBarrier = "Magick Barrier", // [0, 1]
	MagickedSwordplay = "Magicked Swordplay", // [0, 3]
	Manafication = "Manafication", // [0, 6]
	PrefulgenceReady = "Prefulgence Ready", // [0, 1]
	ThornedFlourish = "Thorned Flourish", // [0, 1]
	VerfireReady = "Verfire Ready", // [0, 1]
	VerstoneReady = "Verstone Ready", // [0, 1]

	// secret combo trackers
	// 0 = no melee combo, 1 = after 1st, 2 = after 2nd
	RDMMeleeCounter = "RDM Melee Combo", // [0, 2]
	// 0 = finishers not started, 1 = after verflare/holy, 2 = after scorch
	RDMFinisherCounter = "RDM Finisher Combo", // [0, 2]
	// 0 = no moulinet combo, 1 = after 1st, 2 = after 2nd
	RDMAoECounter = "RDM AoE Combo", // [0, 2]
}

export enum RDMCooldownType {
	cd_CorpsACorps = "cd_CorpsACorps",
	cd_Displacement = "cd_Displacement",
	cd_Fleche = "cd_Fleche",
	cd_Acceleration = "cd_Acceleration",
	cd_ContreSixte = "cd_ContreSixte",
	cd_Embolden = "cd_Embolden",
	cd_Manafication = "cd_Manafication",
	cd_MagickBarrier = "cd_MagickBarrier",
	cd_ViceOfThorns = "cd_ViceOfThorns",
	cd_Prefulgence = "cd_Prefulgence",
}
