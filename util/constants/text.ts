import { SearchTag, Suggestion } from "@type/search";

export const suggestions: Suggestion[] = [
	{ icon: "profile", name: "Shared Notes", tag: SearchTag.Shared },
	{ icon: "lock-filled", name: "Locked Notes", tag: SearchTag.Locked },
	{
		icon: "checklist",
		name: "Notes with Checklists",
		tag: SearchTag.Checklists,
	},
	{ icon: "draw", name: "Notes with Drawings", tag: SearchTag.Drawings },
	{
		icon: "scan-document",
		name: "Notes with Scanned Documents",
		tag: SearchTag.Scanned,
	},
	{
		icon: "attachment",
		name: "Notes with Attachments",
		tag: SearchTag.Attachments,
	},
];
