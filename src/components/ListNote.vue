<template lang="">
    <div class="note-container">
        <div v-for="(note, index) in notes" class = "note" :class="'c'+note.color">
            <p>{{ note.content }}</p>    
            <button 
                @click="deleteNote(note.id)" 
                type="button" 
                class = "delete-button" :class="'c'+note.color">
                X
            </button>
        </div>
    </div>
    
</template>

<script>
    import { ref, onMounted } from 'vue';

    import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
    import { db } from '@/firebase'

    export default {
        setup(){
            const notesCollectionRef = collection(db, 'notes');

            // ref robí z notes object
            const notes = ref([
                
            ])

            // onMounted - vykona sa kod ked sa komponent vykresli do DOM
            // získanie udajov z firebase
            onMounted( () => {
                onSnapshot(notesCollectionRef, (querySnapshot) => {
                    const fbNotes = [];
                    querySnapshot.forEach((doc) => {
                        const note = {
                        id: doc.id,
                        content: doc.data().content,
                        date: doc.data().date,
                        color: doc.data().color,
                        }

                        fbNotes.push(note);
                    });
                    notes.value = fbNotes;
                });
            })

            const deleteNote = id => {
                deleteDoc(doc(notesCollectionRef, id));
            }

            return{
                notes,
                deleteNote
            }
        }
    }
</script>

<style lang = "css" scoped>
    @import '../assets/colors.css';

    .add-note{
        position: absolute;
        right: 5%;
        bottom: 5%;
    }

    .note{
        display: flex;
        justify-content: space-between;

        width: 300px;
        max-width: 300px;
        height: 150px;

        overflow-x: auto;    
    }

    .note::-webkit-scrollbar {
        width: 5px;
    }

    .note::-webkit-scrollbar-track {
        border-radius: 5px;
    }

    .note::-webkit-scrollbar-thumb {
        border-radius:5px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.349); 
    }

    .note::-webkit-scrollbar-thumb:hover {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.46); 
    }

    .note p{
        letter-spacing: 1px;
        width: 80%;
        /* height: 100vw; */

        padding: 20px 20px 20px 30px;

        word-break: break-all;
    }

    .note-container{
        display: grid;
        grid-template-columns: auto auto auto;
        row-gap: 75px;
        column-gap: 70px;
        justify-content: space-evenly;

        padding: 10px;
        margin-top: 5%;

        /* max-width: 1000px; */
    }

    .delete-button{
        border: none;
        outline: none;

        cursor: pointer;

        align-self: flex-start;

        margin-top: 10px;
        margin-right: 5px;
    }
</style>