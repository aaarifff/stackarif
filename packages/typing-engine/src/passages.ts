import type { Category, Level } from './types';

// Original practice passages, including the quote-style reflections and poems.
// IELTS passages are independent practice material, not official exam questions.
const ORIGINAL_PASSAGES: Record<Exclude<Category, 'common'>, Record<Level, string>> = {
  history: {
    normal: 'Long ago, people built homes near rivers. Water helped them grow food and travel by boat. Small towns grew into busy cities. People shared tools and traded goods. Each new road brought distant places closer together.',
    medium: 'Early civilizations developed along fertile river valleys, where reliable harvests supported growing communities. Merchants exchanged goods and ideas across distant regions. Written records helped people preserve laws, describe daily life, and pass knowledge to future generations.',
    hard: 'Historical interpretation requires careful examination of fragmentary evidence. Archaeological discoveries illuminate the administrative structures of ancient civilizations, while surviving correspondence reveals competing perspectives. Historians distinguish contemporary testimony from retrospective accounts to reconstruct political transformations without overlooking uncertainty.',
  },
  quote: {
    normal: 'A small step today can make tomorrow easier. Give yourself time to learn. Every kind word can brighten a day. Begin where you are, use what you have, and keep going with a calm and open mind.',
    medium: 'Progress rarely arrives all at once; it grows through patient attention and repeated effort. A thoughtful question can open a door that certainty keeps closed. Let curiosity guide your practice, and allow each mistake to become a useful lesson.',
    hard: 'Perseverance is the quiet reconciliation of ambition with uncertainty. Intellectual humility invites us to reconsider convictions without abandoning principles. Meaningful accomplishment emerges when deliberate practice, sustained curiosity, and conscientious reflection become habits rather than occasional bursts of enthusiasm.',
  },
  ielts: {
    normal: 'Some people like to study at home. Others learn better in a classroom. At home, students can choose their own study time. In a class, they can ask a teacher for help and share ideas with friends.',
    medium: 'Public transport can reduce traffic congestion and improve access to employment. However, reliable services require consistent investment. Discuss the advantages of expanding urban rail networks and consider whether lower fares would encourage more commuters to leave their cars at home.',
    hard: 'The proliferation of remote employment has prompted considerable debate regarding productivity and social cohesion. Although flexible arrangements may alleviate commuting pressures, critics question their implications for collaboration. Evaluate these competing perspectives, substantiating your argument with relevant examples and acknowledging potential limitations.',
  },
  advanced: {
    normal: 'adapt aspire benefit capable clarity eager effort expand focus insight method observe patient precise reflect resolve resource steady thrive value',
    medium: 'ambiguous articulate coherent compelling cultivate deliberate eloquent evaluate feasible formidable hypothesis illuminate meticulous nuanced pragmatic resilient substantial tenacious versatile',
    hard: 'acquiescence anachronistic conscientious dichotomy ephemeral epistemology equivocal idiosyncrasy incontrovertible juxtaposition magnanimous obfuscation perspicacious quintessential recalcitrant serendipity surreptitious ubiquitous verisimilitude',
  },
  poem: {
    normal: 'The morning sun lights up the sky. A little bird goes flying by. The leaves are green, the breeze is slow. Beside the stream, small flowers grow. I take a breath and greet the day. The quiet clouds drift far away.',
    medium: 'Beneath the silver hush of rain, the garden wakes to bloom again. A wandering breeze disturbs the trees and carries whispers through the leaves. Along the path where shadows fall, the evening weaves its gentle shawl.',
    hard: "Through twilight's iridescent veil, ephemeral constellations sail. Their incandescent whispers trace the boundaries of a boundless space. Beneath the moon's unhurried gaze, remembrance threads its labyrinthine ways, and silence gathers, deep and slow, where undiscovered rivers flow.",
  },
  medical: {
    normal: 'The heart moves blood around the body. The lungs help us breathe. Bones give the body shape and support. Muscles help us move. In a clinic, a nurse may record a pulse while a doctor asks about symptoms.',
    medium: 'The circulatory system transports oxygen and nutrients throughout the body. During an examination, clinicians document symptoms and review medical history. Accurate terminology helps healthcare teams communicate observations, distinguish anatomical structures, and maintain clear records for subsequent assessments.',
    hard: 'Cardiovascular physiology encompasses myocardial contractility, vascular resistance, and electrophysiological conduction. Interdisciplinary communication requires precise differentiation between pathological findings and physiological variation. Histopathological examination and biochemical investigations contribute complementary evidence to diagnostic reasoning, while documentation records uncertainty and relevant differential considerations.',
  },
};

