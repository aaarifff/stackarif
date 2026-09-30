import type { DialogueTurn, ScenarioCategory } from "@/lib/types";

export interface DemoScript {
  id: string;
  category: ScenarioCategory;
  title: string;
  description: string;
  relatedScenarioId: string;
  turns: DialogueTurn[];
}

export const DEMOS: DemoScript[] = [
  {
    id: "DEMO-WEB",
    category: "website",
    title: "A cleaning business wants a website",
    description: "Watch how a freelancer turns a vague request into a clear scope.",
    relatedScenarioId: "WEB-01",
    turns: [
      { speaker: "client", text: "I need a website for my cleaning business. Can you tell me how much it will cost?" },
      { speaker: "freelancer", text: "I can prepare an estimate once I understand what you need. What should the website help customers do?" },
      { speaker: "client", text: "I think just show that we exist, and maybe let people book a cleaning." },
      { speaker: "freelancer", text: "That's helpful. Do you want customers to book and pay online, or just send a message?" },
      { speaker: "client", text: "Book and pay would be great, if that's not too expensive." },
      { speaker: "freelancer", text: "Online booking with payment is very doable. How many pages do you imagine, like Home, Services, and Contact?" },
      { speaker: "client", text: "Maybe five pages. I don't have photos or text ready yet though." },
      { speaker: "freelancer", text: "No problem, we can plan the content together, then I'll send a clear estimate and timeline." },
    ],
  },
  {
    id: "DEMO-GADS",
    category: "google-ads",
    title: "First Google Ads discovery call",
    description: "See how to uncover audience, budget, and goals before proposing anything.",
    relatedScenarioId: "GADS-01",
    turns: [
      { speaker: "client", text: "I want to start running Google Ads to get more clients. Where do we begin?" },
      { speaker: "freelancer", text: "Great, let's start with your ideal client. Who usually needs your consultations most?" },
      { speaker: "client", text: "Mostly small business owners who need contract advice." },
      { speaker: "freelancer", text: "That's useful. Do you have a monthly budget in mind for ads?" },
      { speaker: "client", text: "I was thinking around $500 to start." },
      { speaker: "freelancer", text: "That's a reasonable starting point. What would success look like after the first month?" },
      { speaker: "client", text: "Maybe 10 people booking a consultation." },
      { speaker: "freelancer", text: "Perfect, that gives us a clear goal to build the campaign around." },
    ],
  },
  {
    id: "DEMO-TRACK",
    category: "tracking",
    title: "Explaining conversion tracking simply",
    description: "A plain-language walkthrough of what a 'conversion' means to a non-technical owner.",
    relatedScenarioId: "TRACK-01",
    turns: [
      { speaker: "client", text: "Everyone keeps saying 'conversions'. What does that mean for my restaurant?" },
      { speaker: "freelancer", text: "A conversion is simply an action that matters to your business, like completing an online table reservation." },
      { speaker: "client", text: "So if someone just visits the page, that's not a conversion?" },
      { speaker: "freelancer", text: "Right, just visiting isn't counted. It only counts once they finish the reservation form." },
      { speaker: "client", text: "That makes sense now." },
      { speaker: "freelancer", text: "Great, we'll track exactly that action so we know how many real bookings the ads bring in." },
    ],
  },
  {
    id: "DEMO-META",
    category: "meta-ads",
    title: "Planning creative assets for Meta Ads",
    description: "Learn how to gather what you need before a campaign launches.",
    relatedScenarioId: "META-01",
    turns: [
      { speaker: "client", text: "I'm ready to start Meta ads for my jewellery. What do you need from me?" },
      { speaker: "freelancer", text: "Let's start with the offer. Which pieces or collection do you want to promote first?" },
      { speaker: "client", text: "Probably my new necklace collection." },
      { speaker: "freelancer", text: "Great. Do you have professional photos, or just phone pictures for now?" },
      { speaker: "client", text: "Just phone photos right now." },
      { speaker: "freelancer", text: "That's a fine starting point. I'll also ask you to approve the ad text and images before anything goes live." },
    ],
  },
  {
    id: "DEMO-TIKTOK",
    category: "tiktok-ads",
    title: "Setting expectations for a new TikTok test",
    description: "A short exchange about patience, testing, and native video style.",
    relatedScenarioId: "TIKTOK-02",
    turns: [
      { speaker: "client", text: "The ads went live yesterday. How many sales do we have so far?" },
      { speaker: "freelancer", text: "It's very early, the platform is still in its learning phase and results can be unstable at this stage." },
      { speaker: "client", text: "So when will we know if it's working?" },
      { speaker: "freelancer", text: "We planned this as a two-week test, so let's review the real numbers together at the end of that period." },
      { speaker: "client", text: "Okay, that makes sense." },
      { speaker: "freelancer", text: "I'll still keep an eye on it daily and flag anything unusual before then." },
    ],
  },
  {
    id: "DEMO-REPORT",
    category: "reporting",
    title: "Presenting a monthly report with confidence",
    description: "Practice sharing numbers clearly, including limitations and next steps.",
    relatedScenarioId: "REPORT-01",
    turns: [
      { speaker: "client", text: "Hi! How did the campaign do this month?" },
      { speaker: "freelancer", text: "Good news, we spent $1,000 and got 500 clicks and 20 leads, so cost per lead was $50." },
      { speaker: "client", text: "Is $50 per lead good?" },
      { speaker: "freelancer", text: "It's a reasonable start, though we don't yet know how many of these leads became paying customers." },
      { speaker: "client", text: "What should we do next?" },
      { speaker: "freelancer", text: "Let's track which leads convert to sales next month so we can judge true value, not just lead cost." },
    ],
  },
];

export function getDemoById(id: string): DemoScript | undefined {
  return DEMOS.find((demo) => demo.id === id);
}
