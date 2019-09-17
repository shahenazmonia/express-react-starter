import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";
import { weeklyCounselorData } from "../../../utility/constants/weekly";
import history from "../../../_core/history";
import categoryHelper from "../../../utility/categoryHelper";
import * as userActions from "../../../store/actions/userActions";
import * as counselorActions from "../../../store/actions/counselorActions";
import * as sessionActions from "../../../store/actions/sessionActions";
import * as counselorCategoryActions from "../../../store/actions/counselorCategoryActions";
import * as availabilityCalendarActions from "../../../store/actions/availabilityCalendarActions";
import * as alertActions from "../../../store/actions/alertActions";
import { ShowAlertParams, ShowInfoAction, showWarning } from "../../../store/actions/alertActions";
import SessionSubCategory from "../../_defaultComponents/SessionSubCategory";
import CalendarComponentClient from "../../_defaultComponents/CalendarComponent/CalendarComponentClient";

import { Row, Col, Button, DatePicker, Input } from "antd";

interface IProps {
  user: any;
  category?: string;
  language: string;
  createSession: (params: any) => any;
  getClientIdByEmail: (params: { email: string | undefined }) => any;
  getCounselorInfo: (params: any) => any;
  showConfirm: (ShowAlertParams) => ShowInfoAction;
  showInfo: (ShowAlertParams) => ShowInfoAction;
  showWarning: (ShowAlertParams) => ShowInfoAction;
  getCounselorCategories: (params: any) => any;
  getEffectivePrice: (params: any) => any;
  getCounselorAvailabilityForClient: (params: { counselorId: string; selectedDate: string }) => any;
}

interface IState {
  counselorCategories: any;
  clickedBox: string;
  sessionDate: any | undefined;
  availabilityData: Array<{ day: Array<number>; time: string }> | any;
  selectedDate: any;
  appointmentDays: any;
  clientEmail: string | undefined;
}

