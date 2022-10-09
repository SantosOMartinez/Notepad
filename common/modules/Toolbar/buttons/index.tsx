import { useMenuState } from "ariakit/menu";
import { usePopoverState } from "ariakit/popover";

import Icon from "@components/Icon";
import { Menu, MenuButton, Popover, PopoverDisclosure } from "@components/Menu";
import { useBrowserName } from "@hooks/useBrowserName";

import styles from "./buttons.module.css";
import { Copy as C, Lock as L, Media as M } from "./Controls";

const img =
	"https://is5-ssl.mzstatic.com/image/thumb/Purple112/v4/f0/e0/7e/f0e07e01-0a36-0ee3-edea-5f0e28cac5db/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x600wa.png";

const url = "https://apps.apple.com/us/app/notes/id1110145109";

const menuConfig = {
	gutter: 4,
	fitViewport: true,
	shift: -2,
	animated: true,
};

/*
    TODO: Finish creating Button visuals for:
    - Format
    - Collaborate
    - Copy
*/

export const Format = () => {
	const popover = usePopoverState({ animated: true });

	return (
		<>
			<PopoverDisclosure state={popover} icon="format" />
			<Popover state={popover}>Format</Popover>
		</>
	);
};

export const Link = (props) => {
	const popover = usePopoverState({ animated: true });

	const browser = useBrowserName();

	return (
		<div {...props}>
			<PopoverDisclosure state={popover} icon="link" />
			<Popover state={popover}>
				<p className={styles.header}>Add App Link</p>
				<div className={styles.link}>
					<img className={styles.img} src={img} />
					<div className={styles.text}>
						<p className={styles.title}>{url}</p>
						<p className={styles.description}>{browser}</p>
					</div>
					<button className={styles.button}>Add Link</button>
				</div>
			</Popover>
		</div>
	);
};

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
