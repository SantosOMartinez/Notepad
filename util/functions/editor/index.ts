import {
    Editor,
    EditorNodesOptions,
    Node,
    PropsCompare,
    PropsMerge,
    Range,
    Transforms
} from "slate";

interface ModifyNodes<T extends Node> extends EditorNodesOptions<T> {
	calculate?: (node: T) => Partial<T>;

	compare?: PropsCompare;
	merge?: PropsMerge;
	hanging?: boolean;
	split?: boolean;
}

export const modifyNodes = <T extends Node>(
	editor: Editor,
	options: ModifyNodes<T>
) => {
	const getConfig = ({
		compare,
		hanging,
		merge,
		match,
		split,
		calculate,
		...rest
	}: ModifyNodes<T>) => ({
		calculate,
		eConfig: { ...rest, match },
		tConfig: { compare, hanging, merge, split, match },
	});

	const { eConfig, tConfig, calculate } = getConfig(options);

	const nodes = Editor.nodes(editor, eConfig);
	const { selection } = editor;

	for (const [node, path] of nodes) {
		const at = Range.intersection(Editor.range(editor, path), selection);
		Transforms.setNodes(editor, calculate(node), { ...tConfig, at });
	}
};
