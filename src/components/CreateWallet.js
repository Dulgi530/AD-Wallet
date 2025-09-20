import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";

// 이미지 상수들
const imgInvisible =
  "http://localhost:3845/assets/f2b01876f41f56e3e6a7dfd6363d3854a834f76e.png";
const imgCopy =
  "http://localhost:3845/assets/3393777d4332a546dbf96ae8d6e9001915fa07be.png";
const imgVector =
  "http://localhost:3845/assets/9c9baa69399e6e25e9d51108344555d9cd55a853.svg";
const imgVector1 =
  "http://localhost:3845/assets/894d81e3b1489d46491680c760b7b4766d1deee2.svg";

const Container = styled.div`
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 40px 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: white;
  text-align: center;
  margin: 48px 0 0 0;
  line-height: normal;
`;

const SectionTitle = styled.h2`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: white;
  text-align: left;
  margin: 0 0 10px 0;
  line-height: normal;
  align-self: flex-start;
  margin-left: 40px;
`;

const WarningText = styled.p`
  font-family: "Inter", "Noto Sans KR", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #f83f3f;
  text-align: left;
  margin: 0 0 20px 0;
  line-height: normal;
  align-self: flex-start;
  margin-left: 40px;
`;

const RecoveryPhraseContainer = styled.div`
  position: relative;
  width: 320px;
  height: 320px;
  margin: 20px 0 40px 0;
`;

const RecoveryPhraseBox = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 320px;
  height: 320px;
  background: white;
  border-radius: 5px;
  box-shadow: inset 0px 4px 4px 2px rgba(0, 0, 0, 0.25);
`;

const RecoveryPhraseText = styled.p`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 304px;
  font-family: "Mina", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: black;
  line-height: normal;
  margin: 0;
  text-align: left;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 151px;
  right: 40px;
  display: flex;
  gap: 20px;
  align-items: center;
`;

const IconButton = styled.button`
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.7;
    filter: hue-rotate(30deg) brightness(1.2);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
  max-width: 400px;
  margin-top: auto;
  margin-bottom: 40px;
`;

const ActionButton = styled.button`
  position: relative;
  width: 160px;
  height: 80px;
  border: none;
  background: none;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.02);
    filter: brightness(1.2) saturate(1.5);
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
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: white;
  text-align: center;
  margin: 0;
  z-index: 1;
`;

const CreateWallet = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const recoveryPhrase =
    "teach below wheat old together ancient hill gym peanut chuckle fossil twenty";

  const handleCopy = () => {
    navigator.clipboard.writeText(recoveryPhrase);
    toast.success("복구구문이 복사되었습니다!");
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleConfirm = () => {
    toast.success("지갑이 생성되었습니다!");
    navigate("/dashboard");
  };

  return (
    <Container>
      <PatternTop />
      <PatternBottom />

      <MainContent>
        <Title>새 지갑 만들기</Title>

        <SectionTitle>지갑 복구구문</SectionTitle>
        <WarningText>절대 본인외 타인에게 공유하지 마세요.</WarningText>

        <RecoveryPhraseContainer>
          <RecoveryPhraseBox />
          <RecoveryPhraseText>{recoveryPhrase}</RecoveryPhraseText>
        </RecoveryPhraseContainer>

        <IconContainer>
          <IconButton
            src={imgInvisible}
            onClick={() => setIsVisible(!isVisible)}
            title={isVisible ? "숨기기" : "보이기"}
          />
          <IconButton src={imgCopy} onClick={handleCopy} title="복사하기" />
        </IconContainer>

        <ActionButtons>
          <ActionButton onClick={handleCancel}>
            <ButtonBackground background={imgVector} />
            <ButtonText>취소</ButtonText>
          </ActionButton>

          <ActionButton onClick={handleConfirm}>
            <ButtonBackground background={imgVector1} />
            <ButtonText>확인</ButtonText>
          </ActionButton>
        </ActionButtons>
      </MainContent>
    </Container>
  );
};

export default CreateWallet;
