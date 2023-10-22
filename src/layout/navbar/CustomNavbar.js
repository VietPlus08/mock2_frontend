import React from "react";
import { Segment, Tab } from "semantic-ui-react";
import QuanLyThongTin from "./quanLyThongTin/QuanLyThongTin";

const panes = [
  {
    menuItem: "Hệ thống",
    render: () => <Tab.Pane>Tab 1 Content</Tab.Pane>,
  },
  {
    menuItem: "Chức năng",
    render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
  },
  {
    menuItem: "Quản lý thông tin",
    render: () => (
      <Tab.Pane className="noPadding defaut-height" >
        <QuanLyThongTin />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Tra cứu",
    render: () => <Tab.Pane>Tab 4 Content</Tab.Pane>,
  },
  {
    menuItem: "Báo cáo",
    render: () => <Tab.Pane>Tab 5 Content</Tab.Pane>,
  },
  {
    menuItem: "Trợ giúp",
    render: () => <Tab.Pane>Tab 6 Content</Tab.Pane>,
  },
];

const CustomNavbar = () => {
  return (
    <Segment className="defaut-height">
      <Tab menuPosition="left" panes={panes} />
    </Segment>
  );
};

const noPadding = {
  paddingLeft: 0,
  paddingRight: 0,
};

export default CustomNavbar;
