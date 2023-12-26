import { View, Text, StyleSheet, ScrollView,KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AddProduct } from '../features/firebase/Product'

const AddProducts = ({ navigation }) => {
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [data, setData] = useState([]);
    

    
    const handleSave = async () => {
        const newProduct = { brand, description, image, title, price };
        const newData = [...data, newProduct];
    
        setData(newData); 
        setBrand("");
        setDescription("");
        setImage("");
        setTitle("");
        setPrice("");
    
        await AddProduct(newProduct);
    }
    

    return (
        <SafeAreaView style={styles.container}>
         {/* <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}> */}
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    
            <View>
                <Text style={styles.title}>Add  Products</Text>
            </View>

            <View>
                <TextInput
                    mode='contained'
                    label='Brand'
                    multiline={false}
                    maxLines={1}
                    style={styles.input}
                    value={brand}
                    onChangeText={setBrand}
                    placeholder='Brand'
                />

                <TextInput
                    mode='contained'
                    label='Title'
                    multiline={false}
                    maxLines={1}
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                />

                <TextInput
                    mode='contained'
                    label='Image'
                    multiline={false}
                    maxLines={1}
                    style={styles.input}
                    value={image}
                    onChangeText={setImage}
                />

                <TextInput
                    mode='contained'
                    label='Description'
                    multiline={true}
                    maxLines={20}
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                />

                <TextInput
                    mode='contained'
                    label='Price'
                    multiline={false}
                    maxLines={1}
                    style={styles.input}
                    value={price}
                    onChangeText={setPrice}

                />


            </View>
                <Button 
                    mode='contained'
                    onPress={handleSave}
                    style={styles.button}
                    labelStyle={styles.buttonText}
                >
                    ADD Product
                </Button>
                    </ScrollView>
                {/* </KeyboardAvoidingView> */}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        padding: 8,
        marginVertical: 6,
        borderBottomColor: '#2196F3'
    },
    button: {
        marginTop: 20,
        backgroundColor: '#8e44ad',
        width:"50%",
        alignSelf:"center"
    },
    scrollContainer: {
        flexGrow: 1,
    },
    buttonText: {
        fontSize: 18,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#8e44ad', 
    },
});

export default AddProducts