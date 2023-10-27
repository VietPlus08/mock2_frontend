import React, { useEffect, useState } from "react";
import {
  Table,
  Divider,
  Header,
  Button,
  Form,
  FormGroup,
  FormSelect,
  FormInput,
  FormButton,
  Icon,
  Grid,
  GridColumn,
  Modal,
  Container,
  Sticky,
} from "semantic-ui-react";
import { useForm } from "react-hook-form";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../api/httpRequest";
import { SemanticToastContainer } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";

import { showToast } from "../item/toast";
import CustomModal from "../item/CustomModal";

const buttonReducer = (state, action) => {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return {
        open: true,
        name: action.name,
      };
  }
};

const Supplier = ({ handleRangeChange }) => {
  const [state, dispatch] = React.useReducer(buttonReducer, {
    open: false,
    name: undefined,
  });

  const { open, name } = state;
  const [list, setList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selected, setSelected] = useState();
  const [filterFlag, setFilterFlag] = useState(false);
  const [searchType, setSearchType] = useState("supplierCode");
  const [searchValue, setSearchValue] = useState("");
  const [sortByField, setSortByField] = useState("supplierCode");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
    setError,
  } = useForm();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getRequest("/ncc");
      setList(result || []);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const filtedList = list
      .filter((item) => {
        if (item[searchType]) {
          return item[searchType]
            .toString()
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        }
        return true;
      })
      .sort((a, b) => {
        if (a[sortByField] && b[sortByField]) {
          if (sortByField === "numberPhone" || sortByField === "totalDept") {
            return parseFloat(a[sortByField]) - parseFloat(b[sortByField]);
          }
          return a[sortByField]
            .toString()
            .localeCompare(b[sortByField].toString());
        }
        if (!a[sortByField]) {
          return 1;
        } else if (!b[sortByField]) {
          return -1;
        }
        return 0;
      });
    setFilterData(filtedList);
    if (filtedList.length === 0 && searchValue) {
      console.log(filtedList);
      showToast("info", "Thông báo", "Không tìm thấy dữ liệu nào", 4000);
    }

    if (searchValue || sortByField !== "supplierCode") {
      setFilterFlag(true);
    }
  }, [filterFlag, sortByField]);

  const postProcess = (data) => {
    const fetchApi = async () => {
      try {
        const result = await postRequest("ncc", data);
        setList((prev) => [...prev, result]);
        setFilterData((prev) => [...prev, result]);
        showToast(
          "success",
          "Thông báo",
          "Thêm mới thành công nhà cung cấp mã " + result.supplierCode,
          4000
        );
        dispatch({ type: "close" });
      } catch (error) {
        const cloneErr = { ...error.response.data };
        console.log(cloneErr);
        await setErrorField(cloneErr);
      }
    };
    const setErrorField = async (resultInput) => {
      const obj = resultInput || {};
      for (const key in obj) {
        setError(key, {
          type: "custom",
          message: obj[key],
        });
      }
    };
    fetchApi();
  };

  const putProcess = (data) => {
    const fetchApi = async () => {
      try {
        const result = await putRequest("ncc", data);
        setList((prev) =>
          prev.map((item) => {
            if (item.supplierCode !== result.supplierCode) {
              return item;
            }
            return result;
          })
        );
        setFilterData((prev) =>
          prev.map((item) => {
            if (item.supplierCode !== result.supplierCode) {
              return item;
            }
            return result;
          })
        );
        showToast(
          "success",
          "Thông báo",
          "Cập nhật thành công nhà cung cấp mã " + result.supplierCode,
          4000
        );
        dispatch({ type: "close" });
        reset();
      } catch (error) {
        const cloneErr = { ...error.response.data };
        console.log(cloneErr);
        await setErrorField(cloneErr);
      }
      setSelected(undefined);
    };
    const setErrorField = async (resultInput) => {
      const obj = resultInput || {};
      for (const key in obj) {
        setError(key, {
          type: "custom",
          message: obj[key],
        });
      }
    };
    fetchApi();
  };

  const deleteProcess = () => {
    const fetchApi = async () => {
      const result = await deleteRequest("ncc", selected.supplierCode);
      setList((prev) =>
        prev.filter((item) => item.supplierCode !== selected.supplierCode)
      );
      setFilterData((prev) =>
        prev.filter((item) => item.supplierCode !== selected.supplierCode)
      );
      setSelected(undefined);
      showToast(
        "success",
        "Thông báo",
        "Xóa thành công nhà cung cấp mã " + result,
        4000
      );
    };
    fetchApi();
  };

  // Kiểm tra hành động thêm mới hay chỉnh sửa và gọi phương thức gửi dữ liệu
  const onSubmit = (data) => {
    if (state.name === "Thêm") {
      postProcess(data);
    }
    if (state.name === "Hoàn thành") {
      putProcess(data);
    }
    console.log(isObjectEmpty(errors));
    // if (isObjectEmpty(errors)) {
    //   dispatch({ type: "close" });
    // }
  };

  // Lấy dữ liệu từ oject được chọn để gửi lên form update
  const getInforUpdate = () => {
    if (selected) {
      dispatch({ type: "open", name: "Hoàn thành" });
      setValue("supplierCode", selected.supplierCode);
      setValue("supplierName", selected.supplierName);
      setValue("numberPhone", selected.numberPhone);
      setValue("description", selected.description);
      setValue("address", selected.address);
      setValue("mail", selected.mail);
    } else {
      showToast("warning", "Thông báo", "Bạn chưa chọn nhà cung cấp", 4000);
    }
  };

  const showDetail = () => {
    if (selected) {
      handleRangeChange(2, selected);
    } else {
      showToast("warning", "Thông báo", "Bạn chưa chọn nhà cung cấp", 4000);
    }
  };

  const checkForDeleting = () => {
    console.log(selected);
    if (selected) {
      setOpenDeleteModal(true);
    } else {
      showToast("warning", "Thông báo", "Bạn chưa chọn nhà cung cấp", 4000);
    }
  };

  const backInMenu = () => {
    handleRangeChange(0, selected);
  };

  const afterCloseModal = () => {
    dispatch({ type: "close" });
    reset();
    setSelected(undefined);
  };

  const changeColor = (object) => {
    setSelected(object);
  };

  ////xử lý khi thay đổi option
  const handleChangeSearch = (e, { value }) => {
    setSearchType(value);
  };

  const handleChangeFilter = (e, { value }) => {
    setSortByField(value);
    setFilterFlag(true);
  };

  ////xử lý khi thay đổi ô input search sẽ load dữ liệu
  const handleSubmitSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <SemanticToastContainer position="top-right" maxToasts={3} />

      <Header as="h5">Bộ lọc</Header>
      <Divider clearing></Divider>
      <Form>
        <Grid>
          <GridColumn width={11}>
            <FormGroup inline>
              <FormSelect
                label="Lọc theo:"
                placeholder="Mã nhà cung cấp"
                defaultValue={"Mã nhà cung cấp"}
                onChange={handleChangeSearch}
                options={selectOptions}
              />
              <FormInput onChange={handleSubmitSearch} />
              <FormButton
                icon
                labelPosition="left"
                onClick={() => {
                  setFilterFlag(!filterFlag);
                  if (!searchValue) {
                    showToast(
                      "warning",
                      "Thông báo",
                      "Bạn chưa nhập dữ liệu",
                      4000
                    );
                  }
                }}
                basic
                color="grey"
              >
                <Icon name="search"></Icon>
                Lọc kết quả
              </FormButton>
            </FormGroup>
          </GridColumn>
          <GridColumn width={5}>
            <FormGroup inline floated="right">
              <FormSelect
                label="Sắp xếp:"
                placeholder="Mã nhà cung cấp"
                defaultValue={"Mã nhà cung cấp"}
                options={selectOptions}
                onChange={handleChangeFilter}
              />
            </FormGroup>
          </GridColumn>
        </Grid>
      </Form>

      <Header as="h5">Danh sách nhà cung cấp</Header>
      <Divider clearing></Divider>

      <div
        style={{
          display: "block",
          overflowX: "auto",
          height: "49vh",
          marginBottom: "12px",
          borderTop: "2px solid #fbbd08",
        }}
      >
        <Table celled selectable>
          <Table.Header style={{ position: "sticky", top: 0 }}>
            <Table.Row>
              <Table.HeaderCell width={3}>Mã nhà cung cấp</Table.HeaderCell>
              <Table.HeaderCell>Tên nhà cung cấp</Table.HeaderCell>
              <Table.HeaderCell>Địa chỉ</Table.HeaderCell>
              <Table.HeaderCell>Số điện thoại</Table.HeaderCell>
              <Table.HeaderCell>Công nợ</Table.HeaderCell>
              <Table.HeaderCell>Ghi chú</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filterFlag
              ? filterData.map((item) => (
                  <Table.Row
                    key={item.supplierCode}
                    onClick={() => changeColor(item)}
                    className={selected === item ? "warning" : ""}
                  >
                    <Table.Cell style={{ textAlign: "right !important" }}>
                      {item.supplierCode}
                    </Table.Cell>
                    <Table.Cell>{item.supplierName}</Table.Cell>
                    <Table.Cell>{item.address}</Table.Cell>
                    <Table.Cell style={{ textAlign: "right" }}>
                      {item.numberPhone}
                    </Table.Cell>
                    <Table.Cell style={{ textAlign: "right" }}>
                      {item.totalDept}
                    </Table.Cell>
                    <Table.Cell>{item.description}</Table.Cell>
                  </Table.Row>
                ))
              : list.map((item) => (
                  <Table.Row
                    key={item.supplierCode}
                    onClick={() => changeColor(item)}
                    className={selected === item ? "warning" : ""}
                  >
                    <Table.Cell>{item.supplierCode}</Table.Cell>
                    <Table.Cell>{item.supplierName}</Table.Cell>
                    <Table.Cell>{item.address}</Table.Cell>
                    <Table.Cell>{item.numberPhone}</Table.Cell>
                    <Table.Cell>{item.totalDept}</Table.Cell>
                    <Table.Cell>{item.description}</Table.Cell>
                  </Table.Row>
                ))}
          </Table.Body>
        </Table>
      </div>
      <Container fluid>
        <Button
          icon
          labelPosition="left"
          onClick={() => showDetail()}
          basic
          color="purple"
        >
          <Icon name="copy outline"></Icon>
          Thông tin chi tiết
        </Button>
        <Button
          icon
          labelPosition="left"
          floated="right"
          style={styleButton}
          onClick={backInMenu}
          basic
          color="black"
        >
          <Icon name="arrow alternate circle left outline"></Icon>
          <label>Trở về</label>
        </Button>
        <Button
          icon
          labelPosition="left"
          floated="right"
          style={styleButton}
          onClick={checkForDeleting}
          basic
          color="grey"
        >
          <Icon name="delete"></Icon>
          Xóa
        </Button>
        <Button
          icon
          labelPosition="left"
          floated="right"
          style={styleButton}
          onClick={getInforUpdate}
          basic
          color="brown"
        >
          <Icon name="pencil"></Icon>Sửa
        </Button>
        <Button
          icon
          labelPosition="left"
          floated="right"
          style={styleButton}
          onClick={() => dispatch({ type: "open", name: "Thêm" })}
          basic
          color="blue"
        >
          <Icon name="plus circle"></Icon>
          Thêm
        </Button>
      </Container>

      <Modal
        size="small"
        onClose={() => dispatch({ type: "close" })}
        open={open}
      >
        <Modal.Header>Thông tin nhà cung cấp</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Mã nhà cung cấp</label>
              <div
                className={
                  errors.supplierCode && errors.supplierCode.message
                    ? "error field ui input"
                    : "field ui input"
                }
              >
                <input
                  type="text"
                  name="supplierCode"
                  {...register("supplierCode", {
                    required: {
                      value: true,
                      message: "Vui lòng nhập tối thiểu 3 kí tự",
                    },
                    minLength: {
                      value: 3,
                      message: "Vui lòng nhập tối thiểu 3 kí tự",
                    },
                    maxLength: {
                      value: 25,
                      message: "Vui lòng nhập tối đa 25 kí tự",
                    },
                  })}
                  readOnly={state.name === "Hoàn thành"}
                />
              </div>
              {errors.supplierCode && (
                <span className="errorText">{errors.supplierCode.message}</span>
              )}
            </Form.Field>
            <Form.Field>
              <label>Tên nhà cung cấp</label>
              <div
                className={
                  errors.supplierName && errors.supplierName.message
                    ? "error field ui input"
                    : "field ui input"
                }
              >
                <input
                  type="text"
                  name="supplierName"
                  {...register("supplierName", {
                    required: {
                      value: true,
                      message: "Vui lòng nhập tối thiểu 3 kí tự",
                    },
                    minLength: {
                      value: 3,
                      message: "Vui lòng nhập tối thiểu 3 kí tự",
                    },
                    maxLength: {
                      value: 25,
                      message: "Vui lòng nhập tối đa 25 kí tự",
                    },
                  })}
                />
              </div>
              {errors.supplierName && (
                <span className="errorText">{errors.supplierName.message}</span>
              )}
            </Form.Field>
            <Form.Field>
              <label>Địa chỉ</label>
              <div
                className={
                  errors.address && errors.address.message
                    ? "error field ui input"
                    : "field ui input"
                }
              >
                <input
                  type="text"
                  name="address"
                  {...register("address", {
                    maxLength: {
                      value: 50,
                      message: "Vui lòng nhập tối đa 50 kí tự",
                    },
                  })}
                />
              </div>
              {errors.address && (
                <span className="errorText">{errors.address.message}</span>
              )}
            </Form.Field>
            <Form.Field>
              <label>Điện thoại</label>
              <div
                className={
                  errors.numberPhone && errors.numberPhone.message
                    ? "error field ui input"
                    : "field ui input"
                }
              >
                <input
                  type="text"
                  name="numberPhone"
                  {...register("numberPhone", {
                    maxLength: {
                      value: 11,
                      message: "Vui lòng nhập tối đa 11 kí tự",
                    },
                  })}
                />
              </div>
              {errors.numberPhone && (
                <span className="errorText">{errors.numberPhone.message}</span>
              )}
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <div
                className={
                  errors.mail && errors.mail.message
                    ? "error field ui input"
                    : "field ui input"
                }
              >
                <input
                  type="text"
                  name="mail"
                  {...register("mail", {
                    maxLength: {
                      value: 25,
                      message: "Vui lòng nhập tối đa 25 kí tự",
                    },
                  })}
                />
              </div>
              {errors.mail && (
                <span className="errorText">{errors.mail.message}</span>
              )}
            </Form.Field>
            <Form.Field>
              <label>Ghi chú</label>
              <textarea
                name="description"
                {...register("description", {
                  maxLength: {
                    value: 50,
                    message: "Vui lòng nhập tối đa 50 kí tự",
                  },
                })}
                rows={2}
              />
              {errors.description && (
                <span className="errorText">{errors.description.message}</span>
              )}
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            icon
            labelPosition="left"
            onClick={handleSubmit(onSubmit)}
            primary
          >
            <Icon name="plus circle"></Icon>
            {name}
          </Button>
          <Button icon labelPosition="left" onClick={afterCloseModal}>
            <Icon name="arrow alternate circle left outline"></Icon>
            Trở về
          </Button>
        </Modal.Actions>
      </Modal>
      <CustomModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        deleteProcess={deleteProcess}
        id={selected && selected.supplierCode}
      ></CustomModal>
    </div>
  );
};

const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0;
};

const selectOptions = [
  { key: "code", value: "supplierCode", text: "Mã nhà cung cấp" },
  { key: "name", value: "supplierName", text: "Tên nhà cung cấp" },
  { key: "address", value: "address", text: "Địa chỉ" },
  { key: "phone", value: "numberPhone", text: "Số điện thoại" },
  { key: "dept", value: "totalDept", text: "Công nợ" },
];

const styleButton = {
  marginLeft: 10,
};

export default Supplier;
