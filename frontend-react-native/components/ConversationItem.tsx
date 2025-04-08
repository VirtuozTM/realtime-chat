import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { memo } from "react";
import { Conversation } from "@/types";
import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useSession } from "@/context/AuthContext";

const ConversationItem = ({
  conversation,
  index,
}: {
  conversation: Conversation;
  index: number;
}) => {
  const router = useRouter();

  const { user } = useSession();

  // Trouver le participant qui n'est pas l'utilisateur connecté
  const participant =
    conversation.participants.find((p) => p.id !== user?.id) ||
    conversation.participants[0]; // Fallback au premier participant si non trouvé

  // Obtenir le dernier message de la conversation
  const lastMessage =
    conversation.messages.length > 0
      ? conversation.messages[conversation.messages.length - 1]
      : null;

  // Vérifier si le dernier message est non lu et n'est pas de l'utilisateur connecté
  const isUnread = lastMessage
    ? !lastMessage.is_read && lastMessage.sender.id !== user?.id
    : false;

  // Déterminer le message à afficher : dernier message reçu (pas envoyé par l'utilisateur connecté)
  const getDisplayMessage = () => {
    if (!conversation.messages.length) return "Aucun message";

    // Parcourir les messages du plus récent au plus ancien
    for (let i = conversation.messages.length - 1; i >= 0; i--) {
      const msg = conversation.messages[i];
      // Si c'est un message reçu (pas envoyé par l'utilisateur connecté)
      if (msg.sender.id !== user?.id) {
        return msg.content;
      }
    }

    // Si tous les messages sont de l'utilisateur connecté
    return (
      "Vous: " + conversation.messages[conversation.messages.length - 1].content
    );
  };

  const displayMessage = getDisplayMessage();

  // Calculer l'heure relative
  const getRelativeTime = (timestamp: string) => {
    const messageTime = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor(
      (now.getTime() - messageTime.getTime()) / (1000 * 60 * 60)
    );

    if (diffHours < 1) return "À l'instant";
    if (diffHours === 1) return "Il y a 1h";
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffHours < 48) return "Hier";
    return `Il y a ${Math.floor(diffHours / 24)}j`;
  };

  const timeAgo = lastMessage ? getRelativeTime(lastMessage.timestamp) : "";

  const handlePress = () => {
    router.push({
      pathname: "/chat",
      params: {
        id: participant.id,
        first_name: participant.first_name,
        last_name: participant.last_name,
        avatar_url: participant.avatar_url,
        status: participant.status ? "true" : "false",
      },
    });
  };

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(500)
        .springify()
        .damping(14)}
    >
      <Pressable style={styles.container} onPress={handlePress}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: participant.avatar_url }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Text
              style={[styles.name, isUnread && styles.unreadText]}
              numberOfLines={1}
            >
              {participant.first_name} {participant.last_name}
            </Text>
            <Text style={[styles.time, isUnread && styles.unreadText]}>
              {timeAgo}
            </Text>
          </View>

          <View style={styles.messageRow}>
            <Text
              style={[styles.message, isUnread && styles.unreadText]}
              numberOfLines={1}
            >
              {displayMessage}
            </Text>

            {isUnread && <View style={styles.unreadIndicator} />}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default memo(ConversationItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 15,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.neutral200,
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    color: colors.neutral400,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  message: {
    fontSize: 14,
    color: colors.neutral400,
    flex: 1,
    marginRight: 8,
  },
  unreadText: {
    color: colors.neutral100,
    fontWeight: "600",
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});
