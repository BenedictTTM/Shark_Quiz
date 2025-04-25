import { View, Text , StyleSheet, ScrollView, Image, TouchableOpacity , Dimensions} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
const { width } = Dimensions.get('window');
const categories = [
    { title: 'Sports', questions: 50, icon: require('@/assets/images/sports.png'), color: '#FF7A59' },
    { title: 'Chemistry', questions: 30, icon: require('@/assets/images/chemistry.png'), color: '#4ECDC4' },
    { title: 'Math', questions: 95, icon: require('@/assets/images/maths.png'), color: '#6C63FF' },
    { title: 'History', questions: 128, icon: require('@/assets/images/history.png'), color: '#FFD166' },
    { title: 'Biology', questions: 80, icon: require('@/assets/images/biology.png'), color: '#83C5BE' },
    { title: 'Geography', questions: 60, icon: require('@/assets/images/geography.png'), color: '#E29578' },
  ];

  const Course = ({limit }) =>{
    const displayCategories = limit ? categories.slice(0, limit) : categories;
    return (
      <View style={styles.grid}>
      {displayCategories.map((item, index) => (
        <TouchableOpacity key={index} style={[styles.card, { backgroundColor: item.color + '15' }]}>
          <View style={ { backgroundColor: item.color + '30' }}>
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
    )
  }
 export default Course;

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#F8F9FA',
    },
    container: {
      flex: 1,
      paddingHorizontal: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: '#333',
    },
    profileButton: {
      padding: 4,
    },
    statsContainer: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
      padding: 16,
      marginBottom: 24,
    },
    statBox: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    statTextContainer: {
      marginLeft: 12,
    },
    statText: {
      fontSize: 14,
      color: '#666',
      marginBottom: 2,
    },
    statValue: {
      fontSize: 20,
      fontWeight: '700',
      color: '#333',
    },
    divider: {
      width: 1,
      height: '80%',
      backgroundColor: '#E0E0E0',
      marginHorizontal: 16,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: '#333',
    },
    seeAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    seeAllText: {
      color: '#555',
      fontSize: 14,
      marginRight: 4,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    card: {
      width: (width - 48) / 2,
  
      padding: 16,
      marginBottom: 16,
      elevation: 2,
      position: 'relative',
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    cardImage: {
      width: 90,
      height: 90,
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
    activityContainer: {
      marginBottom: 24,
    },
    activityTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: '#333',
      marginBottom: 16,
    },
    activityCard: {
      backgroundColor: '#FFF',
      borderRadius: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    activityHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    activityIconContainer: {
      marginRight: 12,
    },
    activityLabel: {
      flex: 1,
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
    },
    activityDate: {
      fontSize: 13,
      color: '#777',
    },
    activityStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    activityStat: {
      alignItems: 'center',
    },
    activityStatLabel: {
      fontSize: 12,
      color: '#777',
      marginBottom: 4,
    },
    activityStatValue: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
    },
  });