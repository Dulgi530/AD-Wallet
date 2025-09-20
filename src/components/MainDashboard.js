import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import gasSponsorService from "../services/gasSponsor";
import {
  createContainerStyle,
  createButtonStyle,
  createTextStyle,
  createIconStyle,
  createFlexStyle,
  responsiveSize,
  responsiveFontSize,
  responsiveSpacing,
} from "../utils/autoLayout";

// 이미지 상수들
const imgImage3 = "/assets/adwallet-icon.png";
const imgImage7 =
  "http://localhost:3845/assets/7295164430571b46b9fbb1781cd8a3e8631971eb.png";
const imgImage10 =
  "http://localhost:3845/assets/2d1ee20636d2178512aeb74537b7833e46a0afa6.png";
const imgPolygon1 =
  "http://localhost:3845/assets/ae5e6915a4e7136319927308cc3e2cd0ac67d4de.svg";
const imgPolygon2 =
  "http://localhost:3845/assets/79d8126f7474a53dbb7b8b36d203a8b1fe7a6b23.svg";
const imgFrame58 =
  "http://localhost:3845/assets/cf3ec7890e749c15a472fb2aa478a7cf34825273.svg";
const imgFrame60 =
  "http://localhost:3845/assets/cf3ec7890e749c15a472fb2aa478a7cf34825273.svg";
const imgEllipse2 =
  "http://localhost:3845/assets/9bcc4b909b8ec2fd01adeeaf82d47b22c8e9d181.svg";
const imgEllipse4 =
  "http://localhost:3845/assets/be5a31e41c19f8e4c9bb19c23ce01d5c4f53b249.svg";

// 푸터 아이콘들
const imgSettings = "/assets/setting-icon.png";
const imgAroundTheGlobe = "/assets/globe-icon.png";
const imgCryptoTradingSpot = "/assets/Crypto-Trading-Spot-icon.png";
const imgWallet = "/assets/wallet-icon.png";
const imgDollarEuroExchange = "/assets/eruo-dollor-icon.png";

// 네트워크 아이콘들
const suiIcon = "/assets/sui-sui-logo.svg";
const ethereumIcon = "/assets/ethereum-eth-logo.png";
const arbitrumIcon = "/assets/arbitrum-arb-logo.png";
const polygonIcon = "/assets/polygon-matic-logo.png";
const baseIcon = "/assets/base logo.webp";

// 토큰 아이콘들
const usdcIcon = "/assets/usd-coin-usdc-logo.svg";
const usdtIcon = "/assets/tether-usdt-logo.svg";
const ethIcon = "/assets/ethereum-eth-logo.png";

// NFT 이미지들
const imgFrame48 = "/assets/nft1.png";
const imgFrame49 = "/assets/nft4.png";
const imgFrame50 = "/assets/nft2.png";
const imgFrame51 = "/assets/nft3.png";

// 네트워크 모달용 이미지들
const imgImage8 =
  "http://localhost:3845/assets/85a292aa95479e92e0d455d112b54208111c5d0d.png";
const imgImage34 =
  "http://localhost:3845/assets/f1f03a3718ff9502434cfb84bef99e9642480c43.png";
const imgImage35 =
  "http://localhost:3845/assets/2b5a811c8693185683ff45c5b34e1313562e02dd.png";
const imgVerychatSymbolGraRd1 =
  "http://localhost:3845/assets/2009fbbe52acc2646cfed4157d7ea21879b827f9.png";
const imgLine42 =
  "http://localhost:3845/assets/2eeecc92fcde4a9c11fe718d7116c4af4338d0d9.svg";

const DashboardContainer = styled.div`
  ${createContainerStyle()}
  position: relative;
  padding-bottom: 80px;
  min-height: 100vh;
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
  background-image: url("${imgPolygon1}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: rotate(180deg);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: rotate(180deg) scale(1.1);
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
  background-image: url("${imgPolygon2}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: rotate(180deg);
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

const BalanceSection = styled.div`
  ${createFlexStyle("column", "center", "center", 10)}
  padding: ${responsiveSpacing(30)} ${responsiveSpacing(20)};
  text-align: center;
`;

const BalanceAmount = styled.div`
  ${createTextStyle(48)}
  color: white;
  font-weight: 700;
