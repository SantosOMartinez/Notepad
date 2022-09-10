import "@styles/globals.css";
import "normalize.css/normalize.css";

import { RecoilRoot } from "recoil";

export default ({ Component, pageProps }) => (
	<RecoilRoot>
		<Component {...pageProps} />
	</RecoilRoot>
);
