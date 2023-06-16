import { styled } from "styled-components";
import { ServicePackage } from "../../App";

interface SelectedServicePriceProps {
  selectedServicePrice: number | null;
  price: number | undefined;
  bestPackage: ServicePackage | null;
}

function SelectedServicePrice({
  selectedServicePrice,
  price,
  bestPackage,
}: SelectedServicePriceProps) {
  return (
    <div>
      <PriceLabel>Cena wybranej usługi:</PriceLabel>
      {selectedServicePrice !== null ? (
        <Price
          style={{
            textDecoration: bestPackage !== null ? "line-through" : "none",
            color: bestPackage !== null ? "red" : "inherit",
          }}
        >
          {" "}
          {price}zł
        </Price>
      ) : (
        <span>Brak danych</span>
      )}
    </div>
  );
}
export default SelectedServicePrice;

const PriceLabel = styled.label`
  font-weight: bold;
`;

const Price = styled.span`
  font-weight: bold;
`;
