<script setup>
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {EventBus} from '@/game/EventBus';
import StartGame from '@/game/main';
import {usePlayerStore} from '@/stores/player';

// Save the current scene instance
// const scene = ref();
const cleanupListeners = ref(['sceneInitialized', 'resumePlayer', 'monsterKilled', 'playerLevelUp']);

const playerStore = usePlayerStore();
const player = computed(() => {
  return playerStore.getPlayerStats();
});
const game = ref();
const golds = computed(() => {
  return playerStore.getPlayerStats().golds;
});

// const emit = defineEmits(['current-active-scene']);

const levelUp = (amount) => {
  // Emit the level up event to the parent component
  if (golds.value < amount) return;

  console.log('Level up');
  playerStore.spendGold(amount);
  playerStore.levelUp();
  EventBus.emit('playerLevelUp', player.value);
  game.value.sound.play('buy');
}

onMounted(() => {
  playerStore.loadPlayer();
  game.value = StartGame('game-container');

  EventBus.on('sceneInitialized', () => {
    console.log('Scene initialized');

    EventBus.emit('resumePlayer', player.value);
  });

  EventBus.on('monsterKilled', (goldsReceived) => {
    // Emit the gold received event to the parent component
    console.log(`Gold received: ${goldsReceived}`);
    playerStore.receiveGold(goldsReceived);
    console.log(playerStore.getPlayerStats());
  });


});


onUnmounted(() => {

  if (game.value) {
    console.log(game.value.scene.scenes[1].status);

    game.value.scene.scenes[1].status = 'ended';
    game.value.destroy();
    game.value = null;
    cleanupListeners.value.forEach(event => {
      EventBus.off(event);
    });
  }

});

defineExpose({game});
</script>
<template>
  <div id="game-container" class="relative">
    <RouterLink to="/">
      <button
        class="absolute top-5 left-5 rounded cursor-pointer text-3xl lg:text-[10vw] xl:text-[5vw]">
        🏠
      </button>
    </RouterLink>
    <div class=" absolute top-5 right-10 flex justify-center items-center">
      <img class="w-[15vw] h-[15vw] lg:w-[10vw] lg:h-[10vw] xl:w-[5vw] xl:h-[5vw]"
           src="@/assets/UI/RavenUiPack/64/Coin.png" alt="">
      <span class="text-4xl lg:text-[5vw] xl:text-[2vw] text-gray-300">{{ golds }}</span>
    </div>
    <button @click="levelUp(50)"
            class="absolute flex flex-col justify-around min-w-[70%] lg:min-w-[30%] xl:min-w-[20%] items-center bottom-5 left-[50%] translate-x-[-50%] lg:left-5 lg:translate-x-0 bg-amber-300 rounded-lg p-2 shadow-md shadow-amber-200 active:scale-95 transition-transform duration-100 ease">
      <div class="flex justify-around items-center"><img
        class="w-[30px] h-[30px] lg:w-[50px] lg:h-[50px]"
        src="@/assets/UI/RavenUiPack/64/Coin.png"
        alt=""><span
        class="text-base lg:text-[2vw] xl:text-[1.2vw]"
        :class="golds < 50 ? 'text-red-600' : 'text-gray-800'">50 </span></div>
      <div class="flex justify-center items-center gap-2">
        <img class="w-[30px] h-[30px] lg:w-[50px] lg:h-[50px]"
             src="@/assets/UI/RavenUiPack/64/SwordWood.png" alt=""><span
        class="text-base lg:text-[2vw] xl:text-[1.2vw] text-gray-800">level Up </span>
      </div>
    </button>
  </div>
</template>