`;

const BalanceChange = styled.div`
  ${createTextStyle(16)}
  color: #4ade80;
  font-weight: 600;
`;

const EyeButton = styled.button`
  position: absolute;
  right: ${responsiveSpacing(20)};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: ${responsiveSpacing(8)};
  border-radius: 50%;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const BannerSection = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  margin-top: 5px;
  padding: 0 20px;
`;

const BannerContainer = styled.div`
  width: 100%;
  height: ${responsiveSize(100)};
  position: relative;
  overflow: hidden;
  border-radius: ${responsiveSize(8)};
`;

const BannerSlider = styled.div`
  display: flex;
  width: ${(props) => props.bannerCount * 100}%;
  height: 100%;
  transition: transform 0.5s ease;
  transform: translateX(
    ${(props) => -props.currentSlide * (100 / props.bannerCount)}%
  );
`;

const BannerImage = styled.div`
  width: ${(props) => 100 / props.bannerCount}%;
  height: 100%;
  background-image: url("${(props) => props.image}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const DotContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 110px;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Dot = styled.div`
  ${createIconStyle(10)}
  background-image: url("${imgEllipse4}");

  ${(props) =>
    props.active &&
    `
    background-image: url("${imgEllipse2}");
  `}
`;

const TabSection = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  padding: 0 ${responsiveSpacing(20)};
  margin: ${responsiveSpacing(20)} 0;
`;

const Tab = styled.button`
  font-family: "Mina", sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: ${(props) => (props.active ? "#f29d38" : "white")};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    color: #f29d38;
  }
`;

const TokenList = styled.div`
  flex: 1;
  padding: 0 ${responsiveSpacing(20)};
  overflow-y: auto;
`;

const NFTGallery = styled.div`
  position: absolute;
  left: 30px;
  top: 412px;
  width: 352px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const NFTItem = styled.div`
  position: relative;
  width: 160px;
  height: 220px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const NFTImage = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 160px;
  height: 160px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 8px;
`;

const NFTTitle = styled.div`
  position: absolute;
  left: 0;
  top: 181px;
  transform: translateY(-50%);
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
  line-height: normal;
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NFTDescription = styled.div`
  position: absolute;
  left: 0;
  top: 201.5px;
  transform: translateY(-50%);
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #999999;
  line-height: normal;
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TokenItem = styled.div`
  ${createFlexStyle("row", "space-between", "center", 15)}
  padding: ${responsiveSpacing(15)} 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TokenIcon = styled.div`
  width: ${responsiveSize(40)};
  height: ${responsiveSize(40)};
  background: ${(props) => (props.src ? "transparent" : "#3b3b3b")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${createTextStyle(16)}
  color: white;
  font-weight: 600;
  background-image: ${(props) => (props.src ? `url("${props.src}")` : "none")};
  background-size: ${(props) => (props.src ? "80%" : "contain")};
  background-repeat: no-repeat;
  background-position: center;
`;

const TokenInfo = styled.div`
  ${createFlexStyle("column", "flex-start", "flex-start", 5)}
  flex: 1;
`;

const TokenName = styled.div`
  ${createTextStyle(16)}
  color: white;
  font-weight: 600;
`;

const TokenChange = styled.div`
  ${createTextStyle(14)}
  color: ${(props) => (props.positive ? "#4ade80" : "#ef4444")};
`;

const TokenAmount = styled.div`
  ${createFlexStyle("column", "flex-end", "flex-end", 5)}
`;

const TokenBalance = styled.div`
  ${createTextStyle(16)}
  color: white;
  font-weight: 600;
`;

const TokenValue = styled.div`
  ${createTextStyle(14)}
  color: #999999;
`;

const LoadTokenButton = styled.button`
  width: 100%;
  padding: ${responsiveSpacing(15)};
  background: #2a2a2a;
  border: 1px solid #3b3b3b;
  border-radius: ${responsiveSize(8)};
  ${createTextStyle(14)}
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
  margin: ${responsiveSpacing(20)} 0;

  &:hover {
    background: #3a3a3a;
  }
`;

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

// 네트워크 선택 모달 (SendReceive와 동일한 스타일)
const NetworkModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  width: 320px;
  background: #2a2a2a;
  border-radius: 16px;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 80vh;
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
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const NetworkList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const NetworkItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid #333;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ModalNetworkIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0;
`;

const NetworkName = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
  flex: 1;
`;

const AddNetworkButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  color: #f29d38;
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 14px;
  padding: 16px 0;
  margin-top: 10px;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #ffb84d;
  }
