import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';

export default function App() {
  const [days, setDays] = useState('');
  const [hours, setHours] = useState('');
  const [unbanDate, setUnbanDate] = useState('');

  const calculateBan = () => {
    Keyboard.dismiss();
    const currentDate = new Date();
    const addDays = parseInt(days) || 0;
    const addHours = parseInt(hours) || 0;

    if (addDays === 0 && addHours === 0) {
      setUnbanDate('Lütfen geçerli bir süre girin.');
      return;
    }

    currentDate.setDate(currentDate.getDate() + addDays);
    currentDate.setHours(currentDate.getHours() + addHours);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' };
    setUnbanDate('Ban Bitiş Tarihi:\n' + currentDate.toLocaleDateString('tr-TR', options));
  };

  const reset = () => {
    setDays('');
    setHours('');
    setUnbanDate('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Ban Hesap Makinesi</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gün:</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={days} onChangeText={setDays} placeholder="0" placeholderTextColor="#999" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Saat:</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={hours} onChangeText={setHours} placeholder="0" placeholderTextColor="#999" />
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.calculateButton]} onPress={calculateBan}>
            <Text style={styles.buttonText}>Hesapla</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={reset}>
            <Text style={styles.buttonText}>Sıfırla</Text>
          </TouchableOpacity>
        </View>
        {unbanDate !== '' && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{unbanDate}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#fff', padding: 25, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  label: { flex: 1, fontSize: 16, color: '#555', fontWeight: '600' },
  input: { flex: 3, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16, color: '#333' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  button: { flex: 1, padding: 15, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  calculateButton: { backgroundColor: '#007bff' },
  resetButton: { backgroundColor: '#dc3545' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resultContainer: { marginTop: 25, padding: 15, backgroundColor: '#e9ecef', borderRadius: 8, alignItems: 'center' },
  resultText: { fontSize: 16, color: '#212529', textAlign: 'center', fontWeight: 'bold', lineHeight: 24 }
});