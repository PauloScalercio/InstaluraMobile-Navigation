import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
const width = Dimensions.get('screen').width;
import InputComentario from './InputComentario';
import Likes from './Likes';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            foto: this.props.foto,
            valorComentario: ''
        }
    }

    exibeLegenda = foto => {
        if (foto.comentario === '') {
            return;
        }
        return (
            <View style={styles.comentario}>
                <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
                <Text>{foto.comentario}</Text>
            </View>
        )
    }

    render() {
        const { foto, likeCallback, comentarioCallback } = this.props;
        
        return (
            <View>
                <View style={styles.cabecalho}>
                    <Image source={{ uri: foto.urlPerfil }} style={styles.fotoDoPerfil} />
                    <Text>{foto.loginUsuario}</Text>
                </View>

                <Image source={{ uri: foto.urlFoto }} style={styles.foto} />
                <View style={styles.rodape}>
                    <Likes foto={foto} likeCallback={likeCallback}/>
                    {this.exibeLegenda(foto)}

                    {foto.comentarios.map(comentario =>

                        <View style={styles.comentario} key={comentario.id}>
                            <Text style={styles.tituloComentario}>{comentario.login}</Text>
                            <Text>{comentario.texto}</Text>
                        </View>
                    )}
                  <InputComentario comentarioCallback={comentarioCallback} idFoto={foto.id}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cabecalho: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    fotoDoPerfil: {
        marginRight: 10,
        borderRadius: 20,
        width: 40,
        height: 40,
    },
    foto: {
        width: width,
        height: width
    },
    rodape: {
        margin: 10,
    },
    comentario: {
        flexDirection: 'row'
    },
    tituloComentario: {
        fontWeight: 'bold',
        marginRight: 5,
    }
});

export default Post;