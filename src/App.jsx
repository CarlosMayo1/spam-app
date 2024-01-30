// react router dom
import { Routes, Route } from 'react-router-dom'
// components
import Message from './components/Message/Message'
import Category from './components/Category/Category'
import Navbar from './components/Navbar/Navbar'
import Wrapper from './Layout/Wrapper/Wrapper'
function App() {
	return (
		<div className='App'>
			{/* <Navbar /> */}
			<Routes>
				<Route element={<Wrapper />}>
					<Route element={<Message />} path='/' exact />
				</Route>
				{/* <Route element={<Message />} path='/' />
				<Route element={<Category />} path='/category' /> */}
			</Routes>
			{/*
			<Message />
			<Category /> */}
		</div>
	)
}

export default App
