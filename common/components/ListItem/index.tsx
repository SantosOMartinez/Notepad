import cn from "classnames";
import Link from "next/link";

import Icon from "@components/Icon";
import toTimestamp from "@functions/date";
import Note from "@type/note";

import styles from "./listItem.module.css";

export interface ListItemProps extends Note {
	className?: string;
	active?: boolean;
}

export default ({
	title = "New Note",
	date = new Date(),
	description = "No additional text.",
	folder,
	id = "",
	image,
	locked,
	className,
	active,
}: ListItemProps) => {
	const timestamp = toTimestamp(date);

	return (
		<Link href={`/${id}`}>
			<a
				className={cn(styles.item, className, {
					[styles.active]: active,
				})}
			>
				<span
					className={cn(styles.left, {
						[styles.locked]: locked,
					})}
				>
					<Icon icon="lock-filled" className={styles.lock} />
				</span>
				<span className={styles.text}>
					<p className={styles.title}>
						<strong>{title}</strong>
					</p>
					<span className={cn("caption", styles.details)}>
						<p className={styles.date}>{timestamp}</p>
						<p className={styles.description}>{description}</p>
					</span>
					{folder && (
						<span className={styles.location}>
							<Icon icon="folder" className={styles.folder} />
							<p className={cn("caption", styles.directory)}>
								{folder}
							</p>
						</span>
					)}
				</span>
				{image && <img src={image} className={styles.img} />}
			</a>
		</Link>
	);
};
