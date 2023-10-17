import { createContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const StateContext = createContext();
function AppContext({ children }) {
  const users = collection(db, "users");

  const [user, setUser] = useState([]);

  const getFirebaseData = async () => {
    const data = await getDocs(users);
    setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <StateContext.Provider value={{ user, setUser, getFirebaseData }}>
      {children}
    </StateContext.Provider>
  );
}

export default AppContext;
