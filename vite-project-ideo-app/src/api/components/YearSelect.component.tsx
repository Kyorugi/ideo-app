import { ChangeEvent } from "react";
import { styled } from "styled-components";

interface YearSelectProps {
  selectedYear: string;
  availableYears: string[];
  handleSelectedYear: (event: ChangeEvent<HTMLSelectElement>) => void;
}

function YearSelect({
  selectedYear,
  availableYears,
  handleSelectedYear,
}: YearSelectProps) {
  return (
    <YearSelectContainer>
      <LabelView htmlFor="year-select">Wybierz rok: </LabelView>
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
    </YearSelectContainer>
  );
}

export default YearSelect;

const YearSelectContainer = styled.div`
  display: flex;
  border: solid;
  border-color: blueviolet;
  height: 5rem;
  justify-content: center;
  align-items: center;
`;

const LabelView = styled.label`
  margin: 5px;
  font-size: large;
  font-weight: bold;
`;
