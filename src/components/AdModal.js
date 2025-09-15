import React from "react";
import styled from "styled-components";

// 이미지 상수들
const imgImage13 = "http://localhost:3845/assets/be343195380dc59173a7e6f5d079e3293897537b.png";
const imgImage15 = "http://localhost:3845/assets/2f70d669546887a9a560ffc9805b9c509a0e60d7.png";
const imgImage14 = "http://localhost:3845/assets/d2b4779e321ee13b8d564efdeb99999e0a5adf74.png";
const imgVector = "http://localhost:3845/assets/9c9baa69399e6e25e9d51108344555d9cd55a853.svg";
const imgVector1 = "http://localhost:3845/assets/894d81e3b1489d46491680c760b7b4766d1deee2.svg";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background: #1d1818;
  width: 360px;
  height: 720px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  max-width: 90vw;
  max-height: 90vh;
  
  @media (max-width: 480px) {
    width: 320px;
    height: 640px;
    max-width: 95vw;
    max-height: 95vh;
  }
  
  @media (max-width: 360px) {
    width: 300px;
    height: 600px;
  }
`;

const ModalHeader = styled.div`
  position: relative;
  padding: 35px 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 480px) {
    padding: 25px 15px 15px;
  }
`;

const ModalTitle = styled.h2`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: white;
  text-align: center;
  margin: 0;
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  background: none;
  border: none;
  color: white;
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 480px) {
    right: 15px;
    top: 15px;
    font-size: 12px;
    width: 18px;
    height: 18px;
  }
`;


const GuideSection = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const GuideTitle = styled.h3`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: white;
  margin: 0 0 20px 0;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 18px;
    margin: 0 0 15px 0;
  }
`;

const GuideText = styled.div`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: white;
  line-height: 1.4;
  text-align: left;
  
  .highlight {
    color: #f29d38;
  }
  
  .small {
    font-size: 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 11px;
    
    .small {
      font-size: 9px;
    }
  }
`;

const ProductImages = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  
  @media (max-width: 480px) {
    padding: 15px;
    gap: 8px;
  }
`;

const ProductImage = styled.div`
  width: 100px;
  height: 132px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  flex: 1;
  
  @media (max-width: 480px) {
    width: 80px;
    height: 110px;
  }
  
  @media (max-width: 360px) {
    width: 70px;
    height: 100px;
  }
`;

const ButtonContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  
  @media (max-width: 480px) {
    padding: 15px;
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
  flex: 1;
  
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
  
  @media (max-width: 360px) {
    width: 120px;
    height: 60px;
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
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
  
  @media (max-width: 360px) {
    font-size: 14px;
  }
`;

const AdModal = ({ isOpen, onClose, onParticipate }) => {
  if (!isOpen) return null;


  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>

        {/* 헤더 */}
        <ModalHeader>
          <ModalTitle>쿠팡 제휴</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        {/* 참여 가이드 */}
        <GuideSection>
          <GuideTitle>참여 가이드</GuideTitle>
          <GuideText>
            쿠팡 홈페이지 접속 후 결제 시에만 리워드가 지급됩니다.
            <br />
            타 사이트나 플랫폼의(네이*쇼핑검색, 인스타**, 유튜* 등) 쿠팡 광고 배너, 특정상품 배너 클릭과 애드벌룬을 클릭을 병행하여 구매 시 리워드가 적립되지 않습니다.
            <br />
            <br />
            1. 3,333원 결제당 <span className="highlight">AD TICKET</span> 1개가 지급 됩니다.
            <br />
            (단, 배송비는 제외)
            <br />
            <span className="small">
              예1) 11,000원 결제 시 애드벌룬 3개 후원
              <br />
              예2) 14,000원 결제 시 애드벌룬 4개 후원
            </span>
          </GuideText>
        </GuideSection>

        {/* 상품 이미지들 */}
        <ProductImages>
          <ProductImage src={imgImage13} />
          <ProductImage src={imgImage15} />
          <ProductImage src={imgImage14} />
        </ProductImages>

        {/* 하단 버튼들 */}
        <ButtonContainer>
          <ActionButton onClick={onClose}>
            <ButtonBackground background={imgVector} />
            <ButtonText>취소</ButtonText>
          </ActionButton>

          <ActionButton onClick={onParticipate}>
            <ButtonBackground background={imgVector1} />
            <ButtonText>참여하기</ButtonText>
          </ActionButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AdModal;
