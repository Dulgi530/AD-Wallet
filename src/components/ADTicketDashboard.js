import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import gasSponsorService from "../services/gasSponsor";
import AdModal from "./AdModal";
import { 
  createContainerStyle, 
  createHeaderStyle, 
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
`;

const Header = styled.div`
  ${createHeaderStyle()}
`;

const BackButton = styled.button`
  ${createIconStyle(25)}
  background: none;
  border: none;
  cursor: pointer;
  transform: rotate(270deg);
  background-image: url("${imgPolygon2}");
`;

const AccountInfo = styled.div`
  ${createFlexStyle('row', 'center', 'center', 10)}
  flex: 1;
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
  background: #3b3b3b;
  border-radius: ${responsiveSize(25)};
  height: ${responsiveSize(40)};
  min-width: ${responsiveSize(80)};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${responsiveSpacing(5)};
  padding: 0 ${responsiveSpacing(10)};
`;

const TicketIcon = styled.div`
  ${createIconStyle(25)}
  background-image: url("${imgImage3}");
`;

const TicketAmount = styled.div`
  ${createTextStyle(16)}
  color: white;
`;

const LargeTicketIcon = styled.div`
  ${createIconStyle(50)}
  background-image: url("${imgImage3}");
  margin-right: ${responsiveSpacing(20)};
`;

const LargeTicketAmount = styled.div`
  ${createTextStyle(32)}
  color: white;
  line-height: normal;
`;

const Description = styled.div`
  ${createTextStyle(16)}
  color: #999999;
  text-align: center;
  line-height: normal;
  margin: ${responsiveSpacing(20)} 0;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: ${responsiveSize(100)};
  background: #110b0b;
  overflow: hidden;
  margin: ${responsiveSpacing(20)} 0;
  border-radius: ${responsiveSize(8)};
`;

const ChartImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("${imgImage10}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const ChartDots = styled.div`
  ${createFlexStyle('row', 'center', 'center', 15)}
  margin: ${responsiveSpacing(10)} 0;
`;

const ChartDot = styled.div`
  ${createIconStyle(10)}
  background-image: url("${imgEllipse4}");
  
  &:first-child {
    background-image: url("${imgEllipse2}");
  }
`;

const AdList = styled.div`
  width: 100%;
  padding: 0 ${responsiveSpacing(20)};
  margin: ${responsiveSpacing(20)} 0;
`;

const AdItem = styled.div`
  height: ${responsiveSize(60)};
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: ${responsiveSpacing(10)} 0;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const AdIcon = styled.div`
  ${createIconStyle(25)}
  background-image: url("${(props) => props.icon}");
  margin-right: ${responsiveSpacing(15)};
`;

const AdTitle = styled.div`
  ${createTextStyle(14)}
  color: white;
  text-align: left;
  flex: 1;
`;

const AdLimit = styled.div`
  ${createTextStyle(14)}
  color: white;
  text-align: right;
  margin-right: ${responsiveSpacing(10)};
`;

const AdDescription = styled.div`
  ${createTextStyle(12)}
  color: #999999;
  text-align: right;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-image: url("${imgLine42}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: ${responsiveSpacing(10)} 0;
`;

const ADTicketDashboard = () => {
  const navigate = useNavigate();
  const [ticketBalance, setTicketBalance] = useState(18);
  const [isWatchingAd, setIsWatchingAd] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(5);
  const [currentUsage, setCurrentUsage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    initializeDashboard();
  }, []);

  const initializeDashboard = async () => {
    try {
      // 티켓 잔액 조회
      const balance = await gasSponsorService.getTicketBalance();
      setTicketBalance(balance);
    } catch (error) {
      console.error('대시보드 초기화 실패:', error);
    }
  };

  const handleWatchAd = async (adType, reward) => {
    if (currentUsage >= dailyLimit) {
      toast.error("일일 제한 횟수를 초과했습니다.");
      return;
    }

    setIsWatchingAd(true);
    toast.success(`광고 시청 중... +${reward} 티켓`);
    
    // 광고 시청 시뮬레이션 (3초)
    setTimeout(async () => {
      const newBalance = ticketBalance + reward;
      setTicketBalance(newBalance);
      setCurrentUsage(prev => prev + 1);
      gasSponsorService.updateTicketBalance(reward);
      setIsWatchingAd(false);
      toast.success(`${reward} 티켓을 획득했습니다!`);
    }, 3000);
  };

  const handleCryptoMission = () => {
    toast.info("크립토 미션 기능은 준비 중입니다.");
  };

  const handleCoupang = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleParticipate = () => {
    setIsModalOpen(false);
    toast.success("쿠팡 제휴에 참여했습니다! 결제 시 AD Ticket이 지급됩니다.");
  };

  const handleFriendInvite = () => {
    toast.info("친구초대 기능은 준비 중입니다.");
  };

  const ads = [
    {
      id: 1,
      title: "광고 시청하기 + 1",
      icon: imgImage3,
      limit: "5/5",
      description: "일일 제한 횟수 5회",
      reward: 1,
      onClick: () => handleWatchAd("ad", 1)
    },
    {
      id: 2,
      title: "크립토 미션",
      icon: imgImage2,
      description: "다양한 Web3 미션을 통한 리워드",
      onClick: handleCryptoMission
    },
    {
      id: 3,
      title: "쿠팡 제휴",
      icon: img11,
      description: "3,333원 결제당 AD Ticket 지급\n※ 구매 취소 시, AD 취소",
      onClick: handleCoupang
    },
    {
      id: 4,
      title: "친구초대",
      icon: imgImage12,
      description: "초대코드로 친구를 초대 리워드",
      onClick: handleFriendInvite
    }
  ];

  return (
    <DashboardContainer>
      {/* 상단 헤더 */}
      <Header>
        <BackButton onClick={() => navigate("/dashboard")} />
        
        <AccountInfo>
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundImage: `url("${imgFrame61}")`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          <div>
            <AccountName>Account 1</AccountName>
            <AccountAddress>0xcEDBf...4926F</AccountAddress>
          </div>
        </AccountInfo>

        <TicketBalance>
          <TicketIcon />
          <TicketAmount>{ticketBalance}</TicketAmount>
        </TicketBalance>
      </Header>

      {/* 큰 티켓 아이콘과 잔액 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
        <LargeTicketIcon />
        <LargeTicketAmount>{ticketBalance}</LargeTicketAmount>
      </div>

      {/* 설명 텍스트 */}
      <Description>가스비를 결제해주는 AD Ticket</Description>

      {/* 차트 */}
      <ChartContainer>
        <ChartImage />
      </ChartContainer>

      {/* 차트 도트들 */}
      <ChartDots>
        {[...Array(5)].map((_, index) => (
          <ChartDot key={index} />
        ))}
      </ChartDots>

      {/* 광고 목록 */}
      <AdList>
        {ads.map((ad, index) => (
          <AdItem key={ad.id} onClick={ad.onClick}>
            <AdIcon icon={ad.icon} />
            <AdTitle>{ad.title}</AdTitle>
            {ad.limit && <AdLimit>{ad.limit}</AdLimit>}
            <AdDescription>{ad.description}</AdDescription>
            {index < ads.length - 1 && <Divider />}
          </AdItem>
        ))}
      </AdList>

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