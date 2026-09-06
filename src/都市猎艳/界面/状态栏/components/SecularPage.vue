<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

const 四家 = [
  { name: '沈家', icon: 'fa-landmark', 产业: '金融帝国', 家风: '持重' },
  { name: '顾家', icon: 'fa-helmet-safety', 产业: '百年营造', 家风: '严谨' },
  { name: '萧家', icon: 'fa-mortar-pestle', 产业: '医道世家', 家风: '仁心有度' },
  { name: '唐家', icon: 'fa-khanda', 产业: '护卫世家', 家风: '忠信立世' },
];

const 威望评价 = computed(() => {
  const v = store.data.主角.威望值;
  if (v < 20) return '无名之辈';
  if (v < 45) return '小有名声';
  if (v < 70) return '圈内闻名';
  return '云海风云人物';
});
</script>

<template>
  <div class="page">
    <div class="row">
      <div class="stat-card">
        <div class="label"><i class="fa-solid fa-coins"></i> 资产</div>
        <div class="num">{{ store.data.主角.资产 }} <small>万</small></div>
      </div>
      <div class="stat-card wide">
        <div class="label"><i class="fa-solid fa-ranking-star"></i> 威望 · {{ 威望评价 }}</div>
        <div class="bar">
          <div class="fill" :style="{ width: store.data.主角.威望值 + '%' }"></div>
        </div>
      </div>
    </div>

    <div class="section-label"><i class="fa-solid fa-chess-rook"></i> 四家格局</div>
    <div class="families">
      <div v-for="f in 四家" :key="f.name" class="family">
        <i class="fa-solid" :class="f.icon"></i>
        <div class="info">
          <b>{{ f.name }}</b>
          <span>{{ f.产业 }}</span>
          <em>{{ f.家风 }}</em>
        </div>
      </div>
    </div>

    <div class="section-label"><i class="fa-solid fa-scroll"></i> 近期事件</div>
    <ul class="log">
      <li v-for="(e, i) in store.data.世界.近期事件" :key="i">{{ e }}</li>
      <li v-if="!store.data.世界.近期事件.length" class="empty">风平浪静</li>
    </ul>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}
.stat-card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 6px;
  padding: 8px 10px;
}
.stat-card.wide {
  flex: 1;
}
.label {
  color: var(--c-muted);
  font-size: 11px;
  margin-bottom: 4px;
}
.label i {
  margin-right: 3px;
  color: var(--c-primary);
}
.num {
  font-size: 18px;
  font-weight: 600;
  color: var(--c-primary);
}
.num small {
  font-size: 11px;
  color: var(--c-muted);
}
.bar {
  height: 8px;
  background: var(--c-bg);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 6px;
}
.fill {
  height: 100%;
  background: linear-gradient(90deg, var(--c-bronze), var(--c-primary));
  border-radius: 4px;
  transition: width 0.5s ease;
}
.section-label {
  color: var(--c-muted);
  font-size: 11px;
  margin: 10px 0 6px;
}
.section-label i {
  margin-right: 3px;
  color: var(--c-primary);
}
.families {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.family {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 6px;
  padding: 7px 9px;
}
.family > i {
  color: var(--c-primary);
  font-size: 15px;
  width: 18px;
  text-align: center;
}
.info b {
  display: block;
  font-size: 13px;
}
.info span {
  display: block;
  font-size: 11px;
  color: var(--c-muted);
}
.info em {
  display: block;
  font-style: normal;
  font-size: 10px;
  color: var(--c-bronze);
}
.log {
  list-style: none;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 6px;
  padding: 6px 10px;
}
.log li {
  font-size: 12px;
  color: var(--c-text);
  padding: 2px 0;
  border-bottom: 1px dashed var(--c-border);
}
.log li:last-child {
  border-bottom: none;
}
.log li.empty {
  color: var(--c-muted);
}
</style>
