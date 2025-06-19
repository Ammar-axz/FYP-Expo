import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

const AddReminderScreen = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Quran');
    const [date, setDate] = useState('');
    const [color, setColor] = useState('pink');
  
    return (
      <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Add New Remissnder</Text>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, borderRadius: 5 }}
        />
        <TextInput
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
          style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, borderRadius: 5 }}
        />
        <TextInput
          placeholder="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
          style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, borderRadius: 5 }}
        />
        <TextInput
          placeholder="Color"
          value={color}
          onChangeText={setColor}
          style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 20, borderRadius: 5 }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  };
export default AddReminderScreen;