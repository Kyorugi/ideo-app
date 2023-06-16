import { styled } from "styled-components";

interface DependentServiceWarningProps {
  dependentServiceName: string | undefined;
  isDependentServiceClicked: boolean | undefined;
}

function DependentServiceWarning({
  isDependentServiceClicked,
  dependentServiceName,
}: DependentServiceWarningProps) {
  return (
    <div>
      {isDependentServiceClicked && (
        <WarningParagraph style={{ color: "red" }}>
          Wyłącz najpierw usługę zależną:{" "}
          <DependentService>{dependentServiceName}</DependentService>
        </WarningParagraph>
      )}
    </div>
  );
}

export default DependentServiceWarning;

const WarningParagraph = styled.p`
  font-size: 18px;
  font-weight: bold;
  opacity: 0;
  animation: fadeIn 0.2s ease-in-out forwards;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const DependentService = styled.span`
  color: blueviolet;
`;
