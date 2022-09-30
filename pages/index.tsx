import Button from "@components/Button";
import Multiselect from "@components/Multiselect";
import Search from "@components/Search";
import Spacer from "@components/Spacer";

export default () => {
	return (
		<main>
			<div>
				<Button icon="link" />
				<Button icon="collaborate" />
				<Button icon="table" />
				<Button icon="format" />
				<Button icon="format" disabled />
				<Button icon="checklist" />
				<Spacer flexible />
				<Button icon="grid" dropDown />
				<Spacer flexible />
				<Search
					suggestions={[
						{ icon: "grid", name: "Locked Notes", tag: "Locked" },
						{ icon: "format", name: "Shared Notes", tag: "Shared" },
						{
							icon: "table",
							name: "Notes with Checklists",
							tag: "Checklists",
						},
						{
							icon: "collaborate",
							name: " Notes with Drawings",
							tag: "Drawings",
						},
					]}
				/>
				<Spacer />
				<Multiselect
					options={[
						{ icon: "list", tooltip: "View as list" },
						{ icon: "grid", tooltip: "View as grid" },
					]}
					defaultSelected={0}
				/>
				<Spacer flexible />
			</div>
			<style jsx>{`
				main {
					height: 100vh;
					display: grid;
					place-items: center;
				}
				div {
					display: flex;
					width: 100%;
				}
			`}</style>
		</main>
	);
};
