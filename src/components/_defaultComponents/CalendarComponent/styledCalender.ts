import styled from "styled-components";
import colors from "../../../styles/index";
import { Table } from "antd";

export const EmptyTableCell = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const MarkedTableCell = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.primaryBlue};
  // background: repeating-linear-gradient(45deg, #606dbc, #606dbc 10px, #465298 10px, #465298 20px);
`;

export const UnSelectableMarkedTableCell = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.primaryBlue};
  cursor: not-allowed;
`;

export const UnAvailableCell = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.lightGray};
  cursor: not-allowed;
`;

export const SelectedAppointment = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.secondaryGreen};
  cursor: pointer;
`;

export const StyledTable: any = styled(Table)`
  .ant-table-tbody>tr: hover {
    background-color: #ffffff;
  }

  .ant-table-tbody {
    color: black;
  }

  .ant-table-tbody ::selection {
    background-color: transparent;
    color: black;
  }

  .ant-table-bordered 
  .ant-table-tbody > tr > td: hover {
    background-color: #9adda4;
    cursor: pointer;
  }

  .ant-table-bordered .ant-table-thead > tr > th,
  .ant-table-bordered .ant-table-tbody > tr > td {
    word-wrap: break-word;
    word-break: break-all;
    position: relative;
  }
`;
