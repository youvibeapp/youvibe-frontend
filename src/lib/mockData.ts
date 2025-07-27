import type {
  BackendImageAnalysisResult,
  BackendImageSearchResult,
  BackendCelebrityMatchResult,
} from './types/backend';

// Mock image analysis result
export const mockAnalysisResult: BackendImageAnalysisResult = {
  descriptive_metadata: {
    tags: ['soft girl', 'aesthetic', 'cozy', 'dreamy', 'pink'],
    caption: 'A soft girl aesthetic with cozy vibes',
    style: 'Soft Girl',
    mood: 'dreamy and confident',
    color_palette_hexcodes: ['#f4c2c2', '#d4a4a4', '#b08d8d', '#8b7070'],
  },
  facial_metadata: {
    age_range: '18-25',
    gender: 'female',
    ethnicity: 'mixed',
    jaw_line: 'soft and rounded',
    chin: 'gentle and proportioned',
    cheeks: 'naturally full with healthy glow',
    forehead: 'smooth and balanced',
    eyebrows: 'naturally shaped with good definition',
    eyes: 'bright and expressive with natural lashes',
    nose: 'well-proportioned button nose',
    lips: 'naturally full with subtle gloss',
    skin_texture: 'smooth with healthy glow',
    beard_moustache_area: 'clean and smooth',
    current_hair_style: 'long wavy hair with face-framing layers',
    hair_style_improvement_suggestions:
      'Consider adding subtle highlights for dimension',
    clothing_style_suggestions:
      'Soft pastels, oversized sweaters, and delicate jewelry',
    overall_appearance: 'Natural beauty with soft, approachable style',
    confidence_score: 0.85,
  },
  semantic_embedding: [0.1, 0.2, 0.3, 0.4, 0.5], // Simplified for demo
};

// Mock celebrity match result
export const mockCelebrityMatchResult: BackendCelebrityMatchResult = {
  matches: [
    {
      name: 'Noah Centineo',
      description:
        'Noah Centineo is a popular actor known for his charming roles in romantic comedies. He has a youthful appearance that aligns with the specified facial features.',
      confidence_score: 0.88,
      profession: 'Actor',
      match_reasons: [
        'Defined but soft jawline',
        'Moderately prominent chin',
        'Almond-shaped expressive eyes',
      ],
      images: [
        {
          file_path: '/kXLuzSWRqM2P45uNcgb0v3H8dnE.jpg',
          width: 1400,
          height: 2100,
        },
        {
          file_path: '/p1bcst401RyxfDGykx2iQLI7CV5.jpg',
          width: 500,
          height: 750,
        },
      ],
    },
    {
      name: 'Jack Harlow',
      description:
        'Jack Harlow is a rapper and songwriter known for his approachable demeanor and vibrant personality. His facial features align closely with the requested characteristics.',
      confidence_score: 0.87,
      profession: 'Musician',
      match_reasons: [
        'Well-groomed eyebrows',
        'Friendly demeanor',
        'Moderate fullness in lips',
      ],
      images: [
        {
          file_path: '/kwyfajrPMpQYa9qBBZo3uK1LjAT.jpg',
          width: 655,
          height: 983,
        },
        {
          file_path: '/1zSnCkmQMlaXcLqKdEG4dmn5RKv.jpg',
          width: 1673,
          height: 2507,
        },
        {
          file_path: '/hlS9PJp1DndWbNBg583i5eFdgxj.jpg',
          width: 1673,
          height: 2507,
        },
        {
          file_path: '/b0qNRpTIC0XJAmI25L7nPzzismZ.jpg',
          width: 1673,
          height: 2507,
        },
        {
          file_path: '/w9bvSQjMKJpi0XyfHX5a0c7PFUB.jpg',
          width: 998,
          height: 1496,
        },
      ],
    },
    {
      name: 'Finn Wolfhard',
      description:
        "Finn Wolfhard is an actor and musician recognized for his roles in 'Stranger Things' and other projects. He possesses a youthful look that fits well with the given criteria.",
      confidence_score: 0.85,
      profession: 'Actor/Musician',
      match_reasons: [
        'Slightly fuller cheeks',
        'Expressive almond-shaped eyes',
        'Defined jawline',
      ],
      images: [
        {
          file_path: '/5OVmquAk0W5BIsRlVKslEP497JD.jpg',
          width: 1400,
          height: 2100,
        },
        {
          file_path: '/9uoEc9p5fPMSjZgW5hMxPK6L2eX.jpg',
          width: 555,
          height: 833,
        },
        {
          file_path: '/p0ayyuQWPnTvbCaN7E2ROetuLVs.jpg',
          width: 300,
          height: 450,
        },
        {
          file_path: '/anMQmPi2X8v08zOB5Vyixf2t2JD.jpg',
          width: 1285,
          height: 1929,
        },
        {
          file_path: '/bi5OLYrxLwG3AZKOZL1mZjpcRQm.jpg',
          width: 800,
          height: 1200,
        },
        {
          file_path: '/x7B4U4sRMBH1HHwB34K7Jtmxjnw.jpg',
          width: 1475,
          height: 2212,
        },
        {
          file_path: '/pefciSxD2TZurQIDtyGtStz9TaK.jpg',
          width: 1380,
          height: 2070,
        },
        {
          file_path: '/fMCfuF7OaekBBsPSvzHSPSZgmOZ.jpg',
          width: 683,
          height: 1024,
        },
      ],
    },
  ],
  search_summary:
    'Found three male celebrities aged 20-25 with defined facial features that match the specified characteristics.',
};

