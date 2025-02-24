import './App.css'
import { Route, Routes } from "react-router-dom";
import {HomePage, HistoricalViewPage,Features, Pricing, FAQ, Testimonials, TrackPage, MealsConsumedPage, CreateCustomFoodPage, ProfileSetup, Dashboard} from "./Pages"

function App() {

  return (
    <>
      <div>
			<Routes>
				<Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/features' element={<Features />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/testimonials' element={<Testimonials />} />
        <Route path='/historical' element={<HistoricalViewPage />} />
        <Route path='/track' element={< TrackPage/>} />
        <Route path='/mealsConsumed' element={< MealsConsumedPage/>} />
        <Route path='/customFood' element={<CreateCustomFoodPage />} />
        <Route path='/profile-setup' element={<ProfileSetup />} />
        <Route path='/dashboard' element={<Dashboard />} />
			</Routes>
		</div>
    </>
    
  )
}

export default App
