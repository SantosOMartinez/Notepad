import {
    Menu as BaseMenu,
    MenuBar as BaseMenuBar,
    MenuButton as BaseMenuButton,
    MenuButtonArrow,
    MenuButtonOptions,
    MenuItem as BaseMenuItem,
    MenuOptions,
    MenuSeparator as BaseMenuSeparator,
    useMenuBarState,
    useMenuState
} from "ariakit/menu";
import {
    Popover as BasePopover,
    PopoverArrow,
    PopoverDisclosure as BasePopoverDisclosure,
    PopoverDisclosureOptions,
    PopoverOptions
} from "ariakit/popover";
import cn from "classnames";
import {
    ButtonHTMLAttributes,
    createContext,
    forwardRef,
    HTMLAttributes,
    ReactNode,
    useContext
} from "react";

import Icon from "@components/Icon";
import { IconName } from "@type/icons";

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

export interface MenuButtonProps
	extends HTMLAttributes<HTMLDivElement>,
		MenuButtonOptions {
	disabled?: boolean;
	arrow?: boolean;
	type?: "button" | "item";
}

/**
 * MenuItem
 */
export const MenuButton = forwardRef<HTMLDivElement, MenuButtonProps>(
	({ children, state, arrow, type, ...props }, ref) => {
		return (
			<BaseMenuButton
				state={state}
				as={BaseMenuItem}
				className={type === "button" ? styles.button : styles.item}
				ref={ref}
				{...props}
			>
				{children}
				{arrow && <MenuButtonArrow className={styles.btnArrow} />}
			</BaseMenuButton>
		);
	}
);

export type RecursiveMenuProps = HTMLAttributes<HTMLDivElement> & {
	label?: ReactNode;
	disabled?: boolean;
	icon?: IconName;
	arrow?: boolean;
};

/**
 * Recursive Menu
 */
export const RecursiveMenu = forwardRef<HTMLDivElement, RecursiveMenuProps>(
	({ label, children, icon, ...props }, ref) => {
		const inSubmenu = useContext(MenuContext);
		const menu = useMenuState({
			gutter: inSubmenu ? 8 : 4,
			overlap: inSubmenu,
			fitViewport: true,
			shift: inSubmenu ? -9 : -2,
			animated: true,
		});
		return (
			<>
				{icon ? (
					<MenuButton state={menu} ref={ref} {...props} type="button">
						<Icon icon={icon} />
					</MenuButton>
				) : (
					<MenuButton
						state={menu}
						type="item"
						ref={ref}
						{...props}
						arrow={inSubmenu || props.arrow}
					>
						<span className={styles.label}>{label}</span>
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

interface MenuProps extends HTMLAttributes<HTMLDivElement>, MenuOptions {}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
	({ children, state, ...props }, ref) => {
		return (
			<BaseMenu
				state={state}
				className={styles.menu}
				{...props}
				ref={ref}
			>
				{children}
			</BaseMenu>
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

interface PopoverDisclosureProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		PopoverDisclosureOptions {
	icon?: IconName;
	arrow?: boolean;
}

/**
 * Popover Disclosure
 */
export const PopoverDisclosure = forwardRef<
	HTMLButtonElement,
	PopoverDisclosureProps
>(({ children, icon, arrow, className, ...props }, ref) => (
	<BasePopoverDisclosure
		className={cn(styles.button, className)}
		ref={ref}
		{...props}
	>
		{icon && <Icon icon={icon} />}
		{children}
		{arrow && <MenuButtonArrow />}
	</BasePopoverDisclosure>
));

interface PopoverProps extends HTMLAttributes<HTMLDivElement>, PopoverOptions {}

/**
 * Popover Disclosure
 */
export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
	({ children, ...props }, ref) => (
		<BasePopover className={styles.popover} ref={ref} {...props}>
			<PopoverArrow className={styles.arrow} />
			{children}
		</BasePopover>
	)
);
