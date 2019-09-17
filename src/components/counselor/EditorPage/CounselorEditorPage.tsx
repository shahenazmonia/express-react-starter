import React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import EditorPage from "../../_defaultComponents/EditorPage/EditorPage";

interface IProps {
  blogId?: string;
}

interface ReduxProps {}

interface IState {}

class CounselorEditorPage extends React.Component<IProps & ReduxProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <EditorPage blogId={this.props.blogId} />;
  }
}

const stateToProps = state => {
  return {
    //  user: state.user || {}
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(CounselorEditorPage));
