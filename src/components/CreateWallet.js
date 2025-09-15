import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
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
const imgInvisible = "http://localhost:3845/assets/f2b01876f41f56e3e6a7dfd6363d3854a834f76e.png";
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
  padding: ${responsiveSpacing(60)} ${responsiveSpacing(40)};
  gap: ${responsiveSpacing(40)};
`;

const Title = styled.h1`
  ${createTextStyle(24)}
  color: white;
  text-align: center;
  margin: 0 0 ${responsiveSpacing(40)} 0;
  font-weight: 700;
`;

const FormSection = styled.div`
  width: 100%;
  max-width: ${responsiveSize(320)};
  display: flex;
  flex-direction: column;
  gap: ${responsiveSpacing(30)};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${responsiveSpacing(15)};
`;

const Label = styled.label`
  ${createTextStyle(20)}
  color: white;
  text-align: left;
  font-weight: 700;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const InputField = styled.input`
  background: white;
  border-radius: ${responsiveSize(5)};
  width: 100%;
  height: ${responsiveSize(40)};
  padding: 0 ${responsiveSpacing(15)};
  font-family: "Inter", sans-serif;
  font-size: ${responsiveFontSize(16)};
  color: #333;
  border: none;
  box-shadow: 0px 4px 4px 2px inset rgba(0, 0, 0, 0.25);
  outline: none;
  
  &:focus {
    border: 2px solid #f29d38;
  }
  
  &::placeholder {
    color: #999;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: ${responsiveSpacing(10)};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #5f5f5f;
  cursor: pointer;
  font-size: ${responsiveFontSize(18)};
  z-index: 2;
`;

const InfoText = styled.p`
  ${createTextStyle(14)}
  color: white;
  text-align: left;
  margin: 0;
  line-height: 1.4;
`;

const ButtonContainer = styled.div`
  ${createFlexStyle('row', 'space-between', 'center', 20)}
  width: 100%;
  margin-top: ${responsiveSpacing(40)};
  
  @media (max-width: 480px) {
    gap: ${responsiveSpacing(15)};
  }
`;

const ActionButton = styled.button`
  position: relative;
  width: ${responsiveSize(160)};
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
    width: ${responsiveSize(140)};
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
  ${createTextStyle(20)}
  color: white;
  text-align: center;
  margin: 0;
  z-index: 1;
  font-weight: 700;
`;

const CreateWallet = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCreate = () => {
    if (password.length < 10) {
      toast.error("비밀번호는 최소 10자리 이상이어야 합니다.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }
    toast.success("지갑이 성공적으로 생성되었습니다!");
    navigate("/dashboard");
  };

  const handleCancel = () => {
    navigate("/");
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
        <Title>새 지갑 만들기</Title>

        <FormSection>
          <InputGroup>
            <Label>비밀번호 설정</Label>
            <InputContainer>
              <InputField
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
              />
              <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </PasswordToggle>
            </InputContainer>
            <InfoText>최소 10자리 이상 설정해주세요.</InfoText>
          </InputGroup>

          <InputGroup>
            <Label>비밀번호 확인</Label>
            <InputContainer>
              <InputField
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호를 다시 입력해주세요"
              />
              <PasswordToggle onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </PasswordToggle>
            </InputContainer>
          </InputGroup>
        </FormSection>

        <ButtonContainer>
          <ActionButton onClick={handleCancel}>
            <ButtonBackground background={imgVector} />
            <ButtonText>취소</ButtonText>
          </ActionButton>

          <ActionButton onClick={handleCreate}>
            <ButtonBackground background={imgVector1} />
            <ButtonText>확인</ButtonText>
          </ActionButton>
        </ButtonContainer>
      </MainContent>
    </WalletContainer>
  );
};

export default CreateWallet;