import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const AddBookScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleAddBook = () => {
    if (title && author) {
      fetch('http://localhost:3000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author }),
      })
        .then(() => navigation.goBack()) // Volta para a tela anterior
        .catch((error) => Alert.alert('Erro', 'Erro ao adicionar o livro.'));
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 15,
          borderRadius: 5,
          borderColor: '#ddd',
        }}
      />
      <TextInput
        placeholder="Autor"
        value={author}
        onChangeText={setAuthor}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 15,
          borderRadius: 5,
          borderColor: '#ddd',
        }}
      />
      <Button title="Salvar" onPress={handleAddBook} />
    </View>
  );
};

export default AddBookScreen;
