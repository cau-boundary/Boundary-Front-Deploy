import BDAPICall from "./api";
import { BDUser } from "@src/model/models";
import axios from 'axios';

export const signin: (email: String, password: String) => Promise<BDUser> =
	async (email, password) => {
		let me = await BDAPICall<BDUser>({
			method: "post",
			url: "/api/signin",
			data: {
				email: email,
				password: password,
			},
		});
		return me.body;
	};

// export const signin = async (email:String, password:String) => {
// 	let result;
// 	try{
// 		result = axios.post("/api/signin", {
// 			data : {
// 				email: email,
// 				password:password
// 			}
// 		})
// 	}catch(error){
// 		throw error;
// 	}
// }

export const signup: (nickname: String, email: String, password: String) => Promise<BDUser> =
	async (nickname, email, password) => {
		let me = await BDAPICall<BDUser>({
			method: "post",
			url: "/api/signup",
			data: {
				nickname: nickname,
				email: email,
				password: password,
			},
		});
		return me.body;
	};

export const viewMyProfile: (cookie?: string) => Promise<BDUser> =
	async (cookie) => {
		let me = await BDAPICall<BDUser>({
			method: "get",
			url: `/api/user`,
			headers: {
				cookie: cookie
			}
		});
		return me.body;
	};

export const viewProfile: (email: String) => Promise<BDUser> =
	async (email) => {
		let user = await BDAPICall<BDUser>({
			method: "get",
			url: `/api/user/${email}`,
		});
		return user.body;
	};

export const editNickname: (nickname: String) => Promise<BDUser> =
	async (nickname) => {
		let me = await BDAPICall<BDUser>({
			method: "put",
			url: `/api/user`,
			data: {
				nickname: nickname
			}
		});
		return me.body;
	};

export const editProfileImage: (image) => Promise<void> = 
	async (image)=>{
		const formData = new FormData()
		formData.append('file', image)
		let me = await BDAPICall<BDUser>({
			method: "put",
			url: `/api/profile`,
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			data: formData
		});
	}
