import { useEffect, useState } from 'react'
import './App.css'
import clinicLogo from './assets/vhc/volclinic-logo-2016-rgb.png'
import clinicFooterLogo from './assets/vhc/volclinic-logo-2016-rgb-1-1_orig.png'
import araLogo from './assets/vhc/ara-diagnostic-sd-logo-copy.png'
import ascensionLogo from './assets/vhc/asce-seton-logo-hz2-fc-rgb-copy.png'
import stDavidsLogo from './assets/vhc/st-davids-foundation.png'
import nafcSeal from './assets/vhc/nafc-standards-seal-gold-2025-sm-transparent.png'
import txaccSeal from './assets/vhc/txacc-gold-seal-2025.png'

type Language = 'en' | 'es' | 'fr'
type PageId =
  | 'home'
  | 'services'
  | 'patients'
  | 'volunteer'
  | 'about'
  | 'events'
  | 'resources'
  | 'contact'
  | 'donate'

type TeamMember = {
  name: string
  role: string
}

type LinkCard = {
  title: string
  text: string
  href?: string
  label?: string
}

const volunteerPageUrl = 'https://www.volclinic.org/volunteerform2.html'
const jobsPdfUrl =
  'https://www.volclinic.org/uploads/6/1/5/9/61595609/patient_advocate_job_posting_jan_22.pdf'
const noGunPolicyUrl =
  'https://www.volclinic.org/uploads/6/1/5/9/61595609/vhc_patient_handout_no_gun_policy.pdf'
const integralCareUrl = 'https://integralcare.org/'
const txaccFindClinicUrl = 'https://texasacc.org/find-a-clinic-page/'
const facebookUrl = 'https://www.facebook.com/VolunteerHealthcareClinic/'

const navItems: PageId[] = [
  'home',
  'services',
  'patients',
  'volunteer',
  'about',
  'events',
  'resources',
  'contact',
  'donate',
]

const boardMembers: TeamMember[] = [
  {
    name: 'Sunaina Suhag, MD',
    role: 'Board President, Pediatrician, Austin Regional Clinic',
  },
  {
    name: 'Ellee Cochran, JD',
    role: 'Board Secretary, Attorney, Husch Blackwell, LLP',
  },
  {
    name: 'Lewis Bryan, CPA, CFE, MBA',
    role: 'Board Treasurer, Accounting Director, Austin Community College',
  },
  {
    name: 'Tom McHorse, MD',
    role: 'Medical Director, Gastroenterologist, Austin Regional Clinic',
  },
  {
    name: 'Davika Reid, PhD, MSN, RN',
    role: 'Past President, Senior Research Nurse, Pediatrix Neonatology Austin',
  },
  {
    name: 'Allen Busch, RPh',
    role: 'Member At Large, Pharmacist, Ascension Seton Medical Center Austin',
  },
  {
    name: 'Lora Ann Gerson',
    role: "Member At Large, Retired Director of Constituent Services of Senator Kirk Watson's Office",
  },
  {
    name: 'Mary Lou Perez-Brown, CHES, PMP',
    role: 'Member At Large, Manager of Strategy and Operations, Ascension Seton Hospital',
  },
  {
    name: 'Alina Ramos, MD',
    role: 'Member At Large, Retired Physician, Community Care',
  },
  {
    name: 'Lynda Shanblum',
    role: 'Member At Large, Community Relations Specialist, Austin Regional Clinic',
  },
  {
    name: 'Aurora Trahan, MHA',
    role: 'Member At Large, Senior Director, Customer Success Egnite Health',
  },
]

const staffMembers: TeamMember[] = [
  { name: 'Marci Roe', role: 'Executive Director' },
  { name: 'Laura Hurst', role: 'Director of Volunteers & Engagement' },
  { name: 'Silvia Reyes', role: 'Director of Patient Services' },
  { name: 'Emily Tovar', role: 'Office Manager' },
  { name: 'Eloisa Castro', role: 'Office Assistant / Patient Advocate' },
  {
    name: 'Elizabeth Cruz-Lopez, CPhT',
    role: 'Pharmacy Technician / Patient Advocate',
  },
  { name: 'Lorraine Gonzalez, PA', role: 'Staff Provider' },
  {
    name: 'Nancy Guillet, PhD, MSN, RN',
    role: 'Chronic Disease Nursing Director, Charge Nurse, Case Management Nurse',
  },
  { name: 'Victoria Hutson, MSN, BSN, RN', role: 'Charge Nurse' },
  {
    name: 'Andrew Stone, RN, BSCS',
    role: 'Charge Nurse, Specialty Clinic, Programmer',
  },
  {
    name: 'Germaine Wyld, PharmD, RPh, BCPS',
    role: 'Pharmacist in Charge',
  },
  { name: 'Omar Gonzalez, PharmD, RPh, MBA', role: 'Staff Pharmacist' },
  { name: 'Dolores Flores, CPHT', role: 'Pharmacy Technician' },
  { name: 'Olivia Ramirez, CPhT', role: 'Pharmacy Technician' },
  { name: 'Sam Quirino Iniguez, CPT', role: 'Lab Technician / Phlebotomist' },
  { name: 'Sivaram Manda, BS, MCSD, AWS', role: 'Technical Specialist' },
]

const partners = [
  {
    name: 'ARA Diagnostic Imaging',
    href: 'https://www.ausrad.com/',
    image: araLogo,
  },
  {
    name: 'Ascension Seton Medical Center Austin',
    href: 'https://healthcare.ascension.org/locations/texas/txaus/austin-ascension-seton-medical-center-austin',
    image: ascensionLogo,
  },
  {
    name: "St. David's Foundation",
    href: 'https://stdavidsfoundation.org/',
    image: stDavidsLogo,
  },
]

const languageLabel = {
  en: 'Language',
  es: 'Idioma',
  fr: 'Langue',
}

const languageNames = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
}

