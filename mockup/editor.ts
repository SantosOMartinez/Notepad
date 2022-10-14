import { Descendant } from "slate";

import { ElementType as Type } from "@type/editor";

export const initialDocument: Descendant[] = [
	{
		type: Type.Title,
		children: [{ text: "Apple Notes " }],
	},
	{
		type: Type.Body,
		children: [
			{ text: "This is a " },
			{ text: "recreation", bold: true },
			{ text: " of " },

			{
				text: "Apple Notes",
				link: {
					url: "https://apps.apple.com/us/app/notes/id1110145109",
				},
			},
			{ text: " on the " },
			{ text: "web", underline: true },
			{ text: "." },
		],
	},
	{
		type: Type.DashedList,
		children: [{ text: "Dashed List", strikethrough: true }],
	},
	{
		type: Type.BulletedList,
		children: [{ text: "Bullet " }, { text: "List", underline: true }],
	},
	{
		type: Type.NumberedList,
		children: [
			{ text: "Number " },
			{ text: "List", bold: true, underline: true },
		],
	},
];
