import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

const App = () =>

  <Router>
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </>
  </Router>
export default App;
