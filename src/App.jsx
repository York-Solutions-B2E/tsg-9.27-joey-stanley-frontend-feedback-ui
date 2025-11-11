
import './App.css'
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
import Welcome from './pages/Welcome';
import SubmitFeedback from './pages/SubmitFeedback';
import MemberIdSearch from './pages/MemberIdSearch';
import FeedbackIdSearch from './pages/FeedbackIdSearch';

function App() {

  return (
    <>
    <BrowserRouter>
    <nav>
      <Link to="/">Home</Link> |
      <Link to="/submit"> Submit Feedback</Link> |
      <Link to="/memidsearch"> Member ID Search</Link> |
      <Link to="/feedbackidsearch"> Feedback ID Search</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Welcome />}></Route>
      <Route path="/submit" element={<SubmitFeedback />}></Route>
      <Route path="/memidsearch" element={<MemberIdSearch />}></Route>
      <Route path="/feedbackidsearch" element={<FeedbackIdSearch />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
