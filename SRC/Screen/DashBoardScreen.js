import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { ShipmentStatus } from '../Context/ShipmentStatus';

const ShipmentsDashboard = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('All');
  const navigation = useNavigation();
  const { status } = useContext(ShipmentStatus);
//Search data functionalities
  const search = () => {
    let userData = status;

    if (text.trim() !== '') {
      userData = userData.filter(
        (e) =>
          e.shipmentId.includes(text) ||
          e.driverContact.name.toLowerCase().includes(text.toLowerCase())
      );
    }

    if (filter !== 'All') {
      userData = userData.filter((shipment) => shipment.status === filter);
    }

    setData(userData);
  };
  
  useEffect(() => {
    setData(status);
  }, [status]);

  useEffect(() => {
    search();
  }, [text, filter, status]);
// Status color functionalities
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'orange';
      case 'In Transit':
        return 'blue';
      case 'Delivered':
        return 'green';
      default:
        return 'gray';
    }
  };
  
//Creating card
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('ShipmentDetailsScreen', {
          shipmentId: item.shipmentId,
        })
      }
    >
      <Text style={styles.label}>
        Shipment ID: <Text style={styles.value}>{item.shipmentId}</Text>
      </Text>
      <Text style={styles.label}>
        Origin: <Text style={styles.value}>{item.origin}</Text>
      </Text>
      <Text style={styles.label}>
        Destination: <Text style={styles.value}>{item.destination}</Text>
      </Text>
      <Text style={styles.label}>
        Status:{' '}
        <Text style={[styles.statusValue, { color: getStatusColor(item.status) }]}>
          {item.status}
        </Text>
      </Text>
      <Text style={styles.label}>
        Estimated Delivery:{' '}
        <Text style={styles.value}>{item.estimatedDeliveryDate}</Text>
      </Text>
      <Text style={styles.label}>
        Driver Name: <Text style={styles.value}>{item.driverContact.name}</Text>
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Shipments Dashboard</Text>

      <TextInput
        placeholder="Search by Shipment ID or Driver Name"
        style={styles.searchInput}
        value={text}
        onChangeText={setText}
      />

      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Status:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={filter}
            onValueChange={(itemValue) => setFilter(itemValue)}
            style={styles.picker}
            dropdownIconColor="#333"
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="In Transit" value="In Transit" />
            <Picker.Item label="Delivered" value="Delivered" />
          </Picker>
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.shipmentId.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.noDataText}>No Data found</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f8',
    paddingTop: 20,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 16,
  },
  searchInput: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ddd',
    alignSelf: 'center',
    marginBottom: 12,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    width: 180,
    backgroundColor: '#fff',
  },
  picker: {
    height: 53,
    width: '100%',
  },
  card: {
    padding: 8,
    width:"80%",
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignSelf:"center"
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'normal',
  },
  statusValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default ShipmentsDashboard;
