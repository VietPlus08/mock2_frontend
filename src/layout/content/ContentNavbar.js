import React from "react";
import { Segment, Tab } from "semantic-ui-react";
import NhaCungCap from "./NhaCungCap";
import ChiTietNhaCungCap from "./ChiTietNhaCungCap";

const panes = [
  { menuItem: "Trang chủ", render: () => <Tab.Pane>Trang chủ</Tab.Pane> },
  {
    menuItem: "Nhà cung cấp",
    render: () => (
      <Tab.Pane>
        <NhaCungCap />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Chi tiết nhà cung cấp",
    render: () => (
      <Tab.Pane>
        <ChiTietNhaCungCap />
      </Tab.Pane>
    ),
  },
];

const ContentNavbar = () => {
  return <Tab panes={panes} />;
};

export default ContentNavbar;
