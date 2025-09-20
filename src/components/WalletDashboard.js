import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";

// 이미지 상수들
const imgImage3 = "/assets/adwallet-icon.png";
const imgImage29 = "/assets/Google-icon.png"; // Google 로고
const imgImage27 = "/assets/Apple_logo_black.svg.png"; // Apple 로고
const imgImage30 = "/assets/kakao-icon.png"; // Kakao 로고
const imgVector = "/assets/button.png";
const imgVector1 = "/assets/button.png";

const DashboardContainer = styled.div`
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

// 상단 점선 패턴
const PatternTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-image: radial-gradient(
      circle at 20px 20px,
      #5f5f5f 2px,
      transparent 2px
    ),
    radial-gradient(circle at 40px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 60px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 80px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 100px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 120px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 140px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 160px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 180px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 200px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 220px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 240px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 260px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 280px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 300px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 320px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 340px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 360px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 380px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 400px 20px, #5f5f5f 2px, transparent 2px);
  background-size: 20px 20px;
  background-position: 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0,
    0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0;
  background-repeat: no-repeat;
  z-index: 1;
`;

// 하단 점선 패턴
const PatternBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-image: radial-gradient(
      circle at 20px 20px,
      #5f5f5f 2px,
      transparent 2px
    ),
    radial-gradient(circle at 40px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 60px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 80px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 100px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 120px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 140px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 160px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 180px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 200px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 220px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 240px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 260px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 280px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 300px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 320px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 340px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 360px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 380px 20px, #5f5f5f 2px, transparent 2px),
    radial-gradient(circle at 400px 20px, #5f5f5f 2px, transparent 2px);
  background-size: 20px 20px;
  background-position: 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0,
    0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0;
  background-repeat: no-repeat;
  z-index: 1;
`;

const MainContent = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px 80px 20px;
  box-sizing: border-box;
  z-index: 2;
`;

// AD Ticket 아이콘
const TicketIcon = styled.div`
  width: 200px;
  height: 200px;
  background-image: url("${imgImage3}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 30px;
`;

// AD Ticket 텍스트
const TicketTitle = styled.h1`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: #f29d38;
  text-align: center;
  margin: 0 0 60px 0;
`;

// 소셜 로그인 섹션
const SocialLoginSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-bottom: 80px;
`;

const SocialButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const SocialIcon = styled.div`
  width: 60px;
  height: 60px;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
  filter: ${(props) => (props.isApple ? "brightness(0) invert(1)" : "none")};
`;

const SocialText = styled.p`
  font-family: "Mina", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: white;
  margin: 0;
  text-align: center;
`;

// 액션 버튼들
const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ActionButton = styled.button`
  position: relative;
  width: 160px;
  height: 80px;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ButtonBackground = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-image: url("${(props) => props.background}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const ButtonText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: white;
  margin: 0;
  text-align: center;
  z-index: 1;
  white-space: nowrap;
`;

const WalletDashboard = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Google OAuth 시뮬레이션
    toast.success("Google 로그인 시뮬레이션");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleAppleLogin = () => {
    // Apple OAuth 시뮬레이션
    toast.success("Apple 로그인 시뮬레이션");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleKakaoLogin = () => {
    // Kakao OAuth 시뮬레이션
    toast.success("Kakao 로그인 시뮬레이션");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleCreateWallet = () => {
    navigate("/create-wallet");
  };

  const handleImportWallet = () => {
    toast.info("지갑 불러오기 기능은 추후 구현 예정입니다.");
  };

  return (
    <DashboardContainer>
      <PatternTop />
      <PatternBottom />

      <MainContent>
        <TicketIcon />
        <TicketTitle>AD Ticket</TicketTitle>

        <SocialLoginSection>
          <SocialButton onClick={handleGoogleLogin}>
            <SocialIcon src={imgImage29} />
            <SocialText>Google</SocialText>
          </SocialButton>

          <SocialButton onClick={handleAppleLogin}>
            <SocialIcon src={imgImage27} isApple={true} />
            <SocialText>Apple</SocialText>
          </SocialButton>

          <SocialButton onClick={handleKakaoLogin}>
            <SocialIcon src={imgImage30} />
            <SocialText>kakao</SocialText>
          </SocialButton>
        </SocialLoginSection>

        <ActionButtons>
          <ActionButton onClick={handleCreateWallet}>
            <ButtonBackground background={imgVector} />
            <ButtonText>새 지갑 만들기</ButtonText>
          </ActionButton>

          <ActionButton onClick={handleImportWallet}>
            <ButtonBackground background={imgVector1} />
            <ButtonText>지갑 불러오기</ButtonText>
          </ActionButton>
        </ActionButtons>
      </MainContent>
    </DashboardContainer>
  );
};

export default WalletDashboard;
