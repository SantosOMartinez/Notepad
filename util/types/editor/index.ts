import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

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
