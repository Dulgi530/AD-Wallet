import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import gasSponsorService from "../services/gasSponsor";
import AdModal from "./AdModal";

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
  background: #1d1818;
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  
  @media (max-width: 480px) {
    min-height: 100vh;
  }
`;

const Header = styled.div`
  position: relative;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const BackButton = styled.button`
  width: 25px;
  height: 25px;
  background: none;
  border: none;
  cursor: pointer;
  transform: rotate(270deg);
  background-image: url("${imgPolygon2}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  
  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`;

const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  justify-content: center;
  
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const AccountName = styled.div`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const AccountAddress = styled.div`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #999999;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const TicketBalance = styled.div`
  background: #3b3b3b;
  border-radius: 25px;
  height: 40px;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0 10px;
  
  @media (max-width: 480px) {
    height: 35px;
    min-width: 70px;
    gap: 3px;
  }
`;

const TicketIcon = styled.div`
  width: 25px;
  height: 25px;
  background-image: url("${imgImage3}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  
  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`;

const TicketAmount = styled.div`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: white;
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const LargeTicketIcon = styled.div`
  width: 50px;
  height: 50px;
  background-image: url("${imgImage3}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 20px;
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }
`;

const LargeTicketAmount = styled.div`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: white;
  line-height: normal;
  
  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const Description = styled.div`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #999999;
  text-align: center;
  line-height: normal;
  margin: 20px 0;
  
  @media (max-width: 480px) {
    font-size: 14px;
    margin: 15px 0;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 100px;
  background: #110b0b;
  overflow: hidden;
  margin: 20px 0;
  border-radius: 8px;
  
  @media (max-width: 480px) {
    height: 80px;
    margin: 15px 0;
  }
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
  display: flex;
  gap: 15px;
  justify-content: center;
  margin: 10px 0;
  
  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const ChartDot = styled.div`
  width: 10px;
  height: 10px;
  background-image: url("${imgEllipse4}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  
  &:first-child {
    background-image: url("${imgEllipse2}");
  }
  
  @media (max-width: 480px) {
    width: 8px;
    height: 8px;
  }
`;

const AdList = styled.div`
  width: 100%;
  padding: 0 20px;
  margin: 20px 0;
  
  @media (max-width: 480px) {
    padding: 0 15px;
    margin: 15px 0;
  }
`;

const AdItem = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 10px 0;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  @media (max-width: 480px) {
    height: 50px;
    padding: 8px 0;
  }
`;

const AdIcon = styled.div`
  width: 25px;
  height: 25px;
  background-image: url("${(props) => props.icon}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 15px;
  
  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;

const AdTitle = styled.div`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
  text-align: left;
  flex: 1;
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const AdLimit = styled.div`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
  text-align: right;
  margin-right: 10px;
  
  @media (max-width: 480px) {
    font-size: 12px;
    margin-right: 5px;
  }
`;

const AdDescription = styled.div`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #999999;
  text-align: right;
  
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-image: url("${imgLine42}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 10px 0;
  
  @media (max-width: 480px) {
    margin: 8px 0;
  }
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