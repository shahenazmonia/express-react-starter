import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import moment from "moment";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { weeklyCounselorData } from "../../../utility/constants/weekly";
import * as alertActions from "../../../store/actions/alertActions";
import * as availabilityCalendarActions from "../../../store/actions/availabilityCalendarActions";
import CalendarComponentCounselor from "../../_defaultComponents/CalendarComponent/CalendarComponentCounselor";

import { Row, Col, Button, Card } from "antd";

interface IProps {
  user: any;
  getCounselorAvailability: (params: { counselorId: string }) => any;
  updateCounselorAvailability: (params: {
    counselorId: string;
    availability: Array<{ day: Array<number>; time: string }>;
  }) => any;
  showInfo: (params: any) => any;
}

interface IState {
  availabilityData: Array<{ day: Array<number>; time: string }> | any;
}

class CalendarPlan extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      availabilityData: weeklyCounselorData
    };
  }

  componentDidMount() {
    this.getCounselorAvailability();
  }

  getCounselorAvailability = async () => {
    const { _id } = this.props.user;
    try {
      const counselorAvailability = await this.props.getCounselorAvailability({
        counselorId: _id
      });
      this.replaceAvailability({ data: counselorAvailability.action.payload.data });
    } catch (err) {
      // console.log(err);
    }
  };

  localizeAvailabilityData = data => {
    let localizedAvailabiltyData: any = [];
    data.forEach(element => {
      element.availableDays.forEach(availableDay => {
        const localDate = moment.utc(element.time + " " + availableDay, "HH:mm d").local();
        localizedAvailabiltyData.push({ day: localDate.day(), time: localDate.format("HH:mm") });
      });
    });
    const regroupedAvailabilityData = _.chain(localizedAvailabiltyData)
      .groupBy(data => data.time)
      .map((value, key) => ({ time: key, availableDays: value.map(obj => obj.day) }))
      .value();
    // console.log(regroupedAvailabilityData);
    return regroupedAvailabilityData;
  };

  generalizeAvailabilityData = data => {
    let generalizedAvailabilityData: any = [];
    data.forEach(element => {
      element.availableDays.forEach(availableDay => {
        const utcDate = moment(element.time + " " + availableDay, "HH:mm d").utc();
        generalizedAvailabilityData.push({ day: utcDate.day(), time: utcDate.format("HH:mm") });
      });
    });
    const regroupedAvailabilityData = _.chain(generalizedAvailabilityData)
      .groupBy(data => data.time)
      .map((value, key) => ({ time: key, availableDays: value.map(obj => obj.day) }))
      .value();
    // console.log(regroupedAvailabilityData);
    return regroupedAvailabilityData;
  };

  replaceAvailability = async ({ data }) => {
    const { availabilityData } = this.state;
    const localizedAvailabiltyData = await this.localizeAvailabilityData(data);

    await localizedAvailabiltyData.forEach(async (element, i) => {
      const index = await _.findIndex(availabilityData, { time: element.time });
      availabilityData[index] = { ...localizedAvailabiltyData[i] };
    });
    this.setState({ availabilityData: [...this.state.availabilityData] });
  };

  updateAvailability = async ({ availabilityData }) => {
    const { formatMessage } = this.props.intl;
    const { _id } = this.props.user;
    const replaceAvailabilitiyData = await availabilityData.filter(obj => {
      return !_.isEmpty(obj.availableDays) && obj;
    });
    const generalizedAvailabilityData = await this.generalizeAvailabilityData(
      replaceAvailabilitiyData
    );
    try {
      await this.props.updateCounselorAvailability({
        counselorId: _id,
        availability: generalizedAvailabilityData
      });

      this.props.showInfo({
        title: formatMessage({ id: "SUCCESSFUL" }),
        body: formatMessage({ id: "UPDATE_SUCCESSFUL" }),
        actionFunc: () => {}
      });
    } catch (err) {
      // console.log(err);
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { availabilityData } = this.state;
    return (
      <Row type="flex" justify="center">
        <Col span={16}>
          <CalendarComponentCounselor
            availabilityData={availabilityData}
            updateAvailability={this.updateAvailability}
          />
        </Col>
      </Row>
    );
  }
}
const stateToProps = state => {
  return {
    user: state.user
  };
};

const dispatchToProps = dispatch => {
  return {
    getCounselorAvailability: params =>
      dispatch(availabilityCalendarActions.getCounselorAvailability(params)),
    updateCounselorAvailability: params =>
      dispatch(availabilityCalendarActions.updateCounselorAvailability(params)),
    showInfo: params => dispatch(alertActions.showInfo(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(CalendarPlan));
