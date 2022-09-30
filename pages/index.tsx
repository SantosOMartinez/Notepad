import Toolbar from "@modules/Toolbar";

export default () => {
	return (
		<main>
			<Toolbar />
			<style jsx>{`
				main {
					height: 100vh;
					display: grid;
				}
				div {
					display: flex;
					width: 100%;
				}
			`}</style>
		</main>
	);
};
