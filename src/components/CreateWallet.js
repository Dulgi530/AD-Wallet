import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";

// 이미지 상수들
const imgInvisible = "http://localhost:3845/assets/f2b01876f41f56e3e6a7dfd6363d3854a834f76e.png";
const imgVector = "http://localhost:3845/assets/9c9baa69399e6e25e9d51108344555d9cd55a853.svg";
const imgVector1 = "http://localhost:3845/assets/894d81e3b1489d46491680c760b7b4766d1deee2.svg";

const WalletContainer = styled.div`
  background: #1d1818;
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  
  @media (max-width: 480px) {
    min-height: 100vh;
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

const TitleContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 48px;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: normal;
  color: white;
  text-align: center;
  white-space: pre;
  margin: 0;
  
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const SubtitleContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 161px;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Subtitle = styled.p`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: normal;
  color: white;
  text-align: center;
  white-space: pre;
  margin: 0;
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const InputContainer = styled.div`
  position: absolute;
  left: 50%;
  top: ${(props) => props.top}px;
  transform: translateX(-50%);
  width: 320px;
  height: 40px;
  
  @media (max-width: 480px) {
    width: 280px;
  }
`;

const InputField = styled.input`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 100%;
  height: 40px;
  background: white;
  border: none;
  border-radius: 5px;
  padding: 0 15px;
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-size: 16px;
  color: #333;
  box-shadow: inset 0px 4px 4px 2px rgba(0, 0, 0, 0.25);
  
  &:focus {
    outline: none;
    box-shadow: inset 0px 4px 4px 2px rgba(0, 0, 0, 0.25), 0 0 0 2px #f29d38;
  }
  
  &::placeholder {
    color: #999;
  }
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-image: url("${imgInvisible}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  z-index: 1;
`;

const HelperText = styled.p`
  position: absolute;
  left: 40px;
  top: 258px;
  transform: translateY(-50%);
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: normal;
  color: white;
  white-space: pre;
  margin: 0;
  
  @media (max-width: 480px) {
    left: 20px;
    font-size: 12px;
  }
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

const CreateWallet = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 패턴 도트들의 위치 데이터
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

  const handleCancel = () => {
    navigate("/");
  };

  const handleConfirm = () => {
    // 비밀번호 유효성 검사
    if (password.length < 10) {
      toast.error("비밀번호는 최소 10자리 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 지갑 생성 성공
    toast.success("지갑이 성공적으로 생성되었습니다!");
    navigate("/dashboard");
  };

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

      {/* 제목 */}
      <TitleContainer>
        <Title>새 지갑 만들기</Title>
      </TitleContainer>

      {/* 비밀번호 설정 */}
      <SubtitleContainer>
        <Subtitle>비밀번호 설정</Subtitle>
      </SubtitleContainer>

      <InputContainer top={197}>
        <InputField
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <EyeIcon onClick={() => setShowPassword(!showPassword)} />
      </InputContainer>

      <HelperText>최소 10자리 이상 설정해주세요.</HelperText>

      {/* 비밀번호 확인 */}
      <SubtitleContainer style={{ top: "353px" }}>
        <Subtitle>비밀번호 확인</Subtitle>
      </SubtitleContainer>

      <InputContainer top={389}>
        <InputField
          type={showConfirmPassword ? "text" : "password"}
          placeholder="비밀번호를 다시 입력하세요"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <EyeIcon onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
      </InputContainer>

      {/* 버튼들 */}
      <ButtonContainer>
        <ActionButton onClick={handleCancel}>
          <ButtonBackground background={imgVector} />
          <ButtonText>취소</ButtonText>
        </ActionButton>

        <ActionButton onClick={handleConfirm}>
          <ButtonBackground background={imgVector1} />
          <ButtonText>확인</ButtonText>
        </ActionButton>
      </ButtonContainer>
    </WalletContainer>
  );
};

export default CreateWallet;
