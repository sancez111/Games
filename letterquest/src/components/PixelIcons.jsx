// Pixel art SVG icon library for LetterQuest
// All icons are rendered as crisp pixel-art style SVGs

const px = (rects, viewBox = 16) => ({ rects, viewBox });

// Helper: render pixel rects from a compact format
function PixelSVG({ data, size = 32, className = '', style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${data.viewBox} ${data.viewBox}`}
      className={className}
      style={{ imageRendering: 'pixelated', ...style }}
      shapeRendering="crispEdges"
    >
      {data.rects.map((r, i) => (
        <rect key={i} x={r[0]} y={r[1]} width={r[2] || 1} height={r[3] || 1} fill={r[4] || 'currentColor'} />
      ))}
    </svg>
  );
}

// ─── WORLD ICONS ───

const treeData = px([
  // trunk
  [7, 12, 2, 4, '#8B5E3C'],
  // foliage layers
  [5, 4, 6, 2, '#2D8B2D'],
  [4, 6, 8, 2, '#3DA33D'],
  [3, 8, 10, 2, '#2D8B2D'],
  [6, 2, 4, 2, '#3DA33D'],
  // highlight
  [5, 5, 2, 1, '#5DC75D'],
  [4, 7, 2, 1, '#5DC75D'],
]);

const waveData = px([
  // water body
  [0, 8, 16, 8, '#1E88E5'],
  // wave crests
  [0, 6, 4, 2, '#42A5F5'],
  [5, 7, 3, 1, '#42A5F5'],
  [9, 6, 4, 2, '#42A5F5'],
  [14, 7, 2, 1, '#42A5F5'],
  // foam
  [1, 6, 2, 1, '#E3F2FD'],
  [10, 6, 2, 1, '#E3F2FD'],
  // deep
  [2, 12, 3, 2, '#1565C0'],
  [9, 11, 4, 2, '#1565C0'],
]);

const rocketData = px([
  // body
  [6, 3, 4, 9, '#E0E0E0'],
  [7, 2, 2, 1, '#F5F5F5'],
  // nose cone
  [7, 1, 2, 1, '#EF5350'],
  [8, 0, 1, 1, '#EF5350'],
  // window
  [7, 5, 2, 2, '#42A5F5'],
  [7, 5, 1, 1, '#90CAF9'],
  // fins
  [4, 10, 2, 3, '#EF5350'],
  [10, 10, 2, 3, '#EF5350'],
  // flame
  [7, 12, 2, 1, '#FF9800'],
  [6, 13, 4, 1, '#FF9800'],
  [7, 14, 2, 1, '#FFEB3B'],
  [8, 15, 1, 1, '#FFF176'],
]);

const dinoData = px([
  // body
  [4, 7, 6, 5, '#66BB6A'],
  [3, 8, 1, 3, '#66BB6A'],
  // head
  [9, 4, 4, 4, '#66BB6A'],
  [10, 3, 2, 1, '#66BB6A'],
  // eye
  [11, 5, 1, 1, '#212121'],
  // mouth
  [12, 7, 1, 1, '#388E3C'],
  // tail
  [2, 8, 2, 2, '#4CAF50'],
  [1, 7, 1, 2, '#4CAF50'],
  // legs
  [5, 12, 2, 2, '#4CAF50'],
  [8, 12, 2, 2, '#4CAF50'],
  // belly
  [5, 9, 4, 2, '#81C784'],
  // spikes
  [5, 6, 1, 1, '#43A047'],
  [7, 5, 1, 1, '#43A047'],
  [9, 4, 1, 1, '#43A047'],
]);

const rainbowData = px([
  // rainbow arcs (outside to inside)
  [2, 8, 12, 2, '#EF5350'],
  [3, 6, 10, 2, '#FF9800'],
  [4, 5, 8, 1, '#FFEB3B'],
  [4, 4, 8, 1, '#66BB6A'],
  [5, 3, 6, 1, '#42A5F5'],
  [6, 2, 4, 1, '#7E57C2'],
  // clouds
  [0, 9, 4, 3, '#FAFAFA'],
  [1, 8, 2, 1, '#FAFAFA'],
  [12, 9, 4, 3, '#FAFAFA'],
  [13, 8, 2, 1, '#FAFAFA'],
]);

// ─── UI ICONS ───

const starData = px([
  [7, 0, 2, 2, '#FFD600'],
  [6, 2, 4, 2, '#FFD600'],
  [2, 4, 12, 3, '#FFD600'],
  [3, 7, 10, 2, '#FFC107'],
  [4, 9, 8, 2, '#FFC107'],
  [3, 11, 3, 2, '#FFD600'],
  [10, 11, 3, 2, '#FFD600'],
  [2, 13, 2, 2, '#FFC107'],
  [12, 13, 2, 2, '#FFC107'],
]);

const trophyData = px([
  // cup body
  [5, 2, 6, 6, '#FFD600'],
  [4, 3, 1, 3, '#FFD600'],
  [11, 3, 1, 3, '#FFD600'],
  // shine
  [6, 3, 2, 2, '#FFF176'],
  // handles
  [3, 4, 1, 2, '#FFC107'],
  [12, 4, 1, 2, '#FFC107'],
  // stem
  [7, 8, 2, 3, '#FFC107'],
  // base
  [5, 11, 6, 2, '#FFD600'],
  [4, 13, 8, 1, '#FFC107'],
]);

const lockData = px([
  // shackle
  [5, 2, 1, 4, '#78909C'],
  [10, 2, 1, 4, '#78909C'],
  [6, 1, 4, 1, '#78909C'],
  [5, 1, 1, 1, '#78909C'],
  [10, 1, 1, 1, '#78909C'],
  // body
  [4, 6, 8, 7, '#90A4AE'],
  [4, 6, 8, 1, '#78909C'],
  // keyhole
  [7, 8, 2, 2, '#455A64'],
  [8, 10, 1, 2, '#455A64'],
]);

const gearData = px([
  // teeth
  [6, 0, 4, 2, '#78909C'],
  [6, 14, 4, 2, '#78909C'],
  [0, 6, 2, 4, '#78909C'],
  [14, 6, 2, 4, '#78909C'],
  [2, 2, 3, 2, '#78909C'],
  [11, 2, 3, 2, '#78909C'],
  [2, 12, 3, 2, '#78909C'],
  [11, 12, 3, 2, '#78909C'],
  // body
  [4, 3, 8, 10, '#90A4AE'],
  [3, 4, 10, 8, '#90A4AE'],
  // center hole
  [6, 6, 4, 4, '#546E7A'],
  [7, 7, 2, 2, '#455A64'],
]);

const controllerData = px([
  // body
  [2, 5, 12, 6, '#455A64'],
  [3, 4, 10, 1, '#455A64'],
  [3, 11, 10, 1, '#455A64'],
  // grips
  [1, 7, 1, 3, '#37474F'],
  [14, 7, 1, 3, '#37474F'],
  // d-pad
  [4, 7, 1, 1, '#90A4AE'],
  [3, 8, 3, 1, '#90A4AE'],
  [4, 9, 1, 1, '#90A4AE'],
  // buttons
  [11, 7, 1, 1, '#EF5350'],
  [12, 8, 1, 1, '#42A5F5'],
  [10, 8, 1, 1, '#66BB6A'],
  [11, 9, 1, 1, '#FFD600'],
]);

const swordData = px([
  // blade
  [11, 1, 2, 2, '#B0BEC5'],
  [10, 3, 2, 2, '#B0BEC5'],
  [9, 4, 2, 2, '#CFD8DC'],
  [8, 5, 2, 2, '#B0BEC5'],
  [7, 6, 2, 2, '#CFD8DC'],
  [6, 7, 2, 2, '#B0BEC5'],
  // guard
  [4, 8, 2, 1, '#FFD600'],
  [8, 8, 2, 1, '#FFD600'],
  [5, 9, 4, 1, '#FFC107'],
  // handle
  [4, 10, 2, 2, '#8D6E63'],
  [3, 12, 2, 2, '#795548'],
  // pommel
  [2, 13, 2, 2, '#FFD600'],
]);

// ─── NATURE / BACKGROUND ICONS ───

const cloudData = px([
  [4, 6, 8, 4, '#FAFAFA'],
  [2, 7, 12, 3, '#FAFAFA'],
  [6, 4, 4, 2, '#F5F5F5'],
  [3, 8, 2, 1, '#F5F5F5'],
], 16);

const sunData = px([
  // rays
  [7, 0, 2, 2, '#FFD600'],
  [7, 14, 2, 2, '#FFD600'],
  [0, 7, 2, 2, '#FFD600'],
  [14, 7, 2, 2, '#FFD600'],
  [2, 2, 2, 2, '#FFD600'],
  [12, 2, 2, 2, '#FFD600'],
  [2, 12, 2, 2, '#FFD600'],
  [12, 12, 2, 2, '#FFD600'],
  // body
  [5, 4, 6, 8, '#FFD600'],
  [4, 5, 8, 6, '#FFD600'],
  // face
  [6, 7, 1, 1, '#F57F17'],
  [9, 7, 1, 1, '#F57F17'],
  [6, 9, 4, 1, '#F57F17'],
]);

const butterflyData = px([
  // body
  [7, 3, 2, 10, '#5D4037'],
  // left wings
  [3, 3, 4, 3, '#CE93D8'],
  [2, 4, 5, 3, '#AB47BC'],
  [3, 8, 4, 3, '#F48FB1'],
  [2, 9, 5, 2, '#EC407A'],
  // right wings
  [9, 3, 4, 3, '#CE93D8'],
  [9, 4, 5, 3, '#AB47BC'],
  [9, 8, 4, 3, '#F48FB1'],
  [9, 9, 5, 2, '#EC407A'],
  // antennae
  [5, 1, 1, 2, '#5D4037'],
  [10, 1, 1, 2, '#5D4037'],
  [4, 0, 1, 1, '#5D4037'],
  [11, 0, 1, 1, '#5D4037'],
]);

const birdData = px([
  // body
  [5, 6, 6, 4, '#42A5F5'],
  [4, 7, 8, 3, '#42A5F5'],
  // head
  [9, 4, 4, 3, '#42A5F5'],
  // eye
  [11, 5, 1, 1, '#212121'],
  // beak
  [13, 6, 2, 1, '#FF9800'],
  [13, 7, 1, 1, '#FF9800'],
  // wing
  [5, 7, 3, 2, '#1E88E5'],
  // tail
  [3, 7, 2, 1, '#1E88E5'],
  [2, 6, 2, 1, '#1E88E5'],
  // belly
  [7, 8, 4, 2, '#64B5F6'],
]);

const fishData = px([
  // body
  [4, 5, 8, 6, '#FF7043'],
  [3, 6, 10, 4, '#FF7043'],
  // tail
  [1, 5, 2, 2, '#FF5722'],
  [0, 4, 2, 2, '#FF5722'],
  [1, 9, 2, 2, '#FF5722'],
  [0, 10, 2, 2, '#FF5722'],
  // eye
  [10, 7, 2, 2, '#FFF'],
  [11, 7, 1, 1, '#212121'],
  // belly
  [5, 8, 6, 2, '#FFAB91'],
  // fin
  [7, 4, 2, 1, '#FF5722'],
]);

const octopusData = px([
  // head
  [4, 1, 8, 6, '#CE93D8'],
  [3, 2, 10, 5, '#CE93D8'],
  // eyes
  [5, 4, 2, 2, '#FFF'],
  [9, 4, 2, 2, '#FFF'],
  [6, 4, 1, 1, '#212121'],
  [10, 4, 1, 1, '#212121'],
  // tentacles
  [3, 7, 2, 3, '#AB47BC'],
  [2, 10, 1, 2, '#AB47BC'],
  [6, 7, 1, 3, '#AB47BC'],
  [5, 10, 1, 2, '#AB47BC'],
  [9, 7, 1, 3, '#AB47BC'],
  [10, 10, 1, 2, '#AB47BC'],
  [12, 7, 2, 3, '#AB47BC'],
  [13, 10, 1, 2, '#AB47BC'],
]);

const planetData = px([
  // planet body
  [4, 3, 8, 10, '#7E57C2'],
  [3, 5, 10, 6, '#7E57C2'],
  // highlight
  [5, 4, 3, 2, '#B39DDB'],
  // ring
  [0, 7, 3, 1, '#FFCC80'],
  [13, 7, 3, 1, '#FFCC80'],
  [0, 8, 2, 1, '#FFB74D'],
  [14, 8, 2, 1, '#FFB74D'],
  // crater
  [8, 8, 2, 2, '#5E35B1'],
  [5, 10, 1, 1, '#5E35B1'],
]);

const moonData = px([
  [5, 2, 6, 2, '#FFF9C4'],
  [3, 4, 10, 8, '#FFF9C4'],
  [4, 3, 8, 1, '#FFF9C4'],
  [4, 12, 8, 1, '#FFF9C4'],
  [5, 13, 6, 1, '#FFF9C4'],
  // craters
  [6, 5, 2, 2, '#FFF176'],
  [9, 8, 2, 1, '#FFF176'],
  [5, 10, 1, 1, '#FFF176'],
]);

const volcanoData = px([
  // mountain
  [6, 3, 4, 2, '#795548'],
  [4, 5, 8, 2, '#795548'],
  [3, 7, 10, 2, '#795548'],
  [2, 9, 12, 2, '#795548'],
  [1, 11, 14, 3, '#795548'],
  [0, 14, 16, 2, '#8D6E63'],
  // lava top
  [7, 2, 2, 1, '#FF5722'],
  [7, 1, 2, 1, '#FF9800'],
  [8, 0, 1, 1, '#FFEB3B'],
  // lava flow
  [7, 3, 2, 4, '#FF5722'],
  [7, 5, 1, 2, '#FF9800'],
]);

const palmData = px([
  // trunk
  [7, 7, 2, 9, '#8D6E63'],
  [7, 8, 2, 1, '#795548'],
  // fronds
  [4, 3, 4, 2, '#43A047'],
  [8, 3, 4, 2, '#43A047'],
  [3, 2, 3, 1, '#66BB6A'],
  [10, 2, 3, 1, '#66BB6A'],
  [5, 5, 6, 2, '#2E7D32'],
  [2, 1, 2, 1, '#66BB6A'],
  [12, 1, 2, 1, '#66BB6A'],
  // coconut
  [6, 6, 1, 1, '#795548'],
  [9, 6, 1, 1, '#795548'],
]);

const eggData = px([
  [6, 2, 4, 2, '#FFF9C4'],
  [5, 4, 6, 4, '#FFFDE7'],
  [4, 6, 8, 4, '#FFFDE7'],
  [5, 10, 6, 2, '#FFF9C4'],
  [6, 12, 4, 1, '#FFF9C4'],
  // spots
  [7, 5, 1, 1, '#FFCC80'],
  [9, 7, 1, 1, '#FFCC80'],
  [6, 9, 1, 1, '#FFCC80'],
]);

const unicornData = px([
  // body
  [3, 7, 8, 5, '#FAFAFA'],
  // legs
  [4, 12, 2, 3, '#F5F5F5'],
  [9, 12, 2, 3, '#F5F5F5'],
  // head/neck
  [10, 4, 3, 4, '#FAFAFA'],
  [11, 3, 2, 1, '#FAFAFA'],
  // horn
  [12, 1, 1, 2, '#FFD600'],
  [13, 0, 1, 1, '#FFF176'],
  // eye
  [11, 5, 1, 1, '#212121'],
  // mane
  [9, 4, 1, 4, '#CE93D8'],
  [8, 5, 1, 3, '#EC407A'],
  // tail
  [1, 7, 2, 1, '#42A5F5'],
  [0, 8, 2, 1, '#CE93D8'],
  [1, 9, 1, 1, '#EC407A'],
]);

const castleData = px([
  // towers
  [1, 4, 3, 8, '#90A4AE'],
  [12, 4, 3, 8, '#90A4AE'],
  // tower tops
  [1, 3, 1, 1, '#78909C'],
  [3, 3, 1, 1, '#78909C'],
  [12, 3, 1, 1, '#78909C'],
  [14, 3, 1, 1, '#78909C'],
  // main wall
  [4, 6, 8, 6, '#B0BEC5'],
  // gate
  [6, 9, 4, 3, '#546E7A'],
  [7, 8, 2, 1, '#546E7A'],
  // windows
  [5, 7, 1, 1, '#455A64'],
  [10, 7, 1, 1, '#455A64'],
  [2, 6, 1, 1, '#455A64'],
  [13, 6, 1, 1, '#455A64'],
  // battlements
  [4, 5, 2, 1, '#90A4AE'],
  [7, 5, 2, 1, '#90A4AE'],
  [10, 5, 2, 1, '#90A4AE'],
  // flag
  [2, 0, 1, 3, '#795548'],
  [3, 0, 2, 2, '#EF5350'],
  // base
  [0, 12, 16, 2, '#78909C'],
]);

const crownData = px([
  // points
  [2, 2, 2, 3, '#FFD600'],
  [7, 1, 2, 4, '#FFD600'],
  [12, 2, 2, 3, '#FFD600'],
  // base
  [2, 5, 12, 4, '#FFD600'],
  [1, 7, 14, 3, '#FFC107'],
  // gems
  [4, 6, 2, 2, '#EF5350'],
  [7, 6, 2, 2, '#42A5F5'],
  [10, 6, 2, 2, '#66BB6A'],
  // rim
  [1, 9, 14, 1, '#F9A825'],
]);

const gemData = px([
  // top facet
  [5, 3, 6, 2, '#E1BEE7'],
  [4, 4, 8, 1, '#CE93D8'],
  // body
  [3, 5, 10, 4, '#AB47BC'],
  [4, 9, 8, 2, '#8E24AA'],
  [5, 11, 6, 2, '#7B1FA2'],
  [6, 13, 4, 1, '#6A1B9A'],
  // shine
  [5, 5, 2, 2, '#E1BEE7'],
  [4, 6, 1, 1, '#F3E5F5'],
]);

const sailboatData = px([
  // mast
  [8, 1, 1, 10, '#795548'],
  // sail
  [9, 2, 4, 7, '#FAFAFA'],
  [9, 2, 3, 5, '#F5F5F5'],
  // hull
  [3, 11, 10, 2, '#8D6E63'],
  [4, 13, 8, 1, '#795548'],
  [5, 14, 6, 1, '#795548'],
  // water
  [1, 14, 3, 1, '#42A5F5'],
  [12, 14, 3, 1, '#42A5F5'],
]);

const ufoData = px([
  // dome
  [6, 2, 4, 3, '#B2EBF2'],
  [5, 3, 6, 2, '#80DEEA'],
  // body
  [3, 5, 10, 3, '#90A4AE'],
  [2, 6, 12, 2, '#78909C'],
  // lights
  [4, 7, 1, 1, '#EF5350'],
  [7, 7, 2, 1, '#66BB6A'],
  [11, 7, 1, 1, '#42A5F5'],
  // beam
  [6, 8, 4, 1, '#FFF9C4'],
  [5, 9, 6, 1, '#FFF9C490'],
]);

const flowerData = px([
  // petals
  [6, 2, 4, 2, '#F48FB1'],
  [4, 4, 2, 4, '#F48FB1'],
  [10, 4, 2, 4, '#F48FB1'],
  [6, 8, 4, 2, '#F48FB1'],
  // center
  [6, 4, 4, 4, '#FFD600'],
  [7, 5, 2, 2, '#FFF176'],
  // stem
  [7, 10, 2, 5, '#43A047'],
  // leaf
  [5, 12, 2, 1, '#66BB6A'],
  [9, 13, 2, 1, '#66BB6A'],
]);

const cherryBlossomData = px([
  // petals
  [6, 1, 4, 3, '#F8BBD0'],
  [3, 4, 3, 4, '#F8BBD0'],
  [10, 4, 3, 4, '#F8BBD0'],
  [5, 8, 6, 3, '#F8BBD0'],
  // center
  [6, 4, 4, 4, '#FCE4EC'],
  [7, 5, 2, 2, '#FFEB3B'],
]);

// ─── TROPHY TIER ICONS ───

const goldTrophyData = px([
  // cup body
  [5, 1, 6, 6, '#FFD600'],
  [4, 2, 1, 4, '#FFD600'],
  [11, 2, 1, 4, '#FFD600'],
  // handles
  [3, 3, 1, 2, '#FFC107'],
  [12, 3, 1, 2, '#FFC107'],
  // shine
  [6, 2, 2, 2, '#FFF176'],
  // star on cup
  [7, 4, 2, 1, '#FFF9C4'],
  [6, 5, 4, 1, '#FFF9C4'],
  [7, 6, 2, 1, '#FFF9C4'],
  // stem
  [7, 7, 2, 3, '#FFC107'],
  // base
  [5, 10, 6, 2, '#FFD600'],
  [4, 12, 8, 1, '#FFC107'],
  // sparkles
  [2, 1, 1, 1, '#FFF176'],
  [13, 0, 1, 1, '#FFF176'],
  [1, 5, 1, 1, '#FFF9C4'],
  [14, 4, 1, 1, '#FFF9C4'],
]);

const silverTrophyData = px([
  // cup body
  [5, 2, 6, 5, '#B0BEC5'],
  [4, 3, 1, 3, '#B0BEC5'],
  [11, 3, 1, 3, '#B0BEC5'],
  // handles
  [3, 4, 1, 2, '#90A4AE'],
  [12, 4, 1, 2, '#90A4AE'],
  // shine
  [6, 3, 2, 2, '#ECEFF1'],
  // star
  [7, 5, 2, 1, '#F5F5F5'],
  // stem
  [7, 7, 2, 3, '#90A4AE'],
  // base
  [5, 10, 6, 2, '#B0BEC5'],
  [4, 12, 8, 1, '#90A4AE'],
]);

const bronzeTrophyData = px([
  // cup body
  [5, 3, 6, 4, '#CD7F32'],
  [4, 4, 1, 2, '#CD7F32'],
  [11, 4, 1, 2, '#CD7F32'],
  // handles
  [3, 4, 1, 2, '#A0522D'],
  [12, 4, 1, 2, '#A0522D'],
  // shine
  [6, 4, 2, 1, '#DEB887'],
  // stem
  [7, 7, 2, 3, '#A0522D'],
  // base
  [5, 10, 6, 2, '#CD7F32'],
  [4, 12, 8, 1, '#A0522D'],
]);

// ─── POWER-UP ICONS ───

const hourglassData = px([
  // top frame
  [3, 1, 10, 2, '#42A5F5'],
  // top sand
  [5, 3, 6, 2, '#FFD600'],
  [6, 5, 4, 1, '#FFD600'],
  // neck
  [7, 6, 2, 2, '#FFC107'],
  // bottom sand
  [6, 8, 4, 1, '#FFD600'],
  [5, 9, 6, 2, '#FFD600'],
  [4, 11, 8, 2, '#FFC107'],
  // bottom frame
  [3, 13, 10, 2, '#42A5F5'],
  // glass edges
  [4, 3, 1, 4, '#90CAF9'],
  [11, 3, 1, 4, '#90CAF9'],
  [4, 8, 1, 5, '#90CAF9'],
  [11, 8, 1, 5, '#90CAF9'],
]);

const hintBubbleData = px([
  // speech bubble
  [4, 1, 8, 7, '#E3F2FD'],
  [3, 2, 10, 5, '#E3F2FD'],
  // bubble tail
  [5, 8, 2, 1, '#E3F2FD'],
  [4, 9, 2, 1, '#E3F2FD'],
  // question mark / letter hint
  [6, 3, 4, 1, '#42A5F5'],
  [9, 4, 1, 2, '#42A5F5'],
  [7, 5, 2, 1, '#42A5F5'],
  [7, 6, 1, 1, '#42A5F5'],
  // owl eyes peeking
  [5, 11, 2, 2, '#795548'],
  [9, 11, 2, 2, '#795548'],
  [5, 12, 1, 1, '#FFF'],
  [10, 12, 1, 1, '#FFF'],
  // owl head
  [4, 12, 8, 3, '#8D6E63'],
  [6, 13, 1, 1, '#FF9800'],
  [9, 13, 1, 1, '#FF9800'],
]);

const shieldData = px([
  // shield body
  [4, 1, 8, 3, '#42A5F5'],
  [3, 2, 10, 4, '#42A5F5'],
  [4, 6, 8, 3, '#1E88E5'],
  [5, 9, 6, 2, '#1E88E5'],
  [6, 11, 4, 2, '#42A5F5'],
  [7, 13, 2, 1, '#1E88E5'],
  // star emblem
  [7, 4, 2, 1, '#FFD600'],
  [6, 5, 4, 2, '#FFD600'],
  [7, 7, 2, 1, '#FFD600'],
  // shine
  [4, 2, 2, 2, '#90CAF9'],
]);

// ─── OWL MASCOT ───

const owlData = px([
  // body
  [4, 6, 8, 8, '#8D6E63'],
  [3, 7, 10, 6, '#8D6E63'],
  // belly
  [5, 8, 6, 5, '#D7CCC8'],
  // head
  [4, 2, 8, 5, '#795548'],
  [3, 3, 10, 4, '#795548'],
  // ears/tufts
  [3, 1, 2, 2, '#795548'],
  [11, 1, 2, 2, '#795548'],
  // eyes
  [5, 3, 2, 2, '#FFF'],
  [9, 3, 2, 2, '#FFF'],
  [5, 4, 1, 1, '#212121'],
  [10, 4, 1, 1, '#212121'],
  // beak
  [7, 5, 2, 1, '#FF9800'],
  [7, 6, 2, 1, '#F57C00'],
  // wings
  [2, 8, 2, 4, '#6D4C41'],
  [12, 8, 2, 4, '#6D4C41'],
  // feet
  [5, 14, 2, 1, '#FF9800'],
  [9, 14, 2, 1, '#FF9800'],
]);

const owlHappyData = px([
  // body
  [4, 6, 8, 8, '#8D6E63'],
  [3, 7, 10, 6, '#8D6E63'],
  // belly
  [5, 8, 6, 5, '#D7CCC8'],
  // head
  [4, 2, 8, 5, '#795548'],
  [3, 3, 10, 4, '#795548'],
  // ears
  [3, 1, 2, 2, '#795548'],
  [11, 1, 2, 2, '#795548'],
  // happy eyes (closed arcs)
  [5, 4, 2, 1, '#212121'],
  [9, 4, 2, 1, '#212121'],
  // blush
  [4, 5, 1, 1, '#FFAB91'],
  [11, 5, 1, 1, '#FFAB91'],
  // beak (smiling)
  [7, 5, 2, 1, '#FF9800'],
  [7, 6, 2, 1, '#F57C00'],
  // wings raised
  [1, 6, 3, 3, '#6D4C41'],
  [12, 6, 3, 3, '#6D4C41'],
  // feet
  [5, 14, 2, 1, '#FF9800'],
  [9, 14, 2, 1, '#FF9800'],
]);

const partyPopperData = px([
  // cone
  [2, 12, 3, 1, '#FFD600'],
  [3, 10, 3, 2, '#FFD600'],
  [4, 8, 3, 2, '#FFC107'],
  [5, 6, 3, 2, '#FFD600'],
  // confetti bursts
  [8, 2, 2, 2, '#EF5350'],
  [11, 3, 2, 2, '#42A5F5'],
  [9, 5, 2, 1, '#66BB6A'],
  [12, 6, 2, 2, '#CE93D8'],
  [7, 3, 1, 1, '#FFD600'],
  [13, 2, 1, 2, '#FF9800'],
  [10, 1, 1, 1, '#EC407A'],
  [14, 5, 1, 1, '#66BB6A'],
]);

const fireData = px([
  [7, 1, 2, 2, '#FF5722'],
  [6, 3, 4, 2, '#FF5722'],
  [5, 5, 6, 2, '#FF9800'],
  [4, 7, 8, 3, '#FF9800'],
  [3, 9, 10, 3, '#FFD600'],
  [4, 12, 8, 2, '#FF9800'],
  [5, 14, 6, 2, '#FF5722'],
  // inner flame
  [7, 6, 2, 2, '#FFF176'],
  [6, 8, 4, 3, '#FFF176'],
  [7, 11, 2, 2, '#FFD600'],
]);

const sparkleData = px([
  // vertical
  [7, 0, 2, 4, '#FFD600'],
  [7, 12, 2, 4, '#FFD600'],
  // horizontal
  [0, 7, 4, 2, '#FFD600'],
  [12, 7, 4, 2, '#FFD600'],
  // diagonal dots
  [3, 3, 2, 2, '#FFF176'],
  [11, 3, 2, 2, '#FFF176'],
  [3, 11, 2, 2, '#FFF176'],
  [11, 11, 2, 2, '#FFF176'],
  // center
  [6, 6, 4, 4, '#FFF9C4'],
]);

const heartData = px([
  [3, 3, 4, 3, '#EF5350'],
  [9, 3, 4, 3, '#EF5350'],
  [2, 4, 12, 4, '#EF5350'],
  [3, 8, 10, 2, '#E53935'],
  [4, 10, 8, 2, '#E53935'],
  [5, 12, 6, 1, '#EF5350'],
  [6, 13, 4, 1, '#EF5350'],
  [7, 14, 2, 1, '#E53935'],
  // shine
  [4, 4, 2, 2, '#EF9A9A'],
]);

const soundOnData = px([
  // speaker body
  [3, 5, 3, 6, '#546E7A'],
  [2, 6, 1, 4, '#546E7A'],
  // cone
  [6, 4, 2, 8, '#78909C'],
  // waves
  [9, 5, 1, 2, '#42A5F5'],
  [9, 9, 1, 2, '#42A5F5'],
  [11, 4, 1, 3, '#42A5F5'],
  [11, 9, 1, 3, '#42A5F5'],
  [13, 3, 1, 4, '#42A5F5'],
  [13, 9, 1, 4, '#42A5F5'],
]);

const soundOffData = px([
  // speaker body
  [3, 5, 3, 6, '#546E7A'],
  [2, 6, 1, 4, '#546E7A'],
  // cone
  [6, 4, 2, 8, '#78909C'],
  // X
  [10, 5, 1, 1, '#EF5350'],
  [11, 6, 1, 1, '#EF5350'],
  [12, 7, 1, 1, '#EF5350'],
  [13, 8, 1, 1, '#EF5350'],
  [13, 5, 1, 1, '#EF5350'],
  [12, 6, 1, 1, '#EF5350'],
  [11, 7, 1, 1, '#EF5350'],
  [10, 8, 1, 1, '#EF5350'],
]);

const musicNoteData = px([
  // note head
  [3, 10, 3, 3, '#7E57C2'],
  [2, 11, 4, 2, '#7E57C2'],
  // stem
  [6, 2, 1, 9, '#7E57C2'],
  // flag
  [7, 2, 3, 2, '#AB47BC'],
  [8, 4, 2, 1, '#AB47BC'],
]);

const retryData = px([
  // circular arrow
  [5, 2, 6, 2, '#546E7A'],
  [3, 4, 2, 2, '#546E7A'],
  [11, 4, 2, 2, '#546E7A'],
  [2, 6, 2, 4, '#546E7A'],
  [12, 6, 2, 4, '#546E7A'],
  [3, 10, 2, 2, '#546E7A'],
  [11, 10, 2, 2, '#546E7A'],
  [5, 12, 6, 2, '#546E7A'],
  // arrow tip
  [11, 2, 2, 2, '#546E7A'],
  [13, 3, 2, 1, '#546E7A'],
  [13, 4, 1, 1, '#546E7A'],
  // gap
  [5, 12, 2, 2, '#00000000'],
]);

const flexData = px([
  // arm
  [8, 3, 3, 2, '#FFCC80'],
  [6, 5, 2, 2, '#FFCC80'],
  [5, 7, 2, 3, '#FFCC80'],
  // bicep
  [10, 2, 3, 3, '#FFB74D'],
  [11, 1, 2, 1, '#FFB74D'],
  // forearm
  [4, 9, 3, 3, '#FFCC80'],
  [3, 11, 2, 2, '#FFCC80'],
  // hand
  [3, 13, 2, 2, '#FFCC80'],
]);

// ─── CONFETTI SHAPES ───

const confettiSquareData = px([
  [4, 4, 8, 8, '#EF5350'],
  [5, 5, 6, 6, '#EF9A9A'],
]);

const confettiCircleData = px([
  [5, 3, 6, 2, '#42A5F5'],
  [3, 5, 10, 6, '#42A5F5'],
  [5, 11, 6, 2, '#42A5F5'],
  [4, 4, 8, 1, '#42A5F5'],
  [4, 11, 8, 1, '#42A5F5'],
]);

const confettiDiamondData = px([
  [7, 2, 2, 2, '#66BB6A'],
  [5, 4, 6, 2, '#66BB6A'],
  [3, 6, 10, 2, '#66BB6A'],
  [5, 8, 6, 2, '#66BB6A'],
  [7, 10, 2, 2, '#66BB6A'],
  [4, 5, 8, 1, '#81C784'],
]);

// ─── TOWER DEFENSE ICONS ───

const playerCastleData = px([
  // main tower
  [5, 2, 6, 10, '#42A5F5'],
  [4, 3, 8, 9, '#42A5F5'],
  // battlements
  [4, 1, 2, 1, '#1E88E5'],
  [7, 1, 2, 1, '#1E88E5'],
  [10, 1, 2, 1, '#1E88E5'],
  // windows
  [6, 4, 2, 2, '#E3F2FD'],
  [9, 4, 1, 2, '#E3F2FD'],
  // gate
  [6, 8, 4, 4, '#1565C0'],
  [7, 7, 2, 1, '#1565C0'],
  // flag
  [8, 0, 1, 2, '#FFD600'],
  // base
  [3, 12, 10, 2, '#1E88E5'],
  [2, 14, 12, 2, '#1565C0'],
  // highlights
  [5, 3, 1, 3, '#64B5F6'],
], 16);

const enemyCastleData = px([
  // main tower
  [5, 2, 6, 10, '#EF5350'],
  [4, 3, 8, 9, '#EF5350'],
  // battlements (spiky)
  [4, 1, 1, 1, '#C62828'],
  [6, 0, 1, 2, '#C62828'],
  [9, 0, 1, 2, '#C62828'],
  [11, 1, 1, 1, '#C62828'],
  // eyes (menacing)
  [6, 4, 2, 2, '#FFF9C4'],
  [9, 4, 2, 2, '#FFF9C4'],
  [6, 5, 1, 1, '#212121'],
  [10, 5, 1, 1, '#212121'],
  // gate (mouth)
  [6, 8, 4, 3, '#B71C1C'],
  [7, 8, 1, 1, '#FFF9C4'],
  [9, 8, 1, 1, '#FFF9C4'],
  // base
  [3, 12, 10, 2, '#C62828'],
  [2, 14, 12, 2, '#B71C1C'],
], 16);

const playerSoldierData = px([
  // helmet
  [5, 1, 6, 3, '#42A5F5'],
  [6, 0, 4, 1, '#1E88E5'],
  // face
  [6, 4, 4, 3, '#FFCC80'],
  // eyes
  [7, 5, 1, 1, '#212121'],
  [9, 5, 1, 1, '#212121'],
  // body/armor
  [5, 7, 6, 4, '#1E88E5'],
  [4, 8, 8, 3, '#42A5F5'],
  // shield (left hand)
  [3, 7, 2, 4, '#FFD600'],
  [3, 8, 1, 2, '#FFC107'],
  // sword (right hand)
  [12, 5, 1, 4, '#B0BEC5'],
  [12, 4, 1, 1, '#CFD8DC'],
  [11, 8, 1, 1, '#8D6E63'],
  // legs
  [6, 11, 2, 3, '#1565C0'],
  [9, 11, 2, 3, '#1565C0'],
  // feet
  [5, 14, 3, 1, '#795548'],
  [9, 14, 3, 1, '#795548'],
], 16);

const enemySoldierData = px([
  // helmet (spiky)
  [5, 1, 6, 3, '#EF5350'],
  [7, 0, 2, 1, '#C62828'],
  [5, 0, 1, 1, '#C62828'],
  [10, 0, 1, 1, '#C62828'],
  // face
  [6, 4, 4, 3, '#90A4AE'],
  // eyes (red)
  [7, 5, 1, 1, '#FF1744'],
  [9, 5, 1, 1, '#FF1744'],
  // body
  [5, 7, 6, 4, '#C62828'],
  [4, 8, 8, 3, '#EF5350'],
  // weapon (axe)
  [3, 5, 2, 2, '#B0BEC5'],
  [3, 7, 1, 3, '#795548'],
  [12, 6, 2, 2, '#B0BEC5'],
  // legs
  [6, 11, 2, 3, '#B71C1C'],
  [9, 11, 2, 3, '#B71C1C'],
  // feet
  [5, 14, 3, 1, '#455A64'],
  [9, 14, 3, 1, '#455A64'],
], 16);

const fireballData = px([
  // core
  [6, 5, 4, 4, '#FFF176'],
  [5, 6, 6, 3, '#FFF176'],
  // mid flame
  [4, 4, 8, 6, '#FFD600'],
  [5, 3, 6, 1, '#FFD600'],
  [5, 10, 6, 1, '#FFD600'],
  // outer flame
  [3, 5, 1, 4, '#FF9800'],
  [12, 5, 1, 4, '#FF9800'],
  [5, 2, 2, 1, '#FF9800'],
  [9, 2, 2, 1, '#FF9800'],
  // trail
  [4, 10, 2, 2, '#FF5722'],
  [10, 10, 2, 2, '#FF5722'],
  [5, 12, 2, 2, '#FF572280'],
  [9, 12, 2, 2, '#FF572280'],
  [6, 14, 4, 1, '#FF572240'],
], 16);

// ─── SEASHELL ───

const seashellData = px([
  [6, 3, 4, 2, '#FFCCBC'],
  [5, 5, 6, 2, '#FFE0B2'],
  [4, 7, 8, 3, '#FFCCBC'],
  [3, 10, 10, 2, '#FFE0B2'],
  [5, 12, 6, 1, '#FFCCBC'],
  // ridges
  [6, 5, 1, 5, '#FFAB91'],
  [8, 4, 1, 6, '#FFAB91'],
  [10, 6, 1, 4, '#FFAB91'],
]);

const bubbleData = px([
  [5, 2, 6, 2, '#E0F7FA'],
  [3, 4, 10, 8, '#E0F7FA'],
  [5, 12, 6, 2, '#E0F7FA'],
  [4, 3, 8, 1, '#E0F7FA'],
  [4, 12, 8, 1, '#E0F7FA'],
  // shine
  [5, 4, 2, 2, '#FFF'],
]);

const leafData = px([
  [8, 1, 2, 2, '#66BB6A'],
  [6, 3, 6, 2, '#66BB6A'],
  [4, 5, 8, 2, '#43A047'],
  [3, 7, 8, 2, '#66BB6A'],
  [2, 9, 6, 2, '#43A047'],
  [2, 11, 4, 2, '#66BB6A'],
  // vein
  [6, 4, 1, 6, '#2E7D32'],
]);

// ─── ICON MAP ───

export const PIXEL_ICONS = {
  // World icons
  tree: treeData,
  wave: waveData,
  rocket: rocketData,
  dino: dinoData,
  rainbow: rainbowData,

  // UI
  star: starData,
  trophy: trophyData,
  lock: lockData,
  gear: gearData,
  controller: controllerData,
  sword: swordData,

  // Nature
  cloud: cloudData,
  sun: sunData,
  butterfly: butterflyData,
  bird: birdData,
  fish: fishData,
  octopus: octopusData,
  planet: planetData,
  moon: moonData,
  volcano: volcanoData,
  palm: palmData,
  egg: eggData,
  unicorn: unicornData,
  castle: castleData,
  crown: crownData,
  gem: gemData,
  sailboat: sailboatData,
  ufo: ufoData,
  flower: flowerData,
  cherryBlossom: cherryBlossomData,
  seashell: seashellData,
  bubble: bubbleData,
  leaf: leafData,

  // Mascot
  owl: owlData,
  owlHappy: owlHappyData,

  // Feedback
  partyPopper: partyPopperData,
  fire: fireData,
  sparkle: sparkleData,
  heart: heartData,
  flex: flexData,

  // Trophies (tier rewards)
  goldTrophy: goldTrophyData,
  silverTrophy: silverTrophyData,
  bronzeTrophy: bronzeTrophyData,

  // Power-ups
  hourglass: hourglassData,
  hintBubble: hintBubbleData,
  shield: shieldData,

  // Tower Defense
  playerCastle: playerCastleData,
  enemyCastle: enemyCastleData,
  playerSoldier: playerSoldierData,
  enemySoldier: enemySoldierData,
  fireball: fireballData,

  // Settings
  soundOn: soundOnData,
  soundOff: soundOffData,
  musicNote: musicNoteData,
  retry: retryData,

  // Confetti shapes
  confettiSquare: confettiSquareData,
  confettiCircle: confettiCircleData,
  confettiDiamond: confettiDiamondData,
};

// Main export: renders a named pixel icon
export default function PixelIcon({ name, size = 32, className = '', style = {} }) {
  const data = PIXEL_ICONS[name];
  if (!data) return null;
  return <PixelSVG data={data} size={size} className={className} style={style} />;
}
