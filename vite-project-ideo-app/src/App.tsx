import teleLogo from "./assets/telelogo.jpg";

import "./App.css";

function App() {
  return (
    <>
      <header>
        <div className="logo-container">
          <img src={teleLogo} className="logo" alt="companyLogo" />
        </div>
        <h1>Kalkulator oferty Lorem Ipsum Telecomunication</h1>
      </header>
    </>
  );
}

export default App;
