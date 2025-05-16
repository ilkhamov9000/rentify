import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Alert, Platform } from "react-native";
import { Stack } from "expo-router";
import { 
  Search, 
  Filter, 
  User, 
  Shield, 
  Home, 
  Users,
  Mail,
  Calendar,
  ChevronDown
} from 'lucide-react-native';
import { Image } from "expo-image";
import Theme from "@/constants/theme";
import { users } from "@/mocks/users";
import { UserRole } from "@/types/user";

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<UserRole | "all">("all");
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  
  // Filter users based on search query and filter role
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.id && user.id.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (filterRole === "all") {
      return matchesSearch;
    } else {
      return matchesSearch && user.role === filterRole;
    }
  });
  
  // Filter options
  const filterOptions = [
    { label: "All Users", value: "all", icon: <Users size={18} color={Theme.colors.primary.main} /> },
    { label: "Admins", value: "admin", icon: <Shield size={18} color={Theme.colors.secondary.main} /> },
    { label: "Agents", value: "agent", icon: <Home size={18} color={Theme.colors.status.success} /> },
    { label: "Regular Users", value: "user", icon: <User size={18} color={Theme.colors.status.info} /> },
  ];
  
  // Handle role change
  const handleRoleChange = (userId: string, newRole: UserRole) => {
    // In a real app, this would update the user's role in the database
    Alert.alert(
      "Role Updated",
      `User role has been updated to ${newRole}.`,
      [{ text: "OK" }]
    );
  };
  
  // Toggle user expanded state
  const toggleUserExpanded = (userId: string) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };
  
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Manage Users" }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>User Management</Text>
        <Text style={styles.headerSubtitle}>Manage user accounts and permissions</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Theme.colors.neutral.darkGray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.filterContainer}>
          <View style={styles.filterHeader}>
            <Filter size={20} color={Theme.colors.neutral.darkGray} />
            <Text style={styles.filterTitle}>Filter by role</Text>
          </View>
          
          <View style={styles.filterOptions}>
            {filterOptions.map((option) => (
              <Pressable
                key={option.value}
                style={[
                  styles.filterOption,
                  filterRole === option.value && styles.filterOptionActive,
                ]}
                onPress={() => setFilterRole(option.value as UserRole | "all")}
              >
                {option.icon}
                <Text
                  style={[
                    styles.filterOptionText,
                    filterRole === option.value && styles.filterOptionTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      
      <View style={styles.statsRow}>
        <Text style={styles.statsText}>
          Showing {filteredUsers.length} of {users.length} users
        </Text>
      </View>
      
      <View style={styles.usersContainer}>
        {filteredUsers.map((user) => (
          <View key={user.id} style={styles.userCard}>
            <Pressable
              style={styles.userHeader}
              onPress={() => toggleUserExpanded(user.id)}
            >
              <Image
                source={{ uri: user.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" }}
                style={styles.userAvatar}
              />
              
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <View style={styles.userMeta}>
                  <View style={styles.userRole}>
                    {user.role === "admin" && <Shield size={14} color={Theme.colors.secondary.main} />}
                    {user.role === "agent" && <Home size={14} color={Theme.colors.status.success} />}
                    {user.role === "user" && <User size={14} color={Theme.colors.status.info} />}
                    <Text
                      style={[
                        styles.userRoleText,
                        user.role === "admin" && styles.adminRoleText,
                        user.role === "agent" && styles.agentRoleText,
                        user.role === "user" && styles.userRoleText,
                      ]}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Text>
                  </View>
                  <Text style={styles.userId}>ID: {user.id}</Text>
                </View>
              </View>
              
              <ChevronDown
                size={20}
                color={Theme.colors.neutral.darkGray}
                style={[
                  styles.expandIcon,
                  expandedUserId === user.id && styles.expandIconRotated,
                ]}
              />
            </Pressable>
            
            {expandedUserId === user.id && (
              <View style={styles.userDetails}>
                <View style={styles.userDetailItem}>
                  <Mail size={16} color={Theme.colors.neutral.darkGray} />
                  <Text style={styles.userDetailLabel}>Email:</Text>
                  <Text style={styles.userDetailValue}>{user.email}</Text>
                </View>
                
                <View style={styles.userDetailItem}>
                  <Calendar size={16} color={Theme.colors.neutral.darkGray} />
                  <Text style={styles.userDetailLabel}>Joined:</Text>
                  <Text style={styles.userDetailValue}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                
                <View style={styles.userActions}>
                  <Text style={styles.userActionTitle}>Change Role:</Text>
                  <View style={styles.roleButtons}>
                    <Pressable
                      style={[
                        styles.roleButton,
                        user.role === "admin" && styles.activeRoleButton,
                      ]}
                      onPress={() => handleRoleChange(user.id, "admin")}
                    >
                      <Shield size={16} color={user.role === "admin" ? Theme.colors.neutral.white : Theme.colors.secondary.main} />
                      <Text
                        style={[
                          styles.roleButtonText,
                          user.role === "admin" && styles.activeRoleButtonText,
                        ]}
                      >
                        Admin
                      </Text>
                    </Pressable>
                    
                    <Pressable
                      style={[
                        styles.roleButton,
                        user.role === "agent" && styles.activeAgentButton,
                      ]}
                      onPress={() => handleRoleChange(user.id, "agent")}
                    >
                      <Home size={16} color={user.role === "agent" ? Theme.colors.neutral.white : Theme.colors.status.success} />
                      <Text
                        style={[
                          styles.roleButtonText,
                          user.role === "agent" && styles.activeRoleButtonText,
                        ]}
                      >
                        Agent
                      </Text>
                    </Pressable>
                    
                    <Pressable
                      style={[
                        styles.roleButton,
                        user.role === "user" && styles.activeUserButton,
                      ]}
                      onPress={() => handleRoleChange(user.id, "user")}
                    >
                      <User size={16} color={user.role === "user" ? Theme.colors.neutral.white : Theme.colors.status.info} />
                      <Text
                        style={[
                          styles.roleButtonText,
                          user.role === "user" && styles.activeRoleButtonText,
                        ]}
                      >
                        User
                      </Text>
                    </Pressable>
                  </View>
                  
                  <Pressable
                    style={styles.blockButton}
                    onPress={() => {
                      Alert.alert(
                        "Block User",
                        `Are you sure you want to block ${user.name}?`,
                        [
                          { text: "Cancel", style: "cancel" },
                          { 
                            text: "Block", 
                            style: "destructive",
                            onPress: () => {
                              Alert.alert("User Blocked", `${user.name} has been blocked.`);
                            }
                          },
                        ]
                      );
                    }}
                  >
                    <Text style={styles.blockButtonText}>Block User</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        ))}
        
        {filteredUsers.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No users found matching your criteria</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral.background,
  },
  header: {
    backgroundColor: Theme.colors.neutral.white,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  headerTitle: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: "700",
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
  },
  searchContainer: {
    backgroundColor: Theme.colors.neutral.white,
    padding: Theme.spacing.lg,
    marginHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.neutral.background,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: Theme.spacing.sm,
    color: Theme.colors.neutral.black,
  },
  filterContainer: {
    marginTop: Theme.spacing.sm,
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Theme.spacing.sm,
  },
  filterTitle: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: "600",
    color: Theme.colors.neutral.black,
    marginLeft: Theme.spacing.sm,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.neutral.background,
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    marginRight: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
  },
  filterOptionActive: {
    backgroundColor: Theme.colors.primary.light,
  },
  filterOptionText: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
    marginLeft: Theme.spacing.xs,
  },
  filterOptionTextActive: {
    color: Theme.colors.primary.main,
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  statsText: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
  },
  usersContainer: {
    marginHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
  },
  userCard: {
    backgroundColor: Theme.colors.neutral.white,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
    overflow: "hidden",
  },
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: Theme.spacing.md,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Theme.spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: "600",
    color: Theme.colors.neutral.black,
    marginBottom: 4,
  },
  userMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  userRole: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.neutral.background,
    paddingVertical: 2,
    paddingHorizontal: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
    marginRight: Theme.spacing.sm,
  },
  userRoleText: {
    fontSize: Theme.typography.sizes.xs,
    color: Theme.colors.status.info,
    marginLeft: 4,
  },
  adminRoleText: {
    color: Theme.colors.secondary.main,
  },
  agentRoleText: {
    color: Theme.colors.status.success,
  },
  userId: {
    fontSize: Theme.typography.sizes.xs,
    color: Theme.colors.neutral.darkGray,
  },
  expandIcon: {
    transform: [{ rotate: "0deg" }],
  },
  expandIconRotated: {
    transform: [{ rotate: "180deg" }],
  },
  userDetails: {
    padding: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.neutral.lightGray,
  },
  userDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Theme.spacing.sm,
  },
  userDetailLabel: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
    marginLeft: Theme.spacing.sm,
    marginRight: Theme.spacing.sm,
    width: 50,
  },
  userDetailValue: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.black,
    flex: 1,
  },
  userActions: {
    marginTop: Theme.spacing.md,
  },
  userActionTitle: {
    fontSize: Theme.typography.sizes.sm,
    fontWeight: "600",
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.sm,
  },
  roleButtons: {
    flexDirection: "row",
    marginBottom: Theme.spacing.md,
  },
  roleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.neutral.background,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginRight: Theme.spacing.sm,
    minWidth: 90,
  },
  activeRoleButton: {
    backgroundColor: Theme.colors.secondary.main,
  },
  activeAgentButton: {
    backgroundColor: Theme.colors.status.success,
  },
  activeUserButton: {
    backgroundColor: Theme.colors.status.info,
  },
  roleButtonText: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
    marginLeft: Theme.spacing.xs,
  },
  activeRoleButtonText: {
    color: Theme.colors.neutral.white,
    fontWeight: "600",
  },
  blockButton: {
    backgroundColor: Theme.colors.status.errorLight,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    alignItems: "center",
  },
  blockButtonText: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.status.error,
    fontWeight: "600",
  },
  emptyState: {
    padding: Theme.spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    textAlign: "center",
  },
});