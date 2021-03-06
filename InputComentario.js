import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput } from 'react-native';

class InputComentario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valorComentario: ''
        }
    }
    render() {
        const { comentarioCallback, idFoto } = this.props;

        return (
            <View style={styles.novoComentario}>
                <TextInput style={styles.input}
                    placeholder="Adicione um comentário..."
                    ref={input => this.inputComentario = input}
                    onChangeText={texto => this.setState({ valorComentario: texto })}
                />
                <TouchableOpacity onPress={() => {
                    comentarioCallback(idFoto, this.state.valorComentario, this.inputComentario)
                    this.setState({valorComentario: ''})
                }}>
                    <Image style={styles.icone}
                        source={require('./send.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    novoComentario: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    input: {
        flex: 1,
        height: 40
    },
    icone: {
        height: 30,
        width: 30
    }
})
export default InputComentario;