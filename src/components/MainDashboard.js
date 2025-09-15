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
  responsiveSpacing
} from "../utils/autoLayout";

// 이미지 상수들
const imgEye = "http://localhost:3845/assets/63afbe91280e317dcff5a81a9fb9d5cc27d76db3.png";
const imgSettings = "http://localhost:3845/assets/533bfd07bcaf92a339876fcb9c18ed03475f8094.png";
const imgWallet = "http://localhost:3845/assets/717984cacafff4dabba275966a87b6aeb841077e.png";
const imgDollarEuroExchange = "http://localhost:3845/assets/a5e3af09441a3318db3ba4227054448ee7be68d8.png";
const imgAroundTheGlobe = "http://localhost:3845/assets/3133da9bed63f5ffd3a2e490f30717c5273b9e38.png";
const imgCryptoTradingSpot = "http://localhost:3845/assets/0618b7576df673c4aea6c6fdd0605ed14a179f65.png";
const imgImage7 = "http://localhost:3845/assets/7295164430571b46b9fbb1781cd8a3e8631971eb.png";
const imgImage8 = "http://localhost:3845/assets/85a292aa95479e92e0d455d112b54208111c5d0d.png";
const imgImage9 = "http://localhost:3845/assets/0efd44893bd0488612a1d8121a7b5b0b5db116fb.png";
const imgImage3 = "http://localhost:3845/assets/4a6aad9c9d13776d70b296a4d7b3f71253a93463.png";
const imgImage10 = "http://localhost:3845/assets/2d1ee20636d2178512aeb74537b7833e46a0afa6.png";
const imgLine42 = "http://localhost:3845/assets/2eeecc92fcde4a9c11fe718d7116c4af4338d0d9.svg";
const imgEllipse2 = "http://localhost:3845/assets/9bcc4b909b8ec2fd01adeeaf82d47b22c8e9d181.svg";
const imgEllipse4 = "http://localhost:3845/assets/be5a31e41c19f8e4c9bb19c23ce01d5c4f53b249.svg";
const imgPolygon1 = "http://localhost:3845/assets/ae5e6915a4e7136319927308cc3e2cd0ac67d4de.svg";
const imgPolygon2 = "http://localhost:3845/assets/79d8126f7474a53dbb7b8b36d203a8b1fe7a6b23.svg";
const imgFrame58 = "http://localhost:3845/assets/cf3ec7890e749c15a472fb2aa478a7cf34825273.svg";

const DashboardContainer = styled.div`
  ${createContainerStyle()}
`;

const Header = styled.div`
  ${createFlexStyle('row', 'space-between', 'center', 0)}
  padding: ${responsiveSpacing(20)};
  width: 100%;
  box-sizing: border-box;
`;

const NetworkSelector = styled.button`
  background: #5f5f5f;
  border: none;
  border-radius: ${responsiveSize(20)};
  height: ${responsiveSize(40)};
  padding: 0 ${responsiveSpacing(15)};
  display: flex;
  align-items: center;
  gap: ${responsiveSpacing(8)};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #6f6f6f;
  }
`;

const NetworkIcon = styled.div`
  ${createIconStyle(20)}
  background-image: url("${imgPolygon1}");
`;

const NetworkText = styled.span`
  ${createTextStyle(12)}
  color: white;
`;

const AccountInfo = styled.div`
  ${createFlexStyle('row', 'center', 'center', 10)}
  flex: 1;
`;

const AccountIcon = styled.div`
  ${createIconStyle(15)}
  background-image: url("${imgFrame58}");
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
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #4a4a4a;
  }
`;

const TicketIcon = styled.div`
  ${createIconStyle(25)}
  background-image: url("${imgImage3}");
`;

const TicketAmount = styled.div`
  ${createTextStyle(16)}
  color: white;
`;

const BalanceSection = styled.div`
  ${createFlexStyle('column', 'center', 'center', 10)}
  margin: ${responsiveSpacing(30)} 0;
`;

const BalanceAmount = styled.div`
  ${createTextStyle(48)}
  color: white;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: ${responsiveSpacing(10)};
`;

const EyeButton = styled.button`
  ${createIconStyle(20)}
  background: none;
  border: none;
  cursor: pointer;
  background-image: url("${imgEye}");
`;

const BalanceChange = styled.div`
  ${createTextStyle(16)}
  color: #3ae851;
  text-align: center;
`;

const BannerSection = styled.div`
  ${createFlexStyle('column', 'center', 'center', 15)}
  margin: ${responsiveSpacing(30)} 0;
  padding: 0 ${responsiveSpacing(20)};
`;

const Banner = styled.div`
  width: 100%;
  height: ${responsiveSize(120)};
  background: #110b0b;
  border-radius: ${responsiveSize(10)};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const BannerContent = styled.div`
  position: absolute;
  top: ${responsiveSpacing(15)};
  left: ${responsiveSpacing(20)};
  z-index: 2;
