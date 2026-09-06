<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDataStore } from './store';
import HeaderBar from './components/HeaderBar.vue';
import HeroineCard from './components/HeroineCard.vue';
import MiniCard from './components/MiniCard.vue';

const store = useDataStore();
const heroines = [
  { idx: 0, name: '水濑凉花' },
  { idx: 1, name: '柊木凛音' },
  { idx: 2, name: '一之濑千夏' },
];
const supports = ['大西桂', '藤宫麻衣', '樋口柚', '真行寺沙织'] as const;
const openHeroine = ref<string | null>(null);
const openMini = ref<string | null>(null);
const npcList = computed(() =>
  Object.entries(store.data.随机NPC ?? {}).map(([name, v]) => ({ name, ...v })),
);
</script>

<template>
  <div class="status-root">
    <HeaderBar />
    <div class="heroines">
      <HeroineCard
        v-for="h in heroines"
        :key="h.name"
        :idx="h.idx"
        :name="h.name"
        :open="openHeroine === h.name"
        @toggle="openHeroine = openHeroine === h.name ? null : h.name"
      />
    </div>
    <div class="section-label"><i class="fa-solid fa-user-group"></i> 配角</div>
    <div class="minis">
      <MiniCard
        v-for="n in supports"
        :key="n"
        :name="n"
        :data="store.data.配角状态[n]"
        :open="openMini === n"
        @toggle="openMini = openMini === n ? null : n"
      />
    </div>
    <div class="section-label"><i class="fa-solid fa-wand-magic-sparkles"></i> 遇见</div>
    <div v-if="npcList.length" class="minis">
      <MiniCard
        v-for="n in npcList"
        :key="n.name"
        :name="n.name"
        :data="n"
        :open="openMini === n.name"
        @toggle="openMini = openMini === n.name ? null : n.name"
      />
    </div>
    <div v-else class="npc-empty">还没有遇见特别的人</div>
  </div>
</template>

<style scoped>
.heroines {
  display: grid;
  gap: 7px;
  padding: 10px 12px 4px;
}
.section-label {
  padding: 12px 14px 4px;
  font-size: 11.5px;
  color: var(--c-muted);
  letter-spacing: 2px;
}
.section-label i {
  margin-right: 5px;
  color: var(--c-primary);
}
.minis {
  display: grid;
  gap: 5px;
  padding: 2px 12px 6px;
}
.npc-empty {
  padding: 2px 14px 10px;
  font-size: 11.5px;
  color: var(--c-muted);
}
</style>