`;

const MainDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ticketBalance, setTicketBalance] = useState(10);
  const [balance, setBalance] = useState(5.0);
  const [balanceChange, setBalanceChange] = useState(1.16);
  const [balanceChangePercent, setBalanceChangePercent] = useState(2.73);
  const [totalBalance, setTotalBalance] = useState(80.5);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("TOKEN");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedNetwork, setSelectedNetwork] = useState("sui");
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);
  const [tokens, setTokens] = useState([
    {
      id: "sui",
      name: "Sui",
      symbol: "SUI",
      balance: "1.25",
      value: "$5.00",
      change: "+5.2%",
      positive: true,
      icon: suiIcon,
    },
    {
      id: "usdc",
      name: "USDC",
      symbol: "USDC",
      balance: "50.0",
      value: "$50.00",
      change: "+0.1%",
      positive: true,
      icon: usdcIcon,
    },
    {
      id: "usdt",
      name: "USDT",
      symbol: "USDT",
      balance: "25.5",
      value: "$25.50",
      change: "+0.05%",
      positive: true,
      icon: usdtIcon,
    },
  ]);

  // 배너 데이터
  const banners = [
    { id: 1, image: "/assets/banner.png", title: "Banner 1" },
    { id: 2, image: "/assets/banner2.png", title: "Banner 2" },
    { id: 3, image: "/assets/banner3.png", title: "Banner 3" },
  ];

  useEffect(() => {
    // 브릿지에서 전달받은 티켓 잔액이 없을 때만 초기화
    if (!location.state?.updatedTicketBalance) {
      initializeDashboard();
    }

    // 브릿지 결과 처리
    if (location.state?.bridgeResult) {
      const { fromNetwork, toNetwork, token, amount } =
        location.state.bridgeResult;

      // 브릿지된 네트워크로 자동 전환
      if (location.state?.switchToNetwork) {
        setSelectedNetwork(location.state.switchToNetwork);
        updateTokensForNetwork(location.state.switchToNetwork);
      }

      // 업데이트된 토큰 상태 적용
      if (location.state?.updatedTokens) {
        setTokens(location.state.updatedTokens);
      } else {
        // 브릿지된 토큰 잔액 차감 (FROM 네트워크에서)
        setTokens((prevTokens) =>
          prevTokens.map((tokenItem) => {
            if (tokenItem.id === token.toLowerCase()) {
              const currentBalance = parseFloat(tokenItem.balance);
              const newBalance = Math.max(0, currentBalance - amount);
              return {
                ...tokenItem,
                balance: newBalance.toFixed(2),
              };
            }
            return tokenItem;
          })
        );
      }

      console.log(
        `브릿지 완료: ${fromNetwork} → ${toNetwork}, ${amount} ${token} 차감됨, 네트워크 전환: ${location.state.switchToNetwork}`
      );
    }
  }, [location.state]);

  // 자동 슬라이드 기능
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000); // 3초마다 자동 슬라이드

    return () => clearInterval(interval);
  }, [banners.length]);

  // 브릿지 페이지로부터 전달받은 티켓 잔액 업데이트
  useEffect(() => {
    if (location.state?.updatedTicketBalance !== undefined) {
      setTicketBalance(location.state.updatedTicketBalance);
      console.log(
        `메인 대시보드 티켓 잔액 업데이트: ${location.state.updatedTicketBalance}`
      );
    }
  }, [location.state]);

  const initializeDashboard = async () => {
    try {
      const balance = await gasSponsorService.getTicketBalance();
      setTicketBalance(balance);
    } catch (error) {
      console.error("대시보드 초기화 실패:", error);
    }
  };

  const handleTicketClick = () => {
    navigate("/ad-ticket");
  };

  const handleTokenClick = (tokenId) => {
    // 토큰 ID를 쿼리 파라미터로 전달하여 Send/Receive 페이지로 이동
    navigate(`/send-receive?token=${tokenId}`);
  };

  const handleToggleBalance = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const handleBannerClick = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  // Figma 디자인에 맞는 네트워크 데이터
  const networks = [
    { id: "sui", name: "Sui Mainnet", icon: suiIcon },
    { id: "ethereum", name: "Ethereum Mainnet", icon: ethereumIcon },
    { id: "arbitrum", name: "Arbitrum One", icon: arbitrumIcon },
    { id: "polygon", name: "Polygon Mainnet(MATIC)", icon: polygonIcon },
    { id: "base", name: "BASE Mainnet", icon: baseIcon },
  ];

  const handleNetworkChange = () => {
    setIsNetworkModalOpen(true);
  };

  const handleNetworkSelect = (networkId) => {
    setSelectedNetwork(networkId);
    setIsNetworkModalOpen(false);

    // 네트워크에 따라 토큰 업데이트
    updateTokensForNetwork(networkId);
  };

  const updateTokensForNetwork = (networkId) => {
    if (networkId === "ethereum") {
      // 이더리움 네트워크: ETH 토큰으로 변경
      setTokens([
        {
          id: "eth",
          name: "Ethereum",
          symbol: "ETH",
          balance: "0",
          value: "$0.00",
          change: "+0.0%",
          positive: true,
          icon: ethIcon,
        },
        {
          id: "usdc",
          name: "USDC",
          symbol: "USDC",
          balance: "0",
          value: "$0.00",
          change: "+0.0%",
          positive: true,
          icon: usdcIcon,
        },
        {
          id: "usdt",
          name: "USDT",
          symbol: "USDT",
          balance: "0",
          value: "$0.00",
          change: "+0.0%",
          positive: true,
          icon: usdtIcon,
        },
      ]);
    } else if (networkId === "sui") {
      // Sui 네트워크: SUI 토큰으로 변경
      setTokens([
        {
          id: "sui",
          name: "Sui",
          symbol: "SUI",
          balance: "1.25",
          value: "$5.00",
          change: "+5.2%",
          positive: true,
          icon: suiIcon,
        },
        {
          id: "usdc",
          name: "USDC",
          symbol: "USDC",
          balance: "50.0",
          value: "$50.00",
          change: "+0.1%",
          positive: true,
          icon: usdcIcon,
        },
        {
          id: "usdt",
          name: "USDT",
          symbol: "USDT",
          balance: "25.5",
          value: "$25.50",
          change: "+0.05%",
          positive: true,
          icon: usdtIcon,
        },
      ]);
    }
  };

  const handleCloseModal = () => {
    setIsNetworkModalOpen(false);
  };

  const getNetworkIcon = () => {
    switch (selectedNetwork) {
      case "sui":
        return suiIcon;
      case "ethereum":
        return ethereumIcon;
      case "arbitrum":
        return arbitrumIcon;
      case "polygon":
        return polygonIcon;
      default:
        return suiIcon;
    }
  };

  const navItems = [
    { id: "wallet", label: "Wallet", active: true },
    { id: "send", label: "Send / Recive" },
    { id: "bridge", label: "Bridge" },
    { id: "transaction", label: "Transaction" },
    { id: "setting", label: "Setting" },
  ];

  const nfts = [
    {
      id: 1,
      title: "Aidenteti Crew NFT (Se...",
      description: "Aidenteti Crew",
      image: imgFrame48,
    },
    {
      id: 2,
      title: "VeryNode",
      description: "Very Chat",
      image: imgFrame49,
    },
    {
      id: 3,
      title: "BUILD - KEEPKWAN X ...",
      description: "Akashi Ai",
      image: imgFrame51,
    },
    {
      id: 4,
      title: "Parrot",
      description: "Zoo",
      image: imgFrame50,
    },
  ];

  return (
    <DashboardContainer>
      <Header>
        <NetworkSelector onClick={handleNetworkChange}>
          <NetworkIcon src={getNetworkIcon()} />
          <NetworkDropdown />
        </NetworkSelector>

        <AccountInfo>
          <AccountIcon src={getNetworkIcon()} />
          <AccountName>Account 1</AccountName>
          <AccountDropdown />
          <AccountAddress>0xcEDBf...4926F</AccountAddress>
        </AccountInfo>

        <TicketBalance onClick={handleTicketClick}>
          <TicketIcon />
          <TicketCount>{ticketBalance}</TicketCount>
        </TicketBalance>
      </Header>

      <BalanceSection style={{ position: "relative" }}>
        <BalanceAmount>
          {isBalanceVisible
            ? `$${totalBalance}`
            : `$${totalBalance.toString().replace(/\d/g, "*")}`}
        </BalanceAmount>
        <BalanceChange
          style={{ visibility: isBalanceVisible ? "visible" : "hidden" }}
        >
          +${balanceChange} (+{balanceChangePercent}%)
        </BalanceChange>
        <EyeButton onClick={handleToggleBalance}>
          {isBalanceVisible ? <FiEye size={20} /> : <FiEyeOff size={20} />}
        </EyeButton>
      </BalanceSection>

      <BannerSection>
        <BannerContainer onClick={handleBannerClick}>
          <BannerSlider
            currentSlide={currentSlide}
            bannerCount={banners.length}
          >
            {banners.map((banner) => (
              <BannerImage
                key={banner.id}
                image={banner.image}
                bannerCount={banners.length}
              />
            ))}
          </BannerSlider>
        </BannerContainer>
        <DotContainer>
          {banners.map((_, index) => (
            <Dot key={index} active={index === currentSlide} />
          ))}
        </DotContainer>
      </BannerSection>

      <TabSection>
        <Tab
          active={activeTab === "TOKEN"}
          onClick={() => setActiveTab("TOKEN")}
          style={{ left: "60px" }}
        >
          TOKEN
        </Tab>
        <Tab
          active={activeTab === "NFT"}
          onClick={() => setActiveTab("NFT")}
          style={{ left: "271px" }}
        >
          NFT
        </Tab>
      </TabSection>

      {activeTab === "TOKEN" ? (
        <TokenList>
          {tokens.map((token) => (
            <TokenItem
              key={token.id}
              onClick={() => handleTokenClick(token.id)}
            >
              <TokenIcon src={token.icon}>
                {!token.icon && token.symbol[0]}
              </TokenIcon>
              <TokenInfo>
                <TokenName>{token.name}</TokenName>
                <TokenChange positive={token.positive}>
                  {token.change}
                </TokenChange>
              </TokenInfo>
              <TokenAmount>
                <TokenBalance>
                  {token.balance} {token.symbol}
                </TokenBalance>
                <TokenValue>{token.value}</TokenValue>
              </TokenAmount>
            </TokenItem>
          ))}

          <LoadTokenButton>토큰 불러오기 / 추가하기</LoadTokenButton>
        </TokenList>
      ) : (
        <NFTGallery>
          {nfts.map((nft) => (
            <NFTItem key={nft.id}>
              <NFTImage src={nft.image} />
              <NFTTitle>{nft.title}</NFTTitle>
              <NFTDescription>{nft.description}</NFTDescription>
            </NFTItem>
          ))}
        </NFTGallery>
      )}

      <NavigationBar>
        <PatternTop />
        <PatternBottom />

        <NavItem
          active={true}
          style={{ position: "absolute", left: "21px", top: "10px" }}
          onClick={() => navigate("/dashboard")}
        >
          <NavIcon active={true} src={imgWallet} />
          <NavText active={true}>Wallet</NavText>
        </NavItem>

        <NavItem
          style={{ position: "absolute", left: "96px", top: "10px" }}
          onClick={() => navigate("/send-receive")}
        >
          <NavIcon src={imgDollarEuroExchange} />
          <NavText>Send / Recive</NavText>
        </NavItem>

        <NavItem
          style={{ position: "absolute", left: "171px", top: "10px" }}
          onClick={() => navigate("/bridge", { state: { tokens } })}
        >
          <NavIcon src={imgAroundTheGlobe} />
          <NavText>Bridge</NavText>
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
      {isNetworkModalOpen && (
        <NetworkModal onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>네트워크</ModalTitle>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
            </ModalHeader>

            <NetworkList>
              {networks.map((network) => (
                <NetworkItem
                  key={network.id}
                  onClick={() => handleNetworkSelect(network.id)}
                >
                  <ModalNetworkIcon src={network.icon} />
                  <NetworkName>{network.name}</NetworkName>
                </NetworkItem>
              ))}
            </NetworkList>

            <AddNetworkButton onClick={() => console.log("네트워크 추가하기")}>
              네트워크 추가하기
            </AddNetworkButton>
          </ModalContent>
        </NetworkModal>
      )}
    </DashboardContainer>
  );
};

export default MainDashboard;
