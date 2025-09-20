import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import gasSponsorService from "../services/gasSponsor";
import {
  createContainerStyle,
  createTextStyle,
  createFlexStyle,
  responsiveSize,
  responsiveFontSize,
  responsiveSpacing,
} from "../utils/autoLayout";

// 이미지 상수들
const imgButton = "/assets/button.png";
const imgArrowLeft = "/assets/arrow-left.png";
const imgArrowRight = "/assets/arrow-right.png";
const imgAdTicket = "/assets/adwallet-icon.png";
const imgFrame58 = "/assets/ethereum-icon.svg";
const imgPolygon1 = "/assets/arrow-down.png";
const suiIcon = "/assets/sui-sui-logo.svg";

// 푸터 아이콘들
const imgSettings = "/assets/setting-icon.png";
const imgAroundTheGlobe = "/assets/globe-icon.png";
const imgCryptoTradingSpot = "/assets/Crypto-Trading-Spot-icon.png";
const imgWallet = "/assets/wallet-icon.png";
const imgDollarEuroExchange = "/assets/eruo-dollor-icon.png";

const Container = styled.div`
  ${createContainerStyle()}
  background: #1d1818;
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  padding: 20px;
  box-sizing: border-box;
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 20px;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const BackIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url("${imgArrowLeft}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: rotate(0deg);
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
  background-image: url("${imgPolygon1}");
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
  background-image: url("${imgAdTicket}");
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

const Title = styled.h1`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: white;
  text-align: center;
  margin: 60px 0 40px 0;
`;

const TransactionDetails = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 0 20px;
  margin-bottom: 40px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #333;
  color: white;

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-family: "Mina", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #999;
`;

const DetailValue = styled.span`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
`;

const ActionButtonsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  height: 80px;
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

const NavigationBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: #1d1818;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  z-index: 100;
`;

const PatternTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 7px;
  background: radial-gradient(
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
  background: radial-gradient(
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

const TransactionSignature = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { transactionData, ticketBalance } = location.state || {
    transactionData: {
      type: "Send",
      amount: "0.002",
      from: "34v9XJVX2RykSoApLklLfg...34T1",
      to: "34v9XJVX2RykSoApLklLfg...34T1",
      network: "ETHEREUM Mainnet",
      networkFee: "0.0012367 ETH",
      adTicket: 1,
    },
    ticketBalance: 19,
  };

  const handleBack = () => {
    navigate("/send-receive");
  };

  const getNetworkIcon = () => {
    return suiIcon; // 기본값으로 Sui 아이콘 사용
  };

  const handleCancel = () => {
    navigate("/send-receive");
  };

  const handleConfirm = async () => {
    try {
      // 실제 트랜잭션 전송 로직
      console.log("Transaction confirmed:", transactionData);

      // AD Ticket을 사용하여 가스비 대납
      const requiredTickets = transactionData.adTicket;
      const success = await gasSponsorService.activateGasSponsor(
        requiredTickets
      );

      if (success) {
        // 성공 시 토스트 메시지 표시
        toast.success("트랜잭션이 성공적으로 전송되었습니다!");

        // 잔액 업데이트
        const updatedBalance = await gasSponsorService.get_ticket_balance();
        console.log("Updated ticket balance:", updatedBalance);

        // 메인 대시보드로 이동
        navigate("/dashboard");
      } else {
        toast.error("AD Ticket이 부족합니다.");
      }
    } catch (error) {
      console.error("Transaction failed:", error);
      toast.error("트랜잭션 전송에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>
          <BackIcon />
        </BackButton>

        <AccountInfo>
          <AccountIcon src={getNetworkIcon()} />
          <AccountName>Account 1</AccountName>
          <AccountDropdown />
          <AccountAddress>0xcEDBf...4926F</AccountAddress>
        </AccountInfo>

        <TicketBalance>
          <TicketIcon />
          <TicketCount>{ticketBalance}</TicketCount>
        </TicketBalance>
      </Header>

      <Title>서명하기</Title>

      <TransactionDetails>
        <DetailRow>
          <DetailLabel>유형</DetailLabel>
          <DetailValue>{transactionData.type}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>수량</DetailLabel>
          <DetailValue>{transactionData.amount}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>보내는 주소</DetailLabel>
          <DetailValue>{transactionData.from}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>받는 주소</DetailLabel>
          <DetailValue>{transactionData.to}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>네트워크</DetailLabel>
          <DetailValue>{transactionData.network}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>네트워크 수수료</DetailLabel>
          <DetailValue>{transactionData.networkFee}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>AD TICKET</DetailLabel>
          <DetailValue>{transactionData.adTicket}</DetailValue>
        </DetailRow>
      </TransactionDetails>

      <ActionButtonsContainer>
        <ActionButtonImage
          onClick={handleCancel}
          style={{ left: "40px", bottom: "100px" }}
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
          onClick={handleConfirm}
          style={{ left: "220px", bottom: "100px" }}
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

      <NavigationBar>
        <PatternTop />
        <PatternBottom />

        <NavItem active={true} onClick={() => navigate("/dashboard")}>
          <NavIcon active={true} src={imgWallet} />
          <NavText active={true}>Wallet</NavText>
        </NavItem>

        <NavItem onClick={() => navigate("/send-receive")}>
          <NavIcon src={imgDollarEuroExchange} />
          <NavText>Send / Recive</NavText>
        </NavItem>

        <NavItem onClick={() => navigate("/swap-bridge")}>
          <NavIcon src={imgAroundTheGlobe} />
          <NavText>Swap / Bridge</NavText>
        </NavItem>

        <NavItem onClick={() => navigate("/transaction-history")}>
          <NavIcon src={imgCryptoTradingSpot} />
          <NavText>Transaction</NavText>
        </NavItem>

        <NavItem onClick={() => navigate("/settings")}>
          <NavIcon src={imgSettings} />
          <NavText>Setting</NavText>
        </NavItem>
      </NavigationBar>
    </Container>
  );
};

export default TransactionSignature;
