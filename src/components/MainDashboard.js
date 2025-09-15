import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import gasSponsorService from "../services/gasSponsor";
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
const imgPolygon1 = "http://localhost:3845/assets/79d8126f7474a53dbb7b8b36d203a8b1fe7a6b23.svg";
const imgFrame60 = "http://localhost:3845/assets/cf3ec7890e749c15a472fb2aa478a7cf34825273.svg";
const imgEllipse2 = "http://localhost:3845/assets/9bcc4b909b8ec2fd01adeeaf82d47b22c8e9d181.svg";
const imgEllipse4 = "http://localhost:3845/assets/be5a31e41c19f8e4c9bb19c23ce01d5c4f53b249.svg";

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

const NetworkSelector = styled.div`
  ${createFlexStyle('row', 'center', 'center', 8)}
  background: #3b3b3b;
  border-radius: ${responsiveSize(20)};
  padding: ${responsiveSpacing(8)} ${responsiveSpacing(16)};
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #4a4a4a;
  }
`;

const NetworkIcon = styled.div`
  width: ${responsiveSize(20)};
  height: ${responsiveSize(20)};
  background-image: url("${imgFrame60}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const NetworkText = styled.div`
  ${createTextStyle(14)}
  color: white;
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
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #4a4a4a;
  }
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

const BalanceSection = styled.div`
  ${createFlexStyle('column', 'center', 'center', 10)}
  padding: ${responsiveSpacing(30)} ${responsiveSpacing(20)};
  text-align: center;
`;

const BalanceAmount = styled.div`
  ${createTextStyle(48)}
  color: white;
  font-weight: 700;
`;

const BalanceChange = styled.div`
  ${createTextStyle(16)}
  color: #4ade80;
  font-weight: 600;
`;

const EyeButton = styled.button`
  position: absolute;
  right: ${responsiveSpacing(20)};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: ${responsiveSpacing(8)};
  border-radius: 50%;
  transition: background 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const BannerSection = styled.div`
  ${createFlexStyle('column', 'center', 'center', 15)}
  padding: 0 ${responsiveSpacing(20)};
  margin: ${responsiveSpacing(20)} 0;
