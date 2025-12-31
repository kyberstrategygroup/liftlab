/**
 * Site-wide content registry
 * Defines all editable content across the entire website
 */

export const CONTENT_REGISTRY = {
  // HOME PAGE
  Home: [
    // Hero Section
    { key: 'hero-headline', type: 'text', label: 'Hero - Main Headline', default: 'LiftLab' },
    { key: 'hero-tagline', type: 'text', label: 'Hero - Tagline', default: 'Where Serious Training Happens' },
    { key: 'hero-subtitle', type: 'text', label: 'Hero - Subtitle', default: 'Semi-private coaching. Individualized programming. A community built on accountability, not hype.' },
    { key: 'hero-video-url', type: 'video', label: 'Hero - Background Video', default: 'https://www.youtube.com/embed/RMXYvhU__DE' },
    { key: 'hero-logo', type: 'image', label: 'Hero - Logo Image', default: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694b80b3d28da37df32ecb33/c7e7092e7_LL-40-dark-bckgrnd.png' },
    { key: 'hero-cta1-text', type: 'text', label: 'Hero - Primary CTA Button Text', default: 'Get Started Now' },
    { key: 'hero-cta1-link', type: 'link', label: 'Hero - Primary CTA Button Link', default: 'StartNow' },
    { key: 'hero-cta2-text', type: 'text', label: 'Hero - Secondary CTA Button Text', default: 'Meet The Coaches' },
    { key: 'hero-cta2-link', type: 'link', label: 'Hero - Secondary CTA Button Link', default: 'Team' },
    { key: 'hero-challenge-btn-text', type: 'text', label: 'Hero - Challenge Button Text', default: 'Apply for Win your money back special' },
    
    // Why LiftLab Section
    { key: 'why-subtitle', type: 'text', label: 'Why LiftLab - Subtitle', default: 'The Difference' },
    { key: 'why-title', type: 'text', label: 'Why LiftLab - Title', default: 'Why Choose LiftLab?' },
    { key: 'why-point1-title', type: 'text', label: 'Why LiftLab - Point 1 Title', default: 'Semi-Private Coaching' },
    { key: 'why-point1-desc', type: 'text', label: 'Why LiftLab - Point 1 Description', default: 'Small groups (max 4 people) mean you get coached, not just supervised. Every session includes personalized attention and form corrections.' },
    { key: 'why-point2-title', type: 'text', label: 'Why LiftLab - Point 2 Title', default: 'Individualized Programming' },
    { key: 'why-point2-desc', type: 'text', label: 'Why LiftLab - Point 2 Description', default: 'Your program is built for your goals, your body, and your schedule. Not cookie-cutter. Not one-size-fits-all.' },
    { key: 'why-point3-title', type: 'text', label: 'Why LiftLab - Point 3 Title', default: 'Built for Longevity' },
    { key: 'why-point3-desc', type: 'text', label: 'Why LiftLab - Point 3 Description', default: "We're not here for quick fixes. We program for sustainable progress over years, not weeks." },
    
    // Memberships Section
    { key: 'memberships-subtitle', type: 'text', label: 'Memberships - Subtitle', default: 'Training Options' },
    { key: 'memberships-title', type: 'text', label: 'Memberships - Title', default: 'Find Your Fit' },
    { key: 'memberships-cta-text', type: 'text', label: 'Memberships - CTA Button Text', default: 'View All Services' },
    { key: 'memberships-cta-link', type: 'link', label: 'Memberships - CTA Button Link', default: 'Services' },
  ],

  // START NOW PAGE
  StartNow: [
    { key: 'hero-subtitle', type: 'text', label: 'Hero - Subtitle', default: 'Get Started' },
    { key: 'hero-title', type: 'text', label: 'Hero - Title', default: 'Start Your Journey' },
    { key: 'hero-description', type: 'text', label: 'Hero - Description', default: 'Fill out the form below and we\'ll reach out to schedule your consultation.' },
    { key: 'hero-video-url', type: 'video', label: 'Hero - Welcome Video', default: 'https://www.youtube.com/watch?v=RMXYvhU__DE' },
    { key: 'archetypes-title', type: 'text', label: 'Archetypes - Section Title', default: 'Which Archetype Are You?' },
    { key: 'archetypes-description', type: 'text', label: 'Archetypes - Description', default: 'Every member fits into one of three training archetypes. Watch the videos below to see which resonates with you.' },
    { key: 'ready-title', type: 'text', label: 'Ready Section - Title', default: 'Ready to Start?' },
    { key: 'ready-description', type: 'text', label: 'Ready Section - Description', default: 'Fill out the form above to schedule your free consultation.' },
  ],

  // SERVICES PAGE
  Services: [
    { key: 'hero-subtitle', type: 'text', label: 'Hero - Subtitle', default: 'What We Offer' },
    { key: 'hero-title', type: 'text', label: 'Hero - Title', default: 'Our Services' },
    { key: 'hero-description', type: 'text', label: 'Hero - Description', default: 'Every option includes expert coaching, individualized programming, and access to our training community.' },
    { key: 'cta-title', type: 'text', label: 'Bottom CTA - Title', default: 'Not Sure Which Is Right For You?' },
    { key: 'cta-description', type: 'text', label: 'Bottom CTA - Description', default: "Book a free consultation. We'll discuss your goals and recommend the best fit." },
    { key: 'cta-button-text', type: 'text', label: 'Bottom CTA - Button Text', default: 'Schedule Consult' },
  ],

  // MEMBERSHIPS PAGE
  Memberships: [
    { key: 'hero-subtitle', type: 'text', label: 'Hero - Subtitle', default: 'Our Community' },
    { key: 'hero-title', type: 'text', label: 'Hero - Title', default: 'The Lab Rats' },
    { key: 'hero-description', type: 'text', label: 'Hero - Description', default: 'More than a gym. A community built on consistency, accountability, and showing up for each other.' },
    { key: 'stats-retention', type: 'text', label: 'Stats - Retention Rate', default: '92%' },
    { key: 'stats-years', type: 'text', label: 'Stats - Average Years', default: '4.2' },
    { key: 'stats-members', type: 'text', label: 'Stats - Active Members', default: '500+' },
    { key: 'stats-experience', type: 'text', label: 'Stats - Years Experience', default: '15+' },
    { key: 'values-subtitle', type: 'text', label: 'Values - Subtitle', default: 'What We Value' },
    { key: 'values-title', type: 'text', label: 'Values - Title', default: 'The LiftLab Way' },
    { key: 'cta-title', type: 'text', label: 'CTA - Title', default: 'Ready to Join?' },
    { key: 'cta-description', type: 'text', label: 'CTA - Description', default: "Start with a consultation. We'll make sure we're the right fit for each other." },
  ],

  // TEAM PAGE
  Team: [
    { key: 'hero-subtitle', type: 'text', label: 'Hero - Subtitle', default: 'Meet The Team' },
    { key: 'hero-title', type: 'text', label: 'Hero - Title', default: 'Our Coaches' },
    { key: 'hero-description', type: 'text', label: 'Hero - Description', default: 'Every coach at LiftLab holds certifications, has years of experience, and lives the values we teach.' },
    { key: 'join-title', type: 'text', label: 'Join Team - Title', default: 'Want to Join Our Team?' },
    { key: 'join-description', type: 'text', label: 'Join Team - Description', default: "We're always looking for qualified coaches who share our values." },
    { key: 'cta-title', type: 'text', label: 'CTA - Title', default: 'Ready To Start Training?' },
    { key: 'cta-description', type: 'text', label: 'CTA - Description', default: "Schedule a consultation and meet the team in person." },
  ],

  // SCHEDULE PAGE
  Schedule: [
    { key: 'hero-title', type: 'text', label: 'Hero - Title', default: 'Schedule Your Session' },
    { key: 'hero-subtitle', type: 'text', label: 'Hero - Subtitle', default: 'Book Your Training' },
    { key: 'hero-description', type: 'text', label: 'Hero - Description', default: 'Select a date and time below to book your training session or consultation.' },
  ],

  // ABOUT PAGE
  About: [
    { key: 'hero-subtitle', type: 'text', label: 'Hero - Subtitle', default: 'Our Story' },
    { key: 'hero-title', type: 'text', label: 'Hero - Title', default: 'About LiftLab' },
    { key: 'hero-description', type: 'text', label: 'Hero - Description', default: 'Built by coaches who got tired of watching people spin their wheels in commercial gyms.' },
    { key: 'mission-subtitle', type: 'text', label: 'Mission - Subtitle', default: 'Our Mission' },
    { key: 'mission-title', type: 'text', label: 'Mission - Title', default: 'Why We Exist' },
    { key: 'mission-image', type: 'image', label: 'Mission - Image', default: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80' },
    { key: 'values-subtitle', type: 'text', label: 'Values - Subtitle', default: 'What We Believe' },
    { key: 'values-title', type: 'text', label: 'Values - Title', default: 'Our Values' },
    { key: 'contact-subtitle', type: 'text', label: 'Contact - Subtitle', default: 'Get In Touch' },
    { key: 'contact-title', type: 'text', label: 'Contact - Title', default: 'Contact & Location' },
    { key: 'contact-email', type: 'text', label: 'Contact - Email', default: 'contact@liftlab.ca' },
    { key: 'contact-phone', type: 'text', label: 'Contact - Phone', default: '(613) 627-3054' },
    { key: 'cta-title', type: 'text', label: 'CTA - Title', default: 'Come See The Space' },
    { key: 'cta-description', type: 'text', label: 'CTA - Description', default: 'Book a tour and consultation. No pressure, just conversation.' },
  ],

  // GLOBAL/SHARED CONTENT
  Global: [
    { key: 'header-logo', type: 'image', label: 'Header - Logo', default: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694b80b3d28da37df32ecb33/c7e7092e7_LL-40-dark-bckgrnd.png' },
    { key: 'footer-tagline', type: 'text', label: 'Footer - Tagline', default: 'Where Serious Training Happens' },
    { key: 'footer-tour-url', type: 'link', label: 'Footer - Virtual Tour URL', default: 'https://my.matterport.com/show/?m=pEe5yPcjxSe' },
    { key: 'footer-cta-title', type: 'text', label: 'Footer - CTA Title', default: 'Ready To Start?' },
    { key: 'footer-cta-description', type: 'text', label: 'Footer - CTA Description', default: 'Book a consultation and see if LiftLab is right for you.' },
    { key: 'footer-email', type: 'text', label: 'Footer - Contact Email', default: 'contact@liftlab.ca' },
    { key: 'footer-phone', type: 'text', label: 'Footer - Contact Phone', default: '(613) 627-3054' },
    { key: 'footer-address', type: 'text', label: 'Footer - Address', default: 'Kingston, Ontario' },
  ],

  // CHALLENGE APPLICATION
  ChallengeApplication: [
    { key: 'form-title', type: 'text', label: 'Form - Title', default: '8-Week Challenge Application' },
    { key: 'form-description', type: 'text', label: 'Form - Description', default: 'Transform your body in 8 weeks. Commit to the process, and if you complete the program, we\'ll give you your money back.' },
    { key: 'form-email-to', type: 'text', label: 'Form - Email TO Address', default: 'contact@liftlab.ca' },
    { key: 'form-email-bcc', type: 'text', label: 'Form - Email BCC Address', default: 'kyberstrategygroup@gmail.com' },
  ],

  // TRAINER DETAIL - STEPHEN RADECKI
  'TrainerDetail-Stephen': [
    { key: 'name', type: 'text', label: 'Trainer Name', default: 'Stephen Radecki' },
    { key: 'title', type: 'text', label: 'Trainer Title', default: 'Owner/Senior Coach' },
    { key: 'headshot', type: 'image', label: 'Trainer Headshot', default: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694b80b3d28da37df32ecb33/15ac87b27_coach-stephen-headshot.jpg' },
    { key: 'bio', type: 'text', label: 'Trainer Bio', default: 'Stephen founded LiftLab with a mission to provide accessible, high-quality strength coaching. With over 15 years of experience, he specializes in helping people build sustainable training habits.' },
    { key: 'credentials', type: 'text', label: 'Credentials (comma-separated)', default: 'CSCS, FMS Level 2, Precision Nutrition Level 1' },
    { key: 'why-video', type: 'video', label: 'Why Story Video', default: 'https://www.youtube.com/watch?v=6dVPks3ZBEQ' },
    { key: 'mission-video', type: 'video', label: 'Mission Video', default: 'https://www.youtube.com/watch?v=C6FtECaAIuk' },
    { key: 'instagram', type: 'text', label: 'Instagram Handle', default: 'coach.stephen.wrt' },
  ],

  // TRAINER DETAIL - COLIN ROBERTS
  'TrainerDetail-Colin': [
    { key: 'name', type: 'text', label: 'Trainer Name', default: 'Colin Roberts' },
    { key: 'title', type: 'text', label: 'Trainer Title', default: 'Senior Coach' },
    { key: 'headshot', type: 'image', label: 'Trainer Headshot', default: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694b80b3d28da37df32ecb33/e8c10efa7_Colin-Headshot---square.JPG' },
    { key: 'bio', type: 'text', label: 'Trainer Bio', default: 'Colin brings a background in sports performance and rehabilitation. He works with athletes returning from injury and those looking to improve movement quality.' },
    { key: 'credentials', type: 'text', label: 'Credentials (comma-separated)', default: 'CSCS, SFMA, Precision Nutrition Level 1' },
    { key: 'why-video', type: 'video', label: 'Why Story Video', default: 'https://www.youtube.com/watch?v=v96gi3kadls' },
    { key: 'mission-video', type: 'video', label: 'Mission Video', default: 'https://www.youtube.com/watch?v=5Uz3GoS9zl4' },
    { key: 'instagram', type: 'text', label: 'Instagram Handle', default: 'colin.roberts.7' },
  ],

  // TRAINER DETAIL - ASHLEY MACDONALD
  'TrainerDetail-Ashley': [
    { key: 'name', type: 'text', label: 'Trainer Name', default: 'Ashley MacDonald' },
    { key: 'title', type: 'text', label: 'Trainer Title', default: 'Junior Coach' },
    { key: 'headshot', type: 'image', label: 'Trainer Headshot', default: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694b80b3d28da37df32ecb33/4fdf7ae30_Ashley-Headshot---square.JPG' },
    { key: 'bio', type: 'text', label: 'Trainer Bio', default: 'Ashley specializes in helping beginners build confidence in the gym. Her approach focuses on sustainable progress and building a positive relationship with training.' },
    { key: 'credentials', type: 'text', label: 'Credentials (comma-separated)', default: 'NSCA-CPT, TRX Certified, Pre/Postnatal Coaching Certified' },
    { key: 'why-video', type: 'video', label: 'Why Story Video', default: 'https://www.youtube.com/watch?v=rumoervg8Ec' },
    { key: 'mission-video', type: 'video', label: 'Mission Video', default: 'https://www.youtube.com/watch?v=V419iRu5IJo' },
    { key: 'instagram', type: 'text', label: 'Instagram Handle', default: 'a_macs_lifestyle' },
  ],
};

/**
 * Get all pages in the registry
 */
export function getAllPages() {
  return Object.keys(CONTENT_REGISTRY);
}

/**
 * Get all content keys for a specific page
 */
export function getPageContentKeys(pageId) {
  return CONTENT_REGISTRY[pageId] || [];
}

/**
 * Get default value for a content key
 */
export function getDefaultValue(pageId, contentKey) {
  const page = CONTENT_REGISTRY[pageId] || [];
  const item = page.find(c => c.key === contentKey);
  return item ? item.default : null;
}

/**
 * Get content item definition
 */
export function getContentDefinition(pageId, contentKey) {
  const page = CONTENT_REGISTRY[pageId] || [];
  return page.find(c => c.key === contentKey);
}