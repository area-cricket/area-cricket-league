import React, { useContext, useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "./firebaseConfig";

import styles from "./page.module.css";
import personImage from "./assets/logo.png";
import tournamentLogoJPG from "./assets/tournament-logo.jpg";
import allSponsors from "./assets/sponsors/all.jpg";
import titleSponsor from "./assets/sponsors/titleSponsor.jpeg";
import noImg from "./assets/noImg.png";
import payment from "./assets/payment.jpeg";
import { StateContext } from "./contexts/Context";
import Spinner from "./components/Spinner";

export default function Registration() {
  const { user } = useContext(StateContext);

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

  // const firebaseRegister = async () => {
  //   setIsLoading(true);
  //   let newDocData = {
  //     name: name,
  //     team: team,
  //     number: number,
  //     role: role,
  //     jerseyNumber: position,
  //     batStyle: batStyle,
  //     bowlStyle: bowlStyle,
  //     jersey: jerseySize,
  //     tracks: pantSize,
  //     image: imageToUpload,
  //     createdAt: new Date(),
  //   };

  //   addDoc(usersCollection, newDocData)
  //     .then((docRef) => {
  //       if (docRef.id) {
  //         alert("Registration Successful");
  //         setIsLoading(false);
  //         window.location.reload();
  //       } else {
  //         alert("Couldn't Register");
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch((err) => {
  //       alert(err);
  //       setIsLoading(false);
  //     });
  // };

  const firebaseRegister = async () => {
    setIsLoading(true);

    // Assuming 'imageToUpload' is a File object from an input element
    const storage = getStorage();
    const storageRef = ref(storage, `images/${imageToUpload.name}`);

    try {
      console.log("imageToUplaod", imageToUpload);
      // Upload the image file to Firebase Storage
      await uploadBytes(storageRef, imageToUpload);

      // Get the download URL for the uploaded file
      const imageUrl = await getDownloadURL(storageRef);

      // Create a new document in Firestore with the image URL
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
        image: imageUrl, // Use the download URL as the image field
        createdAt: new Date(),
      };

      addDoc(usersCollection, newDocData)
        .then((docRef) => {
          if (docRef.id) {
            alert("Registration Successful");
            setIsLoading(false);
            window.location.reload();
          } else {
            alert("Couldn't Register");
            setIsLoading(false);
          }
        })
        .catch((err) => {
          alert(err);
          setIsLoading(false);
        });
    } catch (error) {
      alert("Error uploading image: " + error.message);
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      {isLoading && <Spinner />}
      <div className={styles.bgCopy} ref={componentRef}>
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
            <h3 className={styles.customH3}>
              Hey, the registrations is now closed ! Please contact the event
              organisers more details
            </h3>
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
