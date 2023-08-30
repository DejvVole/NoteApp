<template lang="">
    <p>Choose note color: </p>
    <div class="colors-buttons">      
        <button type="button" class = "gold" @click="setColor(1)"></button>
        <button type="button" class = "blue" @click="setColor(2)"></button>
        <button type="button" class = "lightgreen" @click="setColor(3)"></button>
        <button type="button" class = "pink" @click="setColor(4)"></button>
        <button type="button" class = "body" @click="setColor(5)"></button>
        <button type="button" class = "orange" @click="setColor(6)"></button>
    </div>

    <p>Your color:</p>
    <div id="choosen-color" class=""></div>
</template>

<script>
    export default {
        setup(props,{emit}) {
            const setColor = e =>{
                // emit "odpali" udalost v rodicovskom componente s nazvom color-set a parametrom e
                emit('color-set', e)

                const items = document.getElementById('choosen-color');
                items.className = "";
                items.classList.add('c'+ e); 
            }
            
            return{ 
                setColor
            }       
        }
    }
</script>

<style lang="css" scoped>
    @import '../assets/colors.css';

    .colors-buttons{
        margin-top: 1%;

        display: flex;
        justify-content: center;  
    }

    .colors-buttons button{
        margin-left: 10px;

        cursor: pointer;

        border: none;
        border-radius: 24px;

        height: 30px;
        width: 30px;

    }

    #choosen-color{
        height: 30px;
        width: 30px;
        border-radius: 24px;

        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 1%; 
    }

    p{
        text-align: center;
        color: white;

        margin-top: 2%;
        letter-spacing: 2px;
    }
</style>