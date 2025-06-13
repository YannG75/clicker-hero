<script setup>
import {usePlayerStore} from "@/stores/player.js";

const playerStore = usePlayerStore();

const resetPlayer = () => {
  playerStore.resetPlayer();
  playerStore.loadPlayer();
};

const context = new AudioContext();

</script>

<template>
  <main class="w-screen h-screen bg-neutral-800 flex flex-col justify-center items-center">
    <h1 class="text-gray-300 w-fit text-[7vw] xl:text-[5vw] mb-10">Clicker HERO</h1>
    <RouterLink @click="context.resume()" to="/game">
      <button class="rounded bg-amber-600 p-5 text-[5vw] xl:text-[2vw] cursor-pointer">Play</button>
    </RouterLink>
  </main>
</template>
