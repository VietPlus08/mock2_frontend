import React from "react";
import { Grid, Container, Header, Icon } from "semantic-ui-react";

const CustomFooter = () => {
  return (
    <Container fluid>
      <Header className="footer-text" as="h4" floated="left">
        <Icon name="user"></Icon>
        Người dùng: Nguyễn Anh Quang (Frehser)
      </Header>
      <Header className="footer-text" as="h4" floated="right">
        <Icon name="clock outline"></Icon>
        Thời gian: 16/10/2023
      </Header>
    </Container>
  );
};

// const headerStyle = {
//   marginTop: 10,
//   marginLeft: 10,
// };

export default CustomFooter;
