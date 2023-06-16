import { styled } from "styled-components";
import teleLogo from "../../assets/telelogo.jpg";

export const Header = () => {
  return (
    <HeaderContainer>
      <header>
        <div>
          <img src={teleLogo} className="logo" alt="companyLogo" />
        </div>
      </header>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  height: 100px;
`;
