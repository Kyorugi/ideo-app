import React from "react";
import { styled } from "styled-components";

interface BestPackageProps {
  bestPrice: number | null | undefined;
}

export const BestPackage: React.FC<BestPackageProps> = ({ bestPrice }) => {
  return (
    <BestPriceContainer>
      <h2>Najkorzystniejsza oferta:</h2>
      <BestPrice>Cena: {bestPrice} zł</BestPrice>
    </BestPriceContainer>
  );
};

export default BestPackage;

const BestPriceContainer = styled.div`
  border-color: rebeccapurple;
  border: solid;
`;

const BestPrice = styled.p`
  color: red;
  font-weight: bold;
`;
