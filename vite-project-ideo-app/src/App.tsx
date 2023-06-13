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
  const [availableYears, setAvailableYears] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      if (jsonData == null || !isValidData(jsonData)) {
        console.log("Błędna struktura bazy danych");
      } else {
        setData(jsonData as Data);
      }
    } catch (error) {
      console.log("Wystąpił błąd podczas pobierania danych", error);
    }
  };

  const isValidData = (jsonData: any): jsonData is Data => {
    return (
      jsonData &&
      jsonData.services &&
      Array.isArray(jsonData.services) &&
      jsonData.servicePackages &&
      Array.isArray(jsonData.servicePackages)
    );
  };

  useEffect(() => {
    fetchData();
    if (data !== null) {
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    // Aktualizuj dostępne lata, gdy dane zostaną zmienione
    if (data) {
      const years = Object.keys(
        data.services.reduce((acc, service) => {
          return { ...acc, ...service.prices };
        }, {})
      );

      const packageYears = Object.keys(
        data.servicePackages.reduce((acc, servicePackage) => {
          return { ...acc, ...servicePackage.prices };
        }, {})
      );

      const allYears = Array.from(new Set([...years, ...packageYears]));
      const sortedAllYears = allYears.sort((a, b) => Number(a) - Number(b));
      console.log(sortedAllYears[0]);

      setAvailableYears(sortedAllYears);
    }
  }, [data]);

  return (
    <>
      <div>
        <header>
          <div>
            <img src={teleLogo} className="logo" alt="companyLogo" />
          </div>
        </header>
      </div>
      <div>
        <h1>Kalkulator oferty Lorem Ipsum Telecomunication</h1>
        <label htmlFor="year-select">Select Year: </label>
        <select id="year-select">
          <option value="">-- Wybierz rok --</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default App;
