import { UnorderedListOutlined } from "@ant-design/icons";
import { Rate, Tabs } from "antd";
import { useState } from "react";
import styled from "styled-components";

const Header = () => {
  const [activeKey, setActiveKey] = useState("2");
  const TAB_DATA = [
    {
      label: "Overview",
      key: "1",
    },
    {
      label: "List",
      key: "2",
    },
    {
      label: "Board",
      key: "3",
    },
    {
      label: "Timeline",
      key: "4",
    },
    {
      label: "Calendar",
      key: "5",
    },
    {
      label: "Workflow",
      key: "6",
    },
    {
      label: "Dashboard",
      key: "7",
    },
    {
      label: "Messages",
      key: "8",
    },
    {
      label: "Files",
      key: "9",
    },
  ];

  return (
    <StyledHeader>
      <div className="d-flex align-items-center">
        <StyledIconHeader className="d-flex align-items-center justify-content-center">
          <UnorderedListOutlined />
        </StyledIconHeader>
        <div>
          <div className="d-flex align-items-center">
            <h4 className="m-0">Cross-functional project plan</h4>
            <Rate className="px-2" count={1} />
            <div>Set status</div>
          </div>
          <Tabs
            activeKey={activeKey}
            items={TAB_DATA}
            onChange={setActiveKey}
          />
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  width: 100%;
  padding: 1em;
`;

const StyledIconHeader = styled.div`
  height: 100%;
  padding: 8px;
  border-radius: 6px;
  background-color: aqua;
  color: #ffffff;
  margin-right: 1em;
  width: 2.5em;
  height: 2.5em;
  transform : translateY(-40%)
`;
