export type CommunityInsight = {
    id: string;
    companyId: string;
    type: 'tip' | 'experience' | 'secret' | 'negotiation' | 'warning';
    title: string;
    content: string;
    source: 'Reddit' | 'LeetCode' | 'Glassdoor' | 'Blind';
    upvotes: number;
};

export type InterviewRound = {
    name: string;
    duration: string;
    description: string;
    tips: string[];
};

export type CompanyInsights = {
    companyId: string;
    insights: CommunityInsight[];
    interviewProcess: InterviewRound[];
    commonMistakes: string[];
    negotiationTips: string[];
};

export const COMPANY_INSIGHTS: CompanyInsights[] = [
    {
        companyId: 'google',
        insights: [
            { id: 'gi1', companyId: 'google', type: 'tip', title: 'Focus on problem-solving approach', content: 'Google cares more about HOW you think than getting the optimal solution immediately. Always explain your thought process.', source: 'LeetCode', upvotes: 342 },
            { id: 'gi2', companyId: 'google', type: 'secret', title: 'The "Googliness" factor', content: 'They heavily evaluate cultural fit. Show collaboration, humility, and willingness to help others.', source: 'Blind', upvotes: 256 },
            { id: 'gi3', companyId: 'google', type: 'experience', title: 'My L4 Interview Experience', content: 'Had 2 coding rounds (medium-hard LC), 1 system design, 1 behavioral. Got offer after 3 weeks.', source: 'Reddit', upvotes: 189 },
            { id: 'gi4', companyId: 'google', type: 'negotiation', title: 'Stock refresh is negotiable', content: 'Initial offer stock is usually lowball. Push for better refreshers and signing bonus.', source: 'Blind', upvotes: 421 },
        ],
        interviewProcess: [
            { name: 'Phone Screen', duration: '45 mins', description: 'Coding interview on Google Meet with collaborative doc', tips: ['Practice thinking aloud', 'Ask clarifying questions'] },
            { name: 'Onsite Round 1', duration: '45 mins', description: 'Coding - Data Structures & Algorithms', tips: ['Cover edge cases', 'Optimize after brute force'] },
            { name: 'Onsite Round 2', duration: '45 mins', description: 'Coding - Problem Solving', tips: ['Different topic area', 'May involve DP or graphs'] },
            { name: 'System Design', duration: '45 mins', description: 'Design a large-scale system', tips: ['Start with requirements', 'Discuss trade-offs'] },
            { name: 'Behavioral', duration: '45 mins', description: 'Googliness & Leadership', tips: ['Use STAR method', 'Show collaboration'] },
        ],
        commonMistakes: ['Jumping to code without planning', 'Not asking clarifying questions', 'Ignoring edge cases', 'Being defensive about feedback'],
        negotiationTips: ['Always negotiate - they expect it', 'Get competing offers', 'Focus on total compensation', 'Stock refreshers matter long-term']
    },
    {
        companyId: 'amazon',
        insights: [
            { id: 'ai1', companyId: 'amazon', type: 'tip', title: 'Leadership Principles are EVERYTHING', content: 'Prepare 2-3 stories for EACH of the 16 LPs. They will ask behavioral questions throughout all rounds.', source: 'LeetCode', upvotes: 567 },
            { id: 'ai2', companyId: 'amazon', type: 'secret', title: 'Bar Raiser round', content: 'One interviewer is a "Bar Raiser" from another team. They have veto power. Take every round seriously.', source: 'Blind', upvotes: 389 },
            { id: 'ai3', companyId: 'amazon', type: 'warning', title: 'PIP culture is real', content: 'Amazon has aggressive performance management. Understand the culture before joining.', source: 'Blind', upvotes: 234 },
        ],
        interviewProcess: [
            { name: 'Online Assessment', duration: '90 mins', description: '2 coding problems + work simulation', tips: ['Time management crucial', 'Dont skip work simulation'] },
            { name: 'Phone Screen', duration: '60 mins', description: 'Coding + LP behavioral questions', tips: ['Have LP stories ready', 'Code should compile'] },
            { name: 'Loop Round 1-4', duration: '45-60 mins each', description: 'Mix of coding, system design, and LP deep dives', tips: ['Every round has LP questions', 'Show ownership mindset'] },
        ],
        commonMistakes: ['Not knowing Leadership Principles by heart', 'Generic behavioral answers', 'Not quantifying impact in stories'],
        negotiationTips: ['RSU vesting is backloaded (5-15-40-40)', 'Negotiate signing bonus to offset', 'Location flexibility can help']
    },
    {
        companyId: 'meta',
        insights: [
            { id: 'mi1', companyId: 'meta', type: 'tip', title: 'Speed matters a lot', content: 'Meta expects you to solve 2 medium problems in 45 mins. Practice speed coding under time pressure.', source: 'LeetCode', upvotes: 445 },
            { id: 'mi2', companyId: 'meta', type: 'secret', title: 'System design is make or break for E5+', content: 'For senior roles, system design performance often determines leveling more than coding.', source: 'Blind', upvotes: 312 },
        ],
        interviewProcess: [
            { name: 'Phone Screen', duration: '45 mins', description: '2 coding problems, medium difficulty', tips: ['Aim for 20 mins per problem', 'Optimal solution expected'] },
            { name: 'Onsite Coding 1', duration: '45 mins', description: '2 coding problems', tips: ['Same format as phone screen', 'May be harder'] },
            { name: 'Onsite Coding 2', duration: '45 mins', description: '2 coding problems', tips: ['Practice variety of topics'] },
            { name: 'System Design', duration: '45 mins', description: 'Design a Meta-scale system', tips: ['Think billions of users', 'Focus on data model'] },
            { name: 'Behavioral', duration: '45 mins', description: 'Past experience and culture fit', tips: ['Show impact and ownership'] },
        ],
        commonMistakes: ['Too slow on coding', 'Not clarifying requirements', 'Over-engineering system design'],
        negotiationTips: ['Meta pays top of market', 'Competing offers help significantly', 'Refreshers are generous']
    },
    {
        companyId: 'flipkart',
        insights: [
            { id: 'fli1', companyId: 'flipkart', type: 'tip', title: 'HLD and LLD are crucial', content: 'Flipkart loves system design. For SDE-2+, expect detailed HLD and LLD discussions.', source: 'LeetCode', upvotes: 178 },
            { id: 'fli2', companyId: 'flipkart', type: 'experience', title: 'SDE-2 Interview Experience', content: 'Had machine coding round (2 hrs), followed by 2 DS rounds, 1 HLD, 1 LLD. Result in 1 week.', source: 'Reddit', upvotes: 145 },
        ],
        interviewProcess: [
            { name: 'Machine Coding', duration: '90-120 mins', description: 'Build a working system from scratch', tips: ['Focus on clean code', 'Design patterns matter'] },
            { name: 'DS Algo Round 1', duration: '60 mins', description: 'Problem solving with DSA', tips: ['Standard LC medium-hard'] },
            { name: 'DS Algo Round 2', duration: '60 mins', description: 'More complex problems', tips: ['May involve DP or graphs'] },
            { name: 'System Design', duration: '60 mins', description: 'HLD + LLD', tips: ['Draw clear diagrams', 'Discuss scalability'] },
        ],
        commonMistakes: ['Poor code structure in machine coding', 'Not considering scale', 'Weak OOP concepts'],
        negotiationTips: ['ESOPs can be significant', 'Base salary is competitive', 'Team matters for growth']
    },
    // ===== SERVICE-BASED COMPANIES =====
    // Deloitte - Dream Company 💚
    {
        companyId: 'deloitte',
        insights: [
            { id: 'del1', companyId: 'deloitte', type: 'tip', title: '💚 Focus on basics - you got this!', content: 'Deloitte interviews are friendly and beginner-focused. Brush up on basic DSA - arrays, strings, and simple problem solving. You will definitely clear this!', source: 'Reddit', upvotes: 456 },
            { id: 'del2', companyId: 'deloitte', type: 'experience', title: 'Super supportive interview experience', content: 'Interviewers were very helpful. They gave hints when I got stuck. Culture is amazing - they care about people, not just code!', source: 'Glassdoor', upvotes: 342 },
            { id: 'del3', companyId: 'deloitte', type: 'secret', title: 'Communication matters most', content: 'Deloitte values communication skills as much as technical. Be confident, articulate your thoughts, and show enthusiasm!', source: 'Blind', upvotes: 289 },
            { id: 'del4', companyId: 'deloitte', type: 'tip', title: 'Practice aptitude too', content: 'First round is usually aptitude + basic coding. Practice logical reasoning and quantitative aptitude alongside coding.', source: 'LeetCode', upvotes: 234 },
        ],
        interviewProcess: [
            { name: 'Online Test', duration: '60-90 mins', description: 'Aptitude (Quant, Logical, Verbal) + Basic Coding', tips: ['Practice on IndiaBix/PrepInsta', 'Time management is key', 'Easy coding - focus on accuracy'] },
            { name: 'Technical Round', duration: '30-45 mins', description: 'Basic programming, OOPs, DBMS, OS concepts', tips: ['Revise core CS subjects', 'Be honest if you dont know', 'Show willingness to learn'] },
            { name: 'HR Round', duration: '20-30 mins', description: 'Behavioral questions and culture fit', tips: ['Research about Deloitte', 'Show enthusiasm', 'Ask thoughtful questions'] },
        ],
        commonMistakes: ['Not practicing aptitude', 'Being nervous - they want you to succeed!', 'Not showing enthusiasm for learning'],
        negotiationTips: ['Fresher packages are standard but negotiate if you have other offers', 'Ask about client projects and learning opportunities', 'Benefits and work-life balance are excellent at Deloitte 💚']
    },
    // TCS
    {
        companyId: 'tcs',
        insights: [
            { id: 'tcs1', companyId: 'tcs', type: 'tip', title: 'TCS NQT is the key', content: 'Clear TCS NQT with good score and you get direct interview calls. Focus on aptitude and basic programming.', source: 'Reddit', upvotes: 567 },
            { id: 'tcs2', companyId: 'tcs', type: 'experience', title: 'Smooth interview process', content: 'Very organized interview. Questions are basic - FizzBuzz, string reversal, basic SQL queries.', source: 'Glassdoor', upvotes: 234 },
        ],
        interviewProcess: [
            { name: 'TCS NQT', duration: '180 mins', description: 'National Qualifier Test - Aptitude + Programming', tips: ['Practice on TCS iON', 'Focus on all sections'] },
            { name: 'Technical Interview', duration: '30 mins', description: 'Basic programming and CS fundamentals', tips: ['Know your resume well', 'Basic coding questions'] },
            { name: 'HR Interview', duration: '20 mins', description: 'Standard HR questions', tips: ['Be confident', 'Show stability'] },
        ],
        commonMistakes: ['Not preparing for aptitude', 'Poor communication skills', 'Not knowing about TCS services'],
        negotiationTips: ['Fresher package is fixed', 'Choose Digital/Ninja based on NQT score', 'Location preferences matter']
    },
    // Infosys
    {
        companyId: 'infosys',
        insights: [
            { id: 'inf1', companyId: 'infosys', type: 'tip', title: 'InfyTQ is your friend', content: 'Complete InfyTQ certification for better chances. Focus on Java, Python, and database basics.', source: 'Reddit', upvotes: 445 },
            { id: 'inf2', companyId: 'infosys', type: 'experience', title: 'Great training program', content: 'Infosys has amazing training at Mysore campus. 3-4 months of learning before project allocation.', source: 'Glassdoor', upvotes: 312 },
        ],
        interviewProcess: [
            { name: 'Online Test', duration: '120 mins', description: 'Aptitude + Logical + Verbal + Coding', tips: ['Practice on PrepInsta', 'InfyTQ completion helps'] },
            { name: 'Technical + HR', duration: '45 mins', description: 'Combined technical and HR discussion', tips: ['Know about Infosys', 'Basic tech questions'] },
        ],
        commonMistakes: ['Not completing InfyTQ', 'Poor verbal skills', 'Not researching company'],
        negotiationTips: ['Package tiers: SP, DSE, etc.', 'Higher role = better pay', 'Mysore training is valuable experience']
    },
    // Cognizant
    {
        companyId: 'cognizant',
        insights: [
            { id: 'cog1', companyId: 'cognizant', type: 'tip', title: 'GenC interviews are straightforward', content: 'Cognizant GenC/GenC Next/GenC Pro based on your test score. Focus on aptitude and basic coding.', source: 'Reddit', upvotes: 378 },
            { id: 'cog2', companyId: 'cognizant', type: 'experience', title: 'Good work-life balance', content: 'Work culture is great. Not too hectic compared to product companies. Good for starters.', source: 'Glassdoor', upvotes: 267 },
        ],
        interviewProcess: [
            { name: 'AMCAT/Cognizant Test', duration: '120 mins', description: 'Aptitude + Coding + English', tips: ['AMCAT preparation helps', 'Focus on communication'] },
            { name: 'Technical Interview', duration: '30-45 mins', description: 'Basic tech + project discussion', tips: ['Know your projects', 'Basic DSA is enough'] },
            { name: 'HR Round', duration: '20 mins', description: 'Standard HR questions', tips: ['Be honest', 'Show interest'] },
        ],
        commonMistakes: ['Weak English communication', 'Not preparing projects well', 'Overconfidence'],
        negotiationTips: ['GenC tiers have fixed packages', 'Location flexibility helps', 'CTS offers good onsite opportunities']
    },
    // Wipro
    {
        companyId: 'wipro',
        insights: [
            { id: 'wip1', companyId: 'wipro', type: 'tip', title: 'WILP program is great', content: 'Wipro WILP (Work Integrated Learning Program) for engineers. Get trained while working!', source: 'Reddit', upvotes: 345 },
            { id: 'wip2', companyId: 'wipro', type: 'experience', title: 'Supportive environment', content: 'Good for freshers. Managers are understanding and there is scope for learning.', source: 'Glassdoor', upvotes: 234 },
        ],
        interviewProcess: [
            { name: 'Online Assessment', duration: '90 mins', description: 'Aptitude + Coding', tips: ['Practice on eLitmus', 'Basic programming enough'] },
            { name: 'Technical Interview', duration: '30 mins', description: 'Basic tech questions', tips: ['Know resume well', 'Simple coding questions'] },
            { name: 'HR Round', duration: '20 mins', description: 'Behavioral and culture fit', tips: ['Know about Wipro', 'Be confident'] },
        ],
        commonMistakes: ['Weak aptitude', 'Not knowing about company', 'Poor communication'],
        negotiationTips: ['Fresher package is standard', 'Elite/Turbo roles pay more', 'Good benefits package']
    },
    // Accenture
    {
        companyId: 'accenture',
        insights: [
            { id: 'acc1', companyId: 'accenture', type: 'tip', title: 'Communication is king at Accenture', content: 'Unlike other service companies, Accenture really values communication skills. Practice verbal ability.', source: 'Reddit', upvotes: 456 },
            { id: 'acc2', companyId: 'accenture', type: 'experience', title: 'Global exposure', content: 'Great place for global projects. Lots of learning and travel opportunities.', source: 'Glassdoor', upvotes: 312 },
        ],
        interviewProcess: [
            { name: 'Cognitive Assessment', duration: '90 mins', description: 'Verbal, Analytical, Abstract reasoning', tips: ['Focus on communication', 'Practice abstract reasoning'] },
            { name: 'Coding Round', duration: '45 mins', description: 'Basic programming test', tips: ['Simple programs', 'Focus on accuracy'] },
            { name: 'Communication Assessment', duration: '20 mins', description: 'Written and verbal communication test', tips: ['Grammar matters', 'Clear articulation'] },
        ],
        commonMistakes: ['Poor English skills', 'Ignoring abstract reasoning', 'Weak written communication'],
        negotiationTips: ['AASE, ASE, SE roles have different packages', 'Negotiate based on competing offers', 'Good hike culture during appraisals']
    },
];

export const getInsightsByCompany = (companyId: string): CompanyInsights | undefined => {
    return COMPANY_INSIGHTS.find(c => c.companyId === companyId);
};

export const getInterviewProcess = (companyId: string): InterviewRound[] => {
    return getInsightsByCompany(companyId)?.interviewProcess || [];
};
