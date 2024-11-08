import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, Button } from 'react-native';
import { IconButton, List } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  // Função para buscar livros da API
  useEffect(() => {
    fetch('http://localhost:3000/api/books')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  // Função para lidar com a exclusão do livro
  const handleDelete = (id) => {
    Alert.alert(
      "Excluir Livro",
      "Você tem certeza que deseja excluir este livro?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: () => deleteBook(id),
        }
      ]
    );
  };

  // Função para realizar a exclusão no backend
  const deleteBook = (id) => {
    fetch(`http://localhost:3000/api/books/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setBooks(books.filter((book) => book.id !== id)); // Atualiza a lista removendo o livro deletado
        } else {
          console.error('Erro ao excluir livro');
        }
      })
      .catch((error) => console.error('Error deleting book:', error));
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={books}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            description={item.author}
            left={(props) => <List.Icon {...props} icon="book" />}
            right={(props) => (
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
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        title="Adicionar Livro"
        onPress={() => navigation.navigate('AddBook')}
      />
    </View>
  );
};

export default HomeScreen;

