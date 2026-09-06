<script setup lang="ts">
import { ref } from 'vue';
import CharCard from './CharCard.vue';

const 九美 = [
  { name: '沈冰岚', 阵营: '沈家', 辈分: '大小姐' },
  { name: '沈玉瑶', 阵营: '沈家', 辈分: '二小姐' },
  { name: '顾晚晴', 阵营: '顾家', 辈分: '长女' },
  { name: '萧听雨', 阵营: '萧家', 辈分: '千金' },
  { name: '唐傲雪', 阵营: '唐家', 辈分: '大师姐' },
  { name: '苏晚吟', 阵营: '沈家', 辈分: '主母' },
  { name: '叶清桐', 阵营: '顾家', 辈分: '主母' },
  { name: '阮青蘅', 阵营: '萧家', 辈分: '主母' },
  { name: '秦望舒', 阵营: '唐家', 辈分: '主母' },
];

const 当前展开 = ref('');
</script>

<template>
  <div class="grid">
    <CharCard
      v-for="m in 九美"
      :key="m.name"
      :who="m"
      :open="当前展开 === m.name"
      @toggle="当前展开 = 当前展开 === m.name ? '' : m.name"
    />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}
@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
