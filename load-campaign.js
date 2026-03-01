// Campaign Data Loader for Mission Control
// Loads AI Sandbox Promotor Campaign into database

const API_URL = 'https://mission-control-rezahs-projects-50690806.vercel.app/api/db';

async function neonQuery(query, params = []) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, params })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Query failed');
  return data.rows;
}

async function loadCampaign() {
  console.log('🚀 Loading AI Sandbox Promotor Campaign...\n');

  try {
    // Clear existing campaign data (optional - comment out if you want to keep old data)
    console.log('📋 Clearing old campaign data...');
    await neonQuery("DELETE FROM tasks WHERE category = 'business' OR category = 'content'");
    await neonQuery("DELETE FROM calendar_entries WHERE category IN ('meeting','content','deadline','business')");
    console.log('✅ Old data cleared\n');

    // Load Tasks
    console.log('📥 Loading tasks...');
    
    const tasks = [
      // STEP 1: TRAFFIC - Organic
      {id:'t-traffic-001',title:'Identify 10 AI/Tech podcasts for guest pitches',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-05',priority:'high',description:'Research and list: local SA podcasts, global AI podcasts, fintech shows. Target: Moonshot, Business Unusual, Founders Podcast SA, The AI Breakdown, Practical AI',category:'business'},
      {id:'t-traffic-002',title:'Draft podcast pitch template',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-06',priority:'high',description:'Create compelling pitch: "From Corporate IT to AI Entrepreneur: Building AI Sandboxes for SMBs". Include bio, value prop, talking points',category:'business'},
      {id:'t-traffic-003',title:'Pitch 3 podcasts (Week 1)',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-08',priority:'high',description:'Send personalized pitches to top 3 targets. Follow up after 3 days if no response',category:'business'},
      {id:'t-traffic-004',title:'Create guest post topics list',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-07',priority:'medium',description:'10 article ideas: "AI Without Code", "Small Business AI Adoption", "OpenClaw for Finance Pros", etc.',category:'content'},
      {id:'t-traffic-005',title:'Identify 5 publications for guest posts',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-08',priority:'medium',description:'Target: Medium publications, Dev.to, TechCentral, MyBroadband, BusinessTech SA',category:'content'},
      {id:'t-traffic-006',title:'Write guest post #1: "AI Without Code"',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-12',priority:'high',description:'1500-2000 words, include sandbox case study, submit to Medium + Dev.to',category:'content'},
      {id:'t-traffic-007',title:'Pitch 3 more podcasts (Week 3)',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-15',priority:'high',description:'Continue podcast outreach campaign',category:'business'},
      {id:'t-traffic-008',title:'Research Cape Town tech meetups',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-14',priority:'medium',description:'Find monthly events: Silicon Cape, StartupGrind, AI/ML meetups. Book calendar for Q2',category:'business'},
      {id:'t-traffic-009',title:'Register for 2 networking events',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-16',priority:'medium',description:'Secure spots at March/April events, prep elevator pitch',category:'business'},
      {id:'t-traffic-010',title:'Create 30-day LinkedIn content calendar',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-20',priority:'high',description:'Plan posts: 3x/week value, 1x/week product tease, 1x/week engagement. Use Allan Gray network',category:'content'},
      {id:'t-traffic-011',title:'Write 12 LinkedIn posts (batch)',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-22',priority:'high',description:'Topics: AI adoption stories, automation wins, OpenClaw tips, business automation. Save as drafts',category:'content'},
      {id:'t-traffic-012',title:'Create X/Twitter thread series (5 threads)',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-25',priority:'medium',description:'Threads on: AI for finance pros, automation ROI, side hustle AI, OpenClaw showcase, customer wins',category:'content'},
      {id:'t-traffic-013',title:'Design social media graphics (Canva)',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-27',priority:'medium',description:'Create 10 quote cards, 5 product screenshots, 3 customer testimonial graphics',category:'content'},
      
      // STEP 1: TRAFFIC - Paid
      {id:'t-traffic-014',title:'Research Facebook/Meta ads for B2B',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-02',priority:'high',description:'Study competitors, ad formats, targeting options. Budget: R2000 test',category:'business'},
      {id:'t-traffic-015',title:'Create Meta ads landing page',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-05',priority:'high',description:'Dedicated page for ad traffic, clear CTA, lead magnet signup',category:'web'},
      {id:'t-traffic-016',title:'Write 5 Meta ad variations',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-07',priority:'medium',description:'Headlines + body copy for: finance pros, SMB owners, tech enthusiasts, entrepreneurs, automation seekers',category:'content'},
      {id:'t-traffic-017',title:'Design 3 Meta ad creatives',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-08',priority:'medium',description:'Product shots, benefit-focused graphics, testimonial images',category:'content'},
      {id:'t-traffic-018',title:'Launch Meta ad campaign (R2000)',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-10',priority:'high',description:'Test 3 audiences: finance/fintech, SMB owners, tech-savvy entrepreneurs. Track CPL',category:'business'},
      {id:'t-traffic-019',title:'Monitor & optimize ads (Week 1)',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-17',priority:'high',description:'Check daily, pause losers, scale winners. Target CPA < R200',category:'business'},
      
      // STEP 2: HOLDING PATTERN
      {id:'t-hold-001',title:'Set up email platform (ConvertKit)',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-04',priority:'urgent',description:'Free tier to start, import Allan Gray network contacts, POPIA compliance',category:'automation'},
      {id:'t-hold-002',title:'Create lead magnet: "AI Automation Starter Kit"',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-09',priority:'high',description:'PDF guide: 10 no-code AI automations for small business. Include OpenClaw intro',category:'content'},
      {id:'t-hold-003',title:'Design newsletter template',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-10',priority:'medium',description:'Professional design, clear branding, mobile-responsive. Test sends',category:'content'},
      {id:'t-hold-004',title:'Write welcome email sequence (5 emails)',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-13',priority:'high',description:'Email 1: Welcome + lead magnet, Email 2-4: Value stories, Email 5: Soft pitch',category:'content'},
      {id:'t-hold-005',title:'Write Newsletter #1',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-20',priority:'high',description:'First newsletter, set tone, provide value, no hard sell',category:'content'},
      {id:'t-hold-006',title:'Send Newsletter #1 to list',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-21',priority:'high',description:'Schedule for Thursday 10am SAST',category:'business'},
      {id:'t-hold-007',title:'Newsletter #2: "3 AI Wins"',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-28',priority:'medium',description:'Case studies + tips',category:'content'},
      {id:'t-hold-008',title:'Newsletter #3: "Automate Without Code"',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-04',priority:'medium',description:'How-to + tool recommendations',category:'content'},
      {id:'t-hold-009',title:'Newsletter #4: "AI Sandbox Deep Dive"',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-11',priority:'medium',description:'Product education, use cases',category:'content'},
      {id:'t-hold-010',title:'Newsletter #5: Webinar Invite',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-18',priority:'high',description:'Tease selling event, success story',category:'content'},
      {id:'t-hold-011',title:'Record YouTube #1: "Unboxing"',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-23',priority:'medium',description:'Product demo, setup walkthrough, first automation. 10-15 min',category:'content'},
      {id:'t-hold-012',title:'Edit & publish YouTube #1',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-24',priority:'medium',description:'Add captions, thumbnail, description with links',category:'content'},
      {id:'t-hold-013',title:'Record YouTube #2: "First AI Agent"',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-30',priority:'medium',description:'Step-by-step tutorial using OpenClaw',category:'content'},
      
      // STEP 3: SELLING EVENT
      {id:'t-sell-001',title:'Choose webinar platform',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-22',priority:'high',description:'Test features, practice run, ensure SADC timezone support',category:'automation'},
      {id:'t-sell-002',title:'Create webinar topic',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-23',priority:'high',description:'Hook: Learn to automate 5 business tasks in 60 minutes (live demo)',category:'content'},
      {id:'t-sell-003',title:'Design webinar slide deck',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-01',priority:'high',description:'30-40 slides: Problem, Solution, Demo, Case Studies, Offer, Q&A',category:'content'},
      {id:'t-sell-004',title:'Create webinar registration page',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-02',priority:'urgent',description:'Landing page with clear value prop, date/time, speaker bio, register CTA',category:'web'},
      {id:'t-sell-005',title:'Set up webinar automation',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-03',priority:'high',description:'Confirmation email, 1-day reminder, 1-hour reminder, replay sequence',category:'automation'},
      {id:'t-sell-006',title:'Write webinar promo email #1',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-04',priority:'high',description:'Send to entire list: "Free AI Automation Masterclass - April 24"',category:'content'},
      {id:'t-sell-007',title:'Create webinar promo posts',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-05',priority:'medium',description:'5 posts: LinkedIn, X, countdown, benefit-focused',category:'content'},
      {id:'t-sell-008',title:'Set up webinar retargeting ads',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-10',priority:'medium',description:'Retarget website visitors + email openers. Budget: R1500',category:'business'},
      {id:'t-sell-009',title:'Webinar promo email #2',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-17',priority:'high',description:'Last chance reminder, include testimonials',category:'content'},
      {id:'t-sell-010',title:'Daily webinar countdown posts',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-21',priority:'high',description:'7 days of countdown across platforms',category:'content'},
      {id:'t-sell-011',title:'Webinar dry run & tech check',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-23',priority:'urgent',description:'Test slides, screen share, audio, backup internet, recording',category:'system'},
      {id:'t-sell-012',title:'Send 24hr webinar reminder',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-23',priority:'high',description:'Reminder + add to calendar link',category:'content'},
      {id:'t-sell-013',title:'WEBINAR: AI Automation Masterclass',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-24',priority:'urgent',description:'Live at 7pm SAST. 90 min (60 content + 30 Q&A). Pitch at end',category:'meeting'},
      {id:'t-sell-014',title:'Send replay + offer email',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-25',priority:'urgent',description:'Within 24hrs: replay link, slides, 20% off Professional tier',category:'content'},
      {id:'t-sell-015',title:'Email sequence Day 1',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-25',priority:'high',description:'Replay + offer',category:'content'},
      {id:'t-sell-016',title:'Email sequence Day 3',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-27',priority:'high',description:'Case study + offer reminder (48hrs left)',category:'content'},
      {id:'t-sell-017',title:'Email sequence Day 5',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-29',priority:'high',description:'Final call + bonus (free setup call)',category:'content'},
      {id:'t-sell-018',title:'Email sequence Day 7',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-05-01',priority:'high',description:'Offer closes. Final deadline, FOMO',category:'content'},
      {id:'t-sell-019',title:'List 20 warm Allan Gray contacts',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-25',priority:'high',description:'People who showed interest, previous conversations, decision-makers',category:'business'},
      {id:'t-sell-020',title:'Personalized outreach (20 contacts)',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-05',priority:'high',description:'WhatsApp/email: personal webinar invites',category:'business'},
      
      // STEP 4: OUTCOMES
      {id:'t-outcome-001',title:'Set up conversion tracking',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-08',priority:'high',description:'GA4 + sheet: landing visits, signups, registrations, purchases',category:'automation'},
      {id:'t-outcome-002',title:'Create sales dashboard',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-20',priority:'medium',description:'Google Sheets: traffic sources, conversion rates, revenue, CAC',category:'automation'},
      {id:'t-outcome-003',title:'Monitor webinar conversion',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-26',priority:'urgent',description:'Calculate: registrations → attendees → purchases. Target: 5%',category:'business'},
      {id:'t-outcome-004',title:'Follow up non-purchasers',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-05-02',priority:'high',description:'Survey: why didnt you buy? Objections → improve offer',category:'business'},
      {id:'t-outcome-005',title:'Onboard new customers',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-26',priority:'urgent',description:'Welcome call, setup assistance, first automation together',category:'business'},
      {id:'t-outcome-006',title:'Customer success check-in',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-05-03',priority:'high',description:'Hows it going? Issues? Collect testimonial',category:'business'},
      {id:'t-outcome-007',title:'Request testimonials',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-05-10',priority:'medium',description:'Video or written, use in next campaign',category:'content'},
      {id:'t-outcome-008',title:'Segment non-converters',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-05-03',priority:'medium',description:'Hot/Warm/Cold by engagement level',category:'business'},
      {id:'t-outcome-009',title:'Create nurture sequence',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-05-04',priority:'high',description:'For "Hot" leads: more case studies, address objections',category:'content'},
      {id:'t-outcome-010',title:'Plan Webinar #2 for June',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-05-15',priority:'medium',description:'New hook: "AI Agents for Financial Services"',category:'business'},
      {id:'t-outcome-011',title:'Week 4 campaign review',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-03-31',priority:'medium',description:'Review traffic, email rates, social engagement. Adjust',category:'business'},
      {id:'t-outcome-012',title:'Week 8 campaign review',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-04-30',priority:'high',description:'Full funnel analysis: traffic → leads → webinar → sales. ROI',category:'business'},
      {id:'t-outcome-013',title:'Week 12 retrospective',assignee:'Reez',status:'pending',created:Date.now(),due_date:'2026-05-30',priority:'high',description:'What worked? What flopped? Document learnings',category:'business'}
    ];

    for (const t of tasks) {
      await neonQuery(
        'INSERT INTO tasks(id,title,assignee,status,created,due_date,priority,description,category) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)',
        [t.id, t.title, t.assignee, t.status, t.created, t.due_date, t.priority, t.description, t.category]
      );
    }
    console.log(`✅ Loaded ${tasks.length} tasks\n`);

    // Load Calendar Entries
    console.log('📅 Loading calendar entries...');
    
    const calendarEntries = [
      {id:'c-001',date:'2026-03-06',title:'Podcast Pitch Deadline',description:'Send pitches to 3 target podcasts',time:'09:00',category:'deadline'},
      {id:'c-002',date:'2026-03-10',title:'Guest Post #1 Draft Due',description:'Complete first guest article',time:'EOD',category:'deadline'},
      {id:'c-003',date:'2026-03-13',title:'Newsletter Welcome Sequence Live',description:'Activate automated email sequence',time:'10:00',category:'system'},
      {id:'c-004',date:'2026-03-21',title:'Newsletter #1: Send',description:'First newsletter to full list',time:'10:00',category:'content'},
      {id:'c-005',date:'2026-03-23',title:'YouTube Video #1: Record',description:'Unboxing AI Sandbox video',time:'14:00',category:'content'},
      {id:'c-006',date:'2026-03-28',title:'Newsletter #2: Send',description:'Weekly newsletter',time:'10:00',category:'content'},
      {id:'c-007',date:'2026-04-01',title:'Webinar Planning Kickoff',description:'Start slide deck + registration page',time:'09:00',category:'meeting'},
      {id:'c-008',date:'2026-04-04',title:'Newsletter #3: Send',description:'Weekly newsletter',time:'10:00',category:'content'},
      {id:'c-009',date:'2026-04-04',title:'Webinar Promo Email #1',description:'Announce webinar to list',time:'11:00',category:'content'},
      {id:'c-010',date:'2026-04-10',title:'Meta Ads Launch',description:'Go live with paid traffic',time:'08:00',category:'business'},
      {id:'c-011',date:'2026-04-11',title:'Newsletter #4: Send',description:'Weekly newsletter',time:'10:00',category:'content'},
      {id:'c-012',date:'2026-04-17',title:'Webinar Promo Email #2',description:'1-week reminder',time:'10:00',category:'content'},
      {id:'c-013',date:'2026-04-18',title:'Newsletter #5: Send',description:'Weekly newsletter + webinar invite',time:'10:00',category:'content'},
      {id:'c-014',date:'2026-04-23',title:'Webinar Tech Check',description:'Dry run + equipment test',time:'18:00',category:'meeting'},
      {id:'c-015',date:'2026-04-23',title:'24-Hour Webinar Reminder',description:'Send reminder to registrants',time:'19:00',category:'content'},
      {id:'c-016',date:'2026-04-24',title:'🎯 WEBINAR: AI Automation Masterclass',description:'Live webinar event (90 min)',time:'19:00',category:'meeting'},
      {id:'c-017',date:'2026-04-25',title:'Post-Webinar Email #1',description:'Replay + special offer',time:'09:00',category:'content'},
      {id:'c-018',date:'2026-04-27',title:'Post-Webinar Email #2',description:'Case study + offer reminder',time:'10:00',category:'content'},
      {id:'c-019',date:'2026-04-29',title:'Post-Webinar Email #3',description:'Final call + bonus',time:'10:00',category:'content'},
      {id:'c-020',date:'2026-05-01',title:'Post-Webinar Email #4',description:'Offer closes today',time:'09:00',category:'deadline'},
      {id:'c-021',date:'2026-05-03',title:'Customer Success Check-ins',description:'Call new customers',time:'14:00',category:'meeting'},
      {id:'c-022',date:'2026-05-15',title:'Plan Webinar #2',description:'Start planning second webinar',time:'10:00',category:'meeting'},
      {id:'c-023',date:'2026-05-30',title:'Campaign Retrospective',description:'Full 90-day review + learnings doc',time:'15:00',category:'meeting'},
      {id:'c-024',date:'2026-03-31',title:'Month 1 Milestone',description:'Review traffic sources, list growth, content output',time:'EOD',category:'business'},
      {id:'c-025',date:'2026-04-30',title:'Month 2 Milestone',description:'Review webinar performance, first sales, conversion rates',time:'EOD',category:'business'},
      {id:'c-026',date:'2026-05-31',title:'Month 3 Milestone',description:'Review full campaign ROI, customer feedback, scale plan',time:'EOD',category:'business'},
      {id:'c-027',date:'2026-03-19',title:'Silicon Cape Meetup',description:'Network + pitch AI Sandbox (TBC)',time:'18:00',category:'meeting'},
      {id:'c-028',date:'2026-04-16',title:'StartupGrind Cape Town',description:'Attend + connect with founders (TBC)',time:'18:30',category:'meeting'},
      {id:'c-029',date:'2026-03-15',title:'Content Batch Day: LinkedIn',description:'Write 2 weeks of LinkedIn content',time:'09:00-13:00',category:'content'},
      {id:'c-030',date:'2026-03-22',title:'Content Batch Day: Twitter',description:'Write 5 Twitter threads',time:'09:00-12:00',category:'content'},
      {id:'c-031',date:'2026-04-05',title:'Content Batch Day: Webinar Promos',description:'Create all webinar promotional materials',time:'09:00-14:00',category:'content'},
      {id:'c-032',date:'2026-03-07',title:'Week 1 Review',description:'Check progress, adjust priorities',time:'16:00',category:'meeting'},
      {id:'c-033',date:'2026-03-14',title:'Week 2 Review',description:'Check progress, adjust priorities',time:'16:00',category:'meeting'},
      {id:'c-034',date:'2026-03-21',title:'Week 3 Review',description:'Check progress, adjust priorities',time:'16:00',category:'meeting'},
      {id:'c-035',date:'2026-03-28',title:'Week 4 Review',description:'Check progress, adjust priorities',time:'16:00',category:'meeting'},
      {id:'c-036',date:'2026-04-04',title:'Week 5 Review',description:'Check progress, adjust priorities',time:'16:00',category:'meeting'},
      {id:'c-037',date:'2026-04-11',title:'Week 6 Review',description:'Check progress, adjust priorities',time:'16:00',category:'meeting'},
      {id:'c-038',date:'2026-04-18',title:'Week 7 Review',description:'Check progress, adjust priorities',time:'16:00',category:'meeting'},
      {id:'c-039',date:'2026-04-25',title:'Week 8 Review + Webinar Debrief',description:'Deep dive on webinar performance',time:'16:00',category:'meeting'},
      {id:'c-040',date:'2026-05-02',title:'Week 9 Review',description:'Check progress, adjust priorities',time:'16:00',category:'meeting'},
      {id:'c-041',date:'2026-05-09',title:'Week 10 Review',description:'Check progress, adjust priorities',time:'16:00',category:'meeting'},
      {id:'c-042',date:'2026-05-16',title:'Week 11 Review',description:'Check progress, adjust priorities',time:'16:00',category:'meeting'},
      {id:'c-043',date:'2026-05-23',title:'Week 12 Review',description:'Check progress, adjust priorities',time:'16:00',category:'meeting'}
    ];

    for (const e of calendarEntries) {
      await neonQuery(
        'INSERT INTO calendar_entries(id,date,title,description,time,category) VALUES($1,$2,$3,$4,$5,$6)',
        [e.id, e.date, e.title, e.description, e.time, e.category]
      );
    }
    console.log(`✅ Loaded ${calendarEntries.length} calendar entries\n`);

    console.log('🎉 Campaign loaded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - ${tasks.length} tasks created`);
    console.log(`   - ${calendarEntries.length} calendar events scheduled`);
    console.log(`   - Campaign duration: 90 days (Mar 1 - May 31, 2026)`);
    console.log(`   - Webinar date: April 24, 2026 @ 7pm SAST`);
    console.log('\n🚀 Next steps:');
    console.log('   1. Open Mission Control at https://mission-control-rezahs-projects-50690806.vercel.app');
    console.log('   2. Review Tasks tab for action items');
    console.log('   3. Check Calendar tab for upcoming events');
    console.log('   4. Start with high-priority tasks this week!');
    
  } catch (error) {
    console.error('❌ Error loading campaign:', error);
    throw error;
  }
}

// Run the loader
loadCampaign().catch(console.error);
