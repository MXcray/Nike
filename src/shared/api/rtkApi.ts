import { createApi, EndpointBuilder, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rtkApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: __API_URL__,
	}),
	tagTypes: ['Products'],
	endpoints: (builder) => ({})
});