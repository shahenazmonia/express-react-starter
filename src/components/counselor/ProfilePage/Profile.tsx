import * as React from "react";
import { connect } from "react-redux";

import CounselorProfile from "../../_defaultComponents/CounselorProfilePage/CounselorProfile";
import CounselorCalendarModal from "../../_defaultComponents/Modals/CounselorCalendarModal";
import users from "../../../utility/constants/user";
import history from "../../../_core/history";

interface IProps {
  user: any;
  id?: string;
}

interface IState {}

class Profile extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  render() {
    const { id } = this.props;
    return (
      <div>
        <CounselorProfile
          userType={users.COUNSELOR}
          counselorId={id ? this.props.id : this.props.user._id}
        />
      </div>
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
)(Profile);
