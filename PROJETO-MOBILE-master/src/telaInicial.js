import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { List, IconButton } from 'react-native-paper';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from the backend API
    axios.get('http://localhost:3000/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/books/${id}`)
      .then(() => {
        setBooks(books.filter(book => book.id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <View>
      <FlatList
        data={books}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            description={item.author}
            left={props => <List.Icon {...props} icon="book" />}
            right={props => (
              <View style={{ flexDirection: 'row' }}>
                <IconButton
                  icon="pencil"
                  onPress={() => navigation.navigate('EditBook', { id: item.id })}
                />
                <IconButton
                  icon="delete"
                  onPress={() => handleDelete(item.id)}
                />
              </View>
            )}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
      <Button title="Add Book" onPress={() => navigation.navigate('AddBook')} />
    </View>
  );
};

export default HomeScreen;
