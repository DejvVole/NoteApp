<template lang="">
    <!-- submit.prevent zabranuje reload + sa spusti funkcia addNote -->
    <form @submit.prevent="addNote" v-if="showInput" class = "addNoteInput">
        <!-- v-model uklada do premennej to co mame vo form -->
        <textarea name="" id="" cols="30" rows="10" v-model="newNoteContent"></textarea>
        
        <NoteColors @color-set = "setColor($event)"/>
        
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
    import NoteColors from './NoteColors.vue'

    import { ref, reactive, toRefs } from 'vue';

    import { addDoc, collection } from "firebase/firestore";
    import { db } from '@/firebase'

    const notesCollectionRef = collection(db, 'notes');
    let color = 0;

    export default {  
        components: {
            NoteColors
        },

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
                color = 0;
            }

            const hideInputFunciton = () => {
                newNoteContent.value = ''
                state.showInput = !state.showInput
            }

            const setColor = colorId => {
                // console.log(colorId)
                color = colorId
                getColor()
            }

            const getColor = () => {
                const items = document.getElementById('choosen-color');
                items.className = "";
                items.classList.add('c'+color); 

            }

            return {
                ...toRefs(state),
                addNote,
                newNoteContent,
                hideInputFunciton,
                showInputFunciton,
                setColor,
                getColor
            }
        }
    }
</script>

<style lang="">
    
</style>