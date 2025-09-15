import React, { useState, useEffect } from "react";
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
const imgImage10 = "http://localhost:3845/assets/2d1ee20636d2178512aeb74537b7833e46a0afa6.png";
const imgFruitColor41 = "http://localhost:3845/assets/c8595b2e9065848d6a0cd389666cc17dc0efce33.png";
const imgImage16 = "http://localhost:3845/assets/529e63980a976116c7aedbb27fdd866c543a6674.png";
const imgImage17 = "http://localhost:3845/assets/e9200eccfa0a06c5540b2d9275d76686af4859c7.png";
const imgImage2 = "http://localhost:3845/assets/a5afa55a89940975aa49915299cb08c7c192db96.png";
const imgPolygon1 = "http://localhost:3845/assets/79d8126f7474a53dbb7b8b36d203a8b1fe7a6b23.svg";
const imgFrame60 = "http://localhost:3845/assets/cf3ec7890e749c15a472fb2aa478a7cf34825273.svg";
const imgPolygon2 = "http://localhost:3845/assets/6e2f0e29011b3e9310106de77f9fdc25f1f1a9e7.svg";
const imgEllipse2 = "http://localhost:3845/assets/9bcc4b909b8ec2fd01adeeaf82d47b22c8e9d181.svg";
const imgEllipse4 = "http://localhost:3845/assets/be5a31e41c19f8e4c9bb19c23ce01d5c4f53b249.svg";
const imgLine42 = "http://localhost:3845/assets/2eeecc92fcde4a9c11fe718d7116c4af4338d0d9.svg";

const MissionContainer = styled.div`
  ${createContainerStyle()}
  position: relative;
`;

const Header = styled.div`
  ${createFlexStyle('row', 'space-between', 'center', 0)}
  padding: ${responsiveSpacing(20)};
  width: 100%;
  box-sizing: border-box;
`;

const BackButton = styled.button`
  width: ${responsiveSize(25)};
  height: ${responsiveSize(25)};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(270deg);
`;

const BackIcon = styled.div`
  width: ${responsiveSize(25)};
  height: ${responsiveSize(25)};
  background-image: url("${imgPolygon2}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const AccountInfo = styled.div`
  ${createFlexStyle('column', 'center', 'center', 0)}
  flex: 1;
  position: relative;
