import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import { Formik } from "formik";
import { Modal } from "antd";
import CalendarComponentCounselor from "../CalendarComponent/CalendarComponentCounselor";

interface IProps {
  user: any;
  openModal: boolean;
  hideFeedbackModal: () => void;
}

class CounselorCalendarModal extends Component<IProps & InjectedIntlProps, any> {
  private formik = React.createRef<Formik>();
  constructor(props) {
    super(props);
    this.state = { updateAvailability: false };
  }
  handleSubmit = () => {};

  handleCancel() {
    this.props.hideFeedbackModal();
  }

  onChangeUpdateControl = () => {
    this.setState({ updateAvailability: false });
  };

  onUpdateAvailabilityCalender = () => {
    this.setState({ updateAvailability: true });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { openModal } = this.props;
    return (
      <Modal
        title={formatMessage({ id: "WEEKLY_TABLE" })}
        visible={openModal}
        centered
        bodyStyle={{ padding: 0 }}
        width={"60%"}
        okText={formatMessage({ id: "UPDATE" })}
        cancelText={formatMessage({ id: "CLOSE" })}
        onCancel={this.handleCancel.bind(this)}
        onOk={() => this.onUpdateAvailabilityCalender()}
      >
        {/* <CalendarComponentCounselor
          openModal={openModal}
          counselorId={this.props.user._id}
          updateAvailability={this.state.updateAvailability}
          onChangeUpdateControl={this.onChangeUpdateControl}
        /> */}
      </Modal>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  stateToProps,
  null
)(injectIntl(CounselorCalendarModal));