class Invitation extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      counselorCategories: [],
      clickedBox: "",
      sessionDate: undefined,
      availabilityData: weeklyCounselorData,
      selectedDate: moment().utc(),
      appointmentDays: undefined,
      clientEmail: undefined
    };
  }

  componentDidMount() {
    const { selectedDate } = this.state;
    // const { category } = this.props;
    const { _id } = this.props.user;
    let counselorId = _id;
    this.fetchCounselorInfo({ counselorId });
    this.getCounselorAvailabilityForClient({ counselorId, selectedDate });
  }

  getCounselorAvailabilityForClient = async ({ counselorId, selectedDate }) => {
    try {
      const counselorAvailability = await this.props.getCounselorAvailabilityForClient({
        counselorId,
        selectedDate
      });
      this.replaceAvailability({
        data: counselorAvailability.action.payload.data.counselorAvailableDays
      });
      this.setState({ appointmentDays: counselorAvailability.action.payload.data.appointmentDays });
    } catch (err) {
      // console.log(err);
    }
  };

  replaceAvailability = async ({ data }) => {
    const { availabilityData } = this.state;
    await data.forEach(async (element, i) => {
      const index = await _.findIndex(availabilityData, { time: element.time });
      availabilityData[index] = { ...data[i] };
    });
    this.setState({ availabilityData: [...this.state.availabilityData] });
  };

  async fetchCounselorInfo({ counselorId }) {
    try {
      const counselorCategories = (await this.props.getCounselorCategories({
        counselorId,
        isCategoryUsed: true
      })).action.payload.data;
      this.setState({
        counselorCategories
      });
    } catch (err) {
      console.log(err);
    }
  }

  onBoxClick = ({ category }) => {
    this.setState({ clickedBox: category.value });
  };

  onSelectedDate = ({ sessionDate }) => {
    this.setState({ sessionDate });
  };

  fetchClientEmail = async ({}) => {
    const { formatMessage } = this.props.intl;
    const { sessionDate } = this.state;
    if (sessionDate)
      this.props.showConfirm({
        title: formatMessage({ id: "EMAIL" }),
        body: (
          <Input
            type="email"
            name={"clientEmail"}
            onChange={e => this.setState({ clientEmail: e.target.value })}
          />
        ),
        actionFunc: async () => {
          const clientId = (await this.props.getClientIdByEmail({ email: this.state.clientEmail }))
            .action.payload.data._id;
          this.onSessionCreate({ clientId });
        }
      });
    else
      this.props.showWarning({
        title: formatMessage({ id: "WARNING" }),
        body: formatMessage({ id: "WARNING_SESSION_TIME" }),
        actionFunc: async () => {}
      });
  };

  onSessionCreate = async ({ clientId }) => {
    const { counselorCategories, clickedBox, sessionDate } = this.state;
    const { _id, clinicId } = this.props.user;
    const { formatMessage } = this.props.intl;
    const category = categoryHelper.findCategoryInfo(counselorCategories, clickedBox);
    const sessionPrice = category.effectivePrice;
    const sessionDuration = category.sessionDuration;

    await this.props.createSession({
      sessionInfo: {
        clientId,
        counselorId: _id,
        clinicId,
        category: clickedBox,
        sessionDuration,
        sessionDate,
        sessionType: "invitation",
        sessionPrice
      }
    });
    this.props.showInfo({
      title: formatMessage({ id: "SUCCESS" }),
      body: formatMessage({ id: "INVITATION_LINK" }),
      actionFunc: () => {
        history.push("/counselor/sessions");
      }
    });
  };

  onChangeDate = async date => {
    const { _id } = this.props.user;
    const counselorId = _id;
    const selectedDate = await moment(date).utc();
    await this.setState({
      selectedDate
    });
    await this.getCounselorAvailabilityForClient({ counselorId, selectedDate });
  };

  render() {
    const {
      counselorCategories,
      clickedBox,
      availabilityData,
      selectedDate,
      appointmentDays
    } = this.state;
    const { language } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <React.Fragment>
        <Row type="flex" justify="center">
          <Col span={16}>
            <SessionSubCategory
              categories={counselorCategories}
              onBoxClick={this.onBoxClick.bind(this)}
              clickedBox={clickedBox}
              language={language}
            />
          </Col>
          {clickedBox && (
            <React.Fragment>
              <Col
                span={16}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 20,
                  marginTop: 20
                }}
              >
                <DatePicker
                  format={"DD/MM/YYYY"}
                  defaultValue={moment()}
                  allowClear={false}
                  onChange={this.onChangeDate}
                  placeholder="Tarih seçiniz"
                />
              </Col>
              <Col span={16}>
                <CalendarComponentClient
                  availabilityData={availabilityData}
                  clickedBox={clickedBox}
                  duration={categoryHelper.findCategoryDuration(counselorCategories, clickedBox)}
                  selectedDate={selectedDate}
                  onSelectedDate={this.onSelectedDate}
                  appointmentDays={appointmentDays}
                />
              </Col>
              <Col
                span={16}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 20,
                  marginBottom: 20
                }}
              >
                <Button type="primary" ghost onClick={this.fetchClientEmail}>
                  {formatMessage({ id: "SEND_INVITATION" })}
                </Button>
              </Col>
            </React.Fragment>
          )}
        </Row>
      </React.Fragment>
    );
  }
}

const stateToProps = state => {
  return {
    language: state.locale.language,
    user: state.user
  };
};

const dispatchToProps = dispatch => {
  return {
    getClientIdByEmail: params => dispatch(userActions.getClientIdByEmail(params)),
    createSession: params => dispatch(sessionActions.createSession(params)),
    getCounselorInfo: params => dispatch(counselorActions.getCounselorInfo(params)),
    getCounselorCategories: params =>
      dispatch(counselorCategoryActions.getCounselorCategories(params)),
    showConfirm: params => dispatch(alertActions.showConfirm(params)),
    showInfo: params => dispatch(alertActions.showInfo(params)),
    showWarning: params => dispatch(alertActions.showWarning(params)),
    getEffectivePrice: params => dispatch(counselorActions.getEffectivePrice(params)),
    getCounselorAvailabilityForClient: params =>
      dispatch(availabilityCalendarActions.getCounselorAvailabilityForClient(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(Invitation));
