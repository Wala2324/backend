import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../Components/AuthContext";

const ProfilePage = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
 


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.status === 200) {
          setProfile(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error.message);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold">Profile Page</h2>

      {profile ? (
        <div className="card shadow-sm p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">{profile.firstName} {profile.lastName}</h4>
            <span className="badge bg-primary text-uppercase">{profile.role}</span>
          </div>
          <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
        </div>
      ) : (
        <div className="alert alert-secondary">Loading profile...</div>
      )}
    </div>
  );
};

export default ProfilePage;
