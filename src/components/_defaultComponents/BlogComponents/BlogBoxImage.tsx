import { Button, Col, Input, Row, Table, Typography } from "antd";
import React, { Component } from "react";
import styled from "styled-components";
let shipmentServices = {};
let shipmentTableColumns = [];
let styles = {
  searchInput: {},
  searchWrapper: {}
};

const Container = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const { Title } = Typography;

interface IState {
  data: any;
  shipments: any;
  shipmentId: string;
  loading: boolean;
  error: any;
}

class ShipmentsList extends Component<null, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      error: undefined,
      loading: false,
      shipmentId: "",
      shipments: []
    };
  }
  componentDidMount() {
    this.getShipmentsList();
  }

  getShipmentsList = async () => {
    this.setState({ loading: true });
    const result = await shipmentServices.getShipments();
    if (result.error) {
      this.setState({ error: result.error, loading: false });
    } else {
      this.setState({
        data: result,
        loading: false,
        shipments: result
      });
    }
  };

  sortShipments = (field: any, value: any) => {
    const { data } = this.state;
  };

  onSearchTextChange = (e: any) => {
    this.setState({ shipmentId: e.target.value });
  };

  searchShipmentById = () => {
    const { shipments, shipmentId, data } = this.state;
    console.log(shipmentId);
    shipmentId !== ""
      ? this.setState({
          shipments: shipments.filter((item: any) => item.id === shipmentId)
        })
      : this.setState({ shipments: data });
  };

  clearSearch = () => {
    this.setState({ shipmentId: "" }, () => this.searchShipmentById());
  };

  render() {
    const { error, loading, shipments, shipmentId } = this.state;
    return (
      <Container>
        <Title>Shipments Managment Project</Title>
        {loading && <div>we areloading shipments now, hold on...</div>}
        {error && <div>{error}</div>}
        <Row
          type="flex"
          align="middle"
          justify="space-around"
          style={styles.searchWrapper}
        >
          <Input
            style={styles.searchInput}
            placeholder="search shipment by id"
            value={shipmentId}
            onChange={this.onSearchTextChange}
          />
          <Button onClick={this.searchShipmentById}>Search</Button>
          <Button onClick={this.clearSearch}>Clear Search</Button>
        </Row>
        <>
          <Table
            style={styles.table}
            rowKey={(row: any) => row.id}
            columns={shipmentTableColumns}
            pagination={{ pageSize: 20 }}
            dataSource={shipments}
          />
        </>
      </Container>
    );
  }
}

export default ShipmentsList;
