import * as React from "react";
import { Table, TimePicker, Button } from "antd";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import _ from "lodash";

import { StyledTable, EmptyTableCell, MarkedTableCell } from "./styledCalender";

declare global {
  interface Window {
    getSelection(): any;
  }
}

const { Column } = Table;

interface IProps {
  availabilityData: Array<{ day: Array<number>; time: string }> | any;
  updateAvailability?: ({ availabilityData: any }) => void;
}

interface IState {
  availabilityData: Array<{ day: Array<number>; time: string }> | any;
  startTime: { day: string; time: string } | undefined;
}

class CalendarComponentCounselor extends React.Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      availabilityData: [],
      startTime: undefined
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (this.props.availabilityData !== nextProps.availabilityData) {
      const { availabilityData } = nextProps;
      this.setState({ availabilityData });
    }
  }

  onStartTime = async (record, day) => {
    await this.setState({ startTime: { day, time: record.time } });
  };

  onEndTime = async (record, day) => {
    const { startTime, availabilityData } = this.state;
    const startDay = startTime ? startTime.day : undefined;
    const startDataIndex = await _.findIndex(availabilityData, {
      time: startTime && startTime.time
    });
    const endDataIndex = await _.findIndex(availabilityData, { time: record.time });
    for (let i = 0; i < availabilityData.length; i++) {
      if (i >= startDataIndex && i <= endDataIndex) {
        if (availabilityData[i].availableDays.indexOf(startDay) === -1) {
          await availabilityData[i].availableDays.push(startDay);
        } else {
          const indexAvailability = await availabilityData[i].availableDays.indexOf(startDay);
          availabilityData[i].availableDays.splice(indexAvailability, 1);
        }
      }
    }

    this.setState({ availabilityData }, () => {
      if (window.getSelection) {
        if (window.getSelection().empty) {
          // Chrome
          window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {
          // Firefox
          window.getSelection().removeAllRanges();
        }
      }
    });
  };

  onUpdateAvailability = () => {
    const { availabilityData } = this.state;
    const { updateAvailability } = this.props;
    updateAvailability && updateAvailability({ availabilityData });
  };

  render() {
    const { availabilityData } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <StyledTable
          bordered={true}
          dataSource={[...availabilityData]}
          pagination={false}
          size="small"
        >
          <Column
            width={100}
            align="left"
            title={formatMessage({ id: "TIME" })}
            dataIndex="time"
            key="time"
          />
          <Column
            width={100}
            align="center"
            title={formatMessage({ id: "Monday" })}
            render={(record: any, index: any) => {
              return (
                <React.Fragment>
                  {record.availableDays.indexOf(1) !== -1 && (
                    <MarkedTableCell
                      onMouseUp={() => this.onEndTime(record, 1)}
                      onMouseDown={() => this.onStartTime(record, 1)}
                    />
                  )}
                  {record.availableDays.indexOf(1) === -1 && (
                    <EmptyTableCell
                      onMouseUp={() => this.onEndTime(record, 1)}
                      onMouseDown={() => this.onStartTime(record, 1)}
                    />
                  )}
                </React.Fragment>
              );
            }}
          />
          <Column
            width={100}
            align="center"
            title={formatMessage({ id: "Tuesday" })}
            render={(record: any, index: any) => {
              return (
                <React.Fragment>
                  {record.availableDays.indexOf(2) !== -1 && (
                    <MarkedTableCell
                      onMouseUp={() => this.onEndTime(record, 2)}
                      onMouseDown={() => this.onStartTime(record, 2)}
                    />
                  )}
                  {record.availableDays.indexOf(2) === -1 && (
                    <EmptyTableCell
                      onMouseUp={() => this.onEndTime(record, 2)}
                      onMouseDown={() => this.onStartTime(record, 2)}
                    />
                  )}
                </React.Fragment>
              );
            }}
          />
          <Column
            width={100}
            align="center"
            title={formatMessage({ id: "Wednesday" })}
            render={(record: any, index: any) => {
              return (
                <React.Fragment>
                  {record.availableDays.indexOf(3) !== -1 && (
                    <MarkedTableCell
                      onMouseUp={() => this.onEndTime(record, 3)}
                      onMouseDown={() => this.onStartTime(record, 3)}
                    />
                  )}
                  {record.availableDays.indexOf(3) === -1 && (
                    <EmptyTableCell
                      onMouseUp={() => this.onEndTime(record, 3)}
                      onMouseDown={() => this.onStartTime(record, 3)}
                    />
                  )}
                </React.Fragment>
              );
            }}
          />
          <Column
            width={100}
            align="center"
            title={formatMessage({ id: "Thursday" })}
            render={(record: any, index: any) => {
              return (
                <React.Fragment>
                  {record.availableDays.indexOf(4) !== -1 && (
                    <MarkedTableCell
                      onMouseUp={() => this.onEndTime(record, 4)}
                      onMouseDown={() => this.onStartTime(record, 4)}
                    />
                  )}
                  {record.availableDays.indexOf(4) === -1 && (
                    <EmptyTableCell
                      onMouseUp={() => this.onEndTime(record, 4)}
                      onMouseDown={() => this.onStartTime(record, 4)}
                    />
                  )}
                </React.Fragment>
              );
            }}
          />
          <Column
            width={100}
            align="center"
            title={formatMessage({ id: "Friday" })}
            render={(record: any, index: any) => {
              return (
                <React.Fragment>
                  {record.availableDays.indexOf(5) !== -1 && (
                    <MarkedTableCell
                      onMouseUp={() => this.onEndTime(record, 5)}
                      onMouseDown={() => this.onStartTime(record, 5)}
                    />
                  )}
                  {record.availableDays.indexOf(5) === -1 && (
                    <EmptyTableCell
                      onMouseUp={() => this.onEndTime(record, 5)}
                      onMouseDown={() => this.onStartTime(record, 5)}
                    />
                  )}
                </React.Fragment>
              );
            }}
          />
          <Column
            width={100}
            align="center"
            title={formatMessage({ id: "Saturday" })}
            render={(record: any, index: any) => {
              return (
                <React.Fragment>
                  {record.availableDays.indexOf(6) !== -1 && (
                    <MarkedTableCell
                      onMouseUp={() => this.onEndTime(record, 6)}
                      onMouseDown={() => this.onStartTime(record, 6)}
                    />
                  )}
                  {record.availableDays.indexOf(6) === -1 && (
                    <EmptyTableCell
                      onMouseUp={() => this.onEndTime(record, 6)}
                      onMouseDown={() => this.onStartTime(record, 6)}
                    />
                  )}
                </React.Fragment>
              );
            }}
          />
          <Column
            width={100}
            align="center"
            title={formatMessage({ id: "Sunday" })}
            render={(record: any, index: any) => {
              return (
                <React.Fragment>
                  {record.availableDays.indexOf(0) !== -1 && (
                    <MarkedTableCell
                      onMouseUp={() => this.onEndTime(record, 0)}
                      onMouseDown={() => this.onStartTime(record, 0)}
                    />
                  )}
                  {record.availableDays.indexOf(0) === -1 && (
                    <EmptyTableCell
                      onMouseUp={() => this.onEndTime(record, 0)}
                      onMouseDown={() => this.onStartTime(record, 0)}
                    />
                  )}
                </React.Fragment>
              );
            }}
          />
        </StyledTable>
        <Button
          onClick={() => this.onUpdateAvailability()}
          type="primary"
          ghost
          style={{ marginTop: 20, width: 100, marginBottom: 20 }}
        >
          {formatMessage({ id: "UPDATE" })}
        </Button>
      </div>
    );
  }
}

const dispatchToProps = dispatch => {
  return {};
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(CalendarComponentCounselor));
