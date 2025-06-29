import { BackButton } from '@/components/BackButton';
import ReminderBtn from '@/components/ReminderBtn';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import CreateQuizModal from './AddQuestionModal';

const categories = [
  { label: 'Quran', value: 'Quran' },
  { label: 'Duas', value: 'Duas' },
  { label: 'Health', value: 'health' },
];

const CreateQuizPg2 = ({ visible, onSave, onClose }) => {

  const [modalVisible, setModalVisible] = useState(false);


  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.modalOverlay}>
          <View style={styles.headerContainer}>
            <BackButton/>
            <Text style={styles.modalTitle}>Create Quiz</Text>
          </View>
          <Text style={styles.QuestionTxt}>Question 1</Text>
        <View style={styles.modalContainer}>
          <Text style={styles.label}>Question</Text>
          <Text style={styles.textBox}>Which Surah is called the heart of Quran?</Text>
          <Text style={styles.label}>Answer</Text>
          <Text style={styles.textBox}>Surah Yaseen</Text>
          <Text style={styles.label}>Options</Text>
          <Text style={styles.textBox}>Surah Baqarah</Text>
          <Text style={styles.textBox}>Surah Baqarah</Text>
          <Text style={styles.textBox}>Surah Baqarah</Text>

          <ReminderBtn btnTitle="Remove" handleAddReminder={onClose} />
        </View>
        <TouchableOpacity style={styles.btnAddQuiz} onPress={()=>setModalVisible(true)}>
          <Text style={{fontSize:18,fontWeight:'400'}} >Add more questions</Text>
        </TouchableOpacity>
      </View>
        <CreateQuizModal
            visible={modalVisible}
            // onSave={saveReminder}
            onClose={() => setModalVisible(false)}
        />
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    backgroundColor:'white'
  },
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    marginTop:40,
    backgroundColor:'white'
  },
  modalContainer: {
    backgroundColor: 'rgba(247,247,247,255)',
    padding: 20,
    borderRadius: 10,
  },
  headerContainer:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    marginLeft:10
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '500',
    marginBottom: 10,
    marginTop:4,
    marginLeft:20,
    color: '#121212',
  },
  QuestionTxt: {
    fontSize: 22,
    alignSelf:'baseline',
    fontWeight: '500',
    marginLeft:20,
    marginBottom: 10,
    color: '#121212',
  },
  label: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 17,
    marginVertical: 5,
  },
  textBox: {
    backgroundColor:'rgba(235,235,235,255)',
    fontSize:16,
    fontWeight:'500',
    borderRadius: 30,
    padding: 15,
    marginBottom: 10,
    justifyContent: 'center',
  },
  btnAddQuiz:{
    width:'85%',
    textAlign:'center',
    borderWidth: 1,
    borderColor: '#00000033',
    borderRadius: 30,
    padding: 10,
    marginVertical:10,
    justifyContent: 'center',
    alignItems:'center'
  },
  pickerContainer: {
    width: '100%',
    height: 47,
    borderWidth: 1,
    borderColor: '#00000033',
    borderRadius: 30,
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    height: 47,
  },
});

export default CreateQuizPg2;
