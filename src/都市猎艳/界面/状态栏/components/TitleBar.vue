<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

defineProps<{ expanded: boolean }>();
defineEmits<{ (e: 'toggle'): void }>();

const store = useDataStore();

const 底牌视觉: Record<string, { icon: string; color: string }> = {
  深藏不露: { icon: 'fa-user-ninja', color: '#8a8f9c' },
  初露锋芒: { icon: 'fa-bolt', color: '#c0a06a' },
  锋芒毕露: { icon: 'fa-crown', color: '#b8935a' },
  惊世骇俗: { icon: 'fa-fire', color: '#c94f5c' },
};

const 视觉 = computed(() => 底牌视觉[store.data.主角.底牌等级] ?? 底牌视觉['深藏不露']);
const 威望环 = computed(
  () => `conic-gradient(var(--c-primary) ${store.data.主角.威望值 * 3.6}deg, var(--c-border) 0deg)`,
);
</script>

<template>
  <div class="title-bar" @click="$emit('toggle')">
    <div class="sigil" :style="{ borderColor: 视觉.color, boxShadow: `0 0 8px ${视觉.color}44` }">
      <i class="fa-solid" :class="视觉.icon" :style="{ color: 视觉.color }"></i>
    </div>
    <div class="main">
      <div class="rank" :style="{ color: 视觉.color }">底牌 · {{ store.data.主角.底牌等级 }}</div>
      <div class="meta">
        <i class="fa-solid fa-location-dot"></i> {{ store.data.世界.当前区域 }}
        <span class="dot">·</span> {{ store.data.世界.当前时间 }}
      </div>
    </div>
    <div class="ring" :style="{ background: 威望环 }">
      <span>{{ store.data.主角.威望值 }}</span>
    </div>
    <i class="fa-solid chevron" :class="expanded ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
  </div>
</template>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  cursor: pointer;
  user-select: none;
}
.title-bar:hover {
  background: rgba(184, 147, 90, 0.05);
}
.sigil {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border: 1.5px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}
.main {
  flex: 1;
  min-width: 0;
}
.rank {
  font-weight: 600;
  letter-spacing: 1px;
}
.meta {
  color: var(--c-muted);
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.meta i {
  margin-right: 2px;
}
.dot {
  margin: 0 4px;
}
.ring {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.ring span {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--c-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: var(--c-primary);
}
.chevron {
  color: var(--c-muted);
  font-size: 12px;
}
</style>
