import React from "react";
import { Input, Modal } from "antd";
import { useRecoilState } from "recoil";
import { galleryUpdateControl } from "../../atoms/GalleryAtoms";
import { useState } from "react";
import { Update } from "../../pocketbase/pocketbase";

function UpdateGalleryForm(id, body) {
  const [control, setControl] = useRecoilState(galleryUpdateControl);
  const [newPost, setNewPost] = useState({ image: body.image, title: body.title });

  async function handleUpdate() {
    await Update(id, newPost);
    console.log(newPost)
    setControl(false);
    setNewPost({ image: [], title: "" });

  }
  const handleCancel = () => {
    setControl(false);
  };


  return (
    <>
      <Modal
        title="Update Post"
        open={control}
        onOk={() => handleUpdate()}
        onCancel={() => handleCancel()}
        okText="Update"
      >
       
        <Input
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <Input
          type="file"
          value={newPost.image}
          onChange={(e) => setNewPost({ ...newPost, image: e.target.files[0] })}
        />
      </Modal>
    </>
  );
}

export default UpdateGalleryForm;
