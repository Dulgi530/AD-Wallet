import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import gasSponsorService from "../services/gasSponsor";
import {
  createContainerStyle,
  createButtonStyle,
  createTextStyle,
  createIconStyle,
  createFlexStyle,
  responsiveSize,
  responsiveFontSize,
  responsiveSpacing,
} from "../utils/autoLayout";

// 이미지 상수들
const imgImage3 = "/assets/adwallet-icon.png";
const imgVerychat = "/assets/verychat.png";
const imgCounut = "/assets/counut.png";
const imgHidemeplease = "/assets/hidemeplease.png";
const imgImage10 =
  "http://localhost:3845/assets/2d1ee20636d2178512aeb74537b7833e46a0afa6.png";
const imgFruitColor41 =
  "http://localhost:3845/assets/c8595b2e9065848d6a0cd389666cc17dc0efce33.png";
const imgImage16 =
  "http://localhost:3845/assets/529e63980a976116c7aedbb27fdd866c543a6674.png";
const imgImage17 =
  "http://localhost:3845/assets/e9200eccfa0a06c5540b2d9275d76686af4859c7.png";
const imgImage2 =
  "http://localhost:3845/assets/a5afa55a89940975aa49915299cb08c7c192db96.png";
const imgCryptoMission = "/assets/cypto-mission-icon.png";
const imgPolygon1 =
  "http://localhost:3845/assets/79d8126f7474a53dbb7b8b36d203a8b1fe7a6b23.svg";
const imgFrame60 =
  "http://localhost:3845/assets/cf3ec7890e749c15a472fb2aa478a7cf34825273.svg";
const imgPolygon2 =
  "http://localhost:3845/assets/6e2f0e29011b3e9310106de77f9fdc25f1f1a9e7.svg";
const imgEllipse2 =
  "http://localhost:3845/assets/9bcc4b909b8ec2fd01adeeaf82d47b22c8e9d181.svg";
const imgEllipse4 =
  "http://localhost:3845/assets/be5a31e41c19f8e4c9bb19c23ce01d5c4f53b249.svg";
const imgLine42 =
  "http://localhost:3845/assets/2eeecc92fcde4a9c11fe718d7116c4af4338d0d9.svg";

// 네트워크 모달용 이미지들
const imgImage7 =
  "http://localhost:3845/assets/7295164430571b46b9fbb1781cd8a3e8631971eb.png";
const imgImage8 =
  "http://localhost:3845/assets/85a292aa95479e92e0d455d112b54208111c5d0d.png";
const imgImage34 =
  "http://localhost:3845/assets/f1f03a3718ff9502434cfb84bef99e9642480c43.png";
const imgImage35 =
  "http://localhost:3845/assets/2b5a811c8693185683ff45c5b34e1313562e02dd.png";
const imgVerychatSymbolGraRd1 =
  "http://localhost:3845/assets/2009fbbe52acc2646cfed4157d7ea21879b827f9.png";

const MissionContainer = styled.div`
  background: #1d1818;
  min-height: 100vh;
  position: relative;
  padding-bottom: 80px;
  box-sizing: border-box;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  padding: 20px;
  box-sizing: border-box;
`;

const NetworkSelector = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  width: 80px;
  height: 40px;
  background: #3b3b3b;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #4a4a4a;
  }
`;

const NetworkIcon = styled.div`
  position: absolute;
  left: 15px;
  width: 25px;
  height: 25px;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const NetworkDropdown = styled.div`
  position: absolute;
  left: 50px;
  top: 12px;
  width: 15px;
  height: 15px;
  background-image: url("${imgPolygon1}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: rotate(180deg);
`;

const BackButton = styled.button`
  position: absolute;
  left: 25px;
  top: 28px;
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: color 0.2s ease;
  transform: rotate(270deg);

  &:hover {
    color: #f29d38;
  }
`;

const BackIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url("/assets/arrow-left.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: rotate(90deg);
`;

const AccountInfo = styled.div`
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  box-sizing: border-box;
`;

const AccountIcon = styled.div`
  width: 15px;
  height: 15px;
  background-image: url("${imgFrame60}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 10px;
`;

const AccountName = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
  text-align: center;
  line-height: normal;
  margin-right: 8px;
`;

const AccountDropdown = styled.div`
  width: 10px;
  height: 10px;
  background-image: url("${imgPolygon1}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: rotate(180deg);
  margin-left: 5px;
`;

const AccountAddress = styled.div`
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #999999;
  text-align: center;
  line-height: normal;
`;

const TicketBalance = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 80px;
  height: 40px;
  background: #3b3b3b;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #4a4a4a;
  }
`;

const TicketIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 7.5px;
  width: 25px;
  height: 25px;
  background-image: url("${imgImage3}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const TicketCount = styled.div`
  position: absolute;
  left: 58px;
  top: 20.5px;
  transform: translateX(-50%) translateY(-50%);
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: white;
  text-align: center;
  line-height: normal;
`;

const TitleIcon = styled.div`
  position: absolute;
  left: 20px;
  top: 130px;
  width: 50px;
  height: 50px;
  background-image: url("${imgImage2}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const TitleSection = styled.div`
  position: absolute;
  left: 20px;
  top: 135px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CryptoMissionIcon = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

const TitleText = styled.div`
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: white;
  line-height: normal;
`;

const SubtitleText = styled.div`
  position: absolute;
  left: 149.5px;
  top: 200px;
  transform: translateX(-50%) translateY(-50%);
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #999999;
  text-align: center;
  line-height: normal;
`;

const BannerSection = styled.div`
  position: absolute;
  left: 20px;
  top: 218px;
  width: 372px;
  height: 100px;
`;

const BannerContainer = styled.div`
  width: 100%;
  height: ${responsiveSize(100)};
  position: relative;
  overflow: hidden;
  border-radius: ${responsiveSize(8)};
  background: #110b0b;
`;

const BannerSlider = styled.div`
  display: flex;
  width: ${(props) => props.bannerCount * 100}%;
  height: 100%;
  transition: transform 0.5s ease;
  transform: translateX(
    ${(props) => -props.currentSlide * (100 / props.bannerCount)}%
  );
`;

const BannerImage = styled.div`
  width: ${(props) => 100 / props.bannerCount}%;
  height: 100%;
  background-image: url("${(props) => props.image}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const DotContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 323px;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => (props.active ? "white" : "transparent")};
  border: 1px solid ${(props) => (props.active ? "white" : "#999999")};
`;

const MissionList = styled.div`
  position: absolute;
  left: 50%;
  top: 343px;
  transform: translateX(-50%);
  width: 412px;
  margin-top: 10px;
`;

const MissionItem = styled.div`
  position: relative;
  height: 60px;
  width: 100%;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const MissionIcon = styled.div`
  position: absolute;
  left: 20px;
  top: 17.5px;
  width: 25px;
  height: 25px;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const MissionTitle = styled.div`
  position: absolute;
  left: 50px;
  top: 30px;
  transform: translateY(-50%);
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
  text-align: left;
  line-height: normal;
`;

const MissionReward = styled.div`
  position: absolute;
  right: 20px;
  top: 30px;
  transform: translateY(-50%);
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #f29d38;
  text-align: right;
  line-height: normal;
`;

const MissionLine = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 372px;
  height: 1px;
  background-image: url("${imgLine42}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const CryptoMission = () => {
  const navigate = useNavigate();
  const [ticketBalance, setTicketBalance] = useState(10);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 배너 데이터
  const banners = [
    { id: 1, image: "/assets/banner.png", title: "Banner 1" },
    { id: 2, image: "/assets/banner2.png", title: "Banner 2" },
    { id: 3, image: "/assets/banner3.png", title: "Banner 3" },
  ];

  useEffect(() => {
    initializeMission();
  }, []);

  // 자동 슬라이드 기능
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000); // 3초마다 자동 슬라이드

    return () => clearInterval(interval);
  }, [banners.length]);

  const initializeMission = async () => {
    try {
      const balance = await gasSponsorService.getTicketBalance();
      setTicketBalance(balance);
    } catch (error) {
      console.error("크립토 미션 초기화 실패:", error);
    }
  };

  const handleMissionClick = (missionName) => {
    toast.success(`${missionName} 미션을 시작합니다!`);
    // 실제 구현에서는 해당 서비스로 이동
  };

  const handleBannerClick = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const handleTicketClick = () => {
    navigate("/ad-ticket");
  };

  const missions = [
    {
      id: 1,
      icon: imgVerychat,
      title: "VeryChat 가입하기",
      reward: "AD TICKET 10장 지급",
    },
    {
      id: 2,
      icon: imgCounut,
      title: "코넛 가입하기",
      reward: "AD TICKET 10장 지급",
    },
    {
      id: 3,
      icon: imgHidemeplease,
      title: "하이드미플리즈 가입하기",
      reward: "AD TICKET 10장 지급",
    },
  ];

  return (
    <MissionContainer>
      <Header>
        <BackButton onClick={() => navigate("/ad-ticket")}>
          <BackIcon />
        </BackButton>

        <AccountInfo>
          <AccountIcon />
          <AccountName>Account 1</AccountName>
          <AccountDropdown />
          <AccountAddress>0xcEDBf...4926F</AccountAddress>
        </AccountInfo>

        <TicketBalance onClick={handleTicketClick}>
          <TicketIcon />
          <TicketCount>{ticketBalance}</TicketCount>
        </TicketBalance>
      </Header>

      <TitleIcon />
      <TitleSection>
        <CryptoMissionIcon src={imgCryptoMission} />
        <TitleText>크립토 미션</TitleText>
      </TitleSection>
      <SubtitleText>다양한 Web3을 즐기며 리워드를 받아요!</SubtitleText>

      <BannerSection>
        <BannerContainer onClick={handleBannerClick}>
          <BannerSlider
            currentSlide={currentSlide}
            bannerCount={banners.length}
          >
            {banners.map((banner) => (
              <BannerImage
                key={banner.id}
                image={banner.image}
                bannerCount={banners.length}
              />
            ))}
          </BannerSlider>
        </BannerContainer>
      </BannerSection>

      <MissionList>
        {missions.map((mission, index) => (
          <MissionItem
            key={mission.id}
            onClick={() => handleMissionClick(mission.title)}
          >
            <MissionIcon src={mission.icon} />
            <MissionTitle>{mission.title}</MissionTitle>
            <MissionReward>{mission.reward}</MissionReward>
            {index < missions.length - 1 && <MissionLine />}
          </MissionItem>
        ))}
      </MissionList>
    </MissionContainer>
  );
};

export default CryptoMission;
