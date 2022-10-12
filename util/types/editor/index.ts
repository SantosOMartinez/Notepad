import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

import { Element } from "./element";
import { Text } from "./text";

declare module "slate" {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor;
		Element: Element;
		Text: Text;
	}
}

export * from "./element";
export * from "./text";
export * from "./media";
