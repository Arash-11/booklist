import { useState, useEffect } from 'react';
import { db } from './Firebase';

const useFirestore = (userCollection, userDoc, bookCollection) => {
    const [ docs, setDocs ] = useState([]);

    useEffect(() => {
        const unsub = db.collection(userCollection)
            .doc(userDoc)
            .collection(bookCollection)
            .onSnapshot((snapshot) => {
                let documents = [];
                snapshot.forEach(doc => {
                    documents.push({...doc.data()})
                });
                setDocs(documents);
            });

        return () => unsub();

    }, [bookCollection])

    return { docs };
}

export default useFirestore;

db.collection("users")
.doc("user_1")
.collection("books")
.onSnapshot((snapshot) => {
    let documents = [];
    snapshot.forEach(doc => {
        documents.push({...doc.data()})
    });
    setDocs(documents);
})