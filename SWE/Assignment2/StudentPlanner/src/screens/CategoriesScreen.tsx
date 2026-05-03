import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';
import { SUBJECTS, TASKS } from '../data';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import TaskItem from '../components/TaskItem';

interface Props {
  navigation: any;
}

const CategoriesScreen: React.FC<Props> = ({ navigation }) => {
  const [tasks, setTasks] = useState(TASKS);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  // Grid fade-in
  const gridFade = useRef(new Animated.Value(0)).current;
  const gridSlide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(gridFade, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(gridSlide, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredSubjects = SUBJECTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTasks = tasks.filter(t =>
    selectedSubject ? t.subject === selectedSubject : true
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageTitle}>Subjects</Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search subjects..."
          placeholderTextColor={COLORS.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Subject Grid */}
      <Animated.View
        style={{
          opacity: gridFade,
          transform: [{ translateY: gridSlide }],
        }}
      >
        <View style={styles.grid}>
          {filteredSubjects.map((subject, i) => (
            <TouchableOpacity
              key={subject.id}
              style={[
                styles.subjectCard,
                { borderColor: selectedSubject === subject.name ? subject.color : COLORS.border },
                selectedSubject === subject.name && { backgroundColor: subject.color + '22' },
              ]}
              onPress={() =>
                setSelectedSubject(prev => (prev === subject.name ? null : subject.name))
              }
              activeOpacity={0.8}
            >
              <Text style={styles.subjectIcon}>{subject.icon}</Text>
              <Text style={styles.subjectName}>{subject.name}</Text>
              <Text style={[styles.subjectProgress, { color: subject.color }]}>
                {subject.tasksDone}/{subject.tasksTotal} tasks
              </Text>
              <ProgressBar
                progress={subject.progress}
                color={subject.color}
                height={5}
                delay={i * 100}
              />
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Tasks filtered by subject */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {selectedSubject ? `${selectedSubject} Tasks` : 'All Tasks'}
        </Text>
        {selectedSubject && (
          <TouchableOpacity onPress={() => setSelectedSubject(null)}>
            <Text style={styles.clearFilter}>Clear ✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {filteredTasks.map((task, index) => (
        <TaskItem key={task.id} task={task} onToggle={toggleTask} index={index} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, paddingBottom: 100 },
  pageTitle: { color: COLORS.text, fontSize: 28, fontWeight: '800', marginBottom: SPACING.lg },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, color: COLORS.text, fontSize: 14, paddingVertical: 12 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  subjectCard: {
    width: '47.5%',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1.5,
  },
  subjectIcon: { fontSize: 28, marginBottom: 6 },
  subjectName: { color: COLORS.text, fontSize: 14, fontWeight: '700', marginBottom: 2 },
  subjectProgress: { fontSize: 11, marginBottom: 8 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: { color: COLORS.text, fontSize: 18, fontWeight: '700' },
  clearFilter: { color: COLORS.accent, fontSize: 13, fontWeight: '600' },
});

export default CategoriesScreen;
