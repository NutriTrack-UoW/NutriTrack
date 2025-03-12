import './App.css'
import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  Features, 
  Pricing, 
  FAQ, 
  Testimonials, 
  AboutUs,
  ContactUs,
  TermsAndConditions,
  Login,
  ResetPassword,
  ProfileSetup, 
  Dashboard, 
  TrackPage, 
  MealsConsumedPage, 
  CreateCustomFoodPage,
  TrackCustomFoodPage, 
  DailyDashboardPage, 
  HistoricalViewPage,
  AdminDashboard,
  NotFound,
} from "./Pages"

import { ProtectedRoute, AdminRoute, PublicRoute } from "./Routes"

function App() {

  return (
    <>
      <div>
			<Routes>
        {/* Public Routes */}
				<Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/features' element={<Features />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/testimonials' element={<Testimonials />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/terms' element={<TermsAndConditions />} />

        {/* Public Routes (Blocked for Logged-In Users) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} /> 
        </Route>

         {/* Protected Routes for Logged-in Users */}
         <Route element={<ProtectedRoute />}>
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/track" element={<TrackPage />} />
            <Route path="/mealsConsumed" element={<MealsConsumedPage />} />
            <Route path="/customFood" element={<CreateCustomFoodPage />} />
            <Route path="/trackCustomFood" element={<TrackCustomFoodPage />} />
            <Route path="/dailydashboard" element={<DailyDashboardPage />} />
            <Route path='/historical' element={<HistoricalViewPage />} />
          </Route>

        {/* Admin-only Routes */}
        <Route element={<AdminRoute />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>

          {/* 404 Page Route */}
          <Route path="*" element={<NotFound />} />
			</Routes>
		</div>
    </>
    
  )
}

export default App
