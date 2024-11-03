import React, { useState } from "react";
import { updatePassword } from "../services/auth";
import "./styles/Settings.css";
import nameIcon from "../assets/name.png";
import email from "../assets/icon.png";
import eyeIcon from "../assets/eye-icon.png";
import lockIcon from "../assets/lock.png";
import eyeOffIcon from "../assets/eye-off-icon.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Sidebar from '../component/SideBar.jsx';

export const Settings = () => {
  const [isOldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisible((prev) => !prev);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible((prev) => !prev);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { email, password, newPassword } = userData;
      const response = await updatePassword({ email, password, newPassword });
      if (response.status === 200) {
        toast.success("Password Updated Successfully!");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Failed to update password. Please check your details and try again.");
      console.error("Detailed error:", error.message);
    }
  };

  return (
    <div className="setting-board">
      <Sidebar />
      <div>
        <h1 className="settings-header">Settings</h1>
        <form className="settings-form" onSubmit={handleUpdate}>
          <div className="settings-form-group">
            <div className="settings-input-with-icon">
              <img src={nameIcon} alt="Name Icon" className="settings-input-icon1" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={userData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="settings-form-group">
            <div className="settings-input-with-icon">
              <img src={email} alt="Email Icon" className="settings-input-icon1" />
              <input
                type="email"
                name="email"
                placeholder="Update Email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="settings-form-group">
            <div className="settings-input-with-icon">
              <img src={lockIcon} alt="Lock Icon" className="settings-input-icon1" />
              <input
                type={isOldPasswordVisible ? "text" : "password"}
                name="password"
                placeholder="Old Password"
                value={userData.password}
                onChange={handleChange}
              />
              <img
                src={isOldPasswordVisible ? eyeOffIcon : eyeIcon}
                alt="Toggle Password Visibility"
                className="settings-input-icon2"
                onClick={toggleOldPasswordVisibility}
              />
            </div>
          </div>

          <div className="settings-form-group">
            <div className="settings-input-with-icon">
              <img src={lockIcon} alt="Lock Icon" className="settings-input-icon1" />
              <input
                type={isNewPasswordVisible ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={userData.newPassword}
                onChange={handleChange}
              />
              <img
                src={isNewPasswordVisible ? eyeOffIcon : eyeIcon}
                alt="Toggle Password Visibility"
                className="settings-input-icon2"
                onClick={toggleNewPasswordVisibility}
              />
            </div>
          </div>

          <button type="submit" className="update-button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};



// import React, { useState, useEffect } from "react";
// import { updatePassword } from "../services/auth";
// import "../styles/Settings.css";
// import nameIcon from "../assets/name.png";
// import emailIcon from "../assets/icon.png";
// import eyeIcon from "../assets/eye-icon.png";
// import lockIcon from "../assets/lock.png";
// import eyeOffIcon from "../assets/eye-off-icon.png";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const Settings = () => {
//   // const [name, setName] = useState("");
//   // const [email, setEmail] = useState("");
//   // const [password, setPassword] = useState("");
//   // const [newPassword, setNewPassword] = useState("");
//   const [isOldPasswordVisible, setOldPasswordVisible] = useState(false);
//   const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
//   const [iconVisible, setIconVisible] = useState(true);

//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     newPassword: ""
//   });

//   const Navigate = useNavigate();

//   // Fetch user data from localStorage
//   useEffect(() => {
//     const existingName = localStorage.getItem("name");
//     const existingEmail = localStorage.getItem("email");
//     console.log("Existing Name:", existingName);
//     console.log("Existing Email:", existingEmail);
//     // setName(existingName || "");
//     // setEmail(existingEmail || "");
//   }, []);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     // console.log("Updated details: ", { name, email, oldPassword, newPassword });

//     // if (!name || !email || !password || !newPassword) {
//     //   toast.error("Please fill all the required details...");
//     //   return;
//     // }
//     // if (password === newPassword) {
//     //   toast.error("Old password and new password must not be same.");
//     //   return;
//     // }

//     try {
//       const response = await updatePassword({
//         ...userData
//       });
//       console.log("updat1e");
//       if (response.status === 200) {
//         const { data } = response;
//         console.log(data);
//         // localStorage.setItem("name", name);
//         // localStorage.setItem("email", email);
//         // localStorage.setItem("updated password", newPassword);
//         toast.success("Password Updated Successfully....!!! ");
//         Navigate("/login");
//         console.log("User data updated successfully");
//       }
//     } catch (error) {
//       console.error("Error updating user data:", error);
//     }
//   };

//   //To show old password
//   const toggleOldPasswordVisibility = () => {
//     setOldPasswordVisible(!isOldPasswordVisible);
//     setIconVisible(!iconVisible);
//   };

//   //To show New password
//   const toggleNewPasswordVisible = () => {
//     setNewPasswordVisible(!isNewPasswordVisible);
//     setIconVisible(!iconVisible);
//   };

//   return (
//     <>
//       <h1 className="settings-header">Settings</h1>
//       <form className="settings-form" onSubmit={handleUpdate}>
//         <div className="settings-form-group">
//           <div className="settings-input-with-icon">
//             <img
//               src={nameIcon}
//               alt="Name Icon"
//               className="settings-input-icon1"
//             />
//             <input
//               type="text"
//               id="name"
//               placeholder="Name"
//               value={userData.name}
//               // onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="settings-form-group">
//           <div className="settings-input-with-icon">
//             <img
//               src={emailIcon}
//               alt="Email Icon"
//               className="settings-input-icon1"
//             />
//             <input
//               type="email"
//               id="email"
//               placeholder="Update Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="settings-form-group">
//           <div className="settings-input-with-icon">
//             <img
//               src={lockIcon}
//               alt="Lock Icon"
//               className="settings-input-icon1"
//             />
//             <input
//               type={isOldPasswordVisible ? "text" : "password"}
//               id="oldPassword"
//               placeholder="Old Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <img
//               src={isOldPasswordVisible ? eyeOffIcon : eyeIcon}
//               alt="Eye Icon"
//               className="settings-input-icon2"
//               onClick={toggleOldPasswordVisibility}
//             />
//           </div>
//         </div>

//         <div className="settings-form-group">
//           <div className="settings-input-with-icon">
//             <img
//               src={lockIcon}
//               alt="Lock Icon"
//               className="settings-input-icon1"
//             />
//             <input
//               type={isNewPasswordVisible ? "text" : "password"}
//               id="newPassword"
//               placeholder="New Password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//             />
//             <img
//               src={isNewPasswordVisible ? eyeOffIcon : eyeIcon}
//               alt="Eye Icon"
//               className="settings-input-icon2"
//               onClick={toggleNewPasswordVisible}
//             />
//           </div>
//         </div>

//         <button type="submit" className="update-button">
//           Update
//         </button>
//       </form>
//     </>
//   );
// };

// export default Settings;
