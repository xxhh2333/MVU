<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDataStore } from './store';
import TitleBar from './components/TitleBar.vue';
import SecularPage from './components/SecularPage.vue';
import BoudoirPage from './components/BoudoirPage.vue';
import RevealOverlay from './components/RevealOverlay.vue';

const store = useDataStore();
const expanded = ref(false);
const tab = ref<'明面' | '深闺'>('明面');
const 亮牌 = ref<string | null>(null);

watch(
  () => store.data.主角.底牌等级,
  (now, old) => {
    if (old === undefined) return;
    亮牌.value = now;
    setTimeout(() => {
      亮牌.value = null;
    }, 1800);
  },
);
</script>

<template>
  <div class="status-root">
    <TitleBar :expanded="expanded" @toggle="expanded = !expanded" />
    <transition name="unfold">
      <div v-if="expanded" class="panel">
        <div class="tabs">
          <button :class="{ active: tab === '明面' }" @click="tab = '明面'">
            <i class="fa-solid fa-landmark"></i> 明面
          </button>
          <button :class="{ active: tab === '深闺' }" @click="tab = '深闺'">
            <i class="fa-solid fa-heart"></i> 深闺
          </button>
        </div>
        <SecularPage v-if="tab === '明面'" />
        <BoudoirPage v-else />
      </div>
    </transition>
    <RevealOverlay :rank="亮牌" />
  </div>
</template>

<style scoped>
.panel {
  border-top: 1px solid var(--c-border);
  padding: 10px 12px 12px;
}
.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}
.tabs button {
  flex: 1;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 6px;
  color: var(--c-muted);
  padding: 6px 0;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.tabs button.active {
  color: var(--c-primary);
  border-color: var(--c-primary);
  background: rgba(184, 147, 90, 0.08);
}
.tabs button i {
  margin-right: 4px;
}
</style>
