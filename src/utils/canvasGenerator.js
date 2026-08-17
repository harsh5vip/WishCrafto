/**
 * Draws a premium, high-resolution greeting card onto an HTML5 Canvas.
 * @param {HTMLCanvasElement} canvas 
 * @param {Object} options 
 */
export const drawGreetingCard = (canvas, {
  festivalName = "Diwali",
  sanskritName = "दीपावली",
  recipientName = "Aarav",
  messageText = "May this festival fill your life with eternal light, wisdom, and boundless prosperity.",
  themeColor = "hsl(28, 92%, 54%)",
  bgGradientStart = "#120700",
  bgGradientEnd = "#070200",
  textColor = "#F1EBD9"
}) => {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  // 1. Draw Background Gradient
  const grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.7);
  grad.addColorStop(0, bgGradientStart);
  grad.addColorStop(1, bgGradientEnd);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // 2. Draw Decorative Borders
  ctx.strokeStyle = themeColor;
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // Inner border
  ctx.strokeStyle = 'rgba(241, 235, 217, 0.15)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  // 3. Draw Corner Mandalas / Ornaments (Symmetric lines)
  const drawCornerDeco = (x, y, angle) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 2;
    
    // Simple elegant geometric mandala corner
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(40, 0);
    ctx.lineTo(40, 15);
    ctx.lineTo(15, 40);
    ctx.lineTo(0, 40);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(20, 20, 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  };

  drawCornerDeco(30, 30, 0); // Top-left
  drawCornerDeco(width - 30, 30, Math.PI / 2); // Top-right
  drawCornerDeco(width - 30, height - 30, Math.PI); // Bottom-right
  drawCornerDeco(30, height - 30, -Math.PI / 2); // Bottom-left

  // 4. Draw Center Aura Glow
  ctx.shadowColor = themeColor;
  ctx.shadowBlur = 40;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.beginPath();
  ctx.arc(width / 2, height * 0.35, 120, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0; // Reset shadow

  // 5. Draw Sanskrit Text (Top decorative text)
  ctx.fillStyle = 'rgba(241, 235, 217, 0.4)';
  ctx.font = '32px "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.fillText(sanskritName, width / 2, 120);

  // 6. Draw Greeting Header
  ctx.fillStyle = themeColor;
  ctx.font = 'bold 58px "Cinzel", serif';
  ctx.fillText(`SHUBH ${festivalName.toUpperCase()}`, width / 2, 210);

  // 7. Draw Recipient Name (Personalized)
  if (recipientName.trim()) {
    ctx.fillStyle = textColor;
    ctx.font = 'italic 26px "Playfair Display", serif';
    ctx.fillText(`Dearest ${recipientName},`, width / 2, 280);
  }

  // 8. Draw Message Text (Wrapped lines)
  ctx.fillStyle = 'rgba(241, 235, 217, 0.8)';
  ctx.font = '22px "Outfit", sans-serif';
  
  const words = messageText.split(' ');
  let line = '';
  let y = recipientName.trim() ? 330 : 310;
  const maxWidth = width - 160;
  const lineHeight = 34;

  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, width / 2, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, width / 2, y);

  // 9. Draw Footer watermark
  ctx.fillStyle = 'rgba(241, 235, 217, 0.25)';
  ctx.font = '14px "Outfit", sans-serif';
  ctx.fillText("CREATED VIA FESTIVALVERSE", width / 2, height - 70);
};
