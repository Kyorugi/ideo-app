import teleLogo from "./assets/telelogo.jpg";
import "./App.css";
import jsonData from "./api/data.json";
import { useState, useEffect } from "react";
import { ChangeEvent } from "react";

interface Service {
  name: string;
  prices: {
    [year: string]: number;
  };
  dependentServices?: string;
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
  const [servicesName, setServicesName] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string[]>([]);
  const [selectedServicePrice, setSelectedServicePrice] = useState<
    number | null
  >(null);
  const [newPrice, setNewPrice] = useState<number>();

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
    // updating the available years when the data changes
    if (data) {
      const years = data.services
        .filter((service) => !("dependentServices" in service))
        .flatMap((service) => Object.keys(service.prices));

      const packageYears = Object.keys(
        data.servicePackages.reduce((acc, servicePackage) => {
          return { ...acc, ...servicePackage.prices };
        }, {})
      );

      const allYears = Array.from(new Set([...years, ...packageYears]));
      const sortedAllYears = allYears.sort((a, b) => Number(a) - Number(b));

      setAvailableYears(sortedAllYears);

      //checking available services, setting an exception on dependent services
      const filteredServices = data.services.filter(
        (service) => !service.dependentServices
      );
      const servicesName = filteredServices.map((service) => service.name);
      console.log(servicesName);
      setServicesName(servicesName);
    }
  }, [data]);

  // Function to handle the change of selected year in the dropdown
  const handleSelectedYear = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  // Function to handle the click event on a service button
  const handleServiceClick = (service: string) => {
    if (selectedService.includes(service)) {
      // Remove the service from the list if it is already selected
      setSelectedService(
        selectedService.filter((selected) => selected !== service)
      );
    } else {
      // Add the service to the list if it is not yet selected
      setSelectedService([...selectedService, service]);
    }

    if (data) {
      const foundService = data.services.find((s) => s.name === service);
      if (foundService && foundService.prices[selectedYear]) {
        setSelectedServicePrice(foundService.prices[selectedYear]);
      } else {
        setSelectedServicePrice(null);
      }
    }
  };

  useEffect(() => {
    // Calculate the new price based on the selected services and year
    const newPrice = selectedService.reduce((accumulator, service) => {
      const foundService = data?.services.find((s) => s.name === service);
      if (foundService && foundService.prices[selectedYear]) {
        return accumulator + foundService.prices[selectedYear];
      }
      return accumulator;
    }, 0);

    // Update the new price state
    setNewPrice(newPrice);
    console.log(newPrice);
    console.log("wybrana usługa", selectedService);

    if (data) {
      const servicesWithDependentServices = data.services.filter((service) => {
        if (service.dependentServices) {
          return selectedService.includes(service.dependentServices);
        }
        return true;
      });

      const servicesName = servicesWithDependentServices.map(
        (service) => service.name
      );
      setServicesName(servicesName);
      console.log(servicesName);
    }
  }, [selectedService, selectedYear, data]);

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
        <label htmlFor="year-select">Wybierz rok: </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={handleSelectedYear}
        >
          <option value="">-- Wybierz rok --</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Wybierz usługę:</label>
        {servicesName.map((service, index) => {
          const isSelected = selectedService.includes(service);
          const isYearSelected = selectedYear !== "";
          return (
            <button
              key={index}
              onClick={() => handleServiceClick(service)}
              style={{
                background: isSelected ? "green" : "white",
                pointerEvents: isYearSelected ? "auto" : "none",
              }}
              disabled={!isYearSelected}
            >
              {service}
            </button>
          );
        })}
      </div>
      <div>
        <label>Cena wybranej usługi:</label>
        {selectedServicePrice !== null ? (
          <span> {newPrice} zł</span>
        ) : (
          <span>Brak danych</span>
        )}
      </div>
    </>
  );
}

export default App;
