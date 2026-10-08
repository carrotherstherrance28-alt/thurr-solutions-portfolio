(() => {
  'use strict';
  const sculpture = document.querySelector('.sculpture');
  const scene = document.querySelector('.art-scene');
  const button = document.getElementById('motion-toggle');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 760px)');
  let pausedByUser = false;
  let visible = true;
  let hovering = false;
  function sync() {
    const paused = pausedByUser || reduced.matches || mobile.matches || !visible || hovering || document.hidden;
    sculpture.classList.toggle('is-paused', paused);
    button.hidden = reduced.matches || mobile.matches;
    button.setAttribute('aria-pressed', String(pausedByUser));
    button.replaceChildren(document.createTextNode(pausedByUser ? 'Play motion ' : 'Pause motion '));
    const icon = document.createElement('span');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = pausedByUser ? '▷' : 'Ⅱ';
    button.append(icon);
  }
  button.addEventListener('click', () => { pausedByUser = !pausedByUser; sync(); });
  scene.addEventListener('mouseenter', () => { hovering = true; sync(); });
  scene.addEventListener('mouseleave', () => { hovering = false; sync(); });
  reduced.addEventListener('change', sync);
  mobile.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, {threshold: 0.1}).observe(scene);
  }
  document.documentElement.classList.add('has-js');
  sync();
})();