const copy = {
  en: {
    pageName: {
      home: 'Home',
      services: 'Services',
      patients: 'Patients',
      volunteer: 'Join Us',
      about: 'About',
      events: 'Events',
      resources: 'Resources',
      contact: 'Contact Us',
      donate: 'Donate',
    },
    status: {
      title: 'Clinic update',
      text: 'Closed Monday, February 16, 2026, and Monday, March 16 to Friday, March 20, 2026.',
      helper: 'Need help now? Call 512-459-6002.',
    },
    footer: {
      awards: 'Awards and recognition',
      newsletter: 'Newsletter',
      newsletterText: 'Get simple clinic news by email.',
      social: 'Facebook',
      rights: '@ 2024 by Volunteer Healthcare Clinic',
      address: '4215 Medical Parkway, Austin, Texas 78756',
    },
    home: {
      title: 'Care, hope, and clear next steps.',
      text: 'We help uninsured children and adults in Travis County get medical care. We keep the site simple so families can find help fast.',
      buttons: ['See patient info', 'Give support'],
      cards: [
        'Kind care for common health needs',
        'Simple help in English, Spanish, and French',
        'Clear links for patients, volunteers, and families',
      ],
      quickTitle: 'Start here',
      quickText: 'Pick the page that fits what you need today.',
      directionsTitle: 'Where we are',
      directionsText:
        'The clinic is on Medical Parkway near 43rd Street. Please park on the street so volunteer spots stay open.',
      partnerTitle: 'Sustaining partners',
      storyTitle: 'Life at the clinic',
      stories: [
        { title: 'Patient care nights', text: 'Warm, simple care spaces for families.' },
        { title: 'Volunteer teamwork', text: 'People helping side by side.' },
        { title: 'Community events', text: 'Moments that bring Austin together.' },
      ],
    },
    services: {
      title: 'Services that match real needs.',
      text: 'We focus on common medical needs and long-term health support.',
      items: [
        {
          title: 'Acute care',
          text: 'We help with common sickness like cough, headache, asthma, diabetes, and blood pressure needs.',
        },
        {
          title: 'Chronic care',
          text: 'Monday evening care supports diabetes, hypertension, and other endocrine needs for enrolled patients.',
        },
        {
          title: 'Added support',
          text: 'Lab work, imaging, medicine help, and referrals may be added when a provider orders them.',
        },
      ],
    },
    patients: {
      title: 'Patient info made simple.',
      text: 'This page gives easy rules, document links, and what to bring.',
      rulesTitle: 'Who can come',
      rules: [
        'You must live in Travis County.',
        'You must not have health insurance.',
        'Bring a photo ID.',
        'Bring proof of your Travis County address.',
        'Visits are by appointment only.',
      ],
      docsTitle: 'Patient documents and handouts',
      docs: [
        {
          title: 'No gun policy PDF',
          text: 'Clinic safety handout in English and Spanish.',
          href: noGunPolicyUrl,
          label: 'Open PDF',
        },
        {
          title: 'What to bring',
          text: 'Photo ID, proof of address, and any papers that help explain your health problem.',
        },
        {
          title: 'Visit tips',
          text: 'Come at your arrival time. Please plan to stay for 2 to 3 hours.',
        },
        {
          title: 'Language help',
          text: 'Patients may bring a helper to translate, and we are planning translation-device support for more languages.',
        },
      ] as LinkCard[],
    },
    volunteer: {
      title: 'Volunteers are the heart of the clinic.',
      text: 'We need medical and non-medical helpers. We also want interpreters and event support.',
      lanes: [
        'Medical volunteers: physicians, nurses, pharmacists, pharmacy technicians, dietitians.',
        'Community volunteers: office help, fundraising, projects, and patient support.',
        'Language support: Spanish, Vietnamese, Amharic, Burmese, and more.',
      ],
      docsTitle: 'Volunteer documents',
      docs: [
        {
          title: 'Volunteer application',
          text: 'Official Volunteer Healthcare Clinic application form.',
          href: volunteerPageUrl,
          label: 'Open page',
        },
        {
          title: 'Orientation',
          text: 'Email Laura Hurst to ask about the next volunteer orientation.',
        },
      ] as LinkCard[],
      contactLine: 'Volunteer questions: email Laura Hurst or call the clinic.',
    },
    about: {
      title: 'A mission you can understand.',
      text: 'Since 1966, the clinic has helped Austin families get care when they had few other options.',
      mission:
        'Mission: improve the health of low-income and uninsured people by giving high quality care, prevention education, and support for long-term health.',
      vision:
        'Vision: help build a healthy community where all people can get care and well-being support.',
      boardTitle: 'Board of directors',
      staffTitle: 'Staff and team',
    },
    events: {
      title: 'Events and photo stories.',
      text: 'This page is ready for event pictures, volunteer moments, and clinic updates.',
      galleryTitle: 'Event photo wall',
      gallery: [
        'Back-to-school care drive',
        'Volunteer welcome night',
        'Community partner breakfast',
      ],
      updatesTitle: 'Recent highlights',
      updates: [
        'Add event photos here as your team collects them.',
        'Share short stories from health fairs and volunteer nights.',
        'Use this page for clinic updates, partner visits, and community wins.',
      ],
    },
    resources: {
      title: 'Helpful resources outside our clinic.',
      text: 'If we cannot treat a need, we want families to know where to go next.',
      mentalTitle: 'Mental health help',
      mentalText:
        'We do not provide mental health treatment. We send patients to Austin Integral Care for mental health support.',
      mentalButton: 'Go to Integral Care',
      supportCards: [
        {
          title: '24/7 mental health help',
          text: 'Integral Care says people can call 512-472-HELP (4357) for support in Travis County.',
        },
        {
          title: 'Translation support',
          text: 'Ask about interpreter help and planned translation-device support for patients who need another language.',
        },
        {
          title: 'Facebook updates',
          text: 'Follow the clinic on Facebook for quick updates and reminders.',
        },
      ] as LinkCard[],
    },
    findClinic: {
      title: 'Find a free clinic closer to you.',
      text: 'If our clinic is too far away, TXACC has a map to help patients find another free or charitable clinic in Texas.',
      steps: [
        'Open the clinic finder map.',
        'Type your city or zip code.',
        'Pick the clinic that works best for your home and needs.',
      ],
      button: 'Open TXACC clinic finder',
    },
    jobs: {
      title: 'Job openings and team roles.',
      text: 'This page gives a simple place to post open jobs and tell people how to apply.',
      openingTitle: 'Current opening on file',
      openingText:
        'The clinic job PDF on the official site lists a part-time bilingual Patient Advocate role.',
      openingButton: 'Open job PDF',
      generalTitle: 'Want to work with us later?',
      generalText:
        'Keep this page up to date with new job posts, role summaries, and email instructions.',
    },
    contact: {
      title: 'Call, email, or visit us.',
      text: 'We want it to be easy for patients, volunteers, and partners to reach the clinic.',
      phone: 'Phone: 512-459-6002',
      email: 'Email: info@volclinic.org',
      fax: 'Fax: 512-459-3002',
      parking:
        'Please park on the street so space stays open for volunteers and clinic traffic.',
      fbButton: 'Open Facebook',
    },
    donate: {
      title: 'Give help that feels close and real.',
      text: 'Your gift helps the clinic care for uninsured children and adults with limited resources.',
      reasons: [
        'Help keep care close to home.',
        'Help patients get visits, medicine, and referrals.',
        'Help volunteers and staff serve more families.',
      ],
      button: 'Donate now',
    },
  },
  es: {
    pageName: {
      home: 'Inicio',
      services: 'Servicios',
      patients: 'Pacientes',
      volunteer: 'Únete',
      about: 'Nosotros',
      events: 'Eventos',
      resources: 'Recursos',
      contact: 'Contacto',
      donate: 'Donar',
    },
    status: {
      title: 'Aviso de la clínica',
      text: 'Cerrada el lunes 16 de febrero de 2026 y del lunes 16 al viernes 20 de marzo de 2026.',
      helper: '¿Necesita ayuda? Llame al 512-459-6002.',
    },
    footer: {
      awards: 'Premios y reconocimientos',
      newsletter: 'Boletín',
      newsletterText: 'Reciba noticias simples por correo.',
      social: 'Facebook',
      rights: '@ 2024 por Volunteer Healthcare Clinic',
      address: '4215 Medical Parkway, Austin, Texas 78756',
    },
    home: {
      title: 'Atención, esperanza y pasos claros.',
      text: 'Ayudamos a niños y adultos sin seguro en el condado de Travis. Este sitio es fácil para que las familias encuentren ayuda rápido.',
      buttons: ['Ver info para pacientes', 'Dar apoyo'],
      cards: [
        'Atención amable para problemas comunes',
        'Ayuda sencilla en inglés, español y francés',
        'Enlaces claros para pacientes, voluntarios y familias',
      ],
      quickTitle: 'Empiece aquí',
      quickText: 'Elija la página que necesita hoy.',
      directionsTitle: 'Dónde estamos',
      directionsText:
        'La clínica está en Medical Parkway cerca de la calle 43. Favor de estacionarse en la calle para dejar espacio a los voluntarios.',
      partnerTitle: 'Socios que nos sostienen',
      storyTitle: 'Vida en la clínica',
      stories: [
        { title: 'Noches de atención', text: 'Espacios cálidos y simples para familias.' },
        { title: 'Trabajo voluntario', text: 'Personas ayudando juntas.' },
        { title: 'Eventos de la comunidad', text: 'Momentos que unen a Austin.' },
      ],
    },
    services: {
      title: 'Servicios para necesidades reales.',
      text: 'Nos enfocamos en necesidades médicas comunes y apoyo para la salud a largo plazo.',
      items: [
        {
          title: 'Atención aguda',
          text: 'Ayudamos con tos, dolor de cabeza, asma, diabetes, presión alta y otras enfermedades comunes.',
        },
        {
          title: 'Atención crónica',
          text: 'La noche del lunes apoya diabetes, hipertensión y otras necesidades endocrinas para pacientes inscritos.',
        },
        {
          title: 'Apoyo extra',
          text: 'Puede incluir laboratorios, imágenes, medicinas y referencias si el proveedor lo ordena.',
        },
      ],
    },
    patients: {
      title: 'Información para pacientes, fácil de leer.',
      text: 'Aquí están las reglas simples, los documentos y lo que debe traer.',
      rulesTitle: 'Quién puede venir',
      rules: [
        'Debe vivir en el condado de Travis.',
        'No debe tener seguro médico.',
        'Traiga una identificación con foto.',
        'Traiga prueba de domicilio del condado de Travis.',
        'Las visitas son solo con cita.',
      ],
      docsTitle: 'Documentos y hojas para pacientes',
      docs: [
        {
          title: 'PDF de la política de armas',
          text: 'Hoja de seguridad de la clínica en inglés y español.',
          href: noGunPolicyUrl,
          label: 'Abrir PDF',
        },
        {
          title: 'Qué traer',
          text: 'Identificación, prueba de domicilio y papeles que ayuden a explicar su problema de salud.',
        },
        {
          title: 'Consejos para la visita',
          text: 'Llegue a su hora. Planee estar en la clínica de 2 a 3 horas.',
        },
        {
          title: 'Ayuda con idiomas',
          text: 'Los pacientes pueden traer a alguien para traducir y también queremos apoyo con un dispositivo de traducción.',
        },
      ] as LinkCard[],
    },
    volunteer: {
      title: 'Los voluntarios son el corazón de la clínica.',
      text: 'Necesitamos ayuda médica y no médica. También queremos intérpretes y apoyo para eventos.',
      lanes: [
        'Voluntarios médicos: médicos, enfermeras, farmacéuticos, técnicos de farmacia y dietistas.',
        'Voluntarios comunitarios: oficina, recaudación, proyectos y apoyo al paciente.',
        'Apoyo de idiomas: español, vietnamita, amárico, birmano y más.',
      ],
      docsTitle: 'Documentos para voluntarios',
      docs: [
        {
          title: 'Solicitud de voluntario',
          text: 'Formulario oficial de Volunteer Healthcare Clinic.',
          href: volunteerPageUrl,
          label: 'Abrir página',
        },
        {
          title: 'Orientación',
          text: 'Escriba a Laura Hurst para preguntar por la próxima orientación.',
        },
      ] as LinkCard[],
      contactLine: 'Preguntas sobre voluntariado: llame a la clínica o escriba a Laura Hurst.',
    },
    about: {
      title: 'Una misión fácil de entender.',
      text: 'Desde 1966, la clínica ha ayudado a familias de Austin a recibir atención cuando tenían pocas opciones.',
      mission:
        'Misión: mejorar la salud de personas de bajos ingresos y sin seguro con atención de alta calidad, educación preventiva y apoyo para la salud a largo plazo.',
      vision:
        'Visión: ayudar a crear una comunidad sana donde todas las personas puedan recibir atención y bienestar.',
      boardTitle: 'Junta directiva',
      staffTitle: 'Personal y equipo',
    },
    events: {
      title: 'Eventos e historias con fotos.',
      text: 'Esta página está lista para fotos de eventos, momentos de voluntariado y noticias de la clínica.',
      galleryTitle: 'Muro de fotos',
      gallery: [
        'Campaña de atención escolar',
        'Noche de bienvenida para voluntarios',
        'Desayuno con socios comunitarios',
      ],
      updatesTitle: 'Noticias recientes',
      updates: [
        'Agregue aquí fotos reales de eventos.',
        'Comparta historias cortas de ferias de salud y noches de voluntariado.',
        'Use esta página para visitas de socios y logros de la comunidad.',
      ],
    },
    resources: {
      title: 'Recursos útiles fuera de nuestra clínica.',
      text: 'Si no podemos tratar una necesidad, queremos mostrar a las familias dónde buscar ayuda.',
      mentalTitle: 'Ayuda de salud mental',
      mentalText:
        'No damos tratamiento de salud mental. Enviamos a los pacientes a Austin Integral Care para apoyo de salud mental.',
      mentalButton: 'Ir a Integral Care',
      supportCards: [
        {
          title: 'Ayuda 24/7',
          text: 'Integral Care dice que las personas pueden llamar al 512-472-HELP (4357) para apoyo en el condado de Travis.',
        },
        {
          title: 'Apoyo de traducción',
          text: 'Pregunte por intérpretes y por el plan de usar un dispositivo de traducción para pacientes.',
        },
        {
          title: 'Actualizaciones en Facebook',
          text: 'Siga a la clínica en Facebook para avisos rápidos y recordatorios.',
        },
      ] as LinkCard[],
    },
    findClinic: {
      title: 'Busque una clínica gratis cerca de usted.',
      text: 'Si nuestra clínica le queda lejos, TXACC tiene un mapa para encontrar otra clínica gratis o de caridad en Texas.',
      steps: [
        'Abra el mapa de clínicas.',
        'Escriba su ciudad o código postal.',
        'Elija la clínica que quede mejor para su hogar y su necesidad.',
      ],
      button: 'Abrir buscador de TXACC',
    },
    jobs: {
      title: 'Empleos y funciones del equipo.',
      text: 'Esta página da un lugar simple para publicar vacantes y explicar cómo aplicar.',
      openingTitle: 'Vacante actual en archivo',
      openingText:
        'El PDF oficial de la clínica muestra una vacante para un puesto bilingüe de Patient Advocate de medio tiempo.',
      openingButton: 'Abrir PDF del empleo',
      generalTitle: '¿Quiere trabajar con nosotros después?',
      generalText:
        'Use esta página para poner nuevas vacantes, resúmenes del puesto e instrucciones por correo.',
    },
    contact: {
      title: 'Llame, escriba o visítenos.',
      text: 'Queremos que sea fácil para pacientes, voluntarios y socios comunicarse con la clínica.',
      phone: 'Teléfono: 512-459-6002',
      email: 'Correo: info@volclinic.org',
      fax: 'Fax: 512-459-3002',
      parking:
        'Favor de estacionarse en la calle para dejar espacio a los voluntarios y al tráfico de la clínica.',
      fbButton: 'Abrir Facebook',
    },
    donate: {
      title: 'Ayude de una forma cercana y real.',
      text: 'Su donación ayuda a la clínica a cuidar a niños y adultos sin seguro y con recursos limitados.',
      reasons: [
        'Ayude a mantener la atención cerca del hogar.',
        'Ayude a pacientes a recibir visitas, medicinas y referencias.',
        'Ayude a voluntarios y personal a servir a más familias.',
      ],
      button: 'Donar ahora',
    },
  },
  fr: {
    pageName: {
      home: 'Accueil',
      services: 'Services',
      patients: 'Patients',
      volunteer: 'Nous rejoindre',
      about: 'À propos',
      events: 'Événements',
      resources: 'Ressources',
      contact: 'Contact Us',
      donate: 'Don',
    },
    status: {
      title: 'Info clinique',
      text: 'Fermée le lundi 16 février 2026 et du lundi 16 mars au vendredi 20 mars 2026.',
      helper: 'Besoin d’aide? Appelez le 512-459-6002.',
    },
    footer: {
      awards: 'Prix et reconnaissances',
      newsletter: 'Infolettre',
      newsletterText: 'Recevez des nouvelles simples par e-mail.',
      social: 'Facebook',
      rights: '@ 2024 par Volunteer Healthcare Clinic',
      address: '4215 Medical Parkway, Austin, Texas 78756',
    },
    home: {
      title: 'Des soins, de l’espoir et des étapes claires.',
      text: 'Nous aidons les enfants et adultes sans assurance dans le comté de Travis. Le site est simple pour que les familles trouvent de l’aide vite.',
      buttons: ['Voir les infos patients', 'Faire un don'],
      cards: [
        'Des soins gentils pour des besoins courants',
        'Une aide simple en anglais, espagnol et français',
        'Des liens clairs pour patients, bénévoles et familles',
      ],
      quickTitle: 'Commencez ici',
      quickText: 'Choisissez la page utile pour aujourd’hui.',
      directionsTitle: 'Où nous sommes',
      directionsText:
        'La clinique est sur Medical Parkway près de la 43e rue. Merci de vous garer dans la rue pour laisser la place aux bénévoles.',
      partnerTitle: 'Partenaires de soutien',
      storyTitle: 'Vie de la clinique',
      stories: [
        { title: 'Soins aux patients', text: 'Des espaces chaleureux pour les familles.' },
        { title: 'Équipe bénévole', text: 'Des personnes qui aident ensemble.' },
        { title: 'Événements', text: 'Des moments qui rassemblent Austin.' },
      ],
    },
    services: {
      title: 'Des services pour de vrais besoins.',
      text: 'Nous aidons pour les besoins médicaux courants et le suivi de santé.',
      items: [
        {
          title: 'Soins rapides',
          text: 'Aide pour la toux, le mal de tête, l’asthme, le diabète, la tension et d’autres problèmes courants.',
        },
        {
          title: 'Suivi chronique',
          text: 'Le lundi soir aide pour le diabète, l’hypertension et d’autres besoins endocriniens des patients inscrits.',
        },
        {
          title: 'Aide ajoutée',
          text: 'Analyses, imagerie, médicaments et orientations peuvent être ajoutés si un soignant le demande.',
        },
      ],
    },
    patients: {
      title: 'Infos patients faciles à lire.',
      text: 'Cette page montre les règles simples, les documents et ce qu’il faut apporter.',
      rulesTitle: 'Qui peut venir',
      rules: [
        'Vous devez vivre dans le comté de Travis.',
        'Vous ne devez pas avoir d’assurance santé.',
        'Apportez une pièce d’identité avec photo.',
        'Apportez une preuve d’adresse du comté de Travis.',
        'Les visites sont sur rendez-vous seulement.',
      ],
      docsTitle: 'Documents et fiches patients',
      docs: [
        {
          title: 'PDF politique sans arme',
          text: 'Fiche de sécurité en anglais et en espagnol.',
          href: noGunPolicyUrl,
          label: 'Ouvrir le PDF',
        },
        {
          title: 'Ce qu’il faut apporter',
          text: 'Une pièce d’identité, une preuve d’adresse et des papiers utiles pour expliquer votre besoin de santé.',
        },
        {
          title: 'Conseils pour la visite',
          text: 'Arrivez à votre heure. Prévoyez de rester 2 à 3 heures.',
        },
        {
          title: 'Aide langue',
          text: 'Les patients peuvent venir avec une personne qui traduit, et nous voulons aussi un appareil de traduction.',
        },
      ] as LinkCard[],
    },
    volunteer: {
      title: 'Les bénévoles sont le cœur de la clinique.',
      text: 'Nous avons besoin d’aide médicale, d’aide générale, d’interprètes et d’aide pour les événements.',
      lanes: [
        'Bénévoles médicaux: médecins, infirmières, pharmaciens, techniciens en pharmacie, diététiciens.',
        'Bénévoles de soutien: bureau, collecte de fonds, projets et aide aux patients.',
        'Aide linguistique: espagnol, vietnamien, amharique, birman et plus.',
      ],
      docsTitle: 'Documents bénévoles',
      docs: [
        {
          title: 'Formulaire bénévole',
          text: 'Formulaire officiel de Volunteer Healthcare Clinic.',
          href: volunteerPageUrl,
          label: 'Ouvrir la page',
        },
        {
          title: 'Orientation',
          text: 'Écrivez à Laura Hurst pour la prochaine séance d’orientation.',
        },
      ] as LinkCard[],
      contactLine: 'Questions bénévolat: appelez la clinique ou contactez Laura Hurst.',
    },
    about: {
      title: 'Une mission simple à comprendre.',
      text: 'Depuis 1966, la clinique aide les familles d’Austin à recevoir des soins quand elles ont peu d’autres choix.',
      mission:
        'Mission: améliorer la santé des personnes à faible revenu et non assurées avec des soins de qualité, de la prévention et un soutien durable.',
      vision:
        'Vision: aider à créer une communauté saine où tout le monde peut recevoir des soins et du soutien.',
      boardTitle: 'Conseil d’administration',
      staffTitle: 'Équipe',
    },
    events: {
      title: 'Événements et histoires en images.',
      text: 'Cette page est prête pour les photos, les moments de bénévolat et les nouvelles de la clinique.',
      galleryTitle: 'Mur photo',
      gallery: [
        'Journée de rentrée',
        'Soirée d’accueil des bénévoles',
        'Petit-déjeuner partenaires',
      ],
      updatesTitle: 'Nouvelles récentes',
      updates: [
        'Ajoutez ici de vraies photos des événements.',
        'Partagez de petites histoires des foires de santé et des soirées bénévoles.',
        'Utilisez cette page pour les visites des partenaires et les bonnes nouvelles.',
      ],
    },
    resources: {
      title: 'Ressources utiles hors de la clinique.',
      text: 'Si nous ne pouvons pas traiter un besoin, nous voulons montrer aux familles où aller ensuite.',
      mentalTitle: 'Aide en santé mentale',
      mentalText:
        'Nous ne proposons pas de traitement en santé mentale. Nous orientons les patients vers Austin Integral Care.',
      mentalButton: 'Aller à Integral Care',
      supportCards: [
        {
          title: 'Aide 24/7',
          text: 'Integral Care dit que les habitants du comté de Travis peuvent appeler le 512-472-HELP (4357).',
        },
        {
          title: 'Traduction',
          text: 'Demandez de l’aide d’interprétation et notre projet d’appareil de traduction pour les patients.',
        },
        {
          title: 'Nouvelles Facebook',
          text: 'Suivez la clinique sur Facebook pour les rappels et les petites nouvelles.',
        },
      ] as LinkCard[],
    },
    findClinic: {
      title: 'Trouvez une clinique gratuite plus proche.',
      text: 'Si notre clinique est trop loin, TXACC a une carte pour trouver une autre clinique gratuite ou caritative au Texas.',
      steps: [
        'Ouvrez la carte des cliniques.',
        'Tapez votre ville ou code postal.',
        'Choisissez la clinique la plus proche et la plus utile.',
      ],
      button: 'Ouvrir la carte TXACC',
    },
    jobs: {
      title: 'Emplois et rôles.',
      text: 'Cette page donne un endroit simple pour montrer les postes ouverts et expliquer comment postuler.',
      openingTitle: 'Offre actuelle',
      openingText:
        'Le PDF officiel de la clinique montre un poste bilingue à temps partiel de Patient Advocate.',
      openingButton: 'Ouvrir le PDF',
      generalTitle: 'Travailler avec nous plus tard',
      generalText:
        'Gardez cette page à jour avec les nouvelles offres, les résumés de poste et les consignes de candidature.',
    },
    contact: {
      title: 'Appelez, écrivez ou venez nous voir.',
      text: 'Nous voulons que les patients, bénévoles et partenaires puissent joindre la clinique facilement.',
      phone: 'Téléphone: 512-459-6002',
      email: 'E-mail: info@volclinic.org',
      fax: 'Fax: 512-459-3002',
      parking:
        'Merci de vous garer dans la rue pour garder les places libres pour les bénévoles et la clinique.',
      fbButton: 'Ouvrir Facebook',
    },
    donate: {
      title: 'Donnez une aide proche et concrète.',
      text: 'Votre don aide la clinique à soigner des enfants et adultes sans assurance et avec peu de ressources.',
      reasons: [
        'Aidez à garder les soins près de la maison.',
        'Aidez les patients à recevoir visites, médicaments et orientations.',
        'Aidez l’équipe à servir plus de familles.',
      ],
      button: 'Faire un don',
    },
  },
} as const

