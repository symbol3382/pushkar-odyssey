import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

function loc(en, hi = '') {
  return hi ? { en, hi } : { en };
}

function category(id, slug, title, summary, description, sortOrder, featured = false) {
  return {
    _id: id,
    _type: 'serviceCategory',
    title: loc(title),
    slug: { _type: 'slug', current: slug },
    summary: loc(summary),
    description: loc(description),
    featured,
    sortOrder,
  };
}

function service({
  id,
  slug,
  categoryId,
  title,
  summary,
  description,
  highlights = [],
  included = [],
  notes = [],
  itinerary = [],
  days,
  nights,
  featured = false,
  sortOrder = 0,
}) {
  const doc = {
    _id: id,
    _type: 'service',
    title: loc(title),
    slug: { _type: 'slug', current: slug },
    category: { _type: 'reference', _ref: categoryId, _weak: false },
    summary: loc(summary),
    description: loc(description),
    featured,
    sortOrder,
  };
  if (highlights.length) doc.highlights = highlights.map((item) => loc(item));
  if (included.length) doc.included = included.map((item) => loc(item));
  if (notes.length) {
    doc.notes = notes.map((note, index) => ({
      _type: 'note',
      _key: `note-${String(index + 1)}`,
      question: loc(note.question),
      answer: loc(note.answer),
    }));
  }
  if (itinerary.length) {
    doc.itinerary = itinerary.map((stop, index) => ({
      _type: 'itineraryDay',
      _key: `day-${String(stop.dayNumber ?? index + 1)}`,
      dayNumber: stop.dayNumber ?? index + 1,
      heading: loc(stop.heading),
      description: loc(stop.description),
      location: stop.location ? loc(stop.location) : undefined,
    }));
  }
  if (typeof days === 'number') doc.days = days;
  if (typeof nights === 'number') doc.nights = nights;
  return doc;
}

const categories = [
  category(
    'category-pushkar-darshan',
    'pushkar-darshan',
    'Pushkar Darshan',
    'Peaceful, hassle-free visits to Pushkar’s sacred places.',
    `## Pushkar Darshan

Experience a peaceful and hassle-free visit to Pushkar's sacred places — the lake, Brahma Temple, evening aarti, and local storytelling that opens the mythology of this town.`,
    10,
    true,
  ),
  category(
    'category-vedic-pooja',
    'vedic-pooja',
    'Vedic Pooja Services & Online Pooja',
    'Traditional rituals in Pushkar or live online worldwide.',
    `## Vedic Pooja Services & Online Pooja (Worldwide)

Priest-led rituals for ancestral rites, peace, and family ceremonies — arranged in Pushkar or over a live video call.`,
    20,
  ),
  category(
    'category-desert-camping',
    'desert-camping',
    'Desert Night Camping',
    'Thar Desert evenings with culture, dinner, and dune rides.',
    `## Desert Night Camping with cultural program & dinner

An unforgettable evening in the Thar Desert — camel and jeep safari, sunset, folk dance, Rajasthani dinner, and overnight tents.`,
    30,
    true,
  ),
  category(
    'category-tour-packages',
    'tour-packages',
    'Pushkar Tour Packages',
    'Multi-day Pushkar itineraries paced for wonder and rest.',
    `## Pushkar Tour Packages

Guided multi-day visits that combine temples, the lake, market evenings, desert time, and stays that feel like Pushkar.`,
    40,
    true,
  ),
  category(
    'category-stays',
    'stays',
    'Stays in Pushkar',
    'Private pools, lakeside rooms, luxury, boutique, desert, family, and budget stays.',
    `## Stays in Pushkar

Places to stay across Pushkar — from lakeside rooms and private pools to luxury resorts, boutique homes, desert camps, and simple budget hotels.`,
    50,
    true,
  ),
  category(
    'category-festivals',
    'festivals',
    'International Celebrations & Festivals',
    'Holi, the Camel Fair, and New Year in iconic Pushkar.',
    `## International celebrations at Pushkar’s iconic festivals

Join Holi parties, the International Pushkar Camel Fair, and New Year celebrations hosted in and around town.`,
    60,
  ),
  category(
    'category-products',
    'products',
    'Pushkar Products',
    'Ittar, rose, rudraksha, jamun, hemp, leather, and jewellery.',
    `## Pushkar Products Services

Local Pushkar goods — natural perfume and incense, seasonal jamun, rose products, spiritual items, hemp and leather crafts, and fashion jewellery.`,
    70,
  ),
  category(
    'category-events-hospitality',
    'events-hospitality',
    'Events & Hospitality',
    'Weddings, celebrations, taxis, and practical help in Pushkar.',
    `## Events & Hospitality Services

We make celebrations and events memorable in Pushkar — destination weddings, anniversaries, birthdays, corporate outings, taxi bookings, and money exchange.`,
    80,
  ),
  category(
    'category-boho-clothing',
    'boho-clothing',
    'Boho Clothing & Garments',
    'Global boho clothing and garments from Pushkar.',
    `## Pushkar’s global boho clothing & garment products

Kaftans, maxi dresses, kimonos, tops, skirts, tunics, printed garments, scarves, and jumpsuits sourced from Pushkar’s garment makers.`,
    90,
  ),
  category(
    'category-property',
    'property',
    'Buy, Sell & Invest in Pushkar Properties',
    'Plots, farmhouses, villas, hotels, shops, and investment advice.',
    `## Buy, sell & invest in Pushkar properties

Residential plots, farmhouses, villas, hotels, commercial shops, and property investment consultation in Pushkar.`,
    100,
  ),
];

