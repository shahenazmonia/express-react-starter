import * as React from "react";
import CounselorProfile from "../../_defaultComponents/CounselorProfilePage/CounselorProfile";
import users from "../../../utility/constants/user";

interface IProps {
  counselorId?: string;
}

interface IState {}

class CounselorProfilePage extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  render() {
    return <CounselorProfile userType={users.ADMIN} counselorId={this.props.counselorId} />;
  }
}

export default CounselorProfilePage;
