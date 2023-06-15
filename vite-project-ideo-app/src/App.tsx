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
  const [price, setPrice] = useState<number>();
  const [bestPackage, setBestPackage] = useState<ServicePackage | null>(null);

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
      const years = data.services.flatMap((service) => {
        if (
          selectedService.includes(service.name) ||
          (service.dependentServices &&
            selectedService.includes(service.dependentServices))
        ) {
          return Object.keys(service.prices);
        }
        return [];
      });
      const packageYears = data.servicePackages.flatMap((servicePackage) =>
        Object.keys(servicePackage.prices)
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
  }, [data, selectedService]);

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
    //check if service exist in data and if, set price for choosen year
    if (data) {
      const foundService = data.services.find(
        (services) => services.name === service
      );
      if (foundService && foundService.prices[selectedYear]) {
        setSelectedServicePrice(foundService.prices[selectedYear]);
      } else {
        setSelectedServicePrice(null);
      }
    }
  };

  //function for calculate best price
  const calculateBestPrice = () => {
    if (selectedService && data) {
      //Filter the servicePackages based on the selected services
      const matchingPackages = data.servicePackages.filter((servicePackage) =>
        servicePackage.services.every((service) =>
          selectedService.includes(service)
        )
      );
      console.log(matchingPackages);
      //finding missing service among service packages from selected service
      const packagesWithMissingServices = matchingPackages.map(
        (servicePackage) => {
          // Filter out the missing services from the selected service
          const missingServices = selectedService.filter(
            (service) => !servicePackage.services.includes(service)
          );
          console.log(missingServices);
          // Create a copy of the package prices to update
          const updatedPrices = { ...servicePackage.prices };

          // Calculate and update the prices for the missing services
          missingServices.forEach((service) => {
            if (data.services) {
              // Find the missing service in the data.services array
              const foundService = data.services.find(
                (s) => s.name === service
              );
              if (foundService && foundService.prices[selectedYear]) {
                // Add the price of the missing service to the corresponding year's price in the package
                updatedPrices[selectedYear] +=
                  foundService.prices[selectedYear];
              }
            }
          });
          // Return the updated package with the modified prices
          return { ...servicePackage, prices: updatedPrices };
        }
      );
      // Find the package with the best price
      const bestPackage = packagesWithMissingServices.reduce((prev, curr) => {
        const prevPrice = prev.prices[selectedYear];
        const currPrice = curr.prices[selectedYear];
        return prevPrice < currPrice ? prev : curr;
      }, packagesWithMissingServices[0]);

      // Set the best package and display the new price
      if (bestPackage) {
        const newPrice = bestPackage.prices[selectedYear];
        setBestPackage(bestPackage);
        console.log("new price", newPrice);
      } else {
        setBestPackage(null);
      }
    }
  };

  useEffect(() => {
    // Calculate the new price based on the selected services and year
    const newPrice = selectedService.reduce((acc, service) => {
      const foundService = data?.services.find((s) => s.name === service);
      if (foundService && foundService.prices[selectedYear]) {
        return acc + foundService.prices[selectedYear];
      }
      return acc;
    }, 0);

    // Update the new price state
    setPrice(newPrice);
    console.log("price", newPrice);
    console.log("wybrana usługa", selectedService);

    if (data) {
      // Filter the services with dependent services based on the selected service
      const servicesWithDependentServices = data.services.filter((service) => {
        if (service.dependentServices) {
          return (
            selectedService.includes(service.name) ||
            selectedService.includes(service.dependentServices)
          );
        }
        return true;
      });

      // Get the names of the services with dependent services
      const servicesName = servicesWithDependentServices.map(
        (service) => service.name
      );
      setServicesName(servicesName);
      console.log(servicesName);
    }
    // Calculate the best price among the packages based on the selected service
    calculateBestPrice();
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
          <span
            style={{
              textDecoration: bestPackage !== null ? "line-through" : "none",
              color: bestPackage !== null ? "red" : "inherit",
            }}
          >
            {" "}
            {price}zł
          </span>
        ) : (
          <span>Brak danych</span>
        )}
      </div>
      {bestPackage && (
        <div>
          <h2>Najkorzystniejszy oferta:</h2>
          <p>Cena: {bestPackage.prices[selectedYear]}zł</p>
        </div>
      )}
    </>
  );
}

export default App;
