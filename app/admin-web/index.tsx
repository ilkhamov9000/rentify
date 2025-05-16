import React from "react";
import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import { Stack } from "expo-router";
import { 
  Home, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ShieldCheck,
  Activity
} from 'lucide-react-native';
import Theme from "@/constants/theme";
import { properties } from "@/mocks/properties";
import { getCurrentUser, users } from "@/mocks/users";

export default function AdminDashboard() {
  // Calculate statistics
  const totalProperties = properties.length;
  const pendingProperties = properties.filter(p => p.moderationStatus === "pending").length;
  const approvedProperties = properties.filter(p => p.moderationStatus === "approved").length;
  const rejectedProperties = properties.filter(p => p.moderationStatus === "rejected").length;
  const verifiedProperties = properties.filter(p => p.verified).length;
  
  const totalUsers = users.length;
  const adminUsers = users.filter(u => u.role === "admin").length;
  const agentUsers = users.filter(u => u.role === "agent").length;
  const regularUsers = users.filter(u => u.role === "user").length;
  
  // Recent activity (mock data)
  const recentActivity = [
    {
      id: "1",
      action: "Property Approved",
      description: "Modern Apartment with City View was approved",
      timestamp: "2 hours ago",
      user: "John Smith",
    },
    {
      id: "2",
      action: "User Registered",
      description: "New user David Lee registered",
      timestamp: "5 hours ago",
      user: "System",
    },
    {
      id: "3",
      action: "Property Rejected",
      description: "Cozy Studio Apartment was rejected",
      timestamp: "1 day ago",
      user: "Emily Johnson",
    },
    {
      id: "4",
      action: "Property Verified",
      description: "Spacious Family House was verified",
      timestamp: "2 days ago",
      user: "John Smith",
    },
  ];
  
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Admin Dashboard" }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome back, {getCurrentUser()?.name}</Text>
        <Text style={styles.headerSubtitle}>Here's what's happening with your properties today.</Text>
      </View>
      
      <Text style={styles.sectionTitle}>Properties Overview</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={[styles.iconContainer, { backgroundColor: Theme.colors.primary.light }]}>
            <Home size={24} color={Theme.colors.primary.main} />
          </View>
          <Text style={styles.statValue}>{totalProperties}</Text>
          <Text style={styles.statLabel}>Total Properties</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={[styles.iconContainer, { backgroundColor: Theme.colors.status.warningLight }]}>
            <Clock size={24} color={Theme.colors.status.warning} />
          </View>
          <Text style={styles.statValue}>{pendingProperties}</Text>
          <Text style={styles.statLabel}>Pending Review</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={[styles.iconContainer, { backgroundColor: Theme.colors.status.successLight }]}>
            <CheckCircle size={24} color={Theme.colors.status.success} />
          </View>
          <Text style={styles.statValue}>{approvedProperties}</Text>
          <Text style={styles.statLabel}>Approved</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={[styles.iconContainer, { backgroundColor: Theme.colors.status.errorLight }]}>
            <XCircle size={24} color={Theme.colors.status.error} />
          </View>
          <Text style={styles.statValue}>{rejectedProperties}</Text>
          <Text style={styles.statLabel}>Rejected</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={[styles.iconContainer, { backgroundColor: Theme.colors.secondary.light }]}>
            <ShieldCheck size={24} color={Theme.colors.secondary.main} />
          </View>
          <Text style={styles.statValue}>{verifiedProperties}</Text>
          <Text style={styles.statLabel}>Verified</Text>
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>Users Overview</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={[styles.iconContainer, { backgroundColor: Theme.colors.primary.light }]}>
            <Users size={24} color={Theme.colors.primary.main} />
          </View>
          <Text style={styles.statValue}>{totalUsers}</Text>
          <Text style={styles.statLabel}>Total Users</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={[styles.iconContainer, { backgroundColor: Theme.colors.secondary.light }]}>
            <ShieldCheck size={24} color={Theme.colors.secondary.main} />
          </View>
          <Text style={styles.statValue}>{adminUsers}</Text>
          <Text style={styles.statLabel}>Admins</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={[styles.iconContainer, { backgroundColor: Theme.colors.status.successLight }]}>
            <Home size={24} color={Theme.colors.status.success} />
          </View>
          <Text style={styles.statValue}>{agentUsers}</Text>
          <Text style={styles.statLabel}>Agents</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={[styles.iconContainer, { backgroundColor: Theme.colors.status.infoLight }]}>
            <Users size={24} color={Theme.colors.status.info} />
          </View>
          <Text style={styles.statValue}>{regularUsers}</Text>
          <Text style={styles.statLabel}>Regular Users</Text>
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityContainer}>
        {recentActivity.map((activity) => (
          <View key={activity.id} style={styles.activityItem}>
            <View style={styles.activityIconContainer}>
              <Activity size={20} color={Theme.colors.primary.main} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>{activity.action}</Text>
              <Text style={styles.activityDescription}>{activity.description}</Text>
              <View style={styles.activityMeta}>
                <Text style={styles.activityTime}>{activity.timestamp}</Text>
                <Text style={styles.activityUser}>by {activity.user}</Text>
              </View>
            </View>
          </View>
        ))}
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
  sectionTitle: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: "600",
    color: Theme.colors.neutral.black,
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  statsContainer: {
    flexDirection: Platform.OS === "web" ? "row" : "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: Theme.spacing.md,
  },
  statCard: {
    backgroundColor: Theme.colors.neutral.white,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    width: Platform.OS === "web" ? "20%" : "auto",
    alignItems: "center",
    ...Platform.select({
      web: {
        minWidth: 180,
        marginRight: "1%",
      },
    }),
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
  },
  statValue: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: "700",
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.xs,
  },
  statLabel: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
    textAlign: "center",
  },
  activityContainer: {
    backgroundColor: Theme.colors.neutral.white,
    borderRadius: Theme.borderRadius.md,
    marginHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
    overflow: "hidden",
  },
  activityItem: {
    flexDirection: "row",
    padding: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral.lightGray,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.primary.light,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Theme.spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: "600",
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.xs,
  },
  activityDescription: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
    marginBottom: Theme.spacing.xs,
  },
  activityMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activityTime: {
    fontSize: Theme.typography.sizes.xs,
    color: Theme.colors.neutral.gray,
  },
  activityUser: {
    fontSize: Theme.typography.sizes.xs,
    color: Theme.colors.primary.main,
  },
});