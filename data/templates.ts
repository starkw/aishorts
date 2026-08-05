import type { AspectRatio } from "@/lib/providers/types";

export type TemplateCategory =
  | "摄影"
  | "插图"
  | "产品"
  | "标志和品牌"
  | "UI模型"
  | "人物"
  | "风景"
  | "排版";

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

/** 分类样图，同时用于首页瀑布流与生成器里的模板缩略卡；同类多张轮换以免大量卡片撞图 */
export const CATEGORY_IMAGES: Record<TemplateCategory, string[]> = {
  摄影: ["/tpl/photo.jpg", "/tpl/photo-2.jpg", "/tpl/photo-3.jpg"],
  插图: ["/tpl/illustration.jpg", "/tpl/illustration-2.jpg", "/tpl/illustration-3.jpg"],
  产品: ["/tpl/product.jpg", "/tpl/product-2.jpg", "/tpl/product-3.jpg"],
  标志和品牌: ["/tpl/brand.jpg", "/tpl/brand-2.jpg"],
  UI模型: ["/tpl/ui.jpg", "/tpl/ui-2.jpg", "/tpl/ui-3.jpg"],
  人物: ["/tpl/character.jpg", "/tpl/character-2.jpg", "/tpl/character-3.jpg"],
  风景: ["/tpl/landscape.jpg", "/tpl/landscape-2.jpg", "/tpl/landscape-3.jpg"],
  排版: ["/tpl/typography.jpg", "/tpl/typography-2.jpg", "/tpl/typography-3.jpg"],
};

