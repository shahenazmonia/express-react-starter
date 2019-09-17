import React, { StatelessComponent } from "react";
import moment from "moment";

import { Icon } from "antd";

interface IProps {
  createdAt: string;
  seenCount: number;
  commentNumber: number;
}

const BlogStats: StatelessComponent<IProps> = props => {
  const { createdAt, seenCount, commentNumber } = props;
  return (
    <React.Fragment>
      <span style={{ marginRight: 5 }}>
        <Icon type="calendar" />
        {moment(createdAt).format("DD/MM/YYYY")}
      </span>
      <span style={{ marginRight: 5 }}>
        <Icon type="eye" /> {seenCount}
      </span>
      <span style={{ marginRight: 5 }}>
        <Icon type="message" /> {commentNumber}
      </span>
    </React.Fragment>
  );
};

export default BlogStats;
