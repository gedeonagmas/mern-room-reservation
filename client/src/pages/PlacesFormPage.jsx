import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import AccountNav from "../components/AccountNav";

export default function PlacesFormPage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [isRedirect, setIsRedirect] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then(({ data }) => {
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  async function savePlace(e) {
    e.preventDefault();

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    if (id) {
      // update
      await axios.put("/places", {
        id,
        ...placeData,
      });
      setIsRedirect(true);
    } else {
      // create
      await axios.post("/places", placeData);
      setIsRedirect(true);
    }
  }

  if (isRedirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace} className={"lg:w-2/3 lg:mx-auto"}>
        <h2 className="text-2xl mt-4">Title</h2>
        <p className="text-gray-500 text-sm">
          title for your place should be short and catchy as in advertisement
        </p>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2 className="text-xl mt-4">Address</h2>
        <p className="text-gray-500 text-sm">address to this place</p>
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <h2 className="text-xl mt-4">Photos</h2>
        <p className="text-gray-500 text-sm">more = better</p>
        <PhotosUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />
        <h2 className="text-2xl mt-4">Description</h2>
        <p className="text-gray-500 text-sm">description of the place</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <h2 className="text-2xl mt-4">Perks</h2>
        <p className="text-gray-500 text-sm">
          select all the perks of your place
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
          <Perks perks={perks} setPerks={setPerks} />
        </div>
        <h2 className="text-2xl mt-4">Extra Info</h2>
        <p className="text-gray-500 text-sm">house rules, etc</p>
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        <h2 className="text-2xl mt-4">Check In & Out Times, Max Guests</h2>
        <p className="text-gray-500 text-sm">
          add check in and out times, remember to have some time window for
          cleaning the room between guests
        </p>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              placeholder="14:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              placeholder="11:00"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
