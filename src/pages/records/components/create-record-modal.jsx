import React from "react";

// import Components
import Modal from "./Modal";

// import Global Context
import { useGlobalContext } from "../../../context";

const createRecordModal = ({ isOpen, onClose, onCreate }) => {
  // destructure useGlobal Context
  const { foldername, setFolderName, handleCloseModal } = useGlobalContext();

  // handle the creation of the folder
  const handleCreate = () => {
    onCreate(foldername);
    handleCloseModal();
    setFolderName("");
  };
  return (
    <>
      <Modal
        title="Create Record"
        isOpen={isOpen}
        onClose={onClose}
        onAction={handleCreate}
        actionLabel="Create Folder"
      >
        <div className="grid gap-y-4">
          <div>
            <label
              htmlFor="folder-name"
              className="mb-2 block text-sm text-white"
            >
              Record Name
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              value={foldername}
              onChange={(e) => setFolderName(e.target.value)}
              required
              className="block w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500"
            />
            {/* {console.log(foldername)} */}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default createRecordModal;
