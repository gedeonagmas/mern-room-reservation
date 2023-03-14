import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { UserContext } from "../context/UserContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookPlace() {
    const { data } = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} AUD / per night
      </div>
      <div className="mt-4 border rounded-2xl">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Phone number:</label>
            <input
              className="border rounded-2xl w-full mt-2 py-1.5 px-3"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
      </div>
      <button className="primary mt-4" onClick={bookPlace}>
        Reserve
      </button>
      {numberOfNights > 0 && (
        <>
          <div className="my-4 px-2 flex justify-between">
            <span className="underline">
              ${place.price.toFixed(2)} AUD x {numberOfNights}&nbsp;
              {numberOfNights > 1 ? <span>nights</span> : <span>night</span>}
            </span>
            <span>${(place.price * numberOfNights).toFixed(2)} AUD</span>
          </div>
          <div className="border-t px-2 pt-4 flex justify-between font-bold ">
            <span>Total</span>
            <span>${(place.price * numberOfNights).toFixed(2)} AUD</span>
          </div>
        </>
      )}
    </div>
  );
}
