export interface UserData {
	id: string;
	name: string;
	phoneNumber: string;
	email: string;
	password: string;
}

export interface UserSchema {
	authData?: UserData;

	_inited?: boolean;
}