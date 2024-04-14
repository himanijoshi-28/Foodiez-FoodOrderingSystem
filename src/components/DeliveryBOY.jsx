// import React, { useEffect, useState } from "react";
import { getAllOrders } from "../utils/firebaseFunctions";

// export default DeliveryMap;
import React, { useEffect, useState } from "react";
// import { getAllOrders } from "../firebase/ordersAPI";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const DeliveryMap = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders().then((orders) => {
      setOrders(orders);
    });
  }, []);

  return (
    <div>
      <p className="text-4xl font-semibold capitalize  text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-13 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
        ORDERS
      </p>
      <div className=" overflow-hidden">
        {" "}
        {orders.map((order) => (
          <div
            key={order.id + 1}
            className=" grid sm:grid-cols-1 md:grid-cols-2 mb-4 m-auto"
          >
            <div className="md:w-1/2 p-4 border-r">
              <h2 className="text-lg font-semibold mb-2">
                Order ID: {order.id}
              </h2>
              <p>Name: {order.name}</p>
              <p>Contact: {order.contact}</p>
              <p>Email: {order.email}</p>
              <p>Address: {order.addressLatLng}</p>
            </div>
            <div className="flex items-center px-8 z-10 overflow-hidden">
              <MapContainer
                center={order.addressLatLng.split(",").map(parseFloat)}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "200px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                  position={order.addressLatLng.split(",").map(parseFloat)}
                >
                  <Popup>
                    <div>
                      <p>Name: {order.name}</p>
                      <p>Contact: {order.contact}</p>
                      <p>Email: {order.email}</p>
                      <p>Address: {order.addressLatLng}</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryMap;
