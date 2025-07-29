import { API } from '@/api';
import { BackButton } from '@/components/BackButton';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const QuizDetails = () => {
    
    const {quizData} = useLocalSearchParams()
    const QuizData = JSON.parse(decodeURIComponent(quizData))
    const [questions, setQuestions] = useState([]);
        
    
    useEffect(() => {
        const fetchQuestions = async () => {
        try 
        {
          let resp = await axios.post(`${API.BASE_URL}/api/getAllQuizQuestions`, {Quiz_id : QuizData.quiz_id})
          setQuestions(resp.data)          
        }
        catch (error) {
          console.error('Error fetching questions:', error);
        }
        };

        fetchQuestions();
    }, []);

    return (
        <View>
          <View style={styles.headerContainer}>
            <BackButton/>
            <Text style={styles.modalTitle}>{QuizData.title}</Text>
          </View>
          <ScrollView style={styles.mainContainer}>
            <View style={styles.modalOverlay}>
                { questions.map((item,i)=>{
                  
                  return(
                    <View>
                      <Text style={styles.QuestionTxt}>Question {i+1}</Text>
                      <View style={styles.modalContainer}>
                        <Text style={styles.label}>Question</Text>
                        <Text style={styles.textBox}>{item.Question}</Text>
                        <Text style={styles.label}>Answer</Text>
                        <Text style={styles.textBox}>{item.R_Answer}</Text>
                        <Text style={styles.label}>Options</Text>
                        <Text style={styles.textBox}>{item.Answer_1}</Text>
                        <Text style={styles.textBox}>{item.Answer_2}</Text>
                        <Text style={styles.textBox}>{item.Answer_3}</Text>
                      </View>
                    </View>
                    )
                  })}
            </View>
            </ScrollView>
          </View>
      );
    };

export default QuizDetails

const styles = StyleSheet.create({
  mainContainer:{
    backgroundColor:'white'
  },
  modalOverlay: {
    flex: 1,
    marginTop:10,
    marginBottom:120,
    backgroundColor:'white'
  },
  modalContainer: {
    backgroundColor: 'rgba(247,247,247,255)',
    padding: 20,
    marginHorizontal:10,
    borderRadius: 10,
  },
  headerContainer:{
    paddingTop:30,
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:10,
    backgroundColor:'white'
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