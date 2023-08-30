<template lang="">
    <!-- submit.prevent zabranuje reload + sa spusti funkcia addNote -->
    <form @submit.prevent="addNote" v-if="showInput" class = "addNoteInput">
        <!-- v-model uklada do premennej to co mame vo form -->
        <textarea name="" id="" cols="30" rows="10" v-model="newNoteContent"></textarea>
        
        <!-- Po "odpaleni udalosti color-set" sa spusti funkcia setColor a parameter sa ziska pomocou event -->
        <NoteColors @color-set = "setColor($event)"/>
        
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

            // setne sa calor na ulozenie do db
            const setColor = colorId => {
                // console.log(colorId)
                color = colorId
            }

            return {
                ...toRefs(state),
                addNote,
                newNoteContent,
                hideInputFunciton,
                showInputFunciton,
                setColor
            }
        }
    }
</script>

<style lang="css" scoped>
    .addNoteInput{
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        background-color: rgba(0, 0, 0, 0.833);
    }

    .addNoteInput textarea{
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 15%;
    }

    .addNoteInput p{
        text-align: center;
        color: white;

        margin-top: 2%;
        letter-spacing: 2px;
    }

    .add-note{
        position: absolute;
        right: 5%;
        bottom: 5%;
    }

    .close-button{
        position: absolute;
        right: 2%;
        top: 4%;

        border: none;
        background-color: rgba(0, 0, 0, 0.833);
        color: white;

        cursor: pointer;
    }

    .save-button{
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 5%;
    }
</style>