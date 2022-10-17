import { EditorThemeClasses, Klass, LexicalEditor, LexicalNode } from "lexical";

import { InitialEditorStateType } from "@lexical/react/LexicalComposer";

export interface EditorConfig {
	editor__DEPRECATED?: LexicalEditor | null;
	namespace: string;
	nodes?: ReadonlyArray<Klass<LexicalNode>>;
	onError: (error: Error, editor: LexicalEditor) => void;
	editable?: boolean;
	theme?: EditorThemeClasses;
	editorState?: InitialEditorStateType;
}

export * from "./element";
export * from "./text";
export * from "./media";
