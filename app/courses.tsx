import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'

const { width } = Dimensions.get('window');

const categories = [
    { title: 'Biology', questions: 80, icon: require('@/assets/images/biology.png'), color: '#83C5BE' },
  { title: 'Chemistry', questions: 30, icon: require('@/assets/images/chemistry.png'), color: '#4ECDC4' },
  { title: 'Math', questions: 95, icon: require('@/assets/images/maths.png'), color: '#6C63FF' },
  { title: 'History', questions: 128, icon: require('@/assets/images/history.png'), color: '#FFD166' },
  { title: 'Sports', questions: 50, icon: require('@/assets/images/sports.png'), color: '#FF7A59' },
  { title: 'Geography', questions: 60, icon: require('@/assets/images/geography.png'), color: '#E29578' },
];

const Course = ({ limit }) => {
  const displayCategories = limit ? categories.slice(0, limit) : categories;
  
  return (
   
    <View style={styles.grid}>
      {displayCategories.map((item, index) => (
        <TouchableOpacity key={index} style={[styles.card, { backgroundColor: item.color + '15' }]}>
          <View style={{ backgroundColor: item.color + '30' }}>
            <Image source={item.icon} style={styles.cardImage} resizeMode="contain" />
          </View>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.questionCount}>{item.questions} questions</Text>
          <View style={styles.playButton}>
            <Ionicons name="play" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
      ))}
    </View>

  );
};

export default Course;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
  grid: {
    flex: 1,
    padding: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
    backgroundColor: '#fff',
    width: '100%',
  },
  card: {
    width: (width - 48) / 2,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    position: 'relative',
  },
  cardImage: {
    width: 110,
    height: 110,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  questionCount: {
    fontSize: 13,
    color: '#777',
  },
  playButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 28,
    height: 28,
    backgroundColor: '#6200EE',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
