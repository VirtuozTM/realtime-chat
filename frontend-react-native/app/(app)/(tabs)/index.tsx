import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState, useRef } from "react";
import {
  MagnifyingGlass,
  ChatCircle,
  Plus,
  NotePencil,
} from "phosphor-react-native";
import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { getFriendsOnlineData, getConversations } from "@/services/fetchData";
import { Conversation, User, Message } from "@/types";
import FriendsConnectedItem from "@/components/FriendsConnectedItem";
import ConversationItem from "@/components/ConversationItem";
import WebSocketService from "@/services/websocket";
import { useSession } from "@/context/AuthContext";

const FriendsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [friendsOnline, setFriendsOnline] = useState<User[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();
  const { session, user } = useSession();
  const wsRef = useRef<WebSocketService | null>(null);

  const fetchFriends = async () => {
    await getFriendsOnlineData()
      .then((data) => {
        const onlineFriends = data.filter((friend) => friend.status === true);
        setFriendsOnline(onlineFriends);
      })
      .catch((err) =>
        console.error("Erreur lors du chargement des amis :", err)
      );
  };

  const fetchConversations = async () => {
    await getConversations()
      .then((data) => setConversations(data))
      .catch((err) =>
        console.error("Erreur lors du chargement des conversations :", err)
      );
  };

  useEffect(() => {
    fetchFriends();
    fetchConversations();
  }, []);

  useEffect(() => {
    if (!session?.access) {
      console.error("Pas de token d'authentification disponible");
      return;
    }

    const wsUrl = `ws://192.168.1.77:8000/ws/notifications/?token=${session.access}`;
    console.log("Connexion WebSocket de notifications avec URL:", wsUrl);

    wsRef.current = new WebSocketService(wsUrl);
    wsRef.current.setOnOpenCallback(() => {
      console.log("WebSocket de notifications connecté");
    });

    wsRef.current.setOnMessageCallback((data) => {
      const parsedData = JSON.parse(data);
      console.log("Notification reçue:", parsedData);

      if (parsedData.type === "new_message") {
        handleNewMessage(parsedData);
      }
    });

    wsRef.current.connect();

    return () => {
      wsRef.current?.disconnect();
    };
  }, [session?.access, user?.id]);

  const handleNewMessage = (notification: any) => {
    const { conversation_id, message_id, sender_id, content, timestamp } =
      notification;

    setConversations((prevConversations) => {
      const updatedConversations = [...prevConversations];

      const conversationIndex = updatedConversations.findIndex(
        (conv) => conv.id === conversation_id
      );

      if (conversationIndex !== -1) {
        const updatedConversation = {
          ...updatedConversations[conversationIndex],
        };

        const newMessage: Message = {
          id: message_id,
          conversation: conversation_id,
          sender: updatedConversation.participants.find(
            (p) => p.id === sender_id
          ) as User,
          content: content,
          timestamp: timestamp,
          is_read: sender_id === user?.id,
        };

        if (updatedConversation.messages) {
          updatedConversation.messages = [
            newMessage,
            ...updatedConversation.messages,
          ];
        } else {
          updatedConversation.messages = [newMessage];
        }

        updatedConversation.updated_at = timestamp;

        updatedConversations[conversationIndex] = updatedConversation;

        updatedConversations.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );

        return updatedConversations;
      }

      fetchConversations();
      return prevConversations;
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchConversations();
    setIsRefreshing(false);
  };

  const handleChatPress = (friend: User) => {
    router.push({
      pathname: "/chat",
      params: {
        id: friend.id,
        first_name: friend.first_name,
        last_name: friend.last_name,
        avatar_url: friend.avatar_url,
        status: friend.status ? "true" : "false",
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
      <View style={styles.contentContainer}>
        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <MagnifyingGlass
            size={20}
            color={colors.neutral400}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher..."
            placeholderTextColor={colors.neutral400}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View>
          {friendsOnline.length > 0 ? (
            <FlatList
              data={friendsOnline}
              keyExtractor={(item) => item.id}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              renderItem={({ item, index }) => {
                return <FriendsConnectedItem friend={item} index={index} />;
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 15, paddingHorizontal: 12 }}
            />
          ) : (
            <Text style={styles.emptyListText}>
              Aucun ami en ligne pour le moment
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
            marginBottom: 10,
            marginHorizontal: 12,
          }}
        >
          <Text style={styles.sectionTitle}>Conversations</Text>
          <NotePencil size={24} color={colors.neutral200} />
        </View>

        <FlatList
          data={conversations}
          renderItem={({ item, index }) => (
            <ConversationItem conversation={item} index={index} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={[colors.neutral800]}
              tintColor={colors.neutral800}
            />
          }
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          contentContainerStyle={{ gap: 5, paddingHorizontal: 12 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutral700,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
    height: 48,
    marginHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: colors.neutral200,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.neutral200,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListText: {
    color: colors.neutral400,
    textAlign: "center",
    marginVertical: 20,
    paddingHorizontal: 12,
    fontStyle: "italic",
  },
});