/** 样图加载完成前的占位底色 */
export const CATEGORY_GRADIENT: Record<TemplateCategory, string> = {
  摄影: "from-slate-700 via-slate-800 to-slate-900",
  插图: "from-rose-400 via-orange-400 to-amber-400",
  产品: "from-zinc-200 via-zinc-300 to-zinc-400",
  标志和品牌: "from-amber-400 via-orange-500 to-rose-500",
  UI模型: "from-sky-400 via-blue-500 to-indigo-500",
  人物: "from-fuchsia-400 via-purple-500 to-violet-600",
  风景: "from-emerald-400 via-teal-500 to-cyan-600",
  排版: "from-neutral-800 via-neutral-700 to-neutral-900",
};

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  "摄影",
  "插图",
  "产品",
  "标志和品牌",
  "UI模型",
  "人物",
  "风景",
  "排版",
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
    category: "插图",
    mode: "t2i",
    prompt:
      "Traditional East Asian ink wash illustration, expressive brush strokes, generous negative space, limited ink tones with one subtle accent color, textured rice paper background",
    ratio: "3:4",
  },
  {
    id: "isometric-city",
    name: "等距微缩城市",
    description: "干净的等距插画，适合科普与产品说明。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Isometric miniature city illustration, clean vector style, soft ambient occlusion, pastel palette with bright accents, tiny detailed buildings and streets, plain light background",
    ratio: "1:1",
  },
  {
    id: "paper-cutout",
    name: "剪纸分层",
    description: "层叠纸艺风格，适合专题头图。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Layered paper cutout illustration, stacked construction paper with visible edge shadows, bold simple shapes, coordinated warm palette, soft studio lighting, editorial composition",
    ratio: "16:9",
  },
  {
    id: "science-infographic",
    name: "科普图解",
    description: "教学与科普配图，文字后期再加。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Educational science illustration, clean flat vector style, clear visual hierarchy, labeled areas left blank for text, cohesive three-color palette, white background",
    ratio: "4:3",
  },
  {
    id: "watercolor-landscape",
    name: "水彩风景",
    description: "柔和水彩晕染，适合封面与卡片。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Soft watercolor landscape painting, wet-on-wet color bleeding, visible paper texture, muted natural palette, loose confident brushwork, plenty of white space",
    ratio: "3:2",
  },
  {
    id: "pencil-sketch",
    name: "铅笔素描",
    description: "把照片转成有手绘感的素描。",
    category: "插图",
    mode: "i2i",
    prompt:
      "Convert this photo into a detailed graphite pencil sketch, visible hatching and shading strokes, preserve the original composition and likeness, white paper background, no color",
    ratio: "auto",
  },
  {
    id: "oil-painting",
    name: "油画质感",
    description: "厚涂油画笔触，适合肖像与静物。",
    category: "插图",
    mode: "i2i",
    prompt:
      "Transform this image into a classical oil painting, thick impasto brush strokes, rich layered pigments, warm gallery lighting, preserve subject identity and composition",
    ratio: "auto",
  },
  {
    id: "sticker-pack",
    name: "贴纸风格",
    description: "粗描边贴纸，适合表情包与周边。",
    category: "插图",
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
    category: "产品",
    mode: "i2i",
    prompt:
      "Turn this product photo into a clean marketplace packshot on pure white background, even soft studio lighting, subtle contact shadow, preserve the exact shape, label text, color and material of the product",
    ratio: "1:1",
  },
  {
    id: "studio-product",
    name: "影棚质感图",
    description: "专业布光的商品静物。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Professional studio product photography, seamless gradient backdrop, controlled three-point lighting, crisp specular highlights, soft reflection beneath the product, premium commercial look",
    ratio: "1:1",
  },
  {
    id: "premium-black-studio",
    name: "高端黑金质感",
    description: "数码与配饰类的高级感场景。",
    category: "产品",
    mode: "i2i",
    prompt:
      "Place this product in a dramatic black studio setup, rim lighting along the edges, deep matte black surface with subtle reflection, premium electronics advertising mood, keep the product unchanged",
    ratio: "1:1",
  },
  {
    id: "kitchen-lifestyle",
    name: "厨房生活场景",
    description: "把商品放进真实的居家场景。",
    category: "产品",
    mode: "i2i",
    prompt:
      "Place this product naturally on a bright kitchen counter lifestyle scene, morning daylight, tasteful props like linen and ceramics slightly out of focus, keep the product's shape and label unchanged",
    ratio: "4:3",
  },
  {
    id: "coffee-bag-campaign",
    name: "咖啡品牌场景",
    description: "咖啡豆袋的暖调宣传图。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Warm coffee roaster product scene, kraft coffee bag as hero, scattered roasted beans, ceramic cup with crema, morning window light with soft shadows, cozy artisanal mood",
    ratio: "4:3",
  },
  {
    id: "cosmetic-swatch",
    name: "美妆质地特写",
    description: "膏体、乳霜、水珠的微距展示。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Macro beauty product texture shot, creamy swatch with glossy peaks, water droplets, soft gradient backdrop, refined highlights, clean minimal composition, luxury cosmetics advertising",
    ratio: "1:1",
  },
  {
    id: "unboxing-flatlay",
    name: "开箱平铺图",
    description: "套装与订阅盒的整齐俯拍。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Organized flat lay of a product bundle viewed from directly above, items arranged on a grid with even spacing, soft diffused light, neutral textured background, editorial e-commerce styling",
    ratio: "1:1",
  },
  {
    id: "jewelry-velvet",
    name: "珠宝绒布展示",
    description: "首饰目录图，控制高光。",
    category: "产品",
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
    category: "标志和品牌",
    mode: "t2i",
    prompt:
      "Modern mobile app icon, rounded square, single bold centered symbol, smooth gradient background, subtle inner depth and soft shadow, no text, crisp at small sizes",
    ratio: "1:1",
  },
  {
    id: "3d-icon-object",
    name: "3D 图标物件",
    description: "立体质感的小物件图标。",
    category: "标志和品牌",
    mode: "t2i",
    prompt:
      "Polished 3D object icon floating on a soft pastel background, glossy and matte material mix, soft studio lighting, gentle drop shadow, playful but professional, centered composition",
    ratio: "1:1",
  },
  {
    id: "logo-badge",
    name: "徽章标志",
    description: "咖啡馆、社群适用的徽章 logo。",
    category: "标志和品牌",
    mode: "t2i",
    prompt:
      "Vintage badge logo concept, circular emblem with clean linework, balanced symmetry, two-color print-friendly palette, space reserved for a wordmark, flat vector look",
    ratio: "1:1",
  },
  {
    id: "retro-monoline",
    name: "复古单线标志",
    description: "均匀线宽的复古标识风格。",
    category: "标志和品牌",
    mode: "t2i",
    prompt:
      "Retro monoline logo mark, uniform stroke weight, geometric construction, 1970s inspired curves, single accent color on cream background, clean vector rendering",
    ratio: "1:1",
  },
  {
    id: "brand-identity-mockup",
    name: "品牌 VI 展示",
    description: "名片、信封、标签的整套呈现。",
    category: "标志和品牌",
    mode: "t2i",
    prompt:
      "Brand identity mockup flat lay: business cards, envelope, tag and stationery arranged on a textured surface, cohesive minimal palette, soft daylight, top-down view, blank areas for logo",
    ratio: "4:3",
  },
  {
    id: "brand-merch",
    name: "周边样机",
    description: "T恤、帆布袋、贴纸的品牌预览。",
    category: "标志和品牌",
    mode: "t2i",
    prompt:
      "Brand merchandise mockup set: t-shirt, tote bag, stickers and enamel pin arranged together, consistent brand colors, soft studio lighting, clean neutral background",
    ratio: "4:3",
  },
  {
    id: "packaging-system",
    name: "包装系列",
    description: "同系列产品的包装家族。",
    category: "标志和品牌",
    mode: "t2i",
    prompt:
      "Cohesive packaging family for related products, three boxes of different sizes standing together, minimal typography placeholders, consistent color system, studio lighting on light gray",
    ratio: "4:3",
  },
  {
    id: "wellness-moodboard",
    name: "品牌情绪板",
    description: "美妆与生活方式品牌的调性板。",
    category: "标志和品牌",
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
    category: "UI模型",
    mode: "t2i",
    prompt:
      "Modern SaaS dashboard UI mockup, left sidebar navigation, metric cards with charts, clean typography hierarchy, generous whitespace, light theme with one accent color, crisp screen rendering",
    ratio: "16:9",
  },
  {
    id: "mobile-app-ui",
    name: "移动端界面",
    description: "手机 App 页面样机。",
    category: "UI模型",
    mode: "t2i",
    prompt:
      "Mobile app UI screen inside a modern phone frame, clean card-based layout, bottom tab bar, soft shadows, light background, single accent color, realistic device mockup on gradient backdrop",
    ratio: "9:16",
  },
  {
    id: "startup-landing",
    name: "官网落地页",
    description: "创业公司首页设计稿。",
    category: "UI模型",
    mode: "t2i",
    prompt:
      "Startup landing page design mockup, bold hero headline area, product screenshot, feature cards row, testimonial section, modern sans-serif typography, plenty of whitespace, light theme",
    ratio: "16:9",
  },
  {
    id: "onboarding-flow",
    name: "引导流程",
    description: "三屏新手引导串联展示。",
    category: "UI模型",
    mode: "t2i",
    prompt:
      "Mobile onboarding flow shown as three phone screens side by side, friendly illustration on each screen, progress dots, clear primary button, soft pastel background",
    ratio: "16:9",
  },
  {
    id: "pricing-comparison",
    name: "定价对比区",
    description: "三档定价卡片布局。",
    category: "UI模型",
    mode: "t2i",
    prompt:
      "Pricing section UI with three tier cards, middle card highlighted as recommended, feature checkmark lists, clean borders and subtle shadows, light background, scannable hierarchy",
    ratio: "16:9",
  },
  {
    id: "data-table",
    name: "数据表格",
    description: "后台管理系统的密集表格。",
    category: "UI模型",
    mode: "t2i",
    prompt:
      "Dense admin data table UI, column headers with sort indicators, status badges, alternating row backgrounds, filter bar above, pagination below, professional light theme",
    ratio: "16:9",
  },
  {
    id: "empty-state",
    name: "空状态插图",
    description: "产品内的友好空状态。",
    category: "UI模型",
    mode: "t2i",
    prompt:
      "Friendly product empty-state illustration, simple flat vector character or object, encouraging composition, soft brand colors, lots of white space, area below reserved for text",
    ratio: "4:3",
  },
  {
    id: "case-study-hero",
    name: "案例头图",
    description: "SaaS 客户案例的头部视觉。",
    category: "UI模型",
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
    category: "人物",
    mode: "t2i",
    prompt:
      "Cute 3D brand mascot character, friendly rounded shapes, glossy toy-like material, big expressive eyes, cheerful pose, soft studio lighting, plain light background, centered",
    ratio: "1:1",
  },
  {
    id: "pixar-3d",
    name: "3D 动画角色",
    description: "把人像转成动画电影质感。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Transform this portrait into a stylized 3D animated movie character, soft subsurface skin shading, expressive oversized eyes, keep recognizable facial features, cinematic key light, blurred background",
    ratio: "1:1",
  },
  {
    id: "anime-transform",
    name: "动漫化",
    description: "照片转日系动漫画风。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Convert this portrait into modern anime illustration style, clean cel shading, expressive eyes, soft rim light, preserve hairstyle, outfit and facial identity, detailed but clean background",
    ratio: "3:4",
  },
  {
    id: "professional-avatar",
    name: "职业头像",
    description: "随手拍转成职场专业头像。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Turn this casual photo into a clean professional avatar: neutral studio background, flattering soft key light, tidy business-casual appearance, keep the face completely unchanged, square crop",
    ratio: "1:1",
  },
  {
    id: "pixel-art-avatar",
    name: "像素头像",
    description: "复古像素风格的个人头像。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Convert this portrait into crisp pixel art, limited retro palette, clear pixel grid with no anti-aliasing blur, preserve hairstyle and recognizable identity cues, simple flat background",
    ratio: "1:1",
  },
  {
    id: "plush-toy",
    name: "毛绒玩具化",
    description: "把人物或宠物变成毛绒公仔。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Transform the subject into a cute plush collectible toy, soft fuzzy fabric texture, visible stitching, chunky simplified proportions, sitting on a plain pastel surface, product photo lighting",
    ratio: "1:1",
  },
  {
    id: "expression-sheet",
    name: "表情设定表",
    description: "同一角色的多表情一致性展示。",
    category: "人物",
    mode: "t2i",
    prompt:
      "Character expression sheet with six consistent head poses in a grid: happy, surprised, thinking, sad, confident, laughing. Same character design and colors across all, clean white background",
    ratio: "4:3",
  },
  {
    id: "glasses-tryon",
    name: "眼镜试戴",
    description: "在人像上叠加眼镜，光影自然。",
    category: "人物",
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
    category: "排版",
    mode: "t2i",
    prompt:
      "Bold typographic poster design, oversized headline as the main visual element, strong grid alignment, limited two-color palette, generous margins, Swiss international style, print quality",
    ratio: "2:3",
  },
  {
    id: "magazine-cover",
    name: "杂志封面",
    description: "编辑设计感的封面版式。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Editorial magazine cover layout, striking central image area, masthead at the top, coverline text blocks along the sides, refined serif and sans mix, high-end print aesthetic",
    ratio: "2:3",
  },
  {
    id: "quote-card-bg",
    name: "语录卡背景",
    description: "留白充足的引言卡底图。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Clean quote card background, soft abstract gradient with subtle grain texture, large empty center area reserved for text, calm sophisticated palette, no lettering in the image",
    ratio: "1:1",
  },
  {
    id: "podcast-cover",
    name: "播客封面",
    description: "抽象识别度高的节目封面。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Podcast cover art concept, bold abstract geometric composition, strong focal contrast, memorable at thumbnail size, space reserved for the show title, modern confident palette",
    ratio: "1:1",
  },
  {
    id: "youtube-thumbnail",
    name: "视频封面",
    description: "高点击率的视频缩略图。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Video thumbnail concept with one clear focal subject, high contrast lighting, bold color blocking, empty area on one side reserved for large title text, eye-catching at small sizes",
    ratio: "16:9",
  },
  {
    id: "event-poster",
    name: "活动海报底图",
    description: "线下活动海报的视觉底稿。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Event poster base design, risograph-inspired texture, bold overlapping shapes, limited three-color palette with visible misregistration, clear empty zones for event details",
    ratio: "2:3",
  },
  {
    id: "newsletter-header",
    name: "邮件头图",
    description: "Newsletter 顶部横幅。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Editorial newsletter header banner, abstract illustrative composition, wide letterbox format, calm palette with one accent, refined and uncluttered, space for a short title",
    ratio: "16:9",
  },
  {
    id: "instagram-launch",
    name: "发布日海报",
    description: "新品发布的方形社交图。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Square product launch announcement visual, strong focal contrast, bold geometric background, celebratory but restrained mood, clear empty band for announcement copy",
    ratio: "1:1",
  },

  // ——— 摄影（续） ———
  {
    id: "fashion-editorial",
    name: "时尚大片",
    description: "杂志感造型人像，强风格、控制情绪。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "High fashion editorial photograph, strong styling and silhouette, controlled studio lighting with one hard key, muted designer palette, confident pose, medium format look, fine grain",
    ratio: "3:4",
  },
  {
    id: "lookbook-cover",
    name: "服装图册封面",
    description: "无模特的服装氛围封面，留出标题位。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Fashion lookbook cover, garments styled on a clean rail and surface, soft directional daylight, calm neutral palette, generous empty space at the top for a title, refined minimal composition",
    ratio: "3:4",
  },
  {
    id: "capsule-flatlay",
    name: "胶囊衣橱平铺",
    description: "成套穿搭平铺图，适合穿搭指南与电商。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Coordinated fashion flat lay shot from directly above, a capsule wardrobe of neutral garments and accessories, even soft light, tidy geometric arrangement, light textured backdrop",
    ratio: "1:1",
  },
  {
    id: "fabric-macro",
    name: "面料微距",
    description: "织物纹理特写，展示材质与织法。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Macro photograph of textile detail, visible weave and fiber structure, raking side light to reveal texture, shallow depth of field, natural undyed tones, premium material feel",
    ratio: "1:1",
  },
  {
    id: "careers-hero",
    name: "招聘页主图",
    description: "真实工作场景，避开摆拍味的图库感。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Careers page hero photograph of a bright modern workspace, natural collaboration in progress, candid unposed framing, large windows with soft daylight, warm neutral interior, wide composition",
    ratio: "16:9",
  },
  {
    id: "gym-promo",
    name: "健身房宣传图",
    description: "以空间和器械为主的健身推广图。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Fitness studio promotional photograph, clean equipment arrangement, dramatic side lighting with deep shadows, dark industrial interior, energetic but uncluttered, wide angle",
    ratio: "16:9",
  },
  {
    id: "salon-window",
    name: "门店橱窗",
    description: "小店门面概念图，适合本地商家。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Boutique storefront photograph at dusk, warm interior glow through large windows, clean signage area left blank, tidy street frontage, inviting neighborhood atmosphere",
    ratio: "3:4",
  },
  {
    id: "restaurant-booth",
    name: "餐厅卡座",
    description: "餐饮空间概念图，适合品牌与订座页。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Hospitality interior photograph of a restaurant booth, warm pendant lighting, rich material palette of wood leather and brass, evening ambience, inviting depth, wide framing",
    ratio: "16:9",
  },
  {
    id: "boutique-hotel-room",
    name: "精品酒店客房",
    description: "酒店房型概念图，适合营销与设计板。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Boutique hotel room interior photograph, layered textiles and warm wood, soft morning light through sheer curtains, considered styling, calm luxurious mood, architectural framing",
    ratio: "16:9",
  },
  {
    id: "wedding-table",
    name: "婚礼餐桌",
    description: "婚礼桌面布置概念，适合策划与灵感板。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Wedding tablescape photograph, layered linen and ceramics, seasonal florals in muted tones, candlelight with soft daylight fill, elegant restrained styling, shallow depth of field",
    ratio: "3:2",
  },
  {
    id: "home-exterior-dusk",
    name: "黄昏房屋外景",
    description: "地产外景图，暖灯与蓝调天空。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Real estate exterior photograph at dusk, warm interior lights glowing against a deep blue twilight sky, manicured landscaping, clean architectural lines, wide balanced composition",
    ratio: "3:2",
  },
  {
    id: "wildlife-macro",
    name: "野生动物微距",
    description: "自然特写，强调质感与眼神光。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Wildlife macro photograph, extreme detail in fur or feather texture, catchlight in the eye, creamy bokeh background, natural early morning light, telephoto compression",
    ratio: "3:2",
  },
  {
    id: "travel-postcard",
    name: "旅行明信片",
    description: "强地点氛围的旅行图，适合游记封面。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Travel postcard scene with a strong sense of place, iconic landscape or streetscape, golden hour light, saturated but believable color, classic postcard framing",
    ratio: "3:2",
  },
  {
    id: "food-delivery-hero",
    name: "外卖主图",
    description: "让人有食欲的餐品图，适合菜单与横幅。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Appetizing food photograph for a delivery banner, hero dish in sharp focus, steam and fresh garnish, warm overhead light, clean surface with props out of focus, rich appetizing color",
    ratio: "16:9",
  },
  {
    id: "recipe-card",
    name: "菜谱头图",
    description: "菜谱配图，主体突出并留出文字区。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Recipe hero photograph shot from a 45 degree angle, single dish as clear focal point, soft natural window light, muted linen and ceramic props, generous negative space for text",
    ratio: "3:4",
  },
  {
    id: "food-guide-cover",
    name: "美食指南封面",
    description: "本地美食专题封面，氛围优先。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Local food guide cover photograph, bustling market or eatery atmosphere, warm ambient light, layered depth with foreground blur, documentary feel, space at the top for a title",
    ratio: "3:4",
  },
  {
    id: "event-recap",
    name: "活动回顾图",
    description: "活动现场氛围图，适合复盘与社媒。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Event recap photograph, candid crowd moment in a well lit venue, warm stage glow, motion in the background with a sharp foreground subject, energetic documentary framing",
    ratio: "3:2",
  },
  {
    id: "nonprofit-hero",
    name: "公益主图",
    description: "尊重被摄者的公益宣传图。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Respectful nonprofit campaign photograph, community activity in natural daylight, dignified framing at eye level, honest documentary tone, warm and hopeful without staging",
    ratio: "16:9",
  },
  {
    id: "listing-social",
    name: "房源营销图",
    description: "房源社媒图，突出采光与空间感。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Property marketing photograph of a bright living space, corrected vertical lines, abundant natural light, tasteful minimal staging, wide angle without distortion",
    ratio: "3:2",
  },
  {
    id: "bw-editorial",
    name: "黑白编辑风",
    description: "把照片转成高对比黑白，带胶片颗粒。",
    category: "摄影",
    mode: "i2i",
    prompt:
      "Convert this photograph to a black and white editorial treatment, strong tonal contrast with retained shadow detail, subtle film grain, no color cast, keep composition and subject unchanged",
    ratio: "auto",
  },
  {
    id: "vintage-film",
    name: "复古胶片",
    description: "克制的复古胶片色，不改变构图。",
    category: "摄影",
    mode: "i2i",
    prompt:
      "Apply a restrained vintage film look to this photo, slightly lifted blacks, warm highlights, gentle halation and fine grain, preserve composition subject and framing exactly",
    ratio: "auto",
  },
  {
    id: "heritage-colorize",
    name: "老照片上色",
    description: "为黑白老照片加可信的克制色彩。",
    category: "摄影",
    mode: "i2i",
    prompt:
      "Add believable restrained color to this black and white photograph, period accurate muted tones, natural skin tones, no oversaturation, preserve every original detail and grain structure",
    ratio: "auto",
  },
  {
    id: "faded-restoration",
    name: "褪色照片修复",
    description: "修复褪色、划痕与折痕，还原自然细节。",
    category: "摄影",
    mode: "i2i",
    prompt:
      "Restore this faded and damaged photograph, remove scratches creases and dust, recover natural contrast and color balance, reconstruct detail conservatively without inventing new features",
    ratio: "auto",
  },
  {
    id: "wedding-grade",
    name: "婚纱照调色",
    description: "柔和编辑感调色，适合婚礼与情侣照。",
    category: "摄影",
    mode: "i2i",
    prompt:
      "Apply a soft editorial color grade to this wedding photo, airy highlights, gentle warm skin tones, desaturated greens, film like roll off, keep the original composition untouched",
    ratio: "auto",
  },
  {
    id: "kitchen-staging",
    name: "厨房软装",
    description: "在不改结构的前提下优化厨房陈设。",
    category: "摄影",
    mode: "i2i",
    prompt:
      "Stage this kitchen photo with tasteful minimal props and tidy surfaces, improve lighting to bright natural daylight, preserve the existing layout cabinetry and architecture exactly",
    ratio: "auto",
  },
  {
    id: "airbnb-staging",
    name: "民宿摆拍",
    description: "为短租房源图做软装，不改建筑结构。",
    category: "摄影",
    mode: "i2i",
    prompt:
      "Stage this room for a short term rental listing, add warm textiles and simple decor, brighten to inviting natural light, keep walls windows and room structure completely unchanged",
    ratio: "auto",
  },
  {
    id: "nail-color-tryon",
    name: "美甲试色",
    description: "在手部照片上预览甲油颜色。",
    category: "摄影",
    mode: "i2i",
    prompt:
      "Preview a different nail polish color on this hand photo, natural highlights and edge definition on each nail, preserve skin texture hand pose and background lighting exactly",
    ratio: "auto",
  },
  {
    id: "marketplace-thumb",
    name: "电商方图",
    description: "把商品图裁成清晰的方形主图。",
    category: "摄影",
    mode: "i2i",
    prompt:
      "Turn this product photo into a crisp square marketplace thumbnail, subject centered with even margins, clean bright background, sharp edges, preserve product shape color and labeling",
    ratio: "1:1",
  },
  {
    id: "handheld-scale",
    name: "手持比例参考",
    description: "用手持展示商品尺寸，保持商品原样。",
    category: "摄影",
    mode: "i2i",
    prompt:
      "Place this product in a hand to communicate its real scale, natural grip and realistic skin tones, soft studio light, preserve the product proportions material and label exactly",
    ratio: "1:1",
  },
  {
    id: "architecture-detail",
    name: "建筑细部",
    description: "几何感强的建筑局部，适合封面与背景。",
    category: "摄影",
    mode: "t2i",
    prompt:
      "Architectural detail photograph, strong repeating geometry, hard directional sunlight creating crisp shadow lines, minimal palette of concrete and sky, graphic composition",
    ratio: "3:4",
  },

  // ——— 插画（续） ———
  {
    id: "math-concept",
    name: "数学概念图",
    description: "把抽象概念画成图形，不堆公式。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Illustration visualizing an abstract mathematical concept through pure geometry and color relationships, clean vector shapes, no formulas or dense labels, generous white space, editorial palette",
    ratio: "1:1",
  },
  {
    id: "cloud-architecture",
    name: "云架构示意",
    description: "高层架构图，不涉及具体实现细节。",
    category: "插图",
    mode: "t2i",
    prompt:
      "High level cloud architecture illustration, simplified boxes and connectors in isometric perspective, calm technical palette, clear visual hierarchy, no readable text or real code",
    ratio: "16:9",
  },
  {
    id: "timeline-visual",
    name: "时间线视觉",
    description: "历史或产品演进的时间线插图。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Horizontal timeline illustration with evenly spaced milestone markers, flat illustrative style, muted historical palette, decorative period motifs, label areas intentionally left blank",
    ratio: "16:9",
  },
  {
    id: "flashcard-art",
    name: "识字卡插画",
    description: "友好的教学卡片插图，留出文字位。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Friendly educational flashcard illustration, single clear subject on a soft solid background, rounded shapes and warm cheerful palette, empty band at the bottom for a word",
    ratio: "1:1",
  },
  {
    id: "climate-report",
    name: "气候报告插图",
    description: "环境议题的报告配图，克制不说教。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Climate and sustainability report illustration, stylized landscape with subtle data inspired shapes, restrained natural palette of greens and blues, calm informative tone, no dense labels",
    ratio: "16:9",
  },
  {
    id: "fintech-trust",
    name: "金融科技插图",
    description: "强调安全与信任感的金融配图。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Fintech illustration conveying security and trust, abstract shield and layered card motifs, geometric flat style, confident blue and deep navy palette with one warm accent, clean composition",
    ratio: "16:9",
  },
  {
    id: "healthcare-explainer",
    name: "医疗科普图",
    description: "非诊断性的健康科普插图。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Non diagnostic healthcare explainer illustration, soft rounded human and organic forms, gentle teal and warm neutral palette, reassuring approachable tone, no medical claims or labels",
    ratio: "16:9",
  },
  {
    id: "journal-visual",
    name: "手账情绪图",
    description: "温柔的心理健康与习惯养成配图。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Gentle mental wellness illustration, a quiet figure in a soft interior, warm muted palette, hand drawn texture, calm and unhurried mood, generous breathing space",
    ratio: "3:4",
  },
  {
    id: "supply-chain",
    name: "供应链图示",
    description: "物流与库存流程的运营插图。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Operations illustration of a supply chain flow, simplified vehicles warehouses and route lines, isometric perspective, clean industrial palette, clear left to right reading order",
    ratio: "16:9",
  },
  {
    id: "ai-workflow-hero",
    name: "AI 流程头图",
    description: "自动化与工作流文章的头图。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Blog header illustration about AI workflows and automation, abstract nodes and flowing connections, subtle gradient depth, modern technical palette, balanced wide composition",
    ratio: "16:9",
  },
  {
    id: "oss-project",
    name: "开源项目图",
    description: "适合 README 与发布贴的项目视觉。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Open source project visual, abstract modular blocks assembling into a whole, flat vector style with crisp edges, developer friendly dark palette with a bright accent, centered composition",
    ratio: "16:9",
  },
  {
    id: "api-docs-hero",
    name: "接口文档头图",
    description: "开发者文档头图，有代码结构但无真代码。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Developer documentation hero illustration, abstract code block shapes and bracket motifs, monospace inspired rhythm without readable text, dark editor palette with syntax color accents",
    ratio: "16:9",
  },
  {
    id: "legal-doc-visual",
    name: "法务流程图",
    description: "中性的合同与文档流程配图。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Neutral legal technology illustration, stacked document shapes with seal and signature motifs, restrained navy and warm paper palette, orderly geometric composition, no readable text",
    ratio: "16:9",
  },
  {
    id: "impact-report",
    name: "影响力报告图",
    description: "公益年报封面视觉。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Impact report cover illustration, abstract community and growth motifs, hopeful warm palette, flat shapes with subtle grain texture, clear empty area for a report title",
    ratio: "3:4",
  },
  {
    id: "course-cover",
    name: "在线课程封面",
    description: "课程落地页与卡片的封面图。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Online course cover illustration, clear central subject metaphor, bold flat shapes, confident two color palette with a bright accent, strong silhouette that stays readable when small",
    ratio: "16:9",
  },
  {
    id: "spell-card-art",
    name: "卡牌插画",
    description: "桌游或数字卡牌的中心画面。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Fantasy card game central artwork, dramatic magical effect as the focal point, painterly rendering with strong rim light, rich saturated palette, composition framed for a card border",
    ratio: "3:4",
  },
  {
    id: "region-map",
    name: "奇幻地图",
    description: "装饰性地图底稿，地名后期再加。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Decorative fantasy region map, hand drawn coastlines mountains and forests, aged parchment texture, compass rose and border ornament, all place labels intentionally left blank",
    ratio: "4:3",
  },
  {
    id: "neighborhood-map",
    name: "街区手绘地图",
    description: "本地指南用的装饰性地图。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Charming hand illustrated neighborhood map, simplified buildings parks and streets from a slightly tilted top view, warm friendly palette, decorative but clear, no text labels",
    ratio: "1:1",
  },
  {
    id: "museum-diorama",
    name: "微缩场景",
    description: "微缩模型质感，适合科普与历史。",
    category: "插图",
    mode: "t2i",
    prompt:
      "Miniature diorama scene with tilt shift depth of field, handcrafted model materials, warm museum spotlighting, meticulous small scale detail, dark neutral surround",
    ratio: "3:2",
  },
  {
    id: "comic-panel",
    name: "漫画分格",
    description: "把画面转成漫画质感，带网点。",
    category: "插图",
    mode: "i2i",
    prompt:
      "Turn this image into a bold comic book panel, heavy confident inking, limited flat color fills, controlled halftone dot texture, dynamic contrast, keep the original subject recognizable",
    ratio: "auto",
  },
  {
    id: "editorial-ink",
    name: "编辑线描",
    description: "高对比钢笔线稿，适合专栏配图。",
    category: "插图",
    mode: "i2i",
    prompt:
      "Convert this photo into high contrast editorial ink linework, confident varied line weight, cross hatching for shadow, pure white background, no gray tones",
    ratio: "auto",
  },
  {
    id: "clay-render",
    name: "黏土渲染",
    description: "柔软的黏土质感 3D 效果。",
    category: "插图",
    mode: "i2i",
    prompt:
      "Turn the subject into a soft clay like 3D render, matte modeling clay material with visible thumb texture, rounded simplified forms, soft studio light, pastel background",
    ratio: "auto",
  },
  {
    id: "watercolor-portrait",
    name: "水彩人像",
    description: "柔和水彩风，保留可辨识的五官。",
    category: "插图",
    mode: "i2i",
    prompt:
      "Transform this portrait into a soft watercolor illustration, wet edges and paper bleed, loose brushwork with white paper showing through, keep facial features clearly recognizable",
    ratio: "auto",
  },
  {
    id: "minimal-line-avatar",
    name: "极简线条头像",
    description: "单线条头像，克制而优雅。",
    category: "插图",
    mode: "i2i",
    prompt:
      "Create an elegant minimal line art avatar from this portrait, single consistent line weight, only essential contours, flat solid background, no shading, preserve recognizable features",
    ratio: "1:1",
  },
  {
    id: "pet-oil-portrait",
    name: "宠物油画",
    description: "把宠物照画成古典油画肖像。",
    category: "插图",
    mode: "i2i",
    prompt:
      "Turn this pet photo into a classical oil portrait, visible brush strokes and impasto texture, dark rich background with a warm key light, dignified pose, preserve markings and expression",
    ratio: "3:4",
  },

  // ——— 商品（续） ———
  {
    id: "floating-product-ad",
    name: "悬浮商品广告",
    description: "商品悬浮的现代广告视觉。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Modern floating product advertisement, item suspended in mid air with a soft contact shadow below, gradient studio backdrop, crisp rim light, generous empty space for headline copy",
    ratio: "1:1",
  },
  {
    id: "watch-macro",
    name: "腕表微距",
    description: "精密器物特写，控制高光。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Premium watch macro photograph, extreme detail on dial texture and case chamfers, controlled specular highlights, dark gradient background, precise focus stacking look",
    ratio: "1:1",
  },
  {
    id: "sneaker-street",
    name: "球鞋街头广告",
    description: "城市光感下的球鞋大片。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Sneaker campaign photograph, product hero on urban concrete, dramatic mixed street lighting with colored reflections, wet ground bounce, strong product focus, night mood",
    ratio: "1:1",
  },
  {
    id: "supplement-clean",
    name: "健康品净场",
    description: "干净的保健品场景，不做疗效暗示。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Clean wellness product scene, supplement bottle on a bright neutral surface with fresh botanical props, soft even daylight, airy minimal styling, no medical claims or text",
    ratio: "1:1",
  },
  {
    id: "candle-cozy",
    name: "香薰暖场景",
    description: "居家香氛的温暖生活场景。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Warm lifestyle scene for a candle or home fragrance, soft flickering light, layered linen and wood textures, cozy evening atmosphere, shallow depth of field, muted earthy palette",
    ratio: "1:1",
  },
  {
    id: "pet-supplies",
    name: "宠物用品图",
    description: "友好的宠物周边商品图。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Friendly pet accessory product photograph, playful arrangement on a bright pastel surface, soft even light, cheerful approachable palette, clean catalog styling",
    ratio: "1:1",
  },
  {
    id: "furniture-context",
    name: "家具场景图",
    description: "把家具放进可信的房间环境。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Furniture piece shown in a believable room context, natural window light with soft shadows, complementary but understated decor, architectural framing, realistic material rendering",
    ratio: "3:2",
  },
  {
    id: "skincare-shelf",
    name: "护肤置物架",
    description: "浴室置物架上的护肤陈列。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Clean bathroom shelf scene for skincare products, stone and ceramic surfaces, soft diffused daylight, restrained neutral palette, calm spa like styling, orderly arrangement",
    ratio: "1:1",
  },
  {
    id: "travel-gear-flatlay",
    name: "旅行装备平铺",
    description: "打包清单式的物品平铺图。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Travel gear flat lay from directly above, organized grid of packing essentials, even soft light, muted utilitarian palette, tidy geometric spacing on a textured surface",
    ratio: "1:1",
  },
  {
    id: "toy-package",
    name: "玩具包装渲染",
    description: "收藏玩具的包装概念图。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Collectible toy packaging concept render, blister box with a clear window, bold graphic panels with no readable text, studio product lighting, vibrant retail shelf appeal",
    ratio: "3:4",
  },
  {
    id: "accessory-campaign",
    name: "配饰广告",
    description: "箱包与配饰的品牌广告图。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Accessory campaign visual for bags and small leather goods, sculptural arrangement on a colored pedestal, hard directional light with clean shadows, editorial fashion palette",
    ratio: "3:4",
  },
  {
    id: "retail-popup",
    name: "快闪店陈列",
    description: "线下快闪的紧凑陈列概念。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Compact retail pop up display concept, modular shelving with product arrangement, bold brand color blocking, even retail lighting, clean signage areas left blank",
    ratio: "3:2",
  },
  {
    id: "spa-package",
    name: "水疗套餐图",
    description: "适合礼卡与预约页的疗愈图。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Calming spa promotional image, folded towels stones and botanicals, warm soft lighting with gentle steam, muted natural palette, serene uncluttered composition",
    ratio: "3:2",
  },
  {
    id: "seasonal-banner",
    name: "季节促销横幅",
    description: "克制的电商促销图，不堆折扣字。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Tasteful seasonal ecommerce banner, product grouping with seasonal props, warm festive but restrained styling, wide letterbox composition, clear empty zone for promotional copy",
    ratio: "16:9",
  },
  {
    id: "phone-editor-preview",
    name: "手机端预览",
    description: "商品在手机界面里的展示效果。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Product shown inside a modern smartphone screen mockup held at a slight angle, clean studio background, realistic screen reflection, sharp device edges, generous surrounding space",
    ratio: "3:4",
  },
  {
    id: "before-after-cleanup",
    name: "商品图前后对比",
    description: "把粗糙商品图变成干净成品的对比。",
    category: "产品",
    mode: "i2i",
    prompt:
      "Create a clean side by side comparison from this rough product photo, left side untouched and right side cleaned with even lighting and a neutral background, preserve the product exactly",
    ratio: "16:9",
  },
  {
    id: "sneakers-onfeet",
    name: "球鞋上脚图",
    description: "参考图生成上脚的生活方式照。",
    category: "产品",
    mode: "i2i",
    prompt:
      "Create an on feet lifestyle shot from this sneaker reference, natural walking stance on textured pavement, soft daylight, preserve the shoe silhouette colorway and branding exactly",
    ratio: "3:4",
  },
  {
    id: "watch-wrist-tryon",
    name: "腕表上手",
    description: "在手腕照片上预览腕表佩戴效果。",
    category: "产品",
    mode: "i2i",
    prompt:
      "Preview this watch on a wrist photo, believable strap fit and perspective, matching light direction and skin tone, preserve the hand pose background and the watch design exactly",
    ratio: "1:1",
  },
  {
    id: "product-shadow-fix",
    name: "商品影子修正",
    description: "为商品补自然的落地阴影与反射。",
    category: "产品",
    mode: "i2i",
    prompt:
      "Add a natural contact shadow and subtle surface reflection under this product, consistent with a single soft key light, clean seamless background, preserve product shape and color",
    ratio: "auto",
  },
  {
    id: "color-variant",
    name: "配色变体",
    description: "同一商品生成不同配色版本。",
    category: "产品",
    mode: "i2i",
    prompt:
      "Generate a different colorway of this product, apply the new color only to the main body while preserving material finish highlights logo placement and overall geometry",
    ratio: "auto",
  },
  {
    id: "gift-set-scene",
    name: "礼盒套装场景",
    description: "节日礼盒组合的成套展示。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Gift set product scene, coordinated items arranged with ribbon and tissue, warm holiday lighting, rich but restrained palette, premium unhurried styling",
    ratio: "1:1",
  },
  {
    id: "beverage-splash",
    name: "饮品动感图",
    description: "带液体动态的饮品广告图。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Beverage advertising photograph with a frozen liquid splash, condensation on the container, backlit to make the drink glow, dark gradient background, high shutter crispness",
    ratio: "3:4",
  },
  {
    id: "tech-exploded",
    name: "数码分解图",
    description: "电子产品的分解结构展示。",
    category: "产品",
    mode: "t2i",
    prompt:
      "Exploded view render of a consumer electronics device, components separated along a vertical axis, precise engineering alignment, dark studio backdrop with crisp edge lighting",
    ratio: "1:1",
  },

  // ——— 角色（续） ———
  {
    id: "cyberpunk-portrait",
    name: "赛博人像",
    description: "霓虹光效的未来感人物。",
    category: "人物",
    mode: "t2i",
    prompt:
      "Cyberpunk character portrait, neon rim lighting in cyan and magenta, rain slicked city bokeh behind, detailed techwear costume, cinematic close up framing, moody dark palette",
    ratio: "3:4",
  },
  {
    id: "fantasy-character-card",
    name: "奇幻角色卡",
    description: "带背景氛围的角色立绘。",
    category: "人物",
    mode: "t2i",
    prompt:
      "Fantasy character card illustration, full body hero pose with detailed costume and props, atmospheric environment behind, painterly rendering, dramatic key light, vertical card framing",
    ratio: "3:4",
  },
  {
    id: "stylized-game-character",
    name: "风格化游戏角色",
    description: "适合游戏立项的角色概念。",
    category: "人物",
    mode: "t2i",
    prompt:
      "Stylized game character concept, exaggerated proportions with clear silhouette, hand painted texture look, neutral turnaround pose, flat studio background, consistent design language",
    ratio: "3:4",
  },
  {
    id: "rpg-sheet",
    name: "角色设定表",
    description: "正侧背三视图的角色设定。",
    category: "人物",
    mode: "t2i",
    prompt:
      "Character design sheet with front side and back views aligned on a common baseline, consistent proportions and costume details across all views, flat neutral background, clean line and color",
    ratio: "16:9",
  },
  {
    id: "cute-robot-mascot",
    name: "机器人吉祥物",
    description: "圆润可爱的机器人形象。",
    category: "人物",
    mode: "t2i",
    prompt:
      "Cute robot mascot character, rounded friendly geometry, glossy 3D render with soft studio lighting, expressive simple face, cheerful two color palette, centered on a plain background",
    ratio: "1:1",
  },
  {
    id: "author-headshot-illust",
    name: "作者头像插画",
    description: "适合简介与个人站的插画头像。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Create a professional illustrated headshot from this portrait, clean editorial illustration style, limited warm palette, simple background, keep facial structure and features recognizable",
    ratio: "1:1",
  },
  {
    id: "creator-avatar",
    name: "创作者头像",
    description: "适合频道与社群的友好头像。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Turn this portrait into a friendly creator avatar, bold outlines and simplified shading, vivid accent background, approachable expression, preserve recognizable facial features and hairstyle",
    ratio: "1:1",
  },
  {
    id: "pet-avatar",
    name: "宠物头像",
    description: "把宠物照做成精致头像，保留花纹。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Turn this pet photo into a polished avatar, clean circular composition, soft studio lighting, vibrant solid background, preserve the animal markings fur texture and expression exactly",
    ratio: "1:1",
  },
  {
    id: "outfit-swap",
    name: "换装对比",
    description: "在保留人物的前提下更换服装。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Change the clothing in this portrait to a different outfit, believable fabric drape and fit matching the pose, consistent lighting, preserve the face body proportions and background unchanged",
    ratio: "auto",
  },
  {
    id: "evening-gown-tryon",
    name: "礼服试穿",
    description: "预览正式礼服的穿着效果。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Preview an elegant evening gown on this photo, natural fabric flow and realistic fit to the existing pose, matching light direction, keep the face hair and background completely unchanged",
    ratio: "3:4",
  },
  {
    id: "blazer-tryon",
    name: "西装试穿",
    description: "把休闲装换成正式西装外套。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Change the casual clothing in this portrait into a well tailored blazer, realistic shoulder fit lapel and fabric texture, consistent lighting, preserve face pose and background exactly",
    ratio: "3:4",
  },
  {
    id: "jacket-tryon",
    name: "外套试穿",
    description: "在原图上试穿夹克或外套。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Try a streetwear jacket on this portrait, believable layering over existing clothing, natural folds and shadow, matching ambient light, keep the subject pose and setting unchanged",
    ratio: "3:4",
  },
  {
    id: "sunglasses-tryon",
    name: "墨镜试戴",
    description: "加上墨镜并保持光线可信。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Add sunglasses to this portrait, correct fit to face geometry, realistic lens reflection and shadow on the nose bridge, preserve facial features pose and lighting direction exactly",
    ratio: "auto",
  },
  {
    id: "cap-tryon",
    name: "帽子试戴",
    description: "在人像上自然地加一顶帽子。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Add a baseball cap to this portrait, believable fit over the hairline with a natural brim shadow, matching light direction and color temperature, preserve the face and background",
    ratio: "auto",
  },
  {
    id: "necklace-tryon",
    name: "项链试戴",
    description: "预览项链的垂坠与比例。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Show a necklace on this portrait, natural drape following the neckline and correct scale, realistic metal highlights matching the scene light, preserve skin texture and identity",
    ratio: "auto",
  },
  {
    id: "earrings-tryon",
    name: "耳饰试戴",
    description: "在人像上预览耳饰效果。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Preview earrings on this portrait, accurate placement and scale relative to the ear, realistic material highlights and subtle shadow, keep the face hairstyle and lighting unchanged",
    ratio: "auto",
  },
  {
    id: "lipstick-tryon",
    name: "口红试色",
    description: "换口红颜色但保留唇部质感。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Preview a different lipstick shade on this portrait, natural lip texture and highlight retained, believable edge definition, preserve skin tone facial identity and lighting exactly",
    ratio: "auto",
  },
  {
    id: "eyeshadow-tryon",
    name: "眼妆试色",
    description: "预览自然眼影效果。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Preview subtle eyeshadow on this portrait, soft natural blending in the crease, believable color intensity, preserve eye shape lashes skin texture and overall facial identity",
    ratio: "auto",
  },
  {
    id: "hair-color-preview",
    name: "发色预览",
    description: "换发色但保留发型与光线。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Preview a different hair color on this portrait, natural root to tip variation and realistic shine, preserve the exact hairstyle strand detail facial features and scene lighting",
    ratio: "auto",
  },
  {
    id: "haircut-preview",
    name: "发型预览",
    description: "预览新发型，不改动五官。",
    category: "人物",
    mode: "i2i",
    prompt:
      "Preview a neat shorter haircut on this portrait, natural hairline and volume, believable strand detail, keep the face proportions expression background and lighting completely unchanged",
    ratio: "auto",
  },

  // ——— 字体排版（续） ———
  {
    id: "album-cover-ambient",
    name: "氛围专辑封面",
    description: "情绪强烈的方形专辑封面底图。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Square ambient music album cover, abstract atmospheric gradient with grain texture, strong single mood, deep restrained palette, no lettering anywhere, room for type to be added later",
    ratio: "1:1",
  },
  {
    id: "scifi-book-cover",
    name: "科幻书封",
    description: "克制的科幻封面方向。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Minimal science fiction book cover direction, single bold geometric motif against a vast empty field, restrained two color palette, subtle grain, clear vertical space reserved for the title",
    ratio: "2:3",
  },
  {
    id: "mystery-book-cover",
    name: "悬疑书封",
    description: "带氛围感的小说封面底稿。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Atmospheric mystery novel cover direction, moody illustrated scene with fog and a single light source, muted desaturated palette, cinematic vignette, generous title area at the top",
    ratio: "2:3",
  },
  {
    id: "bold-ad-type",
    name: "大字广告版式",
    description: "强冲击的大字广告底图。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Bold advertising layout background, oversized geometric shapes creating a strong grid, high contrast complementary colors, deliberate asymmetric balance, wide clear zones for large type",
    ratio: "16:9",
  },
  {
    id: "hand-lettered-quote",
    name: "手写金句卡",
    description: "手写感的语录卡底图。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Hand lettered quote card background, organic brush texture and ink splatter framing an empty center, warm paper tone, natural imperfect edges, calm crafted feel",
    ratio: "1:1",
  },
  {
    id: "meetup-poster",
    name: "技术沙龙海报",
    description: "开发者活动的干净海报方向。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Clean tech meetup poster direction, precise modular grid with abstract code inspired shapes, confident dark background with one bright accent, structured empty bands for event details",
    ratio: "2:3",
  },
  {
    id: "music-night-poster",
    name: "音乐现场海报",
    description: "小型演出海报的视觉方向。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Live music night poster direction, energetic abstract light streaks and grain, saturated duotone palette, gritty texture overlay, strong empty area reserved for lineup type",
    ratio: "2:3",
  },
  {
    id: "film-screening-poster",
    name: "放映会海报",
    description: "文艺放映活动的氛围海报。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Atmospheric film screening poster concept, single evocative image with heavy negative space, muted cinematic palette, subtle halftone grain, classic art house composition",
    ratio: "2:3",
  },
  {
    id: "farmers-market-poster",
    name: "市集海报",
    description: "温暖的社区市集海报底图。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Warm community market poster base, hand drawn produce motifs arranged as a border, sunny earthy palette, textured paper feel, open center left empty for event copy",
    ratio: "2:3",
  },
  {
    id: "risograph-poster",
    name: "孔版印刷海报",
    description: "限色套印质感的海报方向。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Risograph style poster direction, two ink layers with visible misregistration, bold simplified shapes, coarse paper grain, limited fluorescent palette, strong graphic impact",
    ratio: "2:3",
  },
  {
    id: "workshop-poster-base",
    name: "工作坊海报底",
    description: "社区活动海报底稿，文字后期加。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Community workshop poster base, friendly abstract shapes in a soft warm palette, clear structural zones, gentle paper texture, all text areas intentionally left blank",
    ratio: "2:3",
  },
  {
    id: "menu-board",
    name: "菜单板视觉",
    description: "餐饮菜单板的版式方向。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Cafe menu board visual direction, dark chalkboard surface with decorative botanical corners, warm rim lighting, clearly defined empty columns where menu items will be set",
    ratio: "4:3",
  },
  {
    id: "flyer-base",
    name: "服务传单底图",
    description: "本地服务传单的底稿。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Local service flyer base layout, clean color block bands with a strong diagonal, professional trustworthy palette, generous blank areas for headline body and contact details",
    ratio: "2:3",
  },
  {
    id: "handbook-cover",
    name: "手册封面",
    description: "简洁的员工手册封面底图。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Clean employee handbook cover background, restrained geometric pattern in corporate neutral tones, subtle depth, professional and calm, large empty area reserved for the title",
    ratio: "3:4",
  },
  {
    id: "linkedin-banner",
    name: "职业主页横幅",
    description: "职业社交主页的背景横幅。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Professional profile banner background, wide abstract gradient with soft geometric layering, calm confident palette, no text embedded, left side kept visually quiet for an avatar overlay",
    ratio: "16:9",
  },
  {
    id: "personal-brand-banner",
    name: "个人品牌横幅",
    description: "个人站或简历的头部背景。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Personal brand banner background, minimal abstract composition with a single accent shape, refined muted palette, plenty of empty space, understated and modern",
    ratio: "16:9",
  },
  {
    id: "report-cover",
    name: "报告封面",
    description: "专业报告与白皮书的封面。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Professional report cover design, structured grid with a bold abstract data inspired graphic, corporate palette with one strong accent, clear hierarchy zones left blank for type",
    ratio: "3:4",
  },
  {
    id: "tiktok-tutorial-cover",
    name: "竖版教程封面",
    description: "竖屏教程封面，留出前后对比区。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Vertical tutorial cover layout, split composition with two clear panels for a before and after visual, bold divider, high contrast palette, empty band at the top for a hook headline",
    ratio: "9:16",
  },
  {
    id: "wedding-suite",
    name: "婚礼请柬套系",
    description: "请柬与卡片的整套视觉方向。",
    category: "排版",
    mode: "t2i",
    prompt:
      "Wedding stationery suite direction, coordinated invitation cards laid out flat, delicate botanical line work, soft blush and cream palette, elegant spacing, text areas left blank",
    ratio: "4:3",
  },

  // ——— 界面稿（续） ———
  {
    id: "finance-mobile-home",
    name: "理财 App 首页",
    description: "层级清晰、观感可信的金融首页。",
    category: "UI模型",
    mode: "t2i",
    prompt:
      "Mobile finance app home screen mockup, clear balance card at the top, tidy transaction list below, trustworthy blue and neutral palette, generous spacing, crisp modern UI rendering",
    ratio: "9:16",
  },
  {
    id: "invoice-ui",
    name: "发票管理界面",
    description: "面向小企业的账务软件界面。",
    category: "UI模型",
    mode: "t2i",
    prompt:
      "Invoice management software interface mockup, sidebar navigation with a dense data table and status chips, calm professional palette, clear typographic hierarchy, desktop viewport framing",
    ratio: "16:9",
  },
  {
    id: "budget-planner",
    name: "预算规划界面",
    description: "带图表的记账与预算视图。",
    category: "UI模型",
    mode: "t2i",
    prompt:
      "Budget planning app screen, donut chart and category breakdown bars, friendly rounded cards, soft pastel accents on a light background, clean readable layout",
    ratio: "16:9",
  },
  {
    id: "telehealth-mockup",
    name: "问诊 App 界面",
    description: "在线医疗产品的界面稿。",
    category: "UI模型",
    mode: "t2i",
    prompt:
      "Telehealth product screen mockup, video consultation layout with appointment cards, calm teal and white palette, accessible spacing and contrast, modern medical product styling",
    ratio: "16:9",
  },
  {
    id: "app-feature-graphic",
    name: "应用商店主图",
    description: "带手机样机的应用商店特色图。",
    category: "UI模型",
    mode: "t2i",
    prompt:
      "App store feature graphic, two floating phone mockups at a slight angle on a bold gradient background, soft device shadows, clear empty copy zone on one side",
    ratio: "16:9",
  },
  {
    id: "game-inventory-icons",
    name: "游戏道具图标",
    description: "风格统一的道具图标组。",
    category: "UI模型",
    mode: "t2i",
    prompt:
      "Cohesive game inventory icon set arranged in a grid, consistent lighting angle and outline weight across all items, rich fantasy material palette, dark slot backgrounds",
    ratio: "1:1",
  },
  {
    id: "isometric-tool-map",
    name: "产品系统图",
    description: "等距视角的产品能力全景图。",
    category: "UI模型",
    mode: "t2i",
    prompt:
      "Isometric system map for a product explainer, connected modules and pathways on a soft grid plane, clean technical palette with one accent, orderly depth, no readable text",
    ratio: "16:9",
  },
  {
    id: "floorplan-visual",
    name: "户型示意图",
    description: "干净的三维户型图。",
    category: "UI模型",
    mode: "t2i",
    prompt:
      "Clean 3D floorplan visual viewed from above at a slight tilt, simplified furniture blocks, soft ambient occlusion, light neutral materials with one accent color, no dimension labels",
    ratio: "4:3",
  },
  {
    id: "settings-screen",
    name: "设置页界面",
    description: "分组清晰的设置页样式。",
    category: "UI模型",
    mode: "t2i",
    prompt:
      "Mobile settings screen mockup, grouped preference rows with toggles and chevrons, clear section headers, restrained neutral palette, generous vertical rhythm, crisp rendering",
    ratio: "9:16",
  },
  {
    id: "analytics-chart-set",
    name: "数据图表组",
    description: "成套的图表组件展示。",
    category: "UI模型",
    mode: "t2i",
    prompt:
      "Analytics chart component set, line area and bar charts arranged as cards, consistent axis styling and one accent color, light dashboard background, precise clean rendering",
    ratio: "16:9",
  },
  {
    id: "checkout-flow",
    name: "结算流程界面",
    description: "电商结算步骤的界面稿。",
    category: "UI模型",
    mode: "t2i",
    prompt:
      "Ecommerce checkout flow mockup, step indicator with order summary and payment form, trustworthy neutral palette with a green confirmation accent, clear field hierarchy",
    ratio: "16:9",
  },

  // ——— 风景（续） ———
  {
    id: "misty-forest",
    name: "晨雾森林",
    description: "有层次纵深的雾中林地。",
    category: "风景",
    mode: "t2i",
    prompt:
      "Misty forest at dawn, layered depth of tree silhouettes fading into fog, shafts of low sunlight, muted green and grey palette, quiet contemplative atmosphere",
    ratio: "3:2",
  },
  {
    id: "coastal-cliffs",
    name: "海岸悬崖",
    description: "开阔的海岸线，长曝光水面。",
    category: "风景",
    mode: "t2i",
    prompt:
      "Dramatic coastal cliff landscape, long exposure smoothing the sea into mist, moody overcast sky with a break of light, deep teal and slate palette, wide cinematic framing",
    ratio: "16:9",
  },
  {
    id: "northern-lights",
    name: "极光夜空",
    description: "极光下的雪原夜景。",
    category: "风景",
    mode: "t2i",
    prompt:
      "Aurora borealis over a snow covered valley, vivid green and violet ribbons across a star filled sky, faint moonlight on the snow, crisp cold air clarity, wide landscape composition",
    ratio: "16:9",
  },
  {
    id: "terraced-fields",
    name: "梯田晨光",
    description: "有强烈线条感的农田风景。",
    category: "风景",
    mode: "t2i",
    prompt:
      "Terraced rice fields at sunrise, sweeping curved contour lines catching warm light, thin morning mist in the valleys, layered depth, saturated but natural greens",
    ratio: "3:2",
  },
  {
    id: "canyon-overlook",
    name: "峡谷远眺",
    description: "大尺度地貌的开阔远景。",
    category: "风景",
    mode: "t2i",
    prompt:
      "Vast canyon overlook at golden hour, layered rock strata receding into atmospheric haze, deep shadows in the ravines, warm ochre and violet palette, epic scale",
    ratio: "16:9",
  },
  {
    id: "game-environment",
    name: "游戏场景概念",
    description: "宽幅的游戏环境概念图。",
    category: "风景",
    mode: "t2i",
    prompt:
      "Wide game environment concept art, a landmark structure anchoring the composition, atmospheric perspective with three depth layers, painterly rendering, dramatic directional light",
    ratio: "16:9",
  },
  {
    id: "nursery-concept",
    name: "儿童房概念",
    description: "从空房照生成温柔的儿童房方案。",
    category: "风景",
    mode: "i2i",
    prompt:
      "Turn this empty room photo into a calm nursery concept, soft neutral palette with gentle wood and textile accents, warm diffused daylight, preserve the room architecture windows and proportions",
    ratio: "auto",
  },
];

/** 模板在其分类内的固定序号，用于取样图；与筛选和排序无关，保证同一张卡永远是同一张图 */
const imageIndexById = new Map<string, number>();
{
  const used = new Map<TemplateCategory, number>();
  for (const t of templates) {
    const n = used.get(t.category) ?? 0;
    imageIndexById.set(t.id, n);
    used.set(t.category, n + 1);
  }
}

export function templateImage(t: Template) {
  const list = CATEGORY_IMAGES[t.category];
  return list[(imageIndexById.get(t.id) ?? 0) % list.length];
}

export function templatesByCategory(category: TemplateCategory | "全部") {
  return category === "全部" ? templates : templates.filter((t) => t.category === category);
}

export function getTemplate(id: string) {
  return templates.find((t) => t.id === id);
}
