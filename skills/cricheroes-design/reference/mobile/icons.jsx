// CricHeroes — shared icon SVGs (1.5 px stroke, 24×24).
// Cricket-specific glyphs are hand-drawn to match the original Figma stroke style.
// Generic glyphs (Home, Search, Settings…) lean on Lucide-style outlines.

const ICO = {
  back:   <path d="M15 5 8 12l7 7" />,
  chev:   <path d="m9 6 6 6-6 6" />,
  plus:   <path d="M12 5v14M5 12h14" />,
  search: <g><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></g>,
  bell:   <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>,
  message:<path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/>,
  share:  <g><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8 11 8-4M8 13l8 4"/></g>,
  more:   <g><circle cx="6" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="18" cy="12" r="1.4" fill="currentColor"/></g>,
  filter: <path d="M3 5h18l-7 8v6l-4-2v-4L3 5Z"/>,
  pin:    <path d="M12 3 9 8 3 9l4.5 4.5L6 21l6-4 6 4-1.5-7.5L21 9l-6-1-3-5Z"/>,
  add_user: <g><circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.9 3.1-7 7-7 1.5 0 2.9.5 4 1.3"/><path d="M18 14v6M15 17h6"/></g>,
  trophy: <g><path d="M8 4h8v6a4 4 0 0 1-8 0V4Z"/><path d="M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4M9 18h6M10 14v4M14 14v4M8 22h8"/></g>,
  fire:   <path d="M12 3s4 3 4 8a4 4 0 0 1-8 0c0-1 .5-2 1-3 .5 2 2 2 2 0s-1-3 1-5Z"/>,
  location: <g><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z"/><circle cx="12" cy="9" r="2.5"/></g>,
  calendar: <g><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></g>,
  // cricket
  ball:    <g><circle cx="12" cy="12" r="9"/><path d="M4 9c5 1 11 1 16 0M4 15c5-1 11-1 16 0"/></g>,
  bat:     <g><path d="m4 20 5-5"/><path d="M9 15 15 9l5 5-6 6-5-5Z"/><path d="m15 9 3-3 1 1-3 3"/></g>,
  stumps:  <g><path d="M7 4v16M12 4v16M17 4v16M5 4h14M5 20h14"/><path d="m9 7-1.5 2M14 7l1 2"/></g>,
  wagon:   <g><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5.6 5.6 18.4 18.4M5.6 18.4 18.4 5.6"/></g>,
  allRound:<g><circle cx="12" cy="7" r="3.5"/><path d="M6 21v-5l2-3h8l2 3v5"/></g>,
  toss:    <g><circle cx="12" cy="12" r="6"/><path d="M12 9v3l2 1"/><path d="M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14" stroke-dasharray="2 2"/></g>,
  award:   <g><circle cx="12" cy="9" r="5.5"/><path d="M8.5 13 7 21l5-3 5 3-1.5-8"/><path d="M12 7v3l2 1"/></g>,
  groups:  <g><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 19c0-3 3-5.5 7-5.5s7 2.5 7 5.5"/><path d="M22 19c0-2.5-2.5-4.5-5-4.5"/></g>,
  live:    <g fill="currentColor"><circle cx="12" cy="12" r="3"/><path d="M5 12a7 7 0 0 1 2-5l-1.4-1.4A9 9 0 0 0 3 12c0 2.5 1 4.7 2.6 6.4L7 17a7 7 0 0 1-2-5Zm14 0c0 1.9-.8 3.7-2 5l1.4 1.4A9 9 0 0 0 21 12c0-2.5-1-4.7-2.6-6.4L17 7a7 7 0 0 1 2 5Z"/></g>,
  cricket: <g><circle cx="12" cy="12" r="9"/><path d="M3.5 9.5h17M3.5 14.5h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></g>,
  home:    <path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-9Z"/>,
  homeF:   <path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-9Z" fill="currentColor"/>,
  looking: <g><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/><path d="M11 8v3l2 1"/></g>,
  community: <g><circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.9 3.1-7 7-7s7 3.1 7 7"/><circle cx="17" cy="6" r="2.5"/><path d="M14.8 14.6c3.1.5 5.7 3.2 5.7 6.4"/></g>,
  menu:    <path d="M4 7h16M4 12h16M4 17h16"/>,
};

function Icon({ name, size = 24, color = "currentColor", fill = false, style }) {
  const node = ICO[name];
  if (!node) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
         fill="none" stroke={color} strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" style={style}>
      {node}
    </svg>
  );
}

window.CH_ICO = ICO;
window.CHIcon = Icon;
