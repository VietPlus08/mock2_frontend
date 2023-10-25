import React, { useState } from "react";
import {
  Table,
  Divider,
  Header,
  Button,
  Form,
  FormGroup,
  FormInput,
  Icon,
  Grid,
  GridColumn,
} from "semantic-ui-react";
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';


const DetailSupplier = ({ detailSupplier, handleRangeChange }) => {
  const [selectedRow, setSelectedRow] = useState();

  const changeColor = (object) => {
    setSelectedRow(object);
    console.log("vao chi tiet");
    console.log(object);
  };
  console.log(detailSupplier);
  return (
    <div>
      <Header as="h4">Thông tin nhà cung cấp</Header>
      <Divider clearing></Divider>
      <Form>
        <Form.Group unstackable widths={3}>
          <Form.Input
            label="Mã nhà cung cấp"
            value={detailSupplier.supplierCode}
            readOnly={true}
          />
          <Form.Input
            label="Tên nhà cung cấp"
            value={detailSupplier.supplierName}
            readOnly={true}
          />
          <Form.Input
            label="Số điện thoại"
            value={detailSupplier.numberPhone}
            readOnly={true}
          />
        </Form.Group>
        <Form.Group widths={3}>
          <Form.Input
            label="Địa chỉ"
            value={detailSupplier.address}
            readOnly={true}
          />
          <Form.Input
            label="Công nợ"
            value={detailSupplier.totalDept}
            readOnly={true}
          />
          <Form.Input
            label="Ghi chú"
            value={detailSupplier.description}
            readOnly={true}
          />
        </Form.Group>
      </Form>

      <Header as="h4">Thời gian</Header>
      <Divider clearing></Divider>

      <Form>
        <Grid>
          <GridColumn width={14}>
            <FormGroup widths={4}>
              <FormInput label="Từ ngày" type="date" />
              <FormInput label="Đến ngày" type="date" />
              <FormInput label="Từ giờ" type="time" size="small" />
              <FormInput label="Đến giờ" type="time" size="small" />
            </FormGroup>
          </GridColumn>
          <GridColumn width={2}>
            <Button icon labelPosition="left" style={buttonStyle}>
              <Icon name="file alternate outline"></Icon>
              Xem
            </Button>
          </GridColumn>
        </Grid>
      </Form>

      <Header as="h4">Danh sách hóa đơn nhập</Header>
      <Divider clearing></Divider>

      <Table celled color="yellow" selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={3}>Mã hóa đơn</Table.HeaderCell>
            <Table.HeaderCell>Số chi tiết</Table.HeaderCell>
            <Table.HeaderCell>Ngày lập</Table.HeaderCell>
            <Table.HeaderCell>Giờ lập</Table.HeaderCell>
            <Table.HeaderCell>Tổng tiền</Table.HeaderCell>
            <Table.HeaderCell>Nợ hóa đơn</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {detailSupplier.supplierInvoiceList.map((item) => (
            <Table.Row
              key={item.invoiceCode}
              onClick={() => changeColor(item)}
              className={selectedRow === item ? "warning" : ""}
            >
              <Table.Cell>{item.invoiceCode}</Table.Cell>
              <Table.Cell>{item.detailCode}</Table.Cell>
              <Table.Cell>{item.createdDate}</Table.Cell>
              <Table.Cell>{item.createdTime}</Table.Cell>
              <Table.Cell>{item.totalBill}</Table.Cell>
              <Table.Cell>{item.dept}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Grid>
        <GridColumn>
          <Button
            icon
            labelPosition="left"
            floated="right"
            onClick={() => handleRangeChange(1, undefined)}
          >
            <Icon name="arrow alternate circle left outline"></Icon>
            Trở về
          </Button>
          <Button icon labelPosition="left" floated="right">
            <Icon name="copy outline"></Icon>
            Xem hóa đơn
          </Button>
        </GridColumn>
      </Grid>
    </div>
  );
};

const buttonStyle = {
  marginTop: 25,
};

export default DetailSupplier;
