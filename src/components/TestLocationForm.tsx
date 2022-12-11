import React, {useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { store } from "../store";
import { LocationData } from "./TestLocationsList";

interface FormData {
  id: number;
  location: number;
  environment: number;
  server: string;
  hint: string;
}
interface ServersData {
  locationID: number;
  envID: number;
}

interface PropsData {
  id: number;
  deleteLocation: (id: number) => void;
  addDataLocation: (data: LocationData) => void;
}

export const TestLocationForm = observer(function TestLocationForm({
  id,
  deleteLocation,
  addDataLocation,
}: PropsData) {
  const [servers, setServers] = useState<string>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      id: id,
      location: store?.locations[0]?.locationID,
      environment: store?.envs[0]?.envID,
      // server: store?.servers[0]?.name,
      hint: "",
    },
  });

  const { location, environment, server, hint } = watch();
  const onSubmit: SubmitHandler<FormData> = (data) => addDataLocation(data);

  const addServers = ({ locationID, envID }: ServersData) => {
    setServers("");
    store?.servers?.map((server) => {
      if (+server.locationID === locationID && +server.envID === envID) {
        setServers((prevState) => `${prevState} ${server.name},`.slice(0, -1));
      }
    });
  };

  useEffect(() => {
    addServers({ locationID: +location, envID: +environment });
  }, [location, environment]);

  useEffect(() => {
    const data = {
      id: id,
      location,
      environment,
      // server,
      hint,
    };
    addDataLocation(data);
  }, [location, environment, server, hint]);

  if (!store?.isLoaded) {
    return <div>Данные не загружены</div>;
  }
  return (
    <div className="location">
      <div className="location__wrapper">
        <div className="location__top">
          <h3 className="location__title">Тестовая локация 1</h3>
          <button className="location__trash" onClick={() => deleteLocation(id)}>
            <svg width="15" height="15" viewBox="0 0 448 512">
              <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
            </svg>
          </button>
        </div>
        <div className="location__bottom">
          <form className="form__location" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__selects">
              <label htmlFor="location">
                <h4 className="form__title">Локация</h4>
                <div className="input-wrapper">
                  <svg className="icon" viewBox="0 0 384 512">
                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z" />
                  </svg>
                  <select id="location" {...register("location")}>
                    {store?.locations.map((item) => (
                      <option value={item.locationID}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </label>
              <label htmlFor="environment">
                <h4 className="form__title">Среда</h4>
                <div className="input-wrapper">
                  <svg className="icon" viewBox="0 0 448 512">
                    <path d="M0 32c477.6 0 366.6 317.3 367.1 366.3L448 480h-26l-70.4-71.2c-39 4.2-124.4 34.5-214.4-37C47 300.3 52 214.7 0 32zm79.7 46c-49.7-23.5-5.2 9.2-5.2 9.2 45.2 31.2 66 73.7 90.2 119.9 31.5 60.2 79 139.7 144.2 167.7 65 28 34.2 12.5 6-8.5-28.2-21.2-68.2-87-91-130.2-31.7-60-61-118.6-144.2-158.1z" />
                  </svg>
                  <select id="environment" {...register("environment")}>
                    {store?.envs.map((item) => (
                      <option value={item.envID}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </label>
              <label htmlFor="server">
                <h4 className="form__title">Серверы</h4>
                <div className="input-wrapper">
                  <svg className="icon" viewBox="0 0 512 512">
                    <path d="M64 32C28.7 32 0 60.7 0 96v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM344 152c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zm96-24c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24zM64 288c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V352c0-35.3-28.7-64-64-64H64zM344 408c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zm104-24c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24z" />
                  </svg>
                  <input
                    disabled
                    id="server"
                    {...register("server")}
                    defaultValue={servers}
                  />
                </div>
              </label>
            </div>

            <label htmlFor="hint" style={{ marginTop: 10 }}>
              <h4 className="form__title">Подсказка</h4>
              <div className="input-wrapper">
                <svg className="icon" viewBox="0 0 320 512">
                  <path d="M96 96c-17.7 0-32 14.3-32 32s-14.3 32-32 32s-32-14.3-32-32C0 75 43 32 96 32h97c70.1 0 127 56.9 127 127c0 52.4-32.2 99.4-81 118.4l-63 24.5 0 18.1c0 17.7-14.3 32-32 32s-32-14.3-32-32V301.9c0-26.4 16.2-50.1 40.8-59.6l63-24.5C240 208.3 256 185 256 159c0-34.8-28.2-63-63-63H96zm48 384c-22.1 0-40-17.9-40-40s17.9-40 40-40s40 17.9 40 40s-17.9 40-40 40z" />
                </svg>
                <input id="hint" type="text" {...register("hint")} placeholder="Комментарий по локации"/>
              </div>
            </label>
            {/* <input type="submit" /> */}
          </form>
        </div>
      </div>
    </div>
  );
});
