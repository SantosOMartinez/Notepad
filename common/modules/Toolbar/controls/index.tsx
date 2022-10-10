import { useMenuState } from "ariakit/menu";

import Icon from "@components/Icon";
import { Menu, MenuButton } from "@components/Menu";

import { Copy as C, Lock as L, Media as M } from "./contextMenus";

const menuConfig = {
	gutter: 4,
	fitViewport: true,
	shift: -2,
	animated: true,
};

/*
    TODO: Finish creating Button visuals for:
    - Collaborate
    - Copy
*/

export const Photos = (props) => {
	const menu = useMenuState(menuConfig);
	return (
		<div {...props}>
			<MenuButton state={menu} type="button">
				<Icon icon="photos" />
				<Icon icon="chevron-down" />
			</MenuButton>
			<Menu state={menu} portal>
				<M />
			</Menu>
		</div>
	);
};

export const Lock = (props) => {
	const menu = useMenuState(menuConfig);
	return (
		<div {...props}>
			<MenuButton state={menu} type="button">
				<Icon icon="lock" />
				<Icon icon="chevron-down" />
			</MenuButton>
			<Menu state={menu} portal>
				<L />
			</Menu>
		</div>
	);
};

export const Copy = (props) => {
	const menu = useMenuState(menuConfig);
	return (
		<div {...props}>
			<MenuButton state={menu} type="button">
				<Icon icon="share" />
			</MenuButton>
			<Menu state={menu} portal>
				<C />
			</Menu>
		</div>
	);
};
