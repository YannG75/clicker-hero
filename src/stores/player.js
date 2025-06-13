import {reactive, watchEffect} from 'vue'
import {defineStore} from 'pinia'

export const usePlayerStore = defineStore('player', () => {

    const player = reactive({
        golds: 0,
        level: 1,
        dmg: 1,
        loaded: false
    })

    const receiveGold = (amount) => {
        player.golds += amount
    }

    const spendGold = (amount) => {
        player.golds -= amount
    }

    const levelUp = () => {
        player.level += 1
        player.dmg += 1 // Increase damage with each level up
    }

    const savePlayer = () => {
        console.log('player saved');
      localStorage.setItem('playerData', JSON.stringify(player))
    }

    const loadPlayer = () => {
        const playerData = localStorage.getItem('playerData')
        if (playerData) {
            const { golds: loadedGolds, level: loadedLevel, dmg: loadedDmg } = JSON.parse(playerData)
            player.golds = loadedGolds || 0
            player.level = loadedLevel || 1
            player.dmg = loadedDmg || 1
        }
        player.loaded = true // Mark player as loaded
    }

    const resetPlayer = () => {
        player.golds = 0
        player.level = 1
        player.dmg = 1
        localStorage.removeItem('playerData') // Clear saved data
    }

    const getPlayerStats = () => {
        return player
    }

    watchEffect(() => {
        // Automatically save player data whenever it changes
        if (player.loaded) {
            savePlayer()
        }
    })

    return { player, receiveGold, spendGold, levelUp, resetPlayer, getPlayerStats, savePlayer, loadPlayer }
})
