import { View, Text, TouchableOpacity, Linking, ActivityIndicator, StyleSheet } from 'react-native';
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
//Loading Functionalities
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
    <View style={styles.container}>
      <Text style={styles.title}>Shipment Details</Text>

      {/* Shipment Information */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Shipment ID:</Text>
          <Text style={styles.detailValue}>{details.shipmentId}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Origin:</Text>
          <Text style={styles.detailValue}>{details.origin}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Destination:</Text>
          <Text style={styles.detailValue}>{details.destination}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Estimated Delivery:</Text>
          <Text style={styles.detailValue}>{details.estimatedDeliveryDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Current Status:</Text>
          <Text style={[styles.detailValue, { color: loading ? 'blue' : 'black' }]}>
            {loading ? 'Updating...' : currentStatus}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Driver Name:</Text>
          <Text style={styles.detailValue}>{details.driverContact.name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Driver Phone Number:</Text>
          <Text style={styles.detailValue}>{details.driverContact.phoneNumber}</Text>
        </View>
      </View>

      {/* Status Update Picker */}
      <View style={styles.statusUpdateContainer}>
        <Text style={styles.statusUpdateLabel}>Update Status:</Text>
        <Picker
          selectedValue={selectedStatus}
          onValueChange={handleStatusChange}
          style={styles.picker}
        >
          <Picker.Item label="Update Status" value="" enabled={false} />
          <Picker.Item label="Pending" value="Pending" />
          <Picker.Item label="In Transit" value="In Transit" />
          <Picker.Item label="Delivered" value="Delivered" />
        </Picker>
      </View>

      {/* Call Driver Button */}
      <TouchableOpacity
        style={styles.callButton}
        onPress={() => Linking.openURL(`tel:${details.driverContact.phoneNumber}`)}
      >
        <Text style={styles.callButtonText}>Call Driver</Text>
      </TouchableOpacity>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="small" color="blue" style={styles.loader} />}
    </View>
  );
};

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  detailsContainer: {
    marginBottom: 30,
    marginLeft:30
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    width: 150,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
  },
  statusUpdateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusUpdateLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
    color: '#555',
  },
  picker: {
    height: 52,
    width: '60%',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  callButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default ShipmentDetailsScreen;
