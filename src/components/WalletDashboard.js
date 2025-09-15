import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import { 
  createContainerStyle, 
  createButtonStyle, 
  createTextStyle, 
  createIconStyle,
  createFlexStyle,
  responsiveSize,
  responsiveFontSize,
  responsiveSpacing
} from "../utils/autoLayout";

// 이미지 상수들
const imgImage2 = "http://localhost:3845/assets/a5afa55a89940975aa49915299cb08c7c192db96.png";
const imgGoogle = "http://localhost:3845/assets/4a6aad9c9d13776d70b296a4d7b3f71253a93463.png";
const imgApple = "http://localhost:3845/assets/2d1ee20636d2178512aeb74537b7833e46a0afa6.png";
const imgKakao = "http://localhost:3845/assets/3a576cb5f4cb120ccaa705bb36531ed3dde6793e.png";

const DashboardContainer = styled.div`
  ${createContainerStyle()}
  position: relative;
  overflow: hidden;
`;

const PatternTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${responsiveSize(50)};
  background-image: 
    radial-gradient(circle at 20px 20px, #5f5f5f 2px, transparent 2px),
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
  background-size: ${responsiveSize(20)} ${responsiveSize(20)};
  background-position: 0 0;
  z-index: 1;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const PatternBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${responsiveSize(50)};
  background-image: 
    radial-gradient(circle at 20px 20px, #5f5f5f 2px, transparent 2px),
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
  background-size: ${responsiveSize(20)} ${responsiveSize(20)};
  background-position: 0 0;
  z-index: 1;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MainContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100vh;
  ${createFlexStyle('column', 'center', 'center', 0)}
  padding: ${responsiveSpacing(40)} ${responsiveSpacing(20)};
  box-sizing: border-box;
`;

const TicketIcon = styled.div`
  width: ${responsiveSize(120)};
  height: ${responsiveSize(120)};
  background-image: url("${imgImage2}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: ${responsiveSpacing(20)};
`;

const Title = styled.h1`
  ${createTextStyle(32)}
  color: #f29d38;
  text-align: center;
  margin: 0 0 ${responsiveSpacing(60)} 0;
  font-weight: 700;
`;

const SocialLoginSection = styled.div`
  ${createFlexStyle('row', 'center', 'center', 20)}
  margin-bottom: ${responsiveSpacing(40)};
  width: 100%;
  max-width: ${responsiveSize(300)};
`;

const SocialButton = styled.button`
  ${createFlexStyle('column', 'center', 'center', 8)}
  width: ${responsiveSize(80)};
  height: ${responsiveSize(80)};
  background: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const SocialIcon = styled.div`
  width: ${responsiveSize(40)};
  height: ${responsiveSize(40)};
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const SocialText = styled.span`
  ${createTextStyle(12)}
  color: #333;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  ${createFlexStyle('row', 'center', 'center', 20)}
  width: 100%;
  max-width: ${responsiveSize(350)};
`;

const ActionButton = styled.button`
  position: relative;
  width: ${responsiveSize(160)};
  height: ${responsiveSize(80)};
  background: #2a2a2a;
  border: none;
  border-radius: ${responsiveSize(8)};
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  
  &:hover {
    background: #3a3a3a;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 8px,
      #5f5f5f 8px,
      #5f5f5f 12px
    );
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 8px,
      #5f5f5f 8px,
      #5f5f5f 12px
    );
  }
`;

const ActionButtonText = styled.span`
  ${createTextStyle(14)}
  color: white;
  font-weight: 600;
  text-align: center;
`;

const WalletDashboard = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    toast.success("Google 로그인 시뮬레이션");
    // 실제 Google OAuth 구현
    setTimeout(() => {
      navigate("/create-wallet");
    }, 1000);
  };

  const handleAppleLogin = () => {
    toast.info("Apple 로그인은 준비 중입니다.");
  };

  const handleKakaoLogin = () => {
    toast.info("Kakao 로그인은 준비 중입니다.");
  };

  const handleCreateWallet = () => {
    navigate("/create-wallet");
  };

  const handleImportWallet = () => {
    toast.info("지갑 불러오기 기능은 준비 중입니다.");
  };

  return (
    <DashboardContainer>
      <PatternTop />
      <PatternBottom />
      
      <MainContent>
        <TicketIcon />
        <Title>AD Ticket</Title>
        
        <SocialLoginSection>
          <SocialButton onClick={handleGoogleLogin}>
            <SocialIcon src={imgGoogle} />
            <SocialText>Google</SocialText>
          </SocialButton>
          
          <SocialButton onClick={handleAppleLogin}>
            <SocialIcon src={imgApple} />
            <SocialText>Apple</SocialText>
          </SocialButton>
          
          <SocialButton onClick={handleKakaoLogin}>
            <SocialIcon src={imgKakao} />
            <SocialText>kakao</SocialText>
          </SocialButton>
        </SocialLoginSection>
        
        <ActionButtons>
          <ActionButton onClick={handleCreateWallet}>
            <ActionButtonText>새 지갑 만들기</ActionButtonText>
          </ActionButton>
          
          <ActionButton onClick={handleImportWallet}>
            <ActionButtonText>지갑 불러오기</ActionButtonText>
          </ActionButton>
        </ActionButtons>
      </MainContent>
    </DashboardContainer>
  );
};

export default WalletDashboard;