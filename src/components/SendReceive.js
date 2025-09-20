import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiCopy, FiGlobe, FiWallet } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import gasSponsorService from "../services/gasSponsor";
import toast from "react-hot-toast";

// MainDashboard와 동일한 이미지 상수들
const imgImage3 = "/assets/adwallet-icon.png";
const imgPolygon1 =
  "http://localhost:3845/assets/ae5e6915a4e7136319927308cc3e2cd0ac67d4de.svg";
const imgPolygon2 =
  "http://localhost:3845/assets/79d8126f7474a53dbb7b8b36d203a8b1fe7a6b23.svg";
const imgFrame58 =
  "http://localhost:3845/assets/cf3ec7890e749c15a472fb2aa478a7cf34825273.svg";

// 푸터 아이콘들
const imgSettings = "/assets/setting-icon.png";
const imgAroundTheGlobe = "/assets/globe-icon.png";
const imgCryptoTradingSpot = "/assets/Crypto-Trading-Spot-icon.png";
const imgWallet = "/assets/wallet-icon.png";
const imgDollarEuroExchange = "/assets/eruo-dollor-icon.png";

// 네트워크 아이콘들
const suiIcon = "/assets/sui-sui-logo.svg";
const ethereumIcon = "/assets/eth.svg";
const arbitrumIcon = "/assets/arbitrum-icon.svg";
const polygonIcon = "/assets/polygon-icon.svg";

// 기타 이미지들
const imgEthereum = "/assets/ethereum-icon.svg";
const imgArbitrum = "/assets/arbitrum-icon.svg";
const imgPolygon = "/assets/polygon-icon.svg";
const imgSui = "/assets/sui-sui-logo.svg";

// Arrow 아이콘들
const imgArrowLeft = "/assets/arrow-left.png";
const imgArrowRight = "/assets/arrow-right.png";

// Figma에서 가져온 네트워크 아이콘들
const imgImage7 =
  "http://localhost:3845/assets/7295164430571b46b9fbb1781cd8a3e8631971eb.png";
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
const imgEuroDollar = "/assets/eruo-dollor-icon.png";
const imgGlobe = "/assets/Globe-icon.png";

// 토큰 보내기/받기 아이콘
const imgSendToken = "/assets/send.svg";
const imgReceiveToken = "/assets/receive.svg";

// 버튼 이미지
const imgButton = "/assets/button.png";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #1d1818;
  position: relative;
  padding-bottom: 80px;
  box-sizing: border-box;
`;

// Figma 디자인에 맞는 헤더 스타일
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
  justify-content: flex-start;
  padding-left: 10px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #4a4a4a;
  }
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
  top: 40px;
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

// 이더리움 섹션
const SuiSection = styled.div`
  margin-top: 50px;
  padding: 0 20px;
`;

const SuiHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
`;

const SuiTitle = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: white;
`;

// 토큰 선택 섹션 (네트워크 선택기와 완전히 동일한 스타일)
const TokenSelector = styled.div`
  width: 80px;
  height: 40px;
  background: #3b3b3b;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
  position: relative;

  &:hover {
    background: #4a4a4a;
  }
`;

const TokenDropdown = styled.div`
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
`;

// 토큰 선택 모달 (네트워크 모달과 동일한 스타일)
const TokenModal = styled.div`
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

const TokenModalContent = styled.div`
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

const TokenList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const TokenItem = styled.div`
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

const TokenIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0;
`;

const TokenName = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
  flex: 1;
`;

const TokenSymbol = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #888;
  margin-left: auto;
`;

// 토큰 보내기 UI 스타일
const SendContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  min-height: calc(100vh - 140px);
  padding-bottom: 100px;
`;

const AssetSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const AssetName = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: white;
`;

const AssetBalance = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #888;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputLabel = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
`;

const InputField = styled.input`
  width: 100%;
  height: 50px;
  background: #2a2a2a;
  border: 1px solid #3b3b3b;
  border-radius: 8px;
  padding: 0 15px;
  font-family: "Mina", sans-serif;
  font-size: 14px;
  color: white;
  box-sizing: border-box;

  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
    border-color: #f29d38;
  }
`;

const AmountGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MaxButton = styled.button`
  background: #f29d38;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #ffb84d;
  }
`;

const GasFeeSection = styled.div`
  background: #2a2a2a;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const GasFeeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GasFeeIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url("${imgImage3}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const GasFeeTitle = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
`;

const GasFeeAmount = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #888;
`;

const GasFeeWarning = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #f29d38;
  line-height: 1.4;
`;