`;

const BannerLogo = styled.div`
  ${createTextStyle(12)}
  color: #ff6b6b;
  margin-bottom: ${responsiveSpacing(5)};
`;

const BannerTitle = styled.div`
  ${createTextStyle(24)}
  color: white;
  font-weight: 700;
  margin-bottom: ${responsiveSpacing(5)};
`;

const BannerSubtitle = styled.div`
  ${createTextStyle(14)}
  color: #999999;
  margin-bottom: ${responsiveSpacing(10)};
`;

const BannerPrize = styled.div`
  ${createTextStyle(16)}
  color: white;
  font-weight: 700;
`;

const BannerImage = styled.div`
  position: absolute;
  right: ${responsiveSpacing(20)};
  top: 50%;
  transform: translateY(-50%);
  width: ${responsiveSize(80)};
  height: ${responsiveSize(80)};
  background-image: url("${imgImage10}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const BannerDots = styled.div`
  ${createFlexStyle('row', 'center', 'center', 10)}
`;

const BannerDot = styled.div`
  ${createIconStyle(8)}
  background-image: url("${imgEllipse4}");
  
  ${props => props.active && `
    background-image: url("${imgEllipse2}");
  `}
`;

const TabSection = styled.div`
  ${createFlexStyle('row', 'center', 'center', 10)}
  margin: ${responsiveSpacing(20)} 0;
  padding: 0 ${responsiveSpacing(20)};
`;

const Tab = styled.button`
  height: ${responsiveSize(51)};
  border: none;
  background: ${(props) => (props.active ? "#f29d38" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#f29d38")};
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: ${responsiveFontSize(32)};
  cursor: pointer;
  padding: 0 ${responsiveSpacing(20)};
  border-radius: ${responsiveSize(5)};
  transition: all 0.3s ease;
  flex: 1;
  max-width: ${responsiveSize(150)};
  
  &:hover {
    background: ${(props) => (props.active ? "#f29d38" : "rgba(242, 157, 56, 0.1)")};
  }
`;

const TokenList = styled.div`
  width: 100%;
  padding: 0 ${responsiveSpacing(20)};
  margin: ${responsiveSpacing(20)} 0;
`;

const TokenItem = styled.div`
  ${createFlexStyle('row', 'space-between', 'center', 15)}
  height: ${responsiveSize(60)};
  width: 100%;
  padding: ${responsiveSpacing(10)} 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const TokenIcon = styled.div`
  ${createIconStyle(25)}
  background-image: url("${(props) => props.icon}");
  flex-shrink: 0;
`;

const TokenDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${responsiveSpacing(5)};
`;

const TokenName = styled.div`
  ${createTextStyle(14)}
  color: white;
  text-align: left;
  font-weight: 700;
`;

const TokenChange = styled.div`
  ${createTextStyle(12)}
  color: ${(props) => props.color};
  text-align: left;
`;

const TokenAmounts = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${responsiveSpacing(5)};
  align-items: flex-end;
`;

const TokenAmount = styled.div`
  ${createTextStyle(14)}
  color: white;
  text-align: right;
  font-weight: 700;
`;

const TokenPrice = styled.div`
  ${createTextStyle(12)}
  color: #999999;
  text-align: right;
`;

const AddTokenButton = styled.button`
  width: 100%;
  height: ${responsiveSize(60)};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: ${responsiveFontSize(14)};
  color: #f29d38;
  text-align: center;
  transition: all 0.3s ease;
  margin: ${responsiveSpacing(20)} 0;
  padding: 0 ${responsiveSpacing(20)};
  
  &:hover {
    background: rgba(242, 157, 56, 0.1);
  }
`;

const BottomNavigation = styled.div`
  width: 100%;
  height: ${responsiveSize(80)};
  display: flex;
  justify-content: space-between;
  padding: ${responsiveSpacing(10)} ${responsiveSpacing(20)};
  margin-top: ${responsiveSpacing(20)};
  background: linear-gradient(180deg, rgba(29, 24, 24, 0.8) 0%, rgba(29, 24, 24, 1) 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const NavItem = styled.button`
  width: ${responsiveSize(70)};
  height: ${responsiveSize(60)};
  background: ${(props) => (props.active ? "white" : "#5f5f5f")};
  border: none;
  border-radius: ${responsiveSize(2)};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${responsiveSpacing(5)};
  transition: all 0.3s ease;
  flex: 1;
  max-width: ${responsiveSize(70)};
  
  &:hover {
    background: ${(props) => (props.active ? "white" : "#6f6f6f")};
  }
`;

const NavIcon = styled.div`
  ${createIconStyle(30)}
  background-image: url("${(props) => props.icon}");
`;

const NavLabel = styled.div`
  ${createTextStyle(10)}
  color: ${(props) => (props.active ? "#f29d38" : "black")};
  text-align: center;
  line-height: 1;
`;

const MainDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("TOKEN");
  const [showBalance, setShowBalance] = useState(true);
  const [ticketBalance, setTicketBalance] = useState(18);

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

  const tokens = [
    {
      name: "Ethereum",
      icon: imgImage7,
      amount: "0.00263 ETH",
      price: "$6.28",
      change: "+2.73%",
      changeColor: "#3ae851",
    },
    {
      name: "Arbitrum",
      icon: imgImage8,
      amount: "0.001 ARB",
      price: "$0.001",
      change: "-0.01%",
      changeColor: "#ff6b6b",
    },
    {
      name: "Matic",
      icon: imgImage9,
      amount: "0 MATIC",
      price: "$0.001",
      change: "0.00%",
      changeColor: "#999999",
    },
  ];

  const handleNavClick = (route) => {
    switch (route) {
      case "wallet":
        // 이미 메인 대시보드에 있음
        break;
      case "send":
        navigate("/send");
        break;
      case "swap":
        toast.info("스왑 기능은 준비 중입니다.");
        break;
      case "transaction":
        navigate("/history");
        break;
      case "settings":
        navigate("/settings");
        break;
      default:
        break;
    }
  };

  const handleAddToken = () => {
    toast.info("토큰 추가 기능은 준비 중입니다.");
  };

  return (
    <DashboardContainer>
      {/* 상단 헤더 */}
      <Header>
        <NetworkSelector>
          <NetworkIcon />
          <NetworkText>Ethereum</NetworkText>
        </NetworkSelector>
        
        <AccountInfo>
          <AccountIcon />
          <div>
            <AccountName>Account 1</AccountName>
            <AccountAddress>0xcEDBf...4926F</AccountAddress>
          </div>
        </AccountInfo>

        <TicketBalance onClick={() => navigate("/ad-ticket")}>
          <TicketIcon />
          <TicketAmount>{ticketBalance}</TicketAmount>
        </TicketBalance>
      </Header>

      {/* 잔액 섹션 */}
      <BalanceSection>
        <BalanceAmount>
          {showBalance ? "$6.29" : "****"}
          <EyeButton onClick={() => setShowBalance(!showBalance)} />
        </BalanceAmount>
        <BalanceChange>+$1.16 (+2.73%)</BalanceChange>
      </BalanceSection>

      {/* 배너 섹션 */}
      <BannerSection>
        <Banner>
          <BannerContent>
            <BannerLogo>very</BannerLogo>
            <BannerTitle>VERY Hackathon</BannerTitle>
            <BannerSubtitle>JUL-SEPT '25</BannerSubtitle>
            <BannerPrize>Prize Pool</BannerPrize>
            <BannerPrize>$73,000+13M $VERY</BannerPrize>
          </BannerContent>
          <BannerImage />
        </Banner>
        <BannerDots>
          <BannerDot active />
          <BannerDot />
          <BannerDot />
          <BannerDot />
          <BannerDot />
        </BannerDots>
      </BannerSection>

      {/* 탭 */}
      <TabSection>
        <Tab
          active={activeTab === "TOKEN"}
          onClick={() => setActiveTab("TOKEN")}
        >
          TOKEN
        </Tab>
        <Tab
          active={activeTab === "NFT"}
          onClick={() => setActiveTab("NFT")}
        >
          NFT
        </Tab>
      </TabSection>

      {/* 토큰 목록 */}
      <TokenList>
        {tokens.map((token, index) => (
          <TokenItem key={index}>
            <TokenIcon icon={token.icon} />
            <TokenDetails>
              <TokenName>{token.name}</TokenName>
              <TokenChange color={token.changeColor}>
                {token.change}
              </TokenChange>
            </TokenDetails>
            <TokenAmounts>
              <TokenAmount>{token.amount}</TokenAmount>
              <TokenPrice>{token.price}</TokenPrice>
            </TokenAmounts>
          </TokenItem>
        ))}
      </TokenList>

      {/* 토큰 추가 버튼 */}
      <AddTokenButton onClick={handleAddToken}>
        토큰 불러오기 / 추가하기
      </AddTokenButton>

      {/* 하단 네비게이션 */}
      <BottomNavigation>
        <NavItem active onClick={() => handleNavClick("wallet")}>
          <NavIcon icon={imgWallet} />
          <NavLabel active>Wallet</NavLabel>
        </NavItem>
        <NavItem onClick={() => handleNavClick("send")}>
          <NavIcon icon={imgDollarEuroExchange} />
          <NavLabel>Send / Recive</NavLabel>
        </NavItem>
        <NavItem onClick={() => handleNavClick("swap")}>
          <NavIcon icon={imgAroundTheGlobe} />
          <NavLabel>Swap / Bridge</NavLabel>
        </NavItem>
        <NavItem onClick={() => handleNavClick("transaction")}>
          <NavIcon icon={imgCryptoTradingSpot} />
          <NavLabel>Transaction</NavLabel>
        </NavItem>
        <NavItem onClick={() => handleNavClick("settings")}>
          <NavIcon icon={imgSettings} />
          <NavLabel>Setting</NavLabel>
        </NavItem>
      </BottomNavigation>
    </DashboardContainer>
  );
};

export default MainDashboard;