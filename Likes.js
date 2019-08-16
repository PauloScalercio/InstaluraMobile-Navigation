import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';


class Likes extends Component {

    carregaIcone = (likeada) => {
        return likeada ? require('./s2-checked.png') :
            require('./s2.png');

    }

    exibeLikes = (likers) => {


        return likers.length > 0 &&
            <Text style={styles.likes}>
                {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>

    }

    render() {
        const { foto, likeCallback } = this.props;
        
        return (
            <View>
                <TouchableOpacity onPress={() => likeCallback(foto.id)}>
                    <Image style={styles.botaoDeLike}
                        source={this.carregaIcone(foto.likeada)} />

                </TouchableOpacity>
                {this.exibeLikes(foto.likers)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    botaoDeLike: {
        height: 40,
        width: 40
    },
    likes: {
        fontWeight: 'bold'
    }
});
export default Likes;