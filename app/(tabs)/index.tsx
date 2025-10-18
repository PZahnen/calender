import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

// Utility functions for calendar
const getDaysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

const getMonthName = (date: Date) => {
  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  return months[date.getMonth()];
};

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  date: Date;
}

export default function HomeScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const today = new Date();

  // Generate calendar days
  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);

    const days: CalendarDay[] = [];

    // Previous month days
    const prevMonth = new Date(year, month - 1, 0);
    const daysInPrevMonth = prevMonth.getDate();

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const date = new Date(year, month - 1, day);
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        date,
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = date.toDateString() === selectedDate.toDateString();

      days.push({
        day,
        isCurrentMonth: true,
        isToday,
        isSelected,
        date,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        date,
      });
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const selectDate = (day: CalendarDay) => {
    if (day.isCurrentMonth) {
      setSelectedDate(day.date);
    }
  };

  const calendarDays = generateCalendarDays();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#6366F1", dark: "#4F46E5" }}
      headerImage={
        <View style={styles.headerContent}>
          <Ionicons
            name="calendar"
            size={80}
            color="white"
            style={styles.headerIcon}
          />
          <ThemedText type="title" style={styles.headerTitle}>
            Kalender
          </ThemedText>
        </View>
      }
    >
      {/* Calendar Header */}
      <ThemedView style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateMonth("prev")}
          >
            <Ionicons name="chevron-back" size={24} color="#6366F1" />
          </TouchableOpacity>

          <ThemedText type="subtitle" style={styles.monthTitle}>
            {getMonthName(currentDate)} {currentDate.getFullYear()}
          </ThemedText>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateMonth("next")}
          >
            <Ionicons name="chevron-forward" size={24} color="#6366F1" />
          </TouchableOpacity>
        </View>

        {/* Weekday Headers */}
        <View style={styles.weekdaysContainer}>
          {["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"].map((day) => (
            <View key={day} style={styles.weekdayHeader}>
              <ThemedText style={styles.weekdayText}>{day}</ThemedText>
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {calendarDays.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayCell,
                !day.isCurrentMonth && styles.dayOtherMonth,
                day.isToday && styles.dayToday,
                day.isSelected && styles.daySelected,
              ]}
              onPress={() => selectDate(day)}
              disabled={!day.isCurrentMonth}
            >
              <ThemedText
                style={[
                  styles.dayText,
                  !day.isCurrentMonth && styles.dayTextOtherMonth,
                  day.isToday && styles.dayTextToday,
                  day.isSelected && styles.dayTextSelected,
                ]}
              >
                {day.day}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>

      {/* Selected Date Info */}
      <ThemedView style={styles.selectedDateContainer}>
        <View style={styles.selectedDateHeader}>
          <Ionicons name="today" size={24} color="#6366F1" />
          <ThemedText type="subtitle" style={styles.selectedDateTitle}>
            Ausgewähltes Datum
          </ThemedText>
        </View>
        <ThemedText style={styles.selectedDateText}>
          {selectedDate.toLocaleDateString("de-DE", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </ThemedText>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={20} color="white" />
            <ThemedText style={styles.actionButtonText}>
              Termin hinzufügen
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonSecondary]}
          >
            <Ionicons name="list" size={20} color="#6366F1" />
            <ThemedText
              style={[
                styles.actionButtonText,
                styles.actionButtonTextSecondary,
              ]}
            >
              Termine anzeigen
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Today's Summary */}
      <ThemedView style={styles.todaySummary}>
        <ThemedText type="subtitle" style={styles.summaryTitle}>
          Heute ({today.getDate()}.{today.getMonth() + 1}.{today.getFullYear()})
        </ThemedText>
        <View style={styles.summaryContent}>
          <View style={styles.summaryItem}>
            <Ionicons name="time" size={16} color="#6366F1" />
            <ThemedText style={styles.summaryText}>
              Keine Termine heute
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  // Header Styles
  headerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  headerIcon: {
    marginBottom: 10,
    opacity: 0.9,
  },
  headerTitle: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
  },

  // Calendar Container
  calendarContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },

  // Calendar Header
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  navButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
  },
  monthTitle: {
    color: "#1F2937",
    fontWeight: "600",
    textAlign: "center",
  },

  // Weekdays
  weekdaysContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  weekdayHeader: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  weekdayText: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "500",
  },

  // Calendar Grid
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.28%", // 100% / 7 days
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    margin: 1,
  },
  dayOtherMonth: {
    opacity: 0.3,
  },
  dayToday: {
    backgroundColor: "#FEF3C7",
  },
  daySelected: {
    backgroundColor: "#6366F1",
  },
  dayText: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
  dayTextOtherMonth: {
    color: "#9CA3AF",
  },
  dayTextToday: {
    color: "#92400E",
    fontWeight: "700",
  },
  dayTextSelected: {
    color: "white",
    fontWeight: "700",
  },

  // Selected Date Container
  selectedDateContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedDateHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  selectedDateTitle: {
    color: "#6366F1",
    fontWeight: "600",
  },
  selectedDateText: {
    fontSize: 18,
    color: "#1F2937",
    fontWeight: "500",
    marginBottom: 20,
  },

  // Quick Actions
  quickActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#6366F1",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actionButtonSecondary: {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
  },
  actionButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  actionButtonTextSecondary: {
    color: "#6366F1",
  },

  // Today's Summary
  todaySummary: {
    backgroundColor: "white",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryTitle: {
    color: "#1F2937",
    fontWeight: "600",
    marginBottom: 16,
  },
  summaryContent: {
    gap: 12,
  },
  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  summaryText: {
    color: "#6B7280",
    fontSize: 14,
  },
});
