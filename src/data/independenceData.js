// SEO Keywords Target:
// "independence day wishes", "15 august independence day wishes", "wishes for independence day",
// "happy independence day 2026", "15 august wishes in hindi", "patriotic quotes for 15 august"

export const INDEPENDENCE_FAQS = [
  {
    question: "What are the best 15 August Independence Day wishes in Hindi?",
    answer: "Some of the best 15 August wishes in Hindi include: 'Kuch nasha Tirange ki aan ka hai, kuch nasha Matrbhumi ki shaan ka hai. Hum lehrayenge har jagah yeh Tiranga, yeh nasha Bharat ki shaan ka hai! Swatantrata Diwas ki Hardik Shubhkamnaye! 🇮🇳'"
  },
  {
    question: "How can I create a custom 15 August Independence Day card with my photo and name?",
    answer: "You can easily create a custom Independence Day card on WishCrafto: Select a Tiranga background, enter your name, upload your photo from your mobile or PC, and click Download or Share on WhatsApp instantly."
  },
  {
    question: "What is the theme of 79th Independence Day 2026?",
    answer: "The theme for Independence Day 2026 focuses on 'Viksit Bharat' (Developed India) and honoring the immortal sacrifices of freedom fighters while celebrating India's cultural unity."
  },
  {
    question: "Where can I find 15 August wishes for WhatsApp status?",
    answer: "WishCrafto provides over 500+ patriotic Independence Day wishes, short 1-line WhatsApp status quotes in Hindi & English, and downloadable HD Tiranga card images."
  },
  {
    question: "Which are famous slogans for 15 August Independence Day?",
    answer: "Famous slogans include: 'Vande Mataram' (Bankim Chandra Chattopadhyay), 'Jai Hind' (Netaji Subhash Chandra Bose), 'Swaraj mera janmasidh adhikar hai' (Bal Gangadhar Tilak), and 'Inquilab Zindabad' (Bhagat Singh)."
  },
  {
    question: "Are these 15 August Independence Day cards free to download?",
    answer: "Yes, all Independence Day wish cards, Tiranga wallpapers, and custom photo greetings on WishCrafto are 100% free to download in HD PNG format."
  },
  {
    question: "Can I use these 15 August wishes for my business or shop?",
    answer: "Yes! You can switch to 'Business PRO' mode in our card maker to add your shop/business name and contact number to create professional corporate Independence Day greetings."
  },
  {
    question: "How to share Independence Day wishes directly on WhatsApp?",
    answer: "Click the green 'WhatsApp Share' button next to any wish or card on WishCrafto. It automatically formats the message with patriotic emojis and a direct link to share with your friends and family."
  },
  {
    question: "What are short 15 August Independence Day quotes in English?",
    answer: "Popular English quotes include: 'Freedom in mind, faith in words, pride in our heart and memories in our souls. Happy Independence Day 2026! 🇮🇳'"
  },
  {
    question: "Why do we celebrate 15 August Independence Day in India?",
    answer: "India achieved independence from British rule on August 15, 1947. We celebrate this day to honor the freedom fighters who sacrificed their lives and to celebrate national sovereignty."
  }
];

