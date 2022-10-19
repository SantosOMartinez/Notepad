import { useMenuState } from "ariakit/menu";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

import Button from "@components/Button";
import Icon from "@components/Icon";
import { Menu, MenuButton } from "@components/Menu";
import useNotes from "@hooks/useNotes";
import { sidebarState } from "@state/layout";

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

export const Sidebar = () => {
	const setOpen = useSetRecoilState(sidebarState);
	return <Button icon="panel-left" onClick={() => setOpen((s) => !s)} />;
};

export const CreateNote = () => {
	const { createBlankNote } = useNotes();
	const router = useRouter();
	const onClick = async () => {
		const note = await createBlankNote();
		router.push(`/${note.id}`, undefined, { shallow: true });
	};
	return <Button icon="note" onClick={onClick} />;
};

export const DeleteNote = () => {
	const { removeCurrent, notes } = useNotes();
	const router = useRouter();
	const onClick = async () => {
		await removeCurrent();
		router.push(`/${notes.at(0).id}`, undefined, { shallow: true });
	};
	return <Button icon="trash" onClick={onClick} />;
};
