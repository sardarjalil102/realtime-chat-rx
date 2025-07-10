import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Message, SendMessagePayload } from '../types/message';

// Define our API slice using RTK Query
export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3001',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    // Get all messages
    getMessages: builder.query<Message[], void>({
      query: () => '/api/messages',
      providesTags: ['Message'],
      transformResponse: (response: Message[]) => 
        response.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
    }),
    
    // Send a new message
    sendMessage: builder.mutation<Message, SendMessagePayload>({
      query: (payload) => ({
        url: '/api/messages',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Message'],
      // Optimistic update
      async onQueryStarted(payload, { dispatch, queryFulfilled, getState }) {
        const patchResult = dispatch(
          messageApi.util.updateQueryData('getMessages', undefined, (draft) => {
            const optimisticMessage: Message = {
              id: `temp-${Date.now()}`,
              text: payload.text,
              sender: payload.sender,
              timestamp: new Date(),
            };
            draft.push(optimisticMessage);
          })
        );
        
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    
    // Health check
    healthCheck: builder.query<{ status: string }, void>({
      query: () => '/api/health',
    }),
  }),
});

export const { 
  useGetMessagesQuery, 
  useSendMessageMutation,
  useHealthCheckQuery 
} = messageApi; 