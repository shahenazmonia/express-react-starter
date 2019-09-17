import React, { StatelessComponent } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import history from "../../../_core/history";
import users from "../../../utility/constants/user";
import config from "../../../_core/config";

import { Row, Col, Avatar } from "antd";

interface IProps {
  creatorId: string;
  creatorRole: string;
  creatorName;
  createdAt: string;
  isClient?: boolean;
  creatorImage?: string;
}

const BlogCreatorDetail: StatelessComponent<IProps> = props => {
  const { creatorId, creatorRole, creatorName, createdAt, isClient, creatorImage } = props;
  const avatar = creatorImage && config.getBasePublicUrl() + "api/getFile/" + creatorImage;
  return (
    <Row type="flex" justify="space-between" align="middle">
      <Col>
        {isClient ? (
          <Link to={"/counselorProfile/" + creatorId}>
            <Avatar shape="square" size={40} src={avatar} icon={!avatar ? "user" : undefined} />
          </Link>
        ) : (
          <Avatar shape="square" size={40} src={avatar} icon={!avatar ? "user" : undefined} />
        )}
        {isClient && creatorRole === users.COUNSELOR ? (
          <span
            style={{ marginLeft: 10, cursor: "pointer" }}
            onClick={() => history.push("/counselorProfile/" + creatorId)}
          >
            {creatorName}
          </span>
        ) : (
          <span style={{ marginLeft: 10 }}>{creatorName}</span>
        )}
      </Col>
      <Col>{createdAt && moment(createdAt).format("DD/MM/YYYY")}</Col>
    </Row>
  );
};

export default BlogCreatorDetail;
