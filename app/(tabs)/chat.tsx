import React from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { Image } from "expo-image";
import { MessageSquare, Search } from "lucide-react-native";
import { useRouter } from "expo-router";
import Theme from "@/constants/theme";
import useAuthStore from "@/store/auth";

// Mock data for chats
const chats = [
  {
    id: "1",
    user: {
      id: "101",
      name: "John Smith",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    },
    lastMessage: {
      text: "Is the apartment still available?",
      timestamp: "2023-09-15T10:30:00Z",
      read: true,
    },
    property: {
      id: "1",
      title: "Modern Apartment with City View",
    },
  },
  {
    id: "2",
    user: {
      id: "102",
      name: "Emily Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    },
    lastMessage: {
      text: "Can I schedule a viewing for tomorrow?",
      timestamp: "2023-09-14T15:45:00Z",
      read: false,
    },
    property: {
      id: "2",
      title: "Spacious Family House with Garden",
    },
  },
  {
    id: "3",
    user: {
      id: "103",
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    },
    lastMessage: {
      text: "Thank you for the information. I'll get back to you soon.",
      timestamp: "2023-09-13T09:20:00Z",
      read: true,
    },
    property: {
      id: "3",
      title: "Luxury Villa with Ocean View",
    },
  },
];

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays < 7) {
    return date.toLocaleDateString([], { weekday: "short" });
  } else {
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  }
}

export default function ChatScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return (
      <View style={styles.authContainer}>
        <MessageSquare size={60} color={Theme.colors.neutral.lightGray} />
        <Text style={styles.authTitle}>Sign in to access messages</Text>
        <Text style={styles.authText}>
          You need to sign in to view and send messages to property owners.
        </Text>
        <Pressable
          style={styles.authButton}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.authButtonText}>Sign In</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <Pressable style={styles.searchButton} onPress={() => console.log("Search chats")}>
          <Search size={24} color={Theme.colors.neutral.darkGray} />
        </Pressable>
      </View>
      
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.chatItem}
            onPress={() => router.push(`/chat/${item.id}`)}
          >
            <Image
              source={{ uri: item.user.avatar }}
              style={styles.avatar}
            />
            
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.userName}>{item.user.name}</Text>
                <Text style={styles.timestamp}>
                  {formatTimestamp(item.lastMessage.timestamp)}
                </Text>
              </View>
              
              <Text style={styles.propertyTitle} numberOfLines={1}>
                Re: {item.property.title}
              </Text>
              
              <Text
                style={[
                  styles.messageText,
                  !item.lastMessage.read && styles.unreadMessage,
                ]}
                numberOfLines={1}
              >
                {item.lastMessage.text}
              </Text>
            </View>
            
            {!item.lastMessage.read && <View style={styles.unreadIndicator} />}
          </Pressable>
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MessageSquare size={60} color={Theme.colors.neutral.lightGray} />
            <Text style={styles.emptyTitle}>No messages</Text>
            <Text style={styles.emptyText}>
              When you contact property owners, your conversations will appear here.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral.lightGray,
  },
  headerTitle: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.neutral.black,
  },
  searchButton: {
    padding: Theme.spacing.xs,
  },
  listContainer: {
    padding: Theme.spacing.md,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.neutral.white,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.small,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Theme.spacing.md,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  userName: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: Theme.typography.weights.semibold,
    color: Theme.colors.neutral.black,
  },
  timestamp: {
    fontSize: Theme.typography.sizes.xs,
    color: Theme.colors.neutral.darkGray,
  },
  propertyTitle: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.primary.main,
    marginBottom: 2,
  },
  messageText: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
  },
  unreadMessage: {
    fontWeight: Theme.typography.weights.semibold,
    color: Theme.colors.neutral.black,
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Theme.colors.primary.main,
    marginLeft: Theme.spacing.sm,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: Theme.spacing.xl,
    marginTop: Theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.neutral.black,
    marginVertical: Theme.spacing.md,
  },
  emptyText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    textAlign: "center",
  },
  authContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Theme.spacing.xl,
  },
  authTitle: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.neutral.black,
    marginVertical: Theme.spacing.md,
  },
  authText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    textAlign: "center",
    marginBottom: Theme.spacing.xl,
  },
  authButton: {
    backgroundColor: Theme.colors.primary.main,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.xl,
    borderRadius: Theme.borderRadius.md,
  },
  authButtonText: {
    color: Theme.colors.neutral.white,
    fontSize: Theme.typography.sizes.md,
    fontWeight: Theme.typography.weights.semibold,
  },
});