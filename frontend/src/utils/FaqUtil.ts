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
        title: "AI-DRIVEN CARE CHAT",
        description:
            "Access instant, chat-based guidance for daily wellness, skin care advice, and routine suggestions (e.g., 'Suggest a daily routine for better sleep.'). Our assistant provides verified care advice and connects you to local specialists when needed.",
        src: "./are_you_doctor.webp",
        link: "https://imgs.search.brave.com/CPJGjOcuwnf_mtDxB3c7bcdzbY0QOSaHXFINX72oMXM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIz/MzA5NzEyMC9waG90/by9haS10aGVyYXB5/LWNoYXQtYXBwLW9u/LXNtYXJ0cGhvbmUt/Zm9yLW1lbnRhbC1o/ZWFsdGgtc3VwcG9y/dC1lbW90aW9uYWwt/d2VsbGJlaW5nLWFz/c2lzdGFudC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9am1X/SDBjWERqazdTMWNK/UV85ZWw5c0J2ZzVN/RVh1Mmx1MnYtbm1S/TjJGdz0",
        color: "#5196fd",
        cta: { label: "Learn More", href: "#" }
    },
    {
        title: "MEDICINE ORDERING & DELIVERY",
        description:
            "Order medicines simply through chat. Our smart system instantly routes requests to local pharmacies for fast acceptance and delivery. If a pharmacy cannot deliver, our local helper network steps in to ensure hyperlocal, reliable fulfillment.",
        src: "house.jpg",
        link: "https://imgs.search.brave.com/_HWMQ1TkVleVSuteOhNJjtdstv4zEsy7zgiYy13SxRk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ3/NDc3MDk2Ni9waG90/by9kZWxpdmVyeS1w/ZXJzb24tZGVsaXZl/cmluZy1tZWRpY2lu/ZS10by13b21hbi5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/QWJqRV9Ydmt0cjRN/RUNaQXFIcmpkU2hW/aVJYUHphUXZFSDdj/bkpCVHhVMD0",
        color: "#ed649e",
        cta: { label: "Order Now", href: "#" }
    },
    {
        title: "INSTANT DOCTOR CONSULTATION",
        description:
            "Connect instantly with verified local or online doctors via video, audio, or text chat. Prescriptions are automatically stored and synced in your app, enabling instant ordering and follow-up reminders for checkups or lab tests.",
        src: "tree.jpg",
        link: "https://res.cloudinary.com/dvkvr88db/image/upload/v1764308688/are_you_doctor_ue1ewh.webp",
        color: "#8f89ff",
        cta: { label: "Consult Now", href: "#" }
    },
    {
        title: "HEALTH TESTS & DIAGNOSTICS",
        description:
            "Book essential blood, urine, and health tests directly through the chat interface. We coordinate sample pickup by our local helper network. Receive digital reports in the app with AI-powered insights that highlight abnormal readings and offer preliminary advice.",
        src: "water.jpg",
        link: "https://imgs.search.brave.com/wd68U8yWGrx1tYSps4l9980lIAeR47D_TPfcLMa1mpw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvYmxvb2QtdGVz/dF83NzMxODYtMTQx/MC5qcGc_c2VtdD1h/aXNfaW5jb21pbmcm/dz03NDAmcT04MA",
        color: "#13006c",
        cta: { label: "Book Test", href: "#" }
    },
    {
        title: "SMART REMINDER SYSTEM",
        description:
            "Our AI intelligently tracks and reminds users for critical health actions: timely medicine intake, scheduling reorders, upcoming regular health checkups, or even gentle hydration alerts to keep you proactive about your health.",
        src: "cactus.jpg",
        link: "https://res.cloudinary.com/dvkvr88db/image/upload/v1764308692/unnamed_ifekqd.jpg",
        color: "#fd521a",
        cta: { label: "Enable Reminders", href: "#" }
    },
    {
        title: "HEALTH COMMUNITY & REWARDS",
        description:
            "Earn 'Healthy Points' for positive actions like timely medicine intake and completing health challenges. Access a community feed to share local health camps and receive pharmacy rewards, fostering a connected, community-driven ecosystem.",
        src: "cactus.jpg",
        link: "https://res.cloudinary.com/dvkvr88db/image/upload/v1764308690/community_rewards_pyocdu.jpg",
        color: "#fd521a",
        cta: { label: "Join Community", href: "#" }
    },
];