import { ReactNode } from "react";
import { Data } from "../../App";
import ServiceButton from "./ServiceButton.component";
import { styled } from "styled-components";

interface ServiceSelectionProps {
  children: ReactNode[];
  servicesName: string[];
  selectedService: string[];
  selectedYear: string;
  data: Data | null;
  handleServiceClick: (
    service: string,
    isDependent: boolean | undefined
  ) => void;
}

function ServiceSelection(props: ServiceSelectionProps) {
  const {
    servicesName,
    selectedService,
    selectedYear,
    data,
    handleServiceClick,
  } = props;

  return (
    <ServiceSelectionContainer>
      <label>Wybierz usługę:</label>
      {servicesName.map((service, index) => {
        const isSelected = selectedService.includes(service);
        const isYearSelected = selectedYear !== "";
        const isDependent = data?.services
          .filter((s) => s.dependentServices)
          .some(
            (s) =>
              s.dependentServices?.includes(service) &&
              selectedService.includes(s.name)
          );
        return (
          <ServiceButton
            key={index}
            service={service}
            isSelected={isSelected}
            isYearSelected={isYearSelected}
            isDependent={isDependent}
            handleServiceClick={handleServiceClick}
          />
        );
      })}
    </ServiceSelectionContainer>
  );
}

export default ServiceSelection;

const ServiceSelectionContainer = styled.div`
  display: flex;
  height: 10rem;
  justify-content: center;
  align-items: center;
`;
