<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { EventBus } from '@/game/EventBus';
import StartGame from '@/game/main';

// Save the current scene instance
// const scene = ref();
const game = ref();

const emit = defineEmits(['current-active-scene']);

onMounted(() => {

    game.value = StartGame('game-container');
    EventBus.on('monsterKilled', (golds) => {
        // Emit the gold received event to the parent component
        console.log(`Gold received: ${golds}`);

    });

});

onUnmounted(() => {

    // if (game.value) {
    //     game.value.destroy(true);
    //     game.value = null;
    // }

});

defineExpose({ game });
</script>
<template>
    <div id="game-container" class="relative">
        <RouterLink to="/">
            <button class="absolute top-5 left-5 rounded cursor-pointer text-6xl">🏠</button>
        </RouterLink>
    </div>
</template>