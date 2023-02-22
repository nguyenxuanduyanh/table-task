import { Badge, Table, Modal } from "antd";
import _ from "lodash";
import moment from "moment";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PRIORITY } from "../../constants";
import { CheckCircleOutlined } from "@ant-design/icons";
import {
  setSelectionSection,
  toggleTaskStatus,
} from "../../app/reducers/taskSlice";

const getColorBadge = (value) => {
  switch (value) {
    case PRIORITY.LOW:
      return "#52c41a";
    case PRIORITY.MEDIUM:
      return "#faad14";
    default:
      return "";
  }
};

const Section = ({ section }) => {
  const { tasks } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const handleAddTask = () => {
    dispatch(setSelectionSection(section.id));
  };

  const handleToggleDone = _.debounce(
    (task) => {
      dispatch(toggleTaskStatus(task.id));
    },
    [200]
  );

  const column = [
    {
      title: "Name",
      width: "60%",
      render: (value) => {
        return (
          <div
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => handleToggleDone(value)}
          >
            <div
              className="d-flex align-items-center"
              style={{ color: value.isDone && "green" }}
            >
              <CheckCircleOutlined />
            </div>
            <div  style={{ marginLeft: "6px"}}>{value.name}</div>
          </div>
        );
      },
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      width: "10%",
    },
    {
      title: "Due date",
      dataIndex: "dueDate",
      render: (value) => moment(value).format("MMM DD"),
      width: "10%",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (value) => {
        const color = getColorBadge(value);
        return <Badge count={value} color={color} />;
      },
      width: "10%",
    },
  ];
  const matchTask = useMemo(() => {
    return _.filter(tasks, (task) => task.section === section.id);
  }, [tasks, section.id]);

  return (
    <>
      <Table
        bordered={true}
        showHeader={false}
        dataSource={matchTask}
        columns={column}
        pagination={false}
      />
      <div
        onClick={handleAddTask}
        className="mt-3"
        style={{ cursor: "pointer" }}
      >
        Add task ...
      </div>
    </>
  );
};

export default Section;
