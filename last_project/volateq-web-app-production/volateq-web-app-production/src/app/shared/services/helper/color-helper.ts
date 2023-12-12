export function toRGB(hexColor: string): number[] {
  const rgb = [
    parseInt(hexColor.substring(1, 3), 16),
    parseInt(hexColor.substring(3, 5), 16),
    parseInt(hexColor.substring(5, 7), 16),
  ];

  if (hexColor.length === 9) {
    rgb.push(parseInt(hexColor.substring(7, 9), 16) / 255)
  }

  return rgb;
}

export function complimentaryColor(hexColor: string): string {
  const rgb = toRGB(hexColor);

  const complementaryRgb = ryb2rgb(complimentary(rgb2ryb(rgb)));

  return "#" + 
    Math.round(complementaryRgb[0]).toString(16).padEnd(2, "0") +
    Math.round(complementaryRgb[1]).toString(16).padEnd(2, "0") +
    Math.round(complementaryRgb[2]).toString(16).padEnd(2, "0");
}


/**
 * Copied from https://github.com/bahamas10/node-rgb2ryb/blob/master/rgb2ryb.js
 */
function rgb2ryb(color) {
  let r = color[0], g = color[1], b = color[2];
  // Remove the whiteness from the color.
  const w = Math.min(r, g, b);
  r -= w;
  g -= w;
  b -= w;

  const mg = Math.max(r, g, b);

  // Get the yellow out of the red+green.
  let y = Math.min(r, g);
  r -= y;
  g -= y;

  // If this unfortunate conversion combines blue and green, then cut each in
  // half to preserve the value's maximum range.
  if (b && g) {
      b /= 2.0;
      g /= 2.0;
  }

  // Redistribute the remaining green.
  y += g;
  b += g;

  // Normalize to values.
  const my = Math.max(r, y, b);
  if (my) {
      const n = mg / my;
      r *= n;
      y *= n;
      b *= n;
  }

  // Add the white back in.
  r += w;
  y += w;
  b += w;

  // And return back the ryb typed accordingly.
  return [r, y, b];
}

/**
* Convert a red-yellow-blue system to a red-green-blue system.
*/
function ryb2rgb(color): number[] {
  let r = color[0], y = color[1], b = color[2];
  // Remove the whiteness from the color.
  const w = Math.min(r, y, b);
  r -= w;
  y -= w;
  b -= w;

  const my = Math.max(r, y, b);

  // Get the green out of the yellow and blue
  let g = Math.min(y, b);
  y -= g;
  b -= g;

  if (b && g) {
      b *= 2.0;
      g *= 2.0;
  }

  // Redistribute the remaining yellow.
  r += y;
  g += y;

  // Normalize to values.
  const mg = Math.max(r, g, b);
  if (mg) {
      const n = my / mg;
      r *= n;
      g *= n;
      b *= n;
  }

  // Add the white back in.
  r += w;
  g += w;
  b += w;

  // And return back the ryb typed accordingly.
  return [r, g, b];
}

/**
* Return the complementary color values for a given color.
* You must also give it the upper limit of the color values, typically 255 for
* GUIs, 1.0 for OpenGL.
*/
function complimentary(color) {
  const r = color[0], g = color[1], b = color[2];
  const limit = 255;
  return [limit - r, limit - g, limit - b];
}

export function hex8ToRgba(hex8: string): string {
  const [r, g, b, a] = toRGB(hex8);

  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export function calcBlackOrWhiteTextContrast(backgroundColor: string): "black" | "white" {
  let rgb = toRGB(backgroundColor);
  if (rgb.length === 4) {
    rgb = mixAlphaIntoColor(rgb);
  }

  // stolen from https://stackoverflow.com/a/11868398
  const yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;

  return yiq >= 128 ? "black" : "white";
}


export function setOpacityForColor(color: string, opacity: number): number[] {
  const rgba = toRGB(color);
  if (rgba.length === 4) {
    rgba[3] *= opacity;
  } else {
    rgba.push(opacity);
  }
  return rgba;
}


function mixAlphaIntoColor(rgba: number[]): number[] {
  const a = rgba[3];

  return rgba.slice(0, 3).map(c => Math.floor(c * a + 255 * (1 - a)));
}