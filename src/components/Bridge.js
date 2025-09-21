import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import gasSponsorService from "../services/gasSponsor";
import wormholeNttService from "../services/wormholeNtt";
import {
  createContainerStyle,
  createTextStyle,
  createFlexStyle,
  responsiveSize,
  responsiveFontSize,
  responsiveSpacing,
} from "../utils/autoLayout";

// 이미지 상수들
const imgImage3 = "/assets/adwallet-icon.png";
const imgArrowDown = "/assets/arrow-right.png";
const imgArrowUp = "/assets/arrow-left.png";
const imgFrame58 = "/assets/sui-sui-logo.svg";
const imgSui = "/assets/sui-sui-logo.svg";
const imgUsdc = "/assets/usd-coin-usdc-logo.svg";
const imgUsdt = "/assets/tether-usdt-logo.svg";
const imgGlobe = "/assets/globe-icon.png";

// 네트워크 아이콘들
const imgEthereum = "/assets/ethereum-eth-logo.png";
const imgPolygon = "/assets/polygon-matic-logo.png";
const imgArbitrum = "/assets/arbitrum-arb-logo.png";
const imgBase = "/assets/base logo.webp";

// 푸터 아이콘들
const imgSettings = "/assets/setting-icon.png";
const imgAroundTheGlobe = "/assets/globe-icon.png";
const imgCryptoTradingSpot = "/assets/Crypto-Trading-Spot-icon.png";
const imgWallet = "/assets/wallet-icon.png";
const imgDollarEuroExchange = "/assets/eruo-dollor-icon.png";
const imgDataTransfer = "/assets/Data Transfer.png";
const imgCancelButton = "/assets/button.png";
const imgConfirmButton = "/assets/button.png";

// MainDashboard와 동일한 스타일 컴포넌트들
const DashboardContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #1d1818;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  padding-bottom: 80px;
  box-sizing: border-box;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  padding: 20px;
  box-sizing: border-box;
`;

const NetworkSelector = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  width: 80px;
  height: 40px;
  background: #3b3b3b;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #4a4a4a;
  }
`;

const NetworkIcon = styled.div`
  position: absolute;
  left: 10px;
  width: 25px;
  height: 25px;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const NetworkDropdown = styled.div`
  position: absolute;
  left: 50px;
  top: 12px;
  width: 15px;
  height: 15px;
  background-image: url("${imgArrowDown}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: rotate(90deg);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: rotate(90deg) scale(1.1);
  }
`;

const AccountInfo = styled.div`
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  box-sizing: border-box;
`;

const AccountIcon = styled.div`
  width: 15px;
  height: 15px;
  background-image: url("${(props) => props.src || imgFrame58}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 10px;
`;

const AccountName = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
  text-align: center;
  line-height: normal;
  margin-right: 8px;
`;

const AccountDropdown = styled.div`
  width: 10px;
  height: 10px;
  background-image: url("${imgArrowDown}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: rotate(90deg);
  margin-left: 5px;
`;

const AccountAddress = styled.div`
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #999999;
  text-align: center;
  line-height: normal;
`;

const TicketBalance = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 80px;
  height: 40px;
  background: #3b3b3b;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #4a4a4a;
  }
`;

const TicketIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 7.5px;
  width: 25px;
  height: 25px;
  background-image: url("${imgImage3}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const TicketCount = styled.div`
  position: absolute;
  left: 58px;
  top: 20.5px;
  transform: translateX(-50%) translateY(-50%);
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: white;
  text-align: center;
  line-height: normal;
`;

// 브릿지 콘텐츠 스타일
const BridgeContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.div`
  color: white;
  font-family: "Mina", sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const NetworkSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BridgeNetworkSelector = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const BridgeNetworkIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const NetworkName = styled.div`
  color: white;
  font-family: "Mina", sans-serif;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
`;

const DropdownIcon = styled.div`
  width: 12px;
  height: 12px;
  background-image: url("${imgArrowDown}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: rotate(90deg);
`;

