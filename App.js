

import React, { Component } from 'react';
import { Dimensions, FlatList } from 'react-native';
import Post from './Post';

const width = Dimensions.get('screen').width;

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      fotos: []
    }
  }
  componentDidMount(){
    fetch('http://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(res => res.json())
      .then(json => this.setState({fotos: json}))
  }

  like = idFoto => {
    const foto = this.state.fotos.find(foto => foto.id === idFoto);
    
    let novaLista = [];

    if (!foto.likeada) {
        novaLista = [
            ...foto.likers,
            { login: 'Paulo' }
        ];
    } else {
        novaLista = foto.likers.filter(liker => {
            return liker.login !== 'Paulo'
        });
    }
    const fotoAtualizada = {
        ...foto,
        likeada: !foto.likeada,
        likers: novaLista
    }
    const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)
    this.setState({fotos})
}

adicionaComentario = (idFoto, valorComentario, inputComentario) => {
  if (valorComentario === '') {
      return;
  }

  const foto = this.state.fotos.find(foto => foto.id === idFoto);

  const novaLista = [...foto.comentarios, {
      id: valorComentario,
      login: 'Paulo',
      texto: valorComentario
  }];

  const fotoAtualizada = {
      ...foto,
      comentarios: novaLista
  };

  const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

  this.setState({ fotos })
  inputComentario.clear();
}
 
render() {

    return (
      <FlatList 
        keyExtractor = { item => String(item.id)}
        data = {this.state.fotos}
        renderItem = { ({item}) =>   
          <Post foto={item} likeCallback={this.like} comentarioCallback={this.adicionaComentario}/>
        } 
      />
    );
  }
}

export default App;
