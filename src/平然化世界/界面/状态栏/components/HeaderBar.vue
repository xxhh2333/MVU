<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
</script>

<template>
  <div class="world-bar">
    <span><i class="fa-solid fa-calendar-day"></i> {{ store.data.世界.日期 }}</span>
    <span class="dot">·</span>
    <span>{{ store.data.世界.时间段 }}</span>
    <span class="dot">·</span>
    <span><i class="fa-solid fa-location-dot"></i> {{ store.data.世界.当前位置 }}</span>
    <span class="dot">·</span>
    <span><i class="fa-solid fa-star"></i> {{ store.data.世界.季节活动 }}</span>
  </div>
</template>

<style scoped>
.world-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  padding: 9px 14px;
  background: var(--c-primary);
  color: #fff;
  font-size: 12px;
}
.world-bar i {
  margin-right: 3px;
  opacity: 0.9;
}
.dot {
  opacity: 0.6;
}
</style>
