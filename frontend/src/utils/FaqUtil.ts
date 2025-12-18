export const FAQ_DATA = [
    {
        id: 1,
        category: "About CareLoop",
        question: "What is CareLoop?",
        answer: "CareLoop is an AI-powered health companion that connects local pharmacies, helpers, and users in one ecosystem. We enable medicine ordering through chat, with local pharmacies accepting and delivering orders. Our platform goes beyond ordering—we help you manage daily health with AI-based prescription validation, wellness tips, doctor consultations, and health test bookings."
    },
    {
        id: 2,
        category: "Medicine Ordering",
        question: "How do I order medicines?",
        answer: "Simply chat with our AI assistant! You can type your medicine names, upload a prescription image (our OCR will read it), or describe your symptoms. Our system broadcasts your order to nearby pharmacies, and the first available pharmacy accepts and delivers to you quickly."
    },
    {
        id: 3,
        category: "Medicine Ordering",
        question: "What if no pharmacy can deliver my order?",
        answer: "If a pharmacy can't deliver, our local helper network automatically steps in to fulfill your order. These are verified local helpers who pick up from the pharmacy and deliver to your doorstep—keeping every delivery local and fast."
    },
    {
        id: 4,
        category: "Delivery & Helpers",
        question: "How fast is the delivery?",
        answer: "Since we work with local pharmacies and helpers in your area, most deliveries are completed within 30-60 minutes. The exact time depends on your location and order complexity, but we prioritize hyperlocal, same-day delivery."
    },
    {
        id: 5,
        category: "Features",
        question: "What other health features do you offer?",
        answer: "Beyond medicine ordering, CareLoop offers: AI health assistant for wellness advice, personalized care tips, smart medicine reminders, instant doctor consultations (telemedicine), health test bookings with sample pickup, prescription auto-sync, and a health rewards system to keep you motivated."
    },
    {
        id: 6,
        category: "Trust & Safety",
        question: "How do you ensure medicine quality and safety?",
        answer: "We partner only with licensed, verified pharmacies. All helpers go through KYC verification with Aadhaar/phone authentication. Our AI validates prescriptions and suggests alternatives only from trusted brands. Every transaction is tracked and insured for your safety."
    },
];

interface Project {
    title: string;
    description: string;
    src: string;
    link: string;
    color: string;
    cta: { label: string; href: string};
}


export const projects: Project[] = [
    {
        title: "AI CARE CHAT FOR DAILY HEALTH",
        description:
            "Get instant, chat-based help for everyday health needs like sleep, skin care, stress, or diet. Ask simple questions and receive AI-powered guidance that’s easy to understand and practical to follow. When needed, the system also helps you connect with nearby doctors or health professionals for real human support.",
        src: "./are_you_doctor.webp",
        link: "https://res.cloudinary.com/dvkvr88db/image/upload/v1766059094/AI_Chat_ebfl9n.png",
        color: "#5196fd",
        cta: { label: "Learn More", href: "#" }
    },
    {
        title: "LOCAL MEDICINE ORDERING & DELIVERY",
        description:
            "Order medicines easily through chat without searching multiple apps or stores. Our system finds nearby pharmacies based on availability, so orders are accepted faster. If delivery isn’t possible from a store, our local helper network ensures your medicines still reach you reliably and on time.",
        src: "house.jpg",
        link: "https://res.cloudinary.com/dvkvr88db/image/upload/v1766059095/delivary_blkmqu.png",
        color: "#ed649e",
        cta: { label: "Order Now", href: "#" }
    },
    {
        title: "INSTANT DOCTOR CONSULTATION",
        description:
            "Connect quickly with verified doctors through video, audio, or chat for common health concerns. Prescriptions are securely saved in your app, making medicine ordering simple and hassle-free. You also receive reminders for follow-ups, tests, or future consultations without needing to remember everything yourself.",
        src: "tree.jpg",
        link: "https://res.cloudinary.com/dvkvr88db/image/upload/v1766060312/consultant_keb7ec.png",
        color: "#8f89ff",
        cta: { label: "Consult Now", href: "#" }
    },
    {
        title: "HEALTH TIPS FROM LOCAL PHARMACISTS",
        description:
            "Receive simple and trustworthy health tips directly from verified local pharmacists you already rely on. Pharmacists can share short videos or written guidance about medicine usage, precautions, and common doubts. This builds user trust while helping pharmacies earn through content views and grow locally.",
        src: "pharmacist-content.jpg",
        link: "https://res.cloudinary.com/dvkvr88db/image/upload/v1766058915/Tips_rbxscu.png",
        color: "#34c38f",
        cta: { label: "Explore Tips", href: "#" }
    },
    {
        title: "AI-POWERED HEALTH & MEDICINE INSIGHTS",
        description:
            "Our AI analyzes your medicine usage and health patterns to provide helpful insights at the right time. Get alerts like “You may need a refill soon” or “This medicine is used for X—be careful about Y.” These insights reduce confusion, prevent misuse, and support safer health decisions.",
        src: "ai-insights.jpg",
        link: "https://res.cloudinary.com/dvkvr88db/image/upload/v1766058915/Insights_vnm9dr.png",
        color: "#ff8c42",
        cta: { label: "View Insights", href: "#" }
    },
    {
        title: "HEALTH TESTS & DIAGNOSTICS AT HOME",
        description:
            "Book essential health tests like blood, urine, or routine checkups directly from the app. Sample collection is coordinated through trusted local partners for doorstep convenience. Test reports are delivered digitally, with AI insights highlighting important values so you understand what matters most.",
        src: "water.jpg",
        link: "https://res.cloudinary.com/dvkvr88db/image/upload/v1766060507/ChatGPT_Image_Dec_18_2025_05_51_21_PM_nhfwdf.png",
        color: "#13006c",
        cta: { label: "Book Test", href: "#" }
    },
    {
        title: "SMART MEDICINE & HEALTH REMINDERS",
        description:
            "Never miss a dose, refill, or health check again. Our AI tracks your medicines and sends timely reminders for intake, reordering, and upcoming appointments. Even small habits like hydration or daily wellness checks are gently nudged to help you stay consistent and healthy.",
        src: "cactus.jpg",
        link: "https://res.cloudinary.com/dvkvr88db/image/upload/v1764308692/unnamed_ifekqd.jpg",
        color: "#fd521a",
        cta: { label: "Enable Reminders", href: "#" }
    },
    {
        title: "HEALTH COMMUNITY & REWARDS",
        description:
            "Stay motivated with a community-driven health experience. Earn reward points for healthy actions like taking medicines on time or completing wellness goals. Discover nearby health camps, pharmacy offers, and local initiatives while being part of a supportive and trusted health community.",
        src: "cactus.jpg",
        link: "https://res.cloudinary.com/dvkvr88db/image/upload/v1764308690/community_rewards_pyocdu.jpg",
        color: "#fd521a",
        cta: { label: "Join Community", href: "#" }
    },
];