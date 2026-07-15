export type Lang = "ar" | "en";

/**
 * Central content source. Everything the client can see lives here so the whole
 * site can flip between Arabic (RTL) and English (LTR) from one toggle.
 *
 * الأرقام والعناوين مأخوذة من صفحة الجيم الرسمية. الأسعار والجداول أمثلة
 * احترافية جاهزة للتعديل من هنا مباشرة.
 */

export const business = {
  name: "FIT & LIFT",
  brandAr: "فيت آند ليفت",
  phonePrimary: "01009987771",
  phoneSecondary: "+201001333893",
  email: "fitandliftbenha@gmail.com",
  handle: "Fit.and.lift.gym",
  instagram: "https://instagram.com/Fit.and.lift.gym",
  facebook: "https://facebook.com/Fit.and.lift.gym",
  followers: "17K+",
  mapsQuery:
    "Fit+and+Lift+Gym+Benha+El+Felal+Hay+El+Zohour",
};

type Dict = {
  [K in Lang]: string;
};

const t = (ar: string, en: string): Dict => ({ ar, en });

export const dict = {
  dir: { ar: "rtl", en: "ltr" } as const,

  nav: {
    home: t("الرئيسية", "Home"),
    about: t("من نحن", "About"),
    services: t("خدماتنا", "Services"),
    classes: t("الحصص", "Classes"),
    pricing: t("الاشتراكات", "Pricing"),
    trainers: t("المدربين", "Coaches"),
    contact: t("تواصل", "Contact"),
    join: t("اشترك الآن", "Join Now"),
  },

  ticker: t(
    "قوة • انضباط • ريكفري • تغذية • كارديو • حديد • كروس فيت •",
    "STRENGTH • DISCIPLINE • RECOVERY • NUTRITION • CARDIO • IRON • CROSSFIT •"
  ),

  hero: {
    kicker: t("جيم كامل مش ناقصه غيرك يا بطل", "A complete gym — missing only you"),
    titleTop: t("اصنع", "BUILD"),
    titleHi: t("نسختك", "YOUR"),
    titleBottom: t("الأقوى", "STRONGEST"),
    titleAccent: t("", "SELF"),
    tagline: t(
      "الجسد يحقق ما يؤمن به العقل",
      "The body achieves what the mind believes"
    ),
    sub: t(
      "أحدث الأجهزة، مدربين محترفين، ومنطقة ريكفري متكاملة في قلب بنها. مكان واحد لكل أهدافك.",
      "State-of-the-art equipment, certified coaches, and a full recovery zone in the heart of Benha — one place for every goal."
    ),
    ctaPrimary: t("ابدأ رحلتك", "Start Your Journey"),
    ctaSecondary: t("شوف الاشتراكات", "View Plans"),
  },

  stats: [
    { value: 17000, suffix: "+", label: t("متابع على السوشيال", "Social Followers") },
    { value: 25, suffix: "+", label: t("جهاز ومعدة حديثة", "Modern Machines") },
    { value: 12, suffix: "", label: t("مدرب معتمد", "Certified Coaches") },
    { value: 40, suffix: "+", label: t("حصة أسبوعياً", "Weekly Classes") },
  ],

  about: {
    tag: t("من نحن", "About Us"),
    title: t("مش مجرد جيم.. ده أسلوب حياة", "Not just a gym — it's a lifestyle"),
    body: t(
      "في فيت آند ليفت بنبني أجسام وشخصيات. جيم متكامل مجهز بأحدث الأجهزة، بيئة محفزة، ومدربين بيمشوا معاك خطوة بخطوة من أول يوم لحد ما توصل لهدفك.",
      "At Fit & Lift we build bodies and characters. A fully-equipped facility with the latest machines, a motivating atmosphere, and coaches who walk with you step by step — from day one to your goal."
    ),
    points: [
      t("أجهزة أصلية بأعلى جودة", "Premium original equipment"),
      t("متابعة وتقييم دوري للتقدم", "Regular progress tracking"),
      t("منطقة تغذية واستشارات", "Nutrition & consultation zone"),
      t("قسم منفصل للسيدات", "Dedicated ladies section"),
    ],
    badge: t("جيم متكامل في قلب بنها", "A complete gym in the heart of Benha"),
  },

  services: {
    tag: t("خدماتنا", "What We Offer"),
    title: t("كل اللي محتاجه تحت سقف واحد", "Everything you need, under one roof"),
    items: [
      {
        icon: "dumbbell",
        title: t("تدريب الحديد", "Strength & Iron"),
        desc: t(
          "منطقة أوزان حرة وأجهزة مقاومة كاملة لكل العضلات.",
          "Full free-weights and resistance area for every muscle group."
        ),
      },
      {
        icon: "heart",
        img: "/treadmill.png",
        title: t("كارديو", "Cardio Zone"),
        desc: t(
          "أحدث أجهزة الجري والدراجات لحرق الدهون واللياقة.",
          "Latest treadmills and bikes for fat-burn and endurance."
        ),
      },
      {
        icon: "user",
        img: "/trainer.png",
        title: t("تدريب شخصي", "Personal Training"),
        desc: t(
          "برنامج مصمم ليك انت بمدرب خاص يتابع كل تمرين.",
          "A plan designed for you with a dedicated 1-on-1 coach."
        ),
      },
      {
        icon: "spa",
        title: t("ريكفري واستشفاء", "Recovery & Spa"),
        desc: t(
          "منطقة استشفاء واسترخاء لعضلاتك بعد المجهود.",
          "A recovery and relaxation zone to reset your muscles."
        ),
      },
      {
        icon: "apple",
        title: t("تغذية", "Nutrition Plans"),
        desc: t(
          "استشارة غذائية ونظام أكل يوصلك لهدفك أسرع.",
          "Diet consultation and meal plans to reach goals faster."
        ),
      },
      {
        icon: "group",
        img: "/bike.png",
        title: t("حصص جماعية", "Group Classes"),
        desc: t(
          "كروس فيت، فانكشنال، وحصص كارديو بروح الجماعة.",
          "CrossFit, functional and cardio classes with team energy."
        ),
      },
    ],
  },

  classes: {
    tag: t("المواعيد", "Timetable"),
    title: t("مواعيد الرجال والسيدات", "Men & Women Hours"),
    note: t(
      "* يوم الجمعة الجيم للرجال مقفول في الفترة الصباحية.",
      "* Friday: the men's morning session is closed."
    ),
    men: t("رجال", "Men"),
    women: t("سيدات", "Women"),
    legendMen: t("فترة الرجال", "Men's hours"),
    legendWomen: t("فترة السيدات", "Women's hours"),
    closed: "—————",
    rows: [
      { day: t("السبت", "Sat"), men1: "7AM : 3PM", women: "3PM : 9PM", men2: "9PM : 7AM" },
      { day: t("الأحد", "Sun"), men1: "7AM : 10AM", women: "10AM : 6PM", men2: "6PM : 7AM" },
      { day: t("الإثنين", "Mon"), men1: "7AM : 3PM", women: "3PM : 9PM", men2: "9PM : 7AM" },
      { day: t("الثلاثاء", "Tue"), men1: "7AM : 10AM", women: "10AM : 6PM", men2: "6PM : 7AM" },
      { day: t("الأربعاء", "Wed"), men1: "7AM : 3PM", women: "3PM : 9PM", men2: "9PM : 7AM" },
      { day: t("الخميس", "Thu"), men1: "7AM : 10AM", women: "10AM : 6PM", men2: "6PM : 12AM" },
      { day: t("الجمعة", "Fri"), men1: "", women: "3PM : 8PM", men2: "8PM : 7AM" },
    ],
  },

  trainers: {
    tag: t("الفريق", "Our Coaches"),
    title: t("مدربين بيفرقوا معاك", "Coaches who make the difference"),
    people: [
      { name: t("أحمد قمر", "Ahmed Kamar"), role: t("مدير اللياقة", "Fitness Manager"), ig: "@ahmed_kamar10", igUrl: "https://www.instagram.com/ahmed_kamar10", img: "/coach-ahmed.jpg" },
      { name: t("كابتن سارة", "Capt. Sara"), role: t("مدربة لياقة وكارديو", "Fitness & Cardio"), ig: "@sara.fit" },
      { name: t("كابتن محمد", "Capt. Mohamed"), role: t("كروس فيت وفانكشنال", "CrossFit & Functional"), ig: "@mo.fit" },
    ],
  },

  pricing: {
    tag: t("الاشتراكات", "Membership"),
    title: t("اختار مدة اشتراكك", "Choose your membership"),
    note: t(
      "* الأسعار تقديرية لأغراض العرض — تواصل معنا لأحدث العروض والخصومات.",
      "* Prices shown are sample figures — contact us for current offers."
    ),
    egp: t("ج.م", "EGP"),
    popular: t("الأوفر", "Best Value"),
    choose: t("اشترك", "Subscribe"),
    plans: [
      {
        name: t("شهر", "1 Month"),
        unit: t("لمدة شهر", "for 1 month"),
        price: "600",
        badge: t("", ""),
        features: [
          t("دخول كامل للجيم", "Full gym access"),
          t("كل الأجهزة والكارديو", "All machines & cardio"),
          t("حصص جماعية", "Group classes"),
        ],
        highlighted: false,
      },
      {
        name: t("3 شهور", "3 Months"),
        unit: t("لمدة 3 شهور", "for 3 months"),
        price: "1500",
        badge: t("وفّر 300 ج.م", "Save 300 EGP"),
        features: [
          t("كل مميزات الشهري", "Everything in monthly"),
          t("سعر أقل للشهر", "Lower monthly rate"),
          t("تجميد أسبوع", "1-week freeze"),
        ],
        highlighted: true,
      },
      {
        name: t("سنة", "12 Months"),
        unit: t("لمدة سنة كاملة", "for a full year"),
        price: "5000",
        badge: t("أوفر باقة", "Biggest saving"),
        features: [
          t("كل المميزات", "All features included"),
          t("أفضل سعر للشهر", "Best monthly rate"),
          t("تجميد شهر كامل", "1-month freeze"),
          t("حصة تدريب شخصي هدية", "Free PT session"),
        ],
        highlighted: false,
      },
    ],
    // Private coaching packages
    coachTag: t("تدريب شخصي", "Personal Training"),
    coachTitle: t("باقات البرايفت كوتش", "Private Coach Packages"),
    coachNote: t(
      "* كل باقة شاملة تحليل InBody لمتابعة تطور جسمك.",
      "* Every package includes InBody analysis to track your progress."
    ),
    sessionWord: t("حصة تدريب", "training sessions"),
    inbodyWord: t("تحليل InBody", "InBody scans"),
    coachPlans: [
      { sessions: 10, inbody: 1, price: "1500", highlighted: false },
      { sessions: 20, inbody: 2, price: "2800", highlighted: true },
      { sessions: 30, inbody: 3, price: "4000", highlighted: false },
    ],
  },

  testimonials: {
    tag: t("آراء الأعضاء", "Testimonials"),
    title: t("نتائج حقيقية.. لأبطال حقيقيين", "Real results, real champions"),
    items: [
      {
        quote: t(
          "خسيت 14 كيلو في 4 شهور. المتابعة والمدربين هنا مستوى تاني.",
          "Lost 14kg in 4 months. The coaching here is on another level."
        ),
        name: t("محمود ع.", "Mahmoud A."),
        tag: t("عضو منذ 2024", "Member since 2024"),
      },
      {
        quote: t(
          "أنضف جيم في بنها وأحسن أجهزة. الأجواء بتحفزك تيجي كل يوم.",
          "Cleanest gym in Benha with the best machines. The vibe pulls you in daily."
        ),
        name: t("سارة م.", "Sara M."),
        tag: t("قسم السيدات", "Ladies section"),
      },
      {
        quote: t(
          "منطقة الريكفري بعد التمرين بتفرق جداً. تجربة احترافية بجد.",
          "The post-workout recovery zone is a game changer. Truly pro."
        ),
        name: t("كريم ط.", "Karim T."),
        tag: t("عضو إيليت", "Elite member"),
      },
    ],
  },

  cta: {
    title: t("جاهز تبدأ؟ أول حصة علينا", "Ready to start? First session on us"),
    sub: t(
      "سجل بياناتك ونكلمك في نفس اليوم نرتب معاك زيارة تجريبية مجانية.",
      "Drop your details and we'll call you the same day to arrange a free trial."
    ),
    name: t("الاسم", "Full name"),
    phone: t("رقم الموبايل", "Phone number"),
    goal: t("هدفك من التمرين", "Your goal"),
    send: t("احجز حصتك المجانية", "Book my free session"),
    sending: t("جاري الإرسال...", "Sending..."),
    done: t("تمام! هنكلمك قريب 💪", "Got it! We'll call you soon 💪"),
  },

  contact: {
    tag: t("زورنا", "Visit Us"),
    title: t("مكاننا في بنها", "Find us in Benha"),
    address: t(
      "القليوبية، بنها، الفلل، حي الزهور، بجوار قسم ثان بنها، برج عبد الناصر، الدور الأول علوي، أمام سوبر ماركت الزهور",
      "El Felal, Hay El Zohour, Benha, Qalyubia — next to Benha 2nd Police Dept., Abdel Nasser Tower, 1st floor, opposite Zohour Supermarket"
    ),
    hours: t("مواعيد منفصلة للرجال والسيدات — شوف الجدول", "Separate men's & women's hours — see timetable"),
    call: t("اتصل بنا", "Call us"),
    directions: t("الاتجاهات", "Get Directions"),
  },

  footer: {
    rights: t("جميع الحقوق محفوظة", "All rights reserved"),
    tagline: t("الجسد يحقق ما يؤمن به العقل", "The body achieves what the mind believes"),
    made: t("جيم بنها الأول للياقة والقوة", "Benha's premier strength & fitness club"),
  },
} as const;

export function pick<T extends { ar: string; en: string }>(d: T, lang: Lang): string {
  return d[lang];
}

/** Build a WhatsApp deep link to the gym with a pre-filled message. */
export function waUrl(message: string): string {
  // Egypt country code (20) + local number without leading 0
  const local = business.phonePrimary.replace(/^0/, "");
  return `https://wa.me/20${local}?text=${encodeURIComponent(message)}`;
}

/** Ready-made WhatsApp message for a specific offer, in the active language. */
export function offerMessage(lang: Lang, offer: string): string {
  return lang === "ar"
    ? `السلام عليكم 👋 مهتم بـ: ${offer} — ممكن أعرف التفاصيل والمواعيد؟`
    : `Hi Fit & Lift 👋 I'm interested in: ${offer} — could you share the details?`;
}
