import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";

// 컴포넌트 import
import Header from "./components/Header";
import WalletDashboard from "./components/WalletDashboard";
import SendMoney from "./components/SendMoney";
import ReceiveMoney from "./components/ReceiveMoney";
import TransactionHistory from "./components/TransactionHistory";
import Settings from "./components/Settings";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

function App() {
  return (
    <AppContainer>
      <Router>
        <Routes>
          <Route path="/" element={<WalletDashboard />} />
          <Route
            path="/dashboard"
            element={
              <>
                <Header />
                <MainContent>
                  <div
                    style={{
                      padding: "20px",
                      maxWidth: "400px",
                      margin: "0 auto",
                      width: "100%",
                    }}
                  >
                    <h2>지갑 대시보드</h2>
                    <p>지갑이 생성되었습니다!</p>
                  </div>
                </MainContent>
              </>
            }
          />
          <Route
            path="/send"
            element={
              <>
                <Header />
                <MainContent>
                  <SendMoney />
                </MainContent>
              </>
            }
          />
          <Route
            path="/receive"
            element={
              <>
                <Header />
                <MainContent>
                  <ReceiveMoney />
                </MainContent>
              </>
            }
          />
          <Route
            path="/history"
            element={
              <>
                <Header />
                <MainContent>
                  <TransactionHistory />
                </MainContent>
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <Header />
                <MainContent>
                  <Settings />
                </MainContent>
              </>
            }
          />
        </Routes>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
              borderRadius: "10px",
              fontSize: "14px",
            },
          }}
        />
      </Router>
    </AppContainer>
  );
}

export default App;
