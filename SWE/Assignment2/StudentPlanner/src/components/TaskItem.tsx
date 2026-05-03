import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { COLORS, RADIUS, SPACING } from '../theme';
import { Task } from '../data';

interface TaskItemProps {
  task: Task;
  onToggle?: (id: string) => void;
  index?: number;
}

const PRIORITY_COLORS = {
  high: '#FF6584',
  medium: '#FFB830',
  low: '#00C48C',
};

// Reusable task row with fade-in stagger and tap-to-complete gesture
const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, index = 0 }) => {
  // Staggered fade-in animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(-20)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePress = () => {
    // Bounce animation on tap
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start(() => onToggle && onToggle(task.id));
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateX }, { scale: scaleAnim }],
      }}
    >
      <TouchableOpacity onPress={handlePress} activeOpacity={0.85}>
        <View style={[styles.container, task.completed && styles.completed]}>
          {/* Left color indicator */}
          <View style={[styles.indicator, { backgroundColor: task.color }]} />

          {/* Checkbox */}
          <View style={[styles.checkbox, task.completed && { backgroundColor: task.color, borderColor: task.color }]}>
            {task.completed && <Text style={styles.checkmark}>✓</Text>}
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={[styles.title, task.completed && styles.strikethrough]} numberOfLines={1}>
              {task.title}
            </Text>
            <Text style={styles.meta}>{task.subject} · {task.dueDate}</Text>
          </View>

          {/* Priority badge */}
          <View style={[styles.priority, { backgroundColor: PRIORITY_COLORS[task.priority] + '22' }]}>
            <Text style={[styles.priorityText, { color: PRIORITY_COLORS[task.priority] }]}>
              {task.priority}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  completed: {
    opacity: 0.5,
  },
  indicator: {
    width: 4,
    height: '100%',
    minHeight: 56,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginHorizontal: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
  content: {
    flex: 1,
    paddingVertical: SPACING.md,
  },
  title: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: COLORS.textMuted,
  },
  meta: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  priority: {
    marginRight: SPACING.md,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default TaskItem;
