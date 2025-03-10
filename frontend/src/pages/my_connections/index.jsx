import { getMyConnectionRequests } from '@/config/redux/action/authAction';
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { use, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function MyConnectionsPage() {

  const dispatch =useDispatch();
  const authState=useSelector((state)=> state.auth)
  useEffect(()=>{
    dispatch(getMyConnectionRequests({token:localStorage.getItem("token")}))
  },[])

     useEffect(() => {
    if (authState.connectionRequest?.length) {
      console.log(authState.connectionRequest);
    }
  }, [authState.connectionRequest]);
  

  
  return (
    <UserLayout>
      <DashboardLayout>
        <div>
          <h1>My Connections</h1>

          {authState.connectionRequest.length !=0 && authState.connectionRequest.map((user)=>{
            return (
              <h1>{user.userId.name}</h1>
            )
          })}
        </div>
       
      </DashboardLayout>

    </UserLayout>
  )
}
