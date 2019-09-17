import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import webseans from "../../../logo.svg";
import config from "../../../_core/config";
import history from "../../../_core/history";
import * as blogActions from "../../../store/actions/blogActions";

import { Icon, Row, Col, Card } from "antd";

const styles = {
  paddingBottom: 10,
  paddingTop: 10
};

interface IProps {
  getMostReadBlogs: (params: any) => any;
}

interface IState {
  mostReadBlogs: Array<any>;
}

class MostReadBlogs extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { mostReadBlogs: [] };
  }

  async componentDidMount() {
    try {
      const mostReadBlogs = (await this.props.getMostReadBlogs({ limit: 5 })).action.payload.data;
      this.setState({ mostReadBlogs });
    } catch (err) {
      // console.log(err);
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { mostReadBlogs } = this.state;
    return (
      <Row>
        <Col>
          <h3 style={{ marginTop: 20 }}>
            <b>{formatMessage({ id: "MOST_READ" })}</b>
          </h3>
          <Card bordered={true}>
            {mostReadBlogs &&
              mostReadBlogs.map((blog, i) => {
                const blogInfo = blog.currentState;
                return (
                  <React.Fragment key={i}>
                    <Row type="flex" gutter={10} justify="start" align="middle">
                      <Col md={8} style={styles}>
                        {blogInfo.imageInfo && blogInfo.imageInfo._id ? (
                          <img
                            src={
                              config.getBasePublicUrl() + "api/getFile/" + blogInfo.imageInfo._id
                            }
                            alt="Terapi"
                            width="100%"
                            height="auto"
                          />
                        ) : (
                          <img width="100%" height="auto" src={webseans} />
                        )}
                      </Col>

                      <Col md={16} style={styles}>
                        <Row>
                          <b>
                            <a
                              style={{ color: "black" }}
                              onClick={() => history.push("/blog/detail/" + blog._id)}
                            >
                              {blogInfo.title}
                            </a>
                          </b>
                        </Row>
                        <Row>
                          <span style={{ marginRight: 5 }}>
                            <Icon type="eye" /> {blog.seenCount}
                          </span>
                          <span style={{ marginRight: 5 }}>
                            <Icon type="message" /> {blog.commentNumber}
                          </span>
                        </Row>
                      </Col>
                    </Row>
                  </React.Fragment>
                );
              })}
          </Card>
        </Col>
      </Row>
    );
  }
}

/*const stateToProps = state => {
    return {};
  };*/

const dispatchToProps = dispatch => {
  return {
    getMostReadBlogs: params => dispatch(blogActions.getMostReadBlogs(params))
  };
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(MostReadBlogs));
