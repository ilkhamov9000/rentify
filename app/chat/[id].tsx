import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { Send, ArrowLeft, Phone, Info } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import Theme from "@/constants/theme";
import useAuthStore from "@/store/auth";

// Имитация данных чата
interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

interface ChatData {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  property: {
    id: string;
    title: string;
  };
  messages: Message[];
}

// Мок-данные для чата
const chatData: Record<string, ChatData> = {
  "1": {
    id: "1",
    user: {
      id: "101",
      name: "John Smith",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    },
    property: {
      id: "1",
      title: "Modern Apartment with City View",
    },
    messages: [
      {
        id: "1",
        text: "Здравствуйте! Я заинтересован в вашей квартире. Она все еще доступна?",
        senderId: "101",
        timestamp: "2023-09-15T10:30:00Z",
        status: "read",
      },
      {
        id: "2",
        text: "Да, квартира все еще доступна. Когда вы хотели бы посмотреть ее?",
        senderId: "current_user",
        timestamp: "2023-09-15T10:35:00Z",
        status: "read",
      },
      {
        id: "3",
        text: "Отлично! Я бы хотел посмотреть ее завтра, если это возможно.",
        senderId: "101",
        timestamp: "2023-09-15T10:40:00Z",
        status: "read",
      },
      {
        id: "4",
        text: "Конечно, завтра подходит. Как насчет 14:00?",
        senderId: "current_user",
        timestamp: "2023-09-15T10:45:00Z",
        status: "read",
      },
      {
        id: "5",
        text: "14:00 отлично подходит. Спасибо!",
        senderId: "101",
        timestamp: "2023-09-15T10:50:00Z",
        status: "read",
      },
    ],
  },
  "2": {
    id: "2",
    user: {
      id: "102",
      name: "Emily Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    },
    property: {
      id: "2",
      title: "Spacious Family House with Garden",
    },
    messages: [
      {
        id: "1",
        text: "Здравствуйте! Могу ли я узнать больше о доме? Сколько там спален?",
        senderId: "102",
        timestamp: "2023-09-14T15:30:00Z",
        status: "read",
      },
      {
        id: "2",
        text: "Здравствуйте! В доме 4 спальни, 3 ванные комнаты и большой сад.",
        senderId: "current_user",
        timestamp: "2023-09-14T15:35:00Z",
        status: "read",
      },
      {
        id: "3",
        text: "Звучит отлично! А какая площадь дома и участка?",
        senderId: "102",
        timestamp: "2023-09-14T15:40:00Z",
        status: "read",
      },
      {
        id: "4",
        text: "Дом 220 кв.м, а участок 10 соток.",
        senderId: "current_user",
        timestamp: "2023-09-14T15:45:00Z",
        status: "read",
      },
      {
        id: "5",
        text: "Могу ли я запланировать просмотр на завтра?",
        senderId: "102",
        timestamp: "2023-09-14T15:50:00Z",
        status: "delivered",
      },
    ],
  },
};

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Имитация загрузки данных чата
    const loadChat = async () => {
      setIsLoading(true);
      try {
        // Имитация задержки сети
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (id && chatData[id]) {
          setChat(chatData[id]);
        }
      } catch (error) {
        console.error("Error loading chat:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadChat();
  }, [id]);

  const handleSendMessage = () => {
    if (!message.trim() || !chat) return;
    
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      senderId: "current_user",
      timestamp: new Date().toISOString(),
      status: "sent",
    };
    
    setChat({
      ...chat,
      messages: [...chat.messages, newMessage],
    });
    
    setMessage("");
    
    // Прокрутка к новому сообщению
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
    
    // Имитация ответа от собеседника
    setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        text: "Спасибо за сообщение! Я отвечу вам в ближайшее время.",
        senderId: chat.user.id,
        timestamp: new Date().toISOString(),
        status: "sent",
      };
      
      setChat(prevChat => {
        if (!prevChat) return null;
        return {
          ...prevChat,
          messages: [...prevChat.messages, autoReply],
        };
      });
      
      // Прокрутка к новому сообщению
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 2000);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Сегодня";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Вчера";
    } else {
      return date.toLocaleDateString();
    }
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const isCurrentUser = item.senderId === "current_user";
    const showDate = index === 0 || 
      new Date(item.timestamp).toDateString() !== 
      new Date(chat!.messages[index - 1].timestamp).toDateString();
    
    return (
      <>
        {showDate && (
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{formatDate(item.timestamp)}</Text>
          </View>
        )}
        <View style={[
          styles.messageContainer,
          isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
        ]}>
          <Text style={[
            styles.messageText,
            isCurrentUser ? styles.currentUserMessageText : styles.otherUserMessageText,
          ]}>
            {item.text}
          </Text>
          <Text style={[
            styles.messageTime,
            isCurrentUser ? styles.currentUserMessageTime : styles.otherUserMessageTime,
          ]}>
            {formatTime(item.timestamp)}
          </Text>
        </View>
      </>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary.main} />
        <Text style={styles.loadingText}>Загрузка сообщений...</Text>
      </View>
    );
  }

  if (!chat) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Чат не найден</Text>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Назад</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.header}>
        <Pressable
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Theme.colors.neutral.black} />
        </Pressable>
        
        <Pressable style={styles.userInfo} onPress={() => console.log("View user profile")}>
          <Image
            source={{ uri: chat.user.avatar }}
            style={styles.avatar}
          />
          <View style={styles.userTextInfo}>
            <Text style={styles.userName}>{chat.user.name}</Text>
            <Text style={styles.propertyTitle} numberOfLines={1}>
              Re: {chat.property.title}
            </Text>
          </View>
        </Pressable>
        
        <View style={styles.headerActions}>
          <Pressable
            style={styles.headerButton}
            onPress={() => console.log("Call user")}
          >
            <Phone size={24} color={Theme.colors.primary.main} />
          </Pressable>
          <Pressable
            style={styles.headerButton}
            onPress={() => console.log("View chat info")}
          >
            <Info size={24} color={Theme.colors.neutral.black} />
          </Pressable>
        </View>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={chat.messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Введите сообщение..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <Pressable
          style={[
            styles.sendButton,
            !message.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSendMessage}
          disabled={!message.trim()}
        >
          <Send size={20} color={!message.trim() ? Theme.colors.neutral.mediumGray : Theme.colors.neutral.white} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral.lightGray,
  },
  headerButton: {
    padding: Theme.spacing.xs,
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: Theme.spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Theme.spacing.sm,
  },
  userTextInfo: {
    flex: 1,
  },
  userName: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: Theme.typography.weights.semibold,
    color: Theme.colors.neutral.black,
  },
  propertyTitle: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.primary.main,
  },
  headerActions: {
    flexDirection: "row",
  },
  messagesContainer: {
    padding: Theme.spacing.md,
    paddingBottom: Theme.spacing.xl,
  },
  dateContainer: {
    alignItems: "center",
    marginVertical: Theme.spacing.md,
  },
  dateText: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
    backgroundColor: Theme.colors.neutral.lightGray,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
  },
  messageContainer: {
    maxWidth: "80%",
    marginBottom: Theme.spacing.sm,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
  },
  currentUserMessage: {
    alignSelf: "flex-end",
    backgroundColor: Theme.colors.primary.main,
    borderBottomRightRadius: 0,
  },
  otherUserMessage: {
    alignSelf: "flex-start",
    backgroundColor: Theme.colors.neutral.white,
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: Theme.typography.sizes.md,
    marginBottom: Theme.spacing.xs,
  },
  currentUserMessageText: {
    color: Theme.colors.neutral.white,
  },
  otherUserMessageText: {
    color: Theme.colors.neutral.black,
  },
  messageTime: {
    fontSize: Theme.typography.sizes.xs,
    alignSelf: "flex-end",
  },
  currentUserMessageTime: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  otherUserMessageTime: {
    color: Theme.colors.neutral.darkGray,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.neutral.lightGray,
  },
  input: {
    flex: 1,
    backgroundColor: Theme.colors.neutral.background,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    maxHeight: 100,
    fontSize: Theme.typography.sizes.md,
  },
  sendButton: {
    backgroundColor: Theme.colors.primary.main,
    borderRadius: Theme.borderRadius.full,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Theme.spacing.sm,
  },
  sendButtonDisabled: {
    backgroundColor: Theme.colors.neutral.lightGray,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: Theme.spacing.md,
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Theme.spacing.xl,
  },
  errorText: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.lg,
  },
  backButton: {
    backgroundColor: Theme.colors.primary.main,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.xl,
    borderRadius: Theme.borderRadius.md,
  },
  backButtonText: {
    color: Theme.colors.neutral.white,
    fontSize: Theme.typography.sizes.md,
    fontWeight: Theme.typography.weights.semibold,
  },
});