import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	messages: [],
	editMessage: {},
	deleteModal: {
		type: '',
		title: '',
		message: '',
	},
	filter: {
		query: '',
		category: {
			category: '',
			name: '',
		},
		limit: 10,
	},
	totalMessages: 0,
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
		deleteModal(state, action) {
			state.deleteModal = action.payload
		},
		getTotalMessages(state, action) {
			state.totalMessages = action.payload
		},
		addFilter(state, action) {
			state.filter = action.payload
		},
	},
})

export default messageSlice.reducer
export const messageActions = messageSlice.actions
