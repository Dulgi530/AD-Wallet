import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import { FiPlay, FiGift, FiZap, FiEye } from "react-icons/fi";
import gasSponsorService from "../services/gasSponsor";

const DashboardContainer = styled.div`
  background: linear-gradient(135deg, #1d1818 0%, #2a2525 100%);
  min-height: 100vh;
  padding: 20px;
  color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Logo = styled.h1`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #f29d38;
  margin: 0;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(45deg, #f29d38, #ff6b35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
`;

const TicketBalance = styled.div`
  background: linear-gradient(135deg, #f29d38, #ff6b35);
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 30px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(242, 157, 56, 0.3);
`;

const BalanceTitle = styled.h2`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 600;
  font-size: 16px;
  margin: 0 0 10px 0;
  opacity: 0.9;
`;

const BalanceAmount = styled.div`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 36px;
  margin: 0 0 5px 0;
`;

const BalanceUnit = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 30px;
`;

const ActionCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

const ActionIcon = styled.div`
  font-size: 32px;
  margin-bottom: 10px;
  color: #f29d38;
`;

const ActionTitle = styled.h3`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 600;
  font-size: 16px;
  margin: 0 0 5px 0;
`;

const ActionDesc = styled.p`
  font-size: 12px;
  opacity: 0.7;
  margin: 0;
`;

const AdSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const AdTitle = styled.h3`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 600;
  font-size: 18px;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AdCard = styled.div`
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

const AdCardTitle = styled.h4`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 600;
  font-size: 16px;
  margin: 0 0 8px 0;
`;

const AdCardDesc = styled.p`
  font-size: 14px;
  opacity: 0.9;
  margin: 0 0 10px 0;
`;

const AdReward = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RewardAmount = styled.span`
  font-weight: 600;
  color: #f29d38;
`;

const WatchButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const GasSponsorSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const GasSponsorTitle = styled.h3`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 600;
  font-size: 18px;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const GasInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
`;

const GasLabel = styled.span`
  font-size: 14px;
  opacity: 0.8;
`;

const GasValue = styled.span`
  font-weight: 600;
  color: #f29d38;
`;

const SponsorButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #f29d38, #ff6b35);
  border: none;
  border-radius: 12px;
  padding: 15px;
  color: white;
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(242, 157, 56, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ADTicketDashboard = () => {
  const navigate = useNavigate();
  const [ticketBalance, setTicketBalance] = useState(150);
  const [isWatchingAd, setIsWatchingAd] = useState(false);
  const [currentGasPrice, setCurrentGasPrice] = useState(0.002);
  const [isGasSponsorActive, setIsGasSponsorActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    initializeDashboard();
  }, []);

  // 가스비 정보 업데이트
  useEffect(() => {
    const interval = setInterval(async () => {
      const gasPrice = await gasSponsorService.getCurrentGasPrice();
      setCurrentGasPrice(gasPrice);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const initializeDashboard = async () => {
    try {
      // 티켓 잔액 조회
      const balance = await gasSponsorService.getTicketBalance();
      setTicketBalance(balance);
      
      // 가스비 대납 상태 확인
      const status = gasSponsorService.getSponsorStatus();
      setIsGasSponsorActive(status.isActive);
    } catch (error) {
      console.error('대시보드 초기화 실패:', error);
    }
  };

  const handleWatchAd = async (adId, reward) => {
    setIsWatchingAd(true);
    toast.success(`광고 시청 중... +${reward} 티켓`);
    
    // 광고 시청 시뮬레이션 (5초)
    setTimeout(async () => {
      const newBalance = ticketBalance + reward;
      setTicketBalance(newBalance);
      gasSponsorService.updateTicketBalance(reward);
      setIsWatchingAd(false);
      toast.success(`${reward} 티켓을 획득했습니다!`);
    }, 5000);
  };

  const handleGasSponsor = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      if (isGasSponsorActive) {
        // 가스비 대납 비활성화
        const result = await gasSponsorService.deactivateGasSponsor();
        if (result.success) {
          setIsGasSponsorActive(false);
          toast.success("가스비 대납이 비활성화되었습니다.");
        } else {
          toast.error(result.error);
        }
      } else {
        // 가스비 대납 활성화
        const requiredTickets = Math.ceil(currentGasPrice * 1000);
        
        if (ticketBalance < requiredTickets) {
          toast.error("티켓이 부족합니다. 광고를 더 시청해주세요!");
          setIsLoading(false);
          return;
        }
        
        const result = await gasSponsorService.activateGasSponsor(requiredTickets);
        if (result.success) {
          setIsGasSponsorActive(true);
          setTicketBalance(prev => prev - requiredTickets);
          toast.success("가스비 대납이 활성화되었습니다!");
        } else {
          toast.error(result.error);
        }
      }
    } catch (error) {
      toast.error("가스비 대납 처리 중 오류가 발생했습니다.");
      console.error('가스비 대납 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const ads = [
    {
      id: 1,
      title: "DeFi 프로토콜 소개",
      description: "새로운 DeFi 서비스를 만나보세요",
      reward: 10,
      duration: "30초"
    },
    {
      id: 2,
      title: "NFT 마켓플레이스",
      description: "최신 NFT 컬렉션을 확인하세요",
      reward: 15,
      duration: "45초"
    },
    {
      id: 3,
      title: "Web3 게임",
      description: "플레이 투 언 게임을 체험해보세요",
      reward: 20,
      duration: "60초"
    }
  ];

  return (
    <DashboardContainer>
      <Header>
        <Logo>AD Ticket</Logo>
        <UserInfo>
          <Avatar>U</Avatar>
        </UserInfo>
      </Header>

      <TicketBalance>
        <BalanceTitle>보유 티켓</BalanceTitle>
        <BalanceAmount>{ticketBalance.toLocaleString()}</BalanceAmount>
        <BalanceUnit>AD Tickets</BalanceUnit>
      </TicketBalance>

      <QuickActions>
        <ActionCard onClick={() => navigate("/send")}>
          <ActionIcon>
            <FiZap />
          </ActionIcon>
          <ActionTitle>송금</ActionTitle>
          <ActionDesc>토큰 전송</ActionDesc>
        </ActionCard>

        <ActionCard onClick={() => navigate("/receive")}>
          <ActionIcon>
            <FiGift />
          </ActionIcon>
          <ActionTitle>수신</ActionTitle>
          <ActionDesc>QR 코드 공유</ActionDesc>
        </ActionCard>
      </QuickActions>

      <AdSection>
        <AdTitle>
          <FiPlay />
          광고 시청으로 티켓 획득
        </AdTitle>
        {ads.map(ad => (
          <AdCard key={ad.id} onClick={() => handleWatchAd(ad.id, ad.reward)}>
            <AdCardTitle>{ad.title}</AdCardTitle>
            <AdCardDesc>{ad.description}</AdCardDesc>
            <AdReward>
              <RewardAmount>+{ad.reward} 티켓</RewardAmount>
              <WatchButton disabled={isWatchingAd}>
                {isWatchingAd ? "시청 중..." : `${ad.duration} 시청`}
              </WatchButton>
            </AdReward>
          </AdCard>
        ))}
      </AdSection>

      <GasSponsorSection>
        <GasSponsorTitle>
          <FiZap />
          가스비 대납 서비스
        </GasSponsorTitle>
        
        <GasInfo>
          <GasLabel>현재 가스비</GasLabel>
          <GasValue>{currentGasPrice.toFixed(4)} ETH</GasValue>
        </GasInfo>
        
        <GasInfo>
          <GasLabel>필요 티켓</GasLabel>
          <GasValue>{Math.ceil(currentGasPrice * 1000)} 티켓</GasValue>
        </GasInfo>
        
        <GasInfo>
          <GasLabel>보유 티켓</GasLabel>
          <GasValue>{ticketBalance} 티켓</GasValue>
        </GasInfo>

        <SponsorButton 
          onClick={handleGasSponsor}
          disabled={!isGasSponsorActive && ticketBalance < currentGasPrice * 1000}
        >
          {isLoading 
            ? "처리 중..." 
            : isGasSponsorActive 
              ? "가스비 대납 비활성화" 
              : ticketBalance >= currentGasPrice * 1000 
                ? "가스비 대납 활성화" 
                : "티켓 부족 - 광고 시청 필요"
          }
        </SponsorButton>
      </GasSponsorSection>
    </DashboardContainer>
  );
};

export default ADTicketDashboard;
