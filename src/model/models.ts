export interface Location {
	latitude: number;
	longitude: number;
}

export interface BDUser {
	email: string;
	nickname: string;
	profileImage: string;
}

export interface BDChatroom {
	id: string;
	title: string;
	location: Location;
	generator: BDUser;
	// participants: number;
	// participantslist: string;
}