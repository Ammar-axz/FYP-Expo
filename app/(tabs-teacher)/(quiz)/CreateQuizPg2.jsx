import { BackButton } from '@/components/BackButton';
import ReminderBtn from '@/components/ReminderBtn';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { API } from '../../../api';
import CreateQuizModal from './AddQuestionModal';

const categories = [
  { label: 'Quran', value: 'Quran' },
  { label: 'Duas', value: 'Duas' },
  { label: 'Health', value: 'health' },
];

const CreateQuizPg2 = () => {

  const {quiz} = useLocalSearchParams()
  const quizData = JSON.parse(decodeURIComponent(quiz));
  const [modalVisible, setModalVisible] = useState(false);
  const [quizQuestions,setQuizQuestions] = useState([])
  const quizQuestionTemplate = {
      question: "",
      option_1: "",
      option_2: "",
      option_3: "",
      r_answer: ""
    }

  const handleRemove = (indexToRemove)=> {
    setQuizQuestions(prev =>
      prev.filter((_, index) => index !== indexToRemove)
    )
  }

  const handleSubmit = async()=> {
    const submitQuiz = {
      title: quizData.title,
      class:quizData.class,
      due_date: new Date(quizData.due_date),
      t_questions: quizQuestions.length,
      questions:quizQuestions
    }
    try
    {
      let resp = await axios.post(`${API.BASE_URL}/api/addQuiz`,submitQuiz)
      console.log(resp);
      
    }
    catch(e)
    {
      console.error("Submission failed:", e.response?.data || e.message);
    }
  }

  // useEffect(() => {
  //   console.log('Questions updated:', quizQuestions);
  // }, [quizQuestions]);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.modalOverlay}>
          <View style={styles.headerContainer}>
            <BackButton/>
            <Text style={styles.modalTitle}>Create Quiz</Text>
          </View>
          {quizQuestions.map((item,i)=>{
            return(
              <View>
                <Text style={styles.QuestionTxt}>Question {i+1}</Text>
                <View style={styles.modalContainer}>
                  <Text style={styles.label}>Question</Text>
                  <Text style={styles.textBox}>{item.question}</Text>
                  <Text style={styles.label}>Answer</Text>
                  <Text style={styles.textBox}>{item.r_answer}</Text>
                  <Text style={styles.label}>Options</Text>
                  <Text style={styles.textBox}>{item.option_1}</Text>
                  <Text style={styles.textBox}>{item.option_2}</Text>
                  <Text style={styles.textBox}>{item.option_3}</Text>

                  <ReminderBtn btnTitle="Remove" handleAddReminder={() => handleRemove(i)} />
                </View>
              </View>)
            })}
        <TouchableOpacity style={styles.btnAddQuiz} onPress={()=>setModalVisible(true)}>
          <Text style={{fontSize:18,fontWeight:'400'}} >Add question</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnAddQuiz} onPress={handleSubmit}>
          <Text style={{fontSize:18,fontWeight:'400'}} >Submit</Text>
        </TouchableOpacity>
      </View>
        <CreateQuizModal
            questions={quizQuestions}
            setQuestions={setQuizQuestions}
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