function pageHref(page: PageId) {
  return page === 'home' ? '#/' : `#/${page}`
}

function getPageFromHash(hash: string): PageId {
  const cleaned = hash.replace(/^#\/?/, '')
  if (cleaned === 'jobs') {
    return 'volunteer'
  }
  if (cleaned === 'find-clinic') {
    return 'resources'
  }
  const page = navItems.find((item) => item === cleaned)
  return page ?? 'home'
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function SectionTitle({
  icon,
  eyebrow,
  title,
  text,
}: {
  icon: string
  eyebrow: string
  title: string
  text: string
}) {
  return (
    <div className="section-title">
      <span className="icon-pill">{icon}</span>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  )
}

function LinkCardGrid({ cards }: { cards: LinkCard[] }) {
  return (
    <div className="link-card-grid">
      {cards.map((card) => (
        <article key={card.title} className="link-card">
          <h3>{card.title}</h3>
          <p>{card.text}</p>
          {card.href && card.label ? (
            <a href={card.href} target="_blank" rel="noreferrer">
              {card.label}
            </a>
          ) : null}
        </article>
      ))}
    </div>
  )
}

function TeamGrid({ title, people }: { title: string; people: TeamMember[] }) {
  return (
    <section className="team-section">
      <h3>{title}</h3>
      <div className="team-grid">
        {people.map((person) => (
          <article key={person.name} className="team-card">
            <div className="avatar-badge">{getInitials(person.name)}</div>
            <h4>{person.name}</h4>
            <p>{person.role}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function HomePage({ lang }: { lang: Language }) {
  return (
    <>
      <section className="home-photo-hero">
        <div className="home-photo-copy">
          <p className="eyebrow">Home</p>
          <h1>Care close to home.</h1>
          <p>
            The Volunteer Healthcare Clinic (VHC) believes access to quality
            medical care is the foundation of a healthy and thriving community.
          </p>
          <div className="hero-actions">
            <a href="https://secure.mailhippo.com/portal/FillPubWebForm.aspx?token=ug7UAQibO9HYp1ClL3ZHoaJTOTcqYoibYk9llVr2XtI%3D" target="_blank" rel="noreferrer">
              Patient Registration
            </a>
            <a className="secondary" href={pageHref('donate')}>
              Donate
            </a>
          </div>
        </div>
        <div className="home-photo-main">
          <img
            src="https://www.volclinic.org/uploads/6/1/5/9/61595609/background-images/520128390.jpg"
            alt="Volunteer Healthcare Clinic"
          />
        </div>
      </section>

      <section className="home-info-grid">
        <div className="panel hours-panel">
          <SectionTitle
            icon="Hrs"
            eyebrow="Clinic Hours"
            title="Evening clinic schedule"
            text="Most patient visits happen in the evening."
          />
          <div className="hours-list">
            <div><strong>Wednesday</strong><span>Closed</span></div>
            <div><strong>Thursday</strong><span>5-9 PM</span></div>
            <div><strong>Friday</strong><span>Closed</span></div>
            <div><strong>Saturday</strong><span>Closed</span></div>
            <div><strong>Sunday</strong><span>Closed</span></div>
            <div><strong>Monday</strong><span>5-9 PM</span></div>
            <div><strong>Tuesday</strong><span>5-9 PM</span></div>
          </div>
        </div>

        <div className="panel location-panel">
          <SectionTitle
            icon="Map"
            eyebrow="Clinic Location"
            title="4215 Medical Parkway, Austin, Texas 78756"
            text="The clinic is on Medical Parkway near 43rd Street. Please park on the street so volunteer spots stay open."
          />
          <div className="map-frame">
            <iframe
              title="Volunteer Healthcare Clinic map"
              src="https://www.google.com/maps?q=4215%20Medical%20Parkway%2C%20Austin%2C%20TX%2078756&z=15&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="home-stats-grid">
        <article className="stat-card">
          <h3>5,000+</h3>
          <p>medical visits each year</p>
        </article>
        <article className="stat-card">
          <h3>2,000</h3>
          <p>people helped each year</p>
        </article>
        <article className="stat-card">
          <h3>1966</h3>
          <p>year the clinic began serving Austin</p>
        </article>
      </section>

      <section className="panel partner-panel compact-partners">
        <SectionTitle
          icon="Aid"
          eyebrow="Community Support"
          title="Partners who help this work"
          text="The clinic grows through local medical and community support."
        />
        <div className="partner-grid">
          {partners.map((partner) => (
            <a
              key={partner.name}
              className="partner-card"
              href={partner.href}
              target="_blank"
              rel="noreferrer"
            >
              <img src={partner.image} alt={partner.name} />
            </a>
          ))}
        </div>
      </section>
    </>
  )
}

function ServicesPage({ lang }: { lang: Language }) {
  const [openSections, setOpenSections] = useState<number[]>([])
  const exactServiceText = [
    {
      title: 'Basic Medical Care (Walk-In Clinics) When: Daytime and Tuesday/Thursday Evenings',
      body: [
        'If you are sick, our Tuesday and Thursday clinics can help! You can see a nurse or a doctor, and if needed, we can help with lab tests, X-rays, and medicine.',
        '',
        'We CAN treat common sicknesses like:',
      ],
      bullets: [
        'Colds, coughs, fevers, and allergies.',
        'Stomach pain, throwing up, and diarrhea.',
        'Ear and eye infections.',
        'Minor cuts, scrapes, rashes, and itching.',
        'Joint pain (arthritis) and back pain.',
        'High blood pressure and Type 2 diabetes.',
        'Mild worry (anxiety) and sadness (depression).',
        'Urinary tract infections (UTIs).',
        'Breast lumps or pain.',
        'We can also write simple return-to-work notes if we treat you for a sickness.',
      ],
    },
    {
      title: 'Long-Term Care (By Appointment Only) When: Monday Evenings',
      body: [
        'Our Monday clinic is only for people who need long-term care for illnesses like Type 2 diabetes and high blood pressure.',
      ],
      bullets: [
        'Along with seeing a doctor or nurse, patients get help with healthy eating, eye checks, foot exams for diabetes, lab tests, and medicine.',
        'How to join: You must first come to a Tuesday or Thursday walk-in clinic. If you need long-term care, our doctors will sign you up for a Monday appointment',
      ],
    },
    {
      title: 'Specialty Care',
      body: [
        'Dermatology We hold a Dermatology clinic on the 3rd Wednesday of every month starting at 6:00 PM. If you are already a patient with us, you can call to make an appointment or get on the waitlist.',
        'Other Specialists We are lucky to have other specialists visit us during our evening clinics. These include Cardiology (heart care), Endocrinology (diabetes and hormone care), Gastroenterology (stomach and digestion care), and Rheumatology (joint and bone care).',
        'To find out when these specialists are here, or to make an appointment, please call us at 512-459-6002 and press 0.',
        'Important Note on Specialists: We offer limited referrals to specialists. Sometimes, we may need to send you to a specialist outside of our clinic. If this happens, you must live in Travis County and apply for MAP coverage.',
      ],
    },
    {
      title: 'Mental and Behavioral Health',
      body: [
        'We can help patients who are dealing with mild depression or mild anxiety. You can get an appointment for Psychiatry services and medicine.',
        'To get an appointment for mental health, you first need to be seen at our Tuesday or Thursday evening walk-in clinics.',
        'What we CANNOT do:',
      ],
      bullets: [
        'We cannot write prescriptions for strong, habit-forming medicines (controlled substances).',
        'We cannot treat serious mental health concerns like bipolar disorder, schizophrenia, or psychosis.',
      ],
      afterBullets: ['We cannot treat drug or alcohol addiction.'],
    },
    {
      title: 'Nutrition Counseling',
      body: [
        'If you are already a patient with us and have a higher weight, high blood pressure, or are at risk for Type 2 diabetes, you can get an appointment with a dietitian.',
        'During these one-on-one visits, our dietitian will:',
      ],
      bullets: [
        'Teach you healthy eating habits.',
        'Give you ideas for your diet.',
        'Set up follow-up appointments to check on how you are doing.',
      ],
    },
    {
      title: 'Pediatric Care',
      body: [
        'If your child is sick, they can see a doctor during our Tuesday and Thursday evening clinics all year.',
        `In the summer, we have special clinics just for kids. Every August, we host a "Healthy Kids Day" on a Saturday morning to help kids get ready for school. During this event, we offer regular check-ups (well-child exams) and sports physicals. Parents of our child patients can call us starting in July to get on the waitlist.`,
      ],
    },
    {
      title: 'Physical Therapy',
      body: [
        'We offer basic Physical Therapy to help with pain using a stretching and exercise program instead of medicine.',
        'To use these services, you must already be a patient at our clinic. You will need to see a doctor at our Tuesday or Thursday evening clinic first so they can refer you to the Physical Therapy program. Appointments usually happen every week on Wednesday afternoons.',
        'What we CANNOT do:',
      ],
      bullets: [
        'While we can help with joint pain (arthritis) or short-term back pain, we cannot treat long-term pain (chronic pain management).',
      ],
    },
    {
      title: "Women's Health",
      body: [
        `The Clinic conducts two 'Well Woman' Clinics during the spring and fall each year during which pap smears, breast exams, mammogram screenings and common screenings are available.`,
        'These well woman exams are for healthy women specifically and these services are only available during these special clinics twice a year.',
      ],
    },
    {
      title: 'Social Service Referrals',
      body: [
        'Additional resources for other health and human services and/or community/ basic needs organizations are available as needed.',
        'VHC staff and volunteers are able to answer any questions and there is a community resource bulletin board in the waiting room.',
        'Patients can also call 211 for a resource listing line of services available in Central Texas.',
      ],
    },
    {
      title: 'Services Not Provided',
      body: [
        'The Clinic provides a wide range of services and takes care of many common health problems, however we do not have the ability to care for all health needs.',
        'VHC is not an emergency room or urgent care facility and we are not able to care for seriously ill patients.',
        'The following is a general list of services we cannot accommodate at the Clinic.',
      ],
      bullets: [
        'Emergency Care',
        'Routine Physicals',
        'Immunizations (limited to flu vaccines for established patients, call us for more information)',
        'Gynecological or Obstetrical Care (including pap smears)',
        'Pregnancy Testing or Prenatal Care',
        'Medical Care for pregnant women',
        'Severe Mental Health illness including: schizophrenia, bi-polar disorder, ADD-ADHD, personality disorders, severe depression or severe anxiety',
        'STD testing or STD treatment',
        'Dental Care',
        'Cancer screening or treatment',
        'Surgery',
      ],
      afterBullets: [
        'If we cannot help you here, we will try to direct you to other clinics or facilities who have the resources for your medical needs.',
      ],
    },
    {
      title: 'Pharmacy Services',
      body: [
        'Pharmacy and Lab',
        'The Clinic has a state-licensed, Class A Pharmacy that carries common generic medications that are prescribed to established VHC patients by VHC providers.',
        'The Clinic does not carry, dispense or write prescriptions for controlled medications.',
        'The Clinic also has an on-site laboratory to perform routine testing that is ordered by VHC providers.',
        'Lab draws are done on-site at VHC and sent over to Ascension/Seton Hospital to be processed.',
        'All lab reports will be reviewed by a VHC provider before they are added to a patient’s medical chart.',
        'Please note that patients will only be called about lab results if there is some type of follow up required and/or they need to return to the Clinic.',
        'Patients wanting to find out lab results can call VHC at 512-459-6002, press 0 and set up a Nurse Callback, which can take a couple of days after the results are reviewed.',
        '',
        'Pharmacy Hours',
      ],
      bullets: [
        'Daytime: Tuesday, Wednesday, Friday from 12:00pm-3:00pm',
        'Evening: Tuesday & Thursday 7:00pm-8:30pm',
        'Prescriptions must be dispensed by a Pharmacist so you can only pick up medication during pharmacy hours.',
        'VHC staff attempts to call patients when their medication is ready, however we cannot always reach everyone. If you did not receive a call, you can call us during pharmacy hours to check if your prescription is ready.',
      ],
      afterBullets: [
        'Medication Refills',
        'If your prescriptions has refills noted on the bottle, you can call and request a refill.',
        'You will need to have the prescription bottle handy so you can provide the medication name, strength & quantity.',
        'If there are no refills noted on bottle, you will need to schedule an appointment.',
        'Refills should be requested at least one week before your medication runs out.',
        'Please call 512-459-6002 and Press 0 to request a refill during normal business hours: Mon - Fri 10am-4pm',
        'Please do NOT call during our evening clinics (Mon, Tues, Thurs from 6pm - 10pm) as staff may be too busy to answer the phone.',
      ],
    },
  ] as const

  function toggleSection(index: number) {
    setOpenSections((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    )
  }

  return (
    <section className="services-page">
      <section className="services-info-boxes">
        <article className="service-info-box">
          <div className="service-copy-head">
            <h2>Who can we help?</h2>
          </div>
          <p>To get care at Volunteer Healthcare Clinic, you must:</p>
          <ul className="service-bullet-list">
            <li>Have no health insurance (this means no MAP, Medicaid/CHIP, Medicare, or private insurance).</li>
            <li>Meet our low-income rules.</li>
            <li>Live in Travis County.</li>
            <li>Show a photo ID (like a driver's license or consulate card).</li>
            <li>Show proof of where you live (like a utility bill or lease agreement).</li>
            <li>We ask for a $10 donation if you are able to give</li>
          </ul>
        </article>

        <article className="service-info-box">
          <div className="service-copy-head">
            <h2>Acute vs. Chronic</h2>
          </div>
          <div className="service-info-copy">
            <div className="service-info-split">
              <h3>Acute pain</h3>
              <p>
                Acute pain is short-term pain. It often starts suddenly, like
                after an injury or illness, and gets better as your body heals.
                It usually lasts less than 3 months.
              </p>
            </div>
            <div className="service-info-split">
              <h3>Chronic pain</h3>
              <p>
                Chronic pain is long-term pain. It lasts 3 months or longer,
                even after the body has had time to heal. It may come and go or
                be there all the time.
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="service-copy-shell">
        {exactServiceText.map((section, index) => (
          <article
            key={`${section.title}-${index}`}
            className={`service-copy-block ${openSections.includes(index) ? 'open' : ''}`}
          >
            <button
              type="button"
              className="service-accordion-trigger"
              onClick={() => toggleSection(index)}
              aria-expanded={openSections.includes(index)}
            >
              <div className="service-copy-head">
                <h2>{section.title}</h2>
              </div>
              <span className="service-accordion-icon">
                {openSections.includes(index) ? '−' : '+'}
              </span>
            </button>

            <div
              className={`service-accordion-panel ${openSections.includes(index) ? 'open' : ''}`}
            >
              {section.body.map((paragraph, paragraphIndex) =>
                paragraph ? (
                  <p key={`${section.title}-p-${paragraphIndex}`}>{paragraph}</p>
                ) : (
                  <div
                    key={`${section.title}-space-${paragraphIndex}`}
                    className="service-spacer"
                  />
                ),
              )}

              {'bullets' in section && section.bullets ? (
                <ul className="service-bullet-list">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}

              {'afterBullets' in section && section.afterBullets
                ? section.afterBullets.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                : null}
            </div>
          </article>
        ))}
      </section>
    </section>
  )
}

function PatientsPage({ lang }: { lang: Language }) {
  const c = copy[lang]

  return (
    <section className="patients-page">
      <div className="patients-hero">
        <div>
          <p className="eyebrow">{c.pageName.patients}</p>
          <h1>{c.patients.title}</h1>
          <p>{c.patients.text}</p>
        </div>
        <div className="checklist-card">
          <h3>{c.patients.rulesTitle}</h3>
          <ul>
            {c.patients.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>

      <section className="panel">
        <SectionTitle
          icon="Docs"
          eyebrow={c.patients.docsTitle}
          title={c.patients.docsTitle}
          text={copy[lang].status.helper}
        />
        <LinkCardGrid cards={c.patients.docs} />
        <div className="document-placeholder-grid">
          <article className="doc-placeholder">Leave space for new patient packet PDF</article>
          <article className="doc-placeholder">Leave space for consent forms</article>
          <article className="doc-placeholder">Leave space for specialty handouts</article>
        </div>
      </section>
    </section>
  )
}

function VolunteerPage({ lang }: { lang: Language }) {
  return (
    <section className="volunteer-page">
      <div className="volunteer-feature">
        <div className="volunteer-copy">
          <p className="eyebrow">Join Us</p>
          <h1>Help the clinic as a volunteer or team member.</h1>
          <p>
            Join us if you want to volunteer, support events, interpret for
            patients, or apply for a paid opening.
          </p>
          <div className="join-steps">
            <div><strong>Step 1</strong><span>Fill out Volunteer Application Form</span></div>
            <div><strong>Step 2</strong><span>Email or fax the completed application to Laura Hurst, Volunteer Director. Email: lhurst@volclinic.org Fax number: 512-646-2693</span></div>
            <div><strong>Step 3</strong><span>Register for an upcoming volunteer orientation session by sending an email to: lhurst@volclinic.org</span></div>
          </div>
          <p className="small-note">
            Questions about volunteering? Contact Laura Hurst through the
            clinic.
          </p>
        </div>
        <div className="volunteer-photo-card">
          <div className="image-placeholder">Volunteer photo placeholder</div>
        </div>
      </div>

      <section className="panel">
        <SectionTitle
          icon="Med"
          eyebrow="Volunteer Roles"
          title="Medical"
          text="We welcome licensed professionals and care support volunteers."
        />
        <ul className="service-bullet-list">
          <li>Physicians (especially Family Practice and Podiatrists)</li>
          <li>Advance Practice Nurses</li>
          <li>Nurses</li>
          <li>Pharmacists</li>
          <li>Pharmacy Technicians (must be registered with TSBP</li>
          <li>Dietitians and Nutritionist</li>
        </ul>
      </section>

      <section className="panel">
        <SectionTitle
          icon="Help"
          eyebrow="Volunteer Roles"
          title="Non-Medical"
          text="Language help, office help, and community support matter too."
        />
        <ul className="service-bullet-list">
          <li>Spanish Interpreters/Translators</li>
          <li>Vietnamese Interpreters/Translators</li>
          <li>Amharic Interpreters/Translators</li>
          <li>Burmese Interpreters/Translators</li>
          <li>General Office Support (daytime and evening)</li>
          <li>Fundraising/PR/Special Projects</li>
        </ul>
      </section>

      <section className="panel join-links-panel">
        <SectionTitle
          icon="PDF"
          eyebrow="Volunteer Form"
          title="Start here"
          text="Use the real Volunteer Healthcare Clinic volunteer registration form."
        />
        <LinkCardGrid
          cards={[
            {
              title: 'Volunteer registration form',
              text: 'Official Volunteer Healthcare Clinic volunteer application PDF.',
              href: 'https://www.volclinic.org/uploads/6/1/5/9/61595609/this_one_volunteer_application.pdf',
              label: 'Open PDF',
            },
            {
              title: 'Current paid opening',
              text: 'Part-time bilingual Patient Advocate job posting. Reports to the Executive Director. If interested, send a cover letter and resume to mroe@volclinic.org.',
              href: jobsPdfUrl,
              label: 'Open job PDF',
            },
          ]}
        />
      </section>
    </section>
  )
}

function AboutPage({ lang }: { lang: Language }) {
  const c = copy[lang]

  return (
    <section className="about-page">
      <div className="about-hero">
        <div className="about-intro-card">
          <p className="eyebrow">{c.pageName.about}</p>
          <h1>{c.about.title}</h1>
          <p>{c.about.text}</p>
          <p>{c.about.mission}</p>
          <p>{c.about.vision}</p>
        </div>
        <div className="about-logo-card">
          <div className="image-placeholder">Clinic photo placeholder</div>
        </div>
      </div>

      <section className="timeline-panel">
        <h3>Clinic history</h3>
        <div className="timeline-grid">
          <article>
            <strong>1966</strong>
            <p>The clinic began serving working poor families in Austin who needed quality medical care.</p>
          </article>
          <article>
            <strong>Growth</strong>
            <p>Over time, the clinic grew through volunteers, community partners, and evening programs for acute and chronic care.</p>
          </article>
          <article>
            <strong>Today</strong>
            <p>The clinic now supports thousands of visits each year for uninsured patients in Travis County and continues building long-term community support.</p>
          </article>
        </div>
      </section>

      <TeamGrid title={c.about.boardTitle} people={boardMembers} />
      <TeamGrid title={c.about.staffTitle} people={staffMembers} />
    </section>
  )
}

function EventsPage({ lang }: { lang: Language }) {
  const c = copy[lang]

  return (
    <section className="events-page">
      <div className="events-header">
        <p className="eyebrow">{c.pageName.events}</p>
        <h1>{c.events.title}</h1>
        <p>{c.events.text}</p>
      </div>

      <div className="event-photo-wall">
        {c.events.gallery.map((item, index) => (
          <article key={item} className={`event-photo event-photo-${index + 1}`}>
            <span>{item}</span>
          </article>
        ))}
      </div>

      <section className="panel news-style-panel">
        <SectionTitle
          icon="News"
          eyebrow={c.events.updatesTitle}
          title={c.events.updatesTitle}
          text={c.events.text}
        />
        <div className="update-list">
          {c.events.updates.map((item) => (
            <article key={item} className="update-card">
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}

function ResourcesPage({ lang }: { lang: Language }) {
  return (
    <section className="resources-page">
      <div className="resource-hero">
        <div>
          <p className="eyebrow">Resources</p>
          <h1>More help beyond our clinic.</h1>
          <p>
            Use this page to find urgent help, food help, mental health
            support, family safety support, and other clinics nearby.
          </p>
        </div>
        <article className="mental-health-card">
          <span className="icon-pill">MH</span>
          <h3>Mental health help</h3>
          <p>
            We do not provide mental health treatment. We send patients to
            Austin Integral Care for mental health support.
          </p>
          <a href={integralCareUrl} target="_blank" rel="noreferrer">
            Go to Integral Care
          </a>
        </article>
      </div>

      <LinkCardGrid
        cards={[
          {
            title: 'Find another clinic',
            text: 'Use the TXACC clinic map if another free clinic is closer to your home.',
            href: txaccFindClinicUrl,
            label: 'Open clinic finder',
          },
          {
            title: 'Domestic abuse help',
            text: 'If you need help now, contact the National Domestic Violence Hotline.',
            href: 'https://www.thehotline.org/',
            label: 'Get help',
          },
          {
            title: 'SNAP benefits',
            text: 'Apply for food benefits through Your Texas Benefits.',
            href: 'https://www.yourtexasbenefits.com/',
            label: 'Open SNAP help',
          },
          {
            title: 'Nutrition and food assistance',
            text: 'Find food support and healthy food resources through Central Texas Food Bank.',
            href: 'https://www.centraltexasfoodbank.org/',
            label: 'Find food help',
          },
          {
            title: 'Emergency help',
            text: 'For a medical emergency call 911. For suicide and crisis support call or text 988.',
          },
          {
            title: 'Facebook updates',
            text: 'Follow the clinic on Facebook for quick updates and reminders.',
            href: facebookUrl,
            label: 'Open Facebook',
          },
        ]}
      />
    </section>
  )
}

function ContactPage({ lang }: { lang: Language }) {
  const c = copy[lang]

  return (
    <section className="contact-page">
      <div className="contact-grid">
        <article className="contact-panel">
          <p className="eyebrow">{c.pageName.contact}</p>
          <h1>{c.contact.title}</h1>
          <p>{c.contact.text}</p>
          <ul className="contact-list">
            <li>{c.contact.phone}</li>
            <li>{c.contact.email}</li>
            <li>{c.contact.fax}</li>
            <li>{copy[lang].footer.address}</li>
          </ul>
          <p>{c.contact.parking}</p>
          <a href={facebookUrl} target="_blank" rel="noreferrer">
            {c.contact.fbButton}
          </a>
        </article>

        <div className="map-frame">
          <iframe
            title="Volunteer Healthcare Clinic contact map"
            src="https://www.google.com/maps?q=4215%20Medical%20Parkway%2C%20Austin%2C%20TX%2078756&z=15&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}

function DonatePage({ lang }: { lang: Language }) {
  return (
    <section className="donate-page">
      <div className="donate-panel">
        <p className="eyebrow">Donate</p>
        <h1>Support care that stays free for patients.</h1>
        <p>
          Since 1966, the Volunteer Healthcare Clinic has been an excellent
          source of quality health care for the working poor in Austin.
        </p>
        <p>
          As our name suggests, we carry out our mission almost exclusively
          through the collective service of over 400 dedicated volunteers and a
          network of generous community partners and supporters.
        </p>
        <p>
          This volunteer-based approach allows us to provide high-quality care
          to the neediest member of our community for a fraction of the cost of
          other clinics and providers - and it&apos;s free to our clients.
        </p>
        <p>
          While the Volunteer Healthcare Clinic is &apos;free&apos; to those who need
          our services, the cost associated with operating the Clinic is very
          real. It is the collective and invaluable support of our funders,
          volunteers and community supporters that make the Clinic services
          possible.
        </p>
        <div className="donate-reasons">
          <article className="donate-reason">
            <h3>Donate via Network for Good</h3>
            <p>Make a direct donation to support patient care and clinic operations.</p>
            <a
              className="donate-button"
              href="https://volunteer-healthcare-clinic.networkforgood.com/projects/75788-general-giving-page"
              target="_blank"
              rel="noreferrer"
            >
              Give now
            </a>
          </article>
          <article className="donate-reason">
            <h3>Donate to the VHC Endowment Fund</h3>
            <p>
              The endowment fund helps secure a sustainable future for the next
              50 years and beyond. It is managed by Austin Community Foundation.
            </p>
            <a
              className="donate-button"
              href="https://austincf.fcsuite.com/erp/donate/create/fund?funit_id=1430"
              target="_blank"
              rel="noreferrer"
            >
              Support the endowment
            </a>
          </article>
          <article className="donate-reason">
            <h3>Shop and give</h3>
            <p>
              Giving Assistant can support Volunteer Healthcare Clinic while you
              shop online.
            </p>
            <a
              className="donate-button"
              href="https://givingassistant.org/charity/volunteer-healthcare-clinic-inc"
              target="_blank"
              rel="noreferrer"
            >
              Open Giving Assistant
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}

function Footer({ lang }: { lang: Language }) {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src={clinicFooterLogo} alt="Volunteer Healthcare Clinic logo" />
        <p>4215 Medical Parkway, Austin, Texas 78756</p>
      </div>

      <div className="footer-social">
        <h3>Facebook</h3>
        <a href={facebookUrl} target="_blank" rel="noreferrer">
          Volunteer Healthcare Clinic Facebook
        </a>
      </div>

      <div className="award-strip">
        <h3>Awards and recognition</h3>
        <div className="award-cards">
          <div className="award-card">
            <img src={nafcSeal} alt="NAFC Standards Seal Gold 2025" />
            <p>NAFC Gold Seal 2025</p>
          </div>
          <div className="award-card">
            <img src={txaccSeal} alt="TXACC Gold Seal 2025" />
            <p>TXACC Gold Seal 2025</p>
          </div>
        </div>
      </div>

      <p className="footer-rights">@ 2026 by Volunteer Healthcare Clinic</p>
    </footer>
  )
}

function App() {
  const [page, setPage] = useState<PageId>(() => getPageFromHash(window.location.hash))
  const [lang, setLang] = useState<Language>('en')

  useEffect(() => {
    const onHashChange = () => {
      setPage(getPageFromHash(window.location.hash))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.title = `${copy[lang].pageName[page]} | Volunteer Healthcare Clinic`
  }, [lang, page])

  return (
    <div className="site-shell">
      <div className="status-banner">
        <div>
          <strong>{copy[lang].status.title}</strong>
          <span>{copy[lang].status.text}</span>
        </div>
        <span>{copy[lang].status.helper}</span>
      </div>

      <header className="topbar">
        <a className="brand" href={pageHref('home')} aria-label="Volunteer Healthcare Clinic home">
          <img src={clinicLogo} alt="Volunteer Healthcare Clinic" />
        </a>

        <div className="toolbar">
          <div className="lang-toggle" aria-label={languageLabel[lang]}>
            <span>{languageLabel[lang]}</span>
            <div className="lang-buttons">
              {(['en', 'es', 'fr'] as Language[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={lang === option ? 'active' : undefined}
                  onClick={() => setLang(option)}
                >
                  {languageNames[option]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <nav className="primary-nav" aria-label="Primary">
        {navItems.map((item) => (
          <a
            key={item}
            className={page === item ? 'active' : undefined}
            href={pageHref(item)}
          >
            <span>{copy[lang].pageName[item]}</span>
          </a>
        ))}
      </nav>

      <main>
        {page === 'home' && <HomePage lang={lang} />}
        {page === 'services' && <ServicesPage lang={lang} />}
        {page === 'patients' && <PatientsPage lang={lang} />}
        {page === 'volunteer' && <VolunteerPage lang={lang} />}
        {page === 'about' && <AboutPage lang={lang} />}
        {page === 'events' && <EventsPage lang={lang} />}
        {page === 'resources' && <ResourcesPage lang={lang} />}
        {page === 'find-clinic' && <FindClinicPage lang={lang} />}
        {page === 'contact' && <ContactPage lang={lang} />}
        {page === 'donate' && <DonatePage lang={lang} />}
      </main>

      <Footer lang={lang} />
    </div>
  )
}

export default App
