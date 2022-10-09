import { usePopoverState } from "ariakit/popover";

import { Popover, PopoverDisclosure } from "@components/Menu";
import { useBrowserName } from "@hooks/useBrowserName";

import styles from "./link.module.css";

const exampleSite = {
	title: "Notes on the App Store",
	url: "https://apps.apple.com/us/app/notes/id1110145109",
	thumbnail:
		"https://is5-ssl.mzstatic.com/image/thumb/Purple112/v4/f0/e0/7e/f0e07e01-0a36-0ee3-edea-5f0e28cac5db/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x600wa.png",
};

export default (props) => {
	const popover = usePopoverState({ animated: true });

	const browser = useBrowserName();

	const { title, thumbnail } = exampleSite;

	return (
		<div {...props}>
			<PopoverDisclosure state={popover} icon="link" />
			<Popover state={popover}>
				<p className={styles.header}>Add App Link</p>
				<div className={styles.link}>
					<img className={styles.img} src={thumbnail} />
					<div className={styles.text}>
						<p className={styles.title}>{title}</p>
						<p className={styles.description}>{browser}</p>
					</div>
					<button className={styles.button}>Add Link</button>
				</div>
			</Popover>
		</div>
	);
};
