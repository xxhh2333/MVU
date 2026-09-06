<script setup lang="ts">
defineProps<{ rank: string | null }>();
</script>

<template>
  <transition name="reveal">
    <div v-if="rank" class="overlay">
      <div class="frame">
        <i class="fa-solid fa-crown"></i>
        <div class="rank-text">{{ rank }}</div>
        <div class="hint">底 牌 已 亮</div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 11, 14, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
}
.frame {
  text-align: center;
  border: 1.5px solid var(--c-primary);
  border-radius: 12px;
  padding: 26px 46px;
  background: var(--c-bg);
  box-shadow: 0 0 30px rgba(184, 147, 90, 0.35);
}
.frame i {
  font-size: 26px;
  color: var(--c-primary);
  margin-bottom: 10px;
}
.rank-text {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 4px;
  color: var(--c-primary);
}
.hint {
  margin-top: 8px;
  font-size: 11px;
  letter-spacing: 6px;
  color: var(--c-muted);
}
</style>
