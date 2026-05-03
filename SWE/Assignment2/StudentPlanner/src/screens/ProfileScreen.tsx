import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';
import { SUBJECTS, TASKS } from '../data';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';

const ProfileScreen: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [studyReminders, setStudyReminders] = useState(false);

  const avatarScale = useRef(new Animated.Value(0)).current;
  const contentFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(avatarScale, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(contentFade, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const completedTasks = TASKS.filter(t => t.completed).length;
  const totalProgress = Math.round(
    SUBJECTS.reduce((acc, s) => acc + s.progress, 0) / SUBJECTS.length
  );

  const SettingRow = ({
    icon, label, value, onToggle,
  }: { icon: string; label: string; value: boolean; onToggle: () => void }) => (
    <View style={styles.settingRow}>
      <Text style={styles.settingIcon}>{icon}</Text>
      <Text style={styles.settingLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: COLORS.border, true: COLORS.primary }}
        thumbColor={COLORS.white}
        ios_backgroundColor={COLORS.border}
      />
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Avatar section */}
      <Animated.View style={[styles.avatarSection, { transform: [{ scale: avatarScale }] }]}>
        <View style={styles.avatarRing}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>TD</Text>
          </View>
        </View>
        <Text style={styles.profileName}>Sherab cool bhai</Text>
        <Text style={styles.profileSub}>BE Software Engineering · Year 2</Text>

        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🏆 Top Achiever</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: COLORS.success + '22' }]}>
            <Text style={[styles.badgeText, { color: COLORS.success }]}>✅ Consistent</Text>
          </View>
        </View>
      </Animated.View>

      {/* Stats */}
      <Animated.View style={{ opacity: contentFade }}>
        <Card style={styles.statsCard} glow>
          <Text style={styles.cardTitle}>Academic Overview</Text>
          <View style={styles.overviewRow}>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewNum}>{SUBJECTS.length}</Text>
              <Text style={styles.overviewLabel}>Subjects</Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={[styles.overviewNum, { color: COLORS.success }]}>{completedTasks}</Text>
              <Text style={styles.overviewLabel}>Completed</Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={[styles.overviewNum, { color: COLORS.warning }]}>{totalProgress}%</Text>
              <Text style={styles.overviewLabel}>Avg Progress</Text>
            </View>
          </View>

          <Text style={[styles.cardTitle, { marginTop: SPACING.md }]}>Overall Progress</Text>
          <ProgressBar progress={totalProgress} color={COLORS.primary} height={8} showLabel />
        </Card>

        {/* Subject progress list */}
        <Card style={styles.subjectsCard}>
          <Text style={styles.cardTitle}>Subject Breakdown</Text>
          {SUBJECTS.map(subject => (
            <View key={subject.id} style={styles.subjectRow}>
              <Text style={styles.subjectRowIcon}>{subject.icon}</Text>
              <View style={styles.subjectRowContent}>
                <Text style={styles.subjectRowName}>{subject.name}</Text>
                <ProgressBar progress={subject.progress} color={subject.color} height={5} />
              </View>
              <Text style={[styles.subjectRowPct, { color: subject.color }]}>{subject.progress}%</Text>
            </View>
          ))}
        </Card>

        {/* Settings */}
        <Card style={styles.settingsCard}>
          <Text style={styles.cardTitle}>Settings</Text>
          <SettingRow icon="🔔" label="Notifications" value={notifications} onToggle={() => setNotifications(v => !v)} />
          <View style={styles.divider} />
          <SettingRow icon="🌙" label="Dark Mode" value={darkMode} onToggle={() => setDarkMode(v => !v)} />
          <View style={styles.divider} />
          <SettingRow icon="⏰" label="Study Reminders" value={studyReminders} onToggle={() => setStudyReminders(v => !v)} />
        </Card>

        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, paddingBottom: 100 },
  avatarSection: { alignItems: 'center', marginBottom: SPACING.xl },
  avatarRing: {
    width: 90, height: 90, borderRadius: 45,
    borderWidth: 3, borderColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 78, height: 78, borderRadius: 39,
    backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: '800' },
  profileName: { color: COLORS.text, fontSize: 22, fontWeight: '800', marginBottom: 4 },
  profileSub: { color: COLORS.textMuted, fontSize: 13, marginBottom: SPACING.md },
  badgeRow: { flexDirection: 'row', gap: SPACING.sm },
  badge: {
    backgroundColor: COLORS.warning + '22', paddingHorizontal: 10,
    paddingVertical: 4, borderRadius: RADIUS.full,
  },
  badgeText: { color: COLORS.warning, fontSize: 12, fontWeight: '600' },
  statsCard: { marginBottom: SPACING.md },
  cardTitle: { color: COLORS.text, fontSize: 15, fontWeight: '700', marginBottom: SPACING.md },
  overviewRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: SPACING.md },
  overviewItem: { alignItems: 'center' },
  overviewNum: { color: COLORS.text, fontSize: 26, fontWeight: '800' },
  overviewLabel: { color: COLORS.textMuted, fontSize: 11, marginTop: 2 },
  subjectsCard: { marginBottom: SPACING.md },
  subjectRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  subjectRowIcon: { fontSize: 20, marginRight: SPACING.sm },
  subjectRowContent: { flex: 1, marginRight: SPACING.sm },
  subjectRowName: { color: COLORS.textSecondary, fontSize: 12, marginBottom: 4 },
  subjectRowPct: { fontSize: 12, fontWeight: '700', width: 35, textAlign: 'right' },
  settingsCard: { marginBottom: SPACING.md },
  settingRow: { flexDirection: 'row', alignItems: 'center' },
  settingIcon: { fontSize: 20, marginRight: SPACING.md },
  settingLabel: { flex: 1, color: COLORS.text, fontSize: 15 },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: SPACING.sm },
  logoutBtn: {
    borderRadius: RADIUS.lg, borderWidth: 1, borderColor: COLORS.accent,
    padding: SPACING.md, alignItems: 'center',
  },
  logoutText: { color: COLORS.accent, fontWeight: '700', fontSize: 15 },
});

export default ProfileScreen;
