import Header from './components/Header';
import List from './components/List/List';
import styled from 'styled-components';
import { Modal, Input, Form } from 'antd'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSection } from './app/reducers/taskSlice';
import { PlusOutlined } from '@ant-design/icons'

function App() {
  const [form] = Form.useForm()
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  const handleAddSection = () => {
    form
      .validateFields()
      .then((values) => {

        dispatch(
          addSection(values)
        );
        handleCancel();
      })
      .catch((err) => console.log(err));
  }

  const handleCancel = () => {
    form.resetFields()
    setOpenModal(false)
  }
  return (
    <div>
      <Header />
      <StyledContent>
        <List />
        <div onClick={() => setOpenModal(true)} className='d-flex align-items-center' style={{ marginLeft: "12px", cursor: 'pointer' }}>
          <PlusOutlined />
          <strong >Add section</strong>
        </div>
      </StyledContent>
      <Modal
        name="add-section"
        title="Add Section"
        open={openModal}
        onOk={handleAddSection}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="form">
          <Form.Item
            name="label"
            label="Section name"
            required
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="Input section name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;

const StyledContent = styled.div`
  padding : 1em;
`


