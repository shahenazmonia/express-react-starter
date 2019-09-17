import * as React from "react";
import { Table, TimePicker, Button } from "antd";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";

import {
  StyledTable,
  EmptyTableCell,
  MarkedTableCell,
  UnSelectableMarkedTableCell,
  UnAvailableCell,
  SelectedAppointment
} from "./styledCalender";

const { Column } = Table;

interface IProps {
  availabilityData: Array<{ day: Array<number>; time: string }>;
  clickedBox: string;
  duration: number;
  selectedDate: any;
  onSelectedDate: ({ sessionDate: string }) => any;
  appointmentDays: any;
}

interface IState {
  availabilityData: Array<{ day: Array<number>; time: string }> | [];
  appointment: { day: number; time: string; appointmentDate: any } | undefined;
}

class CalendarComponentClient extends React.Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      availabilityData: [],
      appointment: undefined
    };
  }
  componentDidMount() {
    this.setState({ availabilityData: this.props.availabilityData });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.availabilityData !== nextProps.availabilityData) {
      const { availabilityData } = nextProps;
      this.setState({ availabilityData });
    }
    if (this.props.selectedDate !== nextProps.selectedDate) this.clearAppointment();
    if (this.props.clickedBox !== nextProps.clickedBox) this.clearAppointment();
  }

  onSelectedAppointment = async ({ time, day, date }) => {
    const appointmentDate = moment(
      date.format("DD/MM/YYYY") + " " + time,
      "DD/MM/YYYY DDDD HH:mm"
    ).utc();
    this.setState({ appointment: { time, day, appointmentDate } });

    this.props.onSelectedDate({ sessionDate: appointmentDate });
  };

  clearAppointment = () => {
    this.setState({ appointment: undefined });
  };

  checkIfSessionTime = (appointmentDays, record, dayOfDate) => {
    let isSessionTime = false;
    appointmentDays.forEach(session => {
      const sessionBeginning = moment(session.sessionDate).local();
      const sessionEnd = moment(sessionBeginning).add(session.sessionDuration, "minutes");

      const cellBeginning = moment(record.time, "HH:mm");
      const cellEnd = moment(cellBeginning).add(30, "minutes");

      isSessionTime =
        sessionBeginning.day() === dayOfDate &&
        moment(sessionBeginning.format("HH:mm"), "HH:mm").isBefore(cellEnd) &&
        moment(sessionEnd.format("HH:mm"), "HH:mm").isAfter(cellBeginning);
    });

    return isSessionTime;
  };

  areNextCellsAvailable = (availabilityData, appointmentDays, record, dayOfDate, duration) => {
    const cellNumber = (duration - 30) / 30 > 0 ? (duration - 30) / 30 : 0;
    for (let i = 0; i <= cellNumber; i++) {
      const data = _.find(availabilityData, [
        "time",
        moment(record.time, "HH:mm")
          .add(i * 30, "minutes")
          .format("HH:mm")
      ]);
      const isCellAvailable =
        data &&
        _.includes(data.availableDays, dayOfDate) &&
        !this.checkIfSessionTime(
          appointmentDays,
          {
            ...record,
            time: moment(record.time, "HH:mm")
              .add(i * 30, "minutes")
              .format("HH:mm")
          },
          dayOfDate
        );
      //  console.log(i, data, dayOfDate, isCellAvailable);
      if (!isCellAvailable) return false;
    }
    return true;
  };

  renderColumn = (record: any, index: any, date) => {
    const { availabilityData } = this.state;
    const { appointmentDays, duration } = this.props;
    const { appointment } = this.state;

    const dayOfDate = date.day();

    //If Cell is selected
    if (appointment && appointment.day === dayOfDate) {
      const cellNumber = (duration - 30) / 30 > 0 ? (duration - 30) / 30 : 0;
      for (let i = 0; i <= cellNumber; i++) {
        const willBeSelected = moment(record.time, "HH:mm").isSame(
          moment(appointment.time, "HH:mm").add(i * 30, "minutes")
        );
        if (willBeSelected) return <SelectedAppointment />;
      }
    }

    //If there is an appointment
    if (appointmentDays && this.checkIfSessionTime(appointmentDays, record, dayOfDate))
      return <UnAvailableCell />;
    else if (record.availableDays.indexOf(dayOfDate) !== -1) {
      //If past date
      if (!moment().isSameOrBefore(moment(date), "day")) return <UnAvailableCell />;
      //If past day time
      else if (
        moment().isSame(moment(date), "day") &&
        record.availableDays.indexOf(dayOfDate) !== -1 &&
        moment(record.time, "HH:mm").isSameOrBefore(moment().add(15, "minutes"))
      )
        return <UnAvailableCell />;
      else {
        const areNextCellsAvailable = this.areNextCellsAvailable(
          availabilityData,
          appointmentDays,
          record,
          dayOfDate,
          duration
        );
        //  console.log("kkk: ", record.time, dayOfDate, areNextCellsAvailable);
        if (areNextCellsAvailable)
          return (
            <MarkedTableCell
              onClick={() =>
                this.onSelectedAppointment({
                  time: record.time,
                  day: dayOfDate,
                  date: moment(date)
                })
              }
            />
          );
        else return <UnSelectableMarkedTableCell />;
      }
    }
  };

  render() {
    const { availabilityData } = this.state;
    const { formatMessage } = this.props.intl;
    const { selectedDate, appointmentDays } = this.props;
    return (
      availabilityData.length !== 0 && (
        <StyledTable bordered dataSource={availabilityData} pagination={false} size={"small"}>
          <Column
            width={150}
            align="left"
            title={formatMessage({ id: "TIME" })}
            dataIndex="time"
            key="time"
          />
          <Column
            width={150}
            align="center"
            title={
              formatMessage({
                id: moment(selectedDate)
                  .local()
                  .format("dddd")
              }) +
              " " +
              moment(selectedDate)
                .local()
                .format("DD/MM/YYYY")
            }
            render={(record: any, index: any) =>
              this.renderColumn(record, index, moment(selectedDate).local())
            }
          />
          <Column
            width={150}
            align="center"
            title={
              formatMessage({
                id: moment(selectedDate)
                  .local()
                  .add(1, "d")
                  .format("dddd")
              }) +
              " " +
              moment(selectedDate)
                .local()
                .add(1, "d")
                .format("DD/MM/YYYY")
            }
            render={(record: any, index: any) =>
              this.renderColumn(
                record,
                index,
                moment(selectedDate)
                  .local()
                  .add(1, "d")
              )
            }
          />
          <Column
            width={150}
            align="center"
            title={
              formatMessage({
                id: moment(selectedDate)
                  .local()
                  .add(2, "d")
                  .format("dddd")
              }) +
              " " +
              moment(selectedDate)
                .local()
                .add(2, "d")
                .format("DD/MM/YYYY")
            }
            render={(record: any, index: any) =>
              this.renderColumn(
                record,
                index,
                moment(selectedDate)
                  .local()
                  .add(2, "d")
              )
            }
          />
          <Column
            width={150}
            align="center"
            title={
              formatMessage({
                id: moment(selectedDate)
                  .local()
                  .add(3, "d")
                  .format("dddd")
              }) +
              " " +
              moment(selectedDate)
                .local()
                .add(3, "d")
                .format("DD/MM/YYYY")
            }
            render={(record: any, index: any) =>
              this.renderColumn(
                record,
                index,
                moment(selectedDate)
                  .local()
                  .add(3, "d")
              )
            }
          />
          <Column
            width={150}
            align="center"
            title={
              formatMessage({
                id: moment(selectedDate)
                  .local()
                  .add(4, "d")
                  .format("dddd")
              }) +
              " " +
              moment(selectedDate)
                .local()
                .add(4, "d")
                .format("DD/MM/YYYY")
            }
            render={(record: any, index: any) =>
              this.renderColumn(
                record,
                index,
                moment(selectedDate)
                  .local()
                  .add(4, "d")
              )
            }
          />
          <Column
            width={150}
            align="center"
            title={
              formatMessage({
                id: moment(selectedDate)
                  .local()
                  .add(5, "d")
                  .format("dddd")
              }) +
              " " +
              moment(selectedDate)
                .local()
                .add(5, "d")
                .format("DD/MM/YYYY")
            }
            render={(record: any, index: any) =>
              this.renderColumn(
                record,
                index,
                moment(selectedDate)
                  .local()
                  .add(5, "d")
              )
            }
          />
          <Column
            width={150}
            align="center"
            title={
              formatMessage({
                id: moment(selectedDate)
                  .local()
                  .add(6, "d")
                  .format("dddd")
              }) +
              " " +
              moment(selectedDate)
                .local()
                .add(6, "d")
                .format("DD/MM/YYYY")
            }
            render={(record: any, index: any) =>
              this.renderColumn(
                record,
                index,
                moment(selectedDate)
                  .local()
                  .add(6, "d")
              )
            }
          />
        </StyledTable>
      )
    );
  }
}

const dispatchToProps = dispatch => {
  return {};
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(CalendarComponentClient));
