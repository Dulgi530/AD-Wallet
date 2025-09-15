import React from "react";
import styled from "styled-components";

const SendContainer = styled.div`
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

const SendMoney = () => {
  return (
    <SendContainer>
      <PlaceholderCard>
        <h2>송금</h2>
        <p>Figma 디자인을 기다리는 중입니다...</p>
      </PlaceholderCard>
    </SendContainer>
  );
};

export default SendMoney;
