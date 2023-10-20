import { createContext, useState } from "react";
import { collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const StateContext = createContext();
function AppContext({ children }) {
  const users = collection(db, "users");

  const [user, setUser] = useState([]);

  // const getFirebaseData = async () => {
  //   const data = await getDocs(users);
  //   console.log("data from firebase", data);
  //   let dataToState = await data.docs.map((doc) => ({
  //     ...doc.data(),
  //     id: doc.id,
  //   }));
  //   setUser(dataToState);
  // };

  // const getPlayers = () => {
  //   let config = {
  //     method: "get",
  //     url: `${baseUrl}cricket/players`,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   axios(config)
  //     .then((res) => {
  //       setData(res.data.players);
  //     })
  //     .catch((err) => {});
  // };

  return (
    <StateContext.Provider value={{ user, setUser }}>
      {children}
    </StateContext.Provider>
  );
}

export default AppContext;
