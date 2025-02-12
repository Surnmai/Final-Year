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

  //   function to fetch users email from the database
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
  const createUser = useCallback(
    async (userData) => {
      try {
        await db.insert(Users).values(userData).returning().execute();
        setUsers([(prevUsers) => [...prevUsers, newUser[0]]]);
      } catch (error) {
        console.error("Error creating user", error);
        return null;
      }
    },
    [fetchUsers],
  );

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
      console.error("Error fetching records", error);
    }
  }, []);

  //   function to create records data in the database
  const createRecord = useCallback(async (recordData) => {
    try {
      await db
        .insert(Records)
        .values(recordData)
        .returning({ id: Records.id })
        .execute();
      setRecords((prevRecords) => [...prevRecords, newRecord[0]]);
      return newRecord[0];
    } catch (error) {
      console.error("Error creating records", error);
      return null;
    }
  }, []);

  //   create a function to update records in the database
  const updateRecord = useCallback(async (recordId, recordData) => {
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
