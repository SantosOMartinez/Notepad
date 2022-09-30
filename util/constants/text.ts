import { Suggestion } from "@type/search";

export const suggestions: Suggestion[] = [
	{ icon: "profile", name: "Shared Notes", tag: "Shared" },
	{ icon: "lock-filled", name: "Locked Notes", tag: "Locekd" },
	{ icon: "checklist", name: "Notes with Checklists", tag: "Checklists" },
	{ icon: "draw", name: "Notes with Drawings", tag: "Drawings" },
	{
		icon: "scan-document",
		name: "Notes with Scanned Documents",
		tag: "Scanned",
	},
	{ icon: "attachment", name: "Notes with Attachments", tag: "Attachments" },
];
