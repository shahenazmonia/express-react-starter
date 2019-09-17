import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import moment from "moment";
import _ from "lodash";
import { Row, Col, Button } from "antd";
import * as sessionActions from "../../../store/actions/sessionActions";

interface IProps {
  jitsi: any;
  user: any;
  closestSession: any;
  createTokenForVideo: (params: { room: string; exp: number }) => any;
  getClosestSession: (params: { userId: string; role: string }) => any;
}

interface IState {
  openMeeting: boolean;
  countDown: any;
}

class JitsiPage extends Component<InjectedIntlProps & IProps, IState> {
  jitsiRef: any;
  api: any;
  countDown: any;
  intervalId: any;
  constructor(props) {
    super(props);
    this.jitsiRef = React.createRef();
    this.state = {
      openMeeting: false,
      countDown: 0
    };
  }

  jitsiCreateRoom = () => {
    const { roomName, expiryTime } = this.props.jitsi;
    const { createTokenForVideo } = this.props;
    createTokenForVideo({ room: roomName, exp: expiryTime }).then(result => {
      const token = result.action.payload.data.token;
      const options = {
        roomName: roomName,
        width: 640,
        height: 360,
        noSSL: false,
        parentNode: this.jitsiRef.current,
        // https://github.com/jitsi/jitsi-meet/blob/master/config.js
        //configOverwrite:{},
        // https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js
        interfaceConfigOverwrite: {
          DEFAULT_BACKGROUND: "#74799",
          INITIAL_TOOLBAR_TIMEOUT: 5000,
          TOOLBAR_TIMEOUT: 2000,
          //filmStripOnly: true,
          SHOW_JITSI_WATERMARK: false,
          JITSI_WATERMARK_LINK: "https://terapi.org",
          SHOW_WATERMARK_FOR_GUESTS: false,
          DISPLAY_WELCOME_PAGE_CONTENT: false,
          AUTHENTICATION_ENABLE: false,
          MOBILE_APP_PROMO: false,
          CONNECTION_INDICATOR_DISABLED: true
        },
        jwt: token
      };
      // https://github.com/jitsi/jitsi-meet/blob/master/doc/api.md
      // @ts-ignore
      this.api = new window.JitsiMeetExternalAPI("jitsi1.webseans.com", options);
      // todo: will be set with an information from the session
      this.api.executeCommand("displayName", "terapi-görüşme");
      // todo: will be set with an information from the session
      this.api.executeCommand("subject", "konu: üzüntü");
    });
  };

  async componentDidMount() {
    document.addEventListener(
      "contextmenu",
      function(e) {
        e.preventDefault();
      },
      false
    );
    await this.props.getClosestSession({
      userId: this.props.user._id,
      role: this.props.user.roles[0]
    });

    const { user } = this.props;
    const { sessionTimeDiff, clientId, counselorId } = this.props.closestSession;

    if (this.state.openMeeting === false) {
      this.setState({ openMeeting: true });
      this.jitsiCreateRoom();
    }

    if (_.includes(user.roles, "client") && user._id !== clientId) {
      window.close();
    } else if (_.includes(user.roles, "counselor") && user._id !== counselorId) {
      window.close();
    } else {
      this.countDown = moment.duration(sessionTimeDiff);
      this.intervalId = setInterval(this.timeControl, 1000);
    }
  }

  timeControl = async () => {
    const { status } = this.props.closestSession;
    this.countDown = this.countDown.add(-1, "seconds");
    this.setState({
      countDown: {
        hours: this.countDown.hours(),
        minutes: this.countDown.minutes(),
        seconds: this.countDown.seconds()
      }
    });
    if (status === "pending") {
      if (this.countDown <= 0) {
        await this.props.getClosestSession({
          userId: this.props.user._id,
          role: this.props.user.roles[0]
        });
        const { sessionTimeDiff } = this.props.closestSession;
        this.countDown = moment.duration(sessionTimeDiff);
      }
    } else if (status === "live") {
      if (this.countDown >= 5 && status === "live" && !this.state.openMeeting) {
        await this.props.getClosestSession({
          userId: this.props.user._id,
          role: this.props.user.roles[0]
        });
        const { sessionTimeDiff } = this.props.closestSession;
        this.countDown = moment.duration(sessionTimeDiff);
      }
      //+30
      if (this.countDown <= -1800000 && status === "live") {
        window.close();
      }
    }
  };

  componentWillUnmount(): void {
    if (this.api) {
      this.api.dispose();
      delete this.api;
    }

    document.removeEventListener(
      "contextmenu",
      function(e) {
        e.preventDefault();
      },
      false
    );
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { status } = this.props.closestSession;
    const { countDown, openMeeting } = this.state;
    const { roles } = this.props.user;
    return (
      <React.Fragment>
        {openMeeting &&
          status === "live" &&
          _.includes(roles, "counselor") &&
          this.countDown <= 300000 &&
          this.countDown >= 0 && (
            <Row
              type="flex"
              justify="center"
              style={{ backgroundColor: "#E60000", opacity: 0.8, padding: 10 }}
            >
              <Col>
                <h3 style={{ color: "white" }}>
                  Seansın bitmesine kalan süre {countDown.minutes} : {countDown.seconds}
                </h3>
              </Col>
            </Row>
          )}
        {!openMeeting && status === "completed" && !this.countDown && <h3>Seans dışındasınız.</h3>}
        {openMeeting && (
          <Row type="flex" justify="center" gutter={8}>
            <Col span={18}>
              <Row type="flex" justify="center">
                <div ref={this.jitsiRef} />
              </Row>
            </Col>
            <Col span={24} />
            <Col>
              <Button
                onClick={e => {
                  this.api.executeCommand("toggleAudio");
                }}
              >
                toggleAudio
              </Button>
            </Col>
            <Col>
              <Button
                onClick={e => {
                  this.api.executeCommand("toggleVideo");
                }}
              >
                toggleVideo
              </Button>
            </Col>
            <Col>
              <Button
                onClick={e => {
                  this.api.executeCommand("toggleFilmStrip");
                }}
              >
                toggleFilmStrip
              </Button>
            </Col>
            <Col>
              <Button
                onClick={e => {
                  this.api.executeCommand("toggleChat");
                }}
              >
                toggleChat
              </Button>
            </Col>
            <Col>
              <Button
                onClick={e => {
                  this.api.executeCommand("toggleShareScreen");
                }}
              >
                toggleShareScreen
              </Button>
            </Col>
            <Col>
              <Button
                onClick={e => {
                  this.api.executeCommand("hangup");
                }}
              >
                hangup
              </Button>
            </Col>
          </Row>
        )}
      </React.Fragment>
    );
  }
}

const stateToProps = state => {
  return {
    jitsi: state.jitsi,
    user: state.user,
    closestSession: state.closestSession
  };
};

const dispatchToProps = dispatch => {
  return {
    createTokenForVideo: params => dispatch(sessionActions.createTokenForVideo(params)),
    getClosestSession: params => dispatch(sessionActions.getClosestSession(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(JitsiPage));
