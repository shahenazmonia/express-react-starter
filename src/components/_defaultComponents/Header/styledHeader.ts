import { Menu, Button, Popover } from "antd";
import styled from "styled-components";

export const HeaderMenu = styled.div`
  display: flex;
  justify-content: center !important;
  width: 100vw !important;
  height: 45px !important;
  font-size: 16px !important;
  line-height: 10px !important;
  background-color: white !important;
  border-bottom: 0px !important;
  .ksDfcC {
    display: flex;
    align-items: center;
  }
  .ant-col {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

export const MenuItem = styled(Menu.Item)`
  border-bottom: none !important;
`;

export const MenuButton: any = styled(Button)<{ inDefaultMainView: boolean; selected?: boolean }>`
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
  font-size: 16px !important;
  color: ${props =>
    props.inDefaultMainView
      ? props.theme.colors.primaryBlue
      : props.selected
      ? props.theme.colors.primaryBlue
      : "black"} !important;
`;

export const MenuPopover = styled(Popover)`
  cursor: pointer;
`;

export const NotificationContainer = styled.div``;
