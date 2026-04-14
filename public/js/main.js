// ================================================
// スクロール出現アニメーション（Intersection Observer）
// ================================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // 一度表示したら監視解除
    }
  });
}, {
  threshold: 0.15,
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
