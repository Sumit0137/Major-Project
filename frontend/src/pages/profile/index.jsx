//  import UserLayout from '@/layout/UserLayout'
// import React, { useEffect } from 'react'
//  import Dashboard from '../dashboard'
//  import DashboardLayout from '@/layout/DashboardLayout'
//  import { getAboutUser } from '@/config/redux/action/authAction'
//  import { useState } from 'react'
//  import styles from "./index.module.css"
//  import { BASE_URL } from '@/config'
//  import { useSelector ,useDispatch} from 'react-redux'
//  import { getAllPosts } from '@/config/redux/action/postAction'

// export default function ProfilePage() {

//    const authState=useSelector((state)=>state.auth)
//   const postReducer=useSelector((state)=>state.postReducer)

//    const[userProfile,setUserProfile]=useState({})
//     const [userPosts,setUserPosts]=useState([])


//   const dispatch=useDispatch();

//    useEffect(()=>{
//      dispatch(getAboutUser({token:localStorage.getItem("token")}))
//     dispatch(getAllPosts())
//    },[])

//    useEffect(()=>{


//     if(authState.user!= undefined) {
//       setUserProfile(authState.user)
//       let post = postReducer.posts.filter((post) => {
//         return post.userId.username ===authState.user.username
//       })
//       // console.log(post,authState.user?.userId.username)
//       setUserPosts(post);
//     }

//    },[authState.user ,postReducer.posts])

//   return (
//      <UserLayout>
//        <DashboardLayout>
//          {/* {authState.user && userProfile?.userId && */}

//          <div className={styles.container}>
//            <div className={styles.backDropContainer}>

//              <img className={styles.backDrop} src={`${BASE_URL}/${userProfile?.userId?.profilePicture}`} alt="backdrop" />
//            </div>



//            <div className={styles.profileContainer__details}>
//              <div style={{ display: "flex", gap: "0.7rem" }}>

//                <div style={{ flex: "0.8" }}>

//                  <div style={{ display: "flex", width: "fit-content", alignItems: "center", gap: "1.2rem" }}>
//                    <h2>{userProfile.userId.name}</h2>
//                    <p style={{ color: "grey" }}> @{userProfile.userId.username}</p>
//                  </div>

//                  <div>
//                    <p>{userProfile.bio}</p>
//                  </div>
//                </div>

//                <div style={{ flex: "0.2" }}>
//                  <h3>Recent Activity</h3>
//                  {userPosts.map((post) => {
//                    return (
//                      <div key={post._id} className={styles.postCard}>
//                        <div className={styles.card}>
//                          <div className={styles.card__profileContainer}>
//                            {post.media !== "" ? <img src={`${BASE_URL}/${post.media}`} alt="No image" />
//                              : <div style={{ width: "3.4rem", height: "3.4rem" }}> </div>}
//                          </div>
//                          <p>{post.body}</p>
//                        </div>
//                      </div>
//                    );
//                  })}
//                </div>


//                <div style={{ flex: "0.2" }}></div>
//              </div>
//            </div>

//            <div className="workHistory">
//              <h4>Work History</h4>

//              <div className={styles.workHistoryContainer}>
//                {
//                  userProfile.pastWork.map((work, index) => {
//                    return (
//                      <div key={index} className={styles.workHistoryCard}>
//                        <p style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.8rem" }}> {work.company} -{work.postition}
//                        </p>

//                        <p>{work.years}</p>
//                      </div>
//                    )
//                  })
//                }
//              </div>
//            </div>
//          </div>

//        </DashboardLayout>
//      </UserLayout>

//   )
// }





import UserLayout from '@/layout/UserLayout';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layout/DashboardLayout';
import { getAboutUser } from '@/config/redux/action/authAction';
import styles from "./index.module.css";
import clientServer, { BASE_URL } from '@/config';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction';


