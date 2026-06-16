/* ============================================================================
   CricHeroes icons — inline SVG registry.

   Rounded, 24×24 viewBox, 1.75px stroke, rounded caps & joins. No emoji in
   product UI.

   Usage:
     <span data-icon="bat"></span>
     <span data-icon="live" data-icon-size="16" data-icon-color="#E21C28"></span>
     <script src="assets/icons.js"></script>
     <script>CH.icons.hydrate(document)</script>

   Cricket glyphs (ball, bat, stumps, trophy…) reuse the real Figma stroke
   paths from the App Kit. Generic glyphs match the same style.
   ========================================================================== */
(function (global) {
  // name -> inner SVG markup. `null` stroke icons render via the wrapper's
  // stroke; filled glyphs (play) carry their own fill/stroke attributes.
  var ICONS = {
    // --- cricket -----------------------------------------------------------
    ball:    '<circle cx="12" cy="12" r="9"/><path d="M4 9c5 1 11 1 16 0M4 15c5-1 11-1 16 0"/>',
    bat:     '<path d="m4 20 5-5"/><path d="M9 15 15 9l5 5-6 6-5-5Z"/><path d="m15 9 3-3 1 1-3 3"/>',
    trophy:  '<path d="M8 4h8v6a4 4 0 0 1-8 0V4Z"/><path d="M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4M9 18h6M10 14v4M14 14v4M8 22h8"/>',
    team:    '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 19c0-3 3-5.5 7-5.5s7 2.5 7 5.5"/><path d="M22 19c0-2.5-2.5-4.5-5-4.5"/>',
    player:  '<circle cx="12" cy="7" r="3.5"/><path d="M6 21v-5l2-3h8l2 3v5"/>',
    stats:   '<path d="M3 21h18M6 21V11M12 21V4M18 21v-7"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    location:'<path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z"/><circle cx="12" cy="9" r="2.5"/>',
    live:    '<g fill="currentColor" stroke="none"><circle cx="12" cy="12" r="3"/><path d="M5 12a7 7 0 0 1 2-5l-1.4-1.4A9 9 0 0 0 3 12c0 2.5 1 4.7 2.6 6.4L7 17a7 7 0 0 1-2-5Zm14 0c0 1.9-.8 3.7-2 5l1.4 1.4A9 9 0 0 0 21 12c0-2.5-1-4.7-2.6-6.4L17 7a7 7 0 0 1 2 5Z"/></g>',
    fire:    '<path d="M12 3s4 3 4 8a4 4 0 0 1-8 0c0-1 .5-2 1-3 .5 2 2 2 2 0s-1-3 1-5Z"/>',
    target:  '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none"/>',

    // --- generic -----------------------------------------------------------
    play:    '<path d="M8 5v14l11-7z" fill="currentColor" stroke="currentColor"/>',
    share:   '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8 11 8-4M8 13l8 4"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    down:    '<path d="m6 9 6 6 6-6"/>',
    arrow:   '<path d="M5 12h14M13 6l6 6-6 6"/>',
    close:   '<path d="M6 6l12 12M18 6 6 18"/>',
    check:   '<path d="M5 13l4 4L19 7"/>',
    search:  '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    bell:    '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>',
    plus:    '<path d="M12 5v14M5 12h14"/>',
    menu:    '<path d="M4 7h16M4 12h16M4 17h16"/>',
    home:    '<path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-9Z"/>',
    star:    '<path d="M12 3l2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9z"/>',
    filter:  '<path d="M3 5h18l-7 8v6l-4-2v-4L3 5Z"/>',
    user:    '<circle cx="12" cy="8" r="3.5"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>',
    lock:    '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'
  };

  function svg(name, opts) {
    var inner = ICONS[name];
    if (!inner) return '';
    opts = opts || {};
    var size = opts.size || 20;
    var color = opts.color || 'currentColor';
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size +
      '" viewBox="0 0 24 24" fill="none" stroke="' + color +
      '" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
  }

  // Replace every <span data-icon="..."> in `root` with its inline SVG.
  function hydrate(root) {
    root = root || document;
    var nodes = root.querySelectorAll('[data-icon]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var name = el.getAttribute('data-icon');
      if (!ICONS[name]) continue;
      el.innerHTML = svg(name, {
        size: el.getAttribute('data-icon-size'),
        color: el.getAttribute('data-icon-color')
      });
      el.setAttribute('data-icon-hydrated', '');
    }
    return nodes.length;
  }

  global.CH = global.CH || {};
  global.CH.icons = { registry: ICONS, names: Object.keys(ICONS), svg: svg, hydrate: hydrate };
})(typeof window !== 'undefined' ? window : this);
