// QuizScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity , StyleSheet} from 'react-native';
import quizData from '../constants/quizMode.json';

export default function QuizScreen() {
  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const quizSets = quizData.quizSets;

  const handleSelectSet = (set: string) => {
    setSelectedSet(set);
  };

  const selectedQuestion = selectedSet
    ? quizSets.find(q => q.set === selectedSet)?.questions[currentIndex] || []
    : [];

  return (
    <View style={styles.container}>
      {/* Set Selector */}
      {!selectedSet ? (
        <>
          <Text style={styles.text}>Select a Quiz Set:</Text>
          {quizSets.map(set => (
            <TouchableOpacity key={set.set} onPress={() => handleSelectSet(set.set)}>
              <Text style={{ fontSize: 18, marginVertical: 8  }}>Set {set.set}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Questions from Set {selectedSet}:</Text>
          <View>
            <Text>{selectedQuestion.question}</Text>
            <Text>{selectedQuestion.correctAnswer}</Text>
          </View>
          <TouchableOpacity onPress={() => setSelectedSet(null)}>
            <Text style={{ color: 'blue', marginTop: 20 }}>← Back to Sets</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  text:{
    color:"black"
  },
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F7FF',
  }
})