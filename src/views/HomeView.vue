<script setup>
const context = new AudioContext();

</script>

<template>
  <main class="w-screen h-screen bg-neutral-800 flex flex-col justify-center items-center">
    <h1 class="text-gray-300 w-fit text-6xl mb-10">Clicker HERO</h1>
    <RouterLink @click="context.resume()" to="/game">
      <button class="rounded bg-amber-600 p-5 text-4xl cursor-pointer">Play</button>
    </RouterLink>
  </main>
</template>
