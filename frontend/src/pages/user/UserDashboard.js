import React, {useState, useEffect} from 'react'
import Header from '../../component/Header' 
const UserDashboard = () => {

    const [profile, setProfile] = useState("");

    useEffect(() => {
        fetch('/api/getMe')
        .then(res => {
            return res.json()
        })
        .then(result => {
            console.log(result)
            setProfile(result.thisUser)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

  return (
    <div>
      <Header></Header>
      <h1>User Dashboard</h1>
      <div>
        <h2>Name: {profile.name}</h2>
        <h2>email: {profile.email}</h2>
        <h2>Created at: {new Date(profile.createdAt).toLocaleDateString()}</h2>
        <h2>{profile.role===1 ? "Admin" : "Registred User"}</h2>
      </div>
    </div>
  )
}

export default UserDashboard
