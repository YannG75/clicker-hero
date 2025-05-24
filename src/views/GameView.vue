<script setup>
import GameCanvas from '@/components/GameCanvas.vue'
import { ref } from 'vue'
const GameRef = ref()
</script>
<template>
    <GameCanvas :ref="GameRef" />
</template>