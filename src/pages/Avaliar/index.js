import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importar o ícone de estrela do Expo

const Avaliar = () => {
  const [rating, setRating] = useState(0); // Variável de estado para armazenar a avaliação do usuário

  const handleRating = (value) => {
    setRating(value); // Atualiza o valor da avaliação do usuário
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>Avalie nosso app</Text>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        {[...Array(5)].map((_, index) => ( // Renderiza 5 ícones de estrela
          <TouchableOpacity
            key={index}
            onPress={() => handleRating(index + 1)}
            style={{ marginHorizontal: 5 }}
          >
            <FontAwesome
              name={index < rating ? 'star' : 'star-o'} // Alterna entre a estrela preenchida e a vazia
              size={32}
              color="#FFD700"
            />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={() => console.log(rating)}>
        <Text style={{ fontSize: 18, marginTop: 20 }}>Enviar avaliação</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Avaliar;