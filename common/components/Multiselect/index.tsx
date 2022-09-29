import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export default ({ children, ...props }: Props) => {
	return <div>{children}</div>;
};
