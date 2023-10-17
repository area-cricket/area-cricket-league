import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

import styles from "./page.module.css";
import personImage from "./assets/logo.png";
import tournamentLogoJPG from "./assets/tournament-logo.jpg";
import allSponsors from "./assets/sponsors/all.jpg";
import titleSponsor from "./assets/sponsors/titleSponsor.jpeg";
import noImg from "./assets/noImg.png";
import payment from "./assets/payment.jpeg";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { StateContext } from "./contexts/Context";

export default function Registration() {
  const { user, getFirebaseData } = useContext(StateContext);

  const componentRef = useRef();
  const usersCollection = collection(db, "users");

  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [position, setPosition] = useState("");
  const [role, setRole] = useState("");
  const [batStyle, setBatStyle] = useState("");
  const [bowlStyle, setBowlStyle] = useState("");
  const [number, setNumber] = useState("");
  const [jerseySize, setJerseySize] = useState("");
  const [pantSize, setPantSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageToUpload, setImageToUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nextId, setNextId] = useState(user?.id);

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleTeam = (event) => {
    setTeam(event.target.value);
  };
  const handlePosition = (event) => {
    setPosition(event.target.value);
  };
  const handleRole = (event) => {
    setRole(event.target.value);
  };
  const handleBatStyle = (event) => {
    setBatStyle(event.target.value);
  };
  const handleBowlStyle = (event) => {
    setBowlStyle(event.target.value);
  };
  const handleJerseySize = (event) => {
    setJerseySize(event.target.value);
  };
  const handlePantSize = (event) => {
    setPantSize(event.target.value);
  };
  const handleNumber = (event) => {
    setNumber(event.target.value);
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    setImageToUpload(file);

    if (file) {
      // Convert the image to Base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        localStorage.setItem("myImage", imageData);
        setSelectedImage(imageData);
      };

      reader.readAsDataURL(file);
    }
  };

  // const registerPlayer = () => {
  //   setIsLoading(true);
  //   let formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("team", team);
  //   formData.append("phone", number);
  //   formData.append("role", role);
  //   formData.append("jerseyNumber", position);
  //   formData.append("batting", batStyle);
  //   formData.append("bowling", bowlStyle);
  //   formData.append("jersey", jerseySize);
  //   formData.append("tracks", pantSize);
  //   formData.append("image", imageToUpload);
  //   formData.append()

  //   axios
  //     .post(`${baseUrl}cricket/register`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.success) {
  //         setIsLoading(false);
  //         alert("Registration Successful");
  //       }
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //       alert("Couldn't complete registration");
  //     });
  // };

  useEffect(() => {
    getFirebaseData().then((res) => {
      setNextId(user.length + 1);
    });
  }, []);

  const firebaseRegister = async () => {
    setIsLoading(true);
    let newDocData = {
      name: name,
      team: team,
      number: number,
      role: role,
      jerseyNumber: position,
      batStyle: batStyle,
      bowlStyle: bowlStyle,
      jersey: jerseySize,
      tracks: pantSize,
      image: selectedImage,
      id: nextId || 0,
    };

    addDoc(usersCollection, newDocData).then((docRef) => {
      if (docRef.id) {
        alert("Registration Successful");
        setIsLoading(false);
      } else {
        alert("Couldn't Register");
        setIsLoading(false);
      }
    });
  };
  
  return (
    <main className={styles.main}>
      <div className={styles.bg} ref={componentRef}>
        <div className={styles.wrapper}>
          <div className={styles.inputContainer}>
            <div className={styles.logosWrapper}>
              <img
                src={personImage}
                alt="cricket-t20"
                className={styles.imageStyle}
              />
              <img
                src={tournamentLogoJPG}
                alt="cricket-t20"
                className={styles.imageStyle}
              />
            </div>
            <div className={styles.inputsWrapper}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    className={styles.imageStyle}
                  />
                ) : (
                  <img
                    src={noImg}
                    alt="No item"
                    className={styles.imageStyle}
                  />
                )}
              </div>

              <input
                type="text"
                required
                placeholder="Name"
                className={styles.inputBoxes}
                value={name}
                onChange={handleName}
              />
              <input
                type="text"
                required
                placeholder="Team"
                className={styles.inputBoxes}
                value={team}
                onChange={handleTeam}
              />
              <input
                type="text"
                required
                placeholder="Jersey Number"
                className={styles.inputBoxes}
                value={position}
                onChange={handlePosition}
              />
              <input
                type="text"
                required
                placeholder="Role"
                className={styles.inputBoxes}
                value={role}
                onChange={handleRole}
              />
              <select className={styles.inputBoxes} onChange={handleBatStyle}>
                <option value="" disabled selected>
                  Batting Style
                </option>
                <option>Right</option>
                <option>Left</option>
              </select>
              <select className={styles.inputBoxes} onChange={handleBowlStyle}>
                <option value="" disabled selected>
                  Bowling Style
                </option>
                <option>Right</option>
                <option>Left</option>
              </select>
              <select className={styles.inputBoxes} onChange={handleJerseySize}>
                <option value="" disabled selected>
                  Jersey Size
                </option>
                <option>36</option>
                <option>38</option>
                <option>40</option>
                <option>42</option>
                <option>44</option>
                <option>46</option>
              </select>
              <select className={styles.inputBoxes} onChange={handlePantSize}>
                <option value="" disabled selected>
                  Track Pant Size
                </option>
                <option>26</option>
                <option>28</option>
                <option>30</option>
                <option>32</option>
                <option>34</option>
                <option>36</option>
              </select>
              <input
                type="text"
                required
                placeholder="Contact Number"
                className={styles.inputBoxes}
                value={number}
                onChange={handleNumber}
              />
              <label for="image" class="custom-file-upload">
                <span>Photo (Max: 1MB - 500*500)</span>
                <input
                  type="file"
                  id="image"
                  name="sampleFile"
                  onChange={handleImageUpload}
                />
              </label>
              <img src={payment} alt="payment" className={styles.qrCode} />
              <label for="payment Input" class="custom-file-upload">
                <span>Upload payment screenshot</span>
                <input type="file" id="payment Input" />
              </label>
              <div
                style={{
                  margin: "10px auto",
                  display: "flex",
                  justifyContent: "center",
                  width: "98%",
                }}
              >
                {/* <button onClick={() => firebaseRegister()}>Reg fire</button> */}
                <button
                  style={{
                    border: "none",
                    background: "#ffc400",
                    borderRadius: "3px",
                    padding: "8px 15px",
                    fontWeight: "700",
                    width: "100%",
                  }}
                  disabled={
                    name.length === 0 ||
                    position.length === 0 ||
                    role.length === 0 ||
                    batStyle.length === 0 ||
                    bowlStyle.length === 0 ||
                    number.length === 0 ||
                    selectedImage === null
                  }
                  onClick={() => {
                    if (!isLoading) {
                      firebaseRegister();
                    }
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.titleSponsorsWrapper}>
          <img
            src={titleSponsor}
            alt="Uploaded"
            className={styles.titleSponsor}
          />
        </div>

        <div className={styles.sponsorsWrapper}>
          <img src={allSponsors} alt="Uploaded" className={styles.sponsorImg} />
        </div>
      </div>

      <h5 style={{ margin: "10px" }}>
        Created with ❤️ by{" "}
        <a
          href="https://www.codescap.com"
          style={{ textDecoration: "none", color: "#CC3333" }}
        >
          Codescap
        </a>
      </h5>
    </main>
  );
}
