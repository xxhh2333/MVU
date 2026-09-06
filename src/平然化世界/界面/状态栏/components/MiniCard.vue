<script setup lang="ts">
defineProps<{
  name: string;
  data: {
    外貌: string;
    好感度: number;
    当前穿着: string;
    配饰: string;
    内心活动: string;
    身体状态: string;
  };
  open: boolean;
}>();
const emit = defineEmits<{ toggle: [] }>();
</script>

<template>
  <div class="mini" :class="{ open }" @click="emit('toggle')">
    <div class="head">
      <b class="name">{{ name }}</b>
      <span class="meter">
        <i class="fa-solid fa-heart"></i>
        <em>{{ data.好感度 }}</em>
      </span>
      <i class="fa-solid chevron" :class="open ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
    </div>
    <div v-if="open" class="detail" @click.stop>
      <p><i class="fa-solid fa-user"></i> {{ data.外貌 }}</p>
      <p><i class="fa-solid fa-shirt"></i> {{ data.当前穿着 }}</p>
      <p><i class="fa-solid fa-gem"></i> {{ data.配饰 }}</p>
      <p class="mind"><i class="fa-solid fa-comment-dots"></i> {{ data.内心活动 }}</p>
      <p class="body-text">{{ data.身体状态 }}</p>
    </div>
  </div>
</template>

<style scoped>
.mini {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 9px;
  overflow: hidden;
}
.mini.open {
  border-color: var(--c-primary);
}
.head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 11px;
  cursor: pointer;
  user-select: none;
}
.head:hover {
  background: var(--c-accent);
}
.name {
  font-size: 12.5px;
}
.meter {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--c-primary);
}
.meter em {
  font-style: normal;
  color: var(--c-muted);
}
.chevron {
  margin-left: auto;
  color: var(--c-muted);
  font-size: 11px;
}
.detail {
  padding: 3px 12px 10px;
  border-top: 1px dashed var(--c-border);
}
.detail p {
  margin-top: 6px;
  font-size: 12px;
}
.detail p i {
  color: var(--c-primary);
  margin-right: 5px;
  width: 14px;
  text-align: center;
}
.mind {
  background: var(--c-accent);
  border-radius: 7px;
  padding: 4px 8px;
}
.body-text {
  color: var(--c-text);
}
</style>
