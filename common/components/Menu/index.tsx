import {
    Menu as BaseMenu,
    MenuBar as BaseMenuBar,
    MenuButton,
    MenuButtonArrow,
    MenuItem as BaseMenuItem,
    MenuSeparator as BaseMenuSeparator,
    useMenuBarState,
    useMenuState
} from "ariakit/menu";
import {
    createContext,
    forwardRef,
    HTMLAttributes,
    ReactNode,
    useContext
} from "react";

import styles from "./menu.module.css";

// Use React Context so we can determine if the menu is a submenu or a top-level
// menu inside a menu bar.
const MenuContext = createContext(false);

export type MenuItemProps = HTMLAttributes<HTMLDivElement> & {
	label: ReactNode;
	disabled?: boolean;
};

/**
 * MenuItem
 */
export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
	({ label, ...props }, ref) => {
		return (
			<BaseMenuItem className={styles.item} ref={ref} {...props}>
				<span className={styles.label}>{label}</span>
			</BaseMenuItem>
		);
	}
);

export type MenuSeparatorProps = HTMLAttributes<HTMLHRElement>;

/**
 * MenuSeparator
 */
export const MenuSeparator = forwardRef<HTMLHRElement, MenuSeparatorProps>(
	(props, ref) => {
		return (
			<BaseMenuSeparator
				className={styles.separator}
				ref={ref}
				{...props}
			/>
		);
	}
);

export type MenuProps = HTMLAttributes<HTMLDivElement> & {
	label?: ReactNode;
	disabled?: boolean;
	button?: ReactNode;
};

/**
 * Menu
 */
export const Menu = forwardRef<HTMLDivElement, MenuProps>(
	({ label, children, button, ...props }, ref) => {
		const inSubmenu = useContext(MenuContext);
		const menu = useMenuState({
			gutter: inSubmenu ? 8 : 4,
			overlap: inSubmenu,
			fitViewport: true,
			shift: inSubmenu ? -9 : -2,
		});
		return (
			<>
				{button ? (
					<MenuButton
						state={menu}
						as={BaseMenuItem}
						className={styles.button}
						ref={ref}
						{...props}
					>
						{button}
					</MenuButton>
				) : (
					<MenuButton
						state={menu}
						as={BaseMenuItem}
						className={styles.item}
						ref={ref}
						{...props}
					>
						<span className={styles.label}>{label}</span>
						{inSubmenu && <MenuButtonArrow />}
					</MenuButton>
				)}
				{menu.mounted && (
					<BaseMenu state={menu} portal className={styles.menu}>
						<MenuContext.Provider value={true}>
							{children}
						</MenuContext.Provider>
					</BaseMenu>
				)}
			</>
		);
	}
);

export type MenuBarProps = HTMLAttributes<HTMLDivElement>;

/**
 * MenuBar
 */
export const MenuBar = forwardRef<HTMLDivElement, MenuBarProps>(
	(props, ref) => {
		const menu = useMenuBarState();
		return (
			<BaseMenuBar
				state={menu}
				className={styles.bar}
				ref={ref}
				{...props}
			/>
		);
	}
);
