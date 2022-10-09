import { MenuItem, RecursiveMenu as Menu } from "@components/Menu";

import { Copy as C, Lock as L, Media as M } from "../Controls";

interface Props {
	visible?: boolean[];
	className?: string;
}

const Link = () => (
	<Menu label="Link">
		<MenuItem label="Add Link" />
	</Menu>
);

const Media = () => (
	<Menu label="Media">
		<M />
	</Menu>
);

const Lock = () => (
	<Menu label="Lock">
		<L />
	</Menu>
);

const Share = () => (
	<Menu label="Share">
		<MenuItem label="Share Note" />
	</Menu>
);

const Copy = () => (
	<Menu label="Send a Copy">
		<C />
	</Menu>
);

const menu = [Link, Media, Lock, Share, Copy];

export default ({ visible = [], className }: Props) => {
	return (
		<Menu icon="chevron-right-double">
			{menu.map((Element, i) =>
				visible.at(i) ? <Element key={i} /> : null
			)}
		</Menu>
	);
};
