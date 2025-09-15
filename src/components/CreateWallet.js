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
  position: relative;
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

const Title = styled.h1`
  ${createTextStyle(24)}
  color: white;
  text-align: center;
  margin: 0 0 ${responsiveSpacing(40)} 0;
  font-weight: 700;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: ${responsiveSize(350)};
  ${createFlexStyle('column', 'center', 'center', 20)}
`;

const InputGroup = styled.div`
  width: 100%;
  ${createFlexStyle('column', 'flex-start', 'flex-start', 8)}
`;

const Label = styled.label`
  ${createTextStyle(14)}
  color: white;
  font-weight: 600;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: ${responsiveSize(50)};
  background: #2a2a2a;
  border: 1px solid #3b3b3b;
  border-radius: ${responsiveSize(8)};
  padding: 0 ${responsiveSpacing(15)};
  ${createTextStyle(16)}
  color: white;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #f29d38;
  }
  
  &::placeholder {
    color: #666;
  }
`;

const EyeButton = styled.button`
  position: absolute;
  right: ${responsiveSpacing(15)};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: ${responsiveSpacing(5)};
  
  &:hover {
    color: white;
  }
`;

const ButtonContainer = styled.div`
  ${createFlexStyle('row', 'center', 'center', 20)}
  width: 100%;
  margin-top: ${responsiveSpacing(20)};
`;

const ActionButton = styled.button`
  position: relative;
  width: ${responsiveSize(160)};
  height: ${responsiveSize(80)};
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
  flex: 1;
  
  &:hover {
    transform: scale(1.02);
  }
  
  &:active {
    transform: scale(0.98);
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
`;

const CreateWallet = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    if (!password) {
      toast.error("비밀번호를 입력해주세요.");
      return false;
    }
    
    if (password.length < 8) {
      toast.error("비밀번호는 8자 이상이어야 합니다.");
      return false;
    }
    
    if (password !== confirmPassword) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return false;
    }
    
    return true;
  };

  const handleCreateWallet = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    toast.success("지갑을 생성하는 중...");
    
    // 지갑 생성 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      toast.success("지갑이 성공적으로 생성되었습니다!");
      navigate("/dashboard");
    }, 2000);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <WalletContainer>
      <PatternTop />
      <PatternBottom />
      
      <MainContent>
        <Title>새 지갑 만들기</Title>
        
        <FormContainer>
          <InputGroup>
            <Label>비밀번호</Label>
            <InputContainer>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={handlePasswordChange}
              />
              <EyeButton onClick={togglePasswordVisibility}>
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </EyeButton>
            </InputContainer>
          </InputGroup>
          
          <InputGroup>
            <Label>비밀번호 확인</Label>
            <InputContainer>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="비밀번호를 다시 입력하세요"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <EyeButton onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </EyeButton>
            </InputContainer>
          </InputGroup>
          
          <ButtonContainer>
            <ActionButton onClick={handleCancel} disabled={isLoading}>
              <ButtonBackground background={imgVector} />
              <ButtonText>취소</ButtonText>
            </ActionButton>
            
            <ActionButton onClick={handleCreateWallet} disabled={isLoading}>
              <ButtonBackground background={imgVector1} />
              <ButtonText>{isLoading ? "생성 중..." : "지갑 생성"}</ButtonText>
            </ActionButton>
          </ButtonContainer>
        </FormContainer>
      </MainContent>
    </WalletContainer>
  );
};

export default CreateWallet;