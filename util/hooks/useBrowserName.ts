import { useEffect, useState } from "react";

const noName = "Unknown Source";

export function useBrowserName() {
	const [name, setName] = useState(noName);

	const getName = () => {
		if (typeof window == "undefined") return "Unknown Source";
		const userAgent = window.navigator.userAgent.toLowerCase();

		return userAgent.indexOf("edge") > -1
			? "Edge"
			: userAgent.indexOf("edg") > -1
			? "Edge"
			: userAgent.indexOf("opr") > -1 && !!(window as any).opr
			? "Opera"
			: userAgent.indexOf("chrome") > -1 && !!(window as any).chrome
			? "Chrome"
			: userAgent.indexOf("trident") > -1
			? "Internet Explorer"
			: userAgent.indexOf("firefox") > -1
			? "Firefox"
			: userAgent.indexOf("safari") > -1
			? "Safari"
			: "Unknown Source";
	};

	useEffect(() => {
		setName(getName());
	}, []);

	return name;
}
