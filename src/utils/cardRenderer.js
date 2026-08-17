/**
 * Utility to generate a high-definition, beautifully styled Greeting Card image
 * complete with festive typography, gold ornamental borders, wish text, and branding.
 */
export async function generateGreetingCardDataUrl(card, festivalName = 'Raksha Bandhan', language = 'en') {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    // 1200x1200 square format (ideal for Instagram, WhatsApp, Pinterest, and direct sharing)
    canvas.width = 1200;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = card.image;

    img.onload = () => {
      try {
        const titleToRender = (language === 'hi' && card.titleHindi) ? card.titleHindi : card.title;
        const wishToRender = (language === 'hi' && card.wishTextHindi) ? card.wishTextHindi : (card.wishText || card.quote);
        const quoteToRender = (language === 'hi' && card.quoteHindi) ? card.quoteHindi : card.quote;
        const mainFont = language === 'hi' ? '"Hind", "Noto Sans Devanagari", Georgia, serif' : '"Playfair Display", Georgia, serif';

        // 1. Draw scaled cover background image
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        // 2. Dark glass gradient overlay for high text legibility
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(8, 5, 4, 0.55)');
        gradient.addColorStop(0.35, 'rgba(15, 9, 6, 0.75)');
        gradient.addColorStop(0.7, 'rgba(12, 7, 5, 0.88)');
        gradient.addColorStop(1, 'rgba(5, 4, 3, 0.95)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 3. Royal Gold Outer Border
        ctx.strokeStyle = 'rgba(255, 185, 54, 0.65)';
        ctx.lineWidth = 6;
        ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

        // 4. Subtle Inner Frame Line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

        // 5. Corner Ornaments (Gold Diamond Accents)
        const corners = [
          [50, 50],
          [canvas.width - 50, 50],
          [50, canvas.height - 50],
          [canvas.width - 50, canvas.height - 50]
        ];
        ctx.fillStyle = '#ffb936';
        corners.forEach(([cx, cy]) => {
          ctx.beginPath();
          ctx.arc(cx, cy, 6, 0, Math.PI * 2);
          ctx.fill();
        });

        // 6. Top Festival Header Badge
        ctx.font = '700 24px "Cinzel", Georgia, serif';
        ctx.fillStyle = '#ffb936';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 8;
        ctx.fillText(`✨ HAPPY ${festivalName.toUpperCase()} ✨`, canvas.width / 2, 130);

        // 7. Card Subtitle / Category
        ctx.font = '600 20px "Outfit", Inter, sans-serif';
        ctx.fillStyle = 'rgba(255, 246, 231, 0.8)';
        ctx.fillText(card.badge ? card.badge.toUpperCase() : 'FESTIVE BLESSING', canvas.width / 2, 175);

        // 8. Decorative Divider
        ctx.strokeStyle = 'rgba(255, 185, 54, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 120, 205);
        ctx.lineTo(canvas.width / 2 + 120, 205);
        ctx.stroke();

        // 9. Card Title
        ctx.font = `italic 700 ${language === 'hi' ? '40px' : '48px'} ${mainFont}`;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(255, 185, 54, 0.3)';
        ctx.shadowBlur = 16;
        ctx.fillText(titleToRender, canvas.width / 2, 290);

        // 10. Main Wish Text Wrapping
        ctx.font = `500 ${language === 'hi' ? '30px' : '34px'} ${mainFont}`;
        ctx.fillStyle = '#fff6e7';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 12;

        const maxTextWidth = 980;
        const lineHeight = language === 'hi' ? 50 : 56;
        const words = wishToRender.split(' ');
        let currentLine = '';
        const lines = [];

        for (let n = 0; n < words.length; n++) {
          const testLine = currentLine + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxTextWidth && n > 0) {
            lines.push(currentLine.trim());
            currentLine = words[n] + ' ';
          } else {
            currentLine = testLine;
          }
        }
        lines.push(currentLine.trim());

        const totalTextHeight = lines.length * lineHeight;
        let startY = 460 - (totalTextHeight > 300 ? 50 : 0);

        lines.forEach((lineText, idx) => {
          ctx.fillText(lineText, canvas.width / 2, startY + (idx * lineHeight));
        });

        // 11. Quote / Highlight if available
        if (quoteToRender && wishToRender && quoteToRender !== wishToRender) {
          ctx.font = `italic 500 ${language === 'hi' ? '24px' : '28px'} ${mainFont}`;
          ctx.fillStyle = '#ffd166';
          const quoteY = startY + (lines.length * lineHeight) + 50;
          if (quoteY < canvas.height - 180) {
            ctx.fillText(`“${quoteToRender}”`, canvas.width / 2, quoteY);
          }
        }

        // 12. Bottom Blessing & Branding Footer
        ctx.shadowBlur = 0;
        const footerY = canvas.height - 110;

        ctx.font = language === 'hi' ? '500 22px "Hind", Georgia, serif' : 'italic 600 24px Georgia, serif';
        ctx.fillStyle = '#ffb936';
        ctx.fillText(language === 'hi' ? 'आपको एवं आपके परिवार को रक्षा बंधन की अनंत शुभकामनाएं' : 'Wishing you joy, love & eternal togetherness', canvas.width / 2, footerY);

        ctx.font = '600 17px "Outfit", Inter, sans-serif';
        ctx.fillStyle = 'rgba(255, 246, 231, 0.6)';
        ctx.fillText('Created with WishCrafto.com', canvas.width / 2, footerY + 36);

        // Convert to high-quality JPEG data URL
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        resolve(dataUrl);
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => {
      // Fallback to original image if canvas load encounters CORS
      resolve(card.image);
    };
  });
}
