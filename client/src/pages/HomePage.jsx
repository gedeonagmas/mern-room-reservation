import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-8">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id}>
            <div className="mb-2 flex bg-gray-500 rounded-2xl">
              {place.photos?.[0] && (
                <img
                  className="object-cover aspect-square rounded-2xl"
                  src={"http://localhost:4005/uploads/" + place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500 truncate">{place.title}</h3>
            <div className="mt-1 underline">
              <span className="font-bold">${place.price} AUD</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
}
