import { IAssets, ICurrency } from "../rates/rates.types";

export async function getAssets<T extends IAssets<ICurrency>>() {
  const url = "/v2/assets";
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
    const assertsData: T = await response.json();

    return assertsData;
  } catch (error) {
    console.error(error);
  }
}