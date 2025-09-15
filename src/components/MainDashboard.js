import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import gasSponsorService from "../services/gasSponsor";

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
  background: #1d1818;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const PatternContainer = styled.div`
  position: absolute;
  left: 0;
  top: 837px;
  width: 412px;
  height: 80px;
  overflow: hidden;
`;

const PatternTop = styled.div`
  position: absolute;
  left: 0;
  top: calc(50% - 34.5px);
  transform: translateY(-50%);
  display: contents;
`;

const PatternBottom = styled.div`
  position: absolute;
  left: 0;
  top: calc(50% + 34.5px);
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

const Header = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TokenBalance = styled.div`
  position: absolute;
  left: 5px;
  top: 110px;
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: white;
  line-height: normal;
`;

const AccountInfo = styled.div`
  position: absolute;
  left: 151px;
  top: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AccountName = styled.div`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
  text-align: center;
`;

const AccountAddress = styled.div`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #999999;
  text-align: center;
`;

const TicketBalance = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  background: #3b3b3b;
  border-radius: 25px;
  height: 40px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const TicketIcon = styled.div`
  width: 25px;
  height: 25px;
  background-image: url("${imgImage3}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const TicketAmount = styled.div`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: white;
`;

const PortfolioChange = styled.div`
  position: absolute;
  left: 77.5px;
  top: 173.5px;
  transform: translateX(-50%) translateY(-50%);
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #3ae851;
  text-align: center;
`;

const ChartContainer = styled.div`
  position: absolute;
  left: 5px;
  top: 196px;
  width: 372px;
  height: 100px;
  background: #110b0b;
  overflow: hidden;
`;

const ChartImage = styled.div`
  position: absolute;
  left: 85px;
  top: 0;
  width: 201px;
  height: 100px;
  background-image: url("${imgImage10}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const ChartDots = styled.div`
  position: absolute;
  left: 171px;
  top: 301px;
  display: flex;
  gap: 15px;
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
`;

const EyeButton = styled.button`
  position: absolute;
  left: 125px;
  top: 122px;
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  background-image: url("${imgEye}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const TabContainer = styled.div`
  position: absolute;
  left: 60px;
  top: 336px;
  display: flex;
  gap: 10px;
`;

const Tab = styled.button`
  height: 51px;
  border: none;
  background: ${(props) => (props.active ? "#f29d38" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#f29d38")};
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 32px;
  cursor: pointer;
  padding: 0 20px;
  border-radius: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${(props) => (props.active ? "#f29d38" : "rgba(242, 157, 56, 0.1)")};
  }
`;

const TokenList = styled.div`
  position: absolute;
  left: 50%;
  top: 412px;
  transform: translateX(-50%);
  width: 412px;
`;

const TokenItem = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 0;
`;

const TokenIcon = styled.div`
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
  height: 25px;
  background-image: url("${(props) => props.icon}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const TokenName = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
  text-align: center;
`;

const TokenAmount = styled.div`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
  text-align: right;
`;

const TokenPrice = styled.div`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(calc(-50% + 20px));
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #999999;
  text-align: right;
`;

const TokenChange = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(calc(-50% + 20px));
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: ${(props) => props.color};
  text-align: center;
`;

const Divider = styled.div`
  position: absolute;
  left: 50%;
  top: 60px;
  transform: translateX(-50%);
  width: 372px;
  height: 1px;
  background-image: url("${imgLine42}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const AddTokenButton = styled.button`
  position: absolute;
  left: 50%;
  top: 592px;
  transform: translateX(-50%);
  width: 412px;
  height: 60px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #f29d38;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(242, 157, 56, 0.1);
  }
`;

const BottomNavigation = styled.div`
  position: absolute;
  left: 0;
  top: 837px;
  width: 412px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
`;

const NavItem = styled.button`
  width: 70px;
  height: 60px;
  background: ${(props) => (props.active ? "white" : "#5f5f5f")};
  border: none;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${(props) => (props.active ? "white" : "#6f6f6f")};
  }
`;

const NavIcon = styled.div`
  width: 30px;
  height: 30px;
  background-image: url("${(props) => props.icon}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const NavLabel = styled.div`
  font-family: "Mina", "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 10px;
  color: ${(props) => (props.active ? "#f29d38" : "black")};
  text-align: center;
  line-height: 1;
`;

const MainDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("TOKEN");
  const [showBalance, setShowBalance] = useState(true);
  const [ticketBalance, setTicketBalance] = useState(18);
  const [isGasSponsorActive, setIsGasSponsorActive] = useState(false);

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    initializeDashboard();
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

  // 패턴 도트들의 위치 데이터
  const patternDots = [
    { left: 20, top: "calc(50% - 34.5px)" },
    { left: 36, top: "calc(50% - 34.5px)" },
    { left: 0, top: "calc(50% - 34.5px)", width: "4px" },
    { left: 432, top: "calc(50% - 34.5px)" },
    { left: 784, top: "calc(50% - 34.5px)" },
    { left: 1136, top: "calc(50% - 34.5px)" },
    { left: 64, top: "calc(50% - 34.5px)" },
    { left: 608, top: "calc(50% - 34.5px)" },
    { left: 240, top: "calc(50% - 34.5px)" },
    { left: 1312, top: "calc(50% - 34.5px)" },
    { left: 168, top: "calc(50% - 34.5px)" },
    { left: 520, top: "calc(50% - 34.5px)" },
    { left: 872, top: "calc(50% - 34.5px)" },
    { left: 1224, top: "calc(50% - 34.5px)" },
    { left: 344, top: "calc(50% - 34.5px)" },
    { left: 696, top: "calc(50% - 34.5px)" },
    { left: 1048, top: "calc(50% - 34.5px)" },
    { left: 1400, top: "calc(50% - 34.5px)" },
    { left: 1532, top: "calc(50% - 34.5px)" },
    { left: 124, top: "calc(50% - 34.5px)" },
    { left: 476, top: "calc(50% - 34.5px)" },
    { left: 828, top: "calc(50% - 34.5px)" },
    { left: 1180, top: "calc(50% - 34.5px)" },
    { left: 300, top: "calc(50% - 34.5px)" },
    { left: 652, top: "calc(50% - 34.5px)" },
    { left: 1004, top: "calc(50% - 34.5px)" },
    { left: 1356, top: "calc(50% - 34.5px)" },
    { left: 1488, top: "calc(50% - 34.5px)" },
    { left: 212, top: "calc(50% - 34.5px)" },
    { left: 564, top: "calc(50% - 34.5px)" },
    { left: 916, top: "calc(50% - 34.5px)" },
    { left: 1268, top: "calc(50% - 34.5px)" },
    { left: 388, top: "calc(50% - 34.5px)" },
    { left: 740, top: "calc(50% - 34.5px)" },
    { left: 1092, top: "calc(50% - 34.5px)" },
    { left: 1444, top: "calc(50% - 34.5px)" },
    { left: 1576, top: "calc(50% - 34.5px)" },
    { left: 1620, top: "calc(50% - 34.5px)" },
  ];

  const bottomPatternDots = patternDots.map((dot) => ({
    ...dot,
    top: "calc(50% + 34.5px)",
  }));

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
      changeColor: "#f83f3f",
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
        <TokenBalance>
          {showBalance ? "$6.29" : "****"}
        </TokenBalance>
        
        <AccountInfo>
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundImage: `url("${imgFrame58}")`,
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

        <TicketBalance onClick={() => navigate("/ad-ticket")}>
          <TicketIcon />
          <TicketAmount>{ticketBalance}</TicketAmount>
        </TicketBalance>
      </Header>

      {/* 포트폴리오 변화 */}
      <PortfolioChange>+$1.16 (+2.73%)</PortfolioChange>

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

      {/* 잔액 표시/숨김 버튼 */}
      <EyeButton onClick={() => setShowBalance(!showBalance)} />

      {/* 탭 */}
      <TabContainer>
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
      </TabContainer>

      {/* 토큰 목록 */}
      <TokenList>
        {tokens.map((token, index) => (
          <TokenItem key={index}>
            <TokenIcon icon={token.icon} />
            <TokenName>{token.name}</TokenName>
            <TokenAmount>{token.amount}</TokenAmount>
            <TokenPrice>{token.price}</TokenPrice>
            <TokenChange color={token.changeColor}>
              {token.change}
            </TokenChange>
            <Divider />
          </TokenItem>
        ))}
      </TokenList>

      {/* 토큰 추가 버튼 */}
      <AddTokenButton onClick={handleAddToken}>
        토큰 불러오기 / 추가하기
      </AddTokenButton>

      {/* 하단 네비게이션 */}
      <BottomNavigation>
        <NavItem
          active={true}
          onClick={() => handleNavClick("wallet")}
        >
          <NavIcon icon={imgWallet} />
          <NavLabel active={true}>Wallet</NavLabel>
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

      {/* 하단 패턴 */}
      <PatternContainer>
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
      </PatternContainer>
    </DashboardContainer>
  );
};

export default MainDashboard;
