export interface UserData {
	id: string;
	email: string;
	name: string;
	phoneNumber: string;
}

export interface UserDataDto {
	accessToken: string;
	user: UserData;
}

export interface UserSchema {
	authData?: UserData;

	_inited: boolean;
}