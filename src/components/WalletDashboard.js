import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 이미지 상수들
const imgImage3 =
  "http://localhost:3845/assets/4a6aad9c9d13776d70b296a4d7b3f71253a93463.png";
const imgImage29 =
  "http://localhost:3845/assets/28aa199e34d85cb0a0d533999253f5c50ed2e5f9.png";
const imgImage27 =
  "http://localhost:3845/assets/9b387874335e4d7be3b68bbff00b85578869530f.png";
const imgImage30 =
  "http://localhost:3845/assets/b7131dce1e4820a3520dd13a947d85a7fa43bf6a.png";
const imgVector =
  "http://localhost:3845/assets/9c9baa69399e6e25e9d51108344555d9cd55a853.svg";
const imgVector1 =
  "http://localhost:3845/assets/894d81e3b1489d46491680c760b7b4766d1deee2.svg";

const WalletContainer = styled.div`
  background: #1d1818;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 480px) {
    height: 100vh;
    min-height: 667px;
  }
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

const LogoContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 180px;
  transform: translateX(-50%);
  width: 200px;
  height: 200px;
  background-image: url("${imgImage3}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
    top: 120px;
  }
`;

const TitleContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 422px;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 480px) {
    top: 320px;
  }
`;

const Title = styled.p`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 40px;
  line-height: normal;
  color: #f29d38;
  text-align: center;
  white-space: pre;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

const SocialLoginContainer = styled.div`
  position: absolute;
  top: 633px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;

  @media (max-width: 480px) {
    top: 480px;
    padding: 0 40px;
  }
`;

const SocialButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const SocialIcon = styled.div`
  width: 30px;
  height: 30px;
  background-image: url("${(props) => props.icon}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: ${(props) => (props.rounded ? "3px" : "0")};
`;

const SocialLabel = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: normal;
  color: white;
  text-align: center;
  white-space: pre;
  margin: 0;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 720px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 40px;
  gap: 20px;

  @media (max-width: 480px) {
    top: 580px;
    padding: 0 20px;
    gap: 15px;
  }
`;

const ActionButton = styled.button`
  position: relative;
  width: 160px;
  height: 80px;
  border: none;
  background: none;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    width: 140px;
    height: 70px;
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
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: normal;
  color: white;
  text-align: center;
  white-space: pre;
  margin: 0;
  z-index: 1;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const WalletDashboard = () => {
  const navigate = useNavigate();

  const handleCreateWallet = () => {
    // 새 지갑 생성 로직
    navigate("/dashboard");
  };

  const handleImportWallet = () => {
    // 지갑 불러오기 로직
    navigate("/dashboard");
  };

  const handleSocialLogin = (provider) => {
    // 소셜 로그인 로직
    console.log(`${provider} 로그인 시도`);
    // 실제 구현에서는 각 소셜 로그인 API를 호출
  };

  // 패턴 도트들의 위치 데이터 (모바일 최적화)
  const topPatternDots = [
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
  ];

  const bottomPatternDots = topPatternDots.map((dot) => ({
    ...dot,
    top: "calc(50% + 453px)",
  }));

  return (
    <WalletContainer>
      {/* 상단 패턴 */}
      <PatternTop>
        {topPatternDots.map((dot, index) => (
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

      {/* 로고 */}
      <LogoContainer />

      {/* 제목 */}
      <TitleContainer>
        <Title>AD Ticket</Title>
      </TitleContainer>

      {/* 소셜 로그인 */}
      <SocialLoginContainer>
        <SocialButton onClick={() => handleSocialLogin("Google")}>
          <SocialIcon icon={imgImage29} />
          <SocialLabel>Google</SocialLabel>
        </SocialButton>

        <SocialButton onClick={() => handleSocialLogin("Apple")}>
          <SocialIcon icon={imgImage27} />
          <SocialLabel>Apple</SocialLabel>
        </SocialButton>

        <SocialButton onClick={() => handleSocialLogin("Kakao")}>
          <SocialIcon icon={imgImage30} rounded />
          <SocialLabel>kakao</SocialLabel>
        </SocialButton>
      </SocialLoginContainer>

      {/* 액션 버튼들 */}
      <ButtonContainer>
        <ActionButton onClick={handleCreateWallet}>
          <ButtonBackground background={imgVector} />
          <ButtonText>새 지갑 만들기</ButtonText>
        </ActionButton>

        <ActionButton onClick={handleImportWallet}>
          <ButtonBackground background={imgVector1} />
          <ButtonText>지갑 불러오기</ButtonText>
        </ActionButton>
      </ButtonContainer>
    </WalletContainer>
  );
};

export default WalletDashboard;
