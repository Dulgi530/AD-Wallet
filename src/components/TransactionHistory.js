import React from "react";
import styled from "styled-components";

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PlaceholderCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #666;
`;

const TransactionHistory = () => {
  return (
    <HistoryContainer>
      <PlaceholderCard>
        <h2>거래 내역</h2>
        <p>Figma 디자인을 기다리는 중입니다...</p>
      </PlaceholderCard>
    </HistoryContainer>
  );
};

export default TransactionHistory;
