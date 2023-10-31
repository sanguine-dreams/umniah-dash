import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
  Modal,
  Image,
} from "antd";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import face6 from "../assets/images/face-6.jpeg";
import NewGalleryForm from "../components/forms/AddNewGallery";
import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { deletePost, get, post } from "../pocketbase/pocketbase";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { galleryCreationControl } from "../atoms/GalleryAtoms";

function Tables() {
  const { t, i18n } = useTranslation();
  const { Title } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addNewcontrol, setAddNewControl] = useRecoilState(
    galleryCreationControl
  );
  const [deleteId, setDeleteId] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["gallery"],
    queryFn: get,
  });

  console.log(data);

  function TableTitle() {
    return (
      <div className="flex justify-end">
        <Button
          className="text-emerald-500"
          onClick={() => setAddNewControl(true)}
        >
          Add New
        </Button>
      </div>
    );
  }


  const showModal = () => {
    setIsModalOpen(true);
  };

  
function handleDelete(id){
  deletePost(id);
  setIsModalOpen(false)
  refetch();
}

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // table code start
  const columns = [
    {
      title: "Image",
      dataIndex: ["image"],
      key: "image",
      render: (value, record, index) => {
        console.log(record);
        return (
          <>
            <Image
              key={value}
              style={{
                width: 100,
                height: 100,
                objectFit: "cover",
              }}
              src={`https://umniah.pockethost.io/api/files/${record.collectionId}/${record.id}/${record.image}`}
            />
          </>
        );
      },
    },

    {
      title: "Title",
      key: "title",
      dataIndex: ["title"],
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: ["created"],
    },
    {
      title: "Action Buttons",
      key: "actions",
      render: (val, rec, index) => {
        return (
          <div key={index} className="ant-employed flex justify-end">
            <Button type="link" danger block onClick={() => showModal()}>
              <DeleteFilled />
            </Button>
            <Button type="link" block >
              <EditOutlined />
            </Button>
            <Modal
              title="Basic Modal"
              open={isModalOpen}
              onOk={() => {handleDelete(rec.id) }}
              onCancel={handleCancel}
            >
              <p>Delete? {rec.title}</p>
            </Modal>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Button onClick={() => i18n.changeLanguage("fr")}>Fr</Button>
      <h1>{t("translation.welcome")}</h1>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Authors Table"
            >
              <div className="table-responsive">
                <Table
                  title={TableTitle}
                  columns={columns}
                  dataSource={data}
                  pagination={true}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>

        <NewGalleryForm />
      </div>
    </>
  );
}

export default Tables;
