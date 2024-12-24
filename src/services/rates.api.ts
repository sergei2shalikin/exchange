export async function getRatesApi() {
  const url = "/v2/rates";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip",
      "Authorization": "Bearer a754355c-940c-477c-91d2-6695b67388ca",
      "redirect": "follow",
    },
  }
  try {
    const response = await fetch(url , options);
    const ratesData = await response.json();

    return ratesData;
  } catch (error) {
    console.error(error);
  }
}