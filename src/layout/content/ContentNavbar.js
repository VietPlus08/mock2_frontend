import React, { useEffect, useState } from "react";
import { Segment, Tab, Button } from "semantic-ui-react";
import DetailSupplier from "./DetailSupplier";
import Supplier from "./Supplier";

const ContentNavbar = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [detailSupplierTabFlag, setDetailSupplierTabFlag] =
    useState(false);
  const [detailSupplier, setDetailSupplier] = useState();

  const handleRangeChange = (activeIndex, data) => {
    console.log("Xem chi tiết: ", data);
    setDetailSupplier(data);
    setDetailSupplierTabFlag(!detailSupplierTabFlag);
    setActiveIndex(activeIndex);
  };
  const handleTabChange = (e, { activeIndex }) => {
    setActiveIndex(activeIndex);
    if (activeIndex === 0 || activeIndex === 1) {
      setDetailSupplierTabFlag(false);
    }
  };

  const panes = [
    { menuItem: "Trang chủ", render: () => <Tab.Pane>Trang chủ</Tab.Pane> },
    {
      menuItem: "Nhà cung cấp",
      render: () => (
        <Tab.Pane>
          <Supplier handleRangeChange={handleRangeChange} />
        </Tab.Pane>
      ),
    },
    detailSupplierTabFlag && {
      menuItem: "Chi tiết nhà cung cấp",
      render: () => (
        <Tab.Pane>
          <DetailSupplier
            detailSupplier={detailSupplier}
            handleRangeChange={handleRangeChange}
          />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Tab
      panes={panes}
      activeIndex={activeIndex}
      onTabChange={handleTabChange}
    />
  );
};

export default ContentNavbar;
