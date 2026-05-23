<template>
  <div class="bg-effects" aria-hidden="true">
    <div class="bg-effects__grid"></div>
    <div class="bg-effects__orb bg-effects__orb--1"></div>
    <div class="bg-effects__orb bg-effects__orb--2"></div>
    <div class="bg-effects__orb bg-effects__orb--3"></div>
  </div>
</template>

<style scoped>
.bg-effects {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.bg-effects__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(125, 83, 222, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(125, 83, 222, 0.04) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent);
}

.bg-effects__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.45;
  animation: float-orb 18s ease-in-out infinite;
}

.bg-effects__orb--1 {
  width: 28rem;
  height: 28rem;
  top: -8%;
  left: -5%;
  background: rgba(125, 83, 222, 0.35);
}

.bg-effects__orb--2 {
  width: 22rem;
  height: 22rem;
  top: 35%;
  right: -8%;
  background: rgba(145, 104, 240, 0.25);
  animation-delay: -6s;
  animation-duration: 22s;
}

.bg-effects__orb--3 {
  width: 18rem;
  height: 18rem;
  bottom: 5%;
  left: 30%;
  background: rgba(183, 148, 246, 0.18);
  animation-delay: -12s;
  animation-duration: 20s;
}

@keyframes float-orb {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(40px, -30px) scale(1.08);
  }
  66% {
    transform: translate(-30px, 25px) scale(0.95);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bg-effects__orb {
    animation: none;
  }
}
</style>