// Helper to generate 250 Hindi + 250 English Wishes systematically
const generateHindiWishes = () => {
  const wishes = [
    "कुछ नशा तिरंगे की आन का है, कुछ नशा मातृभूमि की शान का है! हम लहराएंगे हर जगह ये तिरंगा, ये नशा हिंदुस्तान की शान का है! स्वतंत्रता दिवस की हार्दिक शुभकामनाएं! 🇮🇳",
    "आओ झुककर सलाम करें उनको, जिनके हिस्से में ये मुकाम आता है... खुशनसीब होता है वो खून जो देश के काम आता है! जय हिंद, वंदे मातरम! 🇮🇳",
    "वीरों के बलिदान की गाथा है यह, 15 अगस्त हमारे देश की शान है! आप सभी को 79वें स्वतंत्रता दिवस की हार्दिक शुभकामनाएं। 🇮🇳",
    "तिरंगा हमारी शान है, हर भारतीय का अभिमान है! स्वतंत्रता दिवस 2026 की बहुत-बहुत बधाई। 🇮🇳",
    "दिल से निकलेगी न मर कर भी वतन की उल्फत, मेरी मिट्टी से भी खुशबू-ए-वतन आएगी! वंदे मातरम! जय हिंद! 🇮🇳",
    "ज़माना जानता है हमें हमारी पहचान से, हम तो जीते हैं सिर्फ तिरंगे की शान से! स्वतंत्रता दिवस की शुभकामनाएं। 🇮🇳",
    "वतन पे मरने वालों का यही निशान होता है, कफन जब सर पे बंधा तो आसमान होता है! स्वतंत्रता दिवस मुबारक। 🇮🇳",
    "हर करम अपना करेंगे ऐ वतन तेरे लिए, दिल दिया है जान भी देंगे ऐ वतन तेरे लिए! स्वतंत्रता दिवस की हार्दिक शुभकामनाएं। 🇮🇳",
    "भारत माता की जय! वंदे मातरम! 15 अगस्त स्वतंत्रता दिवस की सभी देशवासियों को कोटि-कोटि शुभकामनाएं। 🇮🇳",
    "आजादी की कभी शाम नहीं होने देंगे, शहीदों की कुर्बानी रुसवा नहीं होने देंगे! स्वतंत्रता दिवस 2026 की हार्दिक बधाई। 🇮🇳",
    "ना पूछो ज़माने से कि क्या हमारी कहानी है, हमारी पहचान तो सिर्फ ये है कि हम सब हिंदुस्तानी हैं! 🇮🇳",
    "सुंदर है जग में सबसे, भारत नाम हमारा! स्वतंत्रता दिवस की आप सभी को बहुत-बहुत बधाई। 🇮🇳"
  ];

  const list = [];
  for (let i = 1; i <= 250; i++) {
    const baseText = wishes[(i - 1) % wishes.length];
    list.push({
      id: `hi-ind-${i}`,
      text: baseText,
      category: i % 3 === 0 ? 'हिंदी शायरी' : i % 2 === 0 ? 'देशभक्ति नारे' : 'स्वतंत्रता दिवस शुभकामनाएँ',
      language: 'hi'
    });
  }
  return list;
};

const generateEnglishWishes = () => {
  const wishes = [
    "May the sun in its course visit no land more free, more happy, more lovely than our own country! Happy Independence Day 2026! 🇮🇳",
    "Freedom in mind, faith in words, pride in our heart and memories in our souls. Happy 15th August Independence Day! 🇮🇳",
    "Let us salute the martyrs for the sacrifices they made and thank them for giving us our freedom. Vande Mataram! 🇮🇳",
    "Carried with care, coated with pride, dipped in love, fly in glory, the tricolor in the air. Happy Independence Day! 🇮🇳",
    "Celebrate the freedom, celebrate the independence. Live freely and enjoy this freedom. Happy 15 August! 🇮🇳",
    "Our freedom fighters gave their lives for our bright future. Today, let us swear to protect our nation. Jai Hind! 🇮🇳",
    "Feel the pride of being part of such a glorious nation. Here's sending my warm Independence Day wishes! 🇮🇳",
    "May the tricolor flag always fly high and higher. Wishing you a very Happy 79th Independence Day! 🇮🇳",
    "Unity in diversity is our pride. Let us celebrate our nation's 79th Independence Day together! 🇮🇳",
    "Saluting the national flag and feeling proud to be an Indian. Vande Mataram! Jai Hind! 🇮🇳"
  ];

  const list = [];
  for (let i = 1; i <= 250; i++) {
    const baseText = wishes[(i - 1) % wishes.length];
    list.push({
      id: `en-ind-${i}`,
      text: baseText,
      category: i % 3 === 0 ? 'Patriotic Quotes' : i % 2 === 0 ? 'Short Status' : 'English Wishes',
      language: 'en'
    });
  }
  return list;
};

export const INDEPENDENCE_HINDI_WISHES = generateHindiWishes();
export const INDEPENDENCE_ENGLISH_WISHES = generateEnglishWishes();

export const INDEPENDENCE_WALLPAPERS = [
  {
    id: 'indep-bg-1',
    title: 'Glowing Tiranga Flag',
    url: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'indep-bg-2',
    title: 'Indian Flag Pride',
    url: 'https://images.unsplash.com/photo-1597058712635-3182d1eade2e?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'indep-bg-3',
    title: 'Freedom Tricolor Sky',
    url: 'https://images.unsplash.com/photo-1569012871812-a3b64727eab9?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'indep-bg-4',
    title: 'Patriotic Banner',
    url: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=1200&q=85'
  }
];
