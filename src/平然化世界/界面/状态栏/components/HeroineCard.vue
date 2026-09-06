<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const props = defineProps<{ idx: number; name: string; open: boolean }>();
const emit = defineEmits<{ toggle: [] }>();
const store = useDataStore();

const stageColors: Record<string, string> = {
  初识: '#9aa0ab',
  熟识: '#e0b25f',
  亲密: '#f28ba8',
  恋人: '#e0567e',
};

const d = computed(() => [store.data.凉花, store.data.凛音, store.data.千夏][props.idx]);
const stageColor = computed(() => stageColors[d.value.关系阶段] ?? '#9aa0ab');
const parts = ['嘴唇', '耳朵', '脖颈', '后背', '双手', '胸部', '双腿', '小穴', '后庭', '双脚'] as const;
</script>

<template>
  <div class="card" :class="{ open }" @click="emit('toggle')">
    <div class="head">
      <b class="name">{{ name }}</b>
      <span class="stage" :style="{ color: stageColor, borderColor: stageColor }">{{ d.关系阶段 }}</span>
      <span class="meter">
        <i class="fa-solid fa-heart" :style="{ color: stageColor }"></i>
        <span class="bar"><span class="fill" :style="{ width: d.好感度 + '%', background: stageColor }"></span></span>
        <em>{{ d.好感度 }}</em>
      </span>
      <span class="meter">
        <i class="fa-solid fa-fire" style="color: var(--c-desire)"></i>
        <span class="bar"><span class="fill" :style="{ width: d.欲情 + '%', background: 'var(--c-desire)' }"></span></span>
        <em>{{ d.欲情 }}</em>
      </span>
      <i class="fa-solid chevron" :class="open ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
    </div>
    <div v-if="open" class="detail" @click.stop>
      <p><i class="fa-solid fa-shirt"></i> {{ d.当前穿着 }}</p>
      <p><i class="fa-solid fa-gem"></i> {{ d.配饰 }}</p>
      <p class="mind"><i class="fa-solid fa-comment-dots"></i> {{ d.内心活动 }}</p>
      <dl class="body">
        <div v-for="p in parts" :key="p">
          <dt>{{ p }}</dt>
          <dd>{{ d.身体状态[p] }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 10px;
  overflow: hidden;
}
.card.open {
  border-color: var(--c-primary);
}
.head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  cursor: pointer;
  user-select: none;
}
.head:hover {
  background: var(--c-accent);
}
.name {
  font-size: 13.5px;
  letter-spacing: 0.5px;
}
.stage {
  font-size: 11px;
  border: 1px solid;
  border-radius: 8px;
  padding: 0 8px;
  line-height: 1.7;
}
.meter {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
}
.meter em {
  font-style: normal;
  color: var(--c-muted);
  min-width: 20px;
  text-align: right;
}
.bar {
  width: 52px;
  height: 6px;
  border-radius: 3px;
  background: var(--c-accent);
  overflow: hidden;
}
.fill {
  display: block;
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}
.chevron {
  margin-left: auto;
  color: var(--c-muted);
  font-size: 12px;
}
.detail {
  padding: 4px 14px 12px;
  border-top: 1px dashed var(--c-border);
}
.detail p {
  margin-top: 8px;
  font-size: 12.5px;
}
.detail p i {
  color: var(--c-primary);
  margin-right: 5px;
  width: 14px;
  text-align: center;
}
.mind {
  color: var(--c-text);
  background: var(--c-accent);
  border-radius: 8px;
  padding: 5px 8px;
}
.body {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3px;
}
.body > div {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.body dt {
  flex-shrink: 0;
  width: 34px;
  text-align: justify;
  text-align-last: justify;
  font-size: 11.5px;
  color: var(--c-primary);
  border-right: 1px solid var(--c-border);
  padding-right: 8px;
}
.body dd {
  font-size: 12.5px;
}
</style>
