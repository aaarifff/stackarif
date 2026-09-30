import type { Scenario } from "@/lib/types";

// Fictional roleplays. Keep IDs stable because saved sessions reference them.
export const ADDITIONAL_SCENARIOS: Scenario[] = [
  {
    "id": "WEB-07",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "A booking calendar with two locations",
    "situation": "Harbor Dental Studio: Two clinics share three dentists; appointments are currently booked by phone.",
    "learnerGoal": "Clarify staff availability before proposing a booking flow.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Nadia Rahman represents Harbor Dental Studio. Two clinics share three dentists; appointments are currently booked by phone. Your task: Clarify staff availability before proposing a booking flow.",
    "persona": {
      "name": "Nadia Rahman",
      "role": "Business owner",
      "business": "Harbor Dental Studio",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "Two clinics share three dentists; appointments are currently booked by phone."
    },
    "hiddenFacts": {
      "clarification": "Their locations change during the week, and reception updates the schedule every Friday."
    },
    "openingMessage": "Can patients book either clinic on the same page?",
    "objectives": [
      "Clarify staff availability before proposing a booking flow",
      "Ask a relevant clarification, such as: \"Do the dentists work at both locations on the same days?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "availability",
        "meaning": "the times when a person or service can be booked"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can patients book either clinic on the same page?"
      },
      {
        "speaker": "freelancer",
        "text": "Do the dentists work at both locations on the same days?"
      },
      {
        "speaker": "client",
        "text": "Their locations change during the week, and reception updates the schedule every Friday."
      },
      {
        "speaker": "freelancer",
        "text": "Let us map each dentist's availability and test a booking at each clinic before launch."
      }
    ],
    "completionGuidance": "The learner should clarify staff availability before proposing a booking flow. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us map each dentist's availability and test a booking at each clinic before launch."
  },
  {
    "id": "WEB-08",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "Moving a store without losing product links",
    "situation": "Maple Kitchen Supply: The store has 240 product pages and is changing platforms in six weeks.",
    "learnerGoal": "Explain a migration plan that includes merged products and link checks.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Oliver Chen represents Maple Kitchen Supply. The store has 240 product pages and is changing platforms in six weeks. Your task: Explain a migration plan that includes merged products and link checks.",
    "persona": {
      "name": "Oliver Chen",
      "role": "Project lead",
      "business": "Maple Kitchen Supply",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "The store has 240 product pages and is changing platforms in six weeks."
    },
    "hiddenFacts": {
      "clarification": "We have the old list, but several products will be merged into bundles."
    },
    "openingMessage": "Can we move everything and keep our old links working?",
    "objectives": [
      "Explain a migration plan that includes merged products and link checks",
      "Ask a relevant clarification, such as: \"Do you have a list of current product addresses and the new ones?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "redirect",
        "meaning": "a rule that sends an old web address to a new one"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can we move everything and keep our old links working?"
      },
      {
        "speaker": "freelancer",
        "text": "Do you have a list of current product addresses and the new ones?"
      },
      {
        "speaker": "client",
        "text": "We have the old list, but several products will be merged into bundles."
      },
      {
        "speaker": "freelancer",
        "text": "We should map old addresses to relevant new pages and test important links before switching."
      }
    ],
    "completionGuidance": "The learner should explain a migration plan that includes merged products and link checks. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should map old addresses to relevant new pages and test important links before switching."
  },
  {
    "id": "WEB-09",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "An accessible enquiry form",
    "situation": "ClearPath Training: The enquiry form has seven fields; two visitors reported difficulty using a keyboard.",
    "learnerGoal": "Discuss accessibility problems without dismissing the user's experience.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Maya Das represents ClearPath Training. The enquiry form has seven fields; two visitors reported difficulty using a keyboard. Your task: Discuss accessibility problems without dismissing the user's experience.",
    "persona": {
      "name": "Maya Das",
      "role": "Project lead",
      "business": "ClearPath Training",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The enquiry form has seven fields; two visitors reported difficulty using a keyboard."
    },
    "hiddenFacts": {
      "clarification": "They could not reach the submit button or understand which field had an error."
    },
    "openingMessage": "The form looks fine to me. Why are people saying they cannot use it?",
    "objectives": [
      "Discuss accessibility problems without dismissing the user's experience",
      "Ask a relevant clarification, such as: \"Which steps were difficult, and were any error messages announced?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "keyboard navigation",
        "meaning": "moving through a page using keys instead of a mouse"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "The form looks fine to me. Why are people saying they cannot use it?"
      },
      {
        "speaker": "freelancer",
        "text": "Which steps were difficult, and were any error messages announced?"
      },
      {
        "speaker": "client",
        "text": "They could not reach the submit button or understand which field had an error."
      },
      {
        "speaker": "freelancer",
        "text": "I suggest checking keyboard navigation, labels, and error feedback, then retesting the complete form."
      }
    ],
    "completionGuidance": "The learner should discuss accessibility problems without dismissing the user's experience. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: I suggest checking keyboard navigation, labels, and error feedback, then retesting the complete form."
  },
  {
    "id": "WEB-10",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "A bilingual menu that stays current",
    "situation": "Saffron Table: The restaurant needs English and Bangla menus; prices change every month.",
    "learnerGoal": "Agree on translation ownership and ongoing menu updates.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Daniel Brooks represents Saffron Table. The restaurant needs English and Bangla menus; prices change every month. Your task: Agree on translation ownership and ongoing menu updates.",
    "persona": {
      "name": "Daniel Brooks",
      "role": "Business owner",
      "business": "Saffron Table",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "The restaurant needs English and Bangla menus; prices change every month."
    },
    "hiddenFacts": {
      "clarification": "Our manager can approve prices, but a translator must check descriptions."
    },
    "openingMessage": "Can you just translate the menu once and put it online?",
    "objectives": [
      "Agree on translation ownership and ongoing menu updates",
      "Ask a relevant clarification, such as: \"Who will approve both language versions when prices or dishes change?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "translation review",
        "meaning": "checking whether a translation communicates the intended meaning"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you just translate the menu once and put it online?"
      },
      {
        "speaker": "freelancer",
        "text": "Who will approve both language versions when prices or dishes change?"
      },
      {
        "speaker": "client",
        "text": "Our manager can approve prices, but a translator must check descriptions."
      },
      {
        "speaker": "freelancer",
        "text": "Let us assign an approver for each language and use one price source for both menus."
      }
    ],
    "completionGuidance": "The learner should agree on translation ownership and ongoing menu updates. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us assign an approver for each language and use one price source for both menus."
  },
  {
    "id": "WEB-11",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "Large photos on a slow mobile page",
    "situation": "Cedar Weddings: The home page loads 30 original wedding photographs; most enquiries come from phones.",
    "learnerGoal": "Explain a performance improvement while protecting visual priorities.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Sara Ahmed represents Cedar Weddings. The home page loads 30 original wedding photographs; most enquiries come from phones. Your task: Explain a performance improvement while protecting visual priorities.",
    "persona": {
      "name": "Sara Ahmed",
      "role": "Project lead",
      "business": "Cedar Weddings",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The home page loads 30 original wedding photographs; most enquiries come from phones."
    },
    "hiddenFacts": {
      "clarification": "The first six are essential; the rest can stay in a separate gallery."
    },
    "openingMessage": "My photos look beautiful, but people say the site is slow.",
    "objectives": [
      "Explain a performance improvement while protecting visual priorities",
      "Ask a relevant clarification, such as: \"Which photos need to appear first, and can the rest load further down the page?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "image compression",
        "meaning": "reducing image file size while preserving acceptable quality"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "My photos look beautiful, but people say the site is slow."
      },
      {
        "speaker": "freelancer",
        "text": "Which photos need to appear first, and can the rest load further down the page?"
      },
      {
        "speaker": "client",
        "text": "The first six are essential; the rest can stay in a separate gallery."
      },
      {
        "speaker": "freelancer",
        "text": "I suggest resizing the first six images and testing mobile loading before changing the whole design."
      }
    ],
    "completionGuidance": "The learner should explain a performance improvement while protecting visual priorities. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: I suggest resizing the first six images and testing mobile loading before changing the whole design."
  },
  {
    "id": "WEB-12",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "A failed payment after checkout",
    "situation": "Northstar Stationery: Three customers reported a payment error; the payment provider shows one charge for one of them.",
    "learnerGoal": "Handle an uncertain payment incident without asking customers to pay twice.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Ethan Patel represents Northstar Stationery. Three customers reported a payment error; the payment provider shows one charge for one of them. Your task: Handle an uncertain payment incident without asking customers to pay twice.",
    "persona": {
      "name": "Ethan Patel",
      "role": "Project lead",
      "business": "Northstar Stationery",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "Three customers reported a payment error; the payment provider shows one charge for one of them."
    },
    "hiddenFacts": {
      "clarification": "We have order numbers, but staff have not checked provider records yet."
    },
    "openingMessage": "Should we tell everyone to pay again?",
    "objectives": [
      "Handle an uncertain payment incident without asking customers to pay twice",
      "Ask a relevant clarification, such as: \"Can we match each order to its payment record before asking for another payment?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "reconciliation",
        "meaning": "matching records from separate systems to find differences"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Should we tell everyone to pay again?"
      },
      {
        "speaker": "freelancer",
        "text": "Can we match each order to its payment record before asking for another payment?"
      },
      {
        "speaker": "client",
        "text": "We have order numbers, but staff have not checked provider records yet."
      },
      {
        "speaker": "freelancer",
        "text": "Let us reconcile those orders first and give each customer an update without risking duplicate charges."
      }
    ],
    "completionGuidance": "The learner should handle an uncertain payment incident without asking customers to pay twice. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us reconcile those orders first and give each customer an update without risking duplicate charges."
  },
  {
    "id": "WEB-13",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "A members-only lesson library",
    "situation": "Fluent Steps Academy: The academy has 80 recorded lessons and plans monthly memberships.",
    "learnerGoal": "Clarify membership access rules before estimating development.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Leila Hassan represents Fluent Steps Academy. The academy has 80 recorded lessons and plans monthly memberships. Your task: Clarify membership access rules before estimating development.",
    "persona": {
      "name": "Leila Hassan",
      "role": "Project lead",
      "business": "Fluent Steps Academy",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The academy has 80 recorded lessons and plans monthly memberships."
    },
    "hiddenFacts": {
      "clarification": "Students should keep access until the paid period ends, with support reviewing payment failures."
    },
    "openingMessage": "Could you hide the lesson pages so only paying students can watch?",
    "objectives": [
      "Clarify membership access rules before estimating development",
      "Ask a relevant clarification, such as: \"What should happen when a membership expires or a payment fails?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "access control",
        "meaning": "rules that determine who can use a resource"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Could you hide the lesson pages so only paying students can watch?"
      },
      {
        "speaker": "freelancer",
        "text": "What should happen when a membership expires or a payment fails?"
      },
      {
        "speaker": "client",
        "text": "Students should keep access until the paid period ends, with support reviewing payment failures."
      },
      {
        "speaker": "freelancer",
        "text": "We should define access rules and test active, expired, and failed-payment accounts before release."
      }
    ],
    "completionGuidance": "The learner should clarify membership access rules before estimating development. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should define access rules and test active, expired, and failed-payment accounts before release."
  },
  {
    "id": "WEB-14",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "A website editor training session",
    "situation": "Willow Community Centre: Two volunteers will update event pages; neither has used the editor.",
    "learnerGoal": "Adapt a handover lesson to the client's everyday editing tasks.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Noah Wilson represents Willow Community Centre. Two volunteers will update event pages; neither has used the editor. Your task: Adapt a handover lesson to the client's everyday editing tasks.",
    "persona": {
      "name": "Noah Wilson",
      "role": "Business owner",
      "business": "Willow Community Centre",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "Two volunteers will update event pages; neither has used the editor."
    },
    "hiddenFacts": {
      "clarification": "Mostly dates, ticket links, and the cancellation notice."
    },
    "openingMessage": "Can you show us how to change events without breaking the site?",
    "objectives": [
      "Adapt a handover lesson to the client's everyday editing tasks",
      "Ask a relevant clarification, such as: \"Which changes will you make most often?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "preview",
        "meaning": "a view of changes before they are published"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you show us how to change events without breaking the site?"
      },
      {
        "speaker": "freelancer",
        "text": "Which changes will you make most often?"
      },
      {
        "speaker": "client",
        "text": "Mostly dates, ticket links, and the cancellation notice."
      },
      {
        "speaker": "freelancer",
        "text": "Let us practise those three tasks together and create a short checklist with a safe preview step."
      }
    ],
    "completionGuidance": "The learner should adapt a handover lesson to the client's everyday editing tasks. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us practise those three tasks together and create a short checklist with a safe preview step."
  },
  {
    "id": "WEB-15",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "An approval process for three directors",
    "situation": "Bridgeview Consulting: Three directors send separate design comments; two rounds of revisions were agreed.",
    "learnerGoal": "Negotiate one approval process when stakeholders disagree.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Priya Sen represents Bridgeview Consulting. Three directors send separate design comments; two rounds of revisions were agreed. Your task: Negotiate one approval process when stakeholders disagree.",
    "persona": {
      "name": "Priya Sen",
      "role": "Project lead",
      "business": "Bridgeview Consulting",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "Three directors send separate design comments; two rounds of revisions were agreed."
    },
    "hiddenFacts": {
      "clarification": "Our operations director can collect feedback, but needs a written decision deadline."
    },
    "openingMessage": "We all have different opinions. Can you keep making versions until we agree?",
    "objectives": [
      "Negotiate one approval process when stakeholders disagree",
      "Ask a relevant clarification, such as: \"Who can combine the comments and give final approval?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "sign-off",
        "meaning": "formal approval that a piece of work is accepted"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "We all have different opinions. Can you keep making versions until we agree?"
      },
      {
        "speaker": "freelancer",
        "text": "Who can combine the comments and give final approval?"
      },
      {
        "speaker": "client",
        "text": "Our operations director can collect feedback, but needs a written decision deadline."
      },
      {
        "speaker": "freelancer",
        "text": "I suggest one combined feedback document and an approval date for each revision round."
      }
    ],
    "completionGuidance": "The learner should negotiate one approval process when stakeholders disagree. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: I suggest one combined feedback document and an approval date for each revision round."
  },
  {
    "id": "WEB-16",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "A maintenance request on a holiday",
    "situation": "Moonrise Florist: The support agreement covers business hours; a holiday campaign starts tomorrow.",
    "learnerGoal": "Set clear boundaries for support outside the existing agreement.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Adam Lewis represents Moonrise Florist. The support agreement covers business hours; a holiday campaign starts tomorrow. Your task: Set clear boundaries for support outside the existing agreement.",
    "persona": {
      "name": "Adam Lewis",
      "role": "Project lead",
      "business": "Moonrise Florist",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The support agreement covers business hours; a holiday campaign starts tomorrow."
    },
    "hiddenFacts": {
      "clarification": "Checkout matters most; we need an emergency contact during daytime hours."
    },
    "openingMessage": "Can you stay available all holiday weekend in case something breaks?",
    "objectives": [
      "Set clear boundaries for support outside the existing agreement",
      "Ask a relevant clarification, such as: \"Which functions are critical during the campaign, and what coverage do you need?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "response window",
        "meaning": "the agreed period within which a request will receive a response"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you stay available all holiday weekend in case something breaks?"
      },
      {
        "speaker": "freelancer",
        "text": "Which functions are critical during the campaign, and what coverage do you need?"
      },
      {
        "speaker": "client",
        "text": "Checkout matters most; we need an emergency contact during daytime hours."
      },
      {
        "speaker": "freelancer",
        "text": "Let us agree on limited emergency coverage, response expectations, and an additional support fee."
      }
    ],
    "completionGuidance": "The learner should set clear boundaries for support outside the existing agreement. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us agree on limited emergency coverage, response expectations, and an additional support fee."
  },
  {
    "id": "WEB-17",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "Recovering an accidentally deleted page",
    "situation": "Oakfield Museum: An editor deleted an exhibition page this morning; backups run nightly.",
    "learnerGoal": "Explain recovery steps and possible data loss calmly.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Meera Khan represents Oakfield Museum. An editor deleted an exhibition page this morning; backups run nightly. Your task: Explain recovery steps and possible data loss calmly.",
    "persona": {
      "name": "Meera Khan",
      "role": "Business owner",
      "business": "Oakfield Museum",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "An editor deleted an exhibition page this morning; backups run nightly."
    },
    "hiddenFacts": {
      "clarification": "The main text was saved yesterday; only today's ticket update may be missing."
    },
    "openingMessage": "I deleted the exhibition page. Have we lost everything?",
    "objectives": [
      "Explain recovery steps and possible data loss calmly",
      "Ask a relevant clarification, such as: \"When was the page last edited, and do you know when it disappeared?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "restore",
        "meaning": "return data or a system to an earlier saved state"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "I deleted the exhibition page. Have we lost everything?"
      },
      {
        "speaker": "freelancer",
        "text": "When was the page last edited, and do you know when it disappeared?"
      },
      {
        "speaker": "client",
        "text": "The main text was saved yesterday; only today's ticket update may be missing."
      },
      {
        "speaker": "freelancer",
        "text": "I will check the available backup and confirm what it contains before restoring the page."
      }
    ],
    "completionGuidance": "The learner should explain recovery steps and possible data loss calmly. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: I will check the available backup and confirm what it contains before restoring the page."
  },
  {
    "id": "WEB-18",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "A supplier feed with incomplete stock data",
    "situation": "TrailPack Outfitters: A supplier sends stock updates every evening; some product identifiers are missing.",
    "learnerGoal": "Challenge a live-data assumption and propose a reliable update process.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Lucas Reed represents TrailPack Outfitters. A supplier sends stock updates every evening; some product identifiers are missing. Your task: Challenge a live-data assumption and propose a reliable update process.",
    "persona": {
      "name": "Lucas Reed",
      "role": "Project lead",
      "business": "TrailPack Outfitters",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "A supplier sends stock updates every evening; some product identifiers are missing."
    },
    "hiddenFacts": {
      "clarification": "It arrives once a day, and some rows use different product codes."
    },
    "openingMessage": "Can our website show live stock from this spreadsheet?",
    "objectives": [
      "Challenge a live-data assumption and propose a reliable update process",
      "Ask a relevant clarification, such as: \"How often is the file updated, and how do we match each row to a product?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "data feed",
        "meaning": "a recurring supply of information from another system"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can our website show live stock from this spreadsheet?"
      },
      {
        "speaker": "freelancer",
        "text": "How often is the file updated, and how do we match each row to a product?"
      },
      {
        "speaker": "client",
        "text": "It arrives once a day, and some rows use different product codes."
      },
      {
        "speaker": "freelancer",
        "text": "We should fix product matching and label stock appropriately rather than describe daily data as live."
      }
    ],
    "completionGuidance": "The learner should challenge a live-data assumption and propose a reliable update process. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should fix product matching and label stock appropriately rather than describe daily data as live."
  },
  {
    "id": "WEB-19",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "A quote calculator with changing rates",
    "situation": "Stonebridge Movers: Moving prices depend on distance, stairs, and weekend availability.",
    "learnerGoal": "Distinguish a useful estimate from a binding final price.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Farah Ali represents Stonebridge Movers. Moving prices depend on distance, stairs, and weekend availability. Your task: Distinguish a useful estimate from a binding final price.",
    "persona": {
      "name": "Farah Ali",
      "role": "Project lead",
      "business": "Stonebridge Movers",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "Moving prices depend on distance, stairs, and weekend availability."
    },
    "hiddenFacts": {
      "clarification": "Stair access and unusually heavy items still require a phone call."
    },
    "openingMessage": "Could the website give a final price automatically?",
    "objectives": [
      "Distinguish a useful estimate from a binding final price",
      "Ask a relevant clarification, such as: \"Which charges are fixed, and which need a person to confirm?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "indicative estimate",
        "meaning": "an approximate figure that may change after more details are checked"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Could the website give a final price automatically?"
      },
      {
        "speaker": "freelancer",
        "text": "Which charges are fixed, and which need a person to confirm?"
      },
      {
        "speaker": "client",
        "text": "Stair access and unusually heavy items still require a phone call."
      },
      {
        "speaker": "freelancer",
        "text": "We can offer an indicative estimate and clearly flag the details needed for a final quote."
      }
    ],
    "completionGuidance": "The learner should distinguish a useful estimate from a binding final price. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We can offer an indicative estimate and clearly flag the details needed for a final quote."
  },
  {
    "id": "WEB-20",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "A launch delayed by domain access",
    "situation": "FreshStart Coaching: The website is ready, but a former contractor controls the domain account.",
    "learnerGoal": "Explain why domain ownership and authorized access affect launch timing.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "James Morgan represents FreshStart Coaching. The website is ready, but a former contractor controls the domain account. Your task: Explain why domain ownership and authorized access affect launch timing.",
    "persona": {
      "name": "James Morgan",
      "role": "Project lead",
      "business": "FreshStart Coaching",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The website is ready, but a former contractor controls the domain account."
    },
    "hiddenFacts": {
      "clarification": "The business owns it, but only the former contractor currently has account access."
    },
    "openingMessage": "Can you launch tonight without speaking to our old contractor?",
    "objectives": [
      "Explain why domain ownership and authorized access affect launch timing",
      "Ask a relevant clarification, such as: \"Who is listed as the domain owner, and can the account be recovered through official support?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "domain registrar",
        "meaning": "the company where a website address is registered"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you launch tonight without speaking to our old contractor?"
      },
      {
        "speaker": "freelancer",
        "text": "Who is listed as the domain owner, and can the account be recovered through official support?"
      },
      {
        "speaker": "client",
        "text": "The business owns it, but only the former contractor currently has account access."
      },
      {
        "speaker": "freelancer",
        "text": "Let us request authorized access and prepare a temporary preview while the transfer is resolved."
      }
    ],
    "completionGuidance": "The learner should explain why domain ownership and authorized access affect launch timing. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us request authorized access and prepare a temporary preview while the transfer is resolved."
  },
  {
    "id": "WEB-21",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "A search box for a growing catalogue",
    "situation": "Paperbird Books: The shop lists 900 books and visitors currently browse by category.",
    "learnerGoal": "Ask about search behaviour before choosing search features.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Anika Roy represents Paperbird Books. The shop lists 900 books and visitors currently browse by category. Your task: Ask about search behaviour before choosing search features.",
    "persona": {
      "name": "Anika Roy",
      "role": "Business owner",
      "business": "Paperbird Books",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "The shop lists 900 books and visitors currently browse by category."
    },
    "hiddenFacts": {
      "clarification": "They often remember an author but only part of a title."
    },
    "openingMessage": "People cannot find books unless they know the category.",
    "objectives": [
      "Ask about search behaviour before choosing search features",
      "Ask a relevant clarification, such as: \"Do visitors search by title, author, or both?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "search query",
        "meaning": "the words a person enters to find information"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "People cannot find books unless they know the category."
      },
      {
        "speaker": "freelancer",
        "text": "Do visitors search by title, author, or both?"
      },
      {
        "speaker": "client",
        "text": "They often remember an author but only part of a title."
      },
      {
        "speaker": "freelancer",
        "text": "I suggest testing title and author search with partial terms and clear no-results messages."
      }
    ],
    "completionGuidance": "The learner should ask about search behaviour before choosing search features. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: I suggest testing title and author search with partial terms and clear no-results messages."
  },
  {
    "id": "WEB-22",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "A donation form with recurring payments",
    "situation": "Bright Future Shelter: The charity accepts one-time donations and wants a monthly option.",
    "learnerGoal": "Discuss the full lifecycle of recurring donations.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Omar Clarke represents Bright Future Shelter. The charity accepts one-time donations and wants a monthly option. Your task: Discuss the full lifecycle of recurring donations.",
    "persona": {
      "name": "Omar Clarke",
      "role": "Project lead",
      "business": "Bright Future Shelter",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The charity accepts one-time donations and wants a monthly option."
    },
    "hiddenFacts": {
      "clarification": "They need a receipt each month and a clear way to stop future payments."
    },
    "openingMessage": "Can you add monthly donations and let supporters cancel themselves?",
    "objectives": [
      "Discuss the full lifecycle of recurring donations",
      "Ask a relevant clarification, such as: \"What confirmation and cancellation information should donors receive?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "recurring payment",
        "meaning": "a payment repeated automatically at an agreed interval"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you add monthly donations and let supporters cancel themselves?"
      },
      {
        "speaker": "freelancer",
        "text": "What confirmation and cancellation information should donors receive?"
      },
      {
        "speaker": "client",
        "text": "They need a receipt each month and a clear way to stop future payments."
      },
      {
        "speaker": "freelancer",
        "text": "We should design the recurring payment, receipt, and cancellation flows together and test them before launch."
      }
    ],
    "completionGuidance": "The learner should discuss the full lifecycle of recurring donations. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should design the recurring payment, receipt, and cancellation flows together and test them before launch."
  },
  {
    "id": "WEB-23",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "A redesign without the original design files",
    "situation": "Bluefin Architecture: The client has screenshots of an old site but no editable design files.",
    "learnerGoal": "Clarify asset ownership and rebuilding effort before accepting a fixed scope.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Sofia Islam represents Bluefin Architecture. The client has screenshots of an old site but no editable design files. Your task: Clarify asset ownership and rebuilding effort before accepting a fixed scope.",
    "persona": {
      "name": "Sofia Islam",
      "role": "Project lead",
      "business": "Bluefin Architecture",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The client has screenshots of an old site but no editable design files."
    },
    "hiddenFacts": {
      "clarification": "We own the photos, but nobody knows where the font license is."
    },
    "openingMessage": "Can you rebuild this exactly from screenshots for the same price as a small refresh?",
    "objectives": [
      "Clarify asset ownership and rebuilding effort before accepting a fixed scope",
      "Ask a relevant clarification, such as: \"Which parts must match exactly, and do you own the fonts and images shown?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "source files",
        "meaning": "editable originals used to create a design or asset"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you rebuild this exactly from screenshots for the same price as a small refresh?"
      },
      {
        "speaker": "freelancer",
        "text": "Which parts must match exactly, and do you own the fonts and images shown?"
      },
      {
        "speaker": "client",
        "text": "We own the photos, but nobody knows where the font license is."
      },
      {
        "speaker": "freelancer",
        "text": "Let us separate reusable assets from items that need replacing and revise the estimate after that review."
      }
    ],
    "completionGuidance": "The learner should clarify asset ownership and rebuilding effort before accepting a fixed scope. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us separate reusable assets from items that need replacing and revise the estimate after that review."
  },
  {
    "id": "WEB-24",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "An account deletion request",
    "situation": "NestNote Journals: The app stores user profiles and order history; deletion rules have not been documented.",
    "learnerGoal": "Identify policy dependencies without making unsupported retention promises.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Ben Walker represents NestNote Journals. The app stores user profiles and order history; deletion rules have not been documented. Your task: Identify policy dependencies without making unsupported retention promises.",
    "persona": {
      "name": "Ben Walker",
      "role": "Project lead",
      "business": "NestNote Journals",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "The app stores user profiles and order history; deletion rules have not been documented."
    },
    "hiddenFacts": {
      "clarification": "Our finance and privacy contacts need to review order retention before we decide."
    },
    "openingMessage": "Can we add a button that instantly deletes every record about a customer?",
    "objectives": [
      "Identify policy dependencies without making unsupported retention promises",
      "Ask a relevant clarification, such as: \"Which records must your team retain, and who will confirm those requirements?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "data retention",
        "meaning": "how long information is kept before deletion or archiving"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can we add a button that instantly deletes every record about a customer?"
      },
      {
        "speaker": "freelancer",
        "text": "Which records must your team retain, and who will confirm those requirements?"
      },
      {
        "speaker": "client",
        "text": "Our finance and privacy contacts need to review order retention before we decide."
      },
      {
        "speaker": "freelancer",
        "text": "We should confirm retention rules with those owners and define deletion, confirmation, and exception handling."
      }
    ],
    "completionGuidance": "The learner should identify policy dependencies without making unsupported retention promises. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should confirm retention rules with those owners and define deletion, confirmation, and exception handling."
  },
  {
    "id": "WEB-25",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "A staging site appearing in search",
    "situation": "PeakView Interiors: An unfinished preview site is publicly accessible and a client found it through search.",
    "learnerGoal": "Separate immediate access controls from uncertain search-removal timing.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Tania Chowdhury represents PeakView Interiors. An unfinished preview site is publicly accessible and a client found it through search. Your task: Separate immediate access controls from uncertain search-removal timing.",
    "persona": {
      "name": "Tania Chowdhury",
      "role": "Project lead",
      "business": "PeakView Interiors",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "An unfinished preview site is publicly accessible and a client found it through search."
    },
    "hiddenFacts": {
      "clarification": "Only our project team needs it; no access restrictions are currently enabled."
    },
    "openingMessage": "Can you remove the preview from search today and promise it will disappear immediately?",
    "objectives": [
      "Separate immediate access controls from uncertain search-removal timing",
      "Ask a relevant clarification, such as: \"Is the preview still publicly accessible, and who needs access to it?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "staging site",
        "meaning": "a separate environment used to review changes before release"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you remove the preview from search today and promise it will disappear immediately?"
      },
      {
        "speaker": "freelancer",
        "text": "Is the preview still publicly accessible, and who needs access to it?"
      },
      {
        "speaker": "client",
        "text": "Only our project team needs it; no access restrictions are currently enabled."
      },
      {
        "speaker": "freelancer",
        "text": "We should restrict access first, then request removal where appropriate and monitor without promising an instant result."
      }
    ],
    "completionGuidance": "The learner should separate immediate access controls from uncertain search-removal timing. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should restrict access first, then request removal where appropriate and monitor without promising an instant result."
  },
  {
    "id": "WEB-26",
    "version": 1,
    "category": "website",
    "categoryLabel": "Website Development",
    "title": "Testing a reservation flow before launch",
    "situation": "Copper Kettle Cafe: The booking form accepts party size, date, and time; staff have not tested it.",
    "learnerGoal": "Explain why testing a complete user journey matters.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Ravi Shah represents Copper Kettle Cafe. The booking form accepts party size, date, and time; staff have not tested it. Your task: Explain why testing a complete user journey matters.",
    "persona": {
      "name": "Ravi Shah",
      "role": "Business owner",
      "business": "Copper Kettle Cafe",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "The booking form accepts party size, date, and time; staff have not tested it."
    },
    "hiddenFacts": {
      "clarification": "No, we have only looked at the form on a laptop."
    },
    "openingMessage": "The form opens, so are we ready to launch?",
    "objectives": [
      "Explain why testing a complete user journey matters",
      "Ask a relevant clarification, such as: \"Have staff tested a full booking and checked the confirmation they receive?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "acceptance test",
        "meaning": "a check that a feature meets the agreed requirements"
      },
      {
        "phrase": "acceptance criteria",
        "meaning": "conditions used to decide whether delivered work meets the agreement",
        "meaningBn": "কাজ গ্রহণের শর্ত"
      },
      {
        "phrase": "dependency",
        "meaning": "something needed before another task can proceed",
        "meaningBn": "নির্ভরতা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "The form opens, so are we ready to launch?"
      },
      {
        "speaker": "freelancer",
        "text": "Have staff tested a full booking and checked the confirmation they receive?"
      },
      {
        "speaker": "client",
        "text": "No, we have only looked at the form on a laptop."
      },
      {
        "speaker": "freelancer",
        "text": "Let us test a normal booking, a full time slot, and a mobile booking before approving launch."
      }
    ],
    "completionGuidance": "The learner should explain why testing a complete user journey matters. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us test a normal booking, a full time slot, and a mobile booking before approving launch."
  },
  {
    "id": "GADS-05",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "Calls from outside the service area",
    "situation": "Riverbend Plumbing: The plumber serves three suburbs but received six enquiries from elsewhere this week.",
    "learnerGoal": "Clarify service boundaries before changing location targeting.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Nadia Rahman represents Riverbend Plumbing. The plumber serves three suburbs but received six enquiries from elsewhere this week. Your task: Clarify service boundaries before changing location targeting.",
    "persona": {
      "name": "Nadia Rahman",
      "role": "Business owner",
      "business": "Riverbend Plumbing",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "The plumber serves three suburbs but received six enquiries from elsewhere this week."
    },
    "hiddenFacts": {
      "clarification": "We only cover the north side; several callers were across the river."
    },
    "openingMessage": "Why are we paying for calls from places we do not serve?",
    "objectives": [
      "Clarify service boundaries before changing location targeting",
      "Ask a relevant clarification, such as: \"Which suburbs can your team actually cover, and where did the unwanted calls come from?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "service area",
        "meaning": "the places where a business provides its services"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Why are we paying for calls from places we do not serve?"
      },
      {
        "speaker": "freelancer",
        "text": "Which suburbs can your team actually cover, and where did the unwanted calls come from?"
      },
      {
        "speaker": "client",
        "text": "We only cover the north side; several callers were across the river."
      },
      {
        "speaker": "freelancer",
        "text": "Let us review location settings and search terms against your service boundary, then monitor enquiry locations."
      }
    ],
    "completionGuidance": "The learner should clarify service boundaries before changing location targeting. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us review location settings and search terms against your service boundary, then monitor enquiry locations."
  },
  {
    "id": "GADS-06",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "Weekend ads with no one answering",
    "situation": "QuickFix Appliances: Ads run daily, but the office answers calls only Monday to Friday.",
    "learnerGoal": "Match advertising schedules to the client's ability to respond.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Oliver Chen represents QuickFix Appliances. Ads run daily, but the office answers calls only Monday to Friday. Your task: Match advertising schedules to the client's ability to respond.",
    "persona": {
      "name": "Oliver Chen",
      "role": "Business owner",
      "business": "QuickFix Appliances",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "Ads run daily, but the office answers calls only Monday to Friday."
    },
    "hiddenFacts": {
      "clarification": "Yes, we have a form, but nobody checks it until Monday morning."
    },
    "openingMessage": "We get calls on Sunday and nobody picks up. Should we stop all the ads?",
    "objectives": [
      "Match advertising schedules to the client's ability to respond",
      "Ask a relevant clarification, such as: \"Can weekend visitors leave a booking request that staff will follow up?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "ad schedule",
        "meaning": "the times when an advertisement is set to run"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "We get calls on Sunday and nobody picks up. Should we stop all the ads?"
      },
      {
        "speaker": "freelancer",
        "text": "Can weekend visitors leave a booking request that staff will follow up?"
      },
      {
        "speaker": "client",
        "text": "Yes, we have a form, but nobody checks it until Monday morning."
      },
      {
        "speaker": "freelancer",
        "text": "We can review weekend call promotion and set clear response expectations for form enquiries."
      }
    ],
    "completionGuidance": "The learner should match advertising schedules to the client's ability to respond. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We can review weekend call promotion and set clear response expectations for form enquiries."
  },
  {
    "id": "GADS-07",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "Brand searches versus new demand",
    "situation": "Birch & Bloom: The account reports 40 orders; 30 followed searches for the shop's own name.",
    "learnerGoal": "Explain why brand-driven conversions do not automatically prove new customer growth.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Maya Das represents Birch & Bloom. The account reports 40 orders; 30 followed searches for the shop's own name. Your task: Explain why brand-driven conversions do not automatically prove new customer growth.",
    "persona": {
      "name": "Maya Das",
      "role": "Project lead",
      "business": "Birch & Bloom",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "The account reports 40 orders; 30 followed searches for the shop's own name."
    },
    "hiddenFacts": {
      "clarification": "We have search terms, but customer status has not been checked."
    },
    "openingMessage": "Does this mean the ads found 40 completely new customers?",
    "objectives": [
      "Explain why brand-driven conversions do not automatically prove new customer growth",
      "Ask a relevant clarification, such as: \"Can we separate brand searches and returning customers from other orders?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "brand search",
        "meaning": "a search containing a company's or product's name"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Does this mean the ads found 40 completely new customers?"
      },
      {
        "speaker": "freelancer",
        "text": "Can we separate brand searches and returning customers from other orders?"
      },
      {
        "speaker": "client",
        "text": "We have search terms, but customer status has not been checked."
      },
      {
        "speaker": "freelancer",
        "text": "Let us report brand and non-brand activity separately and avoid treating every order as new demand."
      }
    ],
    "completionGuidance": "The learner should explain why brand-driven conversions do not automatically prove new customer growth. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us report brand and non-brand activity separately and avoid treating every order as new demand."
  },
  {
    "id": "GADS-08",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "A keyword attracting job applicants",
    "situation": "Reliable Roof Care: A roof repair campaign receives job enquiries alongside customer requests.",
    "learnerGoal": "Explain irrelevant search intent in simple terms.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Daniel Brooks represents Reliable Roof Care. A roof repair campaign receives job enquiries alongside customer requests. Your task: Explain irrelevant search intent in simple terms.",
    "persona": {
      "name": "Daniel Brooks",
      "role": "Business owner",
      "business": "Reliable Roof Care",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "A roof repair campaign receives job enquiries alongside customer requests."
    },
    "hiddenFacts": {
      "clarification": "We are not hiring; several searches included roofing jobs and salary."
    },
    "openingMessage": "People keep asking whether we are hiring. What can we change?",
    "objectives": [
      "Explain irrelevant search intent in simple terms",
      "Ask a relevant clarification, such as: \"Which searches produced those enquiries, and are you recruiting at all?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "negative keyword",
        "meaning": "a term used to prevent ads appearing for unwanted searches"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "People keep asking whether we are hiring. What can we change?"
      },
      {
        "speaker": "freelancer",
        "text": "Which searches produced those enquiries, and are you recruiting at all?"
      },
      {
        "speaker": "client",
        "text": "We are not hiring; several searches included roofing jobs and salary."
      },
      {
        "speaker": "freelancer",
        "text": "We should review those terms and exclude clearly irrelevant job intent while preserving service enquiries."
      }
    ],
    "completionGuidance": "The learner should explain irrelevant search intent in simple terms. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should review those terms and exclude clearly irrelevant job intent while preserving service enquiries."
  },
  {
    "id": "GADS-09",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "A landing page that promises a different offer",
    "situation": "Summit Language School: The ad promotes a free level assessment, but the page opens with paid course packages.",
    "learnerGoal": "Align the ad promise with the landing-page experience.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Sara Ahmed represents Summit Language School. The ad promotes a free level assessment, but the page opens with paid course packages. Your task: Align the ad promise with the landing-page experience.",
    "persona": {
      "name": "Sara Ahmed",
      "role": "Project lead",
      "business": "Summit Language School",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The ad promotes a free level assessment, but the page opens with paid course packages."
    },
    "hiddenFacts": {
      "clarification": "It is below a long course list and the button says contact sales."
    },
    "openingMessage": "People click but then ask where the free assessment is.",
    "objectives": [
      "Align the ad promise with the landing-page experience",
      "Ask a relevant clarification, such as: \"Where can a visitor actually book the assessment on the page?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "message match",
        "meaning": "consistency between an advertisement and its destination page"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "People click but then ask where the free assessment is."
      },
      {
        "speaker": "freelancer",
        "text": "Where can a visitor actually book the assessment on the page?"
      },
      {
        "speaker": "client",
        "text": "It is below a long course list and the button says contact sales."
      },
      {
        "speaker": "freelancer",
        "text": "I suggest making the assessment offer and booking action clear before testing more ad spend."
      }
    ],
    "completionGuidance": "The learner should align the ad promise with the landing-page experience. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: I suggest making the assessment offer and booking action clear before testing more ad spend."
  },
  {
    "id": "GADS-10",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "Separating emergency and routine enquiries",
    "situation": "AfterHours Electric: Emergency calls and planned installation enquiries share one campaign and one budget.",
    "learnerGoal": "Explain a campaign structure based on distinct business needs.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Ethan Patel represents AfterHours Electric. Emergency calls and planned installation enquiries share one campaign and one budget. Your task: Explain a campaign structure based on distinct business needs.",
    "persona": {
      "name": "Ethan Patel",
      "role": "Project lead",
      "business": "AfterHours Electric",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "Emergency calls and planned installation enquiries share one campaign and one budget."
    },
    "hiddenFacts": {
      "clarification": "Emergency work has a dedicated evening team; installations are handled during the day."
    },
    "openingMessage": "Our budget disappears before evening emergencies start.",
    "objectives": [
      "Explain a campaign structure based on distinct business needs",
      "Ask a relevant clarification, such as: \"How do emergency work and planned jobs differ in value and staffing?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "campaign structure",
        "meaning": "the way advertising activities are organized into groups"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Our budget disappears before evening emergencies start."
      },
      {
        "speaker": "freelancer",
        "text": "How do emergency work and planned jobs differ in value and staffing?"
      },
      {
        "speaker": "client",
        "text": "Emergency work has a dedicated evening team; installations are handled during the day."
      },
      {
        "speaker": "freelancer",
        "text": "Let us separate the two goals and discuss budgets and schedules that match each service."
      }
    ],
    "completionGuidance": "The learner should explain a campaign structure based on distinct business needs. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us separate the two goals and discuss budgets and schedules that match each service."
  },
  {
    "id": "GADS-11",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "A promotion that ends before ads stop",
    "situation": "Velvet Homewares: A weekend discount ends Sunday, but the ads have no planned stop time.",
    "learnerGoal": "Set a clear end date for advertising an expiring offer.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Leila Hassan represents Velvet Homewares. A weekend discount ends Sunday, but the ads have no planned stop time. Your task: Set a clear end date for advertising an expiring offer.",
    "persona": {
      "name": "Leila Hassan",
      "role": "Business owner",
      "business": "Velvet Homewares",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "A weekend discount ends Sunday, but the ads have no planned stop time."
    },
    "hiddenFacts": {
      "clarification": "No, the checkout discount will be removed Sunday night."
    },
    "openingMessage": "Can you leave the sale ad running for another week to get more clicks?",
    "objectives": [
      "Set a clear end date for advertising an expiring offer",
      "Ask a relevant clarification, such as: \"Will customers still receive the advertised discount after Sunday?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "offer expiry",
        "meaning": "the point after which a promotion is no longer valid"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you leave the sale ad running for another week to get more clicks?"
      },
      {
        "speaker": "freelancer",
        "text": "Will customers still receive the advertised discount after Sunday?"
      },
      {
        "speaker": "client",
        "text": "No, the checkout discount will be removed Sunday night."
      },
      {
        "speaker": "freelancer",
        "text": "We should stop or replace the sale message when the offer ends and confirm the time zone."
      }
    ],
    "completionGuidance": "The learner should set a clear end date for advertising an expiring offer. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should stop or replace the sale message when the offer ends and confirm the time zone."
  },
  {
    "id": "GADS-12",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "A small sample mistaken for a winner",
    "situation": "Urban Cycle Repair: One ad has 2 bookings from 20 clicks; another has 6 from 100 clicks.",
    "learnerGoal": "Discuss sample size and comparability without dismissing early results.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Noah Wilson represents Urban Cycle Repair. One ad has 2 bookings from 20 clicks; another has 6 from 100 clicks. Your task: Discuss sample size and comparability without dismissing early results.",
    "persona": {
      "name": "Noah Wilson",
      "role": "Project lead",
      "business": "Urban Cycle Repair",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "One ad has 2 bookings from 20 clicks; another has 6 from 100 clicks."
    },
    "hiddenFacts": {
      "clarification": "They ran in different weeks, and one week included a public holiday."
    },
    "openingMessage": "The first ad is obviously better. Shall we give it the whole budget?",
    "objectives": [
      "Discuss sample size and comparability without dismissing early results",
      "Ask a relevant clarification, such as: \"Were both ads shown to comparable visitors over the same period?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "sample size",
        "meaning": "the number of observations available for analysis"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "The first ad is obviously better. Shall we give it the whole budget?"
      },
      {
        "speaker": "freelancer",
        "text": "Were both ads shown to comparable visitors over the same period?"
      },
      {
        "speaker": "client",
        "text": "They ran in different weeks, and one week included a public holiday."
      },
      {
        "speaker": "freelancer",
        "text": "The first result is promising, but I suggest a more comparable test before moving the entire budget."
      }
    ],
    "completionGuidance": "The learner should discuss sample size and comparability without dismissing early results. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: The first result is promising, but I suggest a more comparable test before moving the entire budget."
  },
  {
    "id": "GADS-13",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "A budget increase without more capacity",
    "situation": "Sunbeam Pet Grooming: The salon has 12 appointment slots left this month and wants twice as many ads.",
    "learnerGoal": "Tie an advertising recommendation to service capacity.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Priya Sen represents Sunbeam Pet Grooming. The salon has 12 appointment slots left this month and wants twice as many ads. Your task: Tie an advertising recommendation to service capacity.",
    "persona": {
      "name": "Priya Sen",
      "role": "Project lead",
      "business": "Sunbeam Pet Grooming",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The salon has 12 appointment slots left this month and wants twice as many ads."
    },
    "hiddenFacts": {
      "clarification": "Only twelve this month, although next month is much quieter."
    },
    "openingMessage": "Can you double the spend today? We want more bookings.",
    "objectives": [
      "Tie an advertising recommendation to service capacity",
      "Ask a relevant clarification, such as: \"How many additional appointments can your team actually accept?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "capacity",
        "meaning": "the amount of work a business can handle"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you double the spend today? We want more bookings."
      },
      {
        "speaker": "freelancer",
        "text": "How many additional appointments can your team actually accept?"
      },
      {
        "speaker": "client",
        "text": "Only twelve this month, although next month is much quieter."
      },
      {
        "speaker": "freelancer",
        "text": "Let us focus on filling available slots and plan the larger campaign around next month's capacity."
      }
    ],
    "completionGuidance": "The learner should tie an advertising recommendation to service capacity. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us focus on filling available slots and plan the larger campaign around next month's capacity."
  },
  {
    "id": "GADS-14",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "Search terms the client finds embarrassing",
    "situation": "Civic Career Coaching: The client noticed broad, irrelevant queries in a search-term export.",
    "learnerGoal": "Respond calmly to criticism using specific evidence.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Adam Lewis represents Civic Career Coaching. The client noticed broad, irrelevant queries in a search-term export. Your task: Respond calmly to criticism using specific evidence.",
    "persona": {
      "name": "Adam Lewis",
      "role": "Project lead",
      "business": "Civic Career Coaching",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The client noticed broad, irrelevant queries in a search-term export."
    },
    "hiddenFacts": {
      "clarification": "Five terms worry me, but I have not checked their total cost."
    },
    "openingMessage": "These searches look terrible. Have you wasted the entire budget?",
    "objectives": [
      "Respond calmly to criticism using specific evidence",
      "Ask a relevant clarification, such as: \"Which terms concern you, and how much spend went to those terms?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "search-term review",
        "meaning": "checking the actual searches that led to ad activity"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "These searches look terrible. Have you wasted the entire budget?"
      },
      {
        "speaker": "freelancer",
        "text": "Which terms concern you, and how much spend went to those terms?"
      },
      {
        "speaker": "client",
        "text": "Five terms worry me, but I have not checked their total cost."
      },
      {
        "speaker": "freelancer",
        "text": "I will quantify that spend, explain the review process, and propose targeted exclusions without hiding the issue."
      }
    ],
    "completionGuidance": "The learner should respond calmly to criticism using specific evidence. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: I will quantify that spend, explain the review process, and propose targeted exclusions without hiding the issue."
  },
  {
    "id": "GADS-15",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "An ad rejection with an unclear cause",
    "situation": "Harbor Mobility Aids: Two ads were rejected; the team has not reviewed the stated reasons.",
    "learnerGoal": "Discuss a policy review without promising an outcome or suggesting evasion.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Meera Khan represents Harbor Mobility Aids. Two ads were rejected; the team has not reviewed the stated reasons. Your task: Discuss a policy review without promising an outcome or suggesting evasion.",
    "persona": {
      "name": "Meera Khan",
      "role": "Project lead",
      "business": "Harbor Mobility Aids",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "Two ads were rejected; the team has not reviewed the stated reasons."
    },
    "hiddenFacts": {
      "clarification": "The notice mentions the destination, but we only looked at the ad text."
    },
    "openingMessage": "Can you change a few words and guarantee approval today?",
    "objectives": [
      "Discuss a policy review without promising an outcome or suggesting evasion",
      "Ask a relevant clarification, such as: \"What reason does the account show, and has anyone checked the landing page too?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "review request",
        "meaning": "a request for a platform to reassess a decision"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you change a few words and guarantee approval today?"
      },
      {
        "speaker": "freelancer",
        "text": "What reason does the account show, and has anyone checked the landing page too?"
      },
      {
        "speaker": "client",
        "text": "The notice mentions the destination, but we only looked at the ad text."
      },
      {
        "speaker": "freelancer",
        "text": "Let us inspect the notice and destination, make supported corrections, and use the review process without guaranteeing approval."
      }
    ],
    "completionGuidance": "The learner should discuss a policy review without promising an outcome or suggesting evasion. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us inspect the notice and destination, make supported corrections, and use the review process without guaranteeing approval."
  },
  {
    "id": "GADS-16",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "Business ownership during an agency handoff",
    "situation": "Pinecrest Storage: A previous agency manages the ad account; the business wants a new freelancer.",
    "learnerGoal": "Ask about ownership and continuity during an account transfer.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Lucas Reed represents Pinecrest Storage. A previous agency manages the ad account; the business wants a new freelancer. Your task: Ask about ownership and continuity during an account transfer.",
    "persona": {
      "name": "Lucas Reed",
      "role": "Project lead",
      "business": "Pinecrest Storage",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "A previous agency manages the ad account; the business wants a new freelancer."
    },
    "hiddenFacts": {
      "clarification": "The business owns it, but only the former agency currently has admin access."
    },
    "openingMessage": "Should we just start again so we do not need the old agency?",
    "objectives": [
      "Ask about ownership and continuity during an account transfer",
      "Ask a relevant clarification, such as: \"Does your business own the account, and can an authorized admin grant access?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "account ownership",
        "meaning": "the right to control and administer an account"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Should we just start again so we do not need the old agency?"
      },
      {
        "speaker": "freelancer",
        "text": "Does your business own the account, and can an authorized admin grant access?"
      },
      {
        "speaker": "client",
        "text": "The business owns it, but only the former agency currently has admin access."
      },
      {
        "speaker": "freelancer",
        "text": "We should arrange an authorized handoff and preserve useful history before deciding whether a new account is needed."
      }
    ],
    "completionGuidance": "The learner should ask about ownership and continuity during an account transfer. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should arrange an authorized handoff and preserve useful history before deciding whether a new account is needed."
  },
  {
    "id": "GADS-17",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "A competitor's name in proposed ad copy",
    "situation": "Lighthouse Tutors: The client drafted an ad mentioning a rival tutoring business.",
    "learnerGoal": "Challenge risky copy without offering legal conclusions.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Farah Ali represents Lighthouse Tutors. The client drafted an ad mentioning a rival tutoring business. Your task: Challenge risky copy without offering legal conclusions.",
    "persona": {
      "name": "Farah Ali",
      "role": "Project lead",
      "business": "Lighthouse Tutors",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "The client drafted an ad mentioning a rival tutoring business."
    },
    "hiddenFacts": {
      "clarification": "No one has reviewed it; we only thought the name would attract clicks."
    },
    "openingMessage": "Can we put the rival's name everywhere so their customers notice us?",
    "objectives": [
      "Challenge risky copy without offering legal conclusions",
      "Ask a relevant clarification, such as: \"What claim are you making, and has your team reviewed brand and platform restrictions?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "substantiated claim",
        "meaning": "a statement supported by reliable evidence"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can we put the rival's name everywhere so their customers notice us?"
      },
      {
        "speaker": "freelancer",
        "text": "What claim are you making, and has your team reviewed brand and platform restrictions?"
      },
      {
        "speaker": "client",
        "text": "No one has reviewed it; we only thought the name would attract clicks."
      },
      {
        "speaker": "freelancer",
        "text": "Let us focus on verifiable strengths and have the relevant rules reviewed before using another brand's name."
      }
    ],
    "completionGuidance": "The learner should challenge risky copy without offering legal conclusions. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us focus on verifiable strengths and have the relevant rules reviewed before using another brand's name."
  },
  {
    "id": "GADS-18",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "Lead forms that sales never receives",
    "situation": "Atlas Office Fitouts: The ad account shows 14 enquiries, but the sales inbox contains only four.",
    "learnerGoal": "Distinguish a delivery failure from a lead-quality problem.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "James Morgan represents Atlas Office Fitouts. The ad account shows 14 enquiries, but the sales inbox contains only four. Your task: Distinguish a delivery failure from a lead-quality problem.",
    "persona": {
      "name": "James Morgan",
      "role": "Project lead",
      "business": "Atlas Office Fitouts",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The ad account shows 14 enquiries, but the sales inbox contains only four."
    },
    "hiddenFacts": {
      "clarification": "They go through an automation that was changed last week."
    },
    "openingMessage": "Are the other ten leads fake?",
    "objectives": [
      "Distinguish a delivery failure from a lead-quality problem",
      "Ask a relevant clarification, such as: \"Where are form submissions delivered, and when was that delivery last tested?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "lead routing",
        "meaning": "sending enquiries to the correct person or system"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Are the other ten leads fake?"
      },
      {
        "speaker": "freelancer",
        "text": "Where are form submissions delivered, and when was that delivery last tested?"
      },
      {
        "speaker": "client",
        "text": "They go through an automation that was changed last week."
      },
      {
        "speaker": "freelancer",
        "text": "We should trace test submissions through the delivery process before judging the missing enquiries."
      }
    ],
    "completionGuidance": "The learner should distinguish a delivery failure from a lead-quality problem. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should trace test submissions through the delivery process before judging the missing enquiries."
  },
  {
    "id": "GADS-19",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "A campaign paused by a billing issue",
    "situation": "Meadow Music Lessons: Ads stopped yesterday; the dashboard shows a payment warning.",
    "learnerGoal": "Explain a billing interruption and assign the correct next action.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Anika Roy represents Meadow Music Lessons. Ads stopped yesterday; the dashboard shows a payment warning. Your task: Explain a billing interruption and assign the correct next action.",
    "persona": {
      "name": "Anika Roy",
      "role": "Business owner",
      "business": "Meadow Music Lessons",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "Ads stopped yesterday; the dashboard shows a payment warning."
    },
    "hiddenFacts": {
      "clarification": "Our card expired this month and finance has not replaced it."
    },
    "openingMessage": "Why did you stop our ads without telling us?",
    "objectives": [
      "Explain a billing interruption and assign the correct next action",
      "Ask a relevant clarification, such as: \"Can the account owner check whether the payment method needs attention?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "billing issue",
        "meaning": "a problem collecting or processing payment"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Why did you stop our ads without telling us?"
      },
      {
        "speaker": "freelancer",
        "text": "Can the account owner check whether the payment method needs attention?"
      },
      {
        "speaker": "client",
        "text": "Our card expired this month and finance has not replaced it."
      },
      {
        "speaker": "freelancer",
        "text": "Please ask the authorized owner to update billing; I will verify delivery after the issue is cleared."
      }
    ],
    "completionGuidance": "The learner should explain a billing interruption and assign the correct next action. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Please ask the authorized owner to update billing; I will verify delivery after the issue is cleared."
  },
  {
    "id": "GADS-20",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "A seasonal campaign started too late",
    "situation": "Snowline Heating: The client wants a winter service campaign live tomorrow but has no approved offer.",
    "learnerGoal": "Identify the decisions needed for a rushed seasonal launch.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Omar Clarke represents Snowline Heating. The client wants a winter service campaign live tomorrow but has no approved offer. Your task: Identify the decisions needed for a rushed seasonal launch.",
    "persona": {
      "name": "Omar Clarke",
      "role": "Project lead",
      "business": "Snowline Heating",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The client wants a winter service campaign live tomorrow but has no approved offer."
    },
    "hiddenFacts": {
      "clarification": "The operations manager can approve a maintenance package this afternoon."
    },
    "openingMessage": "Can you turn it on tomorrow and make up the offer yourself?",
    "objectives": [
      "Identify the decisions needed for a rushed seasonal launch",
      "Ask a relevant clarification, such as: \"Which service and price can your team approve today?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "launch checklist",
        "meaning": "the checks required before starting a campaign or product"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you turn it on tomorrow and make up the offer yourself?"
      },
      {
        "speaker": "freelancer",
        "text": "Which service and price can your team approve today?"
      },
      {
        "speaker": "client",
        "text": "The operations manager can approve a maintenance package this afternoon."
      },
      {
        "speaker": "freelancer",
        "text": "Let us get that approval and prepare a focused launch checklist before activating the campaign."
      }
    ],
    "completionGuidance": "The learner should identify the decisions needed for a rushed seasonal launch. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us get that approval and prepare a focused launch checklist before activating the campaign."
  },
  {
    "id": "GADS-21",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "A bilingual search campaign",
    "situation": "LinguaBridge Translation: The business serves English and Bangla speakers; only an English landing page exists.",
    "learnerGoal": "Explain why language support must extend beyond the advertisement.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Sofia Islam represents LinguaBridge Translation. The business serves English and Bangla speakers; only an English landing page exists. Your task: Explain why language support must extend beyond the advertisement.",
    "persona": {
      "name": "Sofia Islam",
      "role": "Project lead",
      "business": "LinguaBridge Translation",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The business serves English and Bangla speakers; only an English landing page exists."
    },
    "hiddenFacts": {
      "clarification": "Our staff can reply in Bangla, but the website form and confirmation are English only."
    },
    "openingMessage": "Can you translate the ads and send everyone to our current page?",
    "objectives": [
      "Explain why language support must extend beyond the advertisement",
      "Ask a relevant clarification, such as: \"Can visitors complete the enquiry process in both languages?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "language consistency",
        "meaning": "using a language coherently across the customer experience"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you translate the ads and send everyone to our current page?"
      },
      {
        "speaker": "freelancer",
        "text": "Can visitors complete the enquiry process in both languages?"
      },
      {
        "speaker": "client",
        "text": "Our staff can reply in Bangla, but the website form and confirmation are English only."
      },
      {
        "speaker": "freelancer",
        "text": "We should align the ad language, page content, and follow-up experience before testing both audiences."
      }
    ],
    "completionGuidance": "The learner should explain why language support must extend beyond the advertisement. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should align the ad language, page content, and follow-up experience before testing both audiences."
  },
  {
    "id": "GADS-22",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "A phone call counted as a sale",
    "situation": "Metro Garage Doors: The report labels all tracked calls as sales, including wrong numbers.",
    "learnerGoal": "Separate an enquiry metric from completed sales.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Ben Walker represents Metro Garage Doors. The report labels all tracked calls as sales, including wrong numbers. Your task: Separate an enquiry metric from completed sales.",
    "persona": {
      "name": "Ben Walker",
      "role": "Business owner",
      "business": "Metro Garage Doors",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "The report labels all tracked calls as sales, including wrong numbers."
    },
    "hiddenFacts": {
      "clarification": "Any tracked call is counted; staff can mark quotes, wrong numbers, and completed jobs."
    },
    "openingMessage": "The report says twenty sales, but we installed only six doors.",
    "objectives": [
      "Separate an enquiry metric from completed sales",
      "Ask a relevant clarification, such as: \"What action is currently counted, and can staff classify the calls?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "qualified enquiry",
        "meaning": "an enquiry that meets agreed relevance criteria"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "The report says twenty sales, but we installed only six doors."
      },
      {
        "speaker": "freelancer",
        "text": "What action is currently counted, and can staff classify the calls?"
      },
      {
        "speaker": "client",
        "text": "Any tracked call is counted; staff can mark quotes, wrong numbers, and completed jobs."
      },
      {
        "speaker": "freelancer",
        "text": "Let us label calls accurately and report completed installations separately."
      }
    ],
    "completionGuidance": "The learner should separate an enquiry metric from completed sales. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us label calls accurately and report completed installations separately."
  },
  {
    "id": "GADS-23",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "Testing a new city with limited budget",
    "situation": "Westport Catering: The company has $600 for a city test and no past results there.",
    "learnerGoal": "Define a market test with explicit constraints and uncertainty.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Tania Chowdhury represents Westport Catering. The company has $600 for a city test and no past results there. Your task: Define a market test with explicit constraints and uncertainty.",
    "persona": {
      "name": "Tania Chowdhury",
      "role": "Project lead",
      "business": "Westport Catering",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "The company has $600 for a city test and no past results there."
    },
    "hiddenFacts": {
      "clarification": "We can serve the central area and need orders for at least thirty people."
    },
    "openingMessage": "Can you promise the new city will perform like our home market?",
    "objectives": [
      "Define a market test with explicit constraints and uncertainty",
      "Ask a relevant clarification, such as: \"What delivery area and order size make a new-city booking worthwhile?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "pilot campaign",
        "meaning": "a limited campaign used to learn before a wider rollout"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you promise the new city will perform like our home market?"
      },
      {
        "speaker": "freelancer",
        "text": "What delivery area and order size make a new-city booking worthwhile?"
      },
      {
        "speaker": "client",
        "text": "We can serve the central area and need orders for at least thirty people."
      },
      {
        "speaker": "freelancer",
        "text": "I suggest a bounded test with those criteria, a review date, and no assumption that results will match the home market."
      }
    ],
    "completionGuidance": "The learner should define a market test with explicit constraints and uncertainty. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: I suggest a bounded test with those criteria, a review date, and no assumption that results will match the home market."
  },
  {
    "id": "GADS-24",
    "version": 1,
    "category": "google-ads",
    "categoryLabel": "Google Ads",
    "title": "A management fee confused with ad spend",
    "situation": "SilverOak Accounting: The proposal lists a $250 management fee and a separate $700 media budget.",
    "learnerGoal": "Explain fee and media-budget separation without sounding defensive.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Ravi Shah represents SilverOak Accounting. The proposal lists a $250 management fee and a separate $700 media budget. Your task: Explain fee and media-budget separation without sounding defensive.",
    "persona": {
      "name": "Ravi Shah",
      "role": "Business owner",
      "business": "SilverOak Accounting",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "The proposal lists a $250 management fee and a separate $700 media budget."
    },
    "hiddenFacts": {
      "clarification": "Yes, I need to show finance the total and who receives each payment."
    },
    "openingMessage": "I thought the $250 included all the money Google needs.",
    "objectives": [
      "Explain fee and media-budget separation without sounding defensive",
      "Ask a relevant clarification, such as: \"Would it help if we separated the service fee from the platform budget on the proposal?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "media budget",
        "meaning": "money allocated to paying advertising platforms"
      },
      {
        "phrase": "relevance",
        "meaning": "how closely something matches a customer need or search",
        "meaningBn": "প্রাসঙ্গিকতা"
      },
      {
        "phrase": "budget limit",
        "meaning": "the maximum amount approved for spending",
        "meaningBn": "ব্যয়ের সীমা"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "I thought the $250 included all the money Google needs."
      },
      {
        "speaker": "freelancer",
        "text": "Would it help if we separated the service fee from the platform budget on the proposal?"
      },
      {
        "speaker": "client",
        "text": "Yes, I need to show finance the total and who receives each payment."
      },
      {
        "speaker": "freelancer",
        "text": "I will show the $950 total with separate recipients and confirm approval before any spending begins."
      }
    ],
    "completionGuidance": "The learner should explain fee and media-budget separation without sounding defensive. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: I will show the $950 total with separate recipients and confirm approval before any spending begins."
  },
  {
    "id": "TRACK-05",
    "version": 1,
    "category": "tracking",
    "categoryLabel": "Tracking & Analytics",
    "title": "A purchase event firing before payment",
    "situation": "Bamboo Basket Store: The purchase event fires when visitors click Pay, before payment is confirmed.",
    "learnerGoal": "Define a conversion trigger that represents the actual business outcome.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Nadia Rahman represents Bamboo Basket Store. The purchase event fires when visitors click Pay, before payment is confirmed. Your task: Define a conversion trigger that represents the actual business outcome.",
    "persona": {
      "name": "Nadia Rahman",
      "role": "Project lead",
      "business": "Bamboo Basket Store",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The purchase event fires when visitors click Pay, before payment is confirmed."
    },
    "hiddenFacts": {
      "clarification": "It runs on the Pay button, even when the card is declined."
    },
    "openingMessage": "Why do we have more purchases in analytics than paid orders?",
    "objectives": [
      "Define a conversion trigger that represents the actual business outcome",
      "Ask a relevant clarification, such as: \"At what exact point does the purchase event fire?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "event trigger",
        "meaning": "the condition that causes a tracking event to be sent"
      },
      {
        "phrase": "validation",
        "meaning": "checking whether data or behaviour matches the intended rules",
        "meaningBn": "যাচাই"
      },
      {
        "phrase": "measurement gap",
        "meaning": "an activity or outcome not reliably captured by the available data",
        "meaningBn": "পরিমাপের ঘাটতি"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Why do we have more purchases in analytics than paid orders?"
      },
      {
        "speaker": "freelancer",
        "text": "At what exact point does the purchase event fire?"
      },
      {
        "speaker": "client",
        "text": "It runs on the Pay button, even when the card is declined."
      },
      {
        "speaker": "freelancer",
        "text": "We should trigger a purchase only after confirmed success and test declined payments separately."
      }
    ],
    "completionGuidance": "The learner should define a conversion trigger that represents the actual business outcome. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should trigger a purchase only after confirmed success and test declined payments separately."
  },
  {
    "id": "TRACK-06",
    "version": 1,
    "category": "tracking",
    "categoryLabel": "Tracking & Analytics",
    "title": "Tracking across a booking provider",
    "situation": "Horizon Kayak Tours: Visitors leave the main site to reserve through an external booking service.",
    "learnerGoal": "Explain cross-site measurement dependencies and limits.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Oliver Chen represents Horizon Kayak Tours. Visitors leave the main site to reserve through an external booking service. Your task: Explain cross-site measurement dependencies and limits.",
    "persona": {
      "name": "Oliver Chen",
      "role": "Project lead",
      "business": "Horizon Kayak Tours",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "Visitors leave the main site to reserve through an external booking service."
    },
    "hiddenFacts": {
      "clarification": "It provides order exports, but we have not checked supported integrations."
    },
    "openingMessage": "Can you tell which ads created bookings on the other website?",
    "objectives": [
      "Explain cross-site measurement dependencies and limits",
      "Ask a relevant clarification, such as: \"What reporting or integration access does the booking provider offer?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "cross-domain journey",
        "meaning": "a visitor journey that moves between different website domains"
      },
      {
        "phrase": "validation",
        "meaning": "checking whether data or behaviour matches the intended rules",
        "meaningBn": "যাচাই"
      },
      {
        "phrase": "measurement gap",
        "meaning": "an activity or outcome not reliably captured by the available data",
        "meaningBn": "পরিমাপের ঘাটতি"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you tell which ads created bookings on the other website?"
      },
      {
        "speaker": "freelancer",
        "text": "What reporting or integration access does the booking provider offer?"
      },
      {
        "speaker": "client",
        "text": "It provides order exports, but we have not checked supported integrations."
      },
      {
        "speaker": "freelancer",
        "text": "Let us confirm the provider's capabilities and document any measurement gaps before promising full attribution."
      }
    ],
    "completionGuidance": "The learner should explain cross-site measurement dependencies and limits. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us confirm the provider's capabilities and document any measurement gaps before promising full attribution."
  },
  {
    "id": "TRACK-07",
    "version": 1,
    "category": "tracking",
    "categoryLabel": "Tracking & Analytics",
    "title": "A consent banner and missing visitors",
    "situation": "Juniper Home Decor: Analytics totals fell after a consent banner was added; orders stayed similar.",
    "learnerGoal": "Discuss consent-related measurement changes without bypassing visitor choices.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Maya Das represents Juniper Home Decor. Analytics totals fell after a consent banner was added; orders stayed similar. Your task: Discuss consent-related measurement changes without bypassing visitor choices.",
    "persona": {
      "name": "Maya Das",
      "role": "Project lead",
      "business": "Juniper Home Decor",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "Analytics totals fell after a consent banner was added; orders stayed similar."
    },
    "hiddenFacts": {
      "clarification": "No, we only compared the totals after launch."
    },
    "openingMessage": "Can you remove the banner so the visitor numbers go back up?",
    "objectives": [
      "Discuss consent-related measurement changes without bypassing visitor choices",
      "Ask a relevant clarification, such as: \"Has anyone tested what tracking does before and after each consent choice?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "consent state",
        "meaning": "the permissions a visitor has chosen for data collection"
      },
      {
        "phrase": "validation",
        "meaning": "checking whether data or behaviour matches the intended rules",
        "meaningBn": "যাচাই"
      },
      {
        "phrase": "measurement gap",
        "meaning": "an activity or outcome not reliably captured by the available data",
        "meaningBn": "পরিমাপের ঘাটতি"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you remove the banner so the visitor numbers go back up?"
      },
      {
        "speaker": "freelancer",
        "text": "Has anyone tested what tracking does before and after each consent choice?"
      },
      {
        "speaker": "client",
        "text": "No, we only compared the totals after launch."
      },
      {
        "speaker": "freelancer",
        "text": "We should test the consent states and explain the measurement change while the privacy owner reviews requirements."
      }
    ],
    "completionGuidance": "The learner should discuss consent-related measurement changes without bypassing visitor choices. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should test the consent states and explain the measurement change while the privacy owner reviews requirements."
  },
  {
    "id": "TRACK-08",
    "version": 1,
    "category": "tracking",
    "categoryLabel": "Tracking & Analytics",
    "title": "Internal staff inflating traffic",
    "situation": "Cornerstone Design: Ten staff members refresh the new site repeatedly while testing pages.",
    "learnerGoal": "Ask about internal traffic before drawing performance conclusions.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Daniel Brooks represents Cornerstone Design. Ten staff members refresh the new site repeatedly while testing pages. Your task: Ask about internal traffic before drawing performance conclusions.",
    "persona": {
      "name": "Daniel Brooks",
      "role": "Business owner",
      "business": "Cornerstone Design",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "Ten staff members refresh the new site repeatedly while testing pages."
    },
    "hiddenFacts": {
      "clarification": "Everyone has been checking it all day from the office and home."
    },
    "openingMessage": "Our traffic doubled, but enquiries did not. Is the launch working?",
    "objectives": [
      "Ask about internal traffic before drawing performance conclusions",
      "Ask a relevant clarification, such as: \"How much of the traffic might be from your team testing the site?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "internal traffic",
        "meaning": "website activity generated by the business's own staff"
      },
      {
        "phrase": "validation",
        "meaning": "checking whether data or behaviour matches the intended rules",
        "meaningBn": "যাচাই"
      },
      {
        "phrase": "measurement gap",
        "meaning": "an activity or outcome not reliably captured by the available data",
        "meaningBn": "পরিমাপের ঘাটতি"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Our traffic doubled, but enquiries did not. Is the launch working?"
      },
      {
        "speaker": "freelancer",
        "text": "How much of the traffic might be from your team testing the site?"
      },
      {
        "speaker": "client",
        "text": "Everyone has been checking it all day from the office and home."
      },
      {
        "speaker": "freelancer",
        "text": "Let us identify test activity and document a way to separate it before interpreting visitor growth."
      }
    ],
    "completionGuidance": "The learner should ask about internal traffic before drawing performance conclusions. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us identify test activity and document a way to separate it before interpreting visitor growth."
  },
  {
    "id": "TRACK-09",
    "version": 1,
    "category": "tracking",
    "categoryLabel": "Tracking & Analytics",
    "title": "Consistent campaign names across emails",
    "situation": "FreshBox Produce: Three people create newsletter links using different campaign spellings.",
    "learnerGoal": "Explain how consistent link naming improves reporting.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Sara Ahmed represents FreshBox Produce. Three people create newsletter links using different campaign spellings. Your task: Explain how consistent link naming improves reporting.",
    "persona": {
      "name": "Sara Ahmed",
      "role": "Business owner",
      "business": "FreshBox Produce",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "Three people create newsletter links using different campaign spellings."
    },
    "hiddenFacts": {
      "clarification": "No, each person writes the names differently."
    },
    "openingMessage": "Why does one newsletter appear as four campaigns?",
    "objectives": [
      "Explain how consistent link naming improves reporting",
      "Ask a relevant clarification, such as: \"Do you use an agreed naming pattern when creating links?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "UTM parameter",
        "meaning": "a label added to a link to describe its campaign source"
      },
      {
        "phrase": "validation",
        "meaning": "checking whether data or behaviour matches the intended rules",
        "meaningBn": "যাচাই"
      },
      {
        "phrase": "measurement gap",
        "meaning": "an activity or outcome not reliably captured by the available data",
        "meaningBn": "পরিমাপের ঘাটতি"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Why does one newsletter appear as four campaigns?"
      },
      {
        "speaker": "freelancer",
        "text": "Do you use an agreed naming pattern when creating links?"
      },
      {
        "speaker": "client",
        "text": "No, each person writes the names differently."
      },
      {
        "speaker": "freelancer",
        "text": "We should agree on a short naming guide and test one shared link template."
      }
    ],
    "completionGuidance": "The learner should explain how consistent link naming improves reporting. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should agree on a short naming guide and test one shared link template."
  },
  {
    "id": "TRACK-10",
    "version": 1,
    "category": "tracking",
    "categoryLabel": "Tracking & Analytics",
    "title": "A checkout currency mismatch",
    "situation": "GlobeCraft Gifts: The store sells in two currencies; the event sends a value without currency.",
    "learnerGoal": "Clarify currency handling before presenting a revenue total.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Ethan Patel represents GlobeCraft Gifts. The store sells in two currencies; the event sends a value without currency. Your task: Clarify currency handling before presenting a revenue total.",
    "persona": {
      "name": "Ethan Patel",
      "role": "Project lead",
      "business": "GlobeCraft Gifts",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "The store sells in two currencies; the event sends a value without currency."
    },
    "hiddenFacts": {
      "clarification": "The checkout knows the currency, but the tracking payload leaves it out."
    },
    "openingMessage": "Can we just add all the purchase values together?",
    "objectives": [
      "Clarify currency handling before presenting a revenue total",
      "Ask a relevant clarification, such as: \"Which currency belongs to each transaction, and is it included in the event?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "event payload",
        "meaning": "the data sent with a tracking event"
      },
      {
        "phrase": "validation",
        "meaning": "checking whether data or behaviour matches the intended rules",
        "meaningBn": "যাচাই"
      },
      {
        "phrase": "measurement gap",
        "meaning": "an activity or outcome not reliably captured by the available data",
        "meaningBn": "পরিমাপের ঘাটতি"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can we just add all the purchase values together?"
      },
      {
        "speaker": "freelancer",
        "text": "Which currency belongs to each transaction, and is it included in the event?"
      },
      {
        "speaker": "client",
        "text": "The checkout knows the currency, but the tracking payload leaves it out."
      },
      {
        "speaker": "freelancer",
        "text": "We should include the correct currency and document any conversion method before aggregating revenue."
      }
    ],
    "completionGuidance": "The learner should clarify currency handling before presenting a revenue total. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should include the correct currency and document any conversion method before aggregating revenue."
  },
  {
    "id": "TRACK-11",
    "version": 1,
    "category": "tracking",
    "categoryLabel": "Tracking & Analytics",
    "title": "A form success message mistaken for a lead",
    "situation": "Elm Street Repairs: A thank-you message remains visible after refreshing the form page.",
    "learnerGoal": "Separate a new submission from repeated viewing of a success message.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Leila Hassan represents Elm Street Repairs. A thank-you message remains visible after refreshing the form page. Your task: Separate a new submission from repeated viewing of a success message.",
    "persona": {
      "name": "Leila Hassan",
      "role": "Project lead",
      "business": "Elm Street Repairs",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "A thank-you message remains visible after refreshing the form page."
    },
    "hiddenFacts": {
      "clarification": "It fires whenever the message is visible, including refreshes."
    },
    "openingMessage": "Every refresh seems to create another enquiry in analytics.",
    "objectives": [
      "Separate a new submission from repeated viewing of a success message",
      "Ask a relevant clarification, such as: \"Is the event tied to a new successful submission or just seeing that message?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "submission identifier",
        "meaning": "a value used to distinguish one form submission from another"
      },
      {
        "phrase": "validation",
        "meaning": "checking whether data or behaviour matches the intended rules",
        "meaningBn": "যাচাই"
      },
      {
        "phrase": "measurement gap",
        "meaning": "an activity or outcome not reliably captured by the available data",
        "meaningBn": "পরিমাপের ঘাটতি"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Every refresh seems to create another enquiry in analytics."
      },
      {
        "speaker": "freelancer",
        "text": "Is the event tied to a new successful submission or just seeing that message?"
      },
      {
        "speaker": "client",
        "text": "It fires whenever the message is visible, including refreshes."
      },
      {
        "speaker": "freelancer",
        "text": "We should use a confirmed submission signal and test refreshes and failed submissions."
      }
    ],
    "completionGuidance": "The learner should separate a new submission from repeated viewing of a success message. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should use a confirmed submission signal and test refreshes and failed submissions."
  },
  {
    "id": "TRACK-12",
    "version": 1,
    "category": "tracking",
    "categoryLabel": "Tracking & Analytics",
    "title": "A marketing link containing customer emails",
    "situation": "Daylight Workshops: An email campaign puts each recipient's email address in tracking parameters.",
    "learnerGoal": "Offer a less intrusive measurement approach without promising compliance.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Noah Wilson represents Daylight Workshops. An email campaign puts each recipient's email address in tracking parameters. Your task: Offer a less intrusive measurement approach without promising compliance.",
    "persona": {
      "name": "Noah Wilson",
      "role": "Project lead",
      "business": "Daylight Workshops",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "An email campaign puts each recipient's email address in tracking parameters."
    },
    "hiddenFacts": {
      "clarification": "We only need campaign totals, not individual visitor identities."
    },
    "openingMessage": "It helps us identify every visitor. Can we keep doing it?",
    "objectives": [
      "Offer a less intrusive measurement approach without promising compliance",
      "Ask a relevant clarification, such as: \"Can the campaign be measured without placing personal information in the URL?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "data minimization",
        "meaning": "collecting only the information needed for a defined purpose"
      },
      {
        "phrase": "validation",
        "meaning": "checking whether data or behaviour matches the intended rules",
        "meaningBn": "যাচাই"
      },
      {
        "phrase": "measurement gap",
        "meaning": "an activity or outcome not reliably captured by the available data",
        "meaningBn": "পরিমাপের ঘাটতি"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "It helps us identify every visitor. Can we keep doing it?"
      },
      {
        "speaker": "freelancer",
        "text": "Can the campaign be measured without placing personal information in the URL?"
      },
      {
        "speaker": "client",
        "text": "We only need campaign totals, not individual visitor identities."
      },
      {
        "speaker": "freelancer",
        "text": "Let us remove personal identifiers and ask the privacy owner to review existing data handling."
      }
    ],
    "completionGuidance": "The learner should offer a less intrusive measurement approach without promising compliance. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us remove personal identifiers and ask the privacy owner to review existing data handling."
  },
  {
    "id": "TRACK-13",
    "version": 1,
    "category": "tracking",
    "categoryLabel": "Tracking & Analytics",
    "title": "A mobile menu event that never fires",
    "situation": "Northgate Cinema: The booking-button event works on desktop but not in the mobile menu.",
    "learnerGoal": "Explain how an implementation gap can affect a metric.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Priya Sen represents Northgate Cinema. The booking-button event works on desktop but not in the mobile menu. Your task: Explain how an implementation gap can affect a metric.",
    "persona": {
      "name": "Priya Sen",
      "role": "Business owner",
      "business": "Northgate Cinema",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "The booking-button event works on desktop but not in the mobile menu."
    },
    "hiddenFacts": {
      "clarification": "No, the original test only used a desktop browser."
    },
    "openingMessage": "Does this mean mobile visitors never try to book?",
    "objectives": [
      "Explain how an implementation gap can affect a metric",
      "Ask a relevant clarification, such as: \"Have we tested the mobile button separately from the desktop one?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "device testing",
        "meaning": "checking behaviour on different devices or screen types"
      },
      {
        "phrase": "validation",
        "meaning": "checking whether data or behaviour matches the intended rules",
        "meaningBn": "যাচাই"
      },
      {
        "phrase": "measurement gap",
        "meaning": "an activity or outcome not reliably captured by the available data",
        "meaningBn": "পরিমাপের ঘাটতি"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Does this mean mobile visitors never try to book?"
      },
      {
        "speaker": "freelancer",
        "text": "Have we tested the mobile button separately from the desktop one?"
      },
      {
        "speaker": "client",
        "text": "No, the original test only used a desktop browser."
      },
      {
        "speaker": "freelancer",
        "text": "We should test both buttons and confirm their tracking rules before interpreting the mobile results."
      }
    ],
    "completionGuidance": "The learner should explain how an implementation gap can affect a metric. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should test both buttons and confirm their tracking rules before interpreting the mobile results."
  },
  {
    "id": "TRACK-14",
    "version": 1,
    "category": "tracking",
    "categoryLabel": "Tracking & Analytics",
    "title": "Documenting events before a developer handoff",
    "situation": "Meridian Learning: A developer is ready to build tracking but only received a list of event names.",
    "learnerGoal": "Turn vague measurement requests into an actionable handoff.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Adam Lewis represents Meridian Learning. A developer is ready to build tracking but only received a list of event names. Your task: Turn vague measurement requests into an actionable handoff.",
    "persona": {
      "name": "Adam Lewis",
      "role": "Project lead",
      "business": "Meridian Learning",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "A developer is ready to build tracking but only received a list of event names."
    },
    "hiddenFacts": {
      "clarification": "Not yet; marketing and product use the same names differently."
    },
    "openingMessage": "Can the developer figure out what each event means?",
    "objectives": [
      "Turn vague measurement requests into an actionable handoff",
      "Ask a relevant clarification, such as: \"Have we defined the action, required fields, and success conditions for each event?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "measurement plan",
        "meaning": "a document defining what to measure and why"
      },
      {
        "phrase": "validation",
        "meaning": "checking whether data or behaviour matches the intended rules",
        "meaningBn": "যাচাই"
      },
      {
        "phrase": "measurement gap",
        "meaning": "an activity or outcome not reliably captured by the available data",
        "meaningBn": "পরিমাপের ঘাটতি"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can the developer figure out what each event means?"
      },
      {
        "speaker": "freelancer",
        "text": "Have we defined the action, required fields, and success conditions for each event?"
      },
      {
        "speaker": "client",
        "text": "Not yet; marketing and product use the same names differently."
      },
      {
        "speaker": "freelancer",
        "text": "Let us create an event specification with examples and assign one approver."
      }
    ],
    "completionGuidance": "The learner should turn vague measurement requests into an actionable handoff. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us create an event specification with examples and assign one approver."
  },
  {
    "id": "TRACK-15",
    "version": 1,
    "category": "tracking",
    "categoryLabel": "Tracking & Analytics",
    "title": "A conversion count with different time zones",
    "situation": "BlueHarbor Tours: The booking system and analytics use different reporting time zones.",
    "learnerGoal": "Clarify time boundaries when reconciling daily counts.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Meera Khan represents BlueHarbor Tours. The booking system and analytics use different reporting time zones. Your task: Clarify time boundaries when reconciling daily counts.",
    "persona": {
      "name": "Meera Khan",
      "role": "Project lead",
      "business": "BlueHarbor Tours",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The booking system and analytics use different reporting time zones."
    },
    "hiddenFacts": {
      "clarification": "The booking system uses local time, but analytics uses another time zone."
    },
    "openingMessage": "Why do yesterday's bookings differ even when the weekly totals are close?",
    "objectives": [
      "Clarify time boundaries when reconciling daily counts",
      "Ask a relevant clarification, such as: \"Are both reports using the same time zone and date boundaries?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "reporting window",
        "meaning": "the time interval included in a report"
      },
      {
        "phrase": "validation",
        "meaning": "checking whether data or behaviour matches the intended rules",
        "meaningBn": "যাচাই"
      },
      {
        "phrase": "measurement gap",
        "meaning": "an activity or outcome not reliably captured by the available data",
        "meaningBn": "পরিমাপের ঘাটতি"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Why do yesterday's bookings differ even when the weekly totals are close?"
      },
      {
        "speaker": "freelancer",
        "text": "Are both reports using the same time zone and date boundaries?"
      },
      {
        "speaker": "client",
        "text": "The booking system uses local time, but analytics uses another time zone."
      },
      {
        "speaker": "freelancer",
        "text": "We should align the reporting boundaries and compare the same period before investigating other causes."
      }
    ],
    "completionGuidance": "The learner should clarify time boundaries when reconciling daily counts. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should align the reporting boundaries and compare the same period before investigating other causes."
  },
  {
    "id": "TRACK-16",
    "version": 1,
    "category": "tracking",
    "categoryLabel": "Tracking & Analytics",
    "title": "A test order contaminating revenue",
    "situation": "Willow Candle Co: Staff placed five test orders of $10 each while checking checkout.",
    "learnerGoal": "Explain the effect of test transactions on revenue reporting.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Lucas Reed represents Willow Candle Co. Staff placed five test orders of $10 each while checking checkout. Your task: Explain the effect of test transactions on revenue reporting.",
    "persona": {
      "name": "Lucas Reed",
      "role": "Business owner",
      "business": "Willow Candle Co",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "Staff placed five test orders of $10 each while checking checkout."
    },
    "hiddenFacts": {
      "clarification": "They were marked in our order notes, but tracking did not distinguish them."
    },
    "openingMessage": "Our report includes fifty dollars we never really earned.",
    "objectives": [
      "Explain the effect of test transactions on revenue reporting",
      "Ask a relevant clarification, such as: \"Were those orders marked as tests or later refunded?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "test transaction",
        "meaning": "an order or payment created to check a system"
      },
      {
        "phrase": "validation",
        "meaning": "checking whether data or behaviour matches the intended rules",
        "meaningBn": "যাচাই"
      },
      {
        "phrase": "measurement gap",
        "meaning": "an activity or outcome not reliably captured by the available data",
        "meaningBn": "পরিমাপের ঘাটতি"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Our report includes fifty dollars we never really earned."
      },
      {
        "speaker": "freelancer",
        "text": "Were those orders marked as tests or later refunded?"
      },
      {
        "speaker": "client",
        "text": "They were marked in our order notes, but tracking did not distinguish them."
      },
      {
        "speaker": "freelancer",
        "text": "Let us identify the five test orders and document how future tests will be excluded or clearly labeled."
      }
    ],
    "completionGuidance": "The learner should explain the effect of test transactions on revenue reporting. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us identify the five test orders and document how future tests will be excluded or clearly labeled."
  },
  {
    "id": "TRACK-17",
    "version": 1,
    "category": "tracking",
    "categoryLabel": "Tracking & Analytics",
    "title": "A single-page app missing page changes",
    "situation": "StudioRoute Courses: The app changes screens without a full page reload; only the first screen is tracked.",
    "learnerGoal": "Explain why application navigation may need explicit measurement.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Farah Ali represents StudioRoute Courses. The app changes screens without a full page reload; only the first screen is tracked. Your task: Explain why application navigation may need explicit measurement.",
    "persona": {
      "name": "Farah Ali",
      "role": "Project lead",
      "business": "StudioRoute Courses",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "The app changes screens without a full page reload; only the first screen is tracked."
    },
    "hiddenFacts": {
      "clarification": "It only runs during the initial page load."
    },
    "openingMessage": "Are people really leaving after one page every time?",
    "objectives": [
      "Explain why application navigation may need explicit measurement",
      "Ask a relevant clarification, such as: \"Does tracking receive a signal when the app changes routes?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "virtual page view",
        "meaning": "a page-view event sent for a screen change without a full reload"
      },
      {
        "phrase": "validation",
        "meaning": "checking whether data or behaviour matches the intended rules",
        "meaningBn": "যাচাই"
      },
      {
        "phrase": "measurement gap",
        "meaning": "an activity or outcome not reliably captured by the available data",
        "meaningBn": "পরিমাপের ঘাটতি"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Are people really leaving after one page every time?"
      },
      {
        "speaker": "freelancer",
        "text": "Does tracking receive a signal when the app changes routes?"
      },
      {
        "speaker": "client",
        "text": "It only runs during the initial page load."
      },
      {
        "speaker": "freelancer",
        "text": "We should define route-change tracking with the developer and test back, forward, and repeated navigation."
      }
    ],
    "completionGuidance": "The learner should explain why application navigation may need explicit measurement. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should define route-change tracking with the developer and test back, forward, and repeated navigation."
  },
  {
    "id": "TRACK-18",
    "version": 1,
    "category": "tracking",
    "categoryLabel": "Tracking & Analytics",
    "title": "Offline bookings missing from campaign reports",
    "situation": "Evergreen Driving School: Many learners enquire online but pay by phone several days later.",
    "learnerGoal": "Connect online enquiries to offline outcomes through reliable records.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "James Morgan represents Evergreen Driving School. Many learners enquire online but pay by phone several days later. Your task: Connect online enquiries to offline outcomes through reliable records.",
    "persona": {
      "name": "James Morgan",
      "role": "Project lead",
      "business": "Evergreen Driving School",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "Many learners enquire online but pay by phone several days later."
    },
    "hiddenFacts": {
      "clarification": "They keep enquiry IDs, but the sales sheet does not record them yet."
    },
    "openingMessage": "Can the report show which enquiries later became paid bookings?",
    "objectives": [
      "Connect online enquiries to offline outcomes through reliable records",
      "Ask a relevant clarification, such as: \"Can staff reliably connect each booking to its original enquiry?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "offline conversion",
        "meaning": "a business outcome completed outside the tracked online flow"
      },
      {
        "phrase": "validation",
        "meaning": "checking whether data or behaviour matches the intended rules",
        "meaningBn": "যাচাই"
      },
      {
        "phrase": "measurement gap",
        "meaning": "an activity or outcome not reliably captured by the available data",
        "meaningBn": "পরিমাপের ঘাটতি"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can the report show which enquiries later became paid bookings?"
      },
      {
        "speaker": "freelancer",
        "text": "Can staff reliably connect each booking to its original enquiry?"
      },
      {
        "speaker": "client",
        "text": "They keep enquiry IDs, but the sales sheet does not record them yet."
      },
      {
        "speaker": "freelancer",
        "text": "Let us add a consistent enquiry reference and agree on a validated reporting process before importing outcomes."
      }
    ],
    "completionGuidance": "The learner should connect online enquiries to offline outcomes through reliable records. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us add a consistent enquiry reference and agree on a validated reporting process before importing outcomes."
  },
  {
    "id": "TRACK-19",
    "version": 1,
    "category": "tracking",
    "categoryLabel": "Tracking & Analytics",
    "title": "A tracking change with no rollback plan",
    "situation": "Cobalt Fitness Gear: A new tracking release will replace several existing events during a sale.",
    "learnerGoal": "Negotiate a controlled tracking release during a sensitive period.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Anika Roy represents Cobalt Fitness Gear. A new tracking release will replace several existing events during a sale. Your task: Negotiate a controlled tracking release during a sensitive period.",
    "persona": {
      "name": "Anika Roy",
      "role": "Project lead",
      "business": "Cobalt Fitness Gear",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "A new tracking release will replace several existing events during a sale."
    },
    "hiddenFacts": {
      "clarification": "We have a draft, but no one documented the current version."
    },
    "openingMessage": "Can you publish all the changes now and check tomorrow?",
    "objectives": [
      "Negotiate a controlled tracking release during a sensitive period",
      "Ask a relevant clarification, such as: \"Do we have test evidence, a version record, and a way to restore the previous setup?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "rollback plan",
        "meaning": "a procedure for returning to a previous working version"
      },
      {
        "phrase": "validation",
        "meaning": "checking whether data or behaviour matches the intended rules",
        "meaningBn": "যাচাই"
      },
      {
        "phrase": "measurement gap",
        "meaning": "an activity or outcome not reliably captured by the available data",
        "meaningBn": "পরিমাপের ঘাটতি"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you publish all the changes now and check tomorrow?"
      },
      {
        "speaker": "freelancer",
        "text": "Do we have test evidence, a version record, and a way to restore the previous setup?"
      },
      {
        "speaker": "client",
        "text": "We have a draft, but no one documented the current version."
      },
      {
        "speaker": "freelancer",
        "text": "We should record the current setup, test the critical events, and agree on a rollback decision before release."
      }
    ],
    "completionGuidance": "The learner should negotiate a controlled tracking release during a sensitive period. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should record the current setup, test the critical events, and agree on a rollback decision before release."
  },
  {
    "id": "META-04",
    "version": 1,
    "category": "meta-ads",
    "categoryLabel": "Meta Ads",
    "title": "Messages arriving after the sales team leaves",
    "situation": "Rosewood Kitchens: Most ad messages arrive after 7 p.m.; sales staff finish at 5 p.m.",
    "learnerGoal": "Connect campaign planning with message-response capacity.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Omar Clarke represents Rosewood Kitchens. Most ad messages arrive after 7 p.m.; sales staff finish at 5 p.m. Your task: Connect campaign planning with message-response capacity.",
    "persona": {
      "name": "Omar Clarke",
      "role": "Business owner",
      "business": "Rosewood Kitchens",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "Most ad messages arrive after 7 p.m.; sales staff finish at 5 p.m."
    },
    "hiddenFacts": {
      "clarification": "We can add one evening shift, but not cover every night."
    },
    "openingMessage": "The messages are cheap, but people stop replying by morning.",
    "objectives": [
      "Connect campaign planning with message-response capacity",
      "Ask a relevant clarification, such as: \"What response time can your team realistically provide?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "response time",
        "meaning": "the time between receiving an enquiry and replying"
      },
      {
        "phrase": "campaign objective",
        "meaning": "the business outcome an advertising campaign is intended to support",
        "meaningBn": "ক্যাম্পেইনের উদ্দেশ্য"
      },
      {
        "phrase": "lead quality",
        "meaning": "how well an enquiry matches the intended customer and business need",
        "meaningBn": "লিডের মান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "The messages are cheap, but people stop replying by morning."
      },
      {
        "speaker": "freelancer",
        "text": "What response time can your team realistically provide?"
      },
      {
        "speaker": "client",
        "text": "We can add one evening shift, but not cover every night."
      },
      {
        "speaker": "freelancer",
        "text": "Let us match the campaign and expectations to the available coverage and measure response quality."
      }
    ],
    "completionGuidance": "The learner should connect campaign planning with message-response capacity. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us match the campaign and expectations to the available coverage and measure response quality."
  },
  {
    "id": "META-05",
    "version": 1,
    "category": "meta-ads",
    "categoryLabel": "Meta Ads",
    "title": "A catalogue advertising sold-out products",
    "situation": "Moss & Linen: The catalogue still lists five products sold out on the website.",
    "learnerGoal": "Address catalogue accuracy before treating complaints as a moderation problem.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Sofia Islam represents Moss & Linen. The catalogue still lists five products sold out on the website. Your task: Address catalogue accuracy before treating complaints as a moderation problem.",
    "persona": {
      "name": "Sofia Islam",
      "role": "Project lead",
      "business": "Moss & Linen",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The catalogue still lists five products sold out on the website."
    },
    "hiddenFacts": {
      "clarification": "It refreshes weekly, and the five items sold out yesterday."
    },
    "openingMessage": "Can you just hide the comments from people who cannot buy?",
    "objectives": [
      "Address catalogue accuracy before treating complaints as a moderation problem",
      "Ask a relevant clarification, such as: \"How often does the catalogue receive stock updates?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "catalogue sync",
        "meaning": "updating a product catalogue from its source data"
      },
      {
        "phrase": "campaign objective",
        "meaning": "the business outcome an advertising campaign is intended to support",
        "meaningBn": "ক্যাম্পেইনের উদ্দেশ্য"
      },
      {
        "phrase": "lead quality",
        "meaning": "how well an enquiry matches the intended customer and business need",
        "meaningBn": "লিডের মান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you just hide the comments from people who cannot buy?"
      },
      {
        "speaker": "freelancer",
        "text": "How often does the catalogue receive stock updates?"
      },
      {
        "speaker": "client",
        "text": "It refreshes weekly, and the five items sold out yesterday."
      },
      {
        "speaker": "freelancer",
        "text": "We should correct the stock feed and affected ads, then respond clearly to customers."
      }
    ],
    "completionGuidance": "The learner should address catalogue accuracy before treating complaints as a moderation problem. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should correct the stock feed and affected ads, then respond clearly to customers."
  },
  {
    "id": "META-06",
    "version": 1,
    "category": "meta-ads",
    "categoryLabel": "Meta Ads",
    "title": "A lead form with too many questions",
    "situation": "Beacon Renovations: The enquiry form asks 18 questions before visitors can submit.",
    "learnerGoal": "Balance qualification needs with enquiry-form effort.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Ben Walker represents Beacon Renovations. The enquiry form asks 18 questions before visitors can submit. Your task: Balance qualification needs with enquiry-form effort.",
    "persona": {
      "name": "Ben Walker",
      "role": "Project lead",
      "business": "Beacon Renovations",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The enquiry form asks 18 questions before visitors can submit."
    },
    "hiddenFacts": {
      "clarification": "Location and project type are essential; detailed measurements can wait."
    },
    "openingMessage": "We need every detail. Why would anyone abandon the form?",
    "objectives": [
      "Balance qualification needs with enquiry-form effort",
      "Ask a relevant clarification, such as: \"Which answers are essential for the first conversation, and which can wait?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "form friction",
        "meaning": "the effort or difficulty involved in completing a form"
      },
      {
        "phrase": "campaign objective",
        "meaning": "the business outcome an advertising campaign is intended to support",
        "meaningBn": "ক্যাম্পেইনের উদ্দেশ্য"
      },
      {
        "phrase": "lead quality",
        "meaning": "how well an enquiry matches the intended customer and business need",
        "meaningBn": "লিডের মান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "We need every detail. Why would anyone abandon the form?"
      },
      {
        "speaker": "freelancer",
        "text": "Which answers are essential for the first conversation, and which can wait?"
      },
      {
        "speaker": "client",
        "text": "Location and project type are essential; detailed measurements can wait."
      },
      {
        "speaker": "freelancer",
        "text": "I suggest shortening the first step and comparing completed, qualified enquiries rather than form volume alone."
      }
    ],
    "completionGuidance": "The learner should balance qualification needs with enquiry-form effort. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: I suggest shortening the first step and comparing completed, qualified enquiries rather than form volume alone."
  },
  {
    "id": "META-07",
    "version": 1,
    "category": "meta-ads",
    "categoryLabel": "Meta Ads",
    "title": "An image approved by the wrong stakeholder",
    "situation": "Arden Home Studio: The assistant approved an ad image, but the owner now objects to the style.",
    "learnerGoal": "Resolve an approval misunderstanding without blaming a colleague.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Tania Chowdhury represents Arden Home Studio. The assistant approved an ad image, but the owner now objects to the style. Your task: Resolve an approval misunderstanding without blaming a colleague.",
    "persona": {
      "name": "Tania Chowdhury",
      "role": "Business owner",
      "business": "Arden Home Studio",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "The assistant approved an ad image, but the owner now objects to the style."
    },
    "hiddenFacts": {
      "clarification": "The assistant thought she could approve it, but I want to review brand visuals."
    },
    "openingMessage": "Why did this go live when I never approved it?",
    "objectives": [
      "Resolve an approval misunderstanding without blaming a colleague",
      "Ask a relevant clarification, such as: \"Who should have final approval, and was that responsibility written down?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "approval chain",
        "meaning": "the sequence of people authorized to review and approve work"
      },
      {
        "phrase": "campaign objective",
        "meaning": "the business outcome an advertising campaign is intended to support",
        "meaningBn": "ক্যাম্পেইনের উদ্দেশ্য"
      },
      {
        "phrase": "lead quality",
        "meaning": "how well an enquiry matches the intended customer and business need",
        "meaningBn": "লিডের মান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Why did this go live when I never approved it?"
      },
      {
        "speaker": "freelancer",
        "text": "Who should have final approval, and was that responsibility written down?"
      },
      {
        "speaker": "client",
        "text": "The assistant thought she could approve it, but I want to review brand visuals."
      },
      {
        "speaker": "freelancer",
        "text": "Let us pause the disputed version and establish one clear approval path for future assets."
      }
    ],
    "completionGuidance": "The learner should resolve an approval misunderstanding without blaming a colleague. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us pause the disputed version and establish one clear approval path for future assets."
  },
  {
    "id": "META-08",
    "version": 1,
    "category": "meta-ads",
    "categoryLabel": "Meta Ads",
    "title": "A retargeting audience without recent visitors",
    "situation": "Harbor Craft School: The site has had little recent traffic; the client wants all budget spent on retargeting.",
    "learnerGoal": "Question an audience strategy using size and recency constraints.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Ravi Shah represents Harbor Craft School. The site has had little recent traffic; the client wants all budget spent on retargeting. Your task: Question an audience strategy using size and recency constraints.",
    "persona": {
      "name": "Ravi Shah",
      "role": "Project lead",
      "business": "Harbor Craft School",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "The site has had little recent traffic; the client wants all budget spent on retargeting."
    },
    "hiddenFacts": {
      "clarification": "We have not checked; the last promotion was several months ago."
    },
    "openingMessage": "Retargeting always works best, so why use anything else?",
    "objectives": [
      "Question an audience strategy using size and recency constraints",
      "Ask a relevant clarification, such as: \"How large and recent is the eligible audience, and how often would they see ads?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "audience recency",
        "meaning": "how recently people performed the action that placed them in an audience"
      },
      {
        "phrase": "campaign objective",
        "meaning": "the business outcome an advertising campaign is intended to support",
        "meaningBn": "ক্যাম্পেইনের উদ্দেশ্য"
      },
      {
        "phrase": "lead quality",
        "meaning": "how well an enquiry matches the intended customer and business need",
        "meaningBn": "লিডের মান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Retargeting always works best, so why use anything else?"
      },
      {
        "speaker": "freelancer",
        "text": "How large and recent is the eligible audience, and how often would they see ads?"
      },
      {
        "speaker": "client",
        "text": "We have not checked; the last promotion was several months ago."
      },
      {
        "speaker": "freelancer",
        "text": "We should assess audience size and delivery first, then decide whether a broader acquisition test is needed."
      }
    ],
    "completionGuidance": "The learner should question an audience strategy using size and recency constraints. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should assess audience size and delivery first, then decide whether a broader acquisition test is needed."
  },
  {
    "id": "META-09",
    "version": 1,
    "category": "meta-ads",
    "categoryLabel": "Meta Ads",
    "title": "A discount that attracts only one-time buyers",
    "situation": "Amber Tea Club: A large first-order discount generates orders, but repeat purchasing is unknown.",
    "learnerGoal": "Discuss acquisition results alongside margin and repeat behaviour.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Nadia Rahman represents Amber Tea Club. A large first-order discount generates orders, but repeat purchasing is unknown. Your task: Discuss acquisition results alongside margin and repeat behaviour.",
    "persona": {
      "name": "Nadia Rahman",
      "role": "Project lead",
      "business": "Amber Tea Club",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "A large first-order discount generates orders, but repeat purchasing is unknown."
    },
    "hiddenFacts": {
      "clarification": "We know the initial margin is small, but have no repeat-purchase report yet."
    },
    "openingMessage": "Can we increase the discount because the order count looks great?",
    "objectives": [
      "Discuss acquisition results alongside margin and repeat behaviour",
      "Ask a relevant clarification, such as: \"What do we know about margin and repeat orders from discounted customers?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "repeat purchase",
        "meaning": "an additional purchase by a customer who bought before"
      },
      {
        "phrase": "campaign objective",
        "meaning": "the business outcome an advertising campaign is intended to support",
        "meaningBn": "ক্যাম্পেইনের উদ্দেশ্য"
      },
      {
        "phrase": "lead quality",
        "meaning": "how well an enquiry matches the intended customer and business need",
        "meaningBn": "লিডের মান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can we increase the discount because the order count looks great?"
      },
      {
        "speaker": "freelancer",
        "text": "What do we know about margin and repeat orders from discounted customers?"
      },
      {
        "speaker": "client",
        "text": "We know the initial margin is small, but have no repeat-purchase report yet."
      },
      {
        "speaker": "freelancer",
        "text": "Let us check contribution and repeat behaviour before making the discount more aggressive."
      }
    ],
    "completionGuidance": "The learner should discuss acquisition results alongside margin and repeat behaviour. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us check contribution and repeat behaviour before making the discount more aggressive."
  },
  {
    "id": "META-10",
    "version": 1,
    "category": "meta-ads",
    "categoryLabel": "Meta Ads",
    "title": "A testimonial without publication permission",
    "situation": "Fernwell Coaching: The client wants to use a private message as a public ad testimonial.",
    "learnerGoal": "Explain why private feedback is not automatically permission to publish.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Oliver Chen represents Fernwell Coaching. The client wants to use a private message as a public ad testimonial. Your task: Explain why private feedback is not automatically permission to publish.",
    "persona": {
      "name": "Oliver Chen",
      "role": "Project lead",
      "business": "Fernwell Coaching",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The client wants to use a private message as a public ad testimonial."
    },
    "hiddenFacts": {
      "clarification": "No, they only sent it privately after a session."
    },
    "openingMessage": "They said something nice in a message. Can you put their name on the ad?",
    "objectives": [
      "Explain why private feedback is not automatically permission to publish",
      "Ask a relevant clarification, such as: \"Do you have their permission for the exact wording, name, and advertising use?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "usage permission",
        "meaning": "approval to use content in a specified way"
      },
      {
        "phrase": "campaign objective",
        "meaning": "the business outcome an advertising campaign is intended to support",
        "meaningBn": "ক্যাম্পেইনের উদ্দেশ্য"
      },
      {
        "phrase": "lead quality",
        "meaning": "how well an enquiry matches the intended customer and business need",
        "meaningBn": "লিডের মান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "They said something nice in a message. Can you put their name on the ad?"
      },
      {
        "speaker": "freelancer",
        "text": "Do you have their permission for the exact wording, name, and advertising use?"
      },
      {
        "speaker": "client",
        "text": "No, they only sent it privately after a session."
      },
      {
        "speaker": "freelancer",
        "text": "Please obtain clear approval for the intended use before we prepare the testimonial creative."
      }
    ],
    "completionGuidance": "The learner should explain why private feedback is not automatically permission to publish. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Please obtain clear approval for the intended use before we prepare the testimonial creative."
  },
  {
    "id": "META-11",
    "version": 1,
    "category": "meta-ads",
    "categoryLabel": "Meta Ads",
    "title": "A campaign split into too many tiny groups",
    "situation": "Tiny Sprout Toys: A $20 daily budget is divided across twelve audience groups.",
    "learnerGoal": "Simplify an overcomplicated test around the client's actual question.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Maya Das represents Tiny Sprout Toys. A $20 daily budget is divided across twelve audience groups. Your task: Simplify an overcomplicated test around the client's actual question.",
    "persona": {
      "name": "Maya Das",
      "role": "Project lead",
      "business": "Tiny Sprout Toys",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "A $20 daily budget is divided across twelve audience groups."
    },
    "hiddenFacts": {
      "clarification": "We mainly want to compare two product themes, not every audience separately."
    },
    "openingMessage": "Can we add ten more groups so we cover every kind of parent?",
    "objectives": [
      "Simplify an overcomplicated test around the client's actual question",
      "Ask a relevant clarification, such as: \"What decision will each group help us make with the available budget?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "test variable",
        "meaning": "the factor deliberately changed in an experiment"
      },
      {
        "phrase": "campaign objective",
        "meaning": "the business outcome an advertising campaign is intended to support",
        "meaningBn": "ক্যাম্পেইনের উদ্দেশ্য"
      },
      {
        "phrase": "lead quality",
        "meaning": "how well an enquiry matches the intended customer and business need",
        "meaningBn": "লিডের মান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can we add ten more groups so we cover every kind of parent?"
      },
      {
        "speaker": "freelancer",
        "text": "What decision will each group help us make with the available budget?"
      },
      {
        "speaker": "client",
        "text": "We mainly want to compare two product themes, not every audience separately."
      },
      {
        "speaker": "freelancer",
        "text": "I suggest a simpler test built around those two themes and enough time to gather useful evidence."
      }
    ],
    "completionGuidance": "The learner should simplify an overcomplicated test around the client's actual question. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: I suggest a simpler test built around those two themes and enough time to gather useful evidence."
  },
  {
    "id": "META-12",
    "version": 1,
    "category": "meta-ads",
    "categoryLabel": "Meta Ads",
    "title": "A local event with an unclear ticket page",
    "situation": "Riverside Food Fair: Ads promote a Saturday event, but the ticket page does not display the date prominently.",
    "learnerGoal": "Identify missing practical details in an event promotion.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Daniel Brooks represents Riverside Food Fair. Ads promote a Saturday event, but the ticket page does not display the date prominently. Your task: Identify missing practical details in an event promotion.",
    "persona": {
      "name": "Daniel Brooks",
      "role": "Business owner",
      "business": "Riverside Food Fair",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "Ads promote a Saturday event, but the ticket page does not display the date prominently."
    },
    "hiddenFacts": {
      "clarification": "It only appears in the long description below the ticket options."
    },
    "openingMessage": "People ask which day it is even after clicking the ad.",
    "objectives": [
      "Identify missing practical details in an event promotion",
      "Ask a relevant clarification, such as: \"Is the event date easy to find before someone chooses a ticket?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "event details",
        "meaning": "the date, time, place, and other information needed to attend"
      },
      {
        "phrase": "campaign objective",
        "meaning": "the business outcome an advertising campaign is intended to support",
        "meaningBn": "ক্যাম্পেইনের উদ্দেশ্য"
      },
      {
        "phrase": "lead quality",
        "meaning": "how well an enquiry matches the intended customer and business need",
        "meaningBn": "লিডের মান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "People ask which day it is even after clicking the ad."
      },
      {
        "speaker": "freelancer",
        "text": "Is the event date easy to find before someone chooses a ticket?"
      },
      {
        "speaker": "client",
        "text": "It only appears in the long description below the ticket options."
      },
      {
        "speaker": "freelancer",
        "text": "Let us make the date, location, and ticket action clear on both the ad and the page."
      }
    ],
    "completionGuidance": "The learner should identify missing practical details in an event promotion. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us make the date, location, and ticket action clear on both the ad and the page."
  },
  {
    "id": "META-13",
    "version": 1,
    "category": "meta-ads",
    "categoryLabel": "Meta Ads",
    "title": "A sudden budget cut halfway through a test",
    "situation": "Atlas Desk Company: A two-week creative test is on day four; the client must halve spending.",
    "learnerGoal": "Renegotiate test scope after a budget change.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Sara Ahmed represents Atlas Desk Company. A two-week creative test is on day four; the client must halve spending. Your task: Renegotiate test scope after a budget change.",
    "persona": {
      "name": "Sara Ahmed",
      "role": "Project lead",
      "business": "Atlas Desk Company",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "A two-week creative test is on day four; the client must halve spending."
    },
    "hiddenFacts": {
      "clarification": "Learning which product message works matters more than testing every format."
    },
    "openingMessage": "Can you keep the original test promises with half the money?",
    "objectives": [
      "Renegotiate test scope after a budget change",
      "Ask a relevant clarification, such as: \"Which business goal matters most if we must reduce the test?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "test scope",
        "meaning": "the questions and variations included in an experiment"
      },
      {
        "phrase": "campaign objective",
        "meaning": "the business outcome an advertising campaign is intended to support",
        "meaningBn": "ক্যাম্পেইনের উদ্দেশ্য"
      },
      {
        "phrase": "lead quality",
        "meaning": "how well an enquiry matches the intended customer and business need",
        "meaningBn": "লিডের মান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you keep the original test promises with half the money?"
      },
      {
        "speaker": "freelancer",
        "text": "Which business goal matters most if we must reduce the test?"
      },
      {
        "speaker": "client",
        "text": "Learning which product message works matters more than testing every format."
      },
      {
        "speaker": "freelancer",
        "text": "We can narrow the test, revise expectations, and document what the smaller budget will leave unresolved."
      }
    ],
    "completionGuidance": "The learner should renegotiate test scope after a budget change. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We can narrow the test, revise expectations, and document what the smaller budget will leave unresolved."
  },
  {
    "id": "META-14",
    "version": 1,
    "category": "meta-ads",
    "categoryLabel": "Meta Ads",
    "title": "A client requesting purchased contact lists",
    "situation": "Crescent Business Coaching: The client proposes uploading a purchased email list to build an audience.",
    "learnerGoal": "Push back on unsupported data-use assumptions and offer an alternative.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Ethan Patel represents Crescent Business Coaching. The client proposes uploading a purchased email list to build an audience. Your task: Push back on unsupported data-use assumptions and offer an alternative.",
    "persona": {
      "name": "Ethan Patel",
      "role": "Project lead",
      "business": "Crescent Business Coaching",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "The client proposes uploading a purchased email list to build an audience."
    },
    "hiddenFacts": {
      "clarification": "The seller only promised that the addresses were active."
    },
    "openingMessage": "Can we use this list even though these people have never heard of us?",
    "objectives": [
      "Push back on unsupported data-use assumptions and offer an alternative",
      "Ask a relevant clarification, such as: \"Do you have documented permission and an approved basis for the intended use?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "first-party data",
        "meaning": "information collected directly through a business's own interactions"
      },
      {
        "phrase": "campaign objective",
        "meaning": "the business outcome an advertising campaign is intended to support",
        "meaningBn": "ক্যাম্পেইনের উদ্দেশ্য"
      },
      {
        "phrase": "lead quality",
        "meaning": "how well an enquiry matches the intended customer and business need",
        "meaningBn": "লিডের মান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can we use this list even though these people have never heard of us?"
      },
      {
        "speaker": "freelancer",
        "text": "Do you have documented permission and an approved basis for the intended use?"
      },
      {
        "speaker": "client",
        "text": "The seller only promised that the addresses were active."
      },
      {
        "speaker": "freelancer",
        "text": "We should not upload it without the relevant permission and policy review; let us discuss eligible first-party audiences."
      }
    ],
    "completionGuidance": "The learner should push back on unsupported data-use assumptions and offer an alternative. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should not upload it without the relevant permission and policy review; let us discuss eligible first-party audiences."
  },
  {
    "id": "META-15",
    "version": 1,
    "category": "meta-ads",
    "categoryLabel": "Meta Ads",
    "title": "A sales campaign with no verified purchase tracking",
    "situation": "Woven Weekend: A store wants to optimize for purchases, but its recent tracking test failed.",
    "learnerGoal": "Explain why a reliable outcome signal matters before optimization.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Leila Hassan represents Woven Weekend. A store wants to optimize for purchases, but its recent tracking test failed. Your task: Explain why a reliable outcome signal matters before optimization.",
    "persona": {
      "name": "Leila Hassan",
      "role": "Project lead",
      "business": "Woven Weekend",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "A store wants to optimize for purchases, but its recent tracking test failed."
    },
    "hiddenFacts": {
      "clarification": "The order value is missing and the developer can investigate tomorrow."
    },
    "openingMessage": "Can you launch now and repair tracking later?",
    "objectives": [
      "Explain why a reliable outcome signal matters before optimization",
      "Ask a relevant clarification, such as: \"Which parts of the purchase event failed, and who can fix them?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "optimization signal",
        "meaning": "the measured action used to guide automated delivery"
      },
      {
        "phrase": "campaign objective",
        "meaning": "the business outcome an advertising campaign is intended to support",
        "meaningBn": "ক্যাম্পেইনের উদ্দেশ্য"
      },
      {
        "phrase": "lead quality",
        "meaning": "how well an enquiry matches the intended customer and business need",
        "meaningBn": "লিডের মান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you launch now and repair tracking later?"
      },
      {
        "speaker": "freelancer",
        "text": "Which parts of the purchase event failed, and who can fix them?"
      },
      {
        "speaker": "client",
        "text": "The order value is missing and the developer can investigate tomorrow."
      },
      {
        "speaker": "freelancer",
        "text": "Let us resolve and retest the purchase signal before relying on it for optimization decisions."
      }
    ],
    "completionGuidance": "The learner should explain why a reliable outcome signal matters before optimization. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us resolve and retest the purchase signal before relying on it for optimization decisions."
  },
  {
    "id": "META-16",
    "version": 1,
    "category": "meta-ads",
    "categoryLabel": "Meta Ads",
    "title": "Creative feedback that only says boring",
    "situation": "Alto Home Fitness: The client rejects three ad drafts with no specific explanation.",
    "learnerGoal": "Turn vague creative criticism into an actionable revision.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Noah Wilson represents Alto Home Fitness. The client rejects three ad drafts with no specific explanation. Your task: Turn vague creative criticism into an actionable revision.",
    "persona": {
      "name": "Noah Wilson",
      "role": "Business owner",
      "business": "Alto Home Fitness",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "The client rejects three ad drafts with no specific explanation."
    },
    "hiddenFacts": {
      "clarification": "The product benefit arrives too late; the visual style is fine."
    },
    "openingMessage": "These ads are boring. Can you make them better?",
    "objectives": [
      "Turn vague creative criticism into an actionable revision",
      "Ask a relevant clarification, such as: \"Is the issue the opening, the product demonstration, or the visual style?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "creative brief",
        "meaning": "a document explaining an asset's goal, audience, and direction"
      },
      {
        "phrase": "campaign objective",
        "meaning": "the business outcome an advertising campaign is intended to support",
        "meaningBn": "ক্যাম্পেইনের উদ্দেশ্য"
      },
      {
        "phrase": "lead quality",
        "meaning": "how well an enquiry matches the intended customer and business need",
        "meaningBn": "লিডের মান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "These ads are boring. Can you make them better?"
      },
      {
        "speaker": "freelancer",
        "text": "Is the issue the opening, the product demonstration, or the visual style?"
      },
      {
        "speaker": "client",
        "text": "The product benefit arrives too late; the visual style is fine."
      },
      {
        "speaker": "freelancer",
        "text": "I will revise the opening to show that benefit sooner and keep the approved visual style."
      }
    ],
    "completionGuidance": "The learner should turn vague creative criticism into an actionable revision. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: I will revise the opening to show that benefit sooner and keep the approved visual style."
  },
  {
    "id": "META-17",
    "version": 1,
    "category": "meta-ads",
    "categoryLabel": "Meta Ads",
    "title": "Customer complaints underneath a promotion",
    "situation": "Golden Crust Bakery: An ad for delivery has comments about two delayed orders.",
    "learnerGoal": "Distinguish service recovery from indiscriminate comment removal.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Priya Sen represents Golden Crust Bakery. An ad for delivery has comments about two delayed orders. Your task: Distinguish service recovery from indiscriminate comment removal.",
    "persona": {
      "name": "Priya Sen",
      "role": "Project lead",
      "business": "Golden Crust Bakery",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "An ad for delivery has comments about two delayed orders."
    },
    "hiddenFacts": {
      "clarification": "Two are genuine, and our support lead can contact those customers today."
    },
    "openingMessage": "Should we delete every negative comment so the ad looks good?",
    "objectives": [
      "Distinguish service recovery from indiscriminate comment removal",
      "Ask a relevant clarification, such as: \"Are these genuine order issues, and who can respond through customer support?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "moderation guideline",
        "meaning": "a rule for handling comments and other public contributions"
      },
      {
        "phrase": "campaign objective",
        "meaning": "the business outcome an advertising campaign is intended to support",
        "meaningBn": "ক্যাম্পেইনের উদ্দেশ্য"
      },
      {
        "phrase": "lead quality",
        "meaning": "how well an enquiry matches the intended customer and business need",
        "meaningBn": "লিডের মান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Should we delete every negative comment so the ad looks good?"
      },
      {
        "speaker": "freelancer",
        "text": "Are these genuine order issues, and who can respond through customer support?"
      },
      {
        "speaker": "client",
        "text": "Two are genuine, and our support lead can contact those customers today."
      },
      {
        "speaker": "freelancer",
        "text": "Let us route real complaints to support and use the agreed moderation rules for abusive or unrelated comments."
      }
    ],
    "completionGuidance": "The learner should distinguish service recovery from indiscriminate comment removal. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us route real complaints to support and use the agreed moderation rules for abusive or unrelated comments."
  },
  {
    "id": "META-18",
    "version": 1,
    "category": "meta-ads",
    "categoryLabel": "Meta Ads",
    "title": "A store campaign that ignores profit by product",
    "situation": "Pebble Outdoor Living: Two product lines have similar revenue but very different gross margins.",
    "learnerGoal": "Use business economics to explain a product-budget recommendation.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Adam Lewis represents Pebble Outdoor Living. Two product lines have similar revenue but very different gross margins. Your task: Use business economics to explain a product-budget recommendation.",
    "persona": {
      "name": "Adam Lewis",
      "role": "Project lead",
      "business": "Pebble Outdoor Living",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "Two product lines have similar revenue but very different gross margins."
    },
    "hiddenFacts": {
      "clarification": "The smaller accessories have higher margins and fewer shipping problems."
    },
    "openingMessage": "Why not split the budget equally because revenue is equal?",
    "objectives": [
      "Use business economics to explain a product-budget recommendation",
      "Ask a relevant clarification, such as: \"Can we compare product margins, fulfilment costs, and stock availability?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "contribution margin",
        "meaning": "revenue remaining after the variable costs being considered"
      },
      {
        "phrase": "campaign objective",
        "meaning": "the business outcome an advertising campaign is intended to support",
        "meaningBn": "ক্যাম্পেইনের উদ্দেশ্য"
      },
      {
        "phrase": "lead quality",
        "meaning": "how well an enquiry matches the intended customer and business need",
        "meaningBn": "লিডের মান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Why not split the budget equally because revenue is equal?"
      },
      {
        "speaker": "freelancer",
        "text": "Can we compare product margins, fulfilment costs, and stock availability?"
      },
      {
        "speaker": "client",
        "text": "The smaller accessories have higher margins and fewer shipping problems."
      },
      {
        "speaker": "freelancer",
        "text": "We should compare contribution and capacity alongside revenue before recommending a split."
      }
    ],
    "completionGuidance": "The learner should use business economics to explain a product-budget recommendation. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should compare contribution and capacity alongside revenue before recommending a split."
  },
  {
    "id": "TIKTOK-04",
    "version": 1,
    "category": "tiktok-ads",
    "categoryLabel": "TikTok Ads",
    "title": "A strong opening hidden at the end",
    "situation": "Loop Lunchboxes: A 25-second video only shows the leak-proof demonstration in the final four seconds.",
    "learnerGoal": "Explain how to move a relevant benefit earlier in a video.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Meera Khan represents Loop Lunchboxes. A 25-second video only shows the leak-proof demonstration in the final four seconds. Your task: Explain how to move a relevant benefit earlier in a video.",
    "persona": {
      "name": "Meera Khan",
      "role": "Business owner",
      "business": "Loop Lunchboxes",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "A 25-second video only shows the leak-proof demonstration in the final four seconds."
    },
    "hiddenFacts": {
      "clarification": "Yes, we can open with the bottle tipping inside the lunchbox."
    },
    "openingMessage": "Everyone leaves before the best part. What should we change?",
    "objectives": [
      "Explain how to move a relevant benefit earlier in a video",
      "Ask a relevant clarification, such as: \"Can the useful demonstration appear near the beginning?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "opening hook",
        "meaning": "the first moment designed to earn a viewer's attention"
      },
      {
        "phrase": "creative variation",
        "meaning": "an alternative version of an advertising asset",
        "meaningBn": "বিজ্ঞাপনের বিকল্প সংস্করণ"
      },
      {
        "phrase": "call to action",
        "meaning": "the next step a viewer is invited to take",
        "meaningBn": "পরবর্তী পদক্ষেপের আহ্বান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Everyone leaves before the best part. What should we change?"
      },
      {
        "speaker": "freelancer",
        "text": "Can the useful demonstration appear near the beginning?"
      },
      {
        "speaker": "client",
        "text": "Yes, we can open with the bottle tipping inside the lunchbox."
      },
      {
        "speaker": "freelancer",
        "text": "Let us test an opening that shows the demonstration immediately and keep the claim accurate."
      }
    ],
    "completionGuidance": "The learner should explain how to move a relevant benefit earlier in a video. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us test an opening that shows the demonstration immediately and keep the claim accurate."
  },
  {
    "id": "TIKTOK-05",
    "version": 1,
    "category": "tiktok-ads",
    "categoryLabel": "TikTok Ads",
    "title": "A creator quote with unclear usage rights",
    "situation": "Vista Travel Bags: A creator quoted for one video but did not specify paid advertising use.",
    "learnerGoal": "Clarify content-use rights before accepting a creator quote.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Lucas Reed represents Vista Travel Bags. A creator quoted for one video but did not specify paid advertising use. Your task: Clarify content-use rights before accepting a creator quote.",
    "persona": {
      "name": "Lucas Reed",
      "role": "Project lead",
      "business": "Vista Travel Bags",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "A creator quoted for one video but did not specify paid advertising use."
    },
    "hiddenFacts": {
      "clarification": "No, it only says one video delivered next Friday."
    },
    "openingMessage": "If we pay for the video, can we run it in ads forever?",
    "objectives": [
      "Clarify content-use rights before accepting a creator quote",
      "Ask a relevant clarification, such as: \"Does the agreement state the channels, duration, and editing rights?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "usage term",
        "meaning": "the agreed period or conditions for using content"
      },
      {
        "phrase": "creative variation",
        "meaning": "an alternative version of an advertising asset",
        "meaningBn": "বিজ্ঞাপনের বিকল্প সংস্করণ"
      },
      {
        "phrase": "call to action",
        "meaning": "the next step a viewer is invited to take",
        "meaningBn": "পরবর্তী পদক্ষেপের আহ্বান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "If we pay for the video, can we run it in ads forever?"
      },
      {
        "speaker": "freelancer",
        "text": "Does the agreement state the channels, duration, and editing rights?"
      },
      {
        "speaker": "client",
        "text": "No, it only says one video delivered next Friday."
      },
      {
        "speaker": "freelancer",
        "text": "Let us confirm the intended advertising usage and duration in writing before commissioning it."
      }
    ],
    "completionGuidance": "The learner should clarify content-use rights before accepting a creator quote. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us confirm the intended advertising usage and duration in writing before commissioning it."
  },
  {
    "id": "TIKTOK-06",
    "version": 1,
    "category": "tiktok-ads",
    "categoryLabel": "TikTok Ads",
    "title": "Product text covered by interface buttons",
    "situation": "Clover Skin Tools: Important product text sits at the bottom and right edge of the video.",
    "learnerGoal": "Explain why exported-video appearance differs from placement appearance.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Farah Ali represents Clover Skin Tools. Important product text sits at the bottom and right edge of the video. Your task: Explain why exported-video appearance differs from placement appearance.",
    "persona": {
      "name": "Farah Ali",
      "role": "Project lead",
      "business": "Clover Skin Tools",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "Important product text sits at the bottom and right edge of the video."
    },
    "hiddenFacts": {
      "clarification": "No, the designer only watched the exported file."
    },
    "openingMessage": "The text is readable in the file. Why is it hidden in the ad preview?",
    "objectives": [
      "Explain why exported-video appearance differs from placement appearance",
      "Ask a relevant clarification, such as: \"Have we checked the video in each intended placement preview?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "safe area",
        "meaning": "a region where important content is less likely to be covered"
      },
      {
        "phrase": "creative variation",
        "meaning": "an alternative version of an advertising asset",
        "meaningBn": "বিজ্ঞাপনের বিকল্প সংস্করণ"
      },
      {
        "phrase": "call to action",
        "meaning": "the next step a viewer is invited to take",
        "meaningBn": "পরবর্তী পদক্ষেপের আহ্বান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "The text is readable in the file. Why is it hidden in the ad preview?"
      },
      {
        "speaker": "freelancer",
        "text": "Have we checked the video in each intended placement preview?"
      },
      {
        "speaker": "client",
        "text": "No, the designer only watched the exported file."
      },
      {
        "speaker": "freelancer",
        "text": "We should reposition key text and review the actual placement previews before publishing."
      }
    ],
    "completionGuidance": "The learner should explain why exported-video appearance differs from placement appearance. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should reposition key text and review the actual placement previews before publishing."
  },
  {
    "id": "TIKTOK-07",
    "version": 1,
    "category": "tiktok-ads",
    "categoryLabel": "TikTok Ads",
    "title": "A recipe video without clear product context",
    "situation": "Daily Grain: The video shows a full breakfast recipe but barely identifies the cereal being sold.",
    "learnerGoal": "Connect entertaining content to a recognizable product and action.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "James Morgan represents Daily Grain. The video shows a full breakfast recipe but barely identifies the cereal being sold. Your task: Connect entertaining content to a recognizable product and action.",
    "persona": {
      "name": "James Morgan",
      "role": "Business owner",
      "business": "Daily Grain",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "The video shows a full breakfast recipe but barely identifies the cereal being sold."
    },
    "hiddenFacts": {
      "clarification": "The package only appears for one second at the end."
    },
    "openingMessage": "People love the recipe, but nobody remembers our product.",
    "objectives": [
      "Connect entertaining content to a recognizable product and action",
      "Ask a relevant clarification, such as: \"At what point can viewers see what the product is and why it matters?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "product context",
        "meaning": "the situation that helps viewers understand a product's purpose"
      },
      {
        "phrase": "creative variation",
        "meaning": "an alternative version of an advertising asset",
        "meaningBn": "বিজ্ঞাপনের বিকল্প সংস্করণ"
      },
      {
        "phrase": "call to action",
        "meaning": "the next step a viewer is invited to take",
        "meaningBn": "পরবর্তী পদক্ষেপের আহ্বান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "People love the recipe, but nobody remembers our product."
      },
      {
        "speaker": "freelancer",
        "text": "At what point can viewers see what the product is and why it matters?"
      },
      {
        "speaker": "client",
        "text": "The package only appears for one second at the end."
      },
      {
        "speaker": "freelancer",
        "text": "Let us introduce the product naturally during the recipe and make the next step clear."
      }
    ],
    "completionGuidance": "The learner should connect entertaining content to a recognizable product and action. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us introduce the product naturally during the recipe and make the next step clear."
  },
  {
    "id": "TIKTOK-08",
    "version": 1,
    "category": "tiktok-ads",
    "categoryLabel": "TikTok Ads",
    "title": "A creator missing the agreed delivery date",
    "situation": "Mountain Sip: Three videos were due Monday; the first draft has not arrived and launch is Thursday.",
    "learnerGoal": "Renegotiate a creative launch around a delayed dependency.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Anika Roy represents Mountain Sip. Three videos were due Monday; the first draft has not arrived and launch is Thursday. Your task: Renegotiate a creative launch around a delayed dependency.",
    "persona": {
      "name": "Anika Roy",
      "role": "Project lead",
      "business": "Mountain Sip",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "Three videos were due Monday; the first draft has not arrived and launch is Thursday."
    },
    "hiddenFacts": {
      "clarification": "They can send one draft tomorrow, but not all three."
    },
    "openingMessage": "Can you promise we will still launch all three videos on Thursday?",
    "objectives": [
      "Renegotiate a creative launch around a delayed dependency",
      "Ask a relevant clarification, such as: \"Has the creator confirmed a revised delivery time or shared any usable footage?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "delivery milestone",
        "meaning": "an agreed point when a specific item should be provided"
      },
      {
        "phrase": "creative variation",
        "meaning": "an alternative version of an advertising asset",
        "meaningBn": "বিজ্ঞাপনের বিকল্প সংস্করণ"
      },
      {
        "phrase": "call to action",
        "meaning": "the next step a viewer is invited to take",
        "meaningBn": "পরবর্তী পদক্ষেপের আহ্বান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you promise we will still launch all three videos on Thursday?"
      },
      {
        "speaker": "freelancer",
        "text": "Has the creator confirmed a revised delivery time or shared any usable footage?"
      },
      {
        "speaker": "client",
        "text": "They can send one draft tomorrow, but not all three."
      },
      {
        "speaker": "freelancer",
        "text": "I suggest reviewing that draft for a smaller launch and revising the remaining schedule with the creator."
      }
    ],
    "completionGuidance": "The learner should renegotiate a creative launch around a delayed dependency. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: I suggest reviewing that draft for a smaller launch and revising the remaining schedule with the creator."
  },
  {
    "id": "TIKTOK-09",
    "version": 1,
    "category": "tiktok-ads",
    "categoryLabel": "TikTok Ads",
    "title": "A trending sound without commercial clearance",
    "situation": "Neon Notebook: The client wants a popular sound but has not checked advertising rights.",
    "learnerGoal": "Separate popularity from permission to use audio commercially.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Omar Clarke represents Neon Notebook. The client wants a popular sound but has not checked advertising rights. Your task: Separate popularity from permission to use audio commercially.",
    "persona": {
      "name": "Omar Clarke",
      "role": "Project lead",
      "business": "Neon Notebook",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "The client wants a popular sound but has not checked advertising rights."
    },
    "hiddenFacts": {
      "clarification": "We only saw it in other people's posts."
    },
    "openingMessage": "Everyone uses this sound. Can we put it in our paid video too?",
    "objectives": [
      "Separate popularity from permission to use audio commercially",
      "Ask a relevant clarification, such as: \"Has the sound been cleared for your intended commercial use?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "commercial clearance",
        "meaning": "permission for content to be used for business purposes"
      },
      {
        "phrase": "creative variation",
        "meaning": "an alternative version of an advertising asset",
        "meaningBn": "বিজ্ঞাপনের বিকল্প সংস্করণ"
      },
      {
        "phrase": "call to action",
        "meaning": "the next step a viewer is invited to take",
        "meaningBn": "পরবর্তী পদক্ষেপের আহ্বান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Everyone uses this sound. Can we put it in our paid video too?"
      },
      {
        "speaker": "freelancer",
        "text": "Has the sound been cleared for your intended commercial use?"
      },
      {
        "speaker": "client",
        "text": "We only saw it in other people's posts."
      },
      {
        "speaker": "freelancer",
        "text": "We should verify permitted use or choose cleared audio before building the final edit."
      }
    ],
    "completionGuidance": "The learner should separate popularity from permission to use audio commercially. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should verify permitted use or choose cleared audio before building the final edit."
  },
  {
    "id": "TIKTOK-10",
    "version": 1,
    "category": "tiktok-ads",
    "categoryLabel": "TikTok Ads",
    "title": "Comparing views with completed orders",
    "situation": "Orbit Desk Lamps: A video received 40,000 views, but the store recorded eight orders during the campaign.",
    "learnerGoal": "Distinguish video attention from verified business outcomes.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Sofia Islam represents Orbit Desk Lamps. A video received 40,000 views, but the store recorded eight orders during the campaign. Your task: Distinguish video attention from verified business outcomes.",
    "persona": {
      "name": "Sofia Islam",
      "role": "Business owner",
      "business": "Orbit Desk Lamps",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "A video received 40,000 views, but the store recorded eight orders during the campaign."
    },
    "hiddenFacts": {
      "clarification": "We know total spend, but have not reconciled the orders yet."
    },
    "openingMessage": "Forty thousand views means the campaign was a sales success, right?",
    "objectives": [
      "Distinguish video attention from verified business outcomes",
      "Ask a relevant clarification, such as: \"Can we identify which orders are attributable and what the campaign cost?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "view-through behaviour",
        "meaning": "what viewers do after watching content, whether or not they click"
      },
      {
        "phrase": "creative variation",
        "meaning": "an alternative version of an advertising asset",
        "meaningBn": "বিজ্ঞাপনের বিকল্প সংস্করণ"
      },
      {
        "phrase": "call to action",
        "meaning": "the next step a viewer is invited to take",
        "meaningBn": "পরবর্তী পদক্ষেপের আহ্বান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Forty thousand views means the campaign was a sales success, right?"
      },
      {
        "speaker": "freelancer",
        "text": "Can we identify which orders are attributable and what the campaign cost?"
      },
      {
        "speaker": "client",
        "text": "We know total spend, but have not reconciled the orders yet."
      },
      {
        "speaker": "freelancer",
        "text": "Views show exposure; let us verify orders and costs before making a sales claim."
      }
    ],
    "completionGuidance": "The learner should distinguish video attention from verified business outcomes. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Views show exposure; let us verify orders and costs before making a sales claim."
  },
  {
    "id": "TIKTOK-11",
    "version": 1,
    "category": "tiktok-ads",
    "categoryLabel": "TikTok Ads",
    "title": "A demonstration that exaggerates durability",
    "situation": "TrailStone Bottles: A proposed video claims the bottle can never break, but only one drop test exists.",
    "learnerGoal": "Replace an unsupported absolute claim with an evidence-based description.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Ben Walker represents TrailStone Bottles. A proposed video claims the bottle can never break, but only one drop test exists. Your task: Replace an unsupported absolute claim with an evidence-based description.",
    "persona": {
      "name": "Ben Walker",
      "role": "Project lead",
      "business": "TrailStone Bottles",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "A proposed video claims the bottle can never break, but only one drop test exists."
    },
    "hiddenFacts": {
      "clarification": "We only dropped one sample from a table."
    },
    "openingMessage": "Can we say it is indestructible? It survived our test.",
    "objectives": [
      "Replace an unsupported absolute claim with an evidence-based description",
      "Ask a relevant clarification, such as: \"What evidence supports that claim across realistic use conditions?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "absolute claim",
        "meaning": "a statement that presents something as true without exceptions"
      },
      {
        "phrase": "creative variation",
        "meaning": "an alternative version of an advertising asset",
        "meaningBn": "বিজ্ঞাপনের বিকল্প সংস্করণ"
      },
      {
        "phrase": "call to action",
        "meaning": "the next step a viewer is invited to take",
        "meaningBn": "পরবর্তী পদক্ষেপের আহ্বান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can we say it is indestructible? It survived our test."
      },
      {
        "speaker": "freelancer",
        "text": "What evidence supports that claim across realistic use conditions?"
      },
      {
        "speaker": "client",
        "text": "We only dropped one sample from a table."
      },
      {
        "speaker": "freelancer",
        "text": "We should describe the demonstrated test accurately and avoid a universal durability promise."
      }
    ],
    "completionGuidance": "The learner should replace an unsupported absolute claim with an evidence-based description. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should describe the demonstrated test accurately and avoid a universal durability promise."
  },
  {
    "id": "TIKTOK-12",
    "version": 1,
    "category": "tiktok-ads",
    "categoryLabel": "TikTok Ads",
    "title": "Captions for a video watched without sound",
    "situation": "Morning Move: The instructor explains the offer aloud, but the video has no captions.",
    "learnerGoal": "Identify essential information that needs a visual equivalent.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Tania Chowdhury represents Morning Move. The instructor explains the offer aloud, but the video has no captions. Your task: Identify essential information that needs a visual equivalent.",
    "persona": {
      "name": "Tania Chowdhury",
      "role": "Business owner",
      "business": "Morning Move",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "The instructor explains the offer aloud, but the video has no captions."
    },
    "hiddenFacts": {
      "clarification": "The class level, date, and booking instruction are only spoken."
    },
    "openingMessage": "Will people understand the offer if their sound is off?",
    "objectives": [
      "Identify essential information that needs a visual equivalent",
      "Ask a relevant clarification, such as: \"Which spoken details are essential to understanding and acting on it?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "captions",
        "meaning": "on-screen text representing spoken audio"
      },
      {
        "phrase": "creative variation",
        "meaning": "an alternative version of an advertising asset",
        "meaningBn": "বিজ্ঞাপনের বিকল্প সংস্করণ"
      },
      {
        "phrase": "call to action",
        "meaning": "the next step a viewer is invited to take",
        "meaningBn": "পরবর্তী পদক্ষেপের আহ্বান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Will people understand the offer if their sound is off?"
      },
      {
        "speaker": "freelancer",
        "text": "Which spoken details are essential to understanding and acting on it?"
      },
      {
        "speaker": "client",
        "text": "The class level, date, and booking instruction are only spoken."
      },
      {
        "speaker": "freelancer",
        "text": "Let us add readable captions for those details and review the video without sound."
      }
    ],
    "completionGuidance": "The learner should identify essential information that needs a visual equivalent. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us add readable captions for those details and review the video without sound."
  },
  {
    "id": "TIKTOK-13",
    "version": 1,
    "category": "tiktok-ads",
    "categoryLabel": "TikTok Ads",
    "title": "A product launch with stock arriving late",
    "situation": "Coral Carry: The campaign starts Friday, but stock may not reach the warehouse until Monday.",
    "learnerGoal": "Align video claims with fulfilment readiness.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Ravi Shah represents Coral Carry. The campaign starts Friday, but stock may not reach the warehouse until Monday. Your task: Align video claims with fulfilment readiness.",
    "persona": {
      "name": "Ravi Shah",
      "role": "Project lead",
      "business": "Coral Carry",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The campaign starts Friday, but stock may not reach the warehouse until Monday."
    },
    "hiddenFacts": {
      "clarification": "They can only confirm dispatch after the stock is received and checked."
    },
    "openingMessage": "Can we advertise immediate shipping anyway to keep the launch exciting?",
    "objectives": [
      "Align video claims with fulfilment readiness",
      "Ask a relevant clarification, such as: \"What shipping date can fulfilment actually confirm?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "fulfilment",
        "meaning": "the process of preparing and delivering customer orders"
      },
      {
        "phrase": "creative variation",
        "meaning": "an alternative version of an advertising asset",
        "meaningBn": "বিজ্ঞাপনের বিকল্প সংস্করণ"
      },
      {
        "phrase": "call to action",
        "meaning": "the next step a viewer is invited to take",
        "meaningBn": "পরবর্তী পদক্ষেপের আহ্বান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can we advertise immediate shipping anyway to keep the launch exciting?"
      },
      {
        "speaker": "freelancer",
        "text": "What shipping date can fulfilment actually confirm?"
      },
      {
        "speaker": "client",
        "text": "They can only confirm dispatch after the stock is received and checked."
      },
      {
        "speaker": "freelancer",
        "text": "We should use a supported delivery message or revise the launch date rather than promise immediate shipping."
      }
    ],
    "completionGuidance": "The learner should align video claims with fulfilment readiness. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should use a supported delivery message or revise the launch date rather than promise immediate shipping."
  },
  {
    "id": "TIKTOK-14",
    "version": 1,
    "category": "tiktok-ads",
    "categoryLabel": "TikTok Ads",
    "title": "A creator whose audience is in another country",
    "situation": "Field Notes Coffee: A creator has a large following, but the brand ships to one country only.",
    "learnerGoal": "Evaluate creator fit using audience relevance instead of size alone.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Nadia Rahman represents Field Notes Coffee. A creator has a large following, but the brand ships to one country only. Your task: Evaluate creator fit using audience relevance instead of size alone.",
    "persona": {
      "name": "Nadia Rahman",
      "role": "Project lead",
      "business": "Field Notes Coffee",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "A creator has a large following, but the brand ships to one country only."
    },
    "hiddenFacts": {
      "clarification": "We have not requested audience geography yet."
    },
    "openingMessage": "They have a million followers, so they must be the right partner.",
    "objectives": [
      "Evaluate creator fit using audience relevance instead of size alone",
      "Ask a relevant clarification, such as: \"What share of their audience lives where you can deliver?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "audience fit",
        "meaning": "how well an audience matches the intended customers"
      },
      {
        "phrase": "creative variation",
        "meaning": "an alternative version of an advertising asset",
        "meaningBn": "বিজ্ঞাপনের বিকল্প সংস্করণ"
      },
      {
        "phrase": "call to action",
        "meaning": "the next step a viewer is invited to take",
        "meaningBn": "পরবর্তী পদক্ষেপের আহ্বান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "They have a million followers, so they must be the right partner."
      },
      {
        "speaker": "freelancer",
        "text": "What share of their audience lives where you can deliver?"
      },
      {
        "speaker": "client",
        "text": "We have not requested audience geography yet."
      },
      {
        "speaker": "freelancer",
        "text": "Let us review audience location and relevance before judging the partnership by follower count."
      }
    ],
    "completionGuidance": "The learner should evaluate creator fit using audience relevance instead of size alone. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us review audience location and relevance before judging the partnership by follower count."
  },
  {
    "id": "TIKTOK-15",
    "version": 1,
    "category": "tiktok-ads",
    "categoryLabel": "TikTok Ads",
    "title": "Testing hooks while changing every other element",
    "situation": "FoldAway Furniture: Two video versions change the opening, music, offer, and product shot simultaneously.",
    "learnerGoal": "Explain how to isolate the question a creative test should answer.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Oliver Chen represents FoldAway Furniture. Two video versions change the opening, music, offer, and product shot simultaneously. Your task: Explain how to isolate the question a creative test should answer.",
    "persona": {
      "name": "Oliver Chen",
      "role": "Project lead",
      "business": "FoldAway Furniture",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "Two video versions change the opening, music, offer, and product shot simultaneously."
    },
    "hiddenFacts": {
      "clarification": "Yes, the editor can reuse the same body and offer for both versions."
    },
    "openingMessage": "Can this test tell us which opening works best?",
    "objectives": [
      "Explain how to isolate the question a creative test should answer",
      "Ask a relevant clarification, such as: \"Can we keep the other elements comparable while changing the opening?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "controlled comparison",
        "meaning": "a comparison that keeps relevant conditions similar"
      },
      {
        "phrase": "creative variation",
        "meaning": "an alternative version of an advertising asset",
        "meaningBn": "বিজ্ঞাপনের বিকল্প সংস্করণ"
      },
      {
        "phrase": "call to action",
        "meaning": "the next step a viewer is invited to take",
        "meaningBn": "পরবর্তী পদক্ষেপের আহ্বান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can this test tell us which opening works best?"
      },
      {
        "speaker": "freelancer",
        "text": "Can we keep the other elements comparable while changing the opening?"
      },
      {
        "speaker": "client",
        "text": "Yes, the editor can reuse the same body and offer for both versions."
      },
      {
        "speaker": "freelancer",
        "text": "Then we should isolate the opening and define the comparison period before starting."
      }
    ],
    "completionGuidance": "The learner should explain how to isolate the question a creative test should answer. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Then we should isolate the opening and define the comparison period before starting."
  },
  {
    "id": "TIKTOK-16",
    "version": 1,
    "category": "tiktok-ads",
    "categoryLabel": "TikTok Ads",
    "title": "An unfamiliar product needing explanation",
    "situation": "PurePocket Filters: The product needs a short demonstration; current videos only show packaging.",
    "learnerGoal": "Plan a product explanation for people with no prior knowledge.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Maya Das represents PurePocket Filters. The product needs a short demonstration; current videos only show packaging. Your task: Plan a product explanation for people with no prior knowledge.",
    "persona": {
      "name": "Maya Das",
      "role": "Project lead",
      "business": "PurePocket Filters",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The product needs a short demonstration; current videos only show packaging."
    },
    "hiddenFacts": {
      "clarification": "Yes, we can film how it attaches and explain its intended use."
    },
    "openingMessage": "Why are viewers asking what it does when the package is clearly visible?",
    "objectives": [
      "Plan a product explanation for people with no prior knowledge",
      "Ask a relevant clarification, such as: \"Can we show a common use case and the result without overstating performance?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "use case",
        "meaning": "a specific situation in which a product is useful"
      },
      {
        "phrase": "creative variation",
        "meaning": "an alternative version of an advertising asset",
        "meaningBn": "বিজ্ঞাপনের বিকল্প সংস্করণ"
      },
      {
        "phrase": "call to action",
        "meaning": "the next step a viewer is invited to take",
        "meaningBn": "পরবর্তী পদক্ষেপের আহ্বান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Why are viewers asking what it does when the package is clearly visible?"
      },
      {
        "speaker": "freelancer",
        "text": "Can we show a common use case and the result without overstating performance?"
      },
      {
        "speaker": "client",
        "text": "Yes, we can film how it attaches and explain its intended use."
      },
      {
        "speaker": "freelancer",
        "text": "Let us build a simple problem, demonstration, and next-step sequence for a new viewer."
      }
    ],
    "completionGuidance": "The learner should plan a product explanation for people with no prior knowledge. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us build a simple problem, demonstration, and next-step sequence for a new viewer."
  },
  {
    "id": "TIKTOK-17",
    "version": 1,
    "category": "tiktok-ads",
    "categoryLabel": "TikTok Ads",
    "title": "A local-language voiceover needing review",
    "situation": "SunTrail Backpacks: The English script was translated for a Bangla voiceover, but nobody checked the recording.",
    "learnerGoal": "Request language review based on meaning rather than confidence alone.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Daniel Brooks represents SunTrail Backpacks. The English script was translated for a Bangla voiceover, but nobody checked the recording. Your task: Request language review based on meaning rather than confidence alone.",
    "persona": {
      "name": "Daniel Brooks",
      "role": "Project lead",
      "business": "SunTrail Backpacks",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The English script was translated for a Bangla voiceover, but nobody checked the recording."
    },
    "hiddenFacts": {
      "clarification": "Our local sales coordinator can review it tomorrow."
    },
    "openingMessage": "Can we approve it if the speaker sounds confident?",
    "objectives": [
      "Request language review based on meaning rather than confidence alone",
      "Ask a relevant clarification, such as: \"Who can check the meaning, pronunciation, and offer details in Bangla?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "voiceover",
        "meaning": "recorded speech played over a video"
      },
      {
        "phrase": "creative variation",
        "meaning": "an alternative version of an advertising asset",
        "meaningBn": "বিজ্ঞাপনের বিকল্প সংস্করণ"
      },
      {
        "phrase": "call to action",
        "meaning": "the next step a viewer is invited to take",
        "meaningBn": "পরবর্তী পদক্ষেপের আহ্বান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can we approve it if the speaker sounds confident?"
      },
      {
        "speaker": "freelancer",
        "text": "Who can check the meaning, pronunciation, and offer details in Bangla?"
      },
      {
        "speaker": "client",
        "text": "Our local sales coordinator can review it tomorrow."
      },
      {
        "speaker": "freelancer",
        "text": "We should get that review before approving the voiceover and leave time for corrections."
      }
    ],
    "completionGuidance": "The learner should request language review based on meaning rather than confidence alone. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should get that review before approving the voiceover and leave time for corrections."
  },
  {
    "id": "TIKTOK-18",
    "version": 1,
    "category": "tiktok-ads",
    "categoryLabel": "TikTok Ads",
    "title": "A live promotion with unanswered questions",
    "situation": "BloomCraft Kits: A live product demonstration is planned, but no one is assigned to handle viewer questions.",
    "learnerGoal": "Allocate live-event responsibilities and escalation steps.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Sara Ahmed represents BloomCraft Kits. A live product demonstration is planned, but no one is assigned to handle viewer questions. Your task: Allocate live-event responsibilities and escalation steps.",
    "persona": {
      "name": "Sara Ahmed",
      "role": "Project lead",
      "business": "BloomCraft Kits",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "A live product demonstration is planned, but no one is assigned to handle viewer questions."
    },
    "hiddenFacts": {
      "clarification": "A sales assistant can moderate, but needs product notes and an escalation contact."
    },
    "openingMessage": "Can the presenter also answer every comment and process orders?",
    "objectives": [
      "Allocate live-event responsibilities and escalation steps",
      "Ask a relevant clarification, such as: \"Who can support questions and what should happen when an answer is unknown?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "moderator",
        "meaning": "a person who manages discussion and helps handle audience contributions"
      },
      {
        "phrase": "creative variation",
        "meaning": "an alternative version of an advertising asset",
        "meaningBn": "বিজ্ঞাপনের বিকল্প সংস্করণ"
      },
      {
        "phrase": "call to action",
        "meaning": "the next step a viewer is invited to take",
        "meaningBn": "পরবর্তী পদক্ষেপের আহ্বান"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can the presenter also answer every comment and process orders?"
      },
      {
        "speaker": "freelancer",
        "text": "Who can support questions and what should happen when an answer is unknown?"
      },
      {
        "speaker": "client",
        "text": "A sales assistant can moderate, but needs product notes and an escalation contact."
      },
      {
        "speaker": "freelancer",
        "text": "Let us assign presenter and moderator roles and prepare a question-handling plan before going live."
      }
    ],
    "completionGuidance": "The learner should allocate live-event responsibilities and escalation steps. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us assign presenter and moderator roles and prepare a question-handling plan before going live."
  },
  {
    "id": "REPORT-05",
    "version": 1,
    "category": "reporting",
    "categoryLabel": "Reporting",
    "title": "Revenue before and after refunds",
    "situation": "Marlow Footwear: The campaign report shows $5,000 revenue, including $800 later refunded.",
    "learnerGoal": "Explain gross and refund-adjusted revenue accurately.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Ethan Patel represents Marlow Footwear. The campaign report shows $5,000 revenue, including $800 later refunded. Your task: Explain gross and refund-adjusted revenue accurately.",
    "persona": {
      "name": "Ethan Patel",
      "role": "Project lead",
      "business": "Marlow Footwear",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The campaign report shows $5,000 revenue, including $800 later refunded."
    },
    "hiddenFacts": {
      "clarification": "It only says revenue, and finance can provide the refund total."
    },
    "openingMessage": "Can we keep showing five thousand because those sales happened first?",
    "objectives": [
      "Explain gross and refund-adjusted revenue accurately",
      "Ask a relevant clarification, such as: \"Does the report label gross revenue, and can we show refunds separately?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "gross revenue",
        "meaning": "revenue before specified deductions such as refunds"
      },
      {
        "phrase": "limitation",
        "meaning": "a constraint on what a result can reliably show",
        "meaningBn": "সীমাবদ্ধতা"
      },
      {
        "phrase": "recommendation",
        "meaning": "a proposed action supported by reasons",
        "meaningBn": "সুপারিশ"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can we keep showing five thousand because those sales happened first?"
      },
      {
        "speaker": "freelancer",
        "text": "Does the report label gross revenue, and can we show refunds separately?"
      },
      {
        "speaker": "client",
        "text": "It only says revenue, and finance can provide the refund total."
      },
      {
        "speaker": "freelancer",
        "text": "Let us label gross revenue as $5,000 and revenue after those refunds as $4,200, noting other costs separately."
      }
    ],
    "completionGuidance": "The learner should explain gross and refund-adjusted revenue accurately. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us label gross revenue as $5,000 and revenue after those refunds as $4,200, noting other costs separately."
  },
  {
    "id": "REPORT-06",
    "version": 1,
    "category": "reporting",
    "categoryLabel": "Reporting",
    "title": "A report with no decision attached",
    "situation": "Aster Workspace: The monthly report has 30 charts but no recommendations.",
    "learnerGoal": "Organize a report around a concrete business decision.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Leila Hassan represents Aster Workspace. The monthly report has 30 charts but no recommendations. Your task: Organize a report around a concrete business decision.",
    "persona": {
      "name": "Leila Hassan",
      "role": "Business owner",
      "business": "Aster Workspace",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "The monthly report has 30 charts but no recommendations."
    },
    "hiddenFacts": {
      "clarification": "We need to decide whether to keep the enquiry campaign running."
    },
    "openingMessage": "I do not know what I am supposed to do after reading this.",
    "objectives": [
      "Organize a report around a concrete business decision",
      "Ask a relevant clarification, such as: \"Which decision do you need the report to support this month?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "actionable insight",
        "meaning": "a finding that helps someone choose a next action"
      },
      {
        "phrase": "limitation",
        "meaning": "a constraint on what a result can reliably show",
        "meaningBn": "সীমাবদ্ধতা"
      },
      {
        "phrase": "recommendation",
        "meaning": "a proposed action supported by reasons",
        "meaningBn": "সুপারিশ"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "I do not know what I am supposed to do after reading this."
      },
      {
        "speaker": "freelancer",
        "text": "Which decision do you need the report to support this month?"
      },
      {
        "speaker": "client",
        "text": "We need to decide whether to keep the enquiry campaign running."
      },
      {
        "speaker": "freelancer",
        "text": "I will summarize relevant outcomes, limitations, and options for that decision before the detailed charts."
      }
    ],
    "completionGuidance": "The learner should organize a report around a concrete business decision. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: I will summarize relevant outcomes, limitations, and options for that decision before the detailed charts."
  },
  {
    "id": "REPORT-07",
    "version": 1,
    "category": "reporting",
    "categoryLabel": "Reporting",
    "title": "A partial month compared with a full month",
    "situation": "Summit Craft School: The current report covers 12 days; the comparison covers the entire previous month.",
    "learnerGoal": "Check period comparability before interpreting a decline.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Noah Wilson represents Summit Craft School. The current report covers 12 days; the comparison covers the entire previous month. Your task: Check period comparability before interpreting a decline.",
    "persona": {
      "name": "Noah Wilson",
      "role": "Business owner",
      "business": "Summit Craft School",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "The current report covers 12 days; the comparison covers the entire previous month."
    },
    "hiddenFacts": {
      "clarification": "No, this month only includes the first twelve days."
    },
    "openingMessage": "The leads are much lower. Has performance collapsed?",
    "objectives": [
      "Check period comparability before interpreting a decline",
      "Ask a relevant clarification, such as: \"Are both periods the same length and affected by similar operating days?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "like-for-like comparison",
        "meaning": "a comparison using sufficiently similar conditions"
      },
      {
        "phrase": "limitation",
        "meaning": "a constraint on what a result can reliably show",
        "meaningBn": "সীমাবদ্ধতা"
      },
      {
        "phrase": "recommendation",
        "meaning": "a proposed action supported by reasons",
        "meaningBn": "সুপারিশ"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "The leads are much lower. Has performance collapsed?"
      },
      {
        "speaker": "freelancer",
        "text": "Are both periods the same length and affected by similar operating days?"
      },
      {
        "speaker": "client",
        "text": "No, this month only includes the first twelve days."
      },
      {
        "speaker": "freelancer",
        "text": "Let us compare equivalent periods and explain remaining seasonal differences."
      }
    ],
    "completionGuidance": "The learner should check period comparability before interpreting a decline. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us compare equivalent periods and explain remaining seasonal differences."
  },
  {
    "id": "REPORT-08",
    "version": 1,
    "category": "reporting",
    "categoryLabel": "Reporting",
    "title": "A blended average hiding a weak location",
    "situation": "Greenline Clinics: Location A generated 30 leads for $600; location B generated 5 for $400.",
    "learnerGoal": "Explain why an overall average can hide meaningful differences.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Priya Sen represents Greenline Clinics. Location A generated 30 leads for $600; location B generated 5 for $400. Your task: Explain why an overall average can hide meaningful differences.",
    "persona": {
      "name": "Priya Sen",
      "role": "Project lead",
      "business": "Greenline Clinics",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "Location A generated 30 leads for $600; location B generated 5 for $400."
    },
    "hiddenFacts": {
      "clarification": "Yes, the second location has spare capacity and a smaller catchment."
    },
    "openingMessage": "The overall cost looks acceptable. Do we need location detail?",
    "objectives": [
      "Explain why an overall average can hide meaningful differences",
      "Ask a relevant clarification, such as: \"Would location-level costs change staffing or spending decisions?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "blended average",
        "meaning": "an average combining multiple groups into one figure"
      },
      {
        "phrase": "limitation",
        "meaning": "a constraint on what a result can reliably show",
        "meaningBn": "সীমাবদ্ধতা"
      },
      {
        "phrase": "recommendation",
        "meaning": "a proposed action supported by reasons",
        "meaningBn": "সুপারিশ"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "The overall cost looks acceptable. Do we need location detail?"
      },
      {
        "speaker": "freelancer",
        "text": "Would location-level costs change staffing or spending decisions?"
      },
      {
        "speaker": "client",
        "text": "Yes, the second location has spare capacity and a smaller catchment."
      },
      {
        "speaker": "freelancer",
        "text": "We should show the $20 and $80 lead costs separately before discussing local constraints and next tests."
      }
    ],
    "completionGuidance": "The learner should explain why an overall average can hide meaningful differences. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should show the $20 and $80 lead costs separately before discussing local constraints and next tests."
  },
  {
    "id": "REPORT-09",
    "version": 1,
    "category": "reporting",
    "categoryLabel": "Reporting",
    "title": "A dashboard number changed after export",
    "situation": "Harbor Home Loans: Monday's exported lead count was 22; the dashboard now shows 25 for the same dates.",
    "learnerGoal": "Explain revised source data transparently and preserve an audit trail.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Adam Lewis represents Harbor Home Loans. Monday's exported lead count was 22; the dashboard now shows 25 for the same dates. Your task: Explain revised source data transparently and preserve an audit trail.",
    "persona": {
      "name": "Adam Lewis",
      "role": "Project lead",
      "business": "Harbor Home Loans",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "Monday's exported lead count was 22; the dashboard now shows 25 for the same dates."
    },
    "hiddenFacts": {
      "clarification": "The platform can update recent records, but the export did not show its timestamp."
    },
    "openingMessage": "Did you change the report to make results look better?",
    "objectives": [
      "Explain revised source data transparently and preserve an audit trail",
      "Ask a relevant clarification, such as: \"When were the figures exported, and can the source revise recent data?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "data freshness",
        "meaning": "how recently information has been updated"
      },
      {
        "phrase": "limitation",
        "meaning": "a constraint on what a result can reliably show",
        "meaningBn": "সীমাবদ্ধতা"
      },
      {
        "phrase": "recommendation",
        "meaning": "a proposed action supported by reasons",
        "meaningBn": "সুপারিশ"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Did you change the report to make results look better?"
      },
      {
        "speaker": "freelancer",
        "text": "When were the figures exported, and can the source revise recent data?"
      },
      {
        "speaker": "client",
        "text": "The platform can update recent records, but the export did not show its timestamp."
      },
      {
        "speaker": "freelancer",
        "text": "Let us preserve the original export, add its timestamp, and explain the updated source figure."
      }
    ],
    "completionGuidance": "The learner should explain revised source data transparently and preserve an audit trail. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us preserve the original export, add its timestamp, and explain the updated source figure."
  },
  {
    "id": "REPORT-10",
    "version": 1,
    "category": "reporting",
    "categoryLabel": "Reporting",
    "title": "A percentage increase from a tiny baseline",
    "situation": "Poppy Print Studio: Orders rose from one last week to three this week.",
    "learnerGoal": "Present relative change alongside absolute counts.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Meera Khan represents Poppy Print Studio. Orders rose from one last week to three this week. Your task: Present relative change alongside absolute counts.",
    "persona": {
      "name": "Meera Khan",
      "role": "Business owner",
      "business": "Poppy Print Studio",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "Orders rose from one last week to three this week."
    },
    "hiddenFacts": {
      "clarification": "Yes, the absolute increase is only two orders."
    },
    "openingMessage": "Can we headline a two-hundred-percent increase and leave out the counts?",
    "objectives": [
      "Present relative change alongside absolute counts",
      "Ask a relevant clarification, such as: \"Would including the actual order counts help readers understand the scale?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "absolute change",
        "meaning": "the numerical difference between two values"
      },
      {
        "phrase": "limitation",
        "meaning": "a constraint on what a result can reliably show",
        "meaningBn": "সীমাবদ্ধতা"
      },
      {
        "phrase": "recommendation",
        "meaning": "a proposed action supported by reasons",
        "meaningBn": "সুপারিশ"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can we headline a two-hundred-percent increase and leave out the counts?"
      },
      {
        "speaker": "freelancer",
        "text": "Would including the actual order counts help readers understand the scale?"
      },
      {
        "speaker": "client",
        "text": "Yes, the absolute increase is only two orders."
      },
      {
        "speaker": "freelancer",
        "text": "We can report both the 200 percent increase and the change from one to three, with caution about the small sample."
      }
    ],
    "completionGuidance": "The learner should present relative change alongside absolute counts. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We can report both the 200 percent increase and the change from one to three, with caution about the small sample."
  },
  {
    "id": "REPORT-11",
    "version": 1,
    "category": "reporting",
    "categoryLabel": "Reporting",
    "title": "A campaign report for finance and marketing",
    "situation": "Linden Office Supplies: Marketing wants enquiry detail; finance wants spend, invoices, and recognized revenue.",
    "learnerGoal": "Adapt reporting detail to different stakeholders without mixing definitions.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Lucas Reed represents Linden Office Supplies. Marketing wants enquiry detail; finance wants spend, invoices, and recognized revenue. Your task: Adapt reporting detail to different stakeholders without mixing definitions.",
    "persona": {
      "name": "Lucas Reed",
      "role": "Project lead",
      "business": "Linden Office Supplies",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "Marketing wants enquiry detail; finance wants spend, invoices, and recognized revenue."
    },
    "hiddenFacts": {
      "clarification": "Finance needs reconciled costs; marketing needs lead quality and follow-up status."
    },
    "openingMessage": "Can one page explain everything to both teams?",
    "objectives": [
      "Adapt reporting detail to different stakeholders without mixing definitions",
      "Ask a relevant clarification, such as: \"Which decisions and definitions does each team need first?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "stakeholder",
        "meaning": "a person or group with an interest in a project's outcome"
      },
      {
        "phrase": "limitation",
        "meaning": "a constraint on what a result can reliably show",
        "meaningBn": "সীমাবদ্ধতা"
      },
      {
        "phrase": "recommendation",
        "meaning": "a proposed action supported by reasons",
        "meaningBn": "সুপারিশ"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can one page explain everything to both teams?"
      },
      {
        "speaker": "freelancer",
        "text": "Which decisions and definitions does each team need first?"
      },
      {
        "speaker": "client",
        "text": "Finance needs reconciled costs; marketing needs lead quality and follow-up status."
      },
      {
        "speaker": "freelancer",
        "text": "I suggest a shared summary with separate sections for financial reconciliation and marketing outcomes."
      }
    ],
    "completionGuidance": "The learner should adapt reporting detail to different stakeholders without mixing definitions. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: I suggest a shared summary with separate sections for financial reconciliation and marketing outcomes."
  },
  {
    "id": "REPORT-12",
    "version": 1,
    "category": "reporting",
    "categoryLabel": "Reporting",
    "title": "A forecast requested as a guarantee",
    "situation": "Crescent Language Centre: The client wants next month's enrolments predicted from two weeks of campaign data.",
    "learnerGoal": "Explain forecast assumptions without presenting a prediction as a promise.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Farah Ali represents Crescent Language Centre. The client wants next month's enrolments predicted from two weeks of campaign data. Your task: Explain forecast assumptions without presenting a prediction as a promise.",
    "persona": {
      "name": "Farah Ali",
      "role": "Project lead",
      "business": "Crescent Language Centre",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "The client wants next month's enrolments predicted from two weeks of campaign data."
    },
    "hiddenFacts": {
      "clarification": "We have only five completed enrolments and the holiday period starts next month."
    },
    "openingMessage": "Can you guarantee twenty enrolments if we keep the same spend?",
    "objectives": [
      "Explain forecast assumptions without presenting a prediction as a promise",
      "Ask a relevant clarification, such as: \"What do we know about enquiry-to-enrolment rates and seasonal changes?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "forecast range",
        "meaning": "a span of possible future results based on stated assumptions"
      },
      {
        "phrase": "limitation",
        "meaning": "a constraint on what a result can reliably show",
        "meaningBn": "সীমাবদ্ধতা"
      },
      {
        "phrase": "recommendation",
        "meaning": "a proposed action supported by reasons",
        "meaningBn": "সুপারিশ"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you guarantee twenty enrolments if we keep the same spend?"
      },
      {
        "speaker": "freelancer",
        "text": "What do we know about enquiry-to-enrolment rates and seasonal changes?"
      },
      {
        "speaker": "client",
        "text": "We have only five completed enrolments and the holiday period starts next month."
      },
      {
        "speaker": "freelancer",
        "text": "We can offer a clearly qualified range with assumptions, then update it as more evidence arrives."
      }
    ],
    "completionGuidance": "The learner should explain forecast assumptions without presenting a prediction as a promise. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We can offer a clearly qualified range with assumptions, then update it as more evidence arrives."
  },
  {
    "id": "REPORT-13",
    "version": 1,
    "category": "reporting",
    "categoryLabel": "Reporting",
    "title": "Reporting leads that sales marks as spam",
    "situation": "Granite Build Services: Marketing reports 50 leads; sales labels 18 spam without recording reasons.",
    "learnerGoal": "Resolve conflicting lead-quality definitions collaboratively.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "James Morgan represents Granite Build Services. Marketing reports 50 leads; sales labels 18 spam without recording reasons. Your task: Resolve conflicting lead-quality definitions collaboratively.",
    "persona": {
      "name": "James Morgan",
      "role": "Project lead",
      "business": "Granite Build Services",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "Marketing reports 50 leads; sales labels 18 spam without recording reasons."
    },
    "hiddenFacts": {
      "clarification": "No, each salesperson uses a different rule."
    },
    "openingMessage": "Which team is wrong about the lead total?",
    "objectives": [
      "Resolve conflicting lead-quality definitions collaboratively",
      "Ask a relevant clarification, such as: \"Do we share a definition of spam and keep reasons for rejection?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "qualification criteria",
        "meaning": "the conditions used to decide whether an enquiry is relevant"
      },
      {
        "phrase": "limitation",
        "meaning": "a constraint on what a result can reliably show",
        "meaningBn": "সীমাবদ্ধতা"
      },
      {
        "phrase": "recommendation",
        "meaning": "a proposed action supported by reasons",
        "meaningBn": "সুপারিশ"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Which team is wrong about the lead total?"
      },
      {
        "speaker": "freelancer",
        "text": "Do we share a definition of spam and keep reasons for rejection?"
      },
      {
        "speaker": "client",
        "text": "No, each salesperson uses a different rule."
      },
      {
        "speaker": "freelancer",
        "text": "Let us agree on categories and review examples before publishing raw and qualified totals separately."
      }
    ],
    "completionGuidance": "The learner should resolve conflicting lead-quality definitions collaboratively. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us agree on categories and review examples before publishing raw and qualified totals separately."
  },
  {
    "id": "REPORT-14",
    "version": 1,
    "category": "reporting",
    "categoryLabel": "Reporting",
    "title": "A one-off large order distorting results",
    "situation": "Harbor Event Rentals: One corporate order represents 70 percent of the month's campaign revenue.",
    "learnerGoal": "Explain an outlier's effect without removing it dishonestly.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Anika Roy represents Harbor Event Rentals. One corporate order represents 70 percent of the month's campaign revenue. Your task: Explain an outlier's effect without removing it dishonestly.",
    "persona": {
      "name": "Anika Roy",
      "role": "Project lead",
      "business": "Harbor Event Rentals",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "One corporate order represents 70 percent of the month's campaign revenue."
    },
    "hiddenFacts": {
      "clarification": "It was an annual conference and is unlikely to repeat next month."
    },
    "openingMessage": "Can we assume next month will repeat this return?",
    "objectives": [
      "Explain an outlier's effect without removing it dishonestly",
      "Ask a relevant clarification, such as: \"Is that order typical or tied to a one-time event?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "outlier",
        "meaning": "an observation that differs substantially from most others"
      },
      {
        "phrase": "limitation",
        "meaning": "a constraint on what a result can reliably show",
        "meaningBn": "সীমাবদ্ধতা"
      },
      {
        "phrase": "recommendation",
        "meaning": "a proposed action supported by reasons",
        "meaningBn": "সুপারিশ"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can we assume next month will repeat this return?"
      },
      {
        "speaker": "freelancer",
        "text": "Is that order typical or tied to a one-time event?"
      },
      {
        "speaker": "client",
        "text": "It was an annual conference and is unlikely to repeat next month."
      },
      {
        "speaker": "freelancer",
        "text": "We should show results with and without that order and explain its effect on expectations."
      }
    ],
    "completionGuidance": "The learner should explain an outlier's effect without removing it dishonestly. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should show results with and without that order and explain its effect on expectations."
  },
  {
    "id": "REPORT-15",
    "version": 1,
    "category": "reporting",
    "categoryLabel": "Reporting",
    "title": "A weekly update when nothing is conclusive",
    "situation": "Northwind Workshops: A new campaign has run for three days and produced one enquiry.",
    "learnerGoal": "Communicate useful progress without inventing a performance conclusion.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Omar Clarke represents Northwind Workshops. A new campaign has run for three days and produced one enquiry. Your task: Communicate useful progress without inventing a performance conclusion.",
    "persona": {
      "name": "Omar Clarke",
      "role": "Business owner",
      "business": "Northwind Workshops",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "A new campaign has run for three days and produced one enquiry."
    },
    "hiddenFacts": {
      "clarification": "Yes, I mainly need to know the campaign is being monitored."
    },
    "openingMessage": "Do you have good news for our update today?",
    "objectives": [
      "Communicate useful progress without inventing a performance conclusion",
      "Ask a relevant clarification, such as: \"Would an update on checks completed and the next review date be useful while results are limited?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "early indicator",
        "meaning": "an initial signal that is not yet a final outcome"
      },
      {
        "phrase": "limitation",
        "meaning": "a constraint on what a result can reliably show",
        "meaningBn": "সীমাবদ্ধতা"
      },
      {
        "phrase": "recommendation",
        "meaning": "a proposed action supported by reasons",
        "meaningBn": "সুপারিশ"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Do you have good news for our update today?"
      },
      {
        "speaker": "freelancer",
        "text": "Would an update on checks completed and the next review date be useful while results are limited?"
      },
      {
        "speaker": "client",
        "text": "Yes, I mainly need to know the campaign is being monitored."
      },
      {
        "speaker": "freelancer",
        "text": "I can report what is working technically, what remains uncertain, and when we will assess enough data."
      }
    ],
    "completionGuidance": "The learner should communicate useful progress without inventing a performance conclusion. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: I can report what is working technically, what remains uncertain, and when we will assess enough data."
  },
  {
    "id": "REPORT-16",
    "version": 1,
    "category": "reporting",
    "categoryLabel": "Reporting",
    "title": "A report that confuses revenue and profit",
    "situation": "Copperleaf Accessories: Ad spend was $400 and attributable revenue was $1,200; product costs are not supplied.",
    "learnerGoal": "Explain why revenue minus ad spend alone is not net profit.",
    "difficultyDefault": "beginner",
    "estimatedMinutes": 6,
    "brief": "Sofia Islam represents Copperleaf Accessories. Ad spend was $400 and attributable revenue was $1,200; product costs are not supplied. Your task: Explain why revenue minus ad spend alone is not net profit.",
    "persona": {
      "name": "Sofia Islam",
      "role": "Business owner",
      "business": "Copperleaf Accessories",
      "traits": [
        "friendly",
        "prefers simple explanations"
      ]
    },
    "facts": {
      "startingContext": "Ad spend was $400 and attributable revenue was $1,200; product costs are not supplied."
    },
    "hiddenFacts": {
      "clarification": "Not yet, finance has only sent the revenue figure."
    },
    "openingMessage": "So we made eight hundred dollars of profit, correct?",
    "objectives": [
      "Explain why revenue minus ad spend alone is not net profit",
      "Ask a relevant clarification, such as: \"Do we have product, fulfilment, and other relevant costs?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "net profit",
        "meaning": "the amount remaining after all relevant expenses"
      },
      {
        "phrase": "limitation",
        "meaning": "a constraint on what a result can reliably show",
        "meaningBn": "সীমাবদ্ধতা"
      },
      {
        "phrase": "recommendation",
        "meaning": "a proposed action supported by reasons",
        "meaningBn": "সুপারিশ"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "So we made eight hundred dollars of profit, correct?"
      },
      {
        "speaker": "freelancer",
        "text": "Do we have product, fulfilment, and other relevant costs?"
      },
      {
        "speaker": "client",
        "text": "Not yet, finance has only sent the revenue figure."
      },
      {
        "speaker": "freelancer",
        "text": "Revenue minus ad spend is $800 before those other costs; we cannot label that net profit."
      }
    ],
    "completionGuidance": "The learner should explain why revenue minus ad spend alone is not net profit. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Revenue minus ad spend is $800 before those other costs; we cannot label that net profit."
  },
  {
    "id": "REPORT-17",
    "version": 1,
    "category": "reporting",
    "categoryLabel": "Reporting",
    "title": "An executive summary after a failed experiment",
    "situation": "Mosaic Learning Tools: A two-week message test produced no clear improvement over the original.",
    "learnerGoal": "Report an inconclusive or negative test honestly and usefully.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Ben Walker represents Mosaic Learning Tools. A two-week message test produced no clear improvement over the original. Your task: Report an inconclusive or negative test honestly and usefully.",
    "persona": {
      "name": "Ben Walker",
      "role": "Project lead",
      "business": "Mosaic Learning Tools",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "A two-week message test produced no clear improvement over the original."
    },
    "hiddenFacts": {
      "clarification": "It met the agreed conditions but did not support switching messages."
    },
    "openingMessage": "Should we hide the test because it did not win?",
    "objectives": [
      "Report an inconclusive or negative test honestly and usefully",
      "Ask a relevant clarification, such as: \"What did the test rule out, and was it run under the agreed conditions?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "experiment outcome",
        "meaning": "the result of testing a stated question or hypothesis"
      },
      {
        "phrase": "limitation",
        "meaning": "a constraint on what a result can reliably show",
        "meaningBn": "সীমাবদ্ধতা"
      },
      {
        "phrase": "recommendation",
        "meaning": "a proposed action supported by reasons",
        "meaningBn": "সুপারিশ"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Should we hide the test because it did not win?"
      },
      {
        "speaker": "freelancer",
        "text": "What did the test rule out, and was it run under the agreed conditions?"
      },
      {
        "speaker": "client",
        "text": "It met the agreed conditions but did not support switching messages."
      },
      {
        "speaker": "freelancer",
        "text": "We should state the result, retain the current message, and identify the next question without calling the test a success."
      }
    ],
    "completionGuidance": "The learner should report an inconclusive or negative test honestly and usefully. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: We should state the result, retain the current message, and identify the next question without calling the test a success."
  },
  {
    "id": "REPORT-18",
    "version": 1,
    "category": "reporting",
    "categoryLabel": "Reporting",
    "title": "Missing data during a reporting outage",
    "situation": "Willow Travel Club: Tracking was unavailable for three days of a 30-day reporting period.",
    "learnerGoal": "Disclose missing data and distinguish estimates from observations.",
    "difficultyDefault": "advanced",
    "estimatedMinutes": 10,
    "brief": "Tania Chowdhury represents Willow Travel Club. Tracking was unavailable for three days of a 30-day reporting period. Your task: Disclose missing data and distinguish estimates from observations.",
    "persona": {
      "name": "Tania Chowdhury",
      "role": "Project lead",
      "business": "Willow Travel Club",
      "traits": [
        "skeptical",
        "expects evidence and clear boundaries"
      ]
    },
    "facts": {
      "startingContext": "Tracking was unavailable for three days of a 30-day reporting period."
    },
    "hiddenFacts": {
      "clarification": "Yes, finance has daily booking records that may provide a useful cross-check."
    },
    "openingMessage": "Can you fill the gap with an estimate and present a complete total?",
    "objectives": [
      "Disclose missing data and distinguish estimates from observations",
      "Ask a relevant clarification, such as: \"Can we label measured data separately from any estimate and explain its assumptions?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "data gap",
        "meaning": "a period or area for which expected information is unavailable"
      },
      {
        "phrase": "limitation",
        "meaning": "a constraint on what a result can reliably show",
        "meaningBn": "সীমাবদ্ধতা"
      },
      {
        "phrase": "recommendation",
        "meaning": "a proposed action supported by reasons",
        "meaningBn": "সুপারিশ"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you fill the gap with an estimate and present a complete total?"
      },
      {
        "speaker": "freelancer",
        "text": "Can we label measured data separately from any estimate and explain its assumptions?"
      },
      {
        "speaker": "client",
        "text": "Yes, finance has daily booking records that may provide a useful cross-check."
      },
      {
        "speaker": "freelancer",
        "text": "Let us disclose the gap, show verified figures, and label any estimate with its method and uncertainty."
      }
    ],
    "completionGuidance": "The learner should disclose missing data and distinguish estimates from observations. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: Let us disclose the gap, show verified figures, and label any estimate with its method and uncertainty."
  },
  {
    "id": "REPORT-19",
    "version": 1,
    "category": "reporting",
    "categoryLabel": "Reporting",
    "title": "Ending a contract with a clear final report",
    "situation": "Anchor Digital Courses: The client's campaign contract ends Friday and another team takes over Monday.",
    "learnerGoal": "Plan an orderly reporting handover and access transition.",
    "difficultyDefault": "intermediate",
    "estimatedMinutes": 8,
    "brief": "Ravi Shah represents Anchor Digital Courses. The client's campaign contract ends Friday and another team takes over Monday. Your task: Plan an orderly reporting handover and access transition.",
    "persona": {
      "name": "Ravi Shah",
      "role": "Project lead",
      "business": "Anchor Digital Courses",
      "traits": [
        "busy",
        "wants practical options"
      ]
    },
    "facts": {
      "startingContext": "The client's campaign contract ends Friday and another team takes over Monday."
    },
    "hiddenFacts": {
      "clarification": "Our new manager starts Monday and can confirm access then."
    },
    "openingMessage": "Can you send the report and remove your access immediately?",
    "objectives": [
      "Plan an orderly reporting handover and access transition",
      "Ask a relevant clarification, such as: \"Who will accept the handover and confirm they can reach the reports and assets?\"",
      "Propose a next step that addresses the client's answer without promising an unsupported result"
    ],
    "vocabulary": [
      {
        "phrase": "handover record",
        "meaning": "a documented summary of work, assets, and responsibilities being transferred"
      },
      {
        "phrase": "limitation",
        "meaning": "a constraint on what a result can reliably show",
        "meaningBn": "সীমাবদ্ধতা"
      },
      {
        "phrase": "recommendation",
        "meaning": "a proposed action supported by reasons",
        "meaningBn": "সুপারিশ"
      }
    ],
    "sampleDialogue": [
      {
        "speaker": "client",
        "text": "Can you send the report and remove your access immediately?"
      },
      {
        "speaker": "freelancer",
        "text": "Who will accept the handover and confirm they can reach the reports and assets?"
      },
      {
        "speaker": "client",
        "text": "Our new manager starts Monday and can confirm access then."
      },
      {
        "speaker": "freelancer",
        "text": "I will prepare the final report and handover checklist, then coordinate access removal with the authorized owner."
      }
    ],
    "completionGuidance": "The learner should plan an orderly reporting handover and access transition. They should ask for the missing context and agree on a practical next step consistent with the supplied facts. A suitable approach is: I will prepare the final report and handover checklist, then coordinate access removal with the authorized owner."
  }
];
