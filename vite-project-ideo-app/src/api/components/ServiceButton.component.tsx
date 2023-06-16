import Telewizja from "../../assets/Telewizja.svg";
import Internet from "../../assets/Internet.svg";
import Dekoder4K from "../../assets/Dekoder4K.svg";
import AbonamentTel from "../../assets/AbonamentTelefoniczny.svg";
import Netflix from "../../assets/Netflix.svg";
import { styled } from "styled-components";

interface ServiceButtonProps {
  service: string;
  isSelected: boolean;
  isYearSelected: boolean;
  isDependent: boolean | undefined;
  handleServiceClick: (
    service: string,
    isDependent: boolean | undefined
  ) => void;
}

interface ServiceIconMap {
  [key: string]: string;
}

function ServiceButton({
  service,
  isSelected,
  isYearSelected,
  isDependent,
  handleServiceClick,
}: ServiceButtonProps) {
  const serviceIconMap: ServiceIconMap = {
    Telewizja: Telewizja,
    Internet: Internet,
    Dekoder4K: Dekoder4K,
    AbonamentTelefoniczny: AbonamentTel,
    Netflix: Netflix,
  };

  const serviceIcon = serviceIconMap[service];

  return (
    <ButtonsContainer
      className={`service-button ${isSelected ? "selected" : ""}`}
    >
      <ServicesButton
        onClick={() => handleServiceClick(service, isDependent)}
        style={{
          background: isSelected ? "lightBlue" : "white",
          pointerEvents: isYearSelected ? "auto" : "none",
        }}
        disabled={!isYearSelected}
      >
        {serviceIcon && <ServiceIconImg src={serviceIcon} alt={service} />}
        {service}
      </ServicesButton>
    </ButtonsContainer>
  );
}

export default ServiceButton;

const ButtonsContainer = styled.div`
  display: flex;
`;

const ServicesButton = styled.button`
  margin: 5px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-color: blueviolet;
  height: 7rem;
  width: 12rem;

  &:hover {
    // Stylizacja obrazka na hover
    filter: brightness(0.8);
  }
`;
const ServiceIconImg = styled.img`
  background: inherit; /* Dziedziczy tło od przycisku */
`;
