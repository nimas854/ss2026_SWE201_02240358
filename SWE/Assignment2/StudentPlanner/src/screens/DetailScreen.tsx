import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';
import { SUBJECTS, TASKS, SCHEDULE } from '../data';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import TaskItem from '../components/TaskItem';

interface Props {
  navigation: any;
  route: any;
}

const DetailScreen: React.FC<Props> = ({ navigation, route }) => {
  // Use subject passed via params or default to first
  const subjectId = route?.params?.subjectId ?? '3';
  const subject = SUBJECTS.find(s => s.id === subjectId) ?? SUBJECTS[2];
  const subjectTasks = TASKS.filter(t => t.subject === subject.name);
  const subjectSchedule = SCHEDULE.filter(s => s.subject === subject.name);

  const heroScale = useRef(new Animated.Value(0.9)).current;
  const heroFade = useRef(new Animated.Value(0)).current;
  const contentFade = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(heroScale, { toValue: 1, friction: 6, useNativeDriver: true }),
        Animated.timing(heroFade, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(contentFade, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(contentSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Card */}
      <Animated.View style={{ opacity: heroFade, transform: [{ scale: heroScale }] }}>
        <Card style={[styles.heroCard, { borderColor: subject.color }]} glow>
          <View style={styles.heroTop}>
            <Text style={styles.heroIcon}>{subject.icon}</Text>
            <View style={[styles.heroBadge, { backgroundColor: subject.color + '33' }]}>
              <Text style={[styles.heroBadgeText, { color: subject.color }]}>Active</Text>
            </View>
          </View>
          <Text style={styles.heroName}>{subject.name}</Text>
          <Text style={styles.heroSub}>
            {subject.tasksDone} of {subject.tasksTotal} tasks completed
          </Text>

          <View style={styles.heroProgress}>
            <ProgressBar
              progress={subject.progress}
              color={subject.color}
              height={10}
              showLabel
            />
          </View>

          {/* Stats row */}
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={[styles.heroStatNum, { color: subject.color }]}>{subject.tasksDone}</Text>
              <Text style={styles.heroStatLabel}>Done</Text>
            </View>
            <View style={styles.heroDivider} />
            <View style={styles.heroStat}>
              <Text style={[styles.heroStatNum, { color: COLORS.accent }]}>
                {subject.tasksTotal - subject.tasksDone}
              </Text>
              <Text style={styles.heroStatLabel}>Left</Text>
            </View>
            <View style={styles.heroDivider} />
            <View style={styles.heroStat}>
              <Text style={[styles.heroStatNum, { color: COLORS.warning }]}>
                {subjectSchedule.length}
              </Text>
              <Text style={styles.heroStatLabel}>Sessions</Text>
            </View>
          </View>
        </Card>
      </Animated.View>

      {/* Content */}
      <Animated.View style={{ opacity: contentFade, transform: [{ translateY: contentSlide }] }}>
        {/* Schedule */}
        {subjectSchedule.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Class Schedule</Text>
            {subjectSchedule.map(item => (
              <Card key={item.id} style={[styles.schedCard, { borderLeftColor: item.color, borderLeftWidth: 4 }]}>
                <View style={styles.schedRow}>
                  <View>
                    <Text style={[styles.schedTime, { color: item.color }]}>{item.time}</Text>
                    <Text style={styles.schedRoom}>{item.room}</Text>
                  </View>
                  <View style={[styles.schedDurationBadge, { backgroundColor: item.color + '22' }]}>
                    <Text style={[styles.schedDurationText, { color: item.color }]}>{item.duration}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </>
        )}

        {/* Tasks */}
        <Text style={styles.sectionTitle}>Tasks</Text>
        {subjectTasks.length > 0 ? (
          subjectTasks.map((task, i) => (
            <TaskItem key={task.id} task={task} index={i} />
          ))
        ) : (
          <Card>
            <Text style={styles.emptyText}>No tasks for this subject 🎉</Text>
          </Card>
        )}
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, paddingBottom: 100 },
  heroCard: { marginBottom: SPACING.lg },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  heroIcon: { fontSize: 40 },
  heroBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: RADIUS.full },
  heroBadgeText: { fontSize: 12, fontWeight: '700' },
  heroName: { color: COLORS.text, fontSize: 26, fontWeight: '800', marginBottom: 4 },
  heroSub: { color: COLORS.textMuted, fontSize: 13, marginBottom: SPACING.md },
  heroProgress: { marginBottom: SPACING.lg },
  heroStats: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 4 },
  heroStat: { alignItems: 'center' },
  heroStatNum: { fontSize: 24, fontWeight: '800' },
  heroStatLabel: { color: COLORS.textMuted, fontSize: 11, marginTop: 2 },
  heroDivider: { width: 1, backgroundColor: COLORS.border, height: 36, alignSelf: 'center' },
  sectionTitle: { color: COLORS.text, fontSize: 18, fontWeight: '700', marginBottom: SPACING.md, marginTop: SPACING.sm },
  schedCard: { marginBottom: SPACING.sm },
  schedRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  schedTime: { fontSize: 20, fontWeight: '800' },
  schedRoom: { color: COLORS.textMuted, fontSize: 12, marginTop: 2 },
  schedDurationBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: RADIUS.full },
  schedDurationText: { fontSize: 13, fontWeight: '700' },
  emptyText: { color: COLORS.textMuted, textAlign: 'center', fontSize: 14 },
});

export default DetailScreen;
