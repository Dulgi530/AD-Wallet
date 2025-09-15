import React from "react";
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
const imgImage3 = "http://localhost:3845/assets/4a6aad9c9d13776d70b296a4d7b3f71253a93463.png";
const imgImage29 = "http://localhost:3845/assets/28aa199e34d85cb0a0d533999253f5c50ed2e5f9.png";
const imgImage27 = "http://localhost:3845/assets/9b387874335e4d7be3b68bbff00b85578869530f.png";
const imgImage30 = "http://localhost:3845/assets/b7131dce1e4820a3520dd13a947d85a7fa43bf6a.png";
const imgVector = "http://localhost:3845/assets/9c9baa69399e6e25e9d51108344555d9cd55a853.svg";
const imgVector1 = "http://localhost:3845/assets/894d81e3b1489d46491680c760b7b4766d1deee2.svg";

const WalletContainer = styled.div`
  ${createContainerStyle()}
`;

const PatternTop = styled.div`
  position: absolute;
  left: 0;
  top: calc(50% - 453px);
  transform: translateY(-50%);
  display: contents;
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const PatternBottom = styled.div`
  position: absolute;
  left: 0;
  top: calc(50% + 453px);
  transform: translateY(-50%);
  display: contents;
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const PatternDot = styled.div`
  position: absolute;
  background: #5f5f5f;
  height: 7px;
  border-radius: 1px;
  transform: translateY(-50%);
  width: ${(props) => props.width || "6px"};
  left: ${(props) => props.left}px;
  top: ${(props) => props.top};
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${responsiveSpacing(40)} ${responsiveSpacing(20)};
  gap: ${responsiveSpacing(40)};
`;

const TicketIcon = styled.div`
  width: ${responsiveSize(120)};
  height: ${responsiveSize(120)};
  background-image: url("${imgImage3}");
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

const SocialLoginContainer = styled.div`
  ${createFlexStyle('row', 'center', 'center', 30)}
  margin-bottom: ${responsiveSpacing(40)};
  
  @media (max-width: 480px) {
    gap: ${responsiveSpacing(20)};
  }
`;

const SocialButton = styled.button`
  ${createFlexStyle('column', 'center', 'center', 8)}
  background: none;
  border: none;
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
  width: ${responsiveSize(60)};
  height: ${responsiveSize(60)};
  background-image: url("${(props) => props.icon}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: ${responsiveSpacing(8)};
`;

const SocialLabel = styled.span`
  ${createTextStyle(14)}
  color: white;
  text-align: center;
`;

const ActionButtonsContainer = styled.div`
  ${createFlexStyle('row', 'center', 'center', 20)}
  width: 100%;
  max-width: ${responsiveSize(400)};
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: ${responsiveSpacing(15)};
  }
`;

const ActionButton = styled.button`
  position: relative;
  width: ${responsiveSize(180)};
  height: ${responsiveSize(80)};
  border: none;
  background: none;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s ease;
  flex: 1;
  
  &:hover {
    transform: scale(1.02);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 480px) {
    width: 100%;
    height: ${responsiveSize(70)};
  }
`;

const ButtonBackground = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 100%;
  background-image: url("${(props) => props.background}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const ButtonText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  ${createTextStyle(18)}
  color: white;
  text-align: center;
  margin: 0;
  z-index: 1;
  font-weight: 700;
`;

