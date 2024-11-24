import {useSelector} from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';
import { updateUserStart, updateUserSuccess, updateUserFailure, clearError, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserStart, signOutUserSuccess, signOutUserFailure } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './Styles.css';

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser, Loading, Error} = useSelector((state) => state.user);
  const [isEditable, setIsEditable] = useState(false);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleEditToggle = () => {
    dispatch(clearError());
    setUpdateSuccess(false);
    setFormData({});
    if (isEditable) window.location.reload();
    setIsEditable(!isEditable);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success===false)
      {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setFormData({});
      setUpdateSuccess(true);
      setIsEditable(false);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    if (filePerc === 100) {
      // Show the success message with a delay
      setShowSuccessMessage(false);
      const timer = setTimeout(() => {
        setShowSuccessMessage(true);
      }, 2500); // 2.5-second delay

      return () => clearTimeout(timer); // Cleanup timeout on unmount or when filePerc changes
    }
  }, [filePerc]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = `RealEstate/${new Date().getTime()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL) => 
            setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('api/auth/signout');
      const data = await res.json();
      if (data.success === false)
      {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className="container p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-4">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input onChange={(e)=>{setFileUploadError(false); setFile(e.target.files[0]);}} type="file" ref={fileRef} hidden disabled={!isEditable} accept='image/*'/>
      <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
      <p className='text-sm self-center'>
          {fileUploadError ? <span className='text-red-700'>Error in Image Upload (Image must be less than 2 MB)</span> :
            ((filePerc > 0) && (filePerc < 100)) ? (
              <span className='text-slate-700'>
                {`Uploading ${filePerc}%`}
              </span>) :
              (filePerc === 100 && showSuccessMessage) ? (
                <span className='text-green-700'>
                  Image Successfully Uploaded!
                </span>
              ) :
              ("")
        }
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-green-700">
                  Username:
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                    disabled={!isEditable}
                    className={`w-full rounded-md p-2 focus:outline-none focus:ring-2 ${
                      isEditable
                        ? "bg-white border border-green-600 focus:ring-green-500"
                        : "bg-white border border-gray-200 cursor-not-allowed"
                    }`}
                  />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-green-700">
                  E-mail:
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    id="email"
                    placeholder="E-mail"
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                    disabled={!isEditable}
                    className={`w-full rounded-md p-2 focus:outline-none focus:ring-2 ${
                      isEditable
                        ? "bg-white border border-green-600 focus:ring-green-500"
                        : "bg-white border border-gray-200 cursor-not-allowed"
                    }`}
                  />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-green-700">
                  Mobile:
                </td>
                <td className="py-2 px-4">
                  <input
                    type="number"
                    id="mobile"
                    placeholder="Add Mobile Number"
                    defaultValue={currentUser.mobile}
                    onChange={handleChange}
                    disabled={!isEditable}
                    className={`w-full rounded-md p-2 focus:outline-none focus:ring-2 ${
                      isEditable
                        ? "bg-white border border-green-600 focus:ring-green-500"
                        : "bg-white border border-gray-200 cursor-not-allowed"
                    }`}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          {isEditable &&
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-green-900">
                  Change Password
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-green-700">
                  Current Password:
                </td>
                <td className="py-2 px-4">
                  <input
                    type="password"
                    id="currentPassword"
                    placeholder="Current Password"
                    onChange={handleChange}
                    disabled={!isEditable}
                    className={`w-full rounded-md p-2 focus:outline-none focus:ring-2 ${
                      isEditable
                        ? "bg-white border border-green-600 focus:ring-green-500"
                        : "bg-white border border-gray-200 cursor-not-allowed"
                    }`}
                  />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-green-700">
                  New Password:
                </td>
                <td className="py-2 px-4">
                  <input
                    type="password"
                    id="newPassword"
                    placeholder="New Password"
                    onChange={handleChange}
                    disabled={!isEditable}
                    className={`w-full rounded-md p-2 focus:outline-none focus:ring-2 ${
                      isEditable
                        ? "bg-white border border-green-600 focus:ring-green-500"
                        : "bg-white border border-gray-200 cursor-not-allowed"
                    }`}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          }
        </div>
        <div className="flex space-x-4">
          {isEditable && (
            <button
            type="submit"
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-all"
            disabled={Loading}
            >
              {Loading ? 'Loading...' : 'Save Changes'}
            </button>
          )}
          <button
            type="button"
            onClick={handleEditToggle}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-all"
          >
            {isEditable ? "Cancel" : "Change Details"}
          </button>
          <Link className='bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700' to={"/create-listing"}>
            Create Listing
          </Link>
        </div>
          <p className='text-red-700 mt-1'>{Error ? Error : ''}</p>
          <p className='text-green-700 mt-1'>{updateSuccess ? 'Profile Updated Successfully!' : ''}</p>
      </form>
      <div className="flex justify-between">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
