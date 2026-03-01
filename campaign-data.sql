-- AI SANDBOX PROMOTOR CAMPAIGN
-- 90-day structured campaign following JIcecream's Promotor Blueprint
-- Generated: 2026-03-01

-- ============================================
-- STEP 1: TRAFFIC (Organic + Paid)
-- ============================================

-- ORGANIC TRAFFIC TASKS

-- Week 1-2: Foundation Setup
INSERT INTO tasks(id,title,assignee,status,created,due_date,priority,description,category) VALUES
('t-traffic-001','Identify 10 AI/Tech podcasts for guest pitches','Reez','pending',1709254800000,'2026-03-05','high','Research and list: local SA podcasts, global AI podcasts, fintech shows. Target: Moonshot, Business Unusual, Founders Podcast SA, The AI Breakdown, Practical AI','business'),
('t-traffic-002','Draft podcast pitch template','Reez','pending',1709254800000,'2026-03-06','high','Create compelling pitch: "From Corporate IT to AI Entrepreneur: Building AI Sandboxes for SMBs". Include bio, value prop, talking points','business'),
('t-traffic-003','Pitch 3 podcasts (Week 1)','Reez','pending',1709254800000,'2026-03-08','high','Send personalized pitches to top 3 targets. Follow up after 3 days if no response','business'),
('t-traffic-004','Create guest post topics list','Reez','pending',1709254800000,'2026-03-07','medium','10 article ideas: "AI Without Code", "Small Business AI Adoption", "OpenClaw for Finance Pros", etc.','content'),
('t-traffic-005','Identify 5 publications for guest posts','Reez','pending',1709254800000,'2026-03-08','medium','Target: Medium publications, Dev.to, TechCentral, MyBroadband, BusinessTech SA','content');

-- Week 3-4: Content Creation & Outreach
INSERT INTO tasks(id,title,assignee,status,created,due_date,priority,description,category) VALUES
('t-traffic-006','Write guest post #1: "AI Without Code: How Non-Tech Founders Can Build AI Tools"','Reez','pending',1709427600000,'2026-03-12','high','1500-2000 words, include sandbox case study, submit to Medium + Dev.to','content'),
('t-traffic-007','Pitch 3 more podcasts (Week 3)','Reez','pending',1709427600000,'2026-03-15','high','Continue podcast outreach campaign','business'),
('t-traffic-008','Research Cape Town tech meetups','Reez','pending',1709427600000,'2026-03-14','medium','Find monthly events: Silicon Cape, StartupGrind, AI/ML meetups. Book calendar for Q2','business'),
('t-traffic-009','Register for 2 networking events','Reez','pending',1709427600000,'2026-03-16','medium','Secure spots at March/April events, prep elevator pitch','business');

-- Week 5-8: Social Media Content Engine
INSERT INTO tasks(id,title,assignee,status,created,due_date,priority,description,category) VALUES
('t-traffic-010','Create 30-day LinkedIn content calendar','Reez','pending',1710032400000,'2026-03-20','high','Plan posts: 3x/week value, 1x/week product tease, 1x/week engagement. Use Allan Gray network','content'),
('t-traffic-011','Write 12 LinkedIn posts (batch)','Reez','pending',1710032400000,'2026-03-22','high','Topics: AI adoption stories, automation wins, OpenClaw tips, business automation. Save as drafts','content'),
('t-traffic-012','Create X/Twitter thread series (5 threads)','Reez','pending',1710032400000,'2026-03-25','medium','Threads on: AI for finance pros, automation ROI, side hustle AI, OpenClaw showcase, customer wins','content'),
('t-traffic-013','Design social media graphics (Canva)','Reez','pending',1710032400000,'2026-03-27','medium','Create 10 quote cards, 5 product screenshots, 3 customer testimonial graphics','content');

-- PAID TRAFFIC TASKS (Months 2-3)

