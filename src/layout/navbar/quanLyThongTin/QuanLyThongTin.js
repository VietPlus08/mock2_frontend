import React, { useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { BsWindowDock } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiPersonLight, PiPersonSimpleRunLight } from "react-icons/pi";
import { FaTruck } from "react-icons/fa";
import { Button, Menu, Header, Grid, GridRow, GridColumn, Divider } from "semantic-ui-react";

import CustomFooter from "../../footer/CustomFooter";
import ContentNavbar from "../../content/ContentNavbar";

const QuanLyThongTin = () => {
  const [activeItem, setActiveItem] = useState(null);
  const handleItemClick = ({ name }) => setActiveItem(name);

  return (
    <Grid celled="internally">
      <GridRow>
        <Menu secondary icon="labeled">
          <Menu.Item as="a">
            <BsWindowDock size={40} />
            <p>Nhóm thuốc</p>
          </Menu.Item>
          <Menu.Item as="a">
            <IoDocumentTextOutline size={40} />
            <p>Danh sách thuốc</p>
          </Menu.Item>
          <Menu.Item as="a">
            <PiPersonLight size={40} />
            <p>Khách hàng</p>
          </Menu.Item>
          <Menu.Item as="a">
            <FaTruck size={40} />
            <p>Nhà cung cấp</p>
          </Menu.Item>
          <Menu.Item as="a">
            <PiPersonSimpleRunLight size={40} />
            <p>Nhân viên</p>
          </Menu.Item>
          <Menu.Item as="a">
            <AiOutlinePlusSquare size={40} />
            <p>Toa thuốc</p>
          </Menu.Item>
        </Menu>
      </GridRow>
      <GridRow>
        <GridColumn width={3}>
          <Menu fluid secondary vertical>
            <Menu.Item header>Chọn nhanh</Menu.Item>
            <Menu.Item as="a">F2 - Bán hàng</Menu.Item>
            <Menu.Item as="a">F3 - Nhập kho</Menu.Item>
            <Menu.Item as="a">F4 - Xuất hoàn trả</Menu.Item>
            <Menu.Item as="a">F5 - Xuất hủy</Menu.Item>
            <Divider></Divider>
            <Menu.Item as="a">F6 - Tra cứu nhanh</Menu.Item>
            <Menu.Item as="a">F7 - Hệ thống báo cáo</Menu.Item>
            <Divider></Divider>
            <Menu.Item as="a">F8 - Nhật ký bán hàng</Menu.Item>
            <Divider></Divider>
            <Menu.Item as="a">F9 - Đăng xuất</Menu.Item>
          </Menu>
        </GridColumn>
        <GridColumn width={13}>
          <ContentNavbar></ContentNavbar>
        </GridColumn>
      </GridRow>
      <GridRow>
        <CustomFooter></CustomFooter>
      </GridRow>
    </Grid>
  );
};

export default QuanLyThongTin;
