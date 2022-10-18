import { useMenuState } from "ariakit/menu";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuid } from "uuid";

import Button from "@components/Button";
import Icon from "@components/Icon";
import { Menu, MenuButton } from "@components/Menu";
import { BLANK_NOTE } from "@constants/editor";
import { useDBQueries } from "@db/useDBQuery";
import useRefreshNotes from "@hooks/useRefreshNotes";
import { sidebarState } from "@state/layout";
import { noteListState, noteState } from "@state/toolbar";

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
	const { addOneNote } = useDBQueries();

	const router = useRouter();
	const onClick = async () => {
		const id = uuid();
		const note = {
			id,
			location: null,
			created_at: new Date(),
			updated_at: new Date(),
			document: JSON.stringify(BLANK_NOTE),
		};
		await addOneNote(note);
		router.push(`/${id}`, undefined, { shallow: true });
	};

	return <Button icon="note" onClick={onClick} />;
};

export const DeleteNote = () => {
	const { removeOneNote } = useDBQueries();
	const { refreshList } = useRefreshNotes();
	const list = useRecoilValue(noteListState);
	const router = useRouter();
	const { id } = router.query;
	const onClick = async () => {
		await removeOneNote(id as string);
		await refreshList();
		router.push(`/${list.at(0).id}`, undefined, { shallow: true });
	};

	return <Button icon="trash" onClick={onClick} />;
};