INSERT INTO tasks(id,title,assignee,status,created,due_date,priority,description,category) VALUES
('t-traffic-014','Research Facebook/Meta ads for B2B','Reez','pending',1710637200000,'2026-04-02','high','Study competitors, ad formats, targeting options. Budget: R2000 test','business'),
('t-traffic-015','Create Meta ads landing page','Reez','pending',1710637200000,'2026-04-05','high','Dedicated page for ad traffic, clear CTA, lead magnet signup','web'),
('t-traffic-016','Write 5 Meta ad variations','Reez','pending',1710637200000,'2026-04-07','medium','Headlines + body copy for: finance pros, SMB owners, tech enthusiasts, entrepreneurs, automation seekers','content'),
('t-traffic-017','Design 3 Meta ad creatives','Reez','pending',1710637200000,'2026-04-08','medium','Product shots, benefit-focused graphics, testimonial images','content'),
('t-traffic-018','Launch Meta ad campaign (R2000 budget)','Reez','pending',1711242000000,'2026-04-10','high','Test 3 audiences: finance/fintech, SMB owners, tech-savvy entrepreneurs. Track CPL','business'),
('t-traffic-019','Monitor & optimize ads (Week 1)','Reez','pending',1711846800000,'2026-04-17','high','Check daily, pause losers, scale winners. Target CPA < R200','business');

-- ============================================
-- STEP 2: HOLDING PATTERN (Your World)
-- ============================================

-- Email Newsletter Setup
INSERT INTO tasks(id,title,assignee,status,created,due_date,priority,description,category) VALUES
('t-hold-001','Set up email platform (ConvertKit/Mailchimp)','Reez','pending',1709254800000,'2026-03-04','urgent','Free tier to start, import Allan Gray network contacts, POPIA compliance','automation'),
('t-hold-002','Create lead magnet: "AI Automation Starter Kit"','Reez','pending',1709254800000,'2026-03-09','high','PDF guide: 10 no-code AI automations for small business. Include OpenClaw intro','content'),
('t-hold-003','Design newsletter template','Reez','pending',1709254800000,'2026-03-10','medium','Professional design, clear branding, mobile-responsive. Test sends','content'),
('t-hold-004','Write welcome email sequence (5 emails)','Reez','pending',1709427600000,'2026-03-13','high','Email 1: Welcome + lead magnet, Email 2-4: Value stories, Email 5: Soft pitch','content'),
('t-hold-005','Write Newsletter #1: "Why Every SMB Needs AI in 2026"','Reez','pending',1710032400000,'2026-03-20','high','First newsletter, set tone, provide value, no hard sell','content'),
('t-hold-006','Send Newsletter #1 to list','Reez','pending',1710118800000,'2026-03-21','high','Schedule for Thursday 10am SAST','business');

-- Weekly Newsletter Cadence
INSERT INTO tasks(id,title,assignee,status,created,due_date,priority,description,category) VALUES
('t-hold-007','Newsletter #2: "3 AI Wins from Cape Town Businesses"','Reez','pending',1710723600000,'2026-03-28','medium','Case studies + tips','content'),
('t-hold-008','Newsletter #3: "Automate Without Code: Beginner Guide"','Reez','pending',1711328400000,'2026-04-04','medium','How-to + tool recommendations','content'),
('t-hold-009','Newsletter #4: "AI Sandbox Deep Dive"','Reez','pending',1711933200000,'2026-04-11','medium','Product education, use cases','content'),
('t-hold-010','Newsletter #5: "Customer Spotlight + Webinar Invite"','Reez','pending',1712538000000,'2026-04-18','high','Tease selling event, success story','content');

-- Content Creation (YouTube/Podcast)
INSERT INTO tasks(id,title,assignee,status,created,due_date,priority,description,category) VALUES
('t-hold-011','Record YouTube video #1: "Unboxing the AI Sandbox"','Reez','pending',1710118800000,'2026-03-23','medium','Product demo, setup walkthrough, first automation. 10-15 min','content'),
('t-hold-012','Edit & publish YouTube #1','Reez','pending',1710205200000,'2026-03-24','medium','Add captions, thumbnail, description with links','content'),
('t-hold-013','Record YouTube #2: "Build Your First AI Agent"','Reez','pending',1710723600000,'2026-03-30','medium','Step-by-step tutorial using OpenClaw','content'),
('t-hold-014','Plan podcast "AI for Finance Pros" (8 episodes)','Reez','pending',1711328400000,'2026-04-06','low','Episode topics, guest list, recording schedule. Target: Allan Gray alumni','content');

-- X/Twitter Consistent Posting
INSERT INTO tasks(id,title,assignee,status,created,due_date,priority,description,category) VALUES
('t-hold-015','Post daily X/Twitter content (Week 1)','Reez','pending',1709254800000,'2026-03-07','medium','Mix: tips, behind-the-scenes, product updates, engagement','content'),
('t-hold-016','Post daily X/Twitter content (Week 2)','Reez','pending',1709859600000,'2026-03-14','medium','Continue daily posting rhythm','content'),
('t-hold-017','Post daily X/Twitter content (Week 3)','Reez','pending',1710464400000,'2026-03-21','medium','Maintain engagement','content'),
('t-hold-018','Post daily X/Twitter content (Week 4)','Reez','pending',1711069200000,'2026-03-28','medium','Build anticipation for webinar','content');

