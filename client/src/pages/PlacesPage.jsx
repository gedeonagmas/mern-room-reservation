import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import PlaceImg from "../components/PlaceImg";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  console.log("places:", places);

  useEffect(() => {
    axios.get("/user/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          to={"/account/places/new"}
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add New Place
        </Link>
      </div>
      <div className="mt-4 flex flex-col gap-4 lg:w-2/3 lg:mx-auto">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              className="flex gap-4 bg-gray-100 p-4 rounded-2xl cursor-pointer"
            >
              <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                <PlaceImg place={place} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
