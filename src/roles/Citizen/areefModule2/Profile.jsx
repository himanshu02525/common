import React, { useEffect, useState } from 'react';
import { getCitizenById, getCitizenByUserId } from './api';
import './CitizenModule.css';

export const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const storedProfile = localStorage.getItem('citizenProfile');
      const storedUserId = localStorage.getItem('userId');
      console.log('Profile load - storedProfile:', storedProfile, 'storedUserId:', storedUserId);
      if (!storedProfile) {
        if (!storedUserId) {
          setLoading(false);
          return;
        }
      }

      const parsedProfile = storedProfile ? JSON.parse(storedProfile) : null;
      console.log('Parsed profile:', parsedProfile);
      const entityId = parsedProfile?.entityId;
      if (!entityId) {
        if (storedUserId) {
          try {
            const response = await getCitizenByUserId(storedUserId);
            const profileData = response?.data || response;
            console.log('Fetched profile by userId:', profileData);
            setProfile(profileData);
            localStorage.setItem('citizenProfile', JSON.stringify(profileData));
            setLoading(false);
            return;
          } catch (err) {
            if (err.response?.status === 404) {
              setLoading(false);
              return;
            }
            console.error('Failed to load profile by userId:', err);
            setError('Failed to load profile from server');
            setLoading(false);
            return;
          }
        }
        setProfile(parsedProfile);
        setLoading(false);
        return;
      }

      try {
        const response = await getCitizenById(entityId);
        const profileData = response?.data || response;
        setProfile(profileData);
        localStorage.setItem('citizenProfile', JSON.stringify(profileData));
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Failed to load profile from server');
        setProfile(parsedProfile);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="page-wrapper">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="page-wrapper">
        <div className="page-header">
          <h1>Citizen Profile</h1>
          <p>Please complete registration first to view your profile details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1>Citizen Profile</h1>
          <p>Review your application details and current verification status.</p>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="profile-grid">
        <div className="profile-card">
          <div className="profile-row">
            <strong>Name</strong>
            <p>{profile.name}</p>
          </div>
          <div className="profile-row">
            <strong>Email</strong>
            <p>{profile.email || 'dummy@example.com'}</p>
          </div>
          <div className="profile-row">
            <strong>Type</strong>
            <p>{profile.type}</p>
          </div>
          <div className="profile-row">
            <strong>Address</strong>
            <p>{profile.address || 'Not provided'}</p>
          </div>
          <div className="profile-row">
            <strong>Contact Info</strong>
            <p>{profile.contactInfo}</p>
          </div>
          <div className="profile-row">
            <strong>Status</strong>
            <p>
              <span className={`badge-status ${profile.status === 'ACTIVE' ? 'badge-approved' : 'badge-pending'}`}>
                {profile.status}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
