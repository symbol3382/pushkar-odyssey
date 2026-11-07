import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

function loc(en) {
  return { en };
}

function doc(type, id, fields) {
  return { _id: id, _type: type, ...fields };
}

function slug(current) {
  return { _type: 'slug', current };
}

function note(question, answer, key) {
  return {
    _type: 'note',
    _key: key,
    question: loc(question),
    answer: loc(answer),
  };
}

function day(dayNumber, heading, description, location) {
  return {
    _type: 'itineraryDay',
    _key: `day-${String(dayNumber)}`,
    dayNumber,
    heading: loc(heading),
    description: loc(description),
    location: location ? loc(location) : undefined,
  };
}

const documents = [
  // 1. Darshan
  doc('darshan', 'darshan-pushkar-experience', {
    title: loc('Pushkar Darshan Experience'),
    slug: slug('pushkar-darshan-experience'),
    summary: loc('A peaceful, hassle-free visit to Pushkar’s sacred places.'),
    description: loc(`## Experience a peaceful and hassle-free visit

Pushkar’s sacred heart — lake, Brahma Temple, evening aarti, and local storytelling — hosted so the visit stays calm rather than rushed.

### Included stops
- Pushkar Lake (VIP)
- Brahma Temple (VIP)
- Evening Pushkar Lake Aarti
- Local storyteller explaining Pushkar's mythology and history`),
    kind: 'package',
    visitFocus: 'mixed',
    format: 'in-person',
    included: [
      loc('Pushkar Lake (VIP)'),
      loc('Brahma Temple (VIP)'),
      loc('Evening Pushkar Lake Aarti'),
      loc('Local storyteller'),
    ],
    notes: [
      note(
        "Why don't many families worship Lord Brahma at home?",
        'Traditional belief holds that Brahma is mainly worshipped in temple form, and Pushkar remains the rare place where his shrine stands at the centre of living practice.',
        'n1',
      ),
      note(
        'Why is the Lord Brahma temple only in Pushkar?',
        'Mythology places Brahma’s creation rite and Savitri’s curse here, which is why Pushkar is known for one of the few temples dedicated to Brahma.',
        'n2',
      ),
      note(
        'What two curses did Goddess Savitri give Lord Brahma?',
        'Local tellings recall that Savitri cursed Brahma so he would rarely be worshipped, and that the ritual moment itself would remain bound to Pushkar’s lore — ask your storyteller for the full telling by the lake.',
        'n3',
      ),
      note(
        'Why is Pushkar Lake so sacred?',
        'Legend says the lake rose from a lotus of Lord Brahma. Pilgrims have bathed here for centuries seeking purification and blessings.',
        'n4',
      ),
    ],
    featured: true,
    sortOrder: 10,
  }),
  doc('darshan', 'darshan-lake-vip', {
    title: loc('Pushkar Lake (VIP)'),
    slug: slug('pushkar-lake-vip'),
    summary: loc('A quieter lakeside visit arranged with local care.'),
    description: loc(`## Pushkar Lake (VIP)

Visit the sacred ghats with guidance so the lake darshan stays calm — timing, etiquette, and the meaning of the waters explained without hurry.`),
    kind: 'visit',
    visitFocus: 'lake-vip',
    format: 'in-person',
    featured: true,
    sortOrder: 20,
  }),
  doc('darshan', 'darshan-brahma-vip', {
    title: loc('Brahma Temple (VIP)'),
    slug: slug('brahma-temple-vip'),
    summary: loc('Visit Pushkar’s rare Brahma temple with local guidance.'),
    description: loc(`## Brahma Temple (VIP)

One of the few temples dedicated to Lord Brahma. We help you visit respectfully — when to go, how to enter, and what the shrine means in Pushkar’s story.`),
    kind: 'visit',
    visitFocus: 'brahma-temple-vip',
    format: 'in-person',
    sortOrder: 30,
  }),
  doc('darshan', 'darshan-evening-aarti', {
    title: loc('Evening Pushkar Lake Aarti'),
    slug: slug('evening-pushkar-lake-aarti'),
    summary: loc('Lamps, bells, and dusk on the Pushkar ghats.'),
    description: loc(`## Evening Pushkar Lake Aarti

Join the evening aarti on the ghats — lamps, chants, and desert dusk. We arrange a clear place to sit and explain the rhythm of the ceremony.`),
    kind: 'visit',
    visitFocus: 'evening-aarti',
    format: 'in-person',
    featured: true,
    sortOrder: 40,
  }),
  doc('darshan', 'darshan-storyteller', {
    title: loc('Local Storyteller'),
    slug: slug('local-storyteller'),
    summary: loc('Mythology and history of Pushkar, told by a local guide.'),
    description: loc(`## Local storyteller explaining Pushkar's mythology and history

Hear why Pushkar Lake is sacred, why Brahma’s temple stands here, and the stories families still ask about — told simply, by someone who lives this town.`),
    kind: 'visit',
    visitFocus: 'storyteller',
    format: 'in-person',
    sortOrder: 50,
  }),
  ...[
    ['pitra-dosh-nivaran', 'Pitra Dosh Nivaran', 'Ancestral remedy ritual with trusted priests.'],
    ['shrad-paksh-pooja', 'Shrad Paksh Pooja', 'Shraddha rites during the fortnight of remembrance.'],
    ['pind-daan-pooja', 'Pind Daan Pooja', 'Pind daan for ancestors, arranged in Pushkar.'],
    ['tarpan-pooja', 'Tarpan Pooja', 'Offering water and prayer for peace of ancestors.'],
    ['naarayan-bali-pooja', 'Naarayan Bali Pooja', 'Narayan Bali ritual guided by Pushkar priests.'],
    ['sukh-shanti-pooja', 'Sukh Shanti Pooja', 'A peace and well-being ritual for the household.'],
    ['live-video-call-pooja', 'Live Video Call Pooja', 'Join a Pushkar ritual live from anywhere in the world.'],
  ].map(([slugValue, title, summary], index) =>
    doc('darshan', `darshan-vedic-${slugValue}`, {
      title: loc(title),
      slug: slug(slugValue),
      summary: loc(summary),
      description: loc(`## ${title}

Part of our **Vedic Pooja Services & Online Pooja (Worldwide)**.

${summary}

Rituals can be arranged in Pushkar or as a live video call. WhatsApp to confirm the priest, muhurat, and what your family should prepare.`),
      kind: 'vedic',
      visitFocus: slugValue === 'live-video-call-pooja' ? 'live-video' : 'other',
      format: slugValue === 'live-video-call-pooja' ? 'online' : 'both',
      featured: slugValue === 'live-video-call-pooja',
      sortOrder: 60 + index * 10,
    }),
  ),

  // 2. Cultural program
  doc('culturalProgram', 'cultural-desert-night-camping', {
    title: loc('Desert Night Camping with Cultural Program & Dinner'),
    slug: slug('desert-night-camping'),
    summary: loc('An unforgettable evening in the Thar Desert with dinner, dance, and tents.'),
    description: loc(`## Enjoy an unforgettable evening in the Thar Desert

Ride out at dusk, pause at sunset, reach camp for welcome drinks, folk dance, dinner, and overnight tents.

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
10. Back to the city by jeep safari`),
    kind: 'camping',
    startTime: '5:00 PM',
    programFlow: [
      loc('Camel safari start at 5:00 PM'),
      loc('Break at Sunset point'),
      loc('ATV bike ride'),
      loc('Dropping at camp by jeep'),
      loc('Welcome drink at camp'),
      loc('Folk dance (fire dance, Kalbeliya dance)'),
      loc('Rajasthani dinner'),
      loc('Stay in tents'),
      loc('Breakfast in morning (poha / aloo paratha with pickle)'),
      loc('Back to city by jeep safari'),
    ],
    included: [
      loc('Camel safari'),
      loc('Sunset point'),
      loc('ATV bike ride'),
      loc('Jeep transfers'),
      loc('Welcome drink'),
      loc('Folk dance'),
      loc('Rajasthani dinner'),
      loc('Tent stay'),
      loc('Morning breakfast'),
    ],
    featured: true,
    sortOrder: 10,
  }),
  ...[
    ['single-camel', 'Single Camel', 'ride', 'A classic camel ride across the dunes.'],
    ['camel-cart', 'Camel Cart', 'ride', 'Share a camel cart ride for a gentler desert pace.'],
    ['jeep-safari', 'Jeep Safari', 'ride', 'Jeep transfer and dune safari options.'],
    ['atv-bike-riding', 'ATV Bike Riding', 'ride', 'ATV riding on the desert tracks.'],
    ['horse-riding', 'Horse Riding', 'ride', 'Horse riding experiences in the desert.'],
    [
      'adventure-activities',
      'Adventure Activities',
      'adventure',
      'Zipline, paintball, zorbing, rock climbing, rappelling, archery, and dune bashing.',
    ],
  ].map(([slugValue, title, kind, summary], index) =>
    doc('culturalProgram', `cultural-${slugValue}`, {
      title: loc(title),
      slug: slug(slugValue),
      summary: loc(summary),
      description:
        kind === 'adventure'
          ? loc(`## Experience adventure activities

Optional add-ons around the desert evening:

- Zipline
- Paintball
- Zorbing
- Rock climbing
- Rappelling
- Archery
- Dune bashing

Ask which activities are running on your date.`)
          : loc(`## ${title}

${summary}

Often paired with the desert night camp or booked as a shorter dune experience.`),
      kind,
      featured: index === 0,
      sortOrder: 20 + index * 10,
    }),
  ),

  // 3. Tour packages
  doc('tourPackage', 'tour-2-day-pushkar', {
    title: loc('2 Day Pushkar Itinerary'),
    slug: slug('2-day-pushkar-itinerary'),
    summary: loc('Temples, lake aarti, market, folk night, Savitri, adventure, and Aloo Baba.'),
    description: loc(`## 2 Day Pushkar Itinerary

A paced two-day visit covering Pushkar’s sacred core, market evenings, folk culture, views, and adventure.

### Day 1
Breakfast at a local street spot, visiting **Brahma Temple** and the **Lake**, rest at your stay. In the evening visit the **Pushkar market**, attend **Pushkar Lake aarti**, then folk dance (fire dance, Kalbeliya) with Rajasthani dinner at the stay.

### Day 2
Morning visit to **Savitri Temple mountain**. Afternoon adventure activities (zipline, paintball, zorbing, rock climbing, rappelling, archery, dune bashing). Evening at **Aloo Baba** (a hidden gem), dinner at an Italian or Israeli restaurant.`),
    kind: 'itinerary',
    days: 2,
    nights: 1,
    itinerary: [
      day(
        1,
        'Lake, temple, market & aarti',
        'Breakfast at local street, Brahma Temple and Lake, rest at stay, Pushkar market, lake aarti, folk dance and Rajasthani dinner.',
        'Pushkar',
      ),
      day(
        2,
        'Savitri, adventure & Aloo Baba',
        'Savitri temple mountain in the morning, adventure activities in the afternoon, evening at Aloo Baba, dinner at Italian or Israeli restaurant.',
        'Pushkar & surroundings',
      ),
    ],
    included: [
      loc('Temple and lake visits'),
      loc('Market evening & lake aarti'),
      loc('Folk dance evening'),
      loc('Savitri temple visit'),
      loc('Adventure activity window'),
    ],
    featured: true,
    sortOrder: 10,
  }),
  ...[
    ['rooms-with-private-pool', 'Rooms with Private Pool', 'private-pool', 'Stays with a private pool for quiet afternoons.'],
    ['stays-near-lake', 'Stays near Lake', 'near-lake', 'Rooms close to the Pushkar Lake and ghats.'],
    [
      'luxury-boutique-desert-stays',
      'Luxury, Boutique & Desert Stay Experiences',
      'luxury-boutique-desert',
      'Curated luxury, boutique, and desert stay categories.',
    ],
    ['luxury-hotels-resorts', 'Luxury Hotels & Resorts', 'luxury-hotel', 'Higher-end hotels and resorts in and around Pushkar.'],
    ['family-couple-stays', 'Family & Couple Stays', 'family-couple', 'Stays suited to families and couples.'],
    ['budget-hotels', 'Budget Hotels', 'budget', 'Simple, practical rooms when you want to keep costs light.'],
  ].map(([slugValue, title, stayStyle, summary], index) =>
    doc('tourPackage', `tour-stay-${slugValue}`, {
      title: loc(title),
      slug: slug(slugValue),
      summary: loc(summary),
      description: loc(`## ${title}

Part of **Stays in Pushkar**.

${summary}

We help you choose a stay that matches your pace. Availability is confirmed on WhatsApp — this page does not hold inventory.`),
      kind: 'stay',
      stayStyle,
      featured: index < 2,
      sortOrder: 20 + index * 10,
    }),
  ),

  // 4. Events (festivals + hospitality)
  ...[
    [
      'holi-festival',
      'Holi Festival',
      'festival',
      'Holi parties and music events in Pushkar.',
      '## Holi Festival (Holi Parties & Music Events)\n\nColour, music, and celebration in Pushkar. Ask for party venues, safe hosting, and how to join without the chaos.',
    ],
    [
      'pushkar-camel-fair',
      'International Pushkar Camel Fair',
      'festival',
      'The iconic fair — animals, culture, and desert nights.',
      '## International Pushkar Camel Fair\n\nJoin Pushkar’s famous fair season with local hosting for stays, visits, and evenings around the mela grounds.',
    ],
    [
      'new-year-celebrations',
      'New Year Celebrations',
      'festival',
      'See the new year in with a Pushkar celebration.',
      '## New Year Celebrations\n\nPlan New Year in Pushkar — dinners, music, and a paced evening that still feels like this town.',
    ],
    [
      'destination-wedding-planning',
      'Destination Wedding Planning',
      'hospitality',
      'Plan a Pushkar destination wedding with local hosts.',
      '## We make every celebration & event memorable in Pushkar\n\n### Destination Wedding Planning\n\nFrom venue rhythm to local vendors, we help shape a Pushkar celebration that feels hosted rather than improvised.',
    ],
    [
      'anniversary-celebrations',
      'Anniversary Celebrations',
      'hospitality',
      'Anniversary evenings arranged in Pushkar.',
      '## Anniversary celebrations\n\nQuiet dinners, lakeside moments, or a fuller hosted evening — tell us the date and mood.',
    ],
    [
      'birthday-party-arrangements',
      'Birthday Party Arrangements',
      'hospitality',
      'Birthday setups with local venues and hosts.',
      '## Birthday Party Arrangements\n\nVenues, decorations, and local hosting for birthdays in Pushkar.',
    ],
    [
      'corporate-events-team-outing',
      'Corporate Events & Team Outing',
      'hospitality',
      'Team outings and corporate gatherings in Pushkar.',
      '## Corporate Events & Team Outing\n\nGroup transfers, activities, dinners, and a schedule that fits your team.',
    ],
    [
      'taxi-cab-booking',
      'Taxi & Cab Booking',
      'practical',
      'Airport and railway pickup & drop, plus local transfers.',
      '## Taxi & Cab Booking (Airport / Railway Pickup & Drop)\n\nReliable transfers in and out of Pushkar. Share flight or train timings on WhatsApp.',
    ],
    [
      'money-exchange',
      'Money Exchange',
      'practical',
      'Practical money exchange help while you are in Pushkar.',
      '## Money Exchange\n\nLocal help for exchanging money while you travel — ask for current trusted options.',
    ],
  ].map(([slugValue, title, kind, summary, description], index) =>
    doc('event', `event-${slugValue}`, {
      title: loc(title),
      slug: slug(slugValue),
      summary: loc(summary),
      description: loc(description),
      kind,
      featured: ['pushkar-camel-fair', 'destination-wedding-planning', 'taxi-cab-booking'].includes(
        slugValue,
      ),
      sortOrder: (index + 1) * 10,
    }),
  ),

  // 5. Best sellers (products + boho + property)
  ...[
    ['pushkar-ittar-agarbatti', 'Pushkar Ittar & Handmade Agarbatti', 'product', false, 'Natural perfume and handmade incense from Pushkar.'],
    ['jamun-products', 'Jamun Products (Seasonal)', 'product', true, 'Seasonal jamun products when the harvest allows.'],
    ['german-silver-jewellery', 'German Silver & Artificial Fashion Jewellery', 'product', false, 'Fashion jewellery pieces from local makers.'],
    ['rose-water-gulkand', 'Rose Water & Rose Gulkand', 'product', false, 'Rose water and gulkand from Pushkar’s rose tradition.'],
    ['rudraksha-spiritual-items', 'Rudraksha & Spiritual Items', 'product', false, 'Rudraksha and spiritual items for personal practice.'],
    ['hemp-products', 'Hemp Products', 'product', false, 'Hemp bags, wallets, and clothing.'],
    ['leather-products', 'Leather Products', 'product', false, 'Leather bags, wallets, and clothing.'],
    ['boho-clothing', 'Boho Clothing', 'garment', false, 'Signature boho clothing from Pushkar makers.'],
    ['kaftans', 'Kaftans', 'garment', false, 'Easy kaftans for travel and everyday wear.'],
    ['maxi-dresses', 'Maxi Dresses', 'garment', false, 'Flowing maxi dresses in Pushkar prints and cuts.'],
    ['kimonos', 'Kimonos', 'garment', false, 'Lightweight kimonos and cover-ups.'],
    ['tops', 'Tops', 'garment', false, 'Boho tops in local fabrics and prints.'],
    ['skirts', 'Skirts', 'garment', false, 'Skirts for desert evenings and travel days.'],
    ['tunics', 'Tunics', 'garment', false, 'Tunics with Pushkar character.'],
    ['printed-garments', 'Printed Garments', 'garment', false, 'Printed garments from local workshops.'],
    ['scarves-stoles', 'Scarves / Stoles', 'garment', false, 'Scarves and stoles for sun, evening, and gifting.'],
    ['jumpsuits', 'Jumpsuits', 'garment', false, 'Boho jumpsuits for easy travel outfits.'],
    ['property-services', 'Our Property Services', 'property', false, 'End-to-end help to buy, sell, or invest in Pushkar.'],
    ['residential-plots', 'Residential Plots', 'property', false, 'Residential plots in and around Pushkar.'],
    ['farmhouses-agricultural-land', 'Farmhouses & Agricultural Land', 'property', false, 'Farmhouses and agricultural land options.'],
    ['villas-luxury-homes', 'Villas & Luxury Homes', 'property', false, 'Villas and luxury homes for living or investment.'],
    ['hotels-resorts-guest-houses', 'Hotels, Resorts & Guest Houses', 'property', false, 'Hospitality properties for sale or investment.'],
    ['commercial-shops-land', 'Commercial Shops & Land', 'property', false, 'Commercial shops and land parcels.'],
    [
      'property-investment-consultation',
      'Property Investment Consultation',
      'property',
      false,
      'A practical conversation about investing in Pushkar property.',
    ],
  ].map(([slugValue, title, kind, seasonal, summary], index) =>
    doc('bestSeller', `bestseller-${slugValue}`, {
      title: loc(title),
      slug: slug(slugValue),
      summary: loc(summary),
      description: loc(
        kind === 'property'
          ? `## ${title}\n\n${summary}\n\nProperty conversations are enquiry-led. WhatsApp to share what you are looking for — buying, selling, or investing. Nothing on this page confirms a sale.`
          : kind === 'garment'
            ? `## ${title}\n\nPart of **Pushkar’s global boho clothing & garment products**.\n\n${summary}\n\nAsk for current pieces, sizes, and shipping or pickup options.`
            : `## ${title}\n\nPart of **Pushkar Products Services**.\n\n${summary}\n\nAsk before you assume stock — especially for seasonal items.`,
      ),
      kind,
      seasonal,
      featured:
        ['pushkar-ittar-agarbatti', 'boho-clothing', 'property-services', 'kaftans'].includes(
          slugValue,
        ),
      sortOrder: (index + 1) * 10,
    }),
  ),
];

const out = resolve(root, 'services.ndjson');
writeFileSync(out, `${documents.map((item) => JSON.stringify(item)).join('\n')}\n`);
console.log(`Wrote ${String(documents.length)} documents to ${out}`);
