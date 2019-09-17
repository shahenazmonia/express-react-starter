import React, { Component } from "react";
import { List, Icon, Card } from "antd";
import { injectIntl, InjectedIntlProps } from "react-intl";
import EmptyComponent from "../EmptyComponent";
import _ from "lodash";
interface IProps {
  serviceCategories: Array<Object | null>;
  deleteItem?: any;
  editService?: any;
  isCounselor?: boolean;
  language: string;
}

class ServiceList extends Component<IProps & InjectedIntlProps> {
  constructor(props) {
    super(props);
  }
  handleDelete = param => {
    this.props.deleteItem(param);
  };

  handleEdit = param => {
    this.props.editService(param);
  };
  render() {
    const { serviceCategories, language, isCounselor } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {serviceCategories.length !== 0 && (
          <List
            dataSource={serviceCategories}
            renderItem={(item: any) => {
              if (item.isCategoryUsed) {
                return (
                  <Card bordered={true} style={{ marginTop: 10 }}>
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        title={
                          <span>
                            <b>
                              {language === "tr" && item.name_TR + " - " + item.price + " ₺"}
                              {language === "en" && item.name_EN + " - " + item.price + " ₺"}
                            </b>
                          </span>
                        }
                        description={
                          formatMessage({ id: "MIN_PRICE_LISTED" }) +
                          " " +
                          _.max([
                            item.generalMinPrice,
                            item.clinicMinPrice,
                            item.counselorMinPrice,
                            item.price
                          ]) +
                          " ₺"
                        }
                      />
                      {item.description && (
                        <div style={{ marginRight: "35%" }}>{item.description}</div>
                      )}

                      {isCounselor && (
                        <span onClick={() => this.handleEdit(item)}>
                          <Icon type="edit" style={{ fontSize: 20, marginRight: 20 }} />
                        </span>
                      )}

                      {isCounselor && (
                        <span onClick={() => this.handleDelete(item)}>
                          <Icon type="delete" style={{ fontSize: 20 }} />
                        </span>
                      )}
                    </List.Item>
                  </Card>
                );
              }
              return <div />;
            }}
          />
        )}
        {serviceCategories.length === 0 && (
          <EmptyComponent description={"NO_DATA_SERVICE_CATEGORIES"} />
        )}
      </div>
    );
  }
}

export default injectIntl(ServiceList);
