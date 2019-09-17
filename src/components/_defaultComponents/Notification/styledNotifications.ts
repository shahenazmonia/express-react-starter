import { Menu, Button, Popover } from "antd";
import styled from "styled-components";

export const Content = styled.p`
  color: black;
  font-weight: "500";
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const NotificationHeader = styled.h3`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 15px;
`;

export const NotificationTime = styled.h6`
  display: flex;
  justify-content: flex-end;
`;

export const NotificationFooter = styled.h3`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
  color: #40a9ff;
  cursor: pointer;
`;
