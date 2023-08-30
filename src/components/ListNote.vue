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

<style lang="">
    
</style>