import axios, { AxiosError } from "axios";
const BASE_URL = "http://localhost:3000/burger";

export async function requestAllBurguers() {
	try {
		const { data: burguerList, statusText } = await axios.get(BASE_URL);
		if (statusText !== "OK") throw new AxiosError();
		return burguerList;
	} catch (error) {
		console.error(`
		ERROR DE PETICIÓN
		${error.name}: ${error.message}
		`);
	}
}
