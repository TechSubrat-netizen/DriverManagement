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

// search functionality 
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
//Color changing functionality
  const Color = (status) => {
    switch (status) {
      case 'Pending':
        return 'orange';
      case 'In Transit':
        return 'blue';
      case 'Delivered':
        return 'green';
      default:
        return 'black';
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.pageTitle}>Shipments Dashboard</Text>

      <TextInput
        placeholder="Search by Shipment ID or Driver Name"
        style={styles.searchInput}
        value={text}
        onChangeText={setText}
      />

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Status:</Text>
        <Picker
          selectedValue={filter}
          onValueChange={(itemValue) => setFilter(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Pending" value="Pending" />
          <Picker.Item label="In Transit" value="In Transit" />
          <Picker.Item label="Delivered" value="Delivered" />
        </Picker>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.shipmentId.toString()}
        renderItem={({ item }) => (
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
              <Text
                style={[
                  styles.statusValue,
                  {
                    color: Color(item.status),
                  },
                ]}
              >
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
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  searchInput: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  filterContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    width: '80%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
  },
  card: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginHorizontal: 15,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    color: '#555',
  },
  statusValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ShipmentsDashboard;
