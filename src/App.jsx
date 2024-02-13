// react router dom
import { Routes, Route } from 'react-router-dom'
// components
import Message from './components/Message/Message'
import Wrapper from './Layout/Wrapper/Wrapper'
import Contact from './components/Contact/Contanct'
function App() {
	return (
		<div className='App'>
			{/* <Navbar /> */}
			<Routes>
				<Route element={<Wrapper />}>
					<Route element={<Message />} path='/' exact />
					<Route element={<Contact />} path='/contact' />
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
