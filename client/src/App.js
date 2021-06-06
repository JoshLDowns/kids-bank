import './styles/app.css';
import { Router } from "@reach/router";
import Dashboard from "./pages/Dashboard";
// import Account from "./pages/Account";

import { useThemeContext } from "./context/theme"

function App() {
  const { theme } = useThemeContext();
  console.log(theme);
  return (
    <div className={`app-wrapper ${theme}`}>
      <Router>
        <Dashboard path="/" />
        {/* <Account path="/account/:id" /> */}
      </Router>
    </div>
  );
}

export default App;
