import teleLogo from "./assets/telelogo.jpg";
import "./App.css";
import jsonData from "./api/data.json";
import { useState, useEffect } from "react";

interface Service {
  name: string;
  prices: {
    [year: string]: number;
  };
  dependantServices?: string;
}

interface ServicePackage {
  name: string;
  prices: {
    [year: string]: number;
  };
  services: string[];
}
interface Data {
  services: Service[];
  servicePackages: ServicePackage[];
}

function App() {
  const [data, setData] = useState<Data | null>(null);

  const fetchData = async () => {
    try {
      setData(jsonData);
    } catch (error) {
      console.log("Wystąpił błąd podczas pobierania danych", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

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
