export interface User {
	id: string;
	login: string;
	email: string;
	password?: string;
	name?: string;
	avatar?: string;
}

export interface UserSchema {
	authData?: User;

	_inited: boolean;
}