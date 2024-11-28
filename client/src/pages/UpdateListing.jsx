import React, { useEffect, useState } from "react";
import "./CreateListing.css";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';
import { useSelector } from 'react-redux';
import './Styles.css';
import { useNavigate, useParams } from 'react-router-dom';

const CreateListing = () => {
  const {currentUser} = useSelector(state => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    pinCode: '',
    price: 5000,
    bedrooms: 1,
    furnished: false,
    parking: false,
    gym: false,
    garden: false,
    type: 'sale',
    imageUrls: [],
    tokenAmount: 5000,
    visitSlots: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
        const listingId = params.listingId;
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false)
        {
            console.log(data.message);
            return;
        }
        setFormData(data);
    }

    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length>0 && files.length+formData.imageUrls.length <7)
    {
      setUploading(true);
      setImageUploadError(false);
      const promises =[];
      for(let i=0; i<files.length; i++)
      {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({...formData, imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false);
      }).catch((err)=>{
        setImageUploadError('Image Upload Failed (2MB max per image)');
        setUploading(false);
      });
    }
    else
    {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `RealEstate/${new Date().getTime()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          console.log(`Upload is ${progress}% done`);
        },
        (error)=>{
          reject(error);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i!==index),
    });
  };

  const handleSlotChange = (e) => {
    const slots = 
    setFormData({
      ...formData,
      visitSlots: Array.from(e.target.selectedOptions).map((option) => option.value),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent')
    {
      setFormData({
        ...formData,
        type: e.target.id
      });
    };

    if (e.target.id === 'furnished' || e.target.id === 'parking' || e.target.id === 'gym' || e.target.id === 'garden')
    {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    };

    if (e.target.type === 'text' || e.target.type === 'number' || e.target.type === 'textarea')
    {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length === 0)
    {
      setError('Please select one or more images.');
      return;
    }
    if (formData.visitSlots.length === 0)
    {
      setError('Please select one or more Visit Slots.');
      return;
    }
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
          contact: currentUser.mobile
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false)
      {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    };
  };

  return (
    <div className={`add-property`}>
    <div className="add-property-page">
      <main className="form-container">
        <h2 className="text-lg"><strong>Update Property</strong></h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-between">
            <div className={`first`}>
          <input
            type="text"
            placeholder="Title"
            id = 'name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value = {formData.name}
            />
          <textarea
            placeholder="Description"
            id = 'description'
            maxLength='200'
            required
            onChange={handleChange}
            value = {formData.description}
            ></textarea>
          <input
            type="text"
            placeholder="Address"
            id = 'address'
            maxLength='100'
            required
            onChange={handleChange}
            value = {formData.address}
            />
            <input
            type="text"
            placeholder="City"
            id = 'city'
            maxLength='25'
            required
            onChange={handleChange}
            value={formData.city}
            />
            <input
            type='number'
            placeholder="Pin-Code"
            id = 'pinCode'
            min='100000'
            max='999999'
            required
            onChange={handleChange}
            value={formData.pinCode}
            />
            <div className="checkbox-group flex flex-wrap gap-3">
            <label>
            <input
            type="checkbox"
                id="sale"
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              Sell
            </label>
            <label>
              <input
                type="checkbox"
                id="rent"
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              Rent
            </label>
            <label>
              <input
                type="checkbox"
                id="parking"
                onChange={handleChange}
                checked={formData.parking===true}
              />
              Parking
            </label>
            <label>
              <input
                type="checkbox"
                id="furnished"
                onChange={handleChange}
                checked={formData.furnished===true}
              />
              Furnished
            </label>
            <label>
            <input
            type="checkbox"
                id="gym"
                onChange={handleChange}
                checked={formData.gym===true}
              />
              Gym
            </label>
            <label>
            <input
            type="checkbox"
                id="garden"
                onChange={handleChange}
                checked={formData.garden===true}
              />
              Garden
            </label>
          </div>
          <div className="beds-baths">
            <input
              type="number"
              id="bedrooms"
              min='1'
              max='15'
              required
              onChange={handleChange}
              value={formData.bedrooms}
            />
            <label>Beds</label>
          </div>
          <div className="price-input">
            <input
              type="number"
              id="price"
              min="5000"
              max="100000000"
              required
              onChange={handleChange}
              value={formData.price}
            />
            <label>Price (in {formData.type==='sale' ? '₹' : '₹/month'})</label>
          </div>
          <div className="price-input">
              <input
                type="number"
                id="tokenAmount"
                min="5000"
                max="1000000"
                required
                onChange={handleChange}
                value={formData.tokenAmount}
              />
              <label>Token Amount (in ₹)</label>
            </div>
            </div>
            <div className={`second`}>
            <div className="file-upload flex flex-col">
            <span><strong>Images: The first image will be the cover (max 6)</strong></span>
            <div className="flex gap-4">
            <input
              onChange={(e)=>setFiles(e.target.files)}
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button type='button' disabled={uploading} onClick={handleImageSubmit} className="upload-button self-center">
              {uploading ? 'Uploading...': 'Upload'}
            </button>
            </div>
          </div>
            <p className='text-red-700'>{imageUploadError && imageUploadError}</p>
            {
              formData.imageUrls.length>0 && formData.imageUrls.map((url, index)=>(
                <div key={url} className="flex justify-between p-3 border items-center mt-1">
                  <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg' />
                  <button type='button' onClick={()=>handleRemoveImage(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">Delete</button>
                </div>
              ))
            }
          <div className="time-slot mt-4">
            <span><strong>Add Visit Slots</strong></span>
            <select
              multiple
              style={{ height: "350px" }} // Optional: Adjust height to show more options
              id="visitSlots"
              onChange={handleSlotChange}
            >
              <option id="ts1" value="6:00 AM - 7:00 AM">6:00 AM - 7:00 AM</option>
              <option id="ts2" value="7:00 AM - 8:00 AM">7:00 AM - 8:00 AM</option>
              <option id="ts3" value="8:00 AM - 9:00 AM">8:00 AM - 9:00 AM</option>
              <option id="ts4" value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
              <option id="ts5" value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
              <option id="ts6" value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
              <option id="ts7" value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
              <option id="ts8" value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
              <option id="ts9" value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
              <option id="ts10" value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
              <option id="ts11" value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
              <option id="ts12" value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
              <option id="ts13" value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
              <option id="ts14" value="7:00 PM - 8:00 PM">7:00 PM - 8:00 PM</option>
            </select>
          </div>
          <button disabled={loading || uploading} type="submit" className="submit-button">
            {loading ? 'Updating...' : 'Update Property'}
          </button>
            {error && <p className="text-red-700 text-center">{error}</p>}
          </div>
        </form>
      </main>
    </div>
    </div>
  );
};

export default CreateListing;
