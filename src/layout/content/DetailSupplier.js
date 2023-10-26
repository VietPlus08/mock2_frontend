import React, { useEffect, useState } from "react";
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
  Container,
} from "semantic-ui-react";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import { useForm } from "react-hook-form";
import { showToast } from "../item/toast";
import moment from "moment/moment";
import "react-semantic-toasts/styles/react-semantic-alert.css";

const DetailSupplier = ({ detailSupplier, handleRangeChange }) => {
  const [selectedRow, setSelectedRow] = useState();
  const [filtedData, setFilterData] = useState(
    detailSupplier.supplierInvoiceList
  );
  const [initData, setInitData] = useState(detailSupplier.supplierInvoiceList);
  const { register, watch, handleSubmit } = useForm();

  const changeColor = (object) => {
    setSelectedRow(object);
  };

  const onSubmit = (data) => {
    const { fromDate, toDate, fromTime, toTime } = data;
    console.log(data);
    // Chuyển đổi dữ liệu từ formDate và toDate thành các đối tượng ngày tháng
    const fromDateObj = fromDate ? moment(fromDate) : moment("0000-1-1");
    const toDateObj = toDate ? moment(toDate) : moment("99999-12-31");
    console.log(fromDateObj);

    // Chuyển đổi dữ liệu từ fromTime và toTime thành các đối tượng thời gian
    const fromTimeObj = fromTime
      ? moment(fromTime, "HH:mm:ss")
      : moment("00:00:00", "HH:mm:ss");
    const toTimeObj = toTime
      ? moment(toTime, "HH:mm:ss")
      : moment("23:59:59", "HH:mm:ss");
    console.log(fromTimeObj);
    console.log(toTimeObj);

    // Lọc dữ liệu từ initData dựa trên ngày và thời gian
    const filtered = initData.filter((item) => {
      const itemDate = moment(item.createdDate);
      const itemTime = moment(item.createdTime, "HH-mm:ss");
      // console.log(itemTime);
      // So sánh ngày và thời gian
      return (
        itemDate.isSameOrAfter(fromDateObj) &&
        itemDate.isSameOrBefore(toDateObj) &&
        itemTime.isSameOrAfter(fromTimeObj) &&
        itemTime.isSameOrBefore(toTimeObj)
      );
    });
    setFilterData(filtered);
    if (fromDateObj.isAfter(toDateObj) || fromTimeObj.isAfter(toTimeObj)) {
      showToast(
        "warning",
        "Thông báo",
        "Bạn hãy nhập ngày tháng thông minh",
        4000
      );
    }
    console.log(filtered);
  };

  return (
    <div>
      <SemanticToastContainer position="top-right" maxToasts={3} />

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

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container fluid>
          <FormGroup widths={4}>
            <div className="field">
              <label htmlFor="">Từ ngày</label>
              <div className="ui small input">
                <input type="date" {...register("fromDate")} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="">Đến ngày</label>
              <div className="ui small input">
                <input type="date" {...register("toDate")} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="">Từ giờ</label>
              <div className="ui small input">
                <input type="time" {...register("fromTime")} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="">Đến giờ</label>
              <div className="ui small input">
                <input type="time" {...register("toTime")} />
              </div>
            </div>
            <Button
              icon
              labelPosition="left"
              type="submit"
              style={{ marginLeft: 5, marginTop: 24 }}
            >
              <Icon name="file alternate outline"></Icon>
              Xem
            </Button>
          </FormGroup>
          {/* <Button icon labelPosition="left" style={buttonStyle} type="submit">
              <Icon name="file alternate outline"></Icon>
              Xem
            </Button> */}
        </Container>
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
          {filtedData.map((item) => (
            <Table.Row
              key={item.invoiceCode}
              onClick={() => changeColor(item)}
              className={selectedRow === item ? "warning" : ""}
            >
              <Table.Cell>{item.invoiceCode}</Table.Cell>
              <Table.Cell>{item.detailCode}</Table.Cell>
              <Table.Cell>
                {moment(item.createdDate, "YYYY-MM-DD").format("DD/MM/YYYY")}
              </Table.Cell>
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
          <Button
            icon
            labelPosition="left"
            floated="right"
            style={{ marginRight: 10 }}
          >
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
