import { Row, Select } from "antd";
import React, {StatelessComponent, useEffect, useState} from "react";
const shipmentStatusList  = [
  {
      key: "ACTIVE",
      value: "active",
  },
  {
      key: "COMPLETED",
      value: "completed",
  },
  {
      key: "CANCELED",
      value: "canceled",
  },
];

interface IProps {
    onStatusSelect: (value: any) => void;
    selectedStatus: any;
}

const SortByStatus: StatelessComponent<IProps> = ({ selectedStatus, onStatusSelect }) => {

    return (<Row type="flex">
          <Select onChange={onStatusSelect} value={selectedStatus}>
     {shipmentStatusList.map((status) =>
     <Select.Option
     key={status.key}
     value={status.value}>
         {status.value}
     </Select.Option>)}
    </Select>
    </Row>);

};

export default SortByStatus;
