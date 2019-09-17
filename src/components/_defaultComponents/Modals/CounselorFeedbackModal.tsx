import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { Formik } from "formik";
import * as yup from "yup";
import { Modal, Input, Form, Button } from "antd";

interface IProps {
  epikriz: string;
  openModal: boolean;
  onSubmit: (values: any) => any;
  hideFeedbackModal: () => void;
}

class CounselorFeedbackModal extends Component<IProps & InjectedIntlProps> {
  private formik = React.createRef<Formik>();

  handleSubmit(values) {
    this.props.onSubmit(values);
    this.props.hideFeedbackModal();
  }

  handleCancel() {
    this.props.hideFeedbackModal();
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { openModal, epikriz } = this.props;

    return (
      <Modal
        title={formatMessage({ id: "EPIKRIZ" })}
        visible={openModal}
        centered
        onCancel={this.handleCancel.bind(this)}
        onOk={() => this.formik.current!.submitForm()}
      >
        {
          <Formik
            enableReinitialize
            ref={this.formik}
            initialValues={{ epikriz }}
            validationSchema={yup.object().shape({
              epikriz: yup
                .string()
                .max(500, formatMessage({ id: "VALIDATION_MESSAGE_LENGHT_TEXT" }, { value: 500 }))
            })}
            onSubmit={this.handleSubmit.bind(this)}
          >
            {({ values, errors, touched, handleChange }) => (
              <Form>
                <Form.Item
                  validateStatus={errors.epikriz && touched.epikriz ? "error" : "success"}
                  help={errors.epikriz && touched.epikriz ? errors.epikriz : null}
                >
                  <Input.TextArea
                    name="epikriz"
                    rows={4}
                    value={values.epikriz}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Form>
            )}
          </Formik>
        }
      </Modal>
    );
  }
}

export default injectIntl(CounselorFeedbackModal);