-- ============================================
-- STEP 3: SELLING EVENT (The Offer)
-- ============================================

-- Webinar Planning (Month 2)
INSERT INTO tasks(id,title,assignee,status,created,due_date,priority,description,category) VALUES
('t-sell-001','Choose webinar platform (Zoom/StreamYard)','Reez','pending',1710032400000,'2026-03-22','high','Test features, practice run, ensure SADC timezone support','automation'),
('t-sell-002','Create webinar topic: "AI Automation Masterclass for SMBs"','Reez','pending',1710032400000,'2026-03-23','high','Hook: Learn to automate 5 business tasks in 60 minutes (live demo)','content'),
('t-sell-003','Design webinar slide deck (30-40 slides)','Reez','pending',1710637200000,'2026-04-01','high','Sections: Problem, Solution, Demo, Case Studies, Offer, Q&A','content'),
('t-sell-004','Create webinar registration page','Reez','pending',1710637200000,'2026-04-02','urgent','Landing page with clear value prop, date/time, speaker bio, register CTA','web'),
('t-sell-005','Set up webinar automation (emails)','Reez','pending',1710723600000,'2026-04-03','high','Confirmation email, 1-day reminder, 1-hour reminder, replay sequence','automation'),
('t-sell-006','Write webinar promo email #1','Reez','pending',1710723600000,'2026-04-04','high','Send to entire list: "Free AI Automation Masterclass - April 24"','content'),
('t-sell-007','Create 5 webinar promo social posts','Reez','pending',1710723600000,'2026-04-05','medium','LinkedIn, X, countdown posts, benefit-focused','content'),
('t-sell-008','Set up webinar retargeting ads','Reez','pending',1711242000000,'2026-04-10','medium','Retarget website visitors + email openers with webinar invite ads. Budget: R1500','business');

-- Webinar Week (Week of April 21)
INSERT INTO tasks(id,title,assignee,status,created,due_date,priority,description,category) VALUES
('t-sell-009','Send webinar promo email #2 (1 week out)','Reez','pending',1711846800000,'2026-04-17','high','Last chance reminder, include testimonials','content'),
('t-sell-010','Post daily webinar countdown (social)','Reez','pending',1712192400000,'2026-04-21','high','7 days of countdown posts across platforms','content'),
('t-sell-011','Dry run webinar tech check','Reez','pending',1712365200000,'2026-04-23','urgent','Test slides, screen share, audio, backup internet, recording','system'),
('t-sell-012','Send 24-hour webinar reminder email','Reez','pending',1712365200000,'2026-04-23','high','Reminder + add to calendar link','content'),
('t-sell-013','CONDUCT WEBINAR: AI Automation Masterclass','Reez','pending',1712451600000,'2026-04-24','urgent','Live at 7pm SAST. Duration: 90 min (60 min content + 30 min Q&A). Pitch at end: Limited offer for attendees','meeting'),
('t-sell-014','Send webinar replay + offer email','Reez','pending',1712538000000,'2026-04-25','urgent','Within 24 hours: replay link, slides, special attendee discount (20% off Professional tier)','content');

-- Email Campaign (Post-Webinar)
INSERT INTO tasks(id,title,assignee,status,created,due_date,priority,description,category) VALUES
('t-sell-015','Email sequence Day 1: Replay + offer','Reez','pending',1712538000000,'2026-04-25','high','Immediate send after webinar','content'),
('t-sell-016','Email sequence Day 3: Case study + offer reminder','Reez','pending',1712710800000,'2026-04-27','high','Social proof, scarcity (48 hours left)','content'),
('t-sell-017','Email sequence Day 5: Final call + bonus','Reez','pending',1712883600000,'2026-04-29','high','Last chance, add bonus (free setup call)','content'),
('t-sell-018','Email sequence Day 7: Offer closes','Reez','pending',1713056400000,'2026-05-01','high','Final deadline, FOMO, remove discount after today','content');

