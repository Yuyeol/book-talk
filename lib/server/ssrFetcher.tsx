export async function ssrFetcher(...urls: string[]) {
  const fetchPromises = urls.map((url) =>
    fetch(`${process.env.apiUrl}${url}`).then((res) => res.json())
  );
  try {
    const responses = await Promise.allSettled(fetchPromises);
    const data = responses.reduce(
      (result: { [key: string]: any }, res, index) => {
        if (res.status === "fulfilled") {
          result[urls[index]] = res.value;
        } else {
          console.error(`Failed to fetch data from ${urls[index]}`);
        }
        return result;
      },
      {}
    );
    return { props: { fallback: data } };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { props: { fallback: {} } };
  }
}
