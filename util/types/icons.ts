import icons from "@constants/icons";

export type IconName = keyof typeof icons;

export type Icon = string | string[];

interface Icons {
	[key: string]: Icon;
}

export default Icons;
