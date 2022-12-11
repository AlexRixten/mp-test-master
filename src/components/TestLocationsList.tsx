import React, { useState } from "react";
import { store } from "../store";
import { TestLocationForm } from "./TestLocationForm";

export interface LocationData {
  id: number;
  location?: number;
  environment?: number;
  server?: string;
  hint?: string;
}
interface LocationsListData extends Array<LocationData> {}

export const TestLocationsList = () => {
  store.fetchData();
  const [locationsList, setLocationsList] = useState<LocationData[]>([
    { id: Date.now() },
  ]);

  const deleteLocation = (id: number) => {
    setLocationsList(locationsList.filter((item) => item.id !== id));
  };
  const addDataLocation = (data: LocationData) => {
    locationsList.map((item) => {
      if (item.id === data.id) {
        item.id = data.id;
        item.location = data.location;
        item.environment = data.environment;
        // item.server = data.server;
        item.hint = data.hint;
      }
    });
  };

  return (
    <>
      {locationsList.map((location, index) => {
        return (
          <TestLocationForm
            key={`location-${location.id}`}
            id={location.id}
            deleteLocation={deleteLocation}
            addDataLocation={addDataLocation}
          />
        );
      })}
      <div className="btns">
        <button
          onClick={() => {
            setLocationsList([...locationsList, { id: Date.now() }]);
          }}
        >
          <svg viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
          Добавить тестовую локацию
        </button>
        <button
          onClick={() => {
            console.log(locationsList);
          }}
        >
          Вывести результат в консоль
        </button>
      </div>
    </>
  );
};
