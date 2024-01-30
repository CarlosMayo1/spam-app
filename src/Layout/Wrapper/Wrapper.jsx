// react router dom
import { Outlet } from 'react-router-dom'
//component
import Navbar from '../../components/Navbar/Navbar'

const Wrapper = () => {
	return (
		<>
			<Navbar />
			<div className='container 2xl:max-w-7xl m-auto py-4'>
				<Outlet />
			</div>
		</>
	)
}

export default Wrapper
