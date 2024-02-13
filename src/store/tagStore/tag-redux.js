import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	listOfTags: [],
}

const tagSlice = createSlice({
	name: 'tag',
	initialState,
	reducers: {
		fetchTags(state, action) {
			state.listOfTags = action.payload
		},
	},
})

export default tagSlice.reducer
export const tagActions = tagSlice.actions
