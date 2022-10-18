import { ElementNode, LexicalNode, ParagraphNode } from "lexical";

import { ElementType as Type } from "@type/editor";

import styles from "./nodes.module.css";

import type { NodeKey } from "lexical";
export class MonospacedNode extends ParagraphNode {
	constructor(key?: NodeKey) {
		super(key);
	}

	static getType(): string {
		return Type.Monospaced;
	}

	static clone(node: MonospacedNode): MonospacedNode {
		return new MonospacedNode(node.__key);
	}

	createDOM(): HTMLElement {
		// Define the DOM element here
		const dom = document.createElement("p", {});
		dom.classList.add(styles.monospaced);
		return dom;
	}

	updateDOM(prevNode: MonospacedNode, dom: HTMLElement): boolean {
		// Returning false tells Lexical that this node does not need its
		// DOM element replacing with a new copy from createDOM.
		return false;
	}
}

export function $createMonospacedNode(): MonospacedNode {
	return new MonospacedNode();
}

export function $isMonospacedNode(node?: LexicalNode): boolean {
	return node instanceof MonospacedNode;
}
