import { useSetRecoilState } from "recoil";

import Search from "@components/Search";
import { suggestions } from "@constants/text";
import { searchState } from "@state/toolbar";
import { SearchTag } from "@type/search";

export default () => {
	const setSearch = useSetRecoilState(searchState);

	const onChange = (text: string) => setSearch((s) => ({ ...s, text }));
	const onFilter = (tag: SearchTag) => setSearch((s) => ({ ...s, tag }));

	return (
		<Search
			suggestions={suggestions}
			onChange={onChange}
			onFilter={onFilter}
		/>
	);
};
