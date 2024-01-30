import { configureStore } from '@reduxjs/toolkit'

import categoryReducer from './categoryStore/category-redux'
import messageReducer from './messageStore/message-redux'

const store = configureStore({
	reducer: {
		categoryReducer,
		messageReducer,
	},
})

export default store
