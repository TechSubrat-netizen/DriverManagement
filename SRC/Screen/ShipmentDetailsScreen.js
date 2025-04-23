import { View, Text, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import shipmentsData from '../LocalJson/Shipment.json';
import { Picker } from '@react-native-picker/picker';
import { ShipmentStatus } from '../Context/ShipmentStatus';

const ShipmentDetailsScreen = ({ route }) => {
  const [details, setDetails] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const { shipmentId } = route.params;
  const { status, updateStatus } = useContext(ShipmentStatus);

  useEffect(() => {
    const driver = shipmentsData.shipments.find(e => e.shipmentId === shipmentId);
    setDetails(driver);
  }, [shipmentId]);

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    setLoading(true);
    setTimeout(() => {
      updateStatus(shipmentId, newStatus);
      setLoading(false);
    }, 1000);
  };

  if (!details) return <Text>Loading...</Text>;

  const currentStatus = status.find(item => item.shipmentId === shipmentId)?.status || details.status;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>Shipment Details</Text>
      <Text>Shipment ID: {details.shipmentId}</Text>
      <Text>Origin: {details.origin}</Text>
      <Text>Destination: {details.destination}</Text>
      <Text>Estimated Delivery: {details.estimatedDeliveryDate}</Text>
      <Text>Status: {loading ? 'Updating...' : currentStatus}</Text>
      <Text>Driver Name: {details.driverContact.name}</Text>
      <Text>Driver Phone Number: {details.driverContact.phoneNumber}</Text>

      <Picker
        selectedValue={selectedStatus}
        onValueChange={handleStatusChange}
        style={{ marginTop: 20 }}
      >
        <Picker.Item label="Update Status" value="" enabled={false} />
        <Picker.Item label="Pending" value="Pending" />
        <Picker.Item label="In Transit" value="In Transit" />
        <Picker.Item label="Delivered" value="Delivered" />
      </Picker>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => Linking.openURL(`tel:${details.driverContact.phoneNumber}`)}
      >
        <Text style={{ color: 'blue' }}>Call Driver</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="small" color="blue" style={{ marginTop: 10 }} />}
    </View>
  );
};

export default ShipmentDetailsScreen;