const services = [
  service({
    id: 'service-darshan-package',
    slug: 'pushkar-darshan-experience',
    categoryId: 'category-pushkar-darshan',
    title: 'Pushkar Darshan Experience',
    summary: 'A calm, guided visit covering Pushkar’s sacred heart.',
    description: `## Experience a peaceful and hassle-free visit

Walk Pushkar’s sacred places with local hosts who know the rituals, queues, and stories — so the visit stays peaceful rather than rushed.

### What this visit can include
- Pushkar Lake (VIP)
- Brahma Temple (VIP)
- Evening Pushkar Lake Aarti
- Local storyteller explaining Pushkar's mythology and history

Ask on WhatsApp to shape the visit for your family, elders, or first-time pilgrims.`,
    included: [
      'Pushkar Lake (VIP)',
      'Brahma Temple (VIP)',
      'Evening Pushkar Lake Aarti',
      'Local storyteller',
    ],
    notes: [
      {
        question: "Why don't many families worship Lord Brahma at home?",
        answer:
          'Traditional belief holds that Brahma is mainly worshipped in temple form, and Pushkar remains the rare place where his shrine stands at the centre of living practice.',
      },
      {
        question: 'Why is the Lord Brahma temple only in Pushkar?',
        answer:
          'Mythology places Brahma’s creation rite and Savitri’s curse here, which is why Pushkar is known for one of the few temples dedicated to Brahma.',
      },
      {
        question: 'What two curses did Goddess Savitri give Lord Brahma?',
        answer:
          'Local tellings recall that Savitri cursed Brahma so he would rarely be worshipped, and that the ritual moment itself would remain bound to Pushkar’s lore — ask your storyteller for the full telling by the lake.',
      },
      {
        question: 'Why is Pushkar Lake so sacred?',
        answer:
          'Legend says the lake rose from a lotus of Lord Brahma. Pilgrims have bathed here for centuries seeking purification and blessings.',
      },
    ],
    featured: true,
    sortOrder: 10,
  }),
  service({
    id: 'service-darshan-lake-vip',
    slug: 'pushkar-lake-vip',
    categoryId: 'category-pushkar-darshan',
    title: 'Pushkar Lake (VIP)',
    summary: 'A quieter lakeside visit arranged with local care.',
    description: `## Pushkar Lake (VIP)

Visit the sacred ghats with guidance so the lake darshan stays calm — timing, etiquette, and the meaning of the waters explained without hurry.`,
    sortOrder: 20,
  }),
  service({
    id: 'service-darshan-brahma-vip',
    slug: 'brahma-temple-vip',
    categoryId: 'category-pushkar-darshan',
    title: 'Brahma Temple (VIP)',
    summary: 'Visit Pushkar’s rare Brahma temple with local guidance.',
    description: `## Brahma Temple (VIP)

One of the few temples dedicated to Lord Brahma. We help you visit respectfully — when to go, how to enter, and what the shrine means in Pushkar’s story.`,
    sortOrder: 30,
  }),
  service({
    id: 'service-darshan-aarti',
    slug: 'evening-pushkar-lake-aarti',
    categoryId: 'category-pushkar-darshan',
    title: 'Evening Pushkar Lake Aarti',
    summary: 'Lamps, bells, and dusk on the Pushkar ghats.',
    description: `## Evening Pushkar Lake Aarti

Join the evening aarti on the ghats — lamps, chants, and desert dusk. We arrange a clear place to sit and explain the rhythm of the ceremony.`,
    featured: true,
    sortOrder: 40,
  }),
  service({
    id: 'service-darshan-storyteller',
    slug: 'local-storyteller',
    categoryId: 'category-pushkar-darshan',
    title: 'Local Storyteller',
    summary: 'Mythology and history of Pushkar, told by a local guide.',
    description: `## Local storyteller

Hear why Pushkar Lake is sacred, why Brahma’s temple stands here, and the stories families still ask about — told simply, by someone who lives this town.`,
    sortOrder: 50,
  }),

  // Vedic poojas
  ...[
    ['pitra-dosh-nivaran', 'Pitra Dosh Nivaran', 'Ancestral remedy ritual arranged with trusted priests.'],
    ['shrad-paksh-pooja', 'Shrad Paksh Pooja', 'Shraddha rites during the fortnight of remembrance.'],
    ['pind-daan-pooja', 'Pind Daan Pooja', 'Pind daan for ancestors, arranged in Pushkar.'],
    ['tarpan-pooja', 'Tarpan Pooja', 'Offering water and prayer for peace of ancestors.'],
    ['naarayan-bali-pooja', 'Naarayan Bali Pooja', 'Narayan Bali ritual guided by Pushkar priests.'],
    ['sukh-shanti-pooja', 'Sukh Shanti Pooja', 'A peace and well-being ritual for the household.'],
    ['live-video-call-pooja', 'Live Video Call Pooja', 'Join a Pushkar ritual live from anywhere in the world.'],
  ].map(([slug, title, summary], index) =>
    service({
      id: `service-vedic-${slug}`,
      slug,
      categoryId: 'category-vedic-pooja',
      title,
      summary,
      description: `## ${title}

${summary}

Rituals can be arranged **in Pushkar** or as a **live video call pooja** worldwide. WhatsApp to confirm the priest, muhurat, and what your family should prepare.`,
      featured: index === 0 || slug === 'live-video-call-pooja',
      sortOrder: (index + 1) * 10,
    }),
  ),

  service({
    id: 'service-desert-night-camping',
    slug: 'desert-night-camping',
    categoryId: 'category-desert-camping',
    title: 'Desert Night Camping with Cultural Program & Dinner',
    summary: 'Sunset, folk dance, Rajasthani dinner, and tents in the Thar.',
    description: `## Enjoy an unforgettable evening in the Thar Desert

A full desert night — ride out at dusk, pause at sunset, reach camp for welcome drinks, folk dance, dinner, and overnight tents.

### Typical flow
1. Camel safari start at **5:00 PM**
2. Break at Sunset point
3. ATV bike ride
4. Dropping at camp by jeep
5. Welcome drink at camp
6. Folk dance (fire dance, Kalbeliya dance)
7. Rajasthani dinner
8. Stay in tents
9. Breakfast in the morning (poha / aloo paratha with pickle)
10. Back to the city by jeep safari

Exact timing depends on season and group size — confirm on WhatsApp.`,
    included: [
      'Camel safari start around 5:00 PM',
      'Sunset point break',
      'ATV bike ride',
      'Jeep drop to camp',
      'Welcome drink',
      'Folk dance (fire dance, Kalbeliya)',
      'Rajasthani dinner',
      'Overnight tent stay',
      'Morning breakfast',
      'Return jeep safari',
    ],
    featured: true,
    sortOrder: 10,
  }),
  ...[
    ['single-camel', 'Single Camel Ride', 'A classic camel ride across the dunes.'],
    ['camel-cart', 'Camel Cart', 'Share a camel cart ride for a gentler desert pace.'],
    ['jeep-safari', 'Jeep Safari', 'Jeep transfer and dune safari options.'],
    ['atv-bike-riding', 'ATV Bike Riding', 'ATV riding on the desert tracks.'],
    ['horse-riding', 'Horse Riding', 'Horse riding experiences in the desert.'],
    [
      'adventure-activities',
      'Desert Adventure Activities',
      'Zipline, paintball, zorbing, climbing, rappelling, archery, and dune bashing.',
    ],
  ].map(([slug, title, summary], index) =>
    service({
      id: `service-desert-${slug}`,
      slug,
      categoryId: 'category-desert-camping',
      title,
      summary,
      description:
        slug === 'adventure-activities'
          ? `## Experience adventure activities

Optional add-ons around the desert evening:

- Zipline
- Paintball
- Zorbing
- Rock climbing
- Rappelling
- Archery
- Dune bashing

Ask which activities are running on your date.`
          : `## ${title}

${summary}

Often paired with the desert night camp or booked as a shorter dune experience.`,
      sortOrder: (index + 2) * 10,
    }),
  ),

  service({
    id: 'service-tour-2-day',
    slug: '2-day-pushkar-itinerary',
    categoryId: 'category-tour-packages',
    title: '2 Day Pushkar Itinerary',
    summary: 'Temples, lake aarti, market, folk night, Savitri, and adventure.',
    description: `## 2 Day Pushkar Itinerary

A paced two-day visit that covers Pushkar’s sacred core, market evenings, folk culture, and a day of views and adventure.

### Day 1
Breakfast at a local street spot, visiting **Brahma Temple** and the **Lake**, rest at your stay. In the evening visit the **Pushkar market**, attend **Pushkar Lake aarti**, then folk dance (fire dance, Kalbeliya) with Rajasthani dinner at the stay.

### Day 2
Morning visit to **Savitri Temple mountain**. Afternoon adventure activities (zipline, paintball, zorbing, rock climbing, rappelling, archery, dune bashing). Evening at **Aloo Baba** (a hidden gem), dinner at an Italian or Israeli restaurant.

Stays and activity slots are confirmed on WhatsApp — this page does not hold inventory.`,
    days: 2,
    nights: 1,
    itinerary: [
      {
        dayNumber: 1,
        heading: 'Lake, temple, market & aarti',
        description:
          'Breakfast at local street, Brahma Temple and Lake, rest at stay, Pushkar market, lake aarti, folk dance and Rajasthani dinner.',
        location: 'Pushkar',
      },
      {
        dayNumber: 2,
        heading: 'Savitri, adventure & Aloo Baba',
        description:
          'Savitri temple mountain in the morning, adventure activities in the afternoon, evening at Aloo Baba, dinner at Italian or Israeli restaurant.',
        location: 'Pushkar & surroundings',
      },
    ],
    featured: true,
    sortOrder: 10,
  }),

  ...[
    ['rooms-with-private-pool', 'Rooms with Private Pool', 'Stays with a private pool for quiet afternoons.'],
    ['stays-near-lake', 'Stays near Lake', 'Rooms close to the Pushkar Lake and ghats.'],
    [
      'luxury-boutique-desert-stays',
      'Luxury, Boutique & Desert Stay Experiences',
      'Curated luxury, boutique, and desert stay categories.',
    ],
    ['luxury-hotels-resorts', 'Luxury Hotels & Resorts', 'Higher-end hotels and resorts in and around Pushkar.'],
    ['family-couple-stays', 'Family & Couple Stays', 'Stays suited to families and couples.'],
    ['budget-hotels', 'Budget Hotels', 'Simple, practical rooms when you want to keep costs light.'],
  ].map(([slug, title, summary], index) =>
    service({
      id: `service-stay-${slug}`,
      slug,
      categoryId: 'category-stays',
      title,
      summary,
      description: `## ${title}

${summary}

We help you choose a stay that matches your pace — near the lake, with a pool, boutique character, desert calm, or a straightforward budget room. Availability is confirmed on WhatsApp.`,
      featured: index < 2,
      sortOrder: (index + 1) * 10,
    }),
  ),

  ...[
    [
      'holi-festival',
      'Holi Festival',
      'Holi parties and music events in Pushkar.',
      '## Holi Festival (Holi Parties & Music Events)\n\nColour, music, and celebration in Pushkar. Ask for party venues, safe hosting, and how to join without the chaos.',
    ],
    [
      'pushkar-camel-fair',
      'International Pushkar Camel Fair',
      'The iconic fair — animals, culture, and desert nights.',
      '## International Pushkar Camel Fair\n\nJoin Pushkar’s famous fair season with local hosting for stays, visits, and evenings around the mela grounds.',
    ],
    [
      'new-year-celebrations',
      'New Year Celebrations',
      'See the new year in with a Pushkar celebration.',
      '## New Year Celebrations\n\nPlan New Year in Pushkar — dinners, music, and a paced evening that still feels like this town.',
    ],
  ].map(([slug, title, summary, description], index) =>
    service({
      id: `service-festival-${slug}`,
      slug,
      categoryId: 'category-festivals',
      title,
      summary,
      description,
      featured: index === 1,
      sortOrder: (index + 1) * 10,
    }),
  ),

  ...[
    ['pushkar-ittar-agarbatti', 'Pushkar Ittar & Handmade Agarbatti', 'Natural perfume and handmade incense from Pushkar.'],
    ['jamun-products', 'Jamun Products (Seasonal)', 'Seasonal jamun products when the harvest allows.'],
    ['german-silver-jewellery', 'German Silver & Artificial Fashion Jewellery', 'Fashion jewellery pieces from local makers.'],
    ['rose-water-gulkand', 'Rose Water & Rose Gulkand', 'Rose water and gulkand from Pushkar’s rose tradition.'],
    ['rudraksha-spiritual-items', 'Rudraksha & Spiritual Items', 'Rudraksha and spiritual items for personal practice.'],
    ['hemp-products', 'Hemp Products', 'Hemp bags, wallets, and clothing.'],
    ['leather-products', 'Leather Products', 'Leather bags, wallets, and clothing.'],
  ].map(([slug, title, summary], index) =>
    service({
      id: `service-product-${slug}`,
      slug,
      categoryId: 'category-products',
      title,
      summary,
      description: `## ${title}

${summary}

Ask before you assume stock — especially for seasonal items like jamun. WhatsApp to check what is available now.`,
      sortOrder: (index + 1) * 10,
    }),
  ),

  ...[
    [
      'destination-wedding-planning',
      'Destination Wedding Planning',
      'Plan a Pushkar destination wedding with local hosts.',
    ],
    ['anniversary-celebrations', 'Anniversary Celebrations', 'Anniversary evenings arranged in Pushkar.'],
    ['birthday-party-arrangements', 'Birthday Party Arrangements', 'Birthday setups with local venues and hosts.'],
    ['corporate-events-team-outing', 'Corporate Events & Team Outing', 'Team outings and corporate gatherings in Pushkar.'],
    [
      'taxi-cab-booking',
      'Taxi & Cab Booking',
      'Airport and railway pickup & drop, plus local transfers.',
    ],
    ['money-exchange', 'Money Exchange', 'Practical money exchange help while you are in Pushkar.'],
  ].map(([slug, title, summary], index) =>
    service({
      id: `service-event-${slug}`,
      slug,
      categoryId: 'category-events-hospitality',
      title,
      summary,
      description:
        index === 0
          ? `## We make every celebration & event memorable in Pushkar

### ${title}

${summary}

From venue rhythm to local vendors, we help shape a Pushkar celebration that feels hosted rather than improvised.`
          : `## ${title}

${summary}

Tell us the date, group size, and what you need — we confirm details on WhatsApp.`,
      featured: index === 0 || slug === 'taxi-cab-booking',
      sortOrder: (index + 1) * 10,
    }),
  ),

  ...[
    ['boho-clothing', 'Boho Clothing', 'Signature boho clothing from Pushkar makers.'],
    ['kaftans', 'Kaftans', 'Easy kaftans for travel and everyday wear.'],
    ['maxi-dresses', 'Maxi Dresses', 'Flowing maxi dresses in Pushkar prints and cuts.'],
    ['kimonos', 'Kimonos', 'Lightweight kimonos and cover-ups.'],
    ['tops', 'Tops', 'Boho tops in local fabrics and prints.'],
    ['skirts', 'Skirts', 'Skirts for desert evenings and travel days.'],
    ['tunics', 'Tunics', 'Tunics with Pushkar character.'],
    ['printed-garments', 'Printed Garments', 'Printed garments from local workshops.'],
    ['scarves-stoles', 'Scarves / Stoles', 'Scarves and stoles for sun, evening, and gifting.'],
    ['jumpsuits', 'Jumpsuits', 'Boho jumpsuits for easy travel outfits.'],
  ].map(([slug, title, summary], index) =>
    service({
      id: `service-boho-${slug}`,
      slug,
      categoryId: 'category-boho-clothing',
      title,
      summary,
      description: `## ${title}

${summary}

Part of Pushkar’s global boho clothing & garment range. Ask for current pieces, sizes, and shipping or pickup options.`,
      sortOrder: (index + 1) * 10,
    }),
  ),

  ...[
    ['property-services', 'Our Property Services', 'End-to-end help to buy, sell, or invest in Pushkar.'],
    ['residential-plots', 'Residential Plots', 'Residential plots in and around Pushkar.'],
    ['farmhouses-agricultural-land', 'Farmhouses & Agricultural Land', 'Farmhouses and agricultural land options.'],
    ['villas-luxury-homes', 'Villas & Luxury Homes', 'Villas and luxury homes for living or investment.'],
    ['hotels-resorts-guest-houses', 'Hotels, Resorts & Guest Houses', 'Hospitality properties for sale or investment.'],
    ['commercial-shops-land', 'Commercial Shops & Land', 'Commercial shops and land parcels.'],
    [
      'property-investment-consultation',
      'Property Investment Consultation',
      'A practical conversation about investing in Pushkar property.',
    ],
  ].map(([slug, title, summary], index) =>
    service({
      id: `service-property-${slug}`,
      slug,
      categoryId: 'category-property',
      title,
      summary,
      description: `## ${title}

${summary}

Property conversations are enquiry-led. WhatsApp to share what you are looking for — buying, selling, or investing. Nothing on this page confirms a sale.`,
      featured: index === 0,
      sortOrder: (index + 1) * 10,
    }),
  ),
];

const lines = [...categories, ...services].map((doc) => JSON.stringify(doc));
const out = resolve(root, 'services.ndjson');
writeFileSync(out, `${lines.join('\n')}\n`);
console.log(`Wrote ${String(lines.length)} documents to ${out}`);
