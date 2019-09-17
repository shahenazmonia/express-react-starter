import React, { StatelessComponent } from "react";
import { Empty } from "antd";
import { injectIntl, InjectedIntlProps } from "react-intl";
interface IProps {
  description: string;
}

const EmptyComponent: StatelessComponent<IProps & InjectedIntlProps> = props => {
  const { formatMessage } = props.intl;
  const { description } = props;
  return (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={formatMessage({ id: description })} />
  );
};

export default injectIntl(EmptyComponent);