const SwapIcon = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #f29d38 0%, #ff6b35 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const SwapArrow = styled.div`
  width: 16px;
  height: 16px;
  background-image: url("${imgGlobe}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: brightness(0) invert(1);
`;

const TokenSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TokenSelector = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const TokenIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const TokenName = styled.div`
  color: white;
  font-family: "Mina", sans-serif;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
`;

const AmountSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AmountContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AmountHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MaxButton = styled.div`
  width: 32px;
  height: 16px;
  background: #f29d38;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ff6b35;
  }
`;

const MaxText = styled.div`
  color: white;
  font-family: "Mina", sans-serif;
  font-size: 10px;
  font-weight: 600;
`;

const TokenBalance = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-family: "Mina", sans-serif;
  font-size: 12px;
  font-weight: 400;
`;

const AmountInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #1a1a1a;
  font-family: "Mina", sans-serif;
  font-size: 14px;
  font-weight: 500;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: rgba(26, 26, 26, 0.5);
  }

  &:focus {
    border-color: #f29d38;
  }
`;

const ADTicketSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: rgba(242, 157, 56, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(242, 157, 56, 0.2);
`;

const ADTicketHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ADTicketIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url("${imgImage3}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const ADTicketText = styled.div`
  color: #f29d38;
  font-family: "Mina", sans-serif;
  font-size: 14px;
  font-weight: 600;
`;

const GasFeeText = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-family: "Mina", sans-serif;
  font-size: 12px;
  font-weight: 400;
`;

const WarningText = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-family: "Mina", sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 1.4;
`;

// 취소/확인 버튼 스타일
const ActionButtonsContainer = styled.div`
  position: absolute;
  bottom: 150px;
  left: 0;
  right: 0;
  height: 50px;
`;

const ActionButtonImage = styled.button`
  width: 160px;
  height: 80px;
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
  position: absolute;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 16px;
  background: ${(props) =>
    props.primary
      ? "linear-gradient(135deg, #f29d38 0%, #ff6b35 100%)"
      : "rgba(255, 255, 255, 0.1)"};
  border: 1px solid
    ${(props) => (props.primary ? "transparent" : "rgba(255, 255, 255, 0.2)")};
  border-radius: 12px;
  color: white;
  font-family: "Mina", sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.primary
        ? "linear-gradient(135deg, #ff6b35 0%, #f29d38 100%)"
        : "rgba(255, 255, 255, 0.15)"};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

// MainDashboard 푸터 스타일 컴포넌트들
const NavigationBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 69px;
  background: #1d1818;
  z-index: 100;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  box-sizing: border-box;
`;

const PatternTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 7px;
  background-image: radial-gradient(
      circle at 20px 3.5px,
      #5f5f5f 1.5px,
      transparent 1.5px
    ),
    radial-gradient(circle at 40px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 60px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 80px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 100px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 120px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 140px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 160px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 180px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 200px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 220px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 240px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 260px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 280px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 300px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 320px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 340px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 360px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 380px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 400px 3.5px, #5f5f5f 1.5px, transparent 1.5px);
  background-size: 20px 7px;
  background-position: 0 0;
  z-index: 1;
`;

const PatternBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 7px;
  background-image: radial-gradient(
      circle at 20px 3.5px,
      #5f5f5f 1.5px,
      transparent 1.5px
    ),
    radial-gradient(circle at 40px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 60px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 80px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 100px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 120px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 140px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 160px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 180px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 200px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 220px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 240px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 260px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 280px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 300px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 320px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 340px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 360px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 380px 3.5px, #5f5f5f 1.5px, transparent 1.5px),
    radial-gradient(circle at 400px 3.5px, #5f5f5f 1.5px, transparent 1.5px);
  background-size: 20px 7px;
  background-position: 0 0;
  z-index: 1;
`;

const NavItem = styled.button`
  position: relative;
  width: 70px;
  height: 60px;
  background: ${(props) => (props.active ? "white" : "#5f5f5f")};
  border: none;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin: 0;

  &:hover {
    background: #f29d38;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const NavIcon = styled.div`
  width: 30px;
  height: 30px;
  background-image: ${(props) =>
    props.active ? "none" : `url("${props.src}")`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 2px;
  background-color: ${(props) => (props.active ? "#f29d38" : "transparent")};
  mask: ${(props) =>
    props.active ? `url("${props.src}") no-repeat center` : "none"};
  -webkit-mask: ${(props) =>
    props.active ? `url("${props.src}") no-repeat center` : "none"};
  mask-size: contain;
  -webkit-mask-size: contain;
`;

const NavText = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 10px;
  color: ${(props) => (props.active ? "#f29d38" : "black")};
  text-align: center;
  line-height: normal;
`;

// MainDashboard와 동일한 네트워크 선택 모달
const NetworkModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 320px;
  background: #2a2a2a;
  border-radius: 16px;
  padding: 20px;
  position: relative;
  max-height: 400px;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const ModalTitle = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: white;
  text-align: center;
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NetworkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NetworkItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ModalNetworkIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 12px;
`;

const ModalNetworkName = styled.div`
  color: white;
  font-family: "Mina", sans-serif;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
`;

const AddNetworkButton = styled.button`
  width: 100%;
  padding: 12px;
  background: rgba(242, 157, 56, 0.1);
  border: 1px solid #f29d38;
  border-radius: 12px;
  color: #f29d38;
  font-family: "Mina", sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(242, 157, 56, 0.2);
  }
`;

// SendReceive와 동일한 토큰 선택 모달
const TokenModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const TokenModalContent = styled.div`
  width: 320px;
  background: #2a2a2a;
  border-radius: 16px;
  padding: 20px;
  position: relative;
  max-height: 400px;
  overflow-y: auto;
`;

const TokenModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const TokenModalTitle = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: white;
  text-align: center;
  flex: 1;
`;

const TokenCloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TokenList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TokenItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ModalTokenIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 12px;
`;

const ModalTokenName = styled.div`
  color: white;
  font-family: "Mina", sans-serif;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
`;

const Bridge = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedToken, setSelectedToken] = useState("sui");
  const [fromNetwork, setFromNetwork] = useState("sui");
  const [toNetwork, setToNetwork] = useState("ethereum");
  const [amount, setAmount] = useState("");
  const [ticketBalance, setTicketBalance] = useState(10);
  const [isBridging, setIsBridging] = useState(false);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [selectedNetworkType, setSelectedNetworkType] = useState("from");
  const [estimatedGasFee, setEstimatedGasFee] = useState(0);

  // 메인 대시보드에서 전달받은 토큰 상태
  const [tokens, setTokens] = useState(
    location.state?.tokens || [
      {
        id: "sui",
        name: "Sui",
        symbol: "SUI",
        balance: "1.25",
        value: "$5.00",
        change: "+5.2%",
        positive: true,
      },
      {
        id: "usdc",
        name: "USDC",
        symbol: "USDC",
        balance: "50.0",
        value: "$50.00",
        change: "+0.1%",
        positive: true,
      },
      {
        id: "usdt",
        name: "USDT",
        symbol: "USDT",
        balance: "25.5",
        value: "$25.50",
        change: "+0.05%",
        positive: true,
      },
    ]
  );

  // 초기 로드 시 메인 대시보드의 토큰 상태를 받아서 사용
  useEffect(() => {
    if (location.state?.tokens) {
      setTokens(location.state.tokens);
    }
  }, [location.state?.tokens]);

  // 네트워크별 토큰 잔액을 메인 대시보드의 토큰 상태와 연동
  const getTokenBalanceForNetwork = (tokenId, networkId) => {
    // 현재 선택된 네트워크가 메인 대시보드의 토큰과 일치하는지 확인
    if (networkId === fromNetwork) {
      const token = tokens.find((t) => t.id === tokenId);
      return token ? parseFloat(token.balance) : 0;
    }
    return 0; // 다른 네트워크에서는 0으로 표시
  };

  const networks = [
    { id: "sui", name: "Sui Mainnet", status: "Connected", icon: imgSui },
    {
      id: "ethereum",
      name: "Ethereum Mainnet",
      status: "Connected",
      icon: imgEthereum,
    },
    {
      id: "polygon",
      name: "Polygon Mainnet(MATIC)",
      status: "Connected",
      icon: imgPolygon,
    },
    {
      id: "arbitrum",
      name: "Arbitrum One",
      status: "Connected",
      icon: imgArbitrum,
    },
    {
      id: "base",
      name: "BASE Mainnet",
      status: "Connected",
      icon: imgBase,
    },
  ];

  useEffect(() => {
    initializeTicketBalance();
  }, []);

  const initializeTicketBalance = async () => {
    try {
      const balance = await gasSponsorService.getTicketBalance();
      setTicketBalance(balance);
    } catch (error) {
      console.error("티켓 잔액 초기화 실패:", error);
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleTicketClick = () => {
    navigate("/ad-ticket");
  };

  const handleNetworkClick = (type) => {
    setSelectedNetworkType(type);
    setShowNetworkModal(true);
  };

  const handleTokenClick = () => {
    setShowTokenModal(true);
  };

  const handleNetworkSelect = (networkId) => {
    if (selectedNetworkType === "from") {
      setFromNetwork(networkId);
    } else {
      setToNetwork(networkId);
    }
    setShowNetworkModal(false);

    // 네트워크 변경 시 수량 초기화 (새로운 네트워크의 잔액으로 업데이트)
    setAmount("");

    // FROM 네트워크 변경 시 토큰 잔액 업데이트
    if (selectedNetworkType === "from") {
      updateTokensForNetwork(networkId);
      console.log(`FROM 네트워크 변경: ${networkId}, 토큰 잔액 업데이트됨`);
    }
  };

  const handleTokenSelect = (tokenId) => {
    setSelectedToken(tokenId);
    setShowTokenModal(false);

    // 토큰 변경 시 수량 초기화 (새로운 토큰의 잔액으로 업데이트)
    setAmount("");
  };

  const updateTokensForNetwork = (networkId) => {
    // 네트워크에 따라 토큰 잔액 업데이트
    if (networkId === "ethereum") {
      // 이더리움 네트워크: 모든 토큰 잔액 0으로 설정
      setTokens([
        {
          id: "sui",
          name: "Sui",
          symbol: "SUI",
          balance: "0",
          value: "$0.00",
          change: "+0.0%",
          positive: true,
        },
        {
          id: "usdc",
          name: "USDC",
          symbol: "USDC",
          balance: "0",
          value: "$0.00",
          change: "+0.0%",
          positive: true,
        },
        {
          id: "usdt",
          name: "USDT",
          symbol: "USDT",
          balance: "0",
          value: "$0.00",
          change: "+0.0%",
          positive: true,
        },
      ]);
    } else if (networkId === "sui") {
      // Sui 네트워크: 기본 잔액으로 설정
      setTokens([
        {
          id: "sui",
          name: "Sui",
          symbol: "SUI",
          balance: "1.25",
          value: "$5.00",
          change: "+5.2%",
          positive: true,
        },
        {
          id: "usdc",
          name: "USDC",
          symbol: "USDC",
          balance: "50.0",
          value: "$50.00",
          change: "+0.1%",
          positive: true,
        },
        {
          id: "usdt",
          name: "USDT",
          symbol: "USDT",
          balance: "25.5",
          value: "$25.50",
          change: "+0.05%",
          positive: true,
        },
      ]);
    }

    console.log(`네트워크 변경: ${networkId}, 토큰 잔액 업데이트됨`);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleMaxClick = () => {
    setAmount(getCurrentTokenBalance().toString());
  };

  const handleSwapNetworks = () => {
    const temp = fromNetwork;
    setFromNetwork(toNetwork);
    setToNetwork(temp);
  };

  const getSelectedTokenInfo = () => {
    const tokenInfo = {
      sui: { name: "Sui", symbol: "SUI", icon: imgSui },
      usdc: { name: "USDC", symbol: "USDC", icon: imgUsdc },
      usdt: { name: "USDT", symbol: "USDT", icon: imgUsdt },
    };
    return tokenInfo[selectedToken] || tokenInfo.sui;
  };

  const getNetworkIcon = (networkId) => {
    const network = networks.find((n) => n.id === networkId);
    return network ? network.icon : imgSui;
  };

  const getCurrentTokenBalance = () => {
    // 메인 대시보드의 토큰 상태에서 현재 잔액 가져오기
    const currentToken = tokens.find((token) => token.id === selectedToken);
    const balance = currentToken ? parseFloat(currentToken.balance) : 0;
    console.log(
      `현재 토큰 잔액: ${selectedToken} = ${balance}, 전체 토큰:`,
      tokens
    );
    return balance;
  };

  // 브릿지된 토큰 잔액 확인 (다른 네트워크에서)
  const getBridgedTokenBalance = (networkId) => {
    // 메인 대시보드의 토큰 상태에서 현재 잔액 가져오기
    const currentToken = tokens.find((token) => token.id === selectedToken);
    if (networkId === fromNetwork) {
      return currentToken ? parseFloat(currentToken.balance) : 0;
    }
    return 0; // 다른 네트워크에서는 0으로 표시
  };

  // 가스비 예상 계산
  const calculateGasFee = async () => {
    try {
      const gasFeeData = await wormholeNttService.estimateGasFee(
        fromNetwork,
        toNetwork
      );
      setEstimatedGasFee(Math.ceil(parseFloat(gasFeeData.totalFee)));
    } catch (error) {
      console.error("가스비 계산 실패:", error);
      setEstimatedGasFee(0);
    }
  };

  // 네트워크나 토큰 변경 시 가스비 계산
  useEffect(() => {
    calculateGasFee();
  }, [fromNetwork, toNetwork, selectedToken]);

  const handleBridge = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("올바른 금액을 입력해주세요.", { duration: 3000 });
      return;
    }

    if (parseFloat(amount) > getCurrentTokenBalance()) {
      toast.error("잔액이 부족합니다.", { duration: 3000 });
      return;
    }

    if (ticketBalance < estimatedGasFee) {
      toast.error(
        `AD 티켓이 부족합니다. 필요: ${Math.ceil(
          estimatedGasFee
        )}개, 보유: ${ticketBalance}개`,
        {
          duration: 5000,
        }
      );
      return;
    }

    // 브릿지 정보를 서명 페이지로 전달
    const bridgeData = {
      type: "Bridge",
      token: getSelectedTokenInfo().name,
      amount: amount,
      fromNetwork: networks.find((n) => n.id === fromNetwork)?.name,
      toNetwork: networks.find((n) => n.id === toNetwork)?.name,
      gasFee: `${Math.ceil(estimatedGasFee)} AD TICKET`,
      ticketBalance: ticketBalance,
    };

    navigate("/transaction-signature", {
      state: {
        transactionData: bridgeData,
        tokens: tokens, // 현재 토큰 상태 전달
      },
    });
  };

  return (
    <DashboardContainer>
      <Header>
        <NetworkSelector>
          <NetworkIcon src={imgSui} />
          <NetworkDropdown />
        </NetworkSelector>

        <AccountInfo>
          <AccountIcon src={imgSui} />
          <AccountName>Account 1</AccountName>
          <AccountDropdown />
          <AccountAddress>0xcEDBf...4926F</AccountAddress>
        </AccountInfo>

        <TicketBalance onClick={handleTicketClick}>
          <TicketIcon />
          <TicketCount>{ticketBalance}</TicketCount>
        </TicketBalance>
      </Header>

      <BridgeContent>
        {/* 네트워크 섹션 */}
        <SectionContainer>
          <SectionTitle>네트워크</SectionTitle>
          <NetworkSection>
            <BridgeNetworkSelector onClick={() => handleNetworkClick("from")}>
              <BridgeNetworkIcon src={getNetworkIcon(fromNetwork)} />
              <NetworkName>
                {networks.find((n) => n.id === fromNetwork)?.name}
              </NetworkName>
              <DropdownIcon />
            </BridgeNetworkSelector>

            <SwapIcon onClick={handleSwapNetworks}>
              <img
                src={imgDataTransfer}
                alt="Swap Networks"
                style={{ width: "24px", height: "24px" }}
              />
            </SwapIcon>

            <BridgeNetworkSelector onClick={() => handleNetworkClick("to")}>
              <BridgeNetworkIcon src={getNetworkIcon(toNetwork)} />
              <NetworkName>
                {networks.find((n) => n.id === toNetwork)?.name}
              </NetworkName>
              <DropdownIcon />
            </BridgeNetworkSelector>
          </NetworkSection>
        </SectionContainer>

        {/* 토큰 섹션 */}
        <SectionContainer>
          <SectionTitle>토큰</SectionTitle>
          <TokenSection>
            <TokenSelector onClick={handleTokenClick}>
              <TokenIcon src={getSelectedTokenInfo().icon} />
              <TokenName>{getSelectedTokenInfo().name}</TokenName>
              <DropdownIcon />
            </TokenSelector>

            <SwapIcon>
              <img
                src={imgDataTransfer}
                alt="Swap Tokens"
                style={{ width: "24px", height: "24px" }}
              />
            </SwapIcon>

            <TokenSelector onClick={handleTokenClick}>
              <TokenIcon src={getSelectedTokenInfo().icon} />
              <TokenName>{getSelectedTokenInfo().name}</TokenName>
              <DropdownIcon />
            </TokenSelector>
          </TokenSection>
        </SectionContainer>

        {/* 수량 섹션 */}
        <SectionContainer>
          <SectionTitle>수량</SectionTitle>
          <AmountSection>
            <AmountContainer>
              <AmountHeader>
                <MaxButton onClick={handleMaxClick}>
                  <MaxText>MAX</MaxText>
                </MaxButton>
                <TokenBalance>
                  {getCurrentTokenBalance()} {getSelectedTokenInfo().symbol}
                </TokenBalance>
              </AmountHeader>
              <AmountInput
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={handleAmountChange}
              />
            </AmountContainer>

            <AmountContainer>
              <AmountHeader>
                <TokenBalance>
                  0.00 {getSelectedTokenInfo().symbol}
                </TokenBalance>
              </AmountHeader>
              <AmountInput
                type="number"
                placeholder="0.00"
                value={amount}
                readOnly
              />
            </AmountContainer>
          </AmountSection>
        </SectionContainer>

        {/* 브릿지된 토큰 정보 표시 */}
        {getBridgedTokenBalance(toNetwork) > 0 && (
          <SectionContainer>
            <SectionTitle>브릿지된 토큰</SectionTitle>
            <TokenBalance>
              {getBridgedTokenBalance(toNetwork)}{" "}
              {getSelectedTokenInfo().symbol} ({toNetwork})
            </TokenBalance>
          </SectionContainer>
        )}

        {/* AD TICKET 정보 */}
        <ADTicketSection>
          <ADTicketHeader>
            <ADTicketIcon />
            <ADTicketText>AD TICKET - {ticketBalance}개</ADTicketText>
          </ADTicketHeader>
          <GasFeeText>예상 가스비: {estimatedGasFee}개 AD TICKET</GasFeeText>
          {ticketBalance < estimatedGasFee && (
            <WarningText style={{ color: "#ff6b6b" }}>
              ⚠️ AD TICKET이 부족합니다! 필요: {estimatedGasFee}개, 보유:{" "}
              {ticketBalance}개
            </WarningText>
          )}
          <WarningText>
            AD TICKET이 없을시 소유하신 토큰으로 가스수수료를 사용하거나 거래를
            실행할수없습니다.
          </WarningText>
        </ADTicketSection>

        {/* 액션 버튼 */}
        <ActionButtonsContainer>
          <ActionButtonImage
            onClick={handleBack}
            style={{ left: "40px", top: "0px" }}
          >
            <img
              src={imgCancelButton}
              alt="취소"
              style={{ width: "100%", height: "100%" }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                pointerEvents: "none",
              }}
            >
              취소
            </div>
          </ActionButtonImage>
          <ActionButtonImage
            onClick={handleBridge}
            disabled={isBridging || ticketBalance < estimatedGasFee}
            style={{ left: "220px", top: "0px" }}
          >
            <img
              src={imgConfirmButton}
              alt="확인"
              style={{ width: "100%", height: "100%" }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                pointerEvents: "none",
              }}
            >
              {isBridging
                ? "브릿지 전송 중..."
                : ticketBalance < estimatedGasFee
                ? "티켓 부족"
                : "확인"}
            </div>
          </ActionButtonImage>
        </ActionButtonsContainer>
      </BridgeContent>

      {/* MainDashboard 푸터 컴포넌트 */}
      <NavigationBar>
        <PatternTop />
        <PatternBottom />

        <NavItem
          style={{ position: "absolute", left: "21px", top: "10px" }}
          onClick={() => navigate("/dashboard")}
        >
          <NavIcon src={imgWallet} />
          <NavText>Wallet</NavText>
        </NavItem>

        <NavItem
          style={{ position: "absolute", left: "96px", top: "10px" }}
          onClick={() => navigate("/send-receive")}
        >
          <NavIcon src={imgDollarEuroExchange} />
          <NavText>Send / Recive</NavText>
        </NavItem>

        <NavItem
          active={true}
          style={{ position: "absolute", left: "171px", top: "10px" }}
        >
          <NavIcon active={true} src={imgAroundTheGlobe} />
          <NavText active={true}>Bridge</NavText>
        </NavItem>

        <NavItem
          style={{ position: "absolute", left: "246px", top: "10px" }}
          onClick={() => navigate("/transaction-history")}
        >
          <NavIcon src={imgCryptoTradingSpot} />
          <NavText>Transaction</NavText>
        </NavItem>

        <NavItem
          style={{ position: "absolute", left: "322px", top: "10px" }}
          onClick={() => navigate("/settings")}
        >
          <NavIcon src={imgSettings} />
          <NavText>Setting</NavText>
        </NavItem>
      </NavigationBar>

      {/* 네트워크 선택 모달 */}
      {showNetworkModal && (
        <NetworkModal onClick={() => setShowNetworkModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>네트워크</ModalTitle>
              <CloseButton onClick={() => setShowNetworkModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>

            <NetworkList>
              {networks.map((network) => (
                <NetworkItem
                  key={network.id}
                  onClick={() => handleNetworkSelect(network.id)}
                >
                  <ModalNetworkIcon src={network.icon} />
                  <ModalNetworkName>{network.name}</ModalNetworkName>
                  {getBridgedTokenBalance(network.id) > 0 && (
                    <TokenBalance>
                      {getBridgedTokenBalance(network.id)}{" "}
                      {getSelectedTokenInfo().symbol}
                    </TokenBalance>
                  )}
                </NetworkItem>
              ))}
            </NetworkList>

            <AddNetworkButton>네트워크 추가하기</AddNetworkButton>
          </ModalContent>
        </NetworkModal>
      )}

      {/* 토큰 선택 모달 */}
      {showTokenModal && (
        <TokenModal onClick={() => setShowTokenModal(false)}>
          <TokenModalContent onClick={(e) => e.stopPropagation()}>
            <TokenModalHeader>
              <TokenModalTitle>토큰</TokenModalTitle>
              <TokenCloseButton onClick={() => setShowTokenModal(false)}>
                ×
              </TokenCloseButton>
            </TokenModalHeader>

            <TokenList>
              {[
                { id: "sui", name: "Sui", icon: imgSui },
                { id: "usdc", name: "USDC", icon: imgUsdc },
                { id: "usdt", name: "USDT", icon: imgUsdt },
              ].map((token) => (
                <TokenItem
                  key={token.id}
                  onClick={() => handleTokenSelect(token.id)}
                >
                  <ModalTokenIcon src={token.icon} />
                  <ModalTokenName>{token.name}</ModalTokenName>
                </TokenItem>
              ))}
            </TokenList>
          </TokenModalContent>
        </TokenModal>
      )}
    </DashboardContainer>
  );
};

export default Bridge;
