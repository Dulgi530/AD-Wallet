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
`;

const ModalHeader = styled.div`
  position: absolute;
  top: 35px;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ModalTitle = styled.h2`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: white;
  text-align: center;
  margin: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 24.5px;
  top: 31px;
  transform: translateY(-50%);
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
`;

const PatternTop = styled.div`
  position: absolute;
  left: -26px;
  top: calc(50% - 354.5px);
  transform: translateY(-50%);
  display: contents;
`;

const PatternBottom = styled.div`
  position: absolute;
  left: -26px;
  top: calc(50% + 354.5px);
  transform: translateY(-50%);
  display: contents;
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

const GuideSection = styled.div`
  position: absolute;
  top: 213px;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 320px;
  height: 204px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GuideTitle = styled.h3`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: white;
  margin: 0 0 20px 0;
  text-align: center;
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
`;

const ProductImages = styled.div`
  position: absolute;
  top: 365px;
  left: 5px;
  right: 5px;
  height: 132px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductImage = styled.div`
  width: 100px;
  height: 132px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 600px;
  left: 10px;
  right: 10px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
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

const AdModal = ({ isOpen, onClose, onParticipate }) => {
  if (!isOpen) return null;

  // 패턴 도트들의 위치 데이터
  const patternDots = [
    { left: -6, top: "calc(50% - 354.5px)" },
    { left: -17, top: "calc(50% - 354.5px)" },
    { left: -26, top: "calc(50% - 354.5px)", width: "4px" },
    { left: 82, top: "calc(50% - 354.5px)" },
    { left: 170, top: "calc(50% - 354.5px)" },
    { left: 258, top: "calc(50% - 354.5px)" },
    { left: 38, top: "calc(50% - 354.5px)" },
    { left: 126, top: "calc(50% - 354.5px)" },
    { left: 214, top: "calc(50% - 354.5px)" },
    { left: 302, top: "calc(50% - 354.5px)" },
    { left: 4, top: "calc(50% - 354.5px)" },
    { left: 104, top: "calc(50% - 354.5px)" },
    { left: 48, top: "calc(50% - 354.5px)" },
    { left: 280, top: "calc(50% - 354.5px)" },
    { left: 60, top: "calc(50% - 354.5px)" },
    { left: 148, top: "calc(50% - 354.5px)" },
    { left: 236, top: "calc(50% - 354.5px)" },
    { left: 324, top: "calc(50% - 354.5px)" },
    { left: 357, top: "calc(50% - 354.5px)" },
    { left: 5, top: "calc(50% - 354.5px)" },
    { left: 93, top: "calc(50% - 354.5px)" },
    { left: 181, top: "calc(50% - 354.5px)" },
    { left: 269, top: "calc(50% - 354.5px)" },
    { left: 49, top: "calc(50% - 354.5px)" },
    { left: 137, top: "calc(50% - 354.5px)" },
    { left: 225, top: "calc(50% - 354.5px)" },
    { left: 313, top: "calc(50% - 354.5px)" },
    { left: 346, top: "calc(50% - 354.5px)" },
    { left: 27, top: "calc(50% - 354.5px)" },
    { left: 115, top: "calc(50% - 354.5px)" },
    { left: 203, top: "calc(50% - 354.5px)" },
    { left: 291, top: "calc(50% - 354.5px)" },
    { left: 71, top: "calc(50% - 354.5px)" },
    { left: 159, top: "calc(50% - 354.5px)" },
    { left: 247, top: "calc(50% - 354.5px)" },
    { left: 335, top: "calc(50% - 354.5px)" },
    { left: 368, top: "calc(50% - 354.5px)" },
    { left: 379, top: "calc(50% - 354.5px)" },
  ];

  const bottomPatternDots = patternDots.map((dot) => ({
    ...dot,
    top: "calc(50% + 354.5px)",
  }));

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* 패턴 도트들 */}
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
