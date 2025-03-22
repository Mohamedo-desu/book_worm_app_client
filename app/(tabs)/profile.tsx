import styles from "@/assets/styles/profile.styles";
import Loader from "@/components/Loader";
import LogoutButton from "@/components/LogoutButton";
import ProfileHeader from "@/components/ProfileHeader";
import { API_URL } from "@/constants/api";
import COLORS from "@/constants/colors";
import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const profile = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);

  const router = useRouter();

  const { token } = useAuthStore();

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/api/books/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data ? (data as any).message : "Failed to fetch user books"
        );
      }
      setBooks(data.books);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to load profile data.Pull down to refresh");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteBook = async (bookId: String) => {
    try {
      setDeleteBookId(bookId);

      const response = await fetch(`${API_URL}/api/books/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data ? (data as any).message : "Failed to delete book");
      }
      Alert.alert("Success", data.message);
    } catch (error: any) {
      console.error("Error deleting book:", error);
      Alert.alert("Error", "Failed to delete book");
    } finally {
      setDeleteBookId(null);
    }
  };

  const confirmDelete = (bookId: string) => {
    Alert.alert(
      "Delete Book",
      "Are you sure you want to delete this book?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDeleteBook(bookId),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.bookItem}>
        <Image source={item.image} style={styles.bookImage} />
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <View style={styles.ratingContainer}>
            {renderRatingStars(item.rating)}
          </View>
          <Text style={styles.bookCaption}>{item.caption}</Text>
          <Text style={styles.bookDate}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => confirmDelete(item._id)}
          activeOpacity={0.8}
        >
          {deleteBookId === item._id ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
          )}
        </TouchableOpacity>
      </View>
    );
  };
  const renderRatingStars = (rating: number): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color={i <= rating ? "#F4B400" : COLORS.textSecondary}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };
  if (isLoading && !refreshing) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />
      {/* YOUR RECOMMENDATION */}
      <View style={styles.booksHeader}>
        <Text style={styles.booksTitle}>Your Recommendations</Text>
        <Text style={styles.booksCount}>{books.length} books</Text>
      </View>

      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.booksList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="book-outline"
              size={50}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>No recommendations yet</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}
            >
              <Text style={styles.addButtonText}>Add Your First Book</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default profile;
