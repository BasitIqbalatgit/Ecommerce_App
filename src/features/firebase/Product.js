import { collection, doc, getDoc, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig"


export const getProducts = async() => {
    try {
        const productsRef = collection(db,"products");
        const productsSnapshot = await getDocs(productsRef)
        const products = productsSnapshot.docs.map(doc=>({id:doc.id,...doc.data()}))
        return products;
    } catch (error) {
        console.error(error)
    }
}

export const getProductById = async (productId)=>{
    try {
        console.log("prod",productId)
        const productRef = doc(db,"products",productId)
        const productSnapshot = await getDoc(productRef)
        const product = {id: productSnapshot.id,...productSnapshot.data()}
        return product;
    } catch (error) {
        console.error(error)
    }
}


export const AddProduct=async(data)=>{
    try{
        const productsRef = collection(db,"products");
        const docRef = await addDoc(productsRef, data);
        console.log('Document written with ID: ', docRef.id);
    }catch(e){
        console.error(e);
    }
}