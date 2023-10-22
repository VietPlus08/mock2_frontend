import React from "react";
import {
  Table,
  Divider,
  Header,
  Input,
  Button,
  Select,
  Form,
  FormGroup,
  FormSelect,
  FormInput,
  FormButton,
  Icon,
  Grid,
  GridColumn,
  FormField,
  Segment,
  Container,
} from "semantic-ui-react";

const ChiTietNhaCungCap = () => {
  return (
    <div>
      <Header as="h4">Thông tin nhà cung cấp</Header>
      <Divider clearing></Divider>
      <Form>
        <Form.Group unstackable widths={3}>
          <Form.Input label="Mã nhà cung cấp" value="DOMESCO" readOnly={true} />
          <Form.Input
            label="Tên nhà cung cấp"
            value="CTY DOMESCO"
            readOnly={true}
          />
          <Form.Input
            label="Số điện thoại"
            value="0124567897"
            readOnly={true}
          />
        </Form.Group>
        <Form.Group widths={3}>
          <Form.Input label="Địa chỉ" value="Da Nang" readOnly={true} />
          <Form.Input label="Công nợ" value="12.000.000" readOnly={true} />
          <Form.Input label="Ghi chú" value="" readOnly={true} />
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
              <label>Xem</label>
            </Button>
          </GridColumn>
        </Grid>
      </Form>

      <Header as="h4">Danh sách hóa đơn nhập</Header>
      <Divider clearing></Divider>

      <Table celled>
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
          <Table.Row>
            <Table.Cell>HDN001</Table.Cell>
            <Table.Cell>111222</Table.Cell>
            <Table.Cell>12/12/2002</Table.Cell>
            <Table.Cell>12:00</Table.Cell>
            <Table.Cell>12.000.000</Table.Cell>
            <Table.Cell>2.000.000</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>HDN002</Table.Cell>
            <Table.Cell>111221</Table.Cell>
            <Table.Cell>12/11/1111</Table.Cell>
            <Table.Cell>10:00</Table.Cell>
            <Table.Cell>12.000.000</Table.Cell>
            <Table.Cell>2.000.000</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>HDN005</Table.Cell>
            <Table.Cell>111223</Table.Cell>
            <Table.Cell>12/12/1212</Table.Cell>
            <Table.Cell>12:12</Table.Cell>
            <Table.Cell>42.000.000</Table.Cell>
            <Table.Cell>3.000.000</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Grid>
        <GridColumn>
          <Button icon labelPosition="left" floated="right">
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

const countryOptions = [
  { key: "af", value: "af", text: "DOMESCO" },
  { key: "af", value: "af", text: "DOMESCO" },
  { key: "af", value: "af", text: "DOMESCO" },
  { key: "af", value: "af", text: "DOMESCO" },
  { key: "af", value: "af", text: "DOMESCO" },
  { key: "af", value: "af", text: "DOMESCO" },
  { key: "af", value: "af", text: "DOMESCO" },
  { key: "af", value: "af", text: "DOMESCO" },
  { key: "af", value: "af", text: "DOMESCO" },
  { key: "af", value: "af", text: "DOMESCO" },
  { key: "af", value: "af", text: "DOMESCO" },
  { key: "af", value: "af", text: "DOMESCO" },
];

const buttonStyle = {
  marginTop: 25,
};

export default ChiTietNhaCungCap;