const WalletDashboard = () => {
  const navigate = useNavigate();

  const handleCreateWallet = () => {
    navigate("/create-wallet");
  };

  const handleImportWallet = () => {
    navigate("/dashboard");
  };

  const handleSocialLogin = (provider) => {
    if (provider === "google") {
      toast.success("Google 로그인 성공!");
      setTimeout(() => {
        navigate("/create-wallet");
      }, 1000);
    } else {
      toast.info(`${provider} 로그인은 준비 중입니다.`);
    }
  };

  // 패턴 도트들의 위치 데이터
  const patternDots = [
    { left: 20, top: "calc(50% - 453px)" },
    { left: 36, top: "calc(50% - 453px)" },
    { left: 0, top: "calc(50% - 453px)", width: "4px" },
    { left: 432, top: "calc(50% - 453px)" },
    { left: 784, top: "calc(50% - 453px)" },
    { left: 1136, top: "calc(50% - 453px)" },
    { left: 64, top: "calc(50% - 453px)" },
    { left: 608, top: "calc(50% - 453px)" },
    { left: 240, top: "calc(50% - 453px)" },
    { left: 1312, top: "calc(50% - 453px)" },
    { left: 168, top: "calc(50% - 453px)" },
    { left: 520, top: "calc(50% - 453px)" },
    { left: 872, top: "calc(50% - 453px)" },
    { left: 1224, top: "calc(50% - 453px)" },
    { left: 344, top: "calc(50% - 453px)" },
    { left: 696, top: "calc(50% - 453px)" },
    { left: 1048, top: "calc(50% - 453px)" },
    { left: 1400, top: "calc(50% - 453px)" },
    { left: 1532, top: "calc(50% - 453px)" },
    { left: 124, top: "calc(50% - 453px)" },
    { left: 476, top: "calc(50% - 453px)" },
    { left: 828, top: "calc(50% - 453px)" },
    { left: 1180, top: "calc(50% - 453px)" },
    { left: 300, top: "calc(50% - 453px)" },
    { left: 652, top: "calc(50% - 453px)" },
    { left: 1004, top: "calc(50% - 453px)" },
    { left: 1356, top: "calc(50% - 453px)" },
    { left: 1488, top: "calc(50% - 453px)" },
    { left: 212, top: "calc(50% - 453px)" },
    { left: 564, top: "calc(50% - 453px)" },
    { left: 916, top: "calc(50% - 453px)" },
    { left: 1268, top: "calc(50% - 453px)" },
    { left: 388, top: "calc(50% - 453px)" },
    { left: 740, top: "calc(50% - 453px)" },
    { left: 1092, top: "calc(50% - 453px)" },
    { left: 1444, top: "calc(50% - 453px)" },
    { left: 1576, top: "calc(50% - 453px)" },
    { left: 1620, top: "calc(50% - 453px)" },
    { left: 379, top: "calc(50% - 453px)" },
  ];

  const bottomPatternDots = patternDots.map((dot) => ({
    ...dot,
    top: "calc(50% + 453px)",
  }));

  return (
    <WalletContainer>
      {/* 상단 패턴 */}
      <PatternTop>
        {patternDots.map((dot, index) => (
          <PatternDot
            key={`top-${index}`}
            left={dot.left}
            top={dot.top}
            width={dot.width}
          />
        ))}
      </PatternTop>

      {/* 하단 패턴 */}
      <PatternBottom>
        {bottomPatternDots.map((dot, index) => (
          <PatternDot
            key={`bottom-${index}`}
            left={dot.left}
            top={dot.top}
            width={dot.width}
          />
        ))}
      </PatternBottom>

      {/* 메인 컨텐츠 */}
      <MainContent>
        {/* AD Ticket 아이콘 */}
        <TicketIcon />

        {/* 제목 */}
        <Title>AD Ticket</Title>

        {/* 소셜 로그인 버튼들 */}
        <SocialLoginContainer>
          <SocialButton onClick={() => handleSocialLogin("google")}>
            <SocialIcon icon={imgImage29} />
            <SocialLabel>Google</SocialLabel>
          </SocialButton>

          <SocialButton onClick={() => handleSocialLogin("apple")}>
            <SocialIcon icon={imgImage27} />
            <SocialLabel>Apple</SocialLabel>
          </SocialButton>

          <SocialButton onClick={() => handleSocialLogin("kakao")}>
            <SocialIcon icon={imgImage30} />
            <SocialLabel>kakao</SocialLabel>
          </SocialButton>
        </SocialLoginContainer>

        {/* 액션 버튼들 */}
        <ActionButtonsContainer>
          <ActionButton onClick={handleCreateWallet}>
            <ButtonBackground background={imgVector} />
            <ButtonText>새 지갑 만들기</ButtonText>
          </ActionButton>

          <ActionButton onClick={handleImportWallet}>
            <ButtonBackground background={imgVector1} />
            <ButtonText>지갑 불러오기</ButtonText>
          </ActionButton>
        </ActionButtonsContainer>
      </MainContent>
    </WalletContainer>
  );
};

export default WalletDashboard;