import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	messages: [],
	editMessage: {},
}

const messageSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		fetchMessages(state, action) {
			state.messages = action.payload
		},
		editMessage(state, action) {
			state.editMessage = action.payload
		},
		resetEditMessage(state) {
			state.editMessage = {}
		},
	},
})

export default messageSlice.reducer
export const messageActions = messageSlice.actions
