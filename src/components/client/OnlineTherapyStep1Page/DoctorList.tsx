import * as React from "react";
import { Card, Row, Col, Avatar, Rate, Button, DatePicker, TimePicker } from "antd";
import history from "../../../_core/history";
import { injectIntl, InjectedIntlProps } from "react-intl";
import config from "../../../_core/config";

interface IProps {
  counselorList?: any;
  clickedBox?: string;
  onInstantTherapyClick: (counselor: any) => any;
}

interface IState {}

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

class DoctorList extends React.Component<IProps & InjectedIntlProps, IState> {
  private time = React.createRef<TimePicker>();
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { counselorList, clickedBox } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div>
        {counselorList.map((counselor, i) => {
          const imageId = (counselor.profilePhoto || {})._id;
          const avatar = imageId ? config.getBasePublicUrl() + "api/getFile/" + imageId : undefined;
          return (
            <Card key={i} style={{ marginTop: 20 }}>
              <Row type="flex" justify="space-between" align="middle">
                <Col>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push(`/client/counselorProfile/${counselor._id}`)}
                  >
                    <Avatar
                      src={avatar}
                      icon={!avatar ? "user" : undefined}
                      shape="square"
                      size={128}
                    />
                  </span>
                  <span>
                    <h3>
                      {
                        120
                        //  counselor.totalSession
                      }
                    </h3>
                  </span>
                  <span>
                    <Rate
                      tooltips={desc}
                      value={
                        3
                        //  counselor.star
                      }
                    />
                  </span>
                </Col>
                <Col>
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <h3>
                      {counselor.fullname}
                      <span style={{ color: "blue", marginLeft: 10 }}>Online</span>
                      {/* {item.isOnline ? (
                        <span style={{ color: "blue", marginLeft: 10 }}>Online</span>
                      ) : (
                        <span style={{ color: "grey", marginLeft: 10 }}>Offline</span>
                      )} */}
                    </h3>
                    <h3 style={{ marginLeft: 10 }}>
                      {counselor.minPrice + " - " + counselor.maxPrice + " TL"}
                    </h3>
                  </span>
                  <span style={{ marginTop: 20 }}>
                    <h3>{counselor.coverLetter}</h3>
                  </span>
                </Col>
                <Col style={{ display: "flex", flexDirection: "column" }}>
                  {counselor.instantTherapy && (
                    <Button
                      type="primary"
                      ghost
                      disabled={!clickedBox ? true : false}
                      onClick={() => this.props.onInstantTherapyClick(counselor)}
                    >
                      {formatMessage({ id: "CLIENT_THERAPY_BUY_NOW" })}
                    </Button>
                  )}
                  <Button
                    type="primary"
                    ghost
                    onClick={() =>
                      history.push(
                        "/therapy/step2/" + counselor._id + (clickedBox ? "/" + clickedBox : "")
                      )
                    }
                    style={{ marginTop: 20 }}
                  >
                    {formatMessage({ id: "CLIENT_THERAPY_MAKE_APPOINTMENT" })}
                  </Button>
                </Col>
              </Row>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default injectIntl(DoctorList);
