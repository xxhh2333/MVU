<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDataStore } from '../store';
import type { Schema } from '../../schema';

type 美娇娘数据 = Schema['沈冰岚'];
type 卡片角色 = { name: string; 阵营: string; 辈分: string };

const props = defineProps<{ who: 卡片角色; open: boolean }>();
const emit = defineEmits<{ (e: 'toggle'): void }>();

const store = useDataStore();
const 档案开 = ref(false);

const 资料 = computed(
  () => (store.data as unknown as Record<string, 美娇娘数据>)[props.who.name],
);

const 阶段色: Record<string, string> = {
  初识: '#8a8f9c',
  熟悉: '#c0a06a',
  暧昧: '#b8935a',
  沦陷: '#c94f5c',
};

const 当前色 = computed(() => 阶段色[资料.value.关系阶段] ?? 阶段色['初识']);
const 已沦陷 = computed(() => 资料.value.关系阶段 === '沦陷');
</script>

<template>
  <div class="card" :class="{ fallen: 已沦陷, open }" @click="emit('toggle')">
    <div class="head">
      <div class="who">
        <b>{{ who.name }}</b>
        <span>{{ who.阵营 }} · {{ who.辈分 }}</span>
      </div>
      <div class="stage" :style="{ color: 当前色, borderColor: 当前色 }">
        {{ 资料.关系阶段 }}
      </div>
    </div>
    <div class="affection">
      <i class="fa-solid fa-heart" :style="{ color: 当前色 }"></i>
      <div class="bar">
        <div class="fill" :style="{ width: 资料.好感度 + '%', background: 当前色 }"></div>
      </div>
      <span class="val">{{ 资料.好感度 }}</span>
    </div>
    <div v-if="open" class="detail" @click.stop>
      <p class="line"><i class="fa-solid fa-shirt"></i> {{ 资料.当前穿着 }}</p>
      <p class="line"><i class="fa-solid fa-comment-dots"></i> {{ 资料.心理活动 }}</p>
      <div class="archive-toggle" @click="档案开 = !档案开">
        <i class="fa-solid" :class="档案开 ? 'fa-eye-slash' : 'fa-eye'"></i> 身体档案
      </div>
      <dl v-if="档案开" class="archive">
        <div><dt>胸</dt><dd>{{ 资料.身体特征.胸部 }}</dd></div>
        <div><dt>腰臀</dt><dd>{{ 资料.身体特征.腰臀 }}</dd></div>
        <div><dt>腿足</dt><dd>{{ 资料.身体特征.腿足 }}</dd></div>
        <div><dt>肌肤</dt><dd>{{ 资料.身体特征.肌肤 }}</dd></div>
      </dl>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 6px;
  padding: 7px 8px;
  cursor: pointer;
  transition: border-color 0.25s ease;
}
.card:hover {
  border-color: var(--c-primary);
}
.card.open {
  grid-column: 1 / -1;
}
.card.fallen {
  border-color: var(--c-accent);
  animation: heartbeat 1.6s ease-in-out infinite;
}
.head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4px;
}
.who b {
  display: block;
  font-size: 13px;
  white-space: nowrap;
}
.who span {
  display: block;
  font-size: 10px;
  color: var(--c-muted);
}
.stage {
  font-size: 10px;
  border: 1px solid;
  border-radius: 4px;
  padding: 1px 5px;
  flex-shrink: 0;
}
.affection {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 6px;
}
.affection i {
  font-size: 11px;
}
.bar {
  flex: 1;
  height: 5px;
  background: var(--c-bg);
  border-radius: 3px;
  overflow: hidden;
}
.fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
}
.val {
  font-size: 11px;
  color: var(--c-muted);
  min-width: 20px;
  text-align: right;
}
.detail {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed var(--c-border);
  font-size: 12px;
}
.line {
  margin-bottom: 5px;
  color: var(--c-text);
}
.line i {
  color: var(--c-primary);
  margin-right: 4px;
  font-size: 11px;
}
.archive-toggle {
  color: var(--c-muted);
  font-size: 11px;
  cursor: pointer;
  padding: 3px 0;
}
.archive-toggle i {
  margin-right: 3px;
}
.archive div {
  display: flex;
  gap: 6px;
  margin-bottom: 3px;
}
.archive dt {
  color: var(--c-bronze);
  flex-shrink: 0;
  width: 30px;
}
.archive dd {
  color: var(--c-muted);
  font-size: 11px;
}
</style>
