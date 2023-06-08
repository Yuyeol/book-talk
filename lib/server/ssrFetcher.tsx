export async function ssrFetcher(url: string) {
  const apiUrl = `${process.env.apiUrl}${url}`;
  try {
    const data = await fetch(apiUrl).then((res) => res.json());
    return { props: { fallback: { [apiUrl]: data } } };
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return { props: { fallback: {} } };
  }
}
