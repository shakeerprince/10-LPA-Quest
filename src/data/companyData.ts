export type CompanyData = {
    id: string;
    name: string;
    logo: string;
    tier: 'FAANG' | 'Tier1' | 'Tier2' | 'Startup' | 'Service';
    difficulty: 'Easy' | 'Medium' | 'Hard';
    interviewRounds: number;
    avgCompensation: { india: string; us: string };
    interviewStyle: string[];
    careersUrl: string;
    color: string;
    description: string;
    isServiceBased?: boolean;
    isDreamCompany?: boolean;
    specialMessage?: string;
};

export const COMPANIES: CompanyData[] = [
    {
        id: 'google',
        name: 'Google',
        logo: '🔍',
        tier: 'FAANG',
        difficulty: 'Hard',
        interviewRounds: 5,
        avgCompensation: { india: '25-60 LPA', us: '$150K-$300K' },
        interviewStyle: ['DSA Heavy', 'System Design', 'Behavioral'],
        careersUrl: 'https://careers.google.com',
        color: '#4285F4',
        description: 'World\'s leading search and cloud company. Known for rigorous coding interviews.'
    },
    {
        id: 'amazon',
        name: 'Amazon',
        logo: '📦',
        tier: 'FAANG',
        difficulty: 'Hard',
        interviewRounds: 5,
        avgCompensation: { india: '20-50 LPA', us: '$140K-$280K' },
        interviewStyle: ['Leadership Principles', 'DSA', 'System Design'],
        careersUrl: 'https://amazon.jobs',
        color: '#FF9900',
        description: 'E-commerce and cloud giant. Focus on Leadership Principles in interviews.'
    },
    {
        id: 'microsoft',
        name: 'Microsoft',
        logo: '🪟',
        tier: 'FAANG',
        difficulty: 'Hard',
        interviewRounds: 4,
        avgCompensation: { india: '20-55 LPA', us: '$140K-$270K' },
        interviewStyle: ['DSA', 'System Design', 'Problem Solving'],
        careersUrl: 'https://careers.microsoft.com',
        color: '#00A4EF',
        description: 'Tech giant known for Azure, Office, and Windows. Balanced interview process.'
    },
    {
        id: 'meta',
        name: 'Meta',
        logo: '📱',
        tier: 'FAANG',
        difficulty: 'Hard',
        interviewRounds: 4,
        avgCompensation: { india: '30-70 LPA', us: '$160K-$350K' },
        interviewStyle: ['Coding', 'System Design', 'Behavioral'],
        careersUrl: 'https://metacareers.com',
        color: '#0668E1',
        description: 'Social media and metaverse company. Heavy focus on coding speed.'
    },
    {
        id: 'apple',
        name: 'Apple',
        logo: '🍎',
        tier: 'FAANG',
        difficulty: 'Hard',
        interviewRounds: 5,
        avgCompensation: { india: '25-60 LPA', us: '$150K-$300K' },
        interviewStyle: ['Technical Deep Dive', 'DSA', 'System Design'],
        careersUrl: 'https://jobs.apple.com',
        color: '#A2AAAD',
        description: 'Premium tech company. Interviews focus on domain expertise.'
    },
    {
        id: 'netflix',
        name: 'Netflix',
        logo: '🎬',
        tier: 'FAANG',
        difficulty: 'Hard',
        interviewRounds: 5,
        avgCompensation: { india: '40-80 LPA', us: '$200K-$400K' },
        interviewStyle: ['Culture Fit', 'System Design', 'Technical'],
        careersUrl: 'https://jobs.netflix.com',
        color: '#E50914',
        description: 'Streaming giant with top-of-market compensation. Culture-focused hiring.'
    },
    {
        id: 'flipkart',
        name: 'Flipkart',
        logo: '🛒',
        tier: 'Tier1',
        difficulty: 'Medium',
        interviewRounds: 4,
        avgCompensation: { india: '18-45 LPA', us: 'N/A' },
        interviewStyle: ['DSA', 'System Design', 'HLD/LLD'],
        careersUrl: 'https://www.flipkartcareers.com',
        color: '#F8D210',
        description: 'India\'s largest e-commerce. Strong focus on system design.'
    },
    {
        id: 'uber',
        name: 'Uber',
        logo: '🚗',
        tier: 'Tier1',
        difficulty: 'Hard',
        interviewRounds: 5,
        avgCompensation: { india: '25-55 LPA', us: '$150K-$280K' },
        interviewStyle: ['DSA', 'System Design', 'Behavioral'],
        careersUrl: 'https://uber.com/careers',
        color: '#000000',
        description: 'Ride-sharing pioneer. Complex system design questions.'
    },
    {
        id: 'razorpay',
        name: 'Razorpay',
        logo: '💳',
        tier: 'Startup',
        difficulty: 'Medium',
        interviewRounds: 4,
        avgCompensation: { india: '18-40 LPA', us: 'N/A' },
        interviewStyle: ['DSA', 'System Design', 'Fintech Domain'],
        careersUrl: 'https://razorpay.com/careers',
        color: '#0066FF',
        description: 'India\'s leading payment gateway. Fintech-focused interviews.'
    },
    {
        id: 'swiggy',
        name: 'Swiggy',
        logo: '🍔',
        tier: 'Startup',
        difficulty: 'Medium',
        interviewRounds: 4,
        avgCompensation: { india: '15-35 LPA', us: 'N/A' },
        interviewStyle: ['DSA', 'LLD', 'Problem Solving'],
        careersUrl: 'https://careers.swiggy.com',
        color: '#FC8019',
        description: 'Food delivery giant. Focus on practical problem solving.'
    },
    {
        id: 'zomato',
        name: 'Zomato',
        logo: '🍕',
        tier: 'Startup',
        difficulty: 'Medium',
        interviewRounds: 4,
        avgCompensation: { india: '15-35 LPA', us: 'N/A' },
        interviewStyle: ['DSA', 'System Design', 'Product Sense'],
        careersUrl: 'https://zomato.com/careers',
        color: '#E23744',
        description: 'Food-tech unicorn. Balance of technical and product questions.'
    },
    {
        id: 'phonepe',
        name: 'PhonePe',
        logo: '📲',
        tier: 'Startup',
        difficulty: 'Medium',
        interviewRounds: 4,
        avgCompensation: { india: '18-40 LPA', us: 'N/A' },
        interviewStyle: ['DSA', 'System Design', 'Fintech'],
        careersUrl: 'https://phonepe.com/careers',
        color: '#5F259F',
        description: 'Leading UPI payments app. Strong fintech focus.'
    },
    {
        id: 'cred',
        name: 'CRED',
        logo: '💎',
        tier: 'Startup',
        difficulty: 'Medium',
        interviewRounds: 4,
        avgCompensation: { india: '20-50 LPA', us: 'N/A' },
        interviewStyle: ['DSA', 'System Design', 'Product Thinking'],
        careersUrl: 'https://cred.club/careers',
        color: '#1C1C1C',
        description: 'Premium fintech startup. Known for high compensation.'
    },
    {
        id: 'atlassian',
        name: 'Atlassian',
        logo: '🔷',
        tier: 'Tier1',
        difficulty: 'Medium',
        interviewRounds: 4,
        avgCompensation: { india: '25-55 LPA', us: '$140K-$260K' },
        interviewStyle: ['Values Interview', 'DSA', 'System Design'],
        careersUrl: 'https://atlassian.com/careers',
        color: '#0052CC',
        description: 'Makers of Jira and Confluence. Strong values focus.'
    },
    {
        id: 'adobe',
        name: 'Adobe',
        logo: '🎨',
        tier: 'Tier1',
        difficulty: 'Medium',
        interviewRounds: 4,
        avgCompensation: { india: '18-45 LPA', us: '$130K-$250K' },
        interviewStyle: ['DSA', 'System Design', 'Domain Knowledge'],
        careersUrl: 'https://adobe.com/careers',
        color: '#FF0000',
        description: 'Creative software leader. Balanced technical interviews.'
    },
    {
        id: 'salesforce',
        name: 'Salesforce',
        logo: '☁️',
        tier: 'Tier1',
        difficulty: 'Medium',
        interviewRounds: 4,
        avgCompensation: { india: '18-45 LPA', us: '$130K-$250K' },
        interviewStyle: ['DSA', 'System Design', 'Behavioral'],
        careersUrl: 'https://salesforce.com/careers',
        color: '#00A1E0',
        description: 'CRM giant. Good work-life balance reputation.'
    },
    {
        id: 'oracle',
        name: 'Oracle',
        logo: '🔶',
        tier: 'Tier1',
        difficulty: 'Medium',
        interviewRounds: 4,
        avgCompensation: { india: '12-35 LPA', us: '$120K-$220K' },
        interviewStyle: ['DSA', 'Database', 'System Design'],
        careersUrl: 'https://oracle.com/careers',
        color: '#F80000',
        description: 'Database and cloud company. Strong focus on fundamentals.'
    },
    {
        id: 'stripe',
        name: 'Stripe',
        logo: '💰',
        tier: 'Tier1',
        difficulty: 'Hard',
        interviewRounds: 5,
        avgCompensation: { india: '30-60 LPA', us: '$180K-$350K' },
        interviewStyle: ['DSA', 'System Design', 'Debugging'],
        careersUrl: 'https://stripe.com/jobs',
        color: '#635BFF',
        description: 'Payments infrastructure. Known for unique interview format.'
    },
    {
        id: 'airbnb',
        name: 'Airbnb',
        logo: '🏠',
        tier: 'Tier1',
        difficulty: 'Hard',
        interviewRounds: 5,
        avgCompensation: { india: '30-60 LPA', us: '$170K-$320K' },
        interviewStyle: ['DSA', 'System Design', 'Cross-functional'],
        careersUrl: 'https://careers.airbnb.com',
        color: '#FF5A5F',
        description: 'Travel-tech company. Focus on belonging and culture.'
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        logo: '💼',
        tier: 'Tier1',
        difficulty: 'Medium',
        interviewRounds: 4,
        avgCompensation: { india: '20-50 LPA', us: '$150K-$280K' },
        interviewStyle: ['DSA', 'System Design', 'Behavioral'],
        careersUrl: 'https://careers.linkedin.com',
        color: '#0A66C2',
        description: 'Professional network. Part of Microsoft family.'
    },
    // ✨ Service-Based Companies - "This is for you, my girl" 💕
    {
        id: 'deloitte',
        name: 'Deloitte',
        logo: '💚',
        tier: 'Service',
        difficulty: 'Easy',
        interviewRounds: 3,
        avgCompensation: { india: '6-18 LPA', us: '$70K-$150K' },
        interviewStyle: ['Technical MCQ', 'Coding', 'HR'],
        careersUrl: 'https://www2.deloitte.com/careers',
        color: '#86BC25',
        description: '✨ Your DREAM Company! ✨ Big 4 consulting giant. Amazing work culture, global exposure, and great growth opportunities!',
        isServiceBased: true,
        isDreamCompany: true,
        specialMessage: '💚 You will definitely get into Deloitte, my girl! I believe in you! 💪✨'
    },
    {
        id: 'tcs',
        name: 'TCS',
        logo: '🔷',
        tier: 'Service',
        difficulty: 'Easy',
        interviewRounds: 3,
        avgCompensation: { india: '3.5-12 LPA', us: '$60K-$100K' },
        interviewStyle: ['Aptitude', 'Coding', 'HR'],
        careersUrl: 'https://www.tcs.com/careers',
        color: '#0076CE',
        description: 'India\'s largest IT services company. Stable jobs and good training programs.',
        isServiceBased: true
    },
    {
        id: 'infosys',
        name: 'Infosys',
        logo: '🔵',
        tier: 'Service',
        difficulty: 'Easy',
        interviewRounds: 3,
        avgCompensation: { india: '3.6-14 LPA', us: '$65K-$110K' },
        interviewStyle: ['Aptitude', 'Coding', 'HR'],
        careersUrl: 'https://www.infosys.com/careers',
        color: '#007CC3',
        description: 'Global IT services leader. Known for InfyTQ platform and good training.',
        isServiceBased: true
    },
    {
        id: 'cognizant',
        name: 'Cognizant',
        logo: '🟦',
        tier: 'Service',
        difficulty: 'Easy',
        interviewRounds: 3,
        avgCompensation: { india: '4-15 LPA', us: '$70K-$120K' },
        interviewStyle: ['Aptitude', 'Technical', 'HR'],
        careersUrl: 'https://careers.cognizant.com',
        color: '#0033A0',
        description: 'US-headquartered IT services company. Good for freshers with competitive packages.',
        isServiceBased: true
    },
    {
        id: 'wipro',
        name: 'Wipro',
        logo: '🌸',
        tier: 'Service',
        difficulty: 'Easy',
        interviewRounds: 3,
        avgCompensation: { india: '3.5-12 LPA', us: '$60K-$100K' },
        interviewStyle: ['Aptitude', 'Coding', 'HR'],
        careersUrl: 'https://careers.wipro.com',
        color: '#522B82',
        description: 'IT services giant with great training. WILP program popular for freshers.',
        isServiceBased: true
    },
    {
        id: 'accenture',
        name: 'Accenture',
        logo: '🟣',
        tier: 'Service',
        difficulty: 'Easy',
        interviewRounds: 3,
        avgCompensation: { india: '4.5-16 LPA', us: '$75K-$130K' },
        interviewStyle: ['Aptitude', 'Communication', 'HR'],
        careersUrl: 'https://www.accenture.com/careers',
        color: '#A100FF',
        description: 'Global consulting and tech services. Great for career growth and learning.',
        isServiceBased: true
    },
    {
        id: 'capgemini',
        name: 'Capgemini',
        logo: '🔹',
        tier: 'Service',
        difficulty: 'Easy',
        interviewRounds: 3,
        avgCompensation: { india: '3.8-14 LPA', us: '$65K-$110K' },
        interviewStyle: ['Aptitude', 'Technical', 'HR'],
        careersUrl: 'https://www.capgemini.com/careers',
        color: '#0070AD',
        description: 'French IT services company. Good work culture and European exposure.',
        isServiceBased: true
    },
    {
        id: 'techmahindra',
        name: 'Tech Mahindra',
        logo: '🔴',
        tier: 'Service',
        difficulty: 'Easy',
        interviewRounds: 3,
        avgCompensation: { india: '3.5-12 LPA', us: '$60K-$100K' },
        interviewStyle: ['Aptitude', 'Technical', 'HR'],
        careersUrl: 'https://careers.techmahindra.com',
        color: '#E31837',
        description: 'Part of Mahindra Group. Strong in telecom domain. Good for freshers.',
        isServiceBased: true
    },
];

export const getCompanyById = (id: string): CompanyData | undefined => {
    return COMPANIES.find(c => c.id === id);
};

export const getCompaniesByTier = (tier: CompanyData['tier']): CompanyData[] => {
    return COMPANIES.filter(c => c.tier === tier);
};

export const getCompaniesByDifficulty = (difficulty: CompanyData['difficulty']): CompanyData[] => {
    return COMPANIES.filter(c => c.difficulty === difficulty);
};

export const getServiceBasedCompanies = (): CompanyData[] => {
    return COMPANIES.filter(c => c.isServiceBased === true);
};

export const getDreamCompany = (): CompanyData | undefined => {
    return COMPANIES.find(c => c.isDreamCompany === true);
};