-- Direct Outreach (Allan Gray Network)
INSERT INTO tasks(id,title,assignee,status,created,due_date,priority,description,category) VALUES
('t-sell-019','List 20 warm Allan Gray contacts','Reez','pending',1710032400000,'2026-03-25','high','People who showed interest, previous conversations, decision-makers','business'),
('t-sell-020','Personalized outreach (5 per week x 4 weeks)','Reez','pending',1710637200000,'2026-04-05','high','WhatsApp/email: "Hey [name], thought you might find this useful..." + webinar invite','business'),
('t-sell-021','Follow up direct outreach (webinar week)','Reez','pending',1712192400000,'2026-04-22','medium','Personal check-in with warm leads before webinar','business');

-- ============================================
-- STEP 4: OUTCOMES & LOOP BACK
-- ============================================

-- Conversion Tracking
INSERT INTO tasks(id,title,assignee,status,created,due_date,priority,description,category) VALUES
('t-outcome-001','Set up conversion tracking (GA4 + sheet)','Reez','pending',1709254800000,'2026-03-08','high','Track: landing page visits, email signups, webinar registrations, purchases','automation'),
('t-outcome-002','Create sales dashboard','Reez','pending',1710032400000,'2026-03-20','medium','Google Sheets: traffic sources, conversion rates, revenue, CAC','automation'),
('t-outcome-003','Monitor webinar conversion rate','Reez','pending',1712538000000,'2026-04-26','urgent','Calculate: registrations → attendees → purchases. Target: 5% purchase rate','business'),
('t-outcome-004','Follow up with non-purchasers','Reez','pending',1713142800000,'2026-05-02','high','Survey: why didn't you buy? Objections → improve offer','business');

-- Success Actions
INSERT INTO tasks(id,title,assignee,status,created,due_date,priority,description,category) VALUES
('t-outcome-005','Onboard new customers (Week 1)','Reez','pending',1712624400000,'2026-04-26','urgent','Welcome call, setup assistance, first automation together','business'),
('t-outcome-006','Customer success check-in (Week 2)','Reez','pending',1713229200000,'2026-05-03','high','How's it going? Any issues? Collect testimonial if happy','business'),
('t-outcome-007','Request testimonials from happy customers','Reez','pending',1713834000000,'2026-05-10','medium','Video or written, use in next campaign','content');

-- Loop Back Actions (For Non-Converters)
INSERT INTO tasks(id,title,assignee,status,created,due_date,priority,description,category) VALUES
('t-outcome-008','Segment non-converters by engagement','Reez','pending',1713142800000,'2026-05-03','medium','Hot (attended but didn't buy), Warm (registered but didn't attend), Cold (no action)','business'),
('t-outcome-009','Create nurture sequence for "Hot" leads','Reez','pending',1713142800000,'2026-05-04','high','More case studies, address objections, softer pitch','content'),
('t-outcome-010','Plan Webinar #2 for June','Reez','pending',1713747600000,'2026-05-15','medium','New hook: "AI Agents for Financial Services" - target warm list again','business');

-- Campaign Review & Optimization
INSERT INTO tasks(id,title,assignee,status,created,due_date,priority,description,category) VALUES
('t-outcome-011','Week 4 campaign review','Reez','pending',1711069200000,'2026-03-31','medium','Review: traffic sources, email open rates, social engagement. Adjust strategy','business'),
('t-outcome-012','Week 8 campaign review','Reez','pending',1712883600000,'2026-04-30','high','Full funnel analysis: traffic → leads → webinar → sales. Calculate ROI','business'),
('t-outcome-013','Week 12 campaign retrospective','Reez','pending',1714493200000,'2026-05-30','high','What worked? What flopped? Document learnings for next campaign','business');

-- ============================================
-- CALENDAR ENTRIES
-- ============================================

-- Weekly Content Publishing Schedule
INSERT INTO calendar_entries(id,date,title,description,time,category) VALUES
('c-001','2026-03-06','Podcast Pitch Deadline','Send pitches to 3 target podcasts','09:00','deadline'),
('c-002','2026-03-10','Guest Post #1 Draft Due','Complete first guest article','EOD','deadline'),
('c-003','2026-03-13','Newsletter Welcome Sequence Live','Activate automated email sequence','10:00','system'),
('c-004','2026-03-21','Newsletter #1: Send','First newsletter to full list','10:00','content'),
('c-005','2026-03-23','YouTube Video #1: Record','Unboxing AI Sandbox video','14:00','content'),
('c-006','2026-03-28','Newsletter #2: Send','Weekly newsletter','10:00','content'),
('c-007','2026-04-01','Webinar Planning Kickoff','Start slide deck + registration page','09:00','meeting'),
('c-008','2026-04-04','Newsletter #3: Send','Weekly newsletter','10:00','content'),
('c-009','2026-04-04','Webinar Promo Email #1','Announce webinar to list','11:00','content'),
('c-010','2026-04-10','Meta Ads Launch','Go live with paid traffic campaign','08:00','business'),
('c-011','2026-04-11','Newsletter #4: Send','Weekly newsletter','10:00','content'),
('c-012','2026-04-17','Webinar Promo Email #2','1-week reminder','10:00','content'),
('c-013','2026-04-18','Newsletter #5: Send (with webinar invite)','Weekly newsletter','10:00','content'),
('c-014','2026-04-23','Webinar Tech Check','Dry run + equipment test','18:00','meeting'),
('c-015','2026-04-23','24-Hour Webinar Reminder Email','Send reminder to registrants','19:00','content'),
('c-016','2026-04-24','🎯 WEBINAR: AI Automation Masterclass','Live webinar event (90 min)','19:00','meeting'),
('c-017','2026-04-25','Post-Webinar Email #1','Replay + special offer','09:00','content'),
('c-018','2026-04-27','Post-Webinar Email #2','Case study + offer reminder','10:00','content'),
('c-019','2026-04-29','Post-Webinar Email #3','Final call + bonus','10:00','content'),
('c-020','2026-05-01','Post-Webinar Email #4','Offer closes today','09:00','deadline'),
('c-021','2026-05-03','Customer Success Check-ins','Call new customers','14:00','meeting'),
('c-022','2026-05-15','Plan Webinar #2','Start planning second webinar','10:00','meeting'),
('c-023','2026-05-30','Campaign Retrospective','Full 90-day review + learnings doc','15:00','meeting');

-- Monthly Milestone Markers
INSERT INTO calendar_entries(id,date,title,description,time,category) VALUES
('c-024','2026-03-31','Month 1 Milestone: Traffic & Setup','Review traffic sources, email list growth, content output','EOD','business'),
('c-025','2026-04-30','Month 2 Milestone: Webinar & Sales','Review webinar performance, first sales, conversion rates','EOD','business'),
('c-026','2026-05-31','Month 3 Milestone: Scale & Optimize','Review full campaign ROI, customer feedback, scale plan','EOD','business');

-- Networking Events (placeholders - update with actual events)
INSERT INTO calendar_entries(id,date,title,description,time,category) VALUES
('c-027','2026-03-19','Silicon Cape Meetup','Network + pitch AI Sandbox (TBC)','18:00','meeting'),
('c-028','2026-04-16','StartupGrind Cape Town','Attend + connect with founders (TBC)','18:30','meeting');

-- Content Batch Days
INSERT INTO calendar_entries(id,date,title,description,time,category) VALUES
('c-029','2026-03-15','Content Batch Day: LinkedIn Posts','Write 2 weeks of LinkedIn content','09:00-13:00','content'),
('c-030','2026-03-22','Content Batch Day: Twitter Threads','Write 5 Twitter threads','09:00-12:00','content'),
('c-031','2026-04-05','Content Batch Day: Webinar Promos','Create all webinar promotional materials','09:00-14:00','content');

-- Weekly Review Blocks
INSERT INTO calendar_entries(id,date,title,description,time,category) VALUES
('c-032','2026-03-07','Week 1 Review','Check progress, adjust priorities','16:00','meeting'),
('c-033','2026-03-14','Week 2 Review','Check progress, adjust priorities','16:00','meeting'),
('c-034','2026-03-21','Week 3 Review','Check progress, adjust priorities','16:00','meeting'),
('c-035','2026-03-28','Week 4 Review','Check progress, adjust priorities','16:00','meeting'),
('c-036','2026-04-04','Week 5 Review','Check progress, adjust priorities','16:00','meeting'),
('c-037','2026-04-11','Week 6 Review','Check progress, adjust priorities','16:00','meeting'),
('c-038','2026-04-18','Week 7 Review','Check progress, adjust priorities','16:00','meeting'),
('c-039','2026-04-25','Week 8 Review + Post-Webinar Debrief','Deep dive on webinar performance','16:00','meeting'),
('c-040','2026-05-02','Week 9 Review','Check progress, adjust priorities','16:00','meeting'),
('c-041','2026-05-09','Week 10 Review','Check progress, adjust priorities','16:00','meeting'),
('c-042','2026-05-16','Week 11 Review','Check progress, adjust priorities','16:00','meeting'),
('c-043','2026-05-23','Week 12 Review','Check progress, adjust priorities','16:00','meeting');
