import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import gasSponsorService from "../services/gasSponsor";
import AdModal from "./AdModal";
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
const imgImage10 =
  "http://localhost:3845/assets/2d1ee20636d2178512aeb74537b7833e46a0afa6.png";
const img11 = "/assets/coupang-icon.png";
const imgImage2 = "/assets/cypto-mission-icon.png";
const imgImage12 = "/assets/invate-icon.png";
const imgPolygon1 =
  "http://localhost:3845/assets/79d8126f7474a53dbb7b8b36d203a8b1fe7a6b23.svg";
const imgFrame61 =
  "http://localhost:3845/assets/cf3ec7890e749c15a472fb2aa478a7cf34825273.svg";
const imgPolygon2 =
  "http://localhost:3845/assets/53fbb2746b1d4ea19636c18d0b9ef4e79652148f.svg";
const imgEllipse2 =
  "http://localhost:3845/assets/9bcc4b909b8ec2fd01adeeaf82d47b22c8e9d181.svg";
const imgEllipse4 =
  "http://localhost:3845/assets/be5a31e41c19f8e4c9bb19c23ce01d5c4f53b249.svg";
const imgLine42 =
  "http://localhost:3845/assets/2eeecc92fcde4a9c11fe718d7116c4af4338d0d9.svg";

const DashboardContainer = styled.div`
  ${createContainerStyle()}
  position: relative;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  padding: 20px;
  box-sizing: border-box;
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
  background-image: url("${imgFrame61}");
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

const MainTicketSection = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  margin-top: 60px;
  padding: 0 20px;
`;

const MainTicketIcon = styled.div`
  position: absolute;
  left: 20px;
  top: 0;
  width: 50px;
  height: 50px;
  background-image: url("${imgImage3}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const MainTicketAmount = styled.div`
  position: absolute;
  left: 85px;
  top: 0;
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: white;
  line-height: normal;
`;

const MainTicketDescription = styled.div`
  position: absolute;
  left: 127.5px;
  top: 53.5px;
  transform: translateX(-50%) translateY(-50%);
  font-family: "Mina", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #999999;
  text-align: center;
  line-height: normal;
`;

const BannerSection = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  margin-top: 5px;
  padding: 0 20px;
`;

const BannerContainer = styled.div`
  width: 100%;
  height: ${responsiveSize(100)};
  position: relative;
  overflow: hidden;
  border-radius: ${responsiveSize(8)};
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
  top: 105px;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => (props.active ? "white" : "transparent")};
  border: 1px solid ${(props) => (props.active ? "white" : "#999999")};
`;

const RewardList = styled.div`
  width: 100%;
  padding: 0 ${responsiveSpacing(20)};
  margin-top: ${responsiveSpacing(20)};
`;

const RewardItem = styled.div`
  ${createFlexStyle("row", "space-between", "center", 15)}
  height: ${responsiveSize(70)};
  width: 100%;
  padding: ${responsiveSpacing(15)} 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const RewardIcon = styled.div`
  width: ${responsiveSize(25)};
  height: ${responsiveSize(25)};
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0;
`;

const RewardContent = styled.div`
  ${createFlexStyle("column", "flex-start", "flex-start", 5)}
  flex: 1;
  min-width: 0;
`;

const RewardTitle = styled.div`
  ${createTextStyle(14)}
  color: white;
  font-weight: 600;
`;

const RewardInfo = styled.div`
  ${createTextStyle(12)}
  color: #999999;
  line-height: 1.3;
  white-space: pre-line;
`;

const RewardStatus = styled.div`
  ${createTextStyle(12)}
  color: white;
  text-align: right;
  flex-shrink: 0;
