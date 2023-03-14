import { useState } from "react";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-white text-black min-h-screen">
        <div className="flex flex-col gap-4 p-8 bg-white">
          <div className="flex justify-between lg:w-2/3 lg:mx-auto">
            <h2 className="text-3xl">Photos of {place.title}</h2>
            <button
              className=" flex gap-1 py-2 px-4 rounded-2xl bg-black text-white"
              onClick={() => setShowAllPhotos(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Close
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <img
                src={"http://localhost:4005/uploads/" + photo}
                alt=""
                className="lg:w-2/3 mx-auto"
              />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div>
          {place.photos?.[0] && (
            <div>
              <img
                className="object-cover aspect-square cursor-pointer "
                src={"http://localhost:4005/uploads/" + place.photos[0]}
                alt=""
                onClick={() => setShowAllPhotos(true)}
              />
            </div>
          )}
        </div>
        <div className="grid">
          {place.photos?.[1] && (
            <img
              className="object-cover aspect-square cursor-pointer "
              src={"http://localhost:4005/uploads/" + place.photos[1]}
              alt=""
              onClick={() => setShowAllPhotos(true)}
            />
          )}
          <div className="overflow-hidden">
            {place.photos?.[2] && (
              <img
                className="object-cover aspect-square cursor-pointer relative top-2"
                src={"http://localhost:4005/uploads/" + place.photos[2]}
                alt=""
                onClick={() => setShowAllPhotos(true)}
              />
            )}
          </div>
        </div>
      </div>
      <button
        className="absolute flex gap-1 bottom-2 right-2 py-2 px-4 bg-white rounded-2xl"
        onClick={() => setShowAllPhotos(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
            clipRule="evenodd"
          />
        </svg>
        Show more photos
      </button>
    </div>
  );
}
