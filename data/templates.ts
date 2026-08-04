import type { AspectRatio } from "@/lib/providers/types";

export type TemplateCategory =
  | "摄影"
  | "插画"
  | "商品"
  | "标志品牌"
  | "界面稿"
  | "角色"
  | "风景"
  | "字体排版";

export type TemplateMode = "t2i" | "i2i";

export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  mode: TemplateMode;
  /** 送给模型的英文提示词，效果比中文稳定 */
  prompt: string;
  ratio: AspectRatio;
}

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  "摄影",
  "插画",
  "商品",
  "标志品牌",
  "界面稿",
  "角色",
  "风景",
  "字体排版",
];

export const templates: Template[] = [
  // ——— 摄影 ———
  {
    id: "cinematic-portrait",
    name: "电影感人像",
    description: "浅景深、柔和侧光的人物特写，适合头像与封面。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Cinematic portrait of a person, shallow depth of field, soft window side light, 85mm lens, subtle film grain, muted warm color grade, natural skin texture, neutral background with gentle falloff",
    ratio: "3:4",
  },
  {
    id: "street-photography",
    name: "街头纪实",
    description: "城市街头抓拍质感，强环境叙事。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Candid street photography scene, late afternoon golden light, wet pavement reflections, 35mm documentary framing, natural motion blur on passersby, rich but realistic colors",
    ratio: "3:2",
  },
  {
    id: "food-photography",
    name: "美食特写",
    description: "餐饮菜单与外卖 banner 通用的诱人食物图。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Appetizing food photography, overhead three-quarter angle, soft diffused daylight, fresh ingredients scattered around, shallow depth of field, rustic ceramic plate, steam rising subtly",
    ratio: "1:1",
  },
  {
    id: "cozy-cafe",
    name: "咖啡馆内景",
    description: "温暖的空间氛围图，适合门店宣传。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Cozy specialty coffee shop interior, warm wood and matte black fixtures, hanging pendant lights, plants near the window, morning sunlight streaming in, wide interior shot, inviting atmosphere, no people",
    ratio: "3:2",
  },
  {
    id: "headshot-background",
    name: "证件照换背景",
    description: "把随手拍的人像换成专业中性背景。",
    category: "摄影",
    mode: "i2i",
    prompt:
      "Replace the background with a clean professional neutral studio backdrop, keep the subject's face, pose, hair and clothing completely unchanged, match the original lighting direction, soft even key light",
    ratio: "3:4",
  },
  {
    id: "restore-old-photo",
    name: "老照片修复",
    description: "去划痕、补细节、还原自然色彩。",
    category: "摄影",
    mode: "i2i",
    prompt:
      "Restore this old photograph: remove scratches, creases and dust, recover natural facial detail, correct fading and color cast, keep the original composition and identity intact, realistic restrained result",
    ratio: "auto",
  },
  {
    id: "cinematic-grade",
    name: "电影调色",
    description: "给普通照片加一层克制的电影色调。",
    category: "摄影",
    mode: "i2i",
    prompt:
      "Apply a tasteful cinematic color grade: lifted shadows, teal-leaning darks, warm highlights, gentle contrast curve. Do not change composition, subject or content, only the color and tone",
    ratio: "auto",
  },
  {
    id: "real-estate-daylight",
    name: "房源照片补光",
    description: "房产挂牌照片提亮，空间更通透。",
    category: "摄影",
    mode: "i2i",
    prompt:
      "Improve this room listing photo: brighter natural daylight through windows, cleaner white balance, straightened verticals, reduced shadows, keep the layout, furniture and architecture exactly the same",
    ratio: "3:2",
  },

  // ——— 插画 ———
  {
    id: "ink-illustration",
    name: "水墨插画",
    description: "东方水墨质感，留白讲究。",
    category: "插画",
    mode: "t2i",
    prompt:
      "Traditional East Asian ink wash illustration, expressive brush strokes, generous negative space, limited ink tones with one subtle accent color, textured rice paper background",
    ratio: "3:4",
  },
  {
    id: "isometric-city",
    name: "等距微缩城市",
    description: "干净的等距插画，适合科普与产品说明。",
    category: "插画",
    mode: "t2i",
    prompt:
      "Isometric miniature city illustration, clean vector style, soft ambient occlusion, pastel palette with bright accents, tiny detailed buildings and streets, plain light background",
    ratio: "1:1",
  },
  {
    id: "paper-cutout",
    name: "剪纸分层",
    description: "层叠纸艺风格，适合专题头图。",
    category: "插画",
    mode: "t2i",
    prompt:
      "Layered paper cutout illustration, stacked construction paper with visible edge shadows, bold simple shapes, coordinated warm palette, soft studio lighting, editorial composition",
    ratio: "16:9",
  },
  {
    id: "science-infographic",
    name: "科普图解",
    description: "教学与科普配图，文字后期再加。",
    category: "插画",
    mode: "t2i",
    prompt:
      "Educational science illustration, clean flat vector style, clear visual hierarchy, labeled areas left blank for text, cohesive three-color palette, white background",
    ratio: "4:3",
  },
  {
    id: "watercolor-landscape",
    name: "水彩风景",
    description: "柔和水彩晕染，适合封面与卡片。",
    category: "插画",
    mode: "t2i",
    prompt:
      "Soft watercolor landscape painting, wet-on-wet color bleeding, visible paper texture, muted natural palette, loose confident brushwork, plenty of white space",
    ratio: "3:2",
  },
  {
    id: "pencil-sketch",
    name: "铅笔素描",
    description: "把照片转成有手绘感的素描。",
    category: "插画",
    mode: "i2i",
    prompt:
      "Convert this photo into a detailed graphite pencil sketch, visible hatching and shading strokes, preserve the original composition and likeness, white paper background, no color",
    ratio: "auto",
  },
  {
    id: "oil-painting",
    name: "油画质感",
    description: "厚涂油画笔触，适合肖像与静物。",
    category: "插画",
    mode: "i2i",
    prompt:
      "Transform this image into a classical oil painting, thick impasto brush strokes, rich layered pigments, warm gallery lighting, preserve subject identity and composition",
    ratio: "auto",
  },
  {
    id: "sticker-pack",
    name: "贴纸风格",
    description: "粗描边贴纸，适合表情包与周边。",
    category: "插画",
    mode: "i2i",
    prompt:
      "Turn the subject into a die-cut sticker illustration: bold white outline, simplified flat shading, vibrant saturated colors, transparent-looking plain background, playful and clean",
    ratio: "1:1",
  },

  // ——— 商品 ———
  {
    id: "white-packshot",
    name: "白底商品图",
    description: "电商主图标配，保留原商品细节。",
    category: "商品",
    mode: "i2i",
    prompt:
      "Turn this product photo into a clean marketplace packshot on pure white background, even soft studio lighting, subtle contact shadow, preserve the exact shape, label text, color and material of the product",
    ratio: "1:1",
  },
  {
    id: "studio-product",
    name: "影棚质感图",
    description: "专业布光的商品静物。",
    category: "商品",
    mode: "t2i",
    prompt:
      "Professional studio product photography, seamless gradient backdrop, controlled three-point lighting, crisp specular highlights, soft reflection beneath the product, premium commercial look",
    ratio: "1:1",
  },
  {
    id: "premium-black-studio",
    name: "高端黑金质感",
    description: "数码与配饰类的高级感场景。",
    category: "商品",
    mode: "i2i",
    prompt:
      "Place this product in a dramatic black studio setup, rim lighting along the edges, deep matte black surface with subtle reflection, premium electronics advertising mood, keep the product unchanged",
    ratio: "1:1",
  },
  {
    id: "kitchen-lifestyle",
    name: "厨房生活场景",
    description: "把商品放进真实的居家场景。",
    category: "商品",
    mode: "i2i",
    prompt:
      "Place this product naturally on a bright kitchen counter lifestyle scene, morning daylight, tasteful props like linen and ceramics slightly out of focus, keep the product's shape and label unchanged",
    ratio: "4:3",
  },
  {
    id: "coffee-bag-campaign",
    name: "咖啡品牌场景",
    description: "咖啡豆袋的暖调宣传图。",
    category: "商品",
    mode: "t2i",
    prompt:
      "Warm coffee roaster product scene, kraft coffee bag as hero, scattered roasted beans, ceramic cup with crema, morning window light with soft shadows, cozy artisanal mood",
    ratio: "4:3",
  },
  {
    id: "cosmetic-swatch",
    name: "美妆质地特写",
    description: "膏体、乳霜、水珠的微距展示。",
    category: "商品",
    mode: "t2i",
    prompt:
      "Macro beauty product texture shot, creamy swatch with glossy peaks, water droplets, soft gradient backdrop, refined highlights, clean minimal composition, luxury cosmetics advertising",
    ratio: "1:1",
  },
  {
    id: "unboxing-flatlay",
    name: "开箱平铺图",
    description: "套装与订阅盒的整齐俯拍。",
    category: "商品",
    mode: "t2i",
    prompt:
      "Organized flat lay of a product bundle viewed from directly above, items arranged on a grid with even spacing, soft diffused light, neutral textured background, editorial e-commerce styling",
    ratio: "1:1",
  },
  {
    id: "jewelry-velvet",
    name: "珠宝绒布展示",
    description: "首饰目录图，控制高光。",
    category: "商品",
    mode: "t2i",
    prompt:
      "Jewelry catalog photograph on deep velvet fabric, controlled specular highlights on metal and gemstones, macro detail, elegant dark background, premium material rendering",
    ratio: "1:1",
  },

  // ——— 标志品牌 ———
  {
    id: "app-icon",
    name: "App 图标",
    description: "圆角方形应用图标，中心图形清晰。",
    category: "标志品牌",
    mode: "t2i",
    prompt:
      "Modern mobile app icon, rounded square, single bold centered symbol, smooth gradient background, subtle inner depth and soft shadow, no text, crisp at small sizes",
    ratio: "1:1",
  },
  {
    id: "3d-icon-object",
    name: "3D 图标物件",
    description: "立体质感的小物件图标。",
    category: "标志品牌",
    mode: "t2i",
    prompt:
      "Polished 3D object icon floating on a soft pastel background, glossy and matte material mix, soft studio lighting, gentle drop shadow, playful but professional, centered composition",
    ratio: "1:1",
  },
  {
    id: "logo-badge",
    name: "徽章标志",
    description: "咖啡馆、社群适用的徽章 logo。",
    category: "标志品牌",
    mode: "t2i",
    prompt:
      "Vintage badge logo concept, circular emblem with clean linework, balanced symmetry, two-color print-friendly palette, space reserved for a wordmark, flat vector look",
    ratio: "1:1",
  },
  {
    id: "retro-monoline",
    name: "复古单线标志",
    description: "均匀线宽的复古标识风格。",
    category: "标志品牌",
    mode: "t2i",
    prompt:
      "Retro monoline logo mark, uniform stroke weight, geometric construction, 1970s inspired curves, single accent color on cream background, clean vector rendering",
    ratio: "1:1",
  },
  {
    id: "brand-identity-mockup",
    name: "品牌 VI 展示",
    description: "名片、信封、标签的整套呈现。",
    category: "标志品牌",
    mode: "t2i",
    prompt:
      "Brand identity mockup flat lay: business cards, envelope, tag and stationery arranged on a textured surface, cohesive minimal palette, soft daylight, top-down view, blank areas for logo",
    ratio: "4:3",
  },
  {
    id: "brand-merch",
    name: "周边样机",
    description: "T恤、帆布袋、贴纸的品牌预览。",
    category: "标志品牌",
    mode: "t2i",
    prompt:
      "Brand merchandise mockup set: t-shirt, tote bag, stickers and enamel pin arranged together, consistent brand colors, soft studio lighting, clean neutral background",
    ratio: "4:3",
  },
  {
    id: "packaging-system",
    name: "包装系列",
    description: "同系列产品的包装家族。",
    category: "标志品牌",
    mode: "t2i",
    prompt:
      "Cohesive packaging family for related products, three boxes of different sizes standing together, minimal typography placeholders, consistent color system, studio lighting on light gray",
    ratio: "4:3",
  },
  {
    id: "wellness-moodboard",
    name: "品牌情绪板",
    description: "美妆与生活方式品牌的调性板。",
    category: "标志品牌",
    mode: "t2i",
    prompt:
      "Wellness brand mood board collage: color swatches, natural textures, soft fabric, botanical elements and material samples arranged in a grid, calm neutral palette, top-down soft light",
    ratio: "4:3",
  },

  // ——— 界面稿 ———
  {
    id: "saas-dashboard",
    name: "SaaS 仪表盘",
    description: "产品官网用的后台界面示意。",
    category: "界面稿",
    mode: "t2i",
    prompt:
      "Modern SaaS dashboard UI mockup, left sidebar navigation, metric cards with charts, clean typography hierarchy, generous whitespace, light theme with one accent color, crisp screen rendering",
    ratio: "16:9",
  },
  {
    id: "mobile-app-ui",
    name: "移动端界面",
    description: "手机 App 页面样机。",
    category: "界面稿",
    mode: "t2i",
    prompt:
      "Mobile app UI screen inside a modern phone frame, clean card-based layout, bottom tab bar, soft shadows, light background, single accent color, realistic device mockup on gradient backdrop",
    ratio: "9:16",
  },
  {
    id: "startup-landing",
    name: "官网落地页",
    description: "创业公司首页设计稿。",
    category: "界面稿",
    mode: "t2i",
    prompt:
      "Startup landing page design mockup, bold hero headline area, product screenshot, feature cards row, testimonial section, modern sans-serif typography, plenty of whitespace, light theme",
    ratio: "16:9",
  },
  {
    id: "onboarding-flow",
    name: "引导流程",
    description: "三屏新手引导串联展示。",
    category: "界面稿",
    mode: "t2i",
    prompt:
      "Mobile onboarding flow shown as three phone screens side by side, friendly illustration on each screen, progress dots, clear primary button, soft pastel background",
    ratio: "16:9",
  },
  {
    id: "pricing-comparison",
    name: "定价对比区",
    description: "三档定价卡片布局。",
    category: "界面稿",
    mode: "t2i",
    prompt:
      "Pricing section UI with three tier cards, middle card highlighted as recommended, feature checkmark lists, clean borders and subtle shadows, light background, scannable hierarchy",
    ratio: "16:9",
  },
  {
    id: "data-table",
    name: "数据表格",
    description: "后台管理系统的密集表格。",
    category: "界面稿",
    mode: "t2i",
    prompt:
      "Dense admin data table UI, column headers with sort indicators, status badges, alternating row backgrounds, filter bar above, pagination below, professional light theme",
    ratio: "16:9",
  },
  {
    id: "empty-state",
    name: "空状态插图",
    description: "产品内的友好空状态。",
    category: "界面稿",
    mode: "t2i",
    prompt:
      "Friendly product empty-state illustration, simple flat vector character or object, encouraging composition, soft brand colors, lots of white space, area below reserved for text",
    ratio: "4:3",
  },
  {
    id: "case-study-hero",
    name: "案例头图",
    description: "SaaS 客户案例的头部视觉。",
    category: "界面稿",
    mode: "t2i",
    prompt:
      "Polished case study hero visual, floating product screenshots at a slight angle, soft gradient backdrop, abstract geometric accents, professional B2B aesthetic",
    ratio: "16:9",
  },

  // ——— 角色 ———
  {
    id: "brand-mascot",
    name: "品牌吉祥物",
    description: "3D 质感的可爱品牌形象。",
    category: "角色",
    mode: "t2i",
    prompt:
      "Cute 3D brand mascot character, friendly rounded shapes, glossy toy-like material, big expressive eyes, cheerful pose, soft studio lighting, plain light background, centered",
    ratio: "1:1",
  },
  {
    id: "pixar-3d",
    name: "3D 动画角色",
    description: "把人像转成动画电影质感。",
    category: "角色",
    mode: "i2i",
    prompt:
      "Transform this portrait into a stylized 3D animated movie character, soft subsurface skin shading, expressive oversized eyes, keep recognizable facial features, cinematic key light, blurred background",
    ratio: "1:1",
  },
  {
    id: "anime-transform",
    name: "动漫化",
    description: "照片转日系动漫画风。",
    category: "角色",
    mode: "i2i",
    prompt:
      "Convert this portrait into modern anime illustration style, clean cel shading, expressive eyes, soft rim light, preserve hairstyle, outfit and facial identity, detailed but clean background",
    ratio: "3:4",
  },
  {
    id: "professional-avatar",
    name: "职业头像",
    description: "随手拍转成职场专业头像。",
    category: "角色",
    mode: "i2i",
    prompt:
      "Turn this casual photo into a clean professional avatar: neutral studio background, flattering soft key light, tidy business-casual appearance, keep the face completely unchanged, square crop",
    ratio: "1:1",
  },
  {
    id: "pixel-art-avatar",
    name: "像素头像",
    description: "复古像素风格的个人头像。",
    category: "角色",
    mode: "i2i",
    prompt:
      "Convert this portrait into crisp pixel art, limited retro palette, clear pixel grid with no anti-aliasing blur, preserve hairstyle and recognizable identity cues, simple flat background",
    ratio: "1:1",
  },
  {
    id: "plush-toy",
    name: "毛绒玩具化",
    description: "把人物或宠物变成毛绒公仔。",
    category: "角色",
    mode: "i2i",
    prompt:
      "Transform the subject into a cute plush collectible toy, soft fuzzy fabric texture, visible stitching, chunky simplified proportions, sitting on a plain pastel surface, product photo lighting",
    ratio: "1:1",
  },
  {
    id: "expression-sheet",
    name: "表情设定表",
    description: "同一角色的多表情一致性展示。",
    category: "角色",
    mode: "t2i",
    prompt:
      "Character expression sheet with six consistent head poses in a grid: happy, surprised, thinking, sad, confident, laughing. Same character design and colors across all, clean white background",
    ratio: "4:3",
  },
  {
    id: "glasses-tryon",
    name: "眼镜试戴",
    description: "在人像上叠加眼镜，光影自然。",
    category: "角色",
    mode: "i2i",
    prompt:
      "Add everyday eyeglasses to this portrait with realistic fit, believable lens reflections and a soft shadow on the nose bridge, keep the face, pose, hair and lighting completely unchanged",
    ratio: "3:4",
  },

  // ——— 风景 ———
  {
    id: "alpine-sunrise",
    name: "雪山日出",
    description: "壮阔自然风光，适合大图头图。",
    category: "风景",
    mode: "t2i",
    prompt:
      "Alpine mountain range at sunrise, low golden light hitting snow-capped peaks, layered valley fog, crisp clear air, wide landscape composition, natural color grading",
    ratio: "16:9",
  },
  {
    id: "desert-road",
    name: "荒漠公路",
    description: "孤寂公路的旅行感画面。",
    category: "风景",
    mode: "t2i",
    prompt:
      "Empty desert highway stretching to the horizon, warm late-afternoon sun, distant mesas, heat haze, dramatic wide sky, cinematic road trip mood",
    ratio: "16:9",
  },
  {
    id: "floating-islands",
    name: "空中浮岛",
    description: "奇幻概念场景。",
    category: "风景",
    mode: "t2i",
    prompt:
      "Fantasy floating islands suspended in a vast sky, waterfalls pouring off the edges into clouds, distant sunlight breaking through, epic scale, painterly concept art style",
    ratio: "16:9",
  },
  {
    id: "underwater-scene",
    name: "水下世界",
    description: "光柱穿透的海底场景。",
    category: "风景",
    mode: "t2i",
    prompt:
      "Underwater ocean scene, god rays piercing from the surface, coral formations and drifting particles, deep blue gradient, serene and expansive, cinematic wide shot",
    ratio: "16:9",
  },
  {
    id: "low-poly-landscape",
    name: "低多边形地景",
    description: "几何化的低面数风景。",
    category: "风景",
    mode: "t2i",
    prompt:
      "Low-poly geometric landscape, faceted mountains and trees, flat shaded triangles, gradient sky, minimal clean composition, soft pastel color scheme",
    ratio: "16:9",
  },
  {
    id: "interior-restyle",
    name: "室内换风格",
    description: "保留房屋结构，替换软装风格。",
    category: "风景",
    mode: "i2i",
    prompt:
      "Restyle this room with new furniture and decor in a warm minimal style, keep the walls, windows, doors and overall architecture exactly the same, realistic daylight, magazine interior quality",
    ratio: "3:2",
  },
  {
    id: "season-change",
    name: "四季变换",
    description: "同一场景切换季节氛围。",
    category: "风景",
    mode: "i2i",
    prompt:
      "Change the season of this scene to autumn: warm foliage, golden low light, fallen leaves on the ground. Keep the composition, structures and camera angle exactly the same",
    ratio: "auto",
  },
  {
    id: "architectural-sketch",
    name: "建筑概念稿",
    description: "照片转手绘建筑概念图。",
    category: "风景",
    mode: "i2i",
    prompt:
      "Turn this building photo into an architectural concept sketch, confident ink linework with light watercolor washes, visible construction lines, white paper background, professional presentation style",
    ratio: "3:2",
  },

  // ——— 字体排版 ———
  {
    id: "typography-poster",
    name: "字体海报",
    description: "以文字为主体的视觉海报。",
    category: "字体排版",
    mode: "t2i",
    prompt:
      "Bold typographic poster design, oversized headline as the main visual element, strong grid alignment, limited two-color palette, generous margins, Swiss international style, print quality",
    ratio: "2:3",
  },
  {
    id: "magazine-cover",
    name: "杂志封面",
    description: "编辑设计感的封面版式。",
    category: "字体排版",
    mode: "t2i",
    prompt:
      "Editorial magazine cover layout, striking central image area, masthead at the top, coverline text blocks along the sides, refined serif and sans mix, high-end print aesthetic",
    ratio: "2:3",
  },
  {
    id: "quote-card-bg",
    name: "语录卡背景",
    description: "留白充足的引言卡底图。",
    category: "字体排版",
    mode: "t2i",
    prompt:
      "Clean quote card background, soft abstract gradient with subtle grain texture, large empty center area reserved for text, calm sophisticated palette, no lettering in the image",
    ratio: "1:1",
  },
  {
    id: "podcast-cover",
    name: "播客封面",
    description: "抽象识别度高的节目封面。",
    category: "字体排版",
    mode: "t2i",
    prompt:
      "Podcast cover art concept, bold abstract geometric composition, strong focal contrast, memorable at thumbnail size, space reserved for the show title, modern confident palette",
    ratio: "1:1",
  },
  {
    id: "youtube-thumbnail",
    name: "视频封面",
    description: "高点击率的视频缩略图。",
    category: "字体排版",
    mode: "t2i",
    prompt:
      "Video thumbnail concept with one clear focal subject, high contrast lighting, bold color blocking, empty area on one side reserved for large title text, eye-catching at small sizes",
    ratio: "16:9",
  },
  {
    id: "event-poster",
    name: "活动海报底图",
    description: "线下活动海报的视觉底稿。",
    category: "字体排版",
    mode: "t2i",
    prompt:
      "Event poster base design, risograph-inspired texture, bold overlapping shapes, limited three-color palette with visible misregistration, clear empty zones for event details",
    ratio: "2:3",
  },
  {
    id: "newsletter-header",
    name: "邮件头图",
    description: "Newsletter 顶部横幅。",
    category: "字体排版",
    mode: "t2i",
    prompt:
      "Editorial newsletter header banner, abstract illustrative composition, wide letterbox format, calm palette with one accent, refined and uncluttered, space for a short title",
    ratio: "16:9",
  },
  {
    id: "instagram-launch",
    name: "发布日海报",
    description: "新品发布的方形社交图。",
    category: "字体排版",
    mode: "t2i",
    prompt:
      "Square product launch announcement visual, strong focal contrast, bold geometric background, celebratory but restrained mood, clear empty band for announcement copy",
    ratio: "1:1",
  },
];

export function templatesByCategory(category: TemplateCategory | "全部") {
  return category === "全部" ? templates : templates.filter((t) => t.category === category);
}

export function getTemplate(id: string) {
  return templates.find((t) => t.id === id);
}