`;

const ADTicketDashboard = () => {
  const navigate = useNavigate();
  const [ticketBalance, setTicketBalance] = useState(10);
  const [isWatchingAd, setIsWatchingAd] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(5);
  const [currentUsage, setCurrentUsage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 배너 데이터
  const banners = [
    { id: 1, image: "/assets/banner.png", title: "Banner 1" },
    { id: 2, image: "/assets/banner2.png", title: "Banner 2" },
    { id: 3, image: "/assets/banner3.png", title: "Banner 3" },
  ];

  useEffect(() => {
    initializeDashboard();
  }, []);

  // 자동 슬라이드 기능
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000); // 3초마다 자동 슬라이드

    return () => clearInterval(interval);
  }, [banners.length]);

  const initializeDashboard = async () => {
    try {
      const balance = await gasSponsorService.getTicketBalance();
      setTicketBalance(balance);
      setCurrentUsage(0); // 임시
    } catch (error) {
      console.error("AD Ticket 대시보드 초기화 실패:", error);
    }
  };

  // Figma 디자인에 맞는 네트워크 데이터

  const handleTicketClick = () => {
    navigate("/ad-ticket");
  };

  const handleBannerClick = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const handleWatchAd = async () => {
    if (currentUsage >= dailyLimit) {
      toast.error("오늘 시청 가능한 광고 횟수를 모두 소진했습니다.", {
        duration: 3000,
      });
      return;
    }

    // 바로 광고 시청 시작
    setIsWatchingAd(true);
    toast.success("광고 시청 중... (3초)", { duration: 3000 });

    // Simulate ad watching
    setTimeout(async () => {
      const reward = 1; // Each ad gives 1 ticket
      const newBalance = await gasSponsorService.updateTicketBalance(reward);
      setTicketBalance(newBalance);
      setCurrentUsage((prev) => prev + 1);
      setIsWatchingAd(false);
      toast.success(`+${reward} 티켓을 획득했습니다!`, { duration: 3000 });
    }, 3000);
  };

  const handleCryptoMission = () => {
    navigate("/crypto-mission");
  };

  const handleCoupang = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleParticipate = () => {
    toast.success("쿠팡 제휴에 참여합니다!", { duration: 3000 });
    setIsModalOpen(false);
  };

  const handleInviteFriends = () => {
    toast.info("친구초대 기능은 준비 중입니다.", { duration: 3000 });
  };

  const rewards = [
    {
      id: 1,
      icon: imgImage3,
      title: "광고 시청하기 + 1",
      info: "일일 제한 횟수 5회",
      status: `${currentUsage}/${dailyLimit}`,
      onClick: handleWatchAd,
      disabled: currentUsage >= dailyLimit || isWatchingAd,
    },
    {
      id: 2,
      icon: imgImage2,
      title: "크립토 미션",
      info: "다양한 Web3 미션을 통한 리워드",
      onClick: handleCryptoMission,
    },
    {
      id: 3,
      icon: img11,
      title: "쿠팡 제휴",
      info: "3,333원 결제당 AD Ticket 지급\n※ 구매 취소 시, AD 취소",
      onClick: handleCoupang,
    },
    {
      id: 4,
      icon: imgImage12,
      title: "친구초대",
      info: "초대코드로 친구를 초대 리워드",
      onClick: handleInviteFriends,
    },
  ];

  return (
    <DashboardContainer>
      <Header>
        <BackButton onClick={() => navigate("/dashboard")}>
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

      <MainTicketSection>
        <MainTicketIcon />
        <MainTicketAmount>{ticketBalance}</MainTicketAmount>
        <MainTicketDescription>
          가스비를 결제해주는 AD Ticket
        </MainTicketDescription>
      </MainTicketSection>

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
        <DotContainer>
          {banners.map((_, index) => (
            <Dot key={index} active={index === currentSlide} />
          ))}
        </DotContainer>
      </BannerSection>

      <RewardList>
        {rewards.map((reward) => (
          <RewardItem
            key={reward.id}
            onClick={reward.onClick}
            style={{
              opacity: reward.disabled ? 0.5 : 1,
              cursor: reward.disabled ? "not-allowed" : "pointer",
            }}
          >
            <RewardIcon src={reward.icon} />
            <RewardContent>
              <RewardTitle>{reward.title}</RewardTitle>
              <RewardInfo>{reward.info}</RewardInfo>
            </RewardContent>
            {reward.status && <RewardStatus>{reward.status}</RewardStatus>}
          </RewardItem>
        ))}
      </RewardList>

      {/* 광고 모달 */}
      <AdModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onParticipate={handleParticipate}
      />
    </DashboardContainer>
  );
};

export default ADTicketDashboard;
