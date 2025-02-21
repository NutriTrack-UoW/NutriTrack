import './App.css'
import { Route, Routes } from "react-router-dom";
import {HomePage, HistoricalViewPage,Features, Pricing, FAQ, Testimonials, TrackPage, MealsConsumedPage, CreateCustomFoodPage} from "./Pages"

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
			</Routes>
		</div>
    </>
    
  )
}

export default App
