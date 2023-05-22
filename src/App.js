import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import moment from 'moment';
import { DataStore } from "aws-amplify";

// layouts
import Header from './layout/Header';
import Footer from './layout/Footer'

// User Pages
import Home from './pages/Home';
import CheckMyMole from './pages/CheckMyMole';
import CheckMyRash from './pages/CheckMyRash';
import CheckStatus from './pages/CheckStatus';

// Doctor Pages
import Login from './pages/doctor/Login';
import ForgotPassword from './pages/doctor/ForgotPassword';
import Register from './pages/doctor/Register';
import Request from './pages/doctor/Request';
import Inquiry from './pages/doctor/Inquiry';
import Statistics from './pages/doctor/Statistics';
import InquiryDetail from './pages/doctor/InquiryDetail';

// Admin pages
import Admin from './pages/admin';
import AdminLogin from './pages/admin/login';
import Clinic from './pages/admin/clinic';
import Doctor from './pages/admin/doctor';
import Patient from './pages/admin/patient';
import Transaction from './pages/admin/transaction';
import AdminStatistics from './pages/admin/statistics';
import SpamImage from './pages/admin/spam';

// hooks
import ScrollToTop from './hooks/scrolltop';

// css
import { ConfigProvider } from 'antd';
import './App.css';

ConfigProvider.config({
	theme: {
		primaryColor: '#576b62',
	},
});

function App() {

	const current_time = moment().valueOf();
	const login_time = window.localStorage.getItem("expired");
	if (login_time) {
		if ((current_time - login_time) > 86400000) {
			window.localStorage.clear();
			DataStore.clear();
		}
	}

	useEffect(() => {
		// DataStore.clear();
		DataStore.start();
	}, [])

	return (
		<ConfigProvider>
			<div className="App">
				<Provider store={store}>
					<Router>
						<ScrollToTop>
							<Header />
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/check-my-mole' element={<CheckMyMole />} />
								<Route path='/check-my-rash' element={<CheckMyRash />} />
								<Route path='/check-status' element={<CheckStatus />} />
								<Route path='/doctor'>
									<Route path='login' element={<Login />} />
									<Route path='forgot-password' element={<ForgotPassword />} />
									<Route path='register' element={<Register />} />
									<Route path='request' element={<Request />} />
									<Route path='request/:usercode' element={<InquiryDetail />} />
									<Route path='inquiry' element={<Inquiry />} />
									<Route path='inquiry/:usercode' element={<InquiryDetail />} />
									<Route path='statistics' element={<Statistics />} />
								</Route>
								<Route path='/admin'>
									<Route path='' element={<Admin />} />
									<Route path='login' element={<AdminLogin />} />
									<Route path='clinic' element={<Clinic />} />
									<Route path='doctor' element={<Doctor />} />
									<Route path='patient' element={<Patient />} />
									<Route path='transaction' element={<Transaction />} />
									<Route path='statistics' element={<AdminStatistics />} />
									<Route path='spam' element={<SpamImage />} />
								</Route>
							</Routes>
							<Footer />
						</ScrollToTop>
					</Router>
				</Provider>
			</div>
		</ConfigProvider>
	);
}

export default App;
