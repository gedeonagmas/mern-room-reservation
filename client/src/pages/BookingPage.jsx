import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";

export default function BookingPage() {
  const [booking, setBooking] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get("/user/bookings").then(({ data }) => {
        const matchedBooking = data.find(({ _id }) => _id === id);
        if (matchedBooking) {
          setBooking(matchedBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8 lg:w-2/3 lg:mx-auto">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-4 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-4 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-2xl text-center">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
