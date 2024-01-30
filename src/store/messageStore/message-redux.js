import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	messages: [],
}

const messageSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		fetchMessages(state, action) {
			state.messages = action.payload
		},
	},
})

export default messageSlice.reducer
export const messageActions = messageSlice.actions
