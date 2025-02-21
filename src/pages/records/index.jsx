import React, { useEffect } from "react";

// import Icons
import { IconCirclePlus } from "@tabler/icons-react";

// import components
import RecordCard from "./components/record-card";
import CreateRecordModal from "./components/create-record-modal";

// import React Router DOM
import { useNavigate } from "react-router-dom";

// import Privy
import { usePrivy } from "@privy-io/react-auth";

// import Global Context
import { useGlobalContext } from "../../context";

const index = () => {
  // destructure useNavigate
  const navigate = useNavigate();

  // destructure usePrivy
  const { user } = usePrivy();

  // destructure useGlobalContext
  const {
    records,
    fetchUserRecords,
    createRecord,
    fetchUserByEmail,
    currentUser,
    userRecords,
    setUserRecords,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  } = useGlobalContext();

  // fetch user details and records when user changes or loads
  useEffect(() => {
    if (user) {
      fetchUserByEmail(user.email.address);
      fetchUserRecords(user.email.address);
    }
  }, [user, fetchUserByEmail, fetchUserRecords]);

  // Store records in local storage and update the state or local storage when the records change instead of fetching from the database all the time
  useEffect(() => {
    setUserRecords(records);
    localStorage.setItem("userRecords", JSON.stringify(records));
  }, [records]);

  // function to create a folder or Record
  const createFolder = async (folderName) => {
    try {
      if (currentUser) {
        const newRecord = await createRecord({
          userId: currentUser.id,
          recordName: folderName,
          analysisResult: "",
          kanbanRecords: "",
          createdBy: user.email.address,
        });

        if (newRecord) {
          fetchUserRecords(user.email.address);
          handleCloseModal();
        }
      }
    } catch (error) {
      console.log(error);
      handleCloseModal();
    }
  };

  // navigate to the details page of a selected record
  const handleNavigate = (name) => {
    // Filter the records to get the selected record
    const filteredRecords = userRecords.filter(
      (record) => record.recordName === name,
    );

    navigate(`/medical-records/${name}`, { state: filteredRecords[0] });
  };

  return (
    <>
      <div className="flex flex-wrap gap-[26px]">
        <button
          type="button"
          className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-neutral-700 bg-modal_bg px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-neutral-800"
          onClick={handleOpenModal}
        >
          <IconCirclePlus />
          Create Record
        </button>
        <CreateRecordModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onCreate={createFolder}
        />
        <div className="grid w-full grid-cols-4 sm:grid-cols-2 sm:gap-6 lg:grid">
          {userRecords.map((record) => (
            <RecordCard
              key={record.recordName}
              record={record}
              onNavigate={handleNavigate}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default index;
