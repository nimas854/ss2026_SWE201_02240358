import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  PanResponder,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';
import Card from '../components/Card';

const { width } = Dimensions.get('window');
const DRAG_AREA_HEIGHT = 180;

const AnimationsScreen: React.FC = () => {
  // 1. Fade in/out animation
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [fadeVisible, setFadeVisible] = useState(true);

  const toggleFade = () => {
    Animated.timing(fadeAnim, {
      toValue: fadeVisible ? 0 : 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => setFadeVisible(v => !v));
  };

  // 2. Bounce / scale animation
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const doBounce = () => {
    Animated.sequence([
      Animated.spring(bounceAnim, { toValue: 1.35, friction: 3, useNativeDriver: true }),
      Animated.spring(bounceAnim, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
  };

  // 3. Slide toggle animation
  const slideAnim = useRef(new Animated.Value(-120)).current;
  const [slideIn, setSlideIn] = useState(false);
  const toggleSlide = () => {
    Animated.spring(slideAnim, {
      toValue: slideIn ? -120 : 0,
      friction: 7,
      useNativeDriver: true,
    }).start(() => setSlideIn(v => !v));
  };

  // 4. Rotating loading indicator
  const spinAnim = useRef(new Animated.Value(0)).current;
  const [spinning, setSpinning] = useState(false);
  const spinRef = useRef<Animated.CompositeAnimation | null>(null);
  const startSpin = () => {
    setSpinning(true);
    spinRef.current = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      })
    );
    spinRef.current.start();
  };
  const stopSpin = () => {
    spinRef.current?.stop();
    spinAnim.setValue(0);
    setSpinning(false);
  };
  const spin = spinAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  // 5. Animated progress bar
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [progressRunning, setProgressRunning] = useState(false);
  const runProgress = () => {
    if (progressRunning) return;
    setProgressRunning(true);
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => setProgressRunning(false));
  };
  const progressWidth = progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const progressColor = progressAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [COLORS.accent, COLORS.warning, COLORS.success],
  });

  // 6. Draggable element (PanResponder gesture)
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: (pan.x as any)._value, y: (pan.y as any)._value });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
        // Spring back to center
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  // 7. Color pulse animation
  const pulseAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  const pulseScale = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageTitle}>Animation Demo</Text>
      <Text style={styles.pageSubtitle}>Tap each card to trigger animations</Text>

      {/* 1. Fade */}
      <Card style={styles.demoCard}>
        <Text style={styles.demoLabel}>1 · Fade In / Out</Text>
        <View style={styles.demoArea}>
          <Animated.View style={[styles.demoBox, { opacity: fadeAnim, backgroundColor: COLORS.primary }]}>
            <Text style={styles.demoBoxText}>Hello!</Text>
          </Animated.View>
        </View>
        <TouchableOpacity style={styles.demoBtn} onPress={toggleFade}>
          <Text style={styles.demoBtnText}>{fadeVisible ? 'Fade Out' : 'Fade In'}</Text>
        </TouchableOpacity>
      </Card>

      {/* 2. Bounce */}
      <Card style={styles.demoCard}>
        <Text style={styles.demoLabel}>2 · Bounce / Scale</Text>
        <View style={styles.demoArea}>
          <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
            <Text style={{ fontSize: 50 }}>⭐</Text>
          </Animated.View>
        </View>
        <TouchableOpacity style={styles.demoBtn} onPress={doBounce}>
          <Text style={styles.demoBtnText}>Bounce!</Text>
        </TouchableOpacity>
      </Card>

      {/* 3. Slide */}
      <Card style={styles.demoCard}>
        <Text style={styles.demoLabel}>3 · Slide Animation</Text>
        <View style={[styles.demoArea, { overflow: 'hidden' }]}>
          <Animated.View
            style={[
              styles.slideBox,
              { transform: [{ translateX: slideAnim }] },
            ]}
          >
            <Text style={styles.demoBoxText}>Slide In →</Text>
          </Animated.View>
        </View>
        <TouchableOpacity style={styles.demoBtn} onPress={toggleSlide}>
          <Text style={styles.demoBtnText}>{slideIn ? 'Slide Out' : 'Slide In'}</Text>
        </TouchableOpacity>
      </Card>

      {/* 4. Spin */}
      <Card style={styles.demoCard}>
        <Text style={styles.demoLabel}>4 · Rotating Indicator</Text>
        <View style={styles.demoArea}>
          <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
            <View style={styles.spinnerInner} />
          </Animated.View>
        </View>
        <TouchableOpacity style={styles.demoBtn} onPress={spinning ? stopSpin : startSpin}>
          <Text style={styles.demoBtnText}>{spinning ? 'Stop' : 'Spin'}</Text>
        </TouchableOpacity>
      </Card>

      {/* 5. Progress */}
      <Card style={styles.demoCard}>
        <Text style={styles.demoLabel}>5 · Progress Animation</Text>
        <View style={styles.demoArea}>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, { width: progressWidth, backgroundColor: progressColor }]} />
          </View>
        </View>
        <TouchableOpacity style={styles.demoBtn} onPress={runProgress}>
          <Text style={styles.demoBtnText}>{progressRunning ? 'Running...' : 'Run Progress'}</Text>
        </TouchableOpacity>
      </Card>

      {/* 6. Drag */}
      <Card style={styles.demoCard}>
        <Text style={styles.demoLabel}>6 · Draggable (Gesture)</Text>
        <Text style={styles.demoHint}>Drag the circle, it springs back!</Text>
        <View style={[styles.demoArea, { height: DRAG_AREA_HEIGHT }]}>
          <Animated.View
            style={[styles.dragBall, { transform: pan.getTranslateTransform() }]}
            {...panResponder.panHandlers}
          >
            <Text style={{ fontSize: 24 }}>🎯</Text>
          </Animated.View>
        </View>
      </Card>

      {/* 7. Pulse */}
      <Card style={styles.demoCard}>
        <Text style={styles.demoLabel}>7 · Auto Pulse (Loop)</Text>
        <View style={styles.demoArea}>
          <Animated.View style={[styles.pulseRing, { transform: [{ scale: pulseScale }] }]}>
            <View style={styles.pulseDot} />
          </Animated.View>
        </View>
        <Text style={styles.demoHint}>Runs automatically on mount</Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, paddingBottom: 100 },
  pageTitle: { color: COLORS.text, fontSize: 28, fontWeight: '800', marginBottom: 4 },
  pageSubtitle: { color: COLORS.textMuted, fontSize: 13, marginBottom: SPACING.lg },
  demoCard: { marginBottom: SPACING.md },
  demoLabel: { color: COLORS.primary, fontSize: 13, fontWeight: '700', marginBottom: SPACING.md },
  demoHint: { color: COLORS.textMuted, fontSize: 11, marginBottom: 6 },
  demoArea: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
  },
  demoBox: {
    paddingHorizontal: 24, paddingVertical: 12,
    borderRadius: RADIUS.md,
  },
  demoBoxText: { color: '#fff', fontWeight: '700' },
  demoBtn: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: RADIUS.md,
    padding: SPACING.sm + 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  demoBtnText: { color: COLORS.text, fontWeight: '600', fontSize: 13 },
  slideBox: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 20, paddingVertical: 12,
    borderRadius: RADIUS.md,
  },
  spinner: {
    width: 50, height: 50, borderRadius: 25,
    borderWidth: 4, borderColor: COLORS.primaryLight,
    borderTopColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  spinnerInner: {
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  progressTrack: {
    width: '80%', height: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: RADIUS.full },
  dragBall: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: COLORS.primary + '44',
    borderWidth: 2, borderColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  pulseRing: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: COLORS.accent + '22',
    borderWidth: 2, borderColor: COLORS.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  pulseDot: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: COLORS.accent,
  },
});

export default AnimationsScreen;
