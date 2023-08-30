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
</template>

<script>
    export default {
        setup(props,{emit}) {
            const setColor = e =>{
                // console.log(e);
                emit('color-set', e)
            }
            
            return{ 
                setColor
            }       
        }
    }
</script>

<style lang="">
    
</style>