`;

const AccountIcon = styled.div`
  position: absolute;
  left: ${responsiveSpacing(-40)};
  top: ${responsiveSpacing(2)};
  width: ${responsiveSize(15)};
  height: ${responsiveSize(15)};
  background-image: url("${imgFrame60}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const AccountName = styled.div`
  ${createTextStyle(14)}
  color: white;
  text-align: center;
`;

const AccountAddress = styled.div`
  ${createTextStyle(12)}
  color: #999999;
  text-align: center;
`;

const TicketBalance = styled.div`
  ${createFlexStyle('row', 'center', 'center', 10)}
  background: #3b3b3b;
  border-radius: ${responsiveSize(25)};
  padding: ${responsiveSpacing(8)} ${responsiveSpacing(16)};
  height: ${responsiveSize(40)};
`;

const TicketIcon = styled.div`
  width: ${responsiveSize(25)};
  height: ${responsiveSize(25)};
  background-image: url("${imgImage3}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const TicketCount = styled.div`
  ${createTextStyle(16)}
  color: white;
`;

const Title = styled.h1`
  ${createTextStyle(32)}
  color: white;
  text-align: center;
  margin: ${responsiveSpacing(20)} 0;
  font-weight: 700;
`;

const Subtitle = styled.p`
  ${createTextStyle(16)}
  color: #999999;
  text-align: center;
  margin: 0 0 ${responsiveSpacing(20)} 0;
`;

const BannerSection = styled.div`
  position: relative;
  width: 100%;
  height: ${responsiveSize(100)};
  background: #110b0b;
  margin: ${responsiveSpacing(20)} 0;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 20px rgba(242, 157, 56, 0.3);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const BannerImage = styled.div`
  position: absolute;
  left: ${responsiveSpacing(85)};
  top: 0;
  width: ${responsiveSize(201)};
  height: ${responsiveSize(100)};
  background-image: url("${imgImage10}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const NavigationDots = styled.div`
  ${createFlexStyle('row', 'center', 'center', 5)}
  margin: ${responsiveSpacing(20)} 0;
`;

const Dot = styled.div`
  width: ${responsiveSize(10)};
  height: ${responsiveSize(10)};
  border-radius: 50%;
  background: ${(props) => (props.active ? "#f29d38" : "#5f5f5f")};
`;

const MissionList = styled.div`
  width: 100%;
  padding: 0 ${responsiveSpacing(20)};
`;

const MissionItem = styled.div`
  position: relative;
  width: 100%;
  height: ${responsiveSize(60)};
  margin-bottom: ${responsiveSpacing(20)};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
    
    ${MissionTitle} {
      color: #f29d38;
    }
    
    ${MissionReward} {
      color: #f29d38;
    }
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const MissionIcon = styled.div`
  position: absolute;
  left: ${responsiveSpacing(20)};
  top: 50%;
  transform: translateY(-50%);
  width: ${responsiveSize(25)};
  height: ${responsiveSize(25)};
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const MissionTitle = styled.div`
  position: absolute;
  left: ${responsiveSpacing(60)};
  top: 50%;
  transform: translateY(-50%);
  ${createTextStyle(14)}
  color: white;
  text-align: center;
`;

const MissionReward = styled.div`
  position: absolute;
  right: ${responsiveSpacing(20)};
  top: 50%;
  transform: translateY(-50%);
  ${createTextStyle(12)}
  color: white;
  text-align: right;
  
  .highlight {
    color: #f29d38;
  }
`;

const MissionDivider = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: ${responsiveSize(372)};
  height: 1px;
  background-image: url("${imgLine42}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const CryptoMission = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const missions = [
    {
      id: 1,
      title: "VeryChat 가입하기",
      icon: imgFruitColor41,
      reward: "AD TICKET 10장 지급"
    },
    {
      id: 2,
      title: "코넛 가입하기",
      icon: imgImage16,
      reward: "AD TICKET 10장 지급"
    },
    {
      id: 3,
      title: "하이드미플리즈 가입하기",
      icon: imgImage17,
      reward: "AD TICKET 10장 지급"
    }
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleMissionClick = (mission) => {
    toast.success(`${mission.title} 미션을 시작합니다!`);
    // 실제 미션 로직 구현
  };

  const handleBannerClick = () => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  };

  return (
    <MissionContainer>
      <Header>
        <BackButton onClick={handleBack}>
          <BackIcon />
        </BackButton>
        
        <AccountInfo>
          <AccountIcon />
          <AccountName>Account 1</AccountName>
          <AccountAddress>0xcEDBf...4926F</AccountAddress>
        </AccountInfo>
        
        <TicketBalance>
          <TicketIcon />
          <TicketCount>19</TicketCount>
        </TicketBalance>
      </Header>

      <Title>크립토 미션</Title>
      <Subtitle>다양한 Web3을 즐기며 리워드를 받아요 !</Subtitle>

      <BannerSection onClick={handleBannerClick}>
        <BannerImage />
      </BannerSection>

      <NavigationDots>
        {[0, 1, 2].map((index) => (
          <Dot key={index} active={index === currentSlide} />
        ))}
      </NavigationDots>

      <MissionList>
        {missions.map((mission, index) => (
          <MissionItem key={mission.id} onClick={() => handleMissionClick(mission)}>
            <MissionIcon src={mission.icon} />
            <MissionTitle>{mission.title}</MissionTitle>
            <MissionReward>
              <span className="highlight">AD TICKET</span> 10장 지급
            </MissionReward>
            {index < missions.length - 1 && <MissionDivider />}
          </MissionItem>
        ))}
      </MissionList>
    </MissionContainer>
  );
};

export default CryptoMission;