import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom'

const App = () =>

  <Router>
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route exact path="/" element={<Landing />} />
      </Routes>
    </>
  </Router>
export default App;
