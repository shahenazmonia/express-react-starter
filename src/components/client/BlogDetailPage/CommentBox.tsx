import React, { Component } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import moment from "moment";

import { Row, Col, Form, Input, Button } from "antd";

const { TextArea } = Input;

const validationSchema = yup.object().shape({
  nickname: yup
    .string()
    .min(3, "En az 3 karakter kullanılmalı!")
    .required("İsim / Rumuz zorunlu!"),
  commentText: yup
    .string()
    .min(5, "Yorum en az 5 karakterden oluşmalı!")
    .required("Yorum zorunlu!")
});

interface IProps {
  addComment: any;
  blogId: string;
}

class CommentBox extends Component<IProps> {
  addComment = (values, { setSubmitting, resetForm }) => {
    this.props.addComment(values, { setSubmitting, resetForm });
  };
  render() {
    const formItemLayout = {
      labelCol: {
        span: 24
      },
      wrapperCol: {
        span: 5
      }
    };
    return (
      <Formik
        initialValues={{ nickname: "", commentText: "" }}
        validationSchema={validationSchema}
        onSubmit={this.addComment}
      >
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <Form className="login-form">
            <Form.Item
              {...formItemLayout}
              label="İsim / Rumuz"
              validateStatus={errors.nickname && touched.nickname ? "error" : "success"}
              help={errors.nickname && touched.nickname ? errors.nickname : null}
            >
              <Input type="name" name="nickname" onChange={handleChange} value={values.nickname} />
            </Form.Item>
            <Form.Item
              label="Yorum"
              validateStatus={errors.commentText && touched.commentText ? "error" : "success"}
              help={errors.commentText && touched.commentText ? errors.commentText : null}
            >
              <TextArea
                rows={4}
                name="commentText"
                onChange={handleChange}
                value={values.commentText}
              />
            </Form.Item>
            <Row type="flex" justify="end" align="middle">
              <Col>
                <Button
                  type="primary"
                  disabled={isSubmitting}
                  onClick={e => {
                    handleSubmit();
                  }}
                >
                  Gönder
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }
}

export default CommentBox;
