import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
const firebaseConfig = {
    apiKey: "AIzaSyAzlXNAJzQZPHTGMb-CrynfcPJN1MuzDto",
    authDomain: "todo-2a546.firebaseapp.com",
    projectId: "todo-2a546",
    storageBucket: "todo-2a546.appspot.com",
    messagingSenderId: "994482854393",
    appId: "1:994482854393:web:45c396a0403a1799178528",
    measurementId: "G-30BNQZGEHK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
import {
    getFirestore, doc, getDocs, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js"
const db = getFirestore();
let inputvalue = document.getElementById("input-val")
let buttonEle = document.getElementById("submit")
async function addItem() {
    try {
        const docRef = await addDoc(collection(db, "input-item"), {
            text: inputvalue.value,
            status: "Active"
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);

    }
    inputvalue.value = ""
}
async function getItem() {
    let items = []
    const querySnapshot = await getDocs(collection(db, "input-item"));
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        items.push(
            {
                id: doc.id, ...doc.data()
            }
        )
    });
    generateItem(items)

}
buttonEle.addEventListener("click", addItem)
function generateItem(items) {
    let itemHtml = ""
    items.forEach((item) => {
        console.log(items)
        itemHtml += `
         <div class="todo-items">
                <div class="check">
                    <div data-id='${item.id}' class="check-mark"><img src="./assets/icon-check.svg" alt=""></div>
                </div>
                <div class="todo-text">
                    ${item.text}
                </div>
            </div>
         `

    })
    document.querySelector(".todo-items").innerHTML = itemHtml
    createEventListener1()
}
function createEventListener1() {
    const todoCheckMarks = document.querySelector(".todo-items .check-mark")
    Array.from(todoCheckMarks).forEach(checkMark => {
        checkMark.addEventListener("click", pressmark.bind())
        function pressmark() {
            markCompleted()
        }
    })
}

function markCompleted() {
    console.log(id)
}
getItem()