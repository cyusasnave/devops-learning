export const fetcher = async <T>(endpoint: string) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`
	);
	const data: Promise<T> = response.json();
	return data;
};