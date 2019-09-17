import React, { StatelessComponent } from "react";
import styled from "styled-components";

const Content = styled.div`
  margin-top: 30px;
`;

const Title = styled.h3`
  color: #000;
`;

const Promotion: StatelessComponent<{}> = props => {
  return (
    <Content style={{ marginBottom: 20 }}>
      <Title>Nasıl Çalışır?</Title>
      <video id="myVideo" controls preload="auto" width="100%">
        <source src={"../../../videos/Background.mp4"} type="video/mp4" />
      </video>
    </Content>
  );
};

export default Promotion;
