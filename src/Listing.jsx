import React, { useContext, useEffect, useRef, useState } from "react";
import { Table } from "antd";
import ReactToPrint from "react-to-print";

import styles from "./page.module.css";
import { StateContext } from "./contexts/Context";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function ListPlayers() {
  const users = collection(db, "users");

  const componentRef = useRef();
  const downloadButtonRef = useRef();
  // const { user } = useContext(StateContext);

  const [user, setUser] = useState([]);
  const [team, setTeam] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [batStyle, setBatStyle] = useState("");
  const [bowlStyle, setBowlStyle] = useState("");
  const [number, setNumber] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Team",
      dataIndex: "team",
      key: "team",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Jersey Number",
      dataIndex: "jerseyNumber",
      key: "jerseyNumber",
    },
    {
      title: "Batting Style",
      dataIndex: "batStyle",
      key: "batStyle",
    },
    {
      title: "Bowling Style",
      dataIndex: "bowlStyle",
      key: "bowlStyle",
    },
    {
      title: "Jersey",
      dataIndex: "jersey",
      key: "jersey",
    },
    {
      title: "Track Pants",
      dataIndex: "tracks",
      key: "tracks",
    },
    {
      title: "Phone No",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Photo",
      dataIndex: "image",
      render: (text, key) => (
        <img
          src={text}
          alt="player"
          style={{ width: "50px", height: "50px" }}
        />
      ),
      key: "image",
    },
    {
      title: "Player Card",
      render: (text, key) => (
        <button
          onClick={() => {
            setCardData(key);
          }}
          className={styles.downloadBtn}
        >
          Download
        </button>
      ),
      key: "download",
      dataIndex: "download",
    },
  ];

  const setCardData = (item) => {
    setName(item.name);
    setTeam(item.team);
    setRole(item.role);
    setBatStyle(item.batStyle);
    setBowlStyle(item.bowlStyle);
    setNumber(item.number);
    setSelectedImage(item.image);
    setTimeout(() => {
      triggerDownloadButtonClick();
    }, 1500);
  };

  const getFirebaseData = async () => {
    const data = await getDocs(users);
    console.log("data from firebase", data);

    let dataToState = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    console.log("dataToState", dataToState)

    setUser(sortDataByCreatedAtDesc(dataToState));
  };

  // Function to sort data by 'createdAt' in descending order
  function sortDataByCreatedAtDesc(data) {
    return data.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return b.createdAt - a.createdAt;
      } else if (a.createdAt) {
        return -1; // 'a' has 'createdAt', so it comes before 'b' (which doesn't have 'createdAt')
      } else if (b.createdAt) {
        return 1; // 'b' has 'createdAt', so it comes before 'a' (which doesn't have 'createdAt')
      } else {
        return 0; // Both 'a' and 'b' don't have 'createdAt', keep their order unchanged
      }
    });
  }

  useEffect(() => {
    getFirebaseData();
  }, []);

  // printing
  const handleBeforePrint = () => {
    componentRef.current.style.display = "";
  };
  const handleAfterPrint = () => {
    if (componentRef.current) {
      componentRef.current.style.display = "none";
    }
  };
  // end printing

  const triggerDownloadButtonClick = () => {
    if (downloadButtonRef.current) {
      downloadButtonRef.current.click();
    }
  };

  return (
    <main className={styles.main}>
      <h1 style={{ color: "#a26f00" }}>Registered Players List</h1>
      <h5> Total Registrations : {user?.length}</h5>
      {console.log("user", user)}
      <Table
        columns={columns}
        dataSource={user}
        scroll={{ xs: 500 }}
        style={{ overflowY: "scroll" }}
      />
      <h5>
        Created with ❤️ by{" "}
        <a
          href="https://www.codescap.com"
          style={{ textDecoration: "none", color: "#CC3333" }}
        >
          Codescap
        </a>
      </h5>

      <ReactToPrint
        trigger={() => (
          <button ref={downloadButtonRef} style={{ display: "none" }}>
            Download
          </button>
        )}
        onBeforeGetContent={handleBeforePrint}
        onAfterPrint={handleAfterPrint}
        content={() => componentRef.current}
      />

      <div
        className={styles.bgCard}
        ref={componentRef}
        style={{ display: "none" }}
      >
        <div className={styles.cardWrapper}>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Uploaded"
              className={styles.uploadedImg}
            />
          )}
          {/* <div className={styles.id}>
            <h1 style={{ fontSize: "25px" }}>{playerId}</h1>
          </div> */}
          <h2 className={styles.name}>{name}</h2>
          <h2 className={styles.team}>{team}</h2>
          <h3 className={styles.number}>{number}</h3>
          <h3 className={styles.role}>{role}</h3>
          <h3 className={styles.batStyle}>{batStyle}</h3>
          <h3 className={styles.bowlStyle}>{bowlStyle}</h3>
          {/* <h3 className={styles.id}>{playerId}</h3> */}
        </div>
      </div>
    </main>
  );
}
