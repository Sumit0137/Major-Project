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
//          {authState.user && userProfile?.userId &&
//          <div className={styles.container}>
//            <div className={styles.backDropContainer}>

//              <img className={styles.backDrop} src={`${BASE_URL}/${userProfile.userId.profilePicture}`} alt="backdrop" />
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
// }
//        </DashboardLayout>
//      </UserLayout>

//   )
// }




// import UserLayout from '@/layout/UserLayout'
// import React, { useEffect } from 'react'
// import DashboardLayout from '@/layout/DashboardLayout'
// import { getAboutUser } from '@/config/redux/action/authAction'
// import { useState } from 'react'
// import styles from "./index.module.css"
// import { BASE_URL } from '@/config'
// import { useSelector, useDispatch } from 'react-redux'
// import { getAllPosts } from '@/config/redux/action/postAction'

// export default function ProfilePage() {

//   const authState = useSelector((state) => state.auth);
//   const postReducer = useSelector((state) => state.postReducer);

//   const [userProfile, setUserProfile] = useState(null);
//   const [userPosts, setUserPosts] = useState([]);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     console.log("Fetching user and posts...");
//     dispatch(getAboutUser({ token: localStorage.getItem("token") }));
//     dispatch(getAllPosts());
//   }, []);

//   useEffect(() => {

//     if (authState.user != undefined) {
//       setUserProfile(authState.user)
//       let post = postReducer.posts.filter((post) => {
//         return post.userId.username === authState?.user?.userId?.username
//       })
//       //  console.log(post,authState.user?.userId.username)
//       console.log(post)
//       setUserPosts(post);
//     }

//   }, [authState.user, postReducer.posts])

//   return (
//     <UserLayout>
//       <DashboardLayout>
//         <div className={styles.container}>
//           <div className={styles.backDropContainer}>

//             {/* <img className={styles.backDrop} src={`${BASE_URL}/${userProfile.userId.profilePicture}`} alt="backdrop" />         */}
//             {/* {userProfile?.userId?.profilePicture ? (
//               <img className={styles.backDrop} src={`${BASE_URL}/${userProfile.userId.profilePicture}`} alt="backdrop" />
//             ) : (
//               <div className={styles.backDropPlaceholder}>No Profile Picture</div>
//             )} */}

//             {userProfile?.userId?.profilePicture ? (
//               <img
//                 className={styles.backDrop}
//                 src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
//                 alt="Profile Picture"
//               />
//             ) : (
//               <p>No Profile Picture</p> // Fallback in case profilePicture is missing
//             )}


//           </div>

//           <div className={styles.profileContainer__details}>
//             <div style={{ display: "flex", gap: "0.7rem" }}>
//               <div style={{ flex: "0.8" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
//                   <h2>{userProfile?.userId?.name}</h2>


//                   <p style={{ color: "grey" }}>@{userProfile?.userId?.username}</p>
//                 </div>
//                 <p>{userProfile?.bio}</p>
//               </div>


//               <div style={{ flex: "0.2" }}>
//                 <h3>Recent Activity</h3>
//                 {userPosts.map((post) => {
//                   return (
//                     <div key={post._id} className={styles.postCard}>
//                       <div className={styles.card}>
//                         <div className={styles.card__profileContainer}>
//                           {post.media !== "" ? <img src={`${BASE_URL}/${post.media}`} alt="No image" />
//                             : <div style={{ width: "3.4rem", height: "3.4rem" }}> </div>}
//                         </div>
//                         <p>{post.body}</p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           <div className="workHistory">
//               <h4>Work History</h4>
//               <div className={styles.workHistoryContainer}>
//                 {/* ✅ Fix: Handle null pastWork */}
//                 {userProfile?.pastWork?.length > 0 ? (
//                   userProfile.pastWork.map((work, index) => (
//                     <div key={index} className={styles.workHistoryCard}>
//                       <p
//                         style={{
//                           fontWeight: 'bold',
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '0.8rem',
//                         }}
//                       >
//                         {work.company} - {work.position}
//                       </p>
//                       <p>{work.years}</p>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No Work History Available</p>
//                 )}
//               </div>
//             </div>
//           </div>


//       </DashboardLayout>
//     </UserLayout>
//   );
// }


import UserLayout from '@/layout/UserLayout';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layout/DashboardLayout';
import { getAboutUser } from '@/config/redux/action/authAction';
import styles from "./index.module.css";
import { BASE_URL } from '@/config';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction';

export default function ProfilePage() {
  const authState = useSelector((state) => state.auth);
  const postReducer = useSelector((state) => state.postReducer);

  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  const dispatch = useDispatch();

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

  return (
    <UserLayout>
      <DashboardLayout>
      {/* 🔹 Profile Picture Section */} 
        <div className={styles.container}>
           <div className={styles.backDropContainer}>
            <div className={styles.backDrop__overlay}></div>
            <img
              src={`${BASE_URL}/${userProfile?.userId?.profilePicture || "default.jpg"}`}
              alt="Profile"
              // onError={(e) => { e.target.src = "/default-avatar.png"; }} // Fallback for broken images
            /></div>
          

          {/* 🔹 Profile Details */}
          <div className={styles.profileContainer__details}>
            <div style={{ display: "flex", gap: "0.7rem" }}>
              <div style={{ flex: "0.8" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                  <h2>{userProfile?.name || "No Name"}</h2>
                  <p style={{ color: "grey" }}>@{userProfile?.username || "No Username"}</p>
                </div>
                <p>{userProfile?.bio || "No bio available."}</p>
              </div>
            </div>
          </div>


         


          {/* 🔹 Work History Section */}
          <div className="workHistory">
            <h4>Work History</h4>
            <div className={styles.workHistoryContainer}>
              {userProfile?.pastWork?.length > 0 ? (
                userProfile.pastWork.map((work, index) => (
                  <div key={index} className={styles.workHistoryCard}>
                    <p style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      {work.company} - {work.position}
                    </p>
                    <p>{work.years}</p>
                  </div>
                ))
              ) : (
                <p>No Work History Available</p>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}