export const VOCABULARY: Record<Exclude<Level, 'normal'>, string[]> = {
  medium: 'achieve balance challenge community consider creative discover environment experience familiar generous improve knowledge language opportunity organize purpose quality recognize research resource thoughtful understand variety'.split(' '),
  hard: 'accommodate bureaucracy characteristic comprehensive conscientious correspondence deterioration entrepreneur extraordinary infrastructure interpretation miscellaneous perseverance phenomenon prerequisite pronunciation questionnaire responsibility sophisticated unprecedented'.split(' '),
};

// Three original selections for every category and level.
const ADDITIONAL_PASSAGES: Record<Exclude<Category, 'common'>, Record<Level, [string, string]>> = {
  history: {
    normal: ['Before cars, many people walked to market. They carried bread and fruit in baskets. A busy square gave neighbors a place to meet, trade, and hear news from other towns.', 'Old maps show how people saw the world. Sailors drew coastlines and marked safe places to stop. Each journey added new details, helping the next crew find its way across the sea.'],
    medium: ['The spread of printing changed how communities shared information. Books became available to wider audiences, encouraging debate and learning. Libraries preserved these publications so later readers could explore the ideas of earlier generations.', 'Railway networks connected industrial towns with ports and rural markets. Faster journeys reshaped trade and daily routines. Station buildings became familiar meeting places, while published timetables encouraged travelers to coordinate their plans.'],
    hard: ['The preservation of archival collections depends on provenance, contextual description, and responsible conservation. Researchers compare administrative documents with oral histories to investigate institutional change, recognizing that omissions may reflect unequal access to literacy and political authority.', 'Maritime exchange fostered intricate relationships between geographically distant communities. Material artifacts reveal patterns of consumption and technological adaptation, yet their interpretation demands attention to chronology, regional variation, and the limitations of surviving archaeological assemblages.'],
  },
  quote: {
    normal: ['You do not need to hurry to move forward. Take one clear step, then take another. A little care each day can turn a hard task into a habit you enjoy.', 'Listen with care and speak with kindness. There is room to learn in every new day. When a plan goes wrong, pause, look again, and choose a small thing you can do.'],
    medium: ['Confidence grows when we keep the promises we make to ourselves. Choose a manageable challenge, give it your attention, and return tomorrow. Consistency can achieve what a single moment of inspiration cannot.', 'A generous listener makes room for ideas that are still taking shape. Patience allows understanding to grow, while curiosity reminds us that a different perspective may reveal something we have overlooked.'],
    hard: ['Discernment develops through the willingness to examine our assumptions. Neither unquestioning optimism nor habitual skepticism can substitute for thoughtful observation. The most durable convictions remain receptive to evidence while retaining a coherent foundation of ethical responsibility.', 'Creativity flourishes at the intersection of disciplined preparation and intellectual openness. Apparent contradictions can become invitations to investigate, and uncertainty can encourage experimentation when we resist the temptation to demand premature resolution.'],
  },
  ielts: {
    normal: ['Many towns have a public park. People go there to walk, play games, or sit under trees. Explain why parks are useful and describe one way to make them better for local families.', 'Some students take a bus to school, while others walk or ride a bike. Describe the good points of each choice. Which way would you choose, and what makes it right for you?'],
    medium: ['Some schools include practical cooking lessons in their curriculum. Supporters argue that these classes encourage independence, while others prefer additional academic subjects. Discuss both views and explain how schools might balance competing demands on classroom time.', 'Museums increasingly offer digital exhibitions alongside traditional displays. Consider whether online access can attract new audiences and discuss the aspects of an in-person visit that technology may find difficult to reproduce.'],
    hard: ['Urban redevelopment frequently involves reconciling architectural conservation with contemporary housing requirements. Assess the extent to which municipal authorities should prioritize historical preservation, considering affordability, environmental sustainability, and the cultural significance of established neighborhoods.', 'International collaboration in scientific research can accelerate innovation, although disparities in resources may complicate equitable participation. Discuss the responsibilities of participating institutions and evaluate mechanisms that could facilitate transparent dissemination of knowledge across national boundaries.'],
  },
  advanced: {
    normal: ['achieve balance broaden careful compose connect create curious detail discover enable enrich explore honest inspire intent journey notice prepare purpose reliable rethink simple skill support', 'active aware brave compare complete design direct engage explain flexible gather gentle guide imagine improve include learn listen mindful plan progress reason share thoughtful trust'],
    medium: ['accessible analytical authentic collaborate concise constructive context credible decisive distinguish effective elaborate emphasize encourage establish exceptional facilitate innovative interpret perspective rational receptive strategic synthesize transparent', 'accomplish acknowledge alternative anticipate appreciate consistent demonstrate distinctive efficient enhance evidence explicit formulate fundamental integrate objective persistent potential practical relevant resourceful systematic thorough transform worthwhile'],
    hard: ['aberration ameliorate circumspection confluence corroborate disambiguation effervescent extrapolation heterogeneous incongruous indeterminate intransigence lexicography multifaceted nomenclature paradigm permeability reciprocity reconciliation transcendental', 'antithetical approximation circumnavigate commensurate disinterested embellishment fortuitous hermeneutics imperturbable indefatigable irreconcilable kaleidoscopic mellifluous onomatopoeia paradigmatic proclivity remuneration sagacious scintillating unequivocal'],
  },
  poem: {
    normal: ['A paper boat floats down the lane, upon a stream of silver rain. It turns beside a little stone, then sails into the dusk alone. The stars come out, the day is done, and dreams begin for everyone.', 'The kettle sings, the windows glow, outside the garden fills with snow. A book lies open by my chair, warm bread sends comfort through the air. I watch the quiet evening start and keep its stillness in my heart.'],
    medium: ['Across the fields of ripening grain, the swallows sketch their paths again. The distant hills dissolve in blue, while grasses gather beads of dew. A lantern glimmers by the gate, where quiet footsteps pause and wait.', 'The harbor holds the fading light, as fishing boats return for night. Their weathered ropes and painted beams recall the shape of distant dreams. Beyond the wall, the patient sea repeats its ancient melody.'],
    hard: ['Within the cathedral hush of snow, forgotten tributaries flow. Translucent frost adorns the pane, transcribing fragments of the rain. Across the tranquil firmament, a solitary light is bent, and winter keeps its measured rhyme beyond the restless reach of time.', 'An amber phosphorescence gleams along the estuary of dreams. The reeds rehearse their tremulous song where wandering silhouettes belong. Beneath a sky of burnished brass, innumerable moments pass, and memory, with softened hands, rearranges all the shifting sands.'],
  },
  medical: {
    normal: ['The skin covers and protects the body. Different parts help us feel warmth, cold, and touch. During a visit, a nurse writes down what a patient says and checks that the record is clear.', 'The skeleton includes bones of many shapes and sizes. Joints are places where bones meet. A diagram can help students learn the names of these parts and see how the body fits together.'],
    medium: ['Respiratory anatomy includes the airways and lungs. Students distinguish the structures involved in ventilation from those involved in gas exchange. Clear diagrams and consistent terminology support communication during classroom discussions and practical demonstrations.', 'Clinical documentation organizes observations into a readable record. A structured note distinguishes reported symptoms from examination findings. Careful attention to dates, units, and terminology helps colleagues understand the sequence of an assessment.'],
    hard: ['Neuroanatomical terminology distinguishes afferent pathways from efferent projections and describes relationships between cortical and subcortical structures. Precise localization depends on an integrated understanding of anatomical organization, functional specialization, and the interpretation of complementary observations.', 'Immunological research investigates interactions between innate defenses and adaptive responses. Specialized terminology describes antigen presentation, cellular differentiation, and immunological memory. Reproducible documentation requires explicit methodological descriptions and careful differentiation between observations, hypotheses, and conclusions.'],
  },
};
export const PASSAGES = Object.fromEntries(Object.entries(ORIGINAL_PASSAGES).map(([category, levels]) => [
  category, Object.fromEntries(Object.entries(levels).map(([level, passage]) => [
    level, [passage, ...ADDITIONAL_PASSAGES[category as Exclude<Category, 'common'>][level as Level]],
  ])),
])) as Record<Exclude<Category, 'common'>, Record<Level, string[]>>;
