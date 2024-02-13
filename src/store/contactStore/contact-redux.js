import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	listOfContacts: [],
}

const contactSlice = createSlice({
	name: 'contact',
	initialState,
	reducers: {},
})

export default contactSlice.reducer
export const contactActions = contactSlice.actions
