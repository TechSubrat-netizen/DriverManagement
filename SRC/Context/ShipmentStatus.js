import { createContext, useState } from "react";
import shipmentsData from '../LocalJson/Shipment.json';

export const ShipmentStatus = createContext();

function ShipmentStatusProvider({ children }) {
  const [status, setStatus] = useState(shipmentsData.shipments);

  function updateStatus(id, newStatus) {
  
    setStatus(prevStatus =>
      prevStatus.map(e =>
        e.shipmentId === id ? { ...e, status: newStatus } : e
      )
    );
  }
  
  return (
    <ShipmentStatus.Provider value={{ status, updateStatus }}>
      {children}
    </ShipmentStatus.Provider>
  );
}

export default ShipmentStatusProvider;
