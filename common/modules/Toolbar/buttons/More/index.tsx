import { Menu as BaseMenu, MenuButton, useMenuState } from "ariakit/menu";
import cn from "classnames";

import Icon from "@components/Icon";
import { Menu, MenuItem, MenuSeparator } from "@components/Menu";

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
		<MenuItem label="Photos..." />
		<MenuSeparator />
		<MenuItem label="Take Photo" />
		<MenuItem label="Scan Documents" />
		<MenuItem label="Add Sketch" />
	</Menu>
);

const Lock = () => (
	<Menu label="Lock">
		<MenuItem label="Close All Locked Notes" disabled />
		<MenuSeparator />
		<MenuItem label="Lock Note" />
	</Menu>
);

const Share = () => (
	<Menu label="Share">
		<MenuItem label="Share Note" />
	</Menu>
);

const Copy = () => (
	<Menu label="Send a Copy">
		<MenuItem label="Mail" />
		<MenuItem label="Print" />
		<MenuSeparator />
		<MenuItem label="More..." />
	</Menu>
);

const menu = [Link, Media, Lock, Share, Copy];

export default ({ visible = [], className }: Props) => {
	return (
		<Menu button={<Icon icon="chevron-right-double" />}>
			{menu.map((Element, i) =>
				visible.at(i) ? <Element key={i} /> : null
			)}
		</Menu>
	);
};
