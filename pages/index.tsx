import Button from "@components/Button";
import Multiselect from "@components/Multiselect";

export default () => {
	return (
		<div>
			<Button icon="link" />
			<Button icon="collaborate" />
			<Button icon="table" />
			<Button icon="format" />
			<Button icon="checklist" />
			<Multiselect>
				<Button icon="format" />
				<Button icon="checklist" />
			</Multiselect>
		</div>
	);
};
