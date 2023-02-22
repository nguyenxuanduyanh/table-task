import { Collapse, Modal, Form, Input, Select, DatePicker, Table } from "antd";
import {
  CaretRightOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  FilterOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Section from "./Task";
import styled from "styled-components";
import { addTask, setSelectionSection } from "../../app/reducers/taskSlice";
import { PRIORITY } from "../../constants";
import moment from "moment";
import { useEffect } from "react";
const { Panel } = Collapse;
const { useForm } = Form;
const { Option } = Select;
const List = () => {
  const { sections, selectionSection } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const [form] = useForm();
  const handleCancel = () => {
    dispatch(setSelectionSection(""));
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldValue("section", selectionSection);
  }, [selectionSection, form]);

  const handleAddTask = () => {
    form
      .validateFields()
      .then((values) => {
        const processTime = values.dueDate
          ? moment(values.dueDate).format("L LTS")
          : null;
        dispatch(
          addTask({
            ...values,
            dueDate: processTime,
          })
        );
        handleCancel();
      })
      .catch((err) => console.log(err));
  };

  const column = [
    {
      title: "Task",
      width: "60%",
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      width: "10%",
    },
    {
      title: "Due date",
      dataIndex: "dueDate",
      width: "10%",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      width: "10%",
    },
  ];
  return (
    <>
      <StyledAction className="d-flex justify-content-between">
        <div
          onClick={() => dispatch(setSelectionSection("1"))}
          className="d-flex align-items-center"
          style={{
            marginLeft: "12px",
            cursor: "pointer",
            border: "1px solid black",
            borderRadius: "4px",
            width: "fit-content",
            padding: "4px",
          }}
        >
          <PlusOutlined />
          <strong>Add task</strong>
        </div>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <CheckCircleOutlined />
            <div style={{ marginLeft: "6px" }}> All tasks</div>
          </div>
          <div
            className="d-flex align-items-center"
            style={{ marginLeft: "32px" }}
          >
            <FilterOutlined />
            <div style={{ marginLeft: "6px" }}> Filter</div>
          </div>
          <div
            className="d-flex align-items-center"
            style={{ marginLeft: "32px" }}
          >
            <SortAscendingOutlined />
            <div style={{ marginLeft: "6px" }}> Sort</div>
          </div>
        </div>
      </StyledAction>

      <StyledTable
        bordered={true}
        showHeader={true}
        columns={column}
        pagination={false}
        e
      />
      <StyledCollapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        {_.map(sections, (section) => (
          <StyledPanel header={section.label} key={section.id}>
            <Section section={section} />
          </StyledPanel>
        ))}
      </StyledCollapse>
      <Modal
        name="add-task"
        title="Add Task"
        open={selectionSection}
        onOk={handleAddTask}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="form">
          <Form.Item
            name="name"
            label="Task name"
            required
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="Input task name" />
          </Form.Item>
          <Form.Item name="assignee" label="Assignee">
            <Input />
          </Form.Item>
          <Form.Item
            name="section"
            label="Section"
            valuePropName="value"
            required
            rules={[{ required: true, message: "Required" }]}
          >
            <Select>
              {sections.map((item) => (
                <Option key={item.id}>{item.label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            valuePropName="value"
            required
            rules={[{ required: true, message: "Required" }]}
          >
            <Select>
              {Object.values(PRIORITY).map((item) => (
                <Option key={item}>{item}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due date"
            valuePropName="value"
            required
            rules={[{ required: true, message: "Required" }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default List;

const StyledCollapse = styled(Collapse)`
  background-color: transparent;
`;

const StyledPanel = styled(Panel)`
  border: none;
  margin-bottom: 16px;
`;

const StyledTable = styled(Table)`
  padding: 0 16px;
  .ant-table-tbody {
    display: none;
  }
`;

const StyledAction = styled.div`
  margin-bottom: 16px;
`;
