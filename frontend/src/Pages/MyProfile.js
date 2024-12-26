import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import './MyProfile.css'

function MyProfile() {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(ShopContext);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!userData) {
      loadUserProfileData();
    }
  }, [userData]);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('userId', userData?._id || '');
      formData.append('name', userData?.name || '');
      formData.append('phone', userData?.phone || '');
      formData.append('address', JSON.stringify(userData?.address || {}));

      console.log("Form Data:", formData.get('name'), formData.get('phone'), formData.get('address'));

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: { token }
      });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return userData && (
    <div className='container'>
      <div className='profile-card'>
        {isEdit ?
          <input type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p>{userData.name}</p>} <hr />
        <div className='flex-container'>
          <div className='flex-item'>
            <p>Email ID</p>
            {isEdit ? 
            <input className='input-field' type="text" value={userData.email} onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))} />
              : <p>{userData.email}</p>
            }
          </div>
          <div className='flex-item'>
            <p>Phone</p>
            {isEdit ?
             <input  className='input-field'  type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              :
              <p>{userData.phone}</p>}
          </div> <div className='flex-item'>
            <p>Address</p>
            {isEdit ? <>
              <input  className='input-field'  onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" />
              <br />
              <input  className='input-field'  onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type="text" />
            </> : <> <p>{userData.address.line1}</p>
              <p>{userData.address.line2}</p> </>}
          </div>
           </div> 
           <div className='contact-info'>


          {isEdit ? 
          <button className='edit-button' onClick={updateUserProfileData}>Save Information</button>
            : <button className='edit-button' onClick={() => setIsEdit(true)}>Edit</button>} 
            </div> 
            </div>
             </div>
             );
}

export default MyProfile;
