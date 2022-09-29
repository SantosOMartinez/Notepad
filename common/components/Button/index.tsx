import { HtmlHTMLAttributes } from "react";

import Icon from "@components/Icon";
import { IconName } from "@type/icons";

interface Props extends HtmlHTMLAttributes<HTMLButtonElement> {
	icon: IconName;
}

export default ({ icon, ...props }: Props) => (
	<button {...props}>
		<Icon icon={icon} />
	</button>
);
