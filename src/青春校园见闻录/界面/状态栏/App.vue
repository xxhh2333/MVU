<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDataStore } from './store';
import GirlCard from './components/GirlCard.vue';

const store = useDataStore();
const expanded = ref(false);

const 时段配置: Record<string, { icon: string; label: string }> = {
  早晨: { icon: 'fa-mug-hot', label: '早晨' },
  上午: { icon: 'fa-sun', label: '上午' },
  午休: { icon: 'fa-utensils', label: '午休' },
  放学: { icon: 'fa-door-open', label: '放学' },
  傍晚: { icon: 'fa-cloud-sun', label: '傍晚' },
  夜晚: { icon: 'fa-moon', label: '夜晚' },
};

const 时段信息 = computed(() => 时段配置[store.data.系统.时段] ?? 时段配置.早晨);

const 女主列表 = computed(() => [
  { 名字: '琴音', ...store.data.琴音 },
  { 名字: '遥', ...store.data.遥 },
  { 名字: '栞', ...store.data.栞 },
]);
</script>

<template>
  <div class="status-bar">
    <div class="bar" role="button" @click="expanded = !expanded">
      <span class="slot-icon">
        <i class="fa-solid" :class="时段信息.icon"></i>
      </span>
      <span class="slot-date">{{ store.data.系统.日期 }}</span>
      <span class="slot-time">{{ store.data.系统.时间 }}</span>
      <span class="slot-badge">{{ 时段信息.label }}</span>
      <span class="slot-loc">
        <i class="fa-solid fa-location-dot"></i>
        {{ store.data.系统.地点 }}
      </span>
      <span class="slot-chevron">
        <i class="fa-solid" :class="expanded ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
      </span>
    </div>

    <div v-show="expanded" class="panel">
      <GirlCard v-for="girl in 女主列表" :key="girl.名字" v-bind="girl" />
    </div>
  </div>
</template>

<style scoped>
.status-bar {
  background: var(--c-background);
  border: 1px solid var(--c-border);
  border-radius: 12px;
  overflow: hidden;
}

.bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
}

.bar:hover {
  background: color-mix(in srgb, var(--c-primary) 8%, transparent);
}

.slot-icon {
  color: var(--c-primary);
  width: 18px;
  text-align: center;
}

.slot-date {
  font-weight: 600;
}

.slot-time {
  color: var(--c-accent);
  font-variant-numeric: tabular-nums;
}

.slot-badge {
  background: var(--c-primary);
  color: #fff;
  border-radius: 999px;
  font-size: 11px;
  padding: 1px 10px;
  line-height: 1.5;
}

.slot-loc {
  color: var(--c-text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.slot-loc i {
  color: var(--c-accent);
  margin-right: 4px;
}

.slot-chevron {
  color: var(--c-text-muted);
  width: 14px;
  text-align: center;
}

.panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 8px;
  padding: 4px 12px 12px;
}
</style>
