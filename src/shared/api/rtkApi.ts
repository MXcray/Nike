import { createApi, EndpointBuilder, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rtkApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: __API_URL__,

		prepareHeaders: (headers) => {
			const token = localStorage.getItem('token');
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}

			return headers;
		},
	}),
	tagTypes: ['Products', 'UserData'],
	endpoints: (builder) => ({})
});