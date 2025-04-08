import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import { useSession } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import ProfileAvatar from "@/components/ProfileAvatar";
import { colors } from "@/constants/theme";

const ProfileScreen = () => {
  const { user, signOut } = useSession();

  const showLogoutAlert = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      {
        text: "Annuler",
        onPress: () => console.log("cancel logout"),
      },
      {
        text: "Déconnexion",
        onPress: () => signOut(),
        style: "destructive",
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* En-tête du profil */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <ProfileAvatar avatarUrl={user?.avatar_url || null} size={120} />
        </View>
        <Text style={styles.name}>
          {user?.first_name} {user?.last_name}
        </Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* Section des options */}
      <View style={styles.section}>
        <Pressable style={styles.option} onPress={() => {}}>
          <Ionicons name="person-outline" size={24} color={colors.neutral200} />
          <Text style={styles.optionText}>Modifier le profil</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.neutral400}
          />
        </Pressable>

        <Pressable style={styles.option} onPress={() => {}}>
          <Ionicons
            name="settings-outline"
            size={24}
            color={colors.neutral200}
          />
          <Text style={styles.optionText}>Paramètres</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.neutral400}
          />
        </Pressable>

        <Pressable style={styles.option} onPress={() => {}}>
          <Ionicons
            name="help-circle-outline"
            size={24}
            color={colors.neutral200}
          />
          <Text style={styles.optionText}>Aide</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.neutral400}
          />
        </Pressable>
      </View>

      {/* Bouton de déconnexion */}
      <Pressable style={styles.logoutButton} onPress={showLogoutAlert}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.neutral800,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.neutral800,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    color: colors.neutral200,
  },
  email: {
    fontSize: 16,
    color: colors.neutral400,
  },
  section: {
    backgroundColor: colors.neutral800,
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  optionText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: colors.neutral200,
  },
  logoutButton: {
    backgroundColor: "#ff4444",
    marginHorizontal: 16,
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  logoutText: {
    color: colors.neutral200,
    fontSize: 16,
    fontWeight: "600",
  },
});