const SendButton = styled.button`
  width: 100%;
  height: 50px;
  background: #f29d38;
  border: none;
  border-radius: 8px;
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #ffb84d;
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #f29d38;
  }
`;

// 취소/확인 버튼 스타일
const ActionButtonsContainer = styled.div`
  position: absolute;
  bottom: 20px;
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

const SuiChange = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #4ade80;
  margin-bottom: 15px;
`;

const SuiAddress = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
`;

const AddressText = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #f29d38;
  flex: 1;
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  color: #f29d38;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(242, 157, 56, 0.1);
  }
`;

// Send/Receive 버튼 섹션
const ActionSection = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 20px;
  margin-bottom: 30px;
`;

const ActionButton = styled.button`
  flex: 1;
  height: 120px;
  background: transparent;
  border: none;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(242, 157, 56, 0.1);
  }
`;

const ActionIcon = styled.div`
  width: 40px;
  height: 40px;
  background-image: url("${(props) => props.src}");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  filter: brightness(0) invert(1);
`;

const ActionText = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
`;

// 잔액 섹션
const BalanceSection = styled.div`
  padding: 0 20px;
  margin-bottom: 30px;
`;

const BalanceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #3b3b3b;
`;

const BalanceLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BalanceIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url("${imgSui}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const BalanceInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const BalanceName = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
`;

const BalanceChange = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #4ade80;
`;

const BalanceRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const BalanceAmount = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
`;

const BalanceUSD = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #888;
`;

// 거래 내역 섹션
const TransactionSection = styled.div`
  padding: 0 20px;
`;

const TransactionDate = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
  margin: 20px 0 10px 0;
`;

const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #3b3b3b;
`;

const TransactionIcon = styled.div`
  width: 32px;
  height: 32px;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: brightness(0) invert(1);
`;

const TransactionInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TransactionType = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
  margin-bottom: 2px;
`;

const TransactionStatus = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #888;
`;

const TransactionAmount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TransactionValue = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: ${(props) => (props.type === "send" ? "#ef4444" : "#4ade80")};
  margin-bottom: 2px;
`;

const TransactionTime = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #888;
`;

// Figma 디자인에 맞는 네트워크 선택 모달 (중앙 모달)
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

const NetworkIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0;
`;

const HeaderNetworkIcon = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
  height: 25px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
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

// 점선 패턴
const DotPattern = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 7px;
  transform: translateY(-50%);
  background: repeating-linear-gradient(
    to right,
    #5f5f5f 0px,
    #5f5f5f 6px,
    transparent 6px,
    transparent 12px
  );
`;

// MainDashboard와 동일한 푸터 스타일
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
  height: 10px;
  background-image: radial-gradient(circle, #1d1818 2px, transparent 2px);
  background-size: 20px 20px;
  background-position: 0 0;
`;

const PatternBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 10px;
  background-image: radial-gradient(circle, #1d1818 2px, transparent 2px);
  background-size: 20px 20px;
  background-position: 0 0;
`;

const NavItem = styled.div`
  width: 70px;
  height: 60px;
  background: ${(props) => (props.active ? "white" : "#5f5f5f")};
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: absolute;

  &:hover {
    background: #f29d38;
    transform: scale(1.05);
  }
`;

const NavIcon = styled.div`
  width: 30px;
  height: 30px;
  background-image: ${(props) =>
    props.active ? "none" : `url("${props.src}")`};
  background-color: ${(props) => (props.active ? "#f29d38" : "transparent")};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 2px;
  ${(props) =>
    props.active &&
    `
    mask: url("${props.src}") no-repeat center;
    -webkit-mask: url("${props.src}") no-repeat center;
    mask-size: contain;
    -webkit-mask-size: contain;
  `}
`;

const NavText = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 10px;
  color: ${(props) => (props.active ? "#f29d38" : "black")};
  text-align: center;
  line-height: normal;
`;

const SendReceive = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedNetwork, setSelectedNetwork] = useState("sui");
  const [balance, setBalance] = useState(5.0);
  const [balanceChange, setBalanceChange] = useState(1.16);
  const [balanceChangePercent, setBalanceChangePercent] = useState(9.68);
  const [ticketBalance, setTicketBalance] = useState(10);
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState("sui");
  const [currentView, setCurrentView] = useState("main"); // "main", "send", "receive"
  const [recipientAddress, setRecipientAddress] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [gasFee, setGasFee] = useState(0);
  const [requiredTickets, setRequiredTickets] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationComplete, setCalculationComplete] = useState(false);
  const [calculationTimeout, setCalculationTimeout] = useState(null);

  useEffect(() => {
    initializeTicketBalance();
  }, []);

  // 쿼리 파라미터에서 토큰 ID 처리
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenId = searchParams.get("token");
    if (tokenId && ["sui", "usdc", "usdt"].includes(tokenId)) {
      setSelectedToken(tokenId);
    }
  }, [location.search]);

  // debounce 함수
  const debouncedCalculateGasFee = () => {
    if (calculationTimeout) {
      clearTimeout(calculationTimeout);
    }

    const timeout = setTimeout(() => {
      if (recipientAddress && sendAmount) {
        calculateGasFee();
      }
    }, 1000); // 1초 후에 계산 실행

    setCalculationTimeout(timeout);
  };

  const initializeTicketBalance = async () => {
    try {
      const balance = await gasSponsorService.getTicketBalance();
      setTicketBalance(balance);
    } catch (error) {
      console.error("티켓 잔액 초기화 실패:", error);
    }
  };

  // Figma 디자인에 맞는 네트워크 데이터
  const networks = [
    { id: "ethereum", name: "Ethereum Mainnet", icon: imgImage7, left: 113.5 },
    { id: "arbitrum", name: "Arbitrum One", icon: imgImage8, left: 98.5 },
    {
      id: "polygon",
      name: "Polygon Mainnet(MATIC)",
      icon: imgImage34,
      left: 134.5,
    },
    { id: "base", name: "BASE Mainnet", icon: imgImage35, left: 100 },
    {
      id: "very",
      name: "VERY Mainnet",
      icon: imgVerychatSymbolGraRd1,
      left: 100.5,
    },
  ];

  // 토큰 데이터
  const tokens = [
    { id: "sui", name: "Sui", symbol: "SUI", icon: imgSui },
    {
      id: "usdc",
      name: "USDC",
      symbol: "USDC",
      icon: "/assets/usd-coin-usdc-logo.svg",
    },
    {
      id: "usdt",
      name: "USDT",
      symbol: "USDT",
      icon: "/assets/tether-usdt-logo.svg",
    },
  ];

  const handleNetworkChange = () => {
    setIsNetworkModalOpen(true);
  };

  const handleNetworkSelect = (networkId) => {
    setSelectedNetwork(networkId);
    setIsNetworkModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsNetworkModalOpen(false);
  };

  const handleTokenChange = () => {
    setIsTokenModalOpen(true);
  };

  const handleTokenSelect = (tokenId) => {
    setSelectedToken(tokenId);
    setIsTokenModalOpen(false);
  };

  const handleCloseTokenModal = () => {
    setIsTokenModalOpen(false);
  };

  // 선택된 토큰에 따른 정보 반환
  const getSelectedTokenInfo = () => {
    const selectedTokenData = tokens.find(
      (token) => token.id === selectedToken
    );
    return selectedTokenData || tokens[0]; // 기본값은 첫 번째 토큰
  };

  // 토큰별 잔액 정보
  const getTokenBalance = () => {
    switch (selectedToken) {
      case "sui":
        return {
          amount: "1.25 SUI",
          usd: "$5.00",
          change: "+9.68%",
          balance: 5.0,
          changePercent: 9.68,
        };
      case "usdc":
        return {
          amount: "50.0 USDC",
          usd: "$50.00",
          change: "+0.1%",
          balance: 50.0,
          changePercent: 0.1,
        };
      case "usdt":
        return {
          amount: "25.5 USDT",
          usd: "$25.50",
          change: "+0.05%",
          balance: 25.5,
          changePercent: 0.05,
        };
      default:
        return {
          amount: "1.25 SUI",
          usd: "$5.00",
          change: "+9.68%",
          balance: 5.0,
          changePercent: 9.68,
        };
    }
  };

  const handleTicketClick = () => {
    navigate("/ad-ticket");
  };

  const handleSendClick = () => {
    setCurrentView("send");
    calculateGasFee();
  };

  const handleReceiveClick = () => {
    setCurrentView("receive");
  };

  const handleBackToMain = () => {
    setCurrentView("main");
    setRecipientAddress("");
    setSendAmount("");
    setMemo("");
    setGasFee(0);
    setRequiredTickets(0);
    setIsCalculating(false);
    setCalculationComplete(false);

    // timeout 정리
    if (calculationTimeout) {
      clearTimeout(calculationTimeout);
      setCalculationTimeout(null);
    }
  };

  const calculateGasFee = () => {
    if (isCalculating) return; // 이미 계산 중이면 중복 실행 방지

    setIsCalculating(true);
    setCalculationComplete(false);

    // 펜딩 상태 시뮬레이션 (1초로 단축)
    setTimeout(() => {
      // 가스비 계산 로직 (더미 데이터)
      const baseGasFee = 0.001; // 기본 가스비 (SUI)
      const gasPrice = 20; // Gwei
      const gasLimit = 21000; // 기본 트랜잭션 가스 한도

      const calculatedGasFee = baseGasFee + (gasPrice * gasLimit) / 1000000000;
      setGasFee(calculatedGasFee);

      // AD Ticket 계산: 1 SUI = 100 AD Tickets (예시)
      const ticketsNeeded = Math.ceil(calculatedGasFee * 100);
      setRequiredTickets(ticketsNeeded);

      setIsCalculating(false);
      setCalculationComplete(true);
    }, 1000);
  };

  const handleMaxAmount = () => {
    const tokenBalance = getTokenBalance();
    setSendAmount(tokenBalance.balance.toString());
  };

  const handleSendTransaction = async () => {
    if (!recipientAddress || !sendAmount) {
      toast.error("수신자 주소와 금액을 입력해주세요.");
      return;
    }

    const tokenBalance = getTokenBalance();
    if (parseFloat(sendAmount) > tokenBalance.balance) {
      toast.error("잔액이 부족합니다.");
      return;
    }

    if (ticketBalance < requiredTickets) {
      toast.error(
        `AD Ticket이 부족합니다. 필요: ${requiredTickets}개, 보유: ${ticketBalance}개`
      );
      return;
    }

    // 서명 페이지로 이동
    navigate("/transaction-signature", {
      state: {
        transactionData: {
          type: "Send",
          amount: sendAmount,
          from: "34v9XJVX2RykSoApLklLfg...34T1",
          to: recipientAddress,
          network: "SUI Mainnet",
          networkFee: "0.0012367 SUI",
          adTicket: requiredTickets,
        },
        ticketBalance: ticketBalance,
      },
    });
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("0xcEDBf1ceAd7C19C94ec7C01D15c974AbFB44926F");
    toast.success("주소가 복사되었습니다!");
  };

  const getNetworkIcon = () => {
    switch (selectedNetwork) {
      case "sui":
        return "/assets/sui-sui-logo.svg";
      case "ethereum":
        return "/assets/eth.svg";
      case "arbitrum":
        return "/assets/arbitrum-icon.svg";
      case "polygon":
        return "/assets/polygon-icon.svg";
      default:
        return "/assets/sui-sui-logo.svg";
    }
  };

  return (
    <Container>
      {/* Figma 디자인에 맞는 헤더 */}
      <Header>
        <NetworkSelector onClick={handleNetworkChange}>
          <NetworkIcon src={getNetworkIcon()} />
          <NetworkDropdown />
        </NetworkSelector>

        <AccountInfo>
          <AccountIcon src={getNetworkIcon()} />
          <AccountName>Account 1</AccountName>
          <AccountDropdown />
        </AccountInfo>
        <AccountAddress>0xcEDBf...4926F</AccountAddress>

        <TicketBalance onClick={handleTicketClick}>
          <TicketIcon />
          <TicketCount>{ticketBalance}</TicketCount>
        </TicketBalance>
      </Header>

      {/* 메인 콘텐츠 영역 */}
      {currentView === "main" && (
        <>
          {/* 선택된 토큰 섹션 */}
          <SuiSection>
            <SuiHeader>
              <SuiTitle>{getSelectedTokenInfo().name}</SuiTitle>
              <TokenSelector onClick={handleTokenChange}>
                <div
                  style={{
                    position: "absolute",
                    left: "8px",
                    top: "calc(50% + 2px)",
                    transform: "translateY(-50%)",
                  }}
                >
                  <img
                    src={getSelectedTokenInfo().icon}
                    alt={getSelectedTokenInfo().name}
                    style={{ width: "24px", height: "24px" }}
                  />
                </div>
                <TokenDropdown />
              </TokenSelector>
            </SuiHeader>
            <SuiChange>
              +${balanceChange} (+{getTokenBalance().changePercent}%)
            </SuiChange>
            <SuiAddress>
              <AddressText>
                0xcEDBf1ceAd7C19C94ec7C01D15c974AbFB44926F
              </AddressText>
              <CopyButton onClick={handleCopyAddress} style={{ left: "280px" }}>
                <img
                  src="/assets/Copy.png"
                  alt="Copy"
                  style={{ width: "16px", height: "16px" }}
                />
              </CopyButton>
            </SuiAddress>
          </SuiSection>

          {/* Send/Receive 버튼 */}
          <ActionSection>
            <ActionButton onClick={handleSendClick}>
              <ActionIcon src={imgSendToken} />
              <ActionText>토큰 보내기</ActionText>
            </ActionButton>
            <ActionButton onClick={handleReceiveClick}>
              <ActionIcon src={imgReceiveToken} />
              <ActionText>토큰 받기</ActionText>
            </ActionButton>
          </ActionSection>

          {/* 잔액 섹션 */}
          <BalanceSection>
            <BalanceItem>
              <BalanceLeft>
                <BalanceIcon
                  style={{
                    backgroundImage: `url("${getSelectedTokenInfo().icon}")`,
                  }}
                />
                <BalanceInfo>
                  <BalanceName>{getSelectedTokenInfo().name}</BalanceName>
                  <BalanceChange>{getTokenBalance().change}</BalanceChange>
                </BalanceInfo>
              </BalanceLeft>
              <BalanceRight>
                <BalanceAmount>{getTokenBalance().amount}</BalanceAmount>
                <BalanceUSD>{getTokenBalance().usd}</BalanceUSD>
              </BalanceRight>
            </BalanceItem>
          </BalanceSection>

          {/* 거래 내역 - Sui 토큰만 표시 */}
          {selectedToken === "sui" && (
            <TransactionSection>
              <TransactionDate>2025/07/21</TransactionDate>
              <TransactionItem>
                <TransactionIcon
                  src={imgEuroDollar}
                  style={{
                    filter: "brightness(0) invert(1)",
                  }}
                />
                <TransactionInfo>
                  <TransactionType>Send</TransactionType>
                  <TransactionStatus>Confirmed</TransactionStatus>
                </TransactionInfo>
                <TransactionAmount>
                  <TransactionValue type="send">-0.00263 SUI</TransactionValue>
                  <TransactionTime>16:04:02</TransactionTime>
                </TransactionAmount>
              </TransactionItem>
              <TransactionItem>
                <TransactionIcon
                  src={imgEuroDollar}
                  style={{
                    filter: "brightness(0) invert(1)",
                  }}
                />
                <TransactionInfo>
                  <TransactionType>Receive</TransactionType>
                  <TransactionStatus>Confirmed</TransactionStatus>
                </TransactionInfo>
                <TransactionAmount>
                  <TransactionValue type="receive">
                    +0.00263 SUI
                  </TransactionValue>
                  <TransactionTime>16:03:42</TransactionTime>
                </TransactionAmount>
              </TransactionItem>

              <TransactionDate>2025/07/22</TransactionDate>
              <TransactionItem>
                <TransactionIcon
                  src={imgGlobe}
                  style={{
                    filter: "brightness(0) invert(1)",
                  }}
                />
                <TransactionInfo>
                  <TransactionType>Swap</TransactionType>
                  <TransactionStatus>Confirmed</TransactionStatus>
                </TransactionInfo>
                <TransactionAmount>
                  <TransactionValue type="receive">+0.05 SUI</TransactionValue>
                  <TransactionTime>16:04:02</TransactionTime>
                </TransactionAmount>
              </TransactionItem>
              <TransactionItem>
                <TransactionIcon src={imgWallet} />
                <TransactionInfo>
                  <TransactionType>Contract interaction</TransactionType>
                  <TransactionStatus>Confirmed</TransactionStatus>
                </TransactionInfo>
                <TransactionAmount>
                  <TransactionValue type="send">-0.00263 SUI</TransactionValue>
                  <TransactionTime>16:04:02</TransactionTime>
                </TransactionAmount>
              </TransactionItem>
            </TransactionSection>
          )}
        </>
      )}

      {/* 토큰 보내기 화면 */}
      {currentView === "send" && (
        <SendContainer>
          <AssetSection>
            <AssetName>{getSelectedTokenInfo().name}</AssetName>
            <AssetBalance>{getTokenBalance().amount}</AssetBalance>
          </AssetSection>

          <InputSection>
            <InputGroup>
              <InputLabel>전송할 주소</InputLabel>
              <InputField
                type="text"
                placeholder="0x..."
                value={recipientAddress}
                onChange={(e) => {
                  setRecipientAddress(e.target.value);
                  debouncedCalculateGasFee();
                }}
              />
            </InputGroup>

            <InputGroup>
              <AmountGroup>
                <InputLabel>수량</InputLabel>
                <MaxButton onClick={handleMaxAmount}>MAX</MaxButton>
              </AmountGroup>
              <InputField
                type="number"
                placeholder="0.0"
                value={sendAmount}
                onChange={(e) => {
                  setSendAmount(e.target.value);
                  debouncedCalculateGasFee();
                }}
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>메모</InputLabel>
              <InputField
                type="text"
                placeholder="선택사항"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </InputGroup>
          </InputSection>

          <GasFeeSection>
            <GasFeeHeader>
              <GasFeeIcon />
              <GasFeeTitle>
                {isCalculating
                  ? "계산 중..."
                  : `AD TICKET - ${requiredTickets}개`}
              </GasFeeTitle>
            </GasFeeHeader>
            <GasFeeAmount>
              {isCalculating
                ? "가스비 계산 중..."
                : `가스수수료 ${gasFee.toFixed(6)} SUI`}
            </GasFeeAmount>
            <GasFeeWarning>
              {isCalculating
                ? "전송 정보를 분석하고 있습니다..."
                : "AD TICKET이 없을시 소유하신 토큰으로 가스수수료를 사용하거나 거래를 실행할수없습니다."}
            </GasFeeWarning>
          </GasFeeSection>

          <ActionButtonsContainer>
            <ActionButtonImage
              onClick={handleBackToMain}
              style={{ left: "40px", bottom: "20px" }}
            >
              <img
                src={imgButton}
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
                  fontFamily: "Mina, sans-serif",
                  fontWeight: "700",
                  fontSize: "20px",
                  pointerEvents: "none",
                }}
              >
                취소
              </div>
            </ActionButtonImage>
            <ActionButtonImage
              onClick={handleSendTransaction}
              disabled={
                !recipientAddress ||
                !sendAmount ||
                ticketBalance < requiredTickets ||
                isCalculating ||
                !calculationComplete
              }
              style={{ left: "220px", bottom: "20px" }}
            >
              <img
                src={imgButton}
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
                  fontFamily: "Mina, sans-serif",
                  fontWeight: "700",
                  fontSize: "20px",
                  pointerEvents: "none",
                }}
              >
                확인
              </div>
            </ActionButtonImage>
          </ActionButtonsContainer>
        </SendContainer>
      )}

      {/* 토큰 받기 화면 */}
      {currentView === "receive" && (
        <SendContainer>
          <BackButton onClick={handleBackToMain}>←</BackButton>
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <h2 style={{ color: "white", marginBottom: "20px" }}>토큰 받기</h2>
            <p style={{ color: "#888" }}>받기 기능은 추후 구현 예정입니다.</p>
          </div>
        </SendContainer>
      )}

      {/* MainDashboard와 동일한 푸터 */}
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
          active={true}
          style={{ position: "absolute", left: "96px", top: "10px" }}
        >
          <NavIcon active={true} src={imgDollarEuroExchange} />
          <NavText active={true}>Send / Recive</NavText>
        </NavItem>

        <NavItem
          style={{ position: "absolute", left: "171px", top: "10px" }}
          onClick={() => navigate("/bridge")}
        >
          <NavIcon src={imgAroundTheGlobe} />
          <NavText>Swap / Bridge</NavText>
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

      {/* Figma 디자인에 맞는 네트워크 선택 모달 */}
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
                  <NetworkIcon src={network.icon} />
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

      {/* 토큰 선택 모달 */}
      {isTokenModalOpen && (
        <TokenModal onClick={handleCloseTokenModal}>
          <TokenModalContent onClick={(e) => e.stopPropagation()}>
            <TokenModalHeader>
              <TokenModalTitle>토큰</TokenModalTitle>
              <TokenCloseButton onClick={handleCloseTokenModal}>
                ×
              </TokenCloseButton>
            </TokenModalHeader>

            <TokenList>
              {tokens.map((token) => (
                <TokenItem
                  key={token.id}
                  onClick={() => handleTokenSelect(token.id)}
                >
                  <TokenIcon src={token.icon} />
                  <TokenName>{token.name}</TokenName>
                  <TokenSymbol>{token.symbol}</TokenSymbol>
                </TokenItem>
              ))}
            </TokenList>
          </TokenModalContent>
        </TokenModal>
      )}
    </Container>
  );
};

export default SendReceive;
