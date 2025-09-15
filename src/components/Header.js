import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FiMenu, FiSettings } from "react-icons/fi";

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.h1`
  color: white;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
`;

const HeaderButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  padding: 8px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }

  svg {
    font-size: 18px;
  }
`;

const PageTitle = styled.h2`
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  flex: 1;
  margin: 0 20px;
`;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "AD Ticket";
      case "/dashboard":
        return "AD Ticket";
      case "/create-wallet":
        return "새 지갑 만들기";
      case "/send":
        return "송금";
      case "/receive":
        return "수신";
      case "/history":
        return "거래 내역";
      case "/settings":
        return "설정";
      default:
        return "AD Ticket";
    }
  };

  return (
    <HeaderContainer>
      <HeaderButton onClick={() => navigate("/")}>
        <FiMenu />
      </HeaderButton>
      <PageTitle>{getPageTitle()}</PageTitle>
      <HeaderButton onClick={() => navigate("/settings")}>
        <FiSettings />
      </HeaderButton>
    </HeaderContainer>
  );
};

export default Header;
