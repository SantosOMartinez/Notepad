import { MenuItem, MenuSeparator } from "@components/Menu";

export const Media = () => (
	<>
		<MenuItem label="Photos..." />
		<MenuSeparator />
		<MenuItem label="Take Photo" />
		<MenuItem label="Scan Documents" />
		<MenuItem label="Add Sketch" />
	</>
);

export const Lock = () => (
	<>
		<MenuItem label="Close All Locked Notes" disabled />
		<MenuSeparator />
		<MenuItem label="Lock Note" />
	</>
);

export const Copy = () => (
	<>
		<MenuItem label="Mail" />
		<MenuItem label="Print" />
		<MenuSeparator />
		<MenuItem label="More..." />
	</>
);
