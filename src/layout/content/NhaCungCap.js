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
} from "semantic-ui-react";
import { useForm } from "react-hook-form";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../api/httpRequest";

const buttonReducer = (state, action) => {
  switch (action.type) {
    case "close":
      console.log(state);
      return { open: false };
    case "open":
      console.log(state);
      return {
        open: true,
        name: action.name,
      };
  }
};

const NhaCungCap = () => {
  const [state, dispatch] = React.useReducer(buttonReducer, {
    open: false,
    name: undefined,
  });

  const { open, name } = state;
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState();
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors },
    watch,
    setError,
  } = useForm();

  const inputs = [
    {
      type: "manual",
      name: "maNhaCungCap",
      message: "Vui lòng nhập",
    },
    {
      type: "manual",
      name: "tenNhaCungCap",
      message: "Vui lòng nhập",
    },
  ];

  // useEffect(() => {
  //   inputs.forEach(({ name, type, message }) => {
  //     setError(name, { type, message });
  //   });
  // }, [setError]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getRequest("/ncc");
      setList(result || []);
    };
    fetchApi();
  }, []);

  const postProcess = (data) => {
    const fetchApi = async () => {
      const result = await postRequest("/ncc", data);
      setList((prev) => [...prev, result]);
    };
    console.log(data);
    fetchApi();
  };

  const putProcess = (data) => {
    const fetchApi = async () => {
      const result = await putRequest("ncc", data);
      setList((prev) => prev.filter((item) => item.maNhaCungCap !== data));
      setSelected(undefined);
    };
    fetchApi();
  };

  const deleteProcess = () => {
    if (selected) {
      const fetchApi = async () => {
        const result = await deleteRequest("ncc", selected.maNhaCungCap);
        setList((prev) =>
          prev.filter((item) => item.maNhaCungCap !== selected.maNhaCungCap)
        );
        setSelected(undefined);
      };
      fetchApi();
    }
  };

  // Kiểm tra hành động thêm mới hay chỉnh sửa và gọi phương thức gửi dữ liệu
  const onSubmit = (data) => {
    console.log(state);
    if (state.name === "Thêm") {
      postProcess(data);
    }
    if (state.name === "Hoàn thành") {
      putProcess(data);
    }
    dispatch({ type: "close" });
  };
  console.log(errors);

  // Lấy dữ liệu từ oject được chọn để gửi lên form update
  const getInforUpdate = () => {
    console.log(selected);
    if (selected) {
      dispatch({ type: "open", name: "Hoàn thành" });
      setValue("maNhaCungCap", selected.maNhaCungCap);
      setValue("tenNhaCungCap", selected.tenNhaCungCap);
      setValue("soDienThoai", selected.soDienThoai);
      setValue("ghiChu", selected.ghiChu);
      setValue("diaChi", selected.diaChi);
      setValue("mail", selected.mail);
    }
  };

  const afterCloseModal = () => {
    dispatch({ type: "close" });
    resetField("maNhaCungCap");
    resetField("tenNhaCungCap");
    resetField("soDienThoai");
    resetField("ghiChu");
    resetField("diaChi");
    resetField("mail");
  };

  const changeColor = (object) => {
    setSelected(object);
  };

  return (
    <div>
      <Header as="h5">Bộ lọc</Header>
      <Divider clearing></Divider>
      <Form>
        <Grid>
          <GridColumn width={11}>
            <FormGroup inline>
              <label>Lọc theo:</label>
              <FormSelect
                placeholder="Mã nhà cung cấp"
                options={countryOptions}
              />
              <FormInput />
              <FormButton icon labelPosition="left">
                <Icon name="search"></Icon>
                Lọc kết quả
              </FormButton>
            </FormGroup>
          </GridColumn>
          <GridColumn width={5}>
            <FormGroup inline floated="right">
              <label>Sắp xếp:</label>
              <FormSelect
                placeholder="Mã nhà cung cấp"
                options={countryOptions}
              />
            </FormGroup>
          </GridColumn>
        </Grid>
      </Form>

      <Header as="h5">Danh sách nhà cung cấp</Header>
      <Divider clearing></Divider>

      <Table celled color="yellow" selectable>
        <Table.Header>
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
          {list.map((item) => (
            <Table.Row
              key={item.maNhaCungCap}
              onClick={() => changeColor(item)}
              className={selected === item ? "warning" : ""}
            >
              <Table.Cell>{item.maNhaCungCap}</Table.Cell>
              <Table.Cell>{item.tenNhaCungCap}</Table.Cell>
              <Table.Cell>{item.diaChi}</Table.Cell>
              <Table.Cell>{item.soDienThoai}</Table.Cell>
              <Table.Cell>{item.congNo}</Table.Cell>
              <Table.Cell>{item.ghiChu}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button icon labelPosition="left">
        <Icon name="copy outline"></Icon>
        Thông tin chi tiết
      </Button>
      <Button icon labelPosition="left" floated="right">
        <Icon name="arrow alternate circle left outline"></Icon>
        <label>Trở về</label>
      </Button>
      <Button
        icon
        labelPosition="left"
        floated="right"
        onClick={() => deleteProcess()}
      >
        <Icon name="delete"></Icon>
        Xóa
      </Button>
      <Button
        icon
        labelPosition="left"
        floated="right"
        onClick={getInforUpdate}
      >
        <Icon name="pencil"></Icon>Sửa
      </Button>
      <Button
        icon
        labelPosition="left"
        floated="right"
        onClick={() => dispatch({ type: "open", name: "Thêm" })}
      >
        <Icon name="plus circle"></Icon>
        Thêm
      </Button>

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
                  errors.tenNhaCungCap && errors.tenNhaCungCap.message
                    ? "error field ui input"
                    : "field ui input"
                }
              >
                <input
                  type="text"
                  name="maNhaCungCap"
                  {...register("maNhaCungCap", {
                    required: { value: true, message: "Vui lòng nhập" },
                    minLength: {
                      value: 3,
                      message: "Vui lòng nhập tối thiểu 3 kí tự",
                    },
                  })}
                  readOnly={state.name === "Hoàn thành"}
                />
              </div>
              {errors.maNhaCungCap && (
                <span className="errorText">{errors.maNhaCungCap.message}</span>
              )}
            </Form.Field>
            <Form.Field>
              <label>Tên nhà cung cấp</label>
              <div
                className={
                  errors.tenNhaCungCap && errors.tenNhaCungCap.message
                    ? "error field ui input"
                    : "field ui input"
                }
              >
                <input
                  type="text"
                  name="tenNhaCungCap"
                  {...register("tenNhaCungCap", {
                    required: { value: true, message: "Vui lòng nhập" },
                    minLength: {
                      value: 3,
                      message: "Vui lòng nhập tối thiểu 3 kí tự",
                    },
                  })}
                />
              </div>
              {errors.tenNhaCungCap && (
                <span className="errorText">
                  {errors.tenNhaCungCap.message}
                </span>
              )}
            </Form.Field>
            <Form.Field>
              <label>Địa chỉ</label>
              <input type="text" name="diaChi" {...register("diaChi")} />
            </Form.Field>
            <Form.Field>
              <label>Điện thoại</label>
              <input
                type="text"
                name="soDienThoai"
                {...register("soDienThoai")}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input type="text" name="mail" {...register("mail")} />
            </Form.Field>
            <Form.Field>
              <label>Ghi chú</label>
              <textarea name="ghiChu" {...register("ghiChu")} rows={2} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            icon
            labelPosition="left"
            onClick={handleSubmit(onSubmit)}
            positive
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
    </div>
  );
};

const countryOptions = [
  { key: "0", value: "af", text: "DOMESCO" },
  { key: "1", value: "af", text: "DOMESCO" },
  { key: "2", value: "af", text: "DOMESCO" },
  { key: "3", value: "af", text: "DOMESCO" },
  { key: "4", value: "af", text: "DOMESCO" },
  { key: "5", value: "af", text: "DOMESCO" },
  { key: "6", value: "af", text: "DOMESCO" },
  { key: "7", value: "af", text: "DOMESCO" },
  { key: "8", value: "af", text: "DOMESCO" },
  { key: "9", value: "af", text: "DOMESCO" },
  { key: "10", value: "af", text: "DOMESCO" },
  { key: "11", value: "af", text: "DOMESCO" },
];

export default NhaCungCap;

{
  /* <form onSubmit={handleSubmit(createItem)}>
        <label htmlFor="">Mã nha cung cấp</label>
        <input
          type="text"
          name="maNhaCungCap"
          {...register("maNhaCungCap", {
            required: "Vui lòng nhập mã nhà cung cấp",
          })}
        />
        <input
          type="text"
          name="tenNhaCungCap"
          {...register("tenNhaCungCap", {
            required: "Vui lòng nhập mã nhà cung cấp",
          })}
        />
        <button type="submit" class="btn btn-outline-primary">
          Submit
        </button>
      </form> */
}