// Mock image search results
export const mockImageSearchResults: BackendImageSearchResult[] = [
  {
    id: '66284',
    title:
      'Snow-covered trees in a peaceful winter landscape under a bright sky.',
    description: undefined,
    tags: undefined,
    owner: 'Pixabay',
    image_url:
      'https://images.pexels.com/photos/66284/winter-nature-season-trees-66284.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    image_bytes: undefined,
    source_page:
      'https://www.pexels.com/photo/white-and-black-tree-illustration-66284/',
    source_type: 'search',
  },
  {
    id: '6800935',
    title:
      'White ceramic mug on saucer with a minimalist design against a neutral background.',
    description: undefined,
    tags: undefined,
    owner: 'Artem Podrez',
    image_url:
      'https://images.pexels.com/photos/6800935/pexels-photo-6800935.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    image_bytes: undefined,
    source_page:
      'https://www.pexels.com/photo/a-white-cup-on-a-saucer-6800935/',
    source_type: 'search',
  },
  {
    id: '2698552',
    title:
      'Beautiful British Shorthair cat with orange eyes posing in a minimalist indoor setting.',
    description: undefined,
    tags: undefined,
    owner: 'Alina Vilchenko',
    image_url:
      'https://images.pexels.com/photos/2698552/pexels-photo-2698552.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    image_bytes: undefined,
    source_page: 'https://www.pexels.com/photo/photo-of-white-cat-2698552/',
    source_type: 'search',
  },
  {
    id: '6466466',
    title:
      "A person walks alone in a vast, snow-covered landscape on a winter's day.",
    description: undefined,
    tags: undefined,
    owner: 'Artem Podrez',
    image_url:
      'https://images.pexels.com/photos/6466466/pexels-photo-6466466.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    image_bytes: undefined,
    source_page:
      'https://www.pexels.com/photo/person-in-black-pants-walking-on-snow-covered-ground-6466466/',
    source_type: 'search',
  },
  {
    id: '8220771',
    title:
      'A woman walks past a futuristic beachside art installation with white spheres.',
    description: undefined,
    tags: undefined,
    owner: 'Mikhail Nilov',
    image_url:
      'https://images.pexels.com/photos/8220771/pexels-photo-8220771.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    image_bytes: undefined,
    source_page:
      'https://www.pexels.com/photo/woman-walking-beside-an-abstract-designed-wall-8220771/',
    source_type: 'search',
  },
  {
    id: '11065504',
    title:
      'Elegantly crafted white ceramic tableware featuring a bowl, plate, and mug in a minimalist design.',
    description: undefined,
    tags: undefined,
    owner: 'Галина Ласаева',
    image_url:
      'https://images.pexels.com/photos/11065504/pexels-photo-11065504.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    image_bytes: undefined,
    source_page:
      'https://www.pexels.com/photo/still-life-with-minimalist-tableware-11065504/',
    source_type: 'search',
  },
  {
    id: '7561206',
    title:
      'Stylish woman in a white suit standing amidst sculptures in a bright room.',
    description: undefined,
    tags: undefined,
    owner: 'SHVETS production',
    image_url:
      'https://images.pexels.com/photos/7561206/pexels-photo-7561206.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    image_bytes: undefined,
    source_page:
      'https://www.pexels.com/photo/a-woman-wearing-a-white-suit-surrounded-with-sculptures-7561206/',
    source_type: 'search',
  },
  {
    id: '12172754',
    title:
      'Minimalist white abstract pattern featuring curved architectural lines.',
    description: undefined,
    tags: undefined,
    owner: 'Enrique',
    image_url:
      'https://images.pexels.com/photos/12172754/pexels-photo-12172754.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    image_bytes: undefined,
    source_page:
      'https://www.pexels.com/photo/mobile-wallpaper-with-a-pattern-12172754/',
    source_type: 'search',
  },
  {
    id: '5993557',
    title:
      'Detailed view of natural beige handmade paper texture on white background.',
    description: undefined,
    tags: undefined,
    owner: 'Photo By: Kaboompics.com',
    image_url:
      'https://images.pexels.com/photos/5993557/pexels-photo-5993557.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    image_bytes: undefined,
    source_page:
      'https://www.pexels.com/photo/texture-on-white-background-5993557/',
    source_type: 'search',
  },
];

// Alternative mock data sets for different scenarios
export const mockDataSets = {
  'soft-girl': {
    analysis: mockAnalysisResult,
    celebrity: mockCelebrityMatchResult,
    images: mockImageSearchResults,
  },
  'no-celebrity': {
    analysis: {
      ...mockAnalysisResult,
      facial_metadata: undefined, // No facial data = no celebrity match
    },
    celebrity: undefined,
    images: mockImageSearchResults,
  },
  'dark-academia': {
    analysis: {
      ...mockAnalysisResult,
      descriptive_metadata: {
        tags: ['dark academia', 'scholarly', 'vintage', 'intellectual'],
        caption: 'Dark academia aesthetic with scholarly vibes',
        style: 'Dark Academia',
        mood: 'intellectual and mysterious',
        color_palette_hexcodes: ['#2c1810', '#5d4037', '#8d6e63', '#a1887f'],
      },
    },
    celebrity: {
      ...mockCelebrityMatchResult,
      matches: [
        {
          ...mockCelebrityMatchResult.matches[0],
          name: 'Timothée Chalamet',
          description: 'Shares similar intellectual and artistic aesthetic',
          profession: 'Actor',
        },
      ],
    },
    images: mockImageSearchResults.map(img => ({
      ...img,
      title: img.title?.replace('Soft', 'Dark Academia') || img.title,
      tags: img.tags?.replace('soft', 'dark academia'),
    })),
  },
} as const;
