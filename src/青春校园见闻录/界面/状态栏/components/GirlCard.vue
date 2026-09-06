<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Schema } from '../../schema';

type 身体 = Schema['琴音']['身体'];

const props = defineProps<{
  名字: string;
  当前穿着: string;
  所在: string;
  身体: 身体;
}>();

const 身体展开 = ref(false);

const 部位列表 = computed(() => [
  { label: '胸部', text: props.身体.胸部 },
  { label: '腰身', text: props.身体.腰身 },
  { label: '小穴', text: props.身体.小穴 },
  { label: '后庭', text: props.身体.后庭 },
]);
</script>

<template>
  <div class="card">
    <div class="card-head">
      <span class="name">{{ 名字 }}</span>
      <span class="loc">
        <i class="fa-solid fa-location-dot"></i>
        {{ 所在 }}
      </span>
    </div>

    <div class="wear">{{ 当前穿着 }}</div>

    <button class="body-toggle" @click.stop="身体展开 = !身体展开">
      <span>身体</span>
      <i class="fa-solid" :class="身体展开 ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
    </button>

    <div v-show="身体展开" class="body-panel">
      <div v-for="part in 部位列表" :key="part.label" class="part-row">
        <span class="part-label">{{ part.label }}</span>
        <span class="part-text">{{ part.text }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 10px;
  padding: 8px 10px;
}

.card-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.name {
  font-weight: 700;
  color: var(--c-primary-deep);
}

.loc {
  color: var(--c-text-muted);
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.loc i {
  color: var(--c-accent);
  margin-right: 3px;
}

.wear {
  color: var(--c-text);
  margin-top: 4px;
}

.body-toggle {
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: none;
  background: none;
  color: var(--c-text-muted);
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;
}

.body-toggle:hover {
  color: var(--c-primary-deep);
}

.body-panel {
  margin-top: 4px;
  border-top: 1px dashed var(--c-border);
  padding-top: 4px;
}

.part-row {
  display: flex;
  gap: 8px;
  padding: 1px 0;
}

.part-label {
  color: var(--c-accent);
  flex-shrink: 0;
  width: 32px;
}

.part-text {
  color: var(--c-text-muted);
}
</style>
