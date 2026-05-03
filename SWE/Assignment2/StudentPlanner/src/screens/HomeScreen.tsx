import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';
import { TASKS, SCHEDULE } from '../data';
import Card from '../components/Card';
import TaskItem from '../components/TaskItem';

const { width } = Dimensions.get('window');

interface Props {
  navigation: any;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [tasks, setTasks] = useState(TASKS);

  // --- Animations ---
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-30)).current;
  const statsScale = useRef(new Animated.Value(0.85)).current;
  const statsFade = useRef(new Animated.Value(0)).current;
  const scheduleFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered entrance animation on mount
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerFade, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(headerSlide, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.spring(statsScale, { toValue: 1, friction: 6, useNativeDriver: true }),
        Animated.timing(statsFade, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      Animated.timing(scheduleFade, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const todayTasks = tasks.filter(t => t.dueDate === 'Today' || t.dueDate === 'Tomorrow');
  const completedCount = tasks.filter(t => t.completed).length;
  const todaySchedule = SCHEDULE.slice(0, 2);
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? 'Good Morning' : currentHour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Animated.View
        style={{
          opacity: headerFade,
          transform: [{ translateY: headerSlide }],
        }}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting} 👋</Text>
            <Text style={styles.name}>Sherab cool boy</Text>
          </View>
          <TouchableOpacity
            style={styles.avatarBtn}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.avatarText}>TD</Text>
            <View style={styles.avatarDot} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Stats Row */}
      <Animated.View
        style={{
          opacity: statsFade,
          transform: [{ scale: statsScale }],
        }}
      >
        <View style={styles.statsRow}>
          <Card style={styles.statCard} glow>
            <Text style={styles.statNumber}>{completedCount}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </Card>
          <Card style={[styles.statCard, { backgroundColor: COLORS.primary }]}>
            <Text style={styles.statNumber}>{tasks.length - completedCount}</Text>
            <Text style={[styles.statLabel, { color: 'rgba(255,255,255,0.7)' }]}>Pending</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{SCHEDULE.length}</Text>
            <Text style={styles.statLabel}>Classes</Text>
          </Card>
        </View>
      </Animated.View>

      {/* Today's Schedule */}
      <Animated.View style={{ opacity: scheduleFade }}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
            <Text style={styles.seeAll}>See all →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scheduleScroll}
        >
          {todaySchedule.map((item, i) => (
            <Card key={item.id} style={[styles.scheduleCard, { borderLeftColor: item.color, borderLeftWidth: 4 }]}>
              <Text style={[styles.scheduleTime, { color: item.color }]}>{item.time}</Text>
              <Text style={styles.scheduleSubject}>{item.subject}</Text>
              <Text style={styles.scheduleRoom}>{item.room}</Text>
              <Text style={styles.scheduleDuration}>{item.duration}</Text>
            </Card>
          ))}

          {/* Placeholder card */}
          <Card style={[styles.scheduleCard, styles.scheduleMore]}>
            <Text style={styles.moreText}>+{SCHEDULE.length - 2}{'\n'}more</Text>
          </Card>
        </ScrollView>

        {/* Tasks Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
            <Text style={styles.seeAll}>See all →</Text>
          </TouchableOpacity>
        </View>

        {todayTasks.map((task, index) => (
          <TaskItem key={task.id} task={task} onToggle={toggleTask} index={index} />
        ))}
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, paddingBottom: 100 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.sm,
  },
  greeting: { color: COLORS.textMuted, fontSize: 14, marginBottom: 2 },
  name: { color: COLORS.text, fontSize: 24, fontWeight: '800' },
  avatarBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '800', fontSize: 14 },
  avatarDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.success,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  statsRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.lg },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: SPACING.md },
  statNumber: { color: COLORS.text, fontSize: 26, fontWeight: '800' },
  statLabel: { color: COLORS.textMuted, fontSize: 11, marginTop: 2 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
  sectionTitle: { color: COLORS.text, fontSize: 18, fontWeight: '700' },
  seeAll: { color: COLORS.primary, fontSize: 13, fontWeight: '600' },
  scheduleScroll: { marginBottom: SPACING.lg, marginHorizontal: -SPACING.lg, paddingLeft: SPACING.lg },
  scheduleCard: { width: 160, marginRight: SPACING.md, paddingVertical: SPACING.md },
  scheduleTime: { fontSize: 22, fontWeight: '800', marginBottom: 4 },
  scheduleSubject: { color: COLORS.text, fontSize: 13, fontWeight: '700', marginBottom: 2 },
  scheduleRoom: { color: COLORS.textMuted, fontSize: 11 },
  scheduleDuration: { color: COLORS.textSecondary, fontSize: 11, marginTop: 4 },
  scheduleMore: { width: 80, alignItems: 'center', justifyContent: 'center' },
  moreText: { color: COLORS.textMuted, fontSize: 13, textAlign: 'center', fontWeight: '700' },
});

export default HomeScreen;
