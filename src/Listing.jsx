import React, { useEffect, useRef, useState } from "react";
import { Table } from "antd";
import ReactToPrint from "react-to-print";
import axios from "axios";

import styles from "./page.module.css";

export default function ListPlayers() {
  const componentRef = useRef();
  const downloadButtonRef = useRef();

  const [data, setData] = useState([]);
  const [team, setTeam] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [batStyle, setBatStyle] = useState("");
  const [bowlStyle, setBowlStyle] = useState("");
  const [number, setNumber] = useState("");
  const [playerId, setPlayerId] = useState("");
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
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Batting Style",
      dataIndex: "batting",
      key: "batting",
    },
    {
      title: "Bowling Style",
      dataIndex: "bowling",
      key: "bowling",
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
      dataIndex: "phone",
      key: "phone",
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
    setBatStyle(item.batting);
    setBowlStyle(item.bowling);
    setNumber(item.phone);
    setPlayerId(item.id);
    setSelectedImage(item.image);
    setTimeout(() => {
      triggerDownloadButtonClick();
    }, 1500);
  };

  const getPlayers = () => {
    let config = {
      method: "get",
      url: "http://18.234.178.235:7000/cricket/players",
    };

    axios(config)
      .then((res) => {
        setData(res.data.players);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getPlayers();
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

  console.log("data", data);

  return (
    <main className={styles.main}>
      <h1 style={{ color: "#a26f00" }}>Registered Players List</h1>
      <Table columns={columns} dataSource={data} />
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
        style={{ display: "" }}
      >
        <div className={styles.cardWrapper}>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Uploaded"
              className={styles.uploadedImg}
            />
          )}
          <div className={styles.id}>
            <h1 style={{ fontSize: "25px" }}>{playerId}</h1>
          </div>
          <h2 className={styles.name}>{name}</h2>
          <h2 className={styles.team}>{team}</h2>
          <h3 className={styles.number}>{number}</h3>
          <h3 className={styles.role}>{role}</h3>
          <h3 className={styles.batStyle}>{batStyle}</h3>
          <h3 className={styles.bowlStyle}>{bowlStyle}</h3>
        </div>
      </div>
    </main>
  );
}
