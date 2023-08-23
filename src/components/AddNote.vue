<template lang="">
    <!-- submit.prevent zabranuje reload + sa spusti funkcia addNote -->
    <form @submit.prevent="addNote" v-if="showInput" class = "addNoteInput">
        <!-- v-model uklada do premennej to co mame vo form -->
        <textarea name="" id="" cols="30" rows="10" v-model="newNoteContent"></textarea>
        
        <p>Choose note color: </p>
        <div class="colors-buttons">      
            <button type="button" class = "gold" @click="setColor(1); getColor()"></button>
            <button type="button" class = "blue" @click="setColor(2); getColor()"></button>
            <button type="button" class = "lightgreen" @click="setColor(3); getColor()"></button>
            <button type="button" class = "pink" @click="setColor(4); getColor()"></button>
            <button type="button" class = "body" @click="setColor(5); getColor()"></button>
            <button type="button" class = "orange" @click="setColor(6); getColor()"></button>
        </div>
        
        <p>Your color:</p>
        <div id="choosen-color" class=""></div>

        <button type="submit" class = "save-button">Save</button>      

        <button type="button" @click="hideInputFunciton" class = "close-button">X</button>
    </form>

    <button v-if="!showInput"
      class = "add-note"
      @click="showInputFunciton"      
      type="button">
      +
    </button>    
</template>

<script>
    import { ref, reactive, toRefs } from 'vue';

    import { addDoc, collection } from "firebase/firestore";
    import { db } from '@/firebase'

    const notesCollectionRef = collection(db, 'notes');

    export default {        
        setup() {
            // tu sa uklada text z form
            const newNoteContent = ref('')

            const state = reactive({
                showInput: false
            })

            const addNote = () => {
                // Add a new document with a generated id.
                addDoc(notesCollectionRef, {
                content: newNoteContent.value,
                date: Date(),
                color: color,
                });

                hideInputFunciton()
            }

            const showInputFunciton = () => {
                state.showInput = !state.showInput
                // color = 0;
            }

            const hideInputFunciton = () => {
                newNoteContent.value = ''
                state.showInput = !state.showInput
            }

            return {
                ...toRefs(state),
                addNote,
                newNoteContent,
                hideInputFunciton,
                showInputFunciton
            }
        }
    }
</script>

<style lang="">
    
</style>