import './styles/app.css';
import { Router } from "@reach/router";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";

import OptionBar from "./components/OptionBar";

import { useThemeContext } from "./context/theme"

function App() {
  const { theme } = useThemeContext();
  return (
    <div className={`app-wrapper ${theme}`}>
      <OptionBar />
      <Router primary={false}>
        <Dashboard path="/" />
        <Account path="/account/:id" />
      </Router>
    </div>
  );
}

export default App;
