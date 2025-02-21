import React, { useContext, createContext, useState, useCallback } from "react";

import { db } from "../utils/dbconfig";

import { Users, Records } from "../utils/schema";

import { eq } from "drizzle-orm";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Sidebar & Navbar States
  const [isActive, setIsActive] = useState("dashboard");

  // Mobile States
  const [mobile, setMobile] = useState(false);

  // States Onboarding/Registration to the Neon Framework
  const [username, setUerName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  // Create Modal States
  const [foldername, setFolderName] = useState("");

  // Records State for User
  const [userRecords, setUserRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // function to close and open Modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // single records page states
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  // state to store file name and type on the single records page
  const [filename, setFilename] = useState("");
  const [filetype, setFileType] = useState("");

  // DataBase Connection States
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  //   function to fetch all users data from the database
  const fetchUsers = useCallback(async () => {
    try {
      const result = await db.select().from(Users).execute();
      setUsers(result);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  }, []);

  //   function to fetch user details by email from the database
  const fetchUserByEmail = useCallback(async (email) => {
    try {
      const result = await db
        .select()
        .from(Users)
        .where(eq(Users.createdBy, email))
        .execute();

      if (result.length > 0) {
        setCurrentUser(result[0]);
      }
    } catch (error) {
      log.error("Error fetching user by email", error);
    }
  }, []);

  //   function to create users data in the database
  const createUser = useCallback(async (userData) => {
    try {
      // Insert the user and capture the user data
      const newUser = await db
        .insert(Users)
        .values(userData)
        .returning()
        .execute();

      // Update the state with the new user data
      setUsers([(prevUsers) => [...prevUsers, newUser[0]]]);

      // Return the newly created user data
      return newUser[0];
    } catch (error) {
      console.error("Error creating user", error);
      return null;
    }
  }, []);

  //   function to fetch all records data from the database
  const fetchUserRecords = useCallback(async (userEmail) => {
    try {
      const result = await db
        .select()
        .from(Records)
        .where(eq(Records.createdBy, userEmail))
        .execute();
      setRecords(result);
    } catch (error) {
      console.error("Error fetching user records", error);
    }
  }, []);

  //   function to create records data in the database
  const createRecord = useCallback(async (recordData) => {
    try {
      // Insert the record and capture the result
      const newRecord = await db
        .insert(Records)
        .values(recordData)
        .returning({ id: Records.id })
        .execute();

      // Update the state with the new record
      setRecords([(prevRecords) => [...prevRecords, newRecord[0]]]);

      // Return the newly created record
      return newRecord[0];
    } catch (error) {
      console.error("Error creating records", error);
      return null;
    }
  }, []);

  //   create a function to update records in the database
  const updateRecord = useCallback(async (recordData) => {
    try {
      const { documentID, ...dataToUpdate } = recordData;

      const updateRecords = await db
        .update(Records)
        .set(dataToUpdate)
        .where(eq(Records.id, documentID))
        .returning();
      setRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.id === documentID ? [updateRecords[0]] : record,
        ),
      );
    } catch (error) {
      console.error("Error updating records", error);
      return null;
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        users,
        records,
        fetchUsers,
        fetchUserByEmail,
        createUser,
        fetchUserRecords,
        createRecord,
        currentUser,
        updateRecord,
        username,
        setUerName,
        age,
        setAge,
        location,
        setLocation,
        isActive,
        setIsActive,
        mobile,
        setMobile,
        foldername,
        setFolderName,
        userRecords,
        setUserRecords,
        isModalOpen,
        setIsModalOpen,
        handleOpenModal,
        handleCloseModal,
        file,
        setFile,
        uploading,
        setUploading,
        uploadSuccess,
        setUploadSuccess,
        processing,
        setProcessing,
        filename,
        setFilename,
        filetype,
        setFileType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