`;

const BannerImage = styled.div`
  width: 100%;
  height: ${responsiveSize(100)};
  background-image: url("${imgImage10}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: ${responsiveSize(8)};
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
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

const TabSection = styled.div`
  ${createFlexStyle('row', 'center', 'center', 0)}
  padding: 0 ${responsiveSpacing(20)};
  margin: ${responsiveSpacing(20)} 0;
`;

const Tab = styled.button`
  ${createTextStyle(18)}
  color: ${props => props.active ? '#f29d38' : 'white'};
  background: none;
  border: none;
  cursor: pointer;
  padding: ${responsiveSpacing(10)} ${responsiveSpacing(20)};
  font-weight: 600;
  transition: color 0.2s ease;
  
  &:hover {
    color: #f29d38;
  }
`;

const TokenList = styled.div`
  flex: 1;
  padding: 0 ${responsiveSpacing(20)};
  overflow-y: auto;
`;

const TokenItem = styled.div`
  ${createFlexStyle('row', 'space-between', 'center', 15)}
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

const TokenIcon = styled.div`
  width: ${responsiveSize(40)};
  height: ${responsiveSize(40)};
  background: #3b3b3b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${createTextStyle(16)}
  color: white;
  font-weight: 600;
`;

const TokenInfo = styled.div`
  ${createFlexStyle('column', 'flex-start', 'flex-start', 5)}
  flex: 1;
`;

const TokenName = styled.div`
  ${createTextStyle(16)}
  color: white;
  font-weight: 600;
`;

const TokenChange = styled.div`
  ${createTextStyle(14)}
  color: ${props => props.positive ? '#4ade80' : '#ef4444'};
`;

const TokenAmount = styled.div`
  ${createFlexStyle('column', 'flex-end', 'flex-end', 5)}
`;

const TokenBalance = styled.div`
  ${createTextStyle(16)}
  color: white;
  font-weight: 600;
`;

const TokenValue = styled.div`
  ${createTextStyle(14)}
  color: #999999;
`;

const LoadTokenButton = styled.button`
  width: 100%;
  padding: ${responsiveSpacing(15)};
  background: #2a2a2a;
  border: 1px solid #3b3b3b;
  border-radius: ${responsiveSize(8)};
  ${createTextStyle(14)}
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
  margin: ${responsiveSpacing(20)} 0;
  
  &:hover {
    background: #3a3a3a;
  }
`;

const NavigationBar = styled.div`
  ${createFlexStyle('row', 'space-around', 'center', 0)}
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${responsiveSize(80)};
  background: #2a2a2a;
  border-top: 1px solid #3b3b3b;
  padding: ${responsiveSpacing(10)} 0;
  z-index: 100;
`;

const NavItem = styled.button`
  ${createFlexStyle('column', 'center', 'center', 5)}
  background: none;
  border: none;
  cursor: pointer;
  padding: ${responsiveSpacing(8)};
  transition: color 0.2s ease;
  color: ${props => props.active ? '#f29d38' : '#999999'};
  
  &:hover {
    color: #f29d38;
  }
`;

const NavIcon = styled.div`
  width: ${responsiveSize(24)};
  height: ${responsiveSize(24)};
  background: ${props => props.active ? '#f29d38' : '#999999'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${createTextStyle(12)}
  color: white;
  font-weight: 600;
`;

const NavText = styled.div`
  ${createTextStyle(12)}
  color: inherit;
`;

const MainDashboard = () => {
  const navigate = useNavigate();
  const [ticketBalance, setTicketBalance] = useState(18);
  const [balance, setBalance] = useState(6.29);
  const [balanceChange, setBalanceChange] = useState(1.16);
  const [balanceChangePercent, setBalanceChangePercent] = useState(2.73);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('TOKEN');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    initializeDashboard();
  }, []);

  const initializeDashboard = async () => {
    try {
      const balance = await gasSponsorService.getTicketBalance();
      setTicketBalance(balance);
    } catch (error) {
      console.error('대시보드 초기화 실패:', error);
    }
  };

  const handleTicketClick = () => {
    navigate("/ad-ticket");
  };

  const handleToggleBalance = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const handleBannerClick = () => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  };

  const tokens = [
    {
      id: 1,
      name: "Ethereum",
      symbol: "ETH",
      balance: "0.00263",
      value: "$6.28",
      change: "+2.73%",
      positive: true
    },
    {
      id: 2,
      name: "Arbitrum",
      symbol: "ARB",
      balance: "0.001",
      value: "$0.001",
      change: "-0.01%",
      positive: false
    },
    {
      id: 3,
      name: "Matic",
      symbol: "MATIC",
      balance: "0",
      value: "$0.001",
      change: "0.00%",
      positive: true
    }
  ];

  const navItems = [
    { id: 'wallet', label: 'Wallet', active: true },
    { id: 'send', label: 'Send / Recive' },
    { id: 'swap', label: 'Swap / Bridge' },
    { id: 'transaction', label: 'Transaction' },
    { id: 'setting', label: 'Setting' }
  ];

  return (
    <DashboardContainer>
      <Header>
        <NetworkSelector>
          <NetworkIcon />
          <NetworkText>Account 1</NetworkText>
        </NetworkSelector>
        
        <AccountInfo>
          <AccountIcon />
          <AccountName>Account 1</AccountName>
          <AccountAddress>0xcEDBf...4926F</AccountAddress>
        </AccountInfo>
        
        <TicketBalance onClick={handleTicketClick}>
          <TicketIcon />
          <TicketCount>{ticketBalance}</TicketCount>
        </TicketBalance>
      </Header>

      <BalanceSection style={{ position: 'relative' }}>
        <BalanceAmount>
          {isBalanceVisible ? `$${balance}` : '••••••'}
        </BalanceAmount>
        {isBalanceVisible && (
          <BalanceChange>
            +${balanceChange} (+{balanceChangePercent}%)
          </BalanceChange>
        )}
        <EyeButton onClick={handleToggleBalance}>
          {isBalanceVisible ? <FiEye size={20} /> : <FiEyeOff size={20} />}
        </EyeButton>
      </BalanceSection>

      <BannerSection>
        <BannerImage onClick={handleBannerClick} />
        <DotContainer>
          {[0, 1, 2].map((index) => (
            <Dot key={index} active={index === currentSlide} />
          ))}
        </DotContainer>
      </BannerSection>

      <TabSection>
        <Tab active={activeTab === 'TOKEN'} onClick={() => setActiveTab('TOKEN')}>
          TOKEN
        </Tab>
        <Tab active={activeTab === 'NFT'} onClick={() => setActiveTab('NFT')}>
          NFT
        </Tab>
      </TabSection>

      <TokenList>
        {tokens.map((token) => (
          <TokenItem key={token.id}>
            <TokenIcon>{token.symbol[0]}</TokenIcon>
            <TokenInfo>
              <TokenName>{token.name}</TokenName>
              <TokenChange positive={token.positive}>{token.change}</TokenChange>
            </TokenInfo>
            <TokenAmount>
              <TokenBalance>{token.balance} {token.symbol}</TokenBalance>
              <TokenValue>{token.value}</TokenValue>
            </TokenAmount>
          </TokenItem>
        ))}
        
        <LoadTokenButton>
          토큰 불러오기 / 추가하기
        </LoadTokenButton>
      </TokenList>

      <NavigationBar>
        {navItems.map((item) => (
          <NavItem key={item.id} active={item.active}>
            <NavIcon active={item.active}>
              {item.label[0]}
            </NavIcon>
            <NavText>{item.label}</NavText>
          </NavItem>
        ))}
      </NavigationBar>
    </DashboardContainer>
  );
};

export default MainDashboard;