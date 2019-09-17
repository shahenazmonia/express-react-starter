import * as React from "react";
import CounselorProfile from "../../_defaultComponents/CounselorProfilePage/CounselorProfile";

interface IProps {
  counselorId?: string;
}

interface IState {}

class CounselorProfilePage extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  render() {
    return <CounselorProfile counselorId={this.props.counselorId} />;
  }
}

export default CounselorProfilePage;
