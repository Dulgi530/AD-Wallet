import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import gasSponsorService from "../services/gasSponsor";
import AdModal from "./AdModal";
import AdWatchModal from "./AdWatchModal";
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
const img11 = "http://localhost:3845/assets/3a576cb5f4cb120ccaa705bb36531ed3dde6793e.png";
const imgImage2 = "http://localhost:3845/assets/a5afa55a89940975aa49915299cb08c7c192db96.png";
const imgImage12 = "http://localhost:3845/assets/c91a88f6c25bac59ea92b4abfe1628b921fef463.png";
const imgPolygon1 = "http://localhost:3845/assets/79d8126f7474a53dbb7b8b36d203a8b1fe7a6b23.svg";
const imgFrame61 = "http://localhost:3845/assets/cf3ec7890e749c15a472fb2aa478a7cf34825273.svg";
const imgPolygon2 = "http://localhost:3845/assets/53fbb2746b1d4ea19636c18d0b9ef4e79652148f.svg";
const imgEllipse2 = "http://localhost:3845/assets/9bcc4b909b8ec2fd01adeeaf82d47b22c8e9d181.svg";
const imgEllipse4 = "http://localhost:3845/assets/be5a31e41c19f8e4c9bb19c23ce01d5c4f53b249.svg";
const imgLine42 = "http://localhost:3845/assets/2eeecc92fcde4a9c11fe718d7116c4af4338d0d9.svg";

const DashboardContainer = styled.div`
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
  background-image: url("${imgFrame61}");
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

const MainTicketSection = styled.div`
  ${createFlexStyle('column', 'center', 'center', 20)}
  margin: ${responsiveSpacing(40)} 0;
  padding: 0 ${responsiveSpacing(20)};
`;

const MainTicketIcon = styled.div`
  width: ${responsiveSize(120)};
  height: ${responsiveSize(120)};
  background-image: url("${imgImage2}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const MainTicketAmount = styled.div`
  ${createTextStyle(48)}
  color: #f29d38;
  font-weight: 700;
  text-align: center;
`;

const MainTicketDescription = styled.div`
  ${createTextStyle(16)}
  color: white;
  text-align: center;
  line-height: 1.4;
`;

const ChartSection = styled.div`
  ${createFlexStyle('column', 'center', 'center', 15)}
  margin: ${responsiveSpacing(30)} 0;
  padding: 0 ${responsiveSpacing(20)};
`;

const BannerImage = styled.div`
  width: 100%;
  height: ${responsiveSize(100)};
  background-image: url("${imgImage10}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: ${responsiveSize(8)};
`;

const DotContainer = styled.div`
  ${createFlexStyle('row', 'center', 'center', 15)}
`;

const Dot = styled.div`
  ${createIconStyle(10)}
  background-image: url("${imgEllipse4}");
  
  ${props => props.active && `
    background-image: url("${imgEllipse2}");
  `}
`;

const RewardList = styled.div`
  width: 100%;
  padding: 0 ${responsiveSpacing(20)};
  margin-top: ${responsiveSpacing(20)};
`;

const RewardItem = styled.div`
  ${createFlexStyle('row', 'space-between', 'center', 15)}
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
  ${createFlexStyle('column', 'flex-start', 'flex-start', 5)}
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
  const [ticketBalance, setTicketBalance] = useState(18);
  const [isWatchingAd, setIsWatchingAd] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(5);
  const [currentUsage, setCurrentUsage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdWatchModalOpen, setIsAdWatchModalOpen] = useState(false);

  useEffect(() => {
    initializeDashboard();
  }, []);

  const initializeDashboard = async () => {
    try {
      const balance = await gasSponsorService.getTicketBalance();
      setTicketBalance(balance);
      setCurrentUsage(0); // 임시
    } catch (error) {
      console.error("AD Ticket 대시보드 초기화 실패:", error);
    }
  };

  const handleWatchAd = () => {
    if (currentUsage >= dailyLimit) {
      toast.error("오늘 시청 가능한 광고 횟수를 모두 소진했습니다.");
      return;
    }
    setIsAdWatchModalOpen(true);
  };

  const handleCloseAdWatchModal = () => {
    setIsAdWatchModalOpen(false);
  };

  const handleConfirmWatchAd = async () => {
    setIsAdWatchModalOpen(false);
    setIsWatchingAd(true);
    toast.success("광고 시청 중... (3초)");
    
    // Simulate ad watching
    setTimeout(async () => {
      const reward = 1; // Each ad gives 1 ticket
      const newBalance = await gasSponsorService.updateTicketBalance(reward);
      setTicketBalance(newBalance);
      setCurrentUsage(prev => prev + 1);
      setIsWatchingAd(false);
      toast.success(`+${reward} 티켓을 획득했습니다!`);
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
    toast.success("쿠팡 제휴에 참여합니다!");
    setIsModalOpen(false);
  };

  const handleInviteFriends = () => {
    toast.info("친구초대 기능은 준비 중입니다.");
  };

  const rewards = [
    {
      id: 1,
      icon: imgImage3,
      title: "광고 시청하기 + 1",
      info: "일일 제한 횟수 5회",
      status: `${currentUsage}/${dailyLimit}`,
      onClick: handleWatchAd,
      disabled: currentUsage >= dailyLimit || isWatchingAd
    },
    {
      id: 2,
      icon: img11,
      title: "크립토 미션",
      info: "다양한 Web3 미션을 통한 리워드",
      onClick: handleCryptoMission
    },
    {
      id: 3,
      icon: imgImage12,
      title: "쿠팡 제휴",
      info: "3,333원 결제당 AD Ticket 지급\n※ 구매 취소 시, AD 취소",
      onClick: handleCoupang
    },
    {
      id: 4,
      icon: imgImage3,
      title: "친구초대",
      info: "초대코드로 친구를 초대 리워드",
      onClick: handleInviteFriends
    }
  ];

  return (
    <DashboardContainer>
      <Header>
        <BackButton onClick={() => navigate("/dashboard")} />
        
        <AccountInfo>
          <AccountIcon />
          <AccountName>Account 1</AccountName>
          <AccountAddress>0xcEDBf...4926F</AccountAddress>
        </AccountInfo>
        
        <TicketBalance>
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

      <ChartSection>
        <BannerImage />
        <DotContainer>
          <Dot active />
          <Dot />
          <Dot />
          <Dot />
          <Dot />
        </DotContainer>
      </ChartSection>

      <RewardList>
        {rewards.map((reward) => (
          <RewardItem 
            key={reward.id} 
            onClick={reward.onClick}
            style={{ 
              opacity: reward.disabled ? 0.5 : 1,
              cursor: reward.disabled ? 'not-allowed' : 'pointer'
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

      {/* 광고 시청 모달 */}
      <AdWatchModal
        isOpen={isAdWatchModalOpen}
        onClose={handleCloseAdWatchModal}
        onWatchAd={handleConfirmWatchAd}
      />
    </DashboardContainer>
  );
};

export default ADTicketDashboard;