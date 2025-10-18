import { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

interface Appointment {
  id: number;
  title: string;
  frequency: string;
  day: string;
  time: string;
}

export default function TabTwoScreen() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      title: "Arzttermin",
      frequency: "Monatlich",
      day: "Montag",
      time: "10:00",
    },
    {
      id: 2,
      title: "Friseur",
      frequency: "Alle 6 Wochen",
      day: "Samstag",
      time: "14:00",
    },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newFrequency, setNewFrequency] = useState("");
  const [newDay, setNewDay] = useState("");
  const [newTime, setNewTime] = useState("");

  const addAppointment = () => {
    if (
      !newTitle.trim() ||
      !newFrequency.trim() ||
      !newDay.trim() ||
      !newTime.trim()
    ) {
      Alert.alert("Fehler", "Bitte alle Felder ausfüllen");
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now(),
      title: newTitle,
      frequency: newFrequency,
      day: newDay,
      time: newTime,
    };

    setAppointments([...appointments, newAppointment]);
    setNewTitle("");
    setNewFrequency("");
    setNewDay("");
    setNewTime("");
  };

  const deleteAppointment = (id: number) => {
    Alert.alert(
      "Termin löschen",
      "Möchtest du diesen Termin wirklich löschen?",
      [
        { text: "Abbrechen", style: "cancel" },
        {
          text: "Löschen",
          style: "destructive",
          onPress: () =>
            setAppointments(appointments.filter((apt) => apt.id !== id)),
        },
      ]
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: "#6366F1",
        dark: "#4F46E5",
      }}
      headerImage={
        <View style={styles.headerContent}>
          <View style={styles.headerGradient} />
          <View style={styles.headerIconContainer}>
            <View style={styles.calendarContainer}>
              <View style={styles.calendarHeader}>
                <ThemedText style={styles.calendarMonth}>OKT</ThemedText>
              </View>
              <View style={styles.calendarBody}>
                <ThemedText style={styles.calendarDate}>18</ThemedText>
              </View>
              <View style={styles.calendarDots}>
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
            </View>
          </View>
          <View style={styles.headerTextContainer}>
            <ThemedText style={styles.headerTitle}>Meine Termine</ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              Regelmäßige Kalendereinträge verwalten
            </ThemedText>
          </View>
          <View style={styles.headerDecoration}>
            <View style={styles.decorationCircle1} />
            <View style={styles.decorationCircle2} />
            <View style={styles.decorationCircle3} />
          </View>
        </View>
      }
    >
      <View style={styles.container}>
        {/* Add Form */}
        <ThemedView style={styles.addForm}>
          <ThemedText type="subtitle" style={styles.formTitle}>
            Neuen Termin hinzufügen
          </ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Termin (z.B. Arzttermin)"
            value={newTitle}
            onChangeText={setNewTitle}
            placeholderTextColor="#9CA3AF"
          />

          <TextInput
            style={styles.input}
            placeholder="Häufigkeit (z.B. Monatlich)"
            value={newFrequency}
            onChangeText={setNewFrequency}
            placeholderTextColor="#9CA3AF"
          />

          <TextInput
            style={styles.input}
            placeholder="Wochentag (z.B. Montag)"
            value={newDay}
            onChangeText={setNewDay}
            placeholderTextColor="#9CA3AF"
          />

          <TextInput
            style={styles.input}
            placeholder="Uhrzeit (z.B. 10:00)"
            value={newTime}
            onChangeText={setNewTime}
            placeholderTextColor="#9CA3AF"
          />

          <TouchableOpacity style={styles.addButton} onPress={addAppointment}>
            <ThemedText style={styles.addButtonText}>
              ✨ Termin hinzufügen
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Appointments List */}
        <View style={styles.appointmentsList}>
          <View style={styles.listTitleContainer}>
            <Ionicons name="calendar-outline" size={24} color="#6366F1" />
            <ThemedText type="subtitle" style={styles.listTitle}>
              Meine Termine
            </ThemedText>
          </View>

          {appointments.map((appointment) => (
            <ThemedView key={appointment.id} style={styles.appointmentItem}>
              <View style={styles.appointmentContent}>
                <ThemedText
                  type="defaultSemiBold"
                  style={styles.appointmentTitle}
                >
                  {appointment.title}
                </ThemedText>
                <ThemedText style={styles.appointmentDetails}>
                  {appointment.frequency} • {appointment.day} •{" "}
                  {appointment.time}
                </ThemedText>
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteAppointment(appointment.id)}
              >
                <Ionicons name="trash-outline" size={20} color="#6B7280" />
              </TouchableOpacity>
            </ThemedView>
          ))}

          {appointments.length === 0 && (
            <ThemedText style={styles.emptyText}>
              Noch keine Termine hinzugefügt
            </ThemedText>
          )}
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  // Header Styles
  headerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: 60,
  },
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#6366F1",
    opacity: 0.9,
  },
  headerIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  calendarContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#6366F1",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  calendarHeader: {
    backgroundColor: "#EF4444",
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarMonth: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  calendarBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingTop: 4,
  },
  calendarDate: {
    color: "#1F2937",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: Fonts.rounded,
  },
  calendarDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
    gap: 3,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#6366F1",
  },
  headerIcon: {
    textAlign: "center",
  },
  headerTextContainer: {
    alignItems: "center",
    marginBottom: 20,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: Fonts.rounded,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    zIndex: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.95)",
    textAlign: "center",
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    zIndex: 10,
  },
  headerDecoration: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  decorationCircle1: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    top: 20,
    right: -30,
  },
  decorationCircle2: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    bottom: 30,
    left: -20,
  },
  decorationCircle3: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    top: 100,
    left: 30,
  },
  // Original Styles (updated with modern colors)
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  titleText: {
    fontFamily: Fonts.rounded,
  },
  addForm: {
    backgroundColor: "rgba(139, 92, 246, 0.08)",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.2)",
  },
  formTitle: {
    marginBottom: 20,
    fontWeight: "700",
    fontSize: 18,
    color: "#6366F1",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    fontSize: 16,
    shadowColor: "#6366F1",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    color: "#1F2937",
  },
  addButton: {
    backgroundColor: "#6366F1",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#6366F1",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  appointmentsList: {
    marginTop: 8,
  },
  listTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    paddingVertical: 8,
    gap: 12,
  },
  listTitle: {
    fontWeight: "800",
    fontSize: 20,
    color: "#4F46E5",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  appointmentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: "#6366F1",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.1)",
  },
  appointmentContent: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "700",
    color: "#1F2937",
  },
  appointmentDetails: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
    fontWeight: "500",
  },
  deleteButton: {
    padding: 16,
    marginLeft: 16,
    borderRadius: 12,
    backgroundColor: "rgba(107, 114, 128, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(107, 114, 128, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#9CA3AF",
    fontStyle: "italic",
    marginTop: 40,
    fontSize: 16,
    fontWeight: "500",
  },
});
