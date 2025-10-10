import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { timerService } from "../../services/timerService";
import { Timer, TimerInput } from "../../types/Timer";

export default function DB() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTimer, setEditingTimer] = useState<Timer | null>(null);

  // Form state
  const [formData, setFormData] = useState<TimerInput>({
    name: "",
    type: "countdown",
    duration: 300,
    description: "",
  });

  useEffect(() => {
    loadTimers();
  }, []);

  // LOAD ALL TIMERS
  const loadTimers = async () => {
    setLoading(true);
    try {
      const data = await timerService.getAllTimers();
      setTimers(data);
    } catch (error) {
      Alert.alert("Error", "Failed to load timers");
    } finally {
      setLoading(false);
    }
  };

  // CREATE OR UPDATE
  const handleSave = async () => {
    if (!formData.name.trim()) {
      Alert.alert("Error", "Timer name is required");
      return;
    }

    setLoading(true);
    try {
      if (editingTimer) {
        // UPDATE
        await timerService.updateTimer(editingTimer.id, formData);
        Alert.alert("Success", "Timer updated successfully");
      } else {
        // CREATE
        await timerService.createTimer(formData);
        Alert.alert("Success", "Timer created successfully");
      }

      resetForm();
      setModalVisible(false);
      loadTimers();
    } catch (error) {
      Alert.alert("Error", "Failed to save timer");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = (timer: Timer) => {
    Alert.alert(
      "Delete Timer",
      `Are you sure you want to delete "${timer.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await timerService.deleteTimer(timer.id);
              Alert.alert("Success", "Timer deleted successfully");
              loadTimers();
            } catch (error) {
              Alert.alert("Error", "Failed to delete timer");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  // EDIT
  const handleEdit = (timer: Timer) => {
    setEditingTimer(timer);
    setFormData({
      name: timer.name,
      type: timer.type,
      duration: timer.duration,
      description: timer.description,
    });
    setModalVisible(true);
  };

  // RESET FORM
  const resetForm = () => {
    setFormData({
      name: "",
      type: "countdown",
      duration: 300,
      description: "",
    });
    setEditingTimer(null);
  };

  // OPEN CREATE MODAL
  const handleCreate = () => {
    resetForm();
    setModalVisible(true);
  };

  // RENDER TIMER ITEM
  const renderTimerItem = ({ item }: { item: Timer }) => (
    <View style={styles.timerItem}>
      <View style={styles.timerInfo}>
        <Text style={styles.timerName}>{item.name}</Text>
        <Text style={styles.timerType}>{item.type}</Text>
        <Text style={styles.timerDuration}>
          {Math.floor(item.duration / 60)} minutes
        </Text>
        {item.description && (
          <Text style={styles.timerDesc}>{item.description}</Text>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleEdit(item)}
        >
          <Ionicons name="create-outline" size={24} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDelete(item)}
        >
          <Ionicons name="trash-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // RENDER FORM MODAL
  const renderFormModal = () => (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editingTimer ? "Edit Timer" : "Create Timer"}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={28} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formContainer}>
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Timer Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                placeholder="Enter timer name"
                placeholderTextColor="#999"
              />
            </View>

            {/* Type Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Timer Type</Text>
              <View style={styles.typeButtons}>
                {["countdown", "pomodoro", "interval"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeButton,
                      formData.type === type && styles.typeButtonActive,
                    ]}
                    onPress={() => setFormData({ ...formData, type })}
                  >
                    <Text
                      style={[
                        styles.typeButtonText,
                        formData.type === type && styles.typeButtonTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Duration Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Duration (minutes)</Text>
              <TextInput
                style={styles.input}
                value={String(Math.floor(formData.duration / 60))}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    duration: parseInt(text || "0") * 60,
                  })
                }
                keyboardType="numeric"
                placeholder="5"
                placeholderTextColor="#999"
              />
            </View>

            {/* Description Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) =>
                  setFormData({ ...formData, description: text })
                }
                placeholder="Enter description (optional)"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </ScrollView>

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>
                {editingTimer ? "Update Timer" : "Create Timer"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Manage Timers</Text>
        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <Ionicons name="add-circle" size={32} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Timer List */}
      {loading && timers.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : timers.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="timer-outline" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No Timers Yet</Text>
          <Text style={styles.emptyText}>
            Create your first timer to get started
          </Text>
        </View>
      ) : (
        <FlatList
          data={timers}
          renderItem={renderTimerItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshing={loading}
          onRefresh={loadTimers}
        />
      )}

      {/* Form Modal */}
      {renderFormModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  createButton: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  listContent: {
    padding: 16,
  },
  timerItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timerInfo: {
    flex: 1,
  },
  timerName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  timerType: {
    fontSize: 14,
    color: "#007AFF",
    textTransform: "capitalize",
    marginBottom: 4,
  },
  timerDuration: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  timerDesc: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionButton: {
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  typeButtons: {
    flexDirection: "row",
    gap: 8,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  typeButtonActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    textTransform: "capitalize",
  },
  typeButtonTextActive: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    margin: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
