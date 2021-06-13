import axios, { AxiosRequestConfig } from "axios";

import Cookies from "universal-cookie";
import config from "../../config";
import router from "next/router";

export interface BDAPIResponse<T> {
	header: {
		message: string
	}
	body: T;
}

type BDAPICallFunction = <T>(param: AxiosRequestConfig) => Promise<BDAPIResponse<T>>
const BDAPICall: BDAPICallFunction = async <T>(param: AxiosRequestConfig) => {
	try {
		const finalParam: AxiosRequestConfig = {
			...param,
			baseURL: config.apiConfig.baseURL
		}
		let response = await axios(finalParam)
		return response.data as BDAPIResponse<T>
	} catch(error) {
		if(!error.response) {
			throw error
		}
		if(typeof window === 'undefined') {
			throw error
		}
		switch(error.response.status) {
		case 401:
			const cookies = new Cookies();
			cookies.remove('auth');
			router.push("/signin");
			break;
		default:
			throw error
		}
	}
}
export default BDAPICall;
