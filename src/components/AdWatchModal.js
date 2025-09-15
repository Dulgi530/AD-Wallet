import React from "react";
import styled from "styled-components";
import { 
  createButtonStyle, 
  createTextStyle, 
  createIconStyle,
  createFlexStyle,
  responsiveSize,
  responsiveFontSize,
  responsiveSpacing
} from "../utils/autoLayout";

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
  width: ${responsiveSize(360)};
  height: ${responsiveSize(720)};
  position: relative;
  overflow: hidden;
  border-radius: ${responsiveSize(10)};
  max-width: 90vw;
  max-height: 90vh;
`;

const ModalHeader = styled.div`
  position: relative;
  padding: ${responsiveSpacing(35)} ${responsiveSpacing(20)} ${responsiveSpacing(20)};
  ${createFlexStyle('row', 'center', 'center', 0)}
  width: 100%;
  box-sizing: border-box;
`;

const ModalTitle = styled.h2`
  ${createTextStyle(20)}
  color: white;
  text-align: center;
  margin: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  right: ${responsiveSpacing(20)};
  top: ${responsiveSpacing(20)};
  background: none;
  border: none;
  color: white;
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: ${responsiveFontSize(14)};
  cursor: pointer;
  width: ${responsiveSize(20)};
  height: ${responsiveSize(20)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GuideSection = styled.div`
  padding: ${responsiveSpacing(20)};
  ${createFlexStyle('column', 'center', 'center', 0)}
  justify-content: center;
`;

const GuideTitle = styled.h3`
  ${createTextStyle(20)}
  color: white;
  margin: 0 0 ${responsiveSpacing(20)} 0;
  text-align: center;
`;

const GuideText = styled.div`
  ${createTextStyle(12)}
  color: white;
  line-height: 1.4;
  text-align: left;
  
  .highlight {
    color: #f29d38;
  }
  
  .small {
    font-size: ${responsiveFontSize(10)};
  }
`;

const ProductImages = styled.div`
  padding: ${responsiveSpacing(20)};
  ${createFlexStyle('row', 'space-between', 'center', 10)}
`;

const ProductImage = styled.div`
  width: ${responsiveSize(100)};
  height: ${responsiveSize(132)};
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  flex: 1;
`;

const ButtonContainer = styled.div`
  padding: ${responsiveSpacing(20)};
  ${createFlexStyle('row', 'space-between', 'center', 20)}
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

const AdWatchModal = ({ isOpen, onClose, onWatchAd }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* 헤더 */}
        <ModalHeader>
          <ModalTitle>광고 시청하기</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        {/* 가이드 섹션 */}
        <GuideSection>
          <GuideTitle>참여 가이드</GuideTitle>
          <GuideText>
            광고를 시청하시면 <span className="highlight">AD TICKET 1개</span>를 지급해드립니다.
            <br /><br />
            광고 시청 시 주의사항:
            <br />
            • 광고를 끝까지 시청해야 리워드가 지급됩니다
            <br />
            • 일일 최대 5회까지 시청 가능합니다
            <br />
            • 광고 시청 중에는 다른 작업을 하지 마세요
            <br /><br />
            <span className="small">
              광고 시청 후 자동으로 AD TICKET이 지급됩니다.
            </span>
          </GuideText>
        </GuideSection>

        {/* 상품 이미지들 */}
        <ProductImages>
          <ProductImage src={imgImage13} />
          <ProductImage src={imgImage15} />
          <ProductImage src={imgImage14} />
        </ProductImages>

        {/* 버튼들 */}
        <ButtonContainer>
          <ActionButton onClick={onClose}>
            <ButtonBackground background={imgVector} />
            <ButtonText>취소</ButtonText>
          </ActionButton>

          <ActionButton onClick={onWatchAd}>
            <ButtonBackground background={imgVector1} />
            <ButtonText>광고 시청하기</ButtonText>
          </ActionButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AdWatchModal;
