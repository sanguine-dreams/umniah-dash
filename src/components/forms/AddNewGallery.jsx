import React from "react";
import { Input, Modal } from "antd";
import { useRecoilState } from "recoil";
import { galleryCreationControl } from "../../atoms/GalleryAtoms";
import { useState } from "react";
import { post } from "../../pocketbase/pocketbase";

function NewGalleryForm() {
  const [control, setControl] = useRecoilState(galleryCreationControl);
  const [newPost, setNewPost] = useState({ image: [], title: "" });

  async function handleCreate() {
    await post(newPost);
    setControl(false);
    newPost({ image: [], title: "" });
  }

  return (
    <>
      <Modal
        title="Create New"
        open={control}
        onOk={() => handleCreate()}
        onCancel={control}
        okText="Create"
      >
        <Input
          placeholder="Title"
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <Input
          type="file"
          onChange={(e) => setNewPost({ ...newPost, image: e.target.files[0] })}
        />
      </Modal>
    </>
  );
}

export default NewGalleryForm;
