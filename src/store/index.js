import { configureStore } from '@reduxjs/toolkit'

import categoryReducer from './categoryStore/category-redux'
import messageReducer from './messageStore/message-redux'
import contactReducer from './contactStore/contact-redux'
import tagReducer from './tagStore/tag-redux'

const store = configureStore({
	reducer: {
		categoryReducer,
		messageReducer,
		contactReducer,
		tagReducer,
	},
})

export default store
