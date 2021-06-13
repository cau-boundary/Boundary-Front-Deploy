import { BDChatroom, Location } from "@src/model/models";

import BDAPICall from "./api";
import axios from "axios";

export const getNearbyChatrooms: (location: Location) => Promise<BDChatroom[]> =
	async (location) => {
		let me = await BDAPICall<BDChatroom[]>({
			method: "get",
			url: "/api/chatroom",
			params: {
				longitude: location.longitude,
				latitude: location.latitude,
			},
		});
		return me.body;
	};

export const checkChatroom = async (email: string):Promise<void> => {
	let result = await BDAPICall({
		method:"get",
		url:`/api/chatroom/check`,
		params:{
			email: email
		}
	});
	return;
}

export const createChatroom = async (title:String, location:Location):Promise<BDChatroom> => {
	let me = await BDAPICall<BDChatroom>({
		method:"post",
		url:`/api/chatroom`,
		data:{
			title:title,
			longitude:location.longitude,
			latitude:location.latitude
		}
	});
	return me.body;
}

export const deleteChatroom = async (email:String):Promise<BDChatroom> => {
	let me = await BDAPICall<BDChatroom>({
		method:"delete",
		url:`/api/chatroom`,
		params:{
			email:email
		}
	});
	return me.body;
}

// export const deleteChatroom = async () => {
// 	let me;
// 	try{
// 		me = await axios.delete("/api/chatroom");
// 		return me.body;
// 	}catch(error){
// 		throw error;
// 	}
// }