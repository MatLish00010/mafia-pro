import { useEffect, useState } from "react";

const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState(
		() => window.matchMedia(query).matches,
	);

	useEffect(() => {
		const mediaQueryList = window.matchMedia(query);
		const handleChange = (event: MediaQueryListEvent) =>
			setMatches(event.matches);

		mediaQueryList.addListener(handleChange);

		// Initial check
		setMatches(mediaQueryList.matches);

		return () => {
			// Cleanup listener when component unmounts
			mediaQueryList.removeListener(handleChange);
		};
	}, [query]);

	return matches;
};

export default useMediaQuery;
