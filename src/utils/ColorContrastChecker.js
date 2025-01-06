// Utility function to determine the luminance of a color
function luminance(r, g, b) {
    const a = [r, g, b].map(function (c) {
        c /= 255; // Normalize the color
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722; // Calculate luminance
}

// Function to calculate the contrast ratio between two colors
function contrastRatio(fgColor, bgColor) {
    const [r1, g1, b1] = fgColor;
    const [r2, g2, b2] = bgColor;
    const L1 = luminance(r1, g1, b1);
    const L2 = luminance(r2, g2, b2);
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

// Function to determine if the contrast meets WCAG 2.1 standards
function meetsWCAG(fgColor, bgColor) {
    const ratio = contrastRatio(fgColor, bgColor);
    return ratio >= 4.5; // Minimum ratio for normal text
}

export { contrastRatio, meetsWCAG };