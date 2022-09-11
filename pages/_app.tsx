import "normalize.css/normalize.css";
import "@styles/globals.css";

import { RecoilRoot } from "recoil";

export default ({ Component, pageProps }) => (
	<RecoilRoot>
		<Component {...pageProps} />
	</RecoilRoot>
);