export default function ProfilePage() {
  const authState = useSelector((state) => state.auth);
  const postReducer = useSelector((state) => state.postReducer);

  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [inputData, setInputData] = useState({ company: '', position: '', years: '' });

  const handleWorkInputchange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  }

  // New Part

  const addWorkExperience = () => {
    if (!inputData.company || !inputData.position || !inputData.years) {
      alert("Please fill in all fields!");
      return;
    }

    setUserProfile((prev) => ({
      ...prev,
      pastWork: [...(prev.pastWork || []), inputData], // Ensure pastWork exists
    }));

    setInputData({ company: "", position: "", years: "" }); // Reset form
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log("Fetching user and posts...");
    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    console.log("AuthState User:", authState.user);
    console.log("PostReducer Posts:", postReducer.posts);

    if (authState.user) {
      setUserProfile(authState.user);

      let filteredPosts = postReducer.posts.filter((post) =>
        post?.userId?.username === authState?.user?.username
      );

      console.log("Filtered Posts:", filteredPosts);
      setUserPosts(filteredPosts);
    }
  }, [authState.user, postReducer.posts]);



  if (!userProfile) {
    return <p>Loading Profile...</p>; // Ensures UI doesn't break while fetching data
  }

  // const updateProfilePicture = async (file)=>{
  //   const formData=new FormData();
  //   formData.append("profile_picture",file);
  //   formData.append("token",localStorage.getItem("token"));

  //   const response=await clientServer.post("/update_profile_picture",formData,{
  //     headers:{
  //       'Content-Type':'multipart/form-data',
  //     },
  //   });
  //   dispatch(getAboutUser({token:localStorage.getItem("token")}));
  // }


  const updateProfilePicture = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_picture", file);
    formData.append("token", localStorage.getItem("token"));

    try {
      const response = await clientServer.post("/update_profile_picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(getAboutUser({ token: localStorage.getItem("token") }));

      if (response.data.profilePicture) {
        // 🔹 Update user profile state with the new image
        setUserProfile((prev) => ({
          ...prev,
          userId: { ...prev.userId, profilePicture: response.data.profilePicture },
        }));
      }
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
    }
  };

  const updateProfileData = async () => {
    const request = await clientServer.post("/user_update", {
      token: localStorage.getItem("token"),
      name: userProfile?.userId?.name,
    });

    const response = await clientServer.post("/update_profile_data", {
      token: localStorage.getItem("token"),
      bio: userProfile.bio,
      currentPost: userProfile.currentPost,
      pastWork: userProfile.pastwork,
      education: userProfile.education
    });

    dispatch(getAboutUser({ token: localStorage.getItem("token") }))
  }




  return (
    <UserLayout>
      <DashboardLayout>
        {/* 🔹 Profile Picture Section */}
        <div className={styles.container}>
          <div className={styles.backDropContainer}>
            <label htmlFor='profilePictureUpload' className={styles.backDrop__overlay}>
              <p>
                Edit
              </p>
            </label>
            <input onChange={(e) => {
              updateProfilePicture(e.target.files[0])
            }} hidden type="file" id="profilePictureUpload" />
            <img
              src={`${BASE_URL}/${userProfile?.userId?.profilePicture || "default.jpg"}`}
              alt="Profile" />
            {/* onError={(e) => { e.target.src = "/default-avatar.png"; }} // Fallback for broken images */}
          </div>


          {/* 🔹 Profile Details */}
          <div className={styles.profileContainer__details}>
            <div style={{ display: "flex", gap: "0.7rem" }}>
              <div style={{ flex: "0.8" }}>

                <div style={{ display: "flex", width: "fit-content", alignItems: "center", gap: "1.2rem" }}>

                  <input
                    className={styles.nameEdit}
                    type="text"
                    value={userProfile?.userId?.name || ""} // Ensures controlled behavior
                    onChange={(e) => {
                      setUserProfile((prev) => ({
                        ...prev,
                        userId: { ...prev?.userId, name: e.target.value },
                      }));
                    }}
                  />
                  <p style={{ color: "grey" }}>@{userProfile?.userId?.username}</p>
                </div>

                <div>
                  <textarea
                    value={userProfile.bio}
                    onChange={(e) => {
                      setUserProfile({ ...userProfile, bio: e.target.value });
                    }}
                    rows={Math.max(3, Math.ceil((userProfile?.bio?.length || 0) / 80))}

                    style={{ width: "100%" }}
                  ></textarea>
                </div>
              </div>

              {/* <div style={{ flex: "0.2" }}>
                <h3>Recent Activity</h3>
                {userPosts.map((post) => {
                  return (
                    <div key={post._id} className={styles.postCard}>
                      <div className={styles.card}>
                         <div className={styles.card__profileContainer}>
                          {post.media !== "" ?
                            <img src={`${BASE_URL}/${post.media}`} alt="No image" />
                            : <div style={{ width: "3.4rem", height: "3.4rem" }}> </div>}
                        </div> 
                        <p>{post.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ flex: "0.2" }}></div>
            </div>
          </div> */}

              <div style={{ flex: "0.2" }}>
                <h3>Recent Activity</h3>
                {userPosts.map((post) => (
                  <div key={post._id} className={styles.postCard}>
                    <div className={styles.card}>
                      <div className={styles.card__profileContainer}>
                        {post.media !== "" ? (
                          <img src={`${BASE_URL}/${post.media}`} alt="No image" />
                        ) : (
                          <div style={{ width: "3.4rem", height: "3.4rem" }}> </div>
                        )}
                      </div>
                      <p>{post.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ flex: "0.2" }}></div>
            </div>
          </div>



          {/* 🔹 Work History Section */}
          <div className="workHistory">
            <h4>Work History</h4>
            <div className={styles.workHistoryContainer}>
              {
                userProfile?.pastWork?.map((work, index) => {
                  return (
                    <div key={index} className={styles.workHistoryCard}>
                      <p style={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>{work.company} -{work.position}</p>
                      <p> {work.years}</p>
                    </div>
                  )
                })
              }

              {/* <button className={styles.addWorkButton} onClick={()=>{
                setIsModalOpen(true)
              }}>Add Work</button> */}
              <div onClick={addWorkExperience} className={styles.updateProfileBtn}>
                Add Work
              </div>

            </div>
          </div>

          {userProfile != authState.user
            && <div onClick={() => {
              updateProfileData();
            }} className={styles.updateProfileBtn}>
              Update Profile
            </div>
          }
        </div>



        {isModalOpen &&
          <div onClick={() => {
            setIsModalOpen(false)
          }}
            className={styles.commentsContainer}>
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
              className={styles.allCommentsContainer}>
              <input onChange={handleWorkInputchange} name='company' className={styles.inputField} type="text" placeholder="Enter Company" />
              <input onChange={handleWorkInputchange} name='position' className={styles.inputField} type="text" placeholder="Enter Postion" />
              <input onChange={handleWorkInputchange} name='years' className={styles.inputField} type="number" placeholder="Years " />

              <div onClick={() => {
                setUserProfile({ ...userProfile, pastWork: [...userProfile.pastWork, inputData] })
                setIsModalOpen(false)
              }} className={styles.updateProfileBtn}>Add Work</div>
            </div>
          </div>
        }

      </DashboardLayout>
    </UserLayout>
  );
}



// import UserLayout from '@/layout/UserLayout';
// import React, { useEffect, useState } from 'react';
// import DashboardLayout from '@/layout/DashboardLayout';
// import { getAboutUser } from '@/config/redux/action/authAction';
// import styles from "./index.module.css";
// import clientServer, { BASE_URL } from '@/config';
// import { useSelector, useDispatch } from 'react-redux';
// import { getAllPosts } from '@/config/redux/action/postAction';

// export default function ProfilePage() {
//   const authState = useSelector((state) => state.auth);
//   const postReducer = useSelector((state) => state.postReducer);

//   const [userProfile, setUserProfile] = useState(null);
//   const [userPosts, setUserPosts] = useState([]);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     console.log("Fetching user and posts...");

//     async function fetchData() {
//       await dispatch(getAboutUser());
//       await dispatch(getAllPosts());
//     }

//     fetchData();
//   }, [dispatch]);

//   useEffect(() => {
//     console.log("AuthState User:", authState.user);
//     console.log("PostReducer Posts:", postReducer.posts);

//     if (authState?.user && authState?.user?._id) {
//       setUserProfile(authState.user);

//       const filteredPosts = postReducer.posts.filter(
//         (post) => post?.userId?._id === authState?.user?._id
//       );

//       console.log("Filtered Posts:", filteredPosts);
//       // 
//       filteredPosts.forEach((post) => {
//         console.log("Post Media URL:", post.media); // ✅ Check if `post.media` has valid paths
//       });
//       setUserPosts(filteredPosts);
//     }
//   }, [authState.user, postReducer.posts]);

//   if (!userProfile) {
//     return <p>Loading Profile...</p>;
//   }

//   const updateProfilePicture = async (file) => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("profile_picture", file);
//     formData.append("token", localStorage.getItem("token"));

//     try {
//       const response = await clientServer.post("/update_profile_picture", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       dispatch(getAboutUser());

//       if (response.data.profilePicture) {
//         setUserProfile((prev) => ({
//           ...prev,
//           userId: { ...prev.userId, profilePicture: response.data.profilePicture },
//         }));
//       }
//     } catch (error) {
//       console.error("Upload failed:", error.response?.data || error.message);
//     }
//   };

//   const updateProfileData = async () => {
//     try {
//       const payload = {
//         token: localStorage.getItem("token"),
//         bio: userProfile?.bio || "",
//         currentPost: userProfile?.currentPost || "",
//         pastWork: userProfile?.pastWork || [],
//         education: userProfile?.education || []
//       };

//       console.log("Updating profile with data:", payload);

//       const response = await clientServer.post("/update_profile_data", payload);

//       if (response.status === 200) {
//         alert("Profile updated successfully!");
//         dispatch(getAboutUser());
//       } else {
//         console.error("Failed to update profile:", response.data);
//         alert("Failed to update profile.");
//       }
//     } catch (error) {
//       console.error("Update failed:", error.response?.data || error.message);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <UserLayout>
//       <DashboardLayout>
//         <div className={styles.container}>
//           {/* Profile Picture Section */}
//           <div className={styles.backDropContainer}>
//             <label htmlFor='profilePictureUpload' className={styles.backDrop__overlay}>
//               <p>Edit</p>
//             </label>
//             <input
//               onChange={(e) => updateProfilePicture(e.target.files[0])}
//               hidden
//               type="file"
//               id="profilePictureUpload"
//             />
//             <img
//               src={userProfile?.userId?.profilePicture ? `${BASE_URL}/${userProfile.userId.profilePicture}` : "/default.jpg"}
//               alt="Profile"
//               onError={(e) => { e.target.src = "/default.jpg"; }} // Fallback in case of error
//             />
//           </div>

//           {/* Profile Details Section */}
//           <div className={styles.profileContainer__details}>
//             <div style={{ display: "flex", gap: "0.7rem" }}>
//               <div style={{ flex: "0.8" }}>
//                 <div style={{ display: "flex", width: "fit-content", alignItems: "center", gap: "1.2rem" }}>
//                   <input
//                     className={styles.nameEdit}
//                     type="text"
//                     value={userProfile?.userId?.name || ""}
//                     onChange={(e) => {
//                       setUserProfile((prev) => ({
//                         ...prev,
//                         userId: { ...prev?.userId, name: e.target.value },
//                       }));
//                     }}
//                   />
//                   <p style={{ color: "grey" }}>@{userProfile?.userId?.username}</p>
//                 </div>

//                 <div>
//                   <textarea
//                     value={userProfile.bio}
//                     onChange={(e) => {
//                       setUserProfile((prev) => ({
//                         ...prev,
//                         bio: e.target.value
//                       }));
//                     }}
//                     rows={Math.max(3, Math.ceil((userProfile?.bio?.length || 0) / 80))}
//                     style={{ width: "100%" }}
//                   ></textarea>
//                 </div>
//               </div>

//               {/* Recent Activity Section */}
//               <div style={{ flex: "0.2" }}>
//                 <h3>Recent Activity</h3>
//                 {userPosts.map((post) => {
//                   console.log("Post Media:", post.media); // Debugging log

//                   return (
//                     <div key={post._id} className={styles.postCard}>
//                       <div className={styles.card}>
//                         <div className={styles.card__profileContainer}>
//                           {post.media ? (
//                             <img
//                             key={post._id} // Forces re-render
//                             src={`${BASE_URL}/${post.media.replace(/^\/+/, "")}`}
//                             alt="Post"
//                             style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                             onError={(e) => { e.target.src = "/default-post.jpg"; }} // Fallback image
//                           />
//                           ) : (
//                             <div style={{ width: "3.4rem", height: "3.4rem", background: "#ccc" }}></div>
//                           )}
//                         </div>
//                         <p>{post.body}</p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Work History Section */}
//           <div className="workHistory">
//             <h4>Work History</h4>
//             <div className={styles.workHistoryContainer}>
//               {userProfile?.pastWork?.map((work, index) => (
//                 <div key={index} className={styles.workHistoryCard}>
//                   <p style={{ fontWeight: "bold" }}>{work.company} - {work.position}</p>
//                   <p>{work.years}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Update Profile Button */}
//           <div onClick={updateProfileData} className={styles.updateProfileBtn}>
//             Update Profile
//           </div>
//         </div>
//       </DashboardLayout>
//     </UserLayout>
//   );
// }


// import UserLayout from '@/layout/UserLayout';
// import React, { useEffect, useState } from 'react';
// import DashboardLayout from '@/layout/DashboardLayout';
// import { getAboutUser } from '@/config/redux/action/authAction';
// import styles from "./index.module.css";
// import clientServer, { BASE_URL } from '@/config';
// import { useSelector, useDispatch } from 'react-redux';
// import { getAllPosts } from '@/config/redux/action/postAction';

// export default function ProfilePage() {
//   const authState = useSelector((state) => state.auth);
//   const postReducer = useSelector((state) => state.postReducer);

//   const [userProfile, setUserProfile] = useState(null);
//   const [userPosts, setUserPosts] = useState([]);
//   const dispatch = useDispatch();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [inputData, setInputData] = useState({ company: "", position: "", years: "" });

//   const handleWorkInputChange = (e) => {
//     const { name, value } = e.target;
//     setInputData((prev) => ({ ...prev, [name]: value }));
//   };

//   const addWorkExperience = () => {
//     if (!inputData.company || !inputData.position || !inputData.years) {
//       alert("Please fill in all fields!");
//       return;
//     }

//     setUserProfile((prev) => ({
//       ...prev,
//       pastWork: [...(prev.pastWork || []), inputData], // Ensure pastWork exists
//     }));

//     setInputData({ company: "", position: "", years: "" }); // Reset form
//     setIsModalOpen(false);
//   };

//   useEffect(() => {
//     dispatch(getAboutUser({ token: localStorage.getItem("token") }));
//     dispatch(getAllPosts());
//   }, [dispatch]);

//   useEffect(() => {
//     if (authState.user) {
//       setUserProfile(authState.user);

//       let filteredPosts = postReducer.posts.filter((post) =>
//         post?.userId?.username === authState?.user?.username
//       );

//       setUserPosts(filteredPosts);
//     }
//   }, [authState.user, postReducer.posts]);

//   if (!userProfile) {
//     return <p>Loading Profile...</p>;
//   }

//   const updateProfilePicture = async (file) => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("profile_picture", file);
//     formData.append("token", localStorage.getItem("token"));

//     try {
//       const response = await clientServer.post("/update_profile_picture", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       dispatch(getAboutUser({ token: localStorage.getItem("token") }));

//       if (response.data.profilePicture) {
//         setUserProfile((prev) => ({
//           ...prev,
//           userId: { ...prev.userId, profilePicture: response.data.profilePicture },
//         }));
//       }
//     } catch (error) {
//       console.error("Upload failed:", error.response?.data || error.message);
//     }
//   };

//   const updateProfileData = async () => {
//     await clientServer.post("/user_update", {
//       token: localStorage.getItem("token"),
//       name: userProfile?.userId?.name,
//     });

//     await clientServer.post("/update_profile_data", {
//       token: localStorage.getItem("token"),
//       bio: userProfile.bio,
//       currentPost: userProfile.currentPost,
//       pastWork: userProfile.pastWork,
//       education: userProfile.education,
//     });

//     dispatch(getAboutUser({ token: localStorage.getItem("token") }));
//   };

//   return (
//     <UserLayout>
//       <DashboardLayout>
//         {/* 🔹 Profile Picture Section */}
//         <div className={styles.container}>
//           <div className={styles.backDropContainer}>
//             <label htmlFor="profilePictureUpload" className={styles.backDrop__overlay}>
//               <p>Edit</p>
//             </label>
//             <input
//               onChange={(e) => updateProfilePicture(e.target.files[0])}
//               hidden
//               type="file"
//               id="profilePictureUpload"
//             />
//             <img
//               src={`${BASE_URL}/${userProfile?.userId?.profilePicture || "default.jpg"}`}
//               alt="Profile"
//             />
//           </div>

//           {/* 🔹 Profile Details */}
//           <div className={styles.profileContainer__details}>
//             <div style={{ display: "flex", gap: "0.7rem" }}>
//               <div style={{ flex: "0.8" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
//                   <input
//                     className={styles.nameEdit}
//                     type="text"
//                     value={userProfile?.userId?.name || ""}
//                     onChange={(e) =>
//                       setUserProfile((prev) => ({
//                         ...prev,
//                         userId: { ...prev?.userId, name: e.target.value },
//                       }))
//                     }
//                   />
//                   <p style={{ color: "grey" }}>@{userProfile?.userId?.username}</p>
//                 </div>

//                 <textarea
//                   value={userProfile.bio}
//                   onChange={(e) =>
//                     setUserProfile({ ...userProfile, bio: e.target.value })
//                   }
//                   rows={Math.max(3, Math.ceil((userProfile?.bio?.length || 0) / 80))}
//                   style={{ width: "100%" }}
//                 ></textarea>
//               </div>
//             </div>
//           </div>

//           {/* 🔹 Work History Section */}
//           <div className="workHistory">
//             <h4>Work History</h4>
//             <div className={styles.workHistoryContainer}>
//               {userProfile?.pastWork?.map((work, index) => (
//                 <div key={index} className={styles.workHistoryCard}>
//                   <p style={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
//                     {work.company} - {work.position}
//                   </p>
//                   <p>{work.years} years</p>
//                 </div>
//               ))}

//               <button className={styles.addWorkButton} onClick={() => setIsModalOpen(true)}>
//                 Add Work
//               </button>
//             </div>
//           </div>

//           {/* Update Profile Button */}
//           {userProfile !== authState.user && (
//             <div onClick={updateProfileData} className={styles.updateProfileBtn}>
//               Update Profile
//             </div>
//           )}
//         </div>

//         {/* Work Experience Modal */}
//         {isModalOpen && (
//           <div onClick={() => setIsModalOpen(false)} className={styles.commentsContainer}>
//             <div onClick={(e) => e.stopPropagation()} className={styles.allCommentsContainer}>
//               <input
//                 onChange={handleWorkInputChange}
//                 value={inputData.company}
//                 name="company"
//                 className={styles.inputField}
//                 type="text"
//                 placeholder="Enter Company"
//               />
//               <input
//                 onChange={handleWorkInputChange}
//                 value={inputData.position}
//                 name="position"
//                 className={styles.inputField}
//                 type="text"
//                 placeholder="Enter Position"
//               />
//               <input
//                 onChange={handleWorkInputChange}
//                 value={inputData.years}
//                 name="years"
//                 className={styles.inputField}
//                 type="number"
//                 placeholder="Years"
//               />

//               <div onClick={addWorkExperience} className={styles.updateProfileBtn}>
//                 Add Work
//               </div>
//             </div>
//           </div>
//         )}
//       </DashboardLayout>
//     </UserLayout>
//   );
// }
