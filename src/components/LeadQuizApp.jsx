// LeadQuizApp.jsx
import React, { useState, useEffect } from "react";
import { insertLead, testConnection } from "../lib/supabase";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// --- Translations for questions/options ---
const translations = {
  en: {
    langName: "English",
    subtitle: "💧 Discover your path to wellness and destiny, the natural way.",
    quotes: {
      mission: '🔥 "Turn your passion for natural living into a powerful mission."',
      tagline: '🌸 "Empowered by Nature. Designed for You."'
    },
    questions: {
      nameEmail: "What's your name & best email address?",
      phone: "What's your mobile number?",
      ageGroup: "What's your age group?",
      interest: "Are you more interested in 🌿 wellness or 💼 business?",
      language: "Which language do you prefer?",
      goals: "What would you like to improve in your life?",
      experience: "Have you used essential oils before?",
      time: "How many hours per week can you dedicate to this?",
      motivation: "Why are you interested in this opportunity?",
      connect: "How would you like to connect? (Select one or more)",
    },
    options: {
      ageGroup: [
        "Baby Boomers (1946-1964)",
        "Generation X (1965-1980)", 
        "Millennials (1981-1996)",
        "Generation Z (1997-2012)",
        "Generation Alpha (2013-Present)"
      ],
      interest: ["Wellness", "Business"],
      experience: ["No experience", "Some experience", "Experienced user"],
      connect: [
        "Schedule a Zoom meeting",
        "Join Telegram channel",
        "Join Facebook group",
        "Chat via Messenger",
        "Subscribe to YouTube channel",
      ],
    },
    buttons: {
      next: "Next",
      submit: "Submit",
      back: "Back",
    },
    placeholders: {
      name: "Enter your name",
      email: "Enter your email",
      phone: "Enter your mobile number",
      goals: "e.g. health, energy, confidence, financial freedom...",
      time: "Hours per week",
      motivation: "Share your motivation and goals...",
      selectGeneration: "-- Select your generation --",
      selectPath: "-- Select your path --",
      selectExperience: "-- Select your experience level --",
    },
  },

  de: {
    langName: "Deutsch",
    subtitle: "💧 Entdecke deinen Weg zum Wohlbefinden und Deiner Bestimmung auf natürliche Weise.",
    quotes: {
      mission: '🔥 "Verwandle deine Leidenschaft für natürliches Leben in eine kraftvolle Mission."',
      tagline: '🌸 "Empowered by Nature. Designed for You."'
    },
    questions: {
      nameEmail: "Wie heißt du und was ist deine beste E-Mail-Adresse?",
      phone: "Was ist deine Mobilnummer?",
      ageGroup: "Was ist deine Altersgruppe?",
      interest: "Bist du eher an 🌿 Wellness oder 💼 Business interessiert?",
      language: "Welche Sprache bevorzugst du?",
      goals: "Was möchtest du in deinem Leben verbessern?",
      experience: "Hast du schon Erfahrung mit ätherischen Ölen?",
      time: "Wie viele Stunden pro Woche kannst du investieren?",
      motivation: "Warum interessierst du dich für diese Möglichkeit?",
      connect: "Wie möchtest du Kontakt aufnehmen? (Mehrfachauswahl möglich)",
    },
    options: {
      ageGroup: [
        "Baby Boomers (1946-1964)",
        "Generation X (1965-1980)", 
        "Millennials (1981-1996)",
        "Generation Z (1997-2012)",
        "Generation Alpha (2013-Present)"
      ],
      interest: ["Wellness", "Business"],
      experience: ["Keine Erfahrung", "Einige Erfahrung", "Erfahrener Nutzer"],
      connect: [
        "Zoom-Meeting vereinbaren",
        "Telegram-Kanal beitreten",
        "Facebook-Gruppe beitreten",
        "Über Messenger chatten",
        "YouTube-Kanal abonnieren",
      ],
    },
    buttons: {
      next: "Weiter",
      submit: "Absenden",
      back: "Zurück",
    },
    placeholders: {
      name: "Gib deinen Namen ein",
      email: "Gib deine E-Mail-Adresse ein",
      phone: "Gib deine Mobilnummer ein",
      goals: "z.B. Gesundheit, Energie, Selbstvertrauen, finanzielle Freiheit...",
      time: "Stunden pro Woche",
      motivation: "Teile deine Motivation und Ziele mit...",
      selectGeneration: "-- Wähle deine Generation --",
      selectPath: "-- Wähle deinen Weg --",
      selectExperience: "-- Wähle dein Erfahrungsniveau --",
    },
  },

  hu: {
    langName: "Magyar",
    subtitle: "💧 Fedezd fel a jólét és sorsod útját a természetes módon.",
    quotes: {
      mission: '🔥 "Alakítsd át a természetes élet iránti szenvedélyedet erős küldetéssé."',
      tagline: '🌸 "Empowered by Nature. Designed for You."'
    },
    questions: {
      nameEmail: "Mi a neved és mi a legjobb email címed?",
      phone: "Mi a mobiltelefonszámod?",
      ageGroup: "Mi a korcsoportod?",
      interest: "Inkább a 🌿 wellness vagy a 💼 üzleti lehetőségek érdekelnek?",
      language: "Melyik nyelvet preferálod?",
      goals: "Min szeretnél javítani az életeden?",
      experience: "Használtál már illóolajokat?",
      time: "Hetente hány órát tudsz erre szánni?",
      motivation: "Miért érdekel ez a lehetőség?",
      connect: "Hogyan szeretnél kapcsolatba lépni? (Több válasz is lehetséges)",
    },
    options: {
      ageGroup: [
        "Baby Boomers (1946-1964)",
        "Generation X (1965-1980)", 
        "Millennials (1981-1996)",
        "Generation Z (1997-2012)",
        "Generation Alpha (2013-Present)"
      ],
      interest: ["Wellness", "Üzlet"],
      experience: ["Nincs tapasztalat", "Kisebb tapasztalat", "Tapasztalt felhasználó"],
      connect: [
        "Időpont egyeztetés Zoom-on",
        "Csatlakozás Telegram csatornához",
        "Csatlakozás Facebook csoporthoz",
        "Messenger-en beszélgetés",
        "YouTube csatorna feliratkozás",
      ],
    },
    buttons: {
      next: "Következő",
      submit: "Beküldés",
      back: "Vissza",
    },
    placeholders: {
      name: "Add meg a neved",
      email: "Add meg az email címed",
      phone: "Add meg a mobiltelefonszámod",
      goals: "pl. egészség, energia, önbizalom, pénzügyi szabadság...",
      time: "Óra hetente",
      motivation: "Oszd meg a motivációd és céljaid...",
      selectGeneration: "-- Válaszd ki a generációd --",
      selectPath: "-- Válaszd ki az utad --",
      selectExperience: "-- Válaszd ki a tapasztalati szinted --",
    },
  },

  it: {
    langName: "Italiano",
    subtitle: "💧 Scopri il tuo percorso verso il benessere e il destino, in modo naturale.",
    quotes: {
      mission: '🔥 "Trasforma la tua passione per la vita naturale in una potente missione."',
      tagline: '🌸 "Empowered by Nature. Designed for You."'
    },
    questions: {
      nameEmail: "Come ti chiami e qual è la tua migliore email?",
      phone: "Qual è il tuo numero di cellulare?",
      ageGroup: "Qual è la tua fascia d'età?",
      interest: "Sei più interessato a 🌿 benessere o 💼 business?",
      language: "Quale lingua preferisci?",
      goals: "Cosa vorresti migliorare nella tua vita?",
      experience: "Hai già usato oli essenziali?",
      time: "Quante ore a settimana puoi dedicare a questo?",
      motivation: "Perché ti interessa questa opportunità?",
      connect: "Come preferisci metterti in contatto? (Seleziona una o più opzioni)",
    },
    options: {
      ageGroup: [
        "Baby Boomers (1946-1964)",
        "Generation X (1965-1980)", 
        "Millennials (1981-1996)",
        "Generation Z (1997-2012)",
        "Generation Alpha (2013-Present)"
      ],
      interest: ["Benessere", "Business"],
      experience: ["Nessuna esperienza", "Qualche esperienza", "Utente esperto"],
      connect: [
        "Prenota un incontro Zoom",
        "Unisciti al canale Telegram",
        "Unisciti al gruppo Facebook",
        "Chatta su Messenger",
        "Iscriviti al canale YouTube",
      ],
    },
    buttons: {
      next: "Avanti",
      submit: "Invia",
      back: "Indietro",
    },
    placeholders: {
      name: "Inserisci il tuo nome",
      email: "Inserisci la tua email",
      phone: "Inserisci il tuo numero di cellulare",
      goals: "es. salute, energia, fiducia, libertà finanziaria...",
      time: "Ore a settimana",
      motivation: "Condividi la tua motivazione e i tuoi obiettivi...",
      selectGeneration: "-- Seleziona la tua generazione --",
      selectPath: "-- Seleziona il tuo percorso --",
      selectExperience: "-- Seleziona il tuo livello di esperienza --",
    },
  },

  es: {
    langName: "Español",
    subtitle: "💧 Descubre tu camino hacia el bienestar y el destino, de forma natural.",
    quotes: {
      mission: '🔥 "Convierte tu pasión por la vida natural en una misión poderosa."',
      tagline: '🌸 "Empowered by Nature. Designed for You."'
    },
    questions: {
      nameEmail: "¿Cuál es tu nombre y mejor dirección de correo electrónico?",
      phone: "¿Cuál es tu número de móvil?",
      ageGroup: "¿Cuál es tu grupo de edad?",
      interest: "¿Te interesa más 🌿 bienestar o 💼 negocio?",
      language: "¿Qué idioma prefieres?",
      goals: "¿Qué te gustaría mejorar en tu vida?",
      experience: "¿Has usado aceites esenciales antes?",
      time: "¿Cuántas horas por semana puedes dedicar a esto?",
      motivation: "¿Por qué te interesa esta oportunidad?",
      connect: "¿Cómo te gustaría conectar? (Selecciona una o más opciones)",
    },
    options: {
      ageGroup: [
        "Baby Boomers (1946-1964)",
        "Generation X (1965-1980)", 
        "Millennials (1981-1996)",
        "Generation Z (1997-2012)",
        "Generation Alpha (2013-Present)"
      ],
      interest: ["Bienestar", "Negocio"],
      experience: ["Sin experiencia", "Alguna experiencia", "Usuario experimentado"],
      connect: [
        "Programar una reunión Zoom",
        "Unirse al canal de Telegram",
        "Unirse al grupo de Facebook",
        "Chatear por Messenger",
        "Suscribirse al canal de YouTube",
      ],
    },
    buttons: {
      next: "Siguiente",
      submit: "Enviar",
      back: "Atrás",
    },
    placeholders: {
      name: "Ingresa tu nombre",
      email: "Ingresa tu correo electrónico",
      phone: "Ingresa tu número de móvil",
      goals: "ej. salud, energía, confianza, libertad financiera...",
      time: "Horas por semana",
      motivation: "Comparte tu motivación y objetivos...",
      selectGeneration: "-- Selecciona tu generación --",
      selectPath: "-- Selecciona tu camino --",
      selectExperience: "-- Selecciona tu nivel de experiencia --",
    },
  },

  fr: {
    langName: "Français",
    subtitle: "💧 Découvrez votre chemin vers le bien-être et le destin, de manière naturelle.",
    quotes: {
      mission: '🔥 "Transformez votre passion pour la vie naturelle en une mission puissante."',
      tagline: '🌸 "Empowered by Nature. Designed for You."'
    },
    questions: {
      nameEmail: "Quel est votre nom et votre meilleure adresse e-mail ?",
      phone: "Quel est votre numéro de mobile ?",
      ageGroup: "Quel est votre groupe d'âge ?",
      interest: "Êtes-vous plus intéressé par 🌿 le bien-être ou 💼 les affaires ?",
      language: "Quelle langue préférez-vous ?",
      goals: "Que souhaitez-vous améliorer dans votre vie ?",
      experience: "Avez-vous déjà utilisé des huiles essentielles ?",
      time: "Combien d'heures par semaine pouvez-vous y consacrer ?",
      motivation: "Pourquoi êtes-vous intéressé par cette opportunité ?",
      connect: "Comment souhaitez-vous vous connecter ? (Sélectionnez une ou plusieurs options)",
    },
    options: {
      ageGroup: [
        "Baby Boomers (1946-1964)",
        "Generation X (1965-1980)", 
        "Millennials (1981-1996)",
        "Generation Z (1997-2012)",
        "Generation Alpha (2013-Present)"
      ],
      interest: ["Bien-être", "Affaires"],
      experience: ["Aucune expérience", "Quelque expérience", "Utilisateur expérimenté"],
      connect: [
        "Programmer une réunion Zoom",
        "Rejoindre le canal Telegram",
        "Rejoindre le groupe Facebook",
        "Discuter via Messenger",
        "S'abonner à la chaîne YouTube",
      ],
    },
    buttons: {
      next: "Suivant",
      submit: "Soumettre",
      back: "Retour",
    },
    placeholders: {
      name: "Entrez votre nom",
      email: "Entrez votre adresse e-mail",
      phone: "Entrez votre numéro de mobile",
      goals: "ex. santé, énergie, confiance, liberté financière...",
      time: "Heures par semaine",
      motivation: "Partagez votre motivation et vos objectifs...",
      selectGeneration: "-- Sélectionnez votre génération --",
      selectPath: "-- Sélectionnez votre chemin --",
      selectExperience: "-- Sélectionnez votre niveau d'expérience --",
    },
  },

  cs: {
    langName: "Čeština",
    subtitle: "💧 Objevte svou cestu k pohodě a osudu přirozeným způsobem.",
    quotes: {
      mission: '🔥 "Proměňte svou vášeň pro přirozený život v mocnou misi."',
      tagline: '🌸 "Empowered by Nature. Designed for You."'
    },
    questions: {
      nameEmail: "Jaké je vaše jméno a nejlepší e-mailová adresa?",
      phone: "Jaké je vaše mobilní číslo?",
      ageGroup: "Jaká je vaše věková skupina?",
      interest: "Zajímáte se více o 🌿 pohodu nebo 💼 podnikání?",
      language: "Jaký jazyk preferujete?",
      goals: "Co byste chtěli zlepšit ve svém životě?",
      experience: "Už jste někdy používali éterické oleje?",
      time: "Kolik hodin týdně tomu můžete věnovat?",
      motivation: "Proč vás tato příležitost zajímá?",
      connect: "Jak se chcete spojit? (Vyberte jednu nebo více možností)",
    },
    options: {
      ageGroup: [
        "Baby Boomers (1946-1964)",
        "Generation X (1965-1980)", 
        "Millennials (1981-1996)",
        "Generation Z (1997-2012)",
        "Generation Alpha (2013-Present)"
      ],
      interest: ["Pohoda", "Podnikání"],
      experience: ["Žádné zkušenosti", "Nějaké zkušenosti", "Zkušený uživatel"],
      connect: [
        "Naplánovat Zoom schůzku",
        "Připojit se k Telegram kanálu",
        "Připojit se k Facebook skupině",
        "Chatovat přes Messenger",
        "Přihlásit se k YouTube kanálu",
      ],
    },
    buttons: {
      next: "Další",
      submit: "Odeslat",
      back: "Zpět",
    },
    placeholders: {
      name: "Zadejte své jméno",
      email: "Zadejte svůj e-mail",
      phone: "Zadejte své mobilní číslo",
      goals: "např. zdraví, energie, sebevědomí, finanční svoboda...",
      time: "Hodiny týdně",
      motivation: "Podělte se o svou motivaci a cíle...",
      selectGeneration: "-- Vyberte svou generaci --",
      selectPath: "-- Vyberte svou cestu --",
      selectExperience: "-- Vyberte svou úroveň zkušeností --",
    },
  },

  sk: {
    langName: "Slovenčina",
    subtitle: "💧 Objavte svoju cestu k pohode a osudu prirodzeným spôsobom.",
    quotes: {
      mission: '🔥 "Premenite svoju vášeň pre prirodzený život na mocnú misiu."',
      tagline: '🌸 "Empowered by Nature. Designed for You."'
    },
    questions: {
      nameEmail: "Aké je vaše meno a najlepšia e-mailová adresa?",
      phone: "Aké je vaše mobilné číslo?",
      ageGroup: "Aká je vaša veková skupina?",
      interest: "Zaujímate sa viac o 🌿 pohodu alebo 💼 podnikanie?",
      language: "Aký jazyk preferujete?",
      goals: "Čo by ste chceli zlepšiť vo svojom živote?",
      experience: "Už ste niekdy používali éterické oleje?",
      time: "Koľko hodín týždenne tomu môžete venovať?",
      motivation: "Prečo vás táto príležitosť zaujíma?",
      connect: "Ako sa chcete spojiť? (Vyberte jednu alebo viac možností)",
    },
    options: {
      ageGroup: [
        "Baby Boomers (1946-1964)",
        "Generation X (1965-1980)", 
        "Millennials (1981-1996)",
        "Generation Z (1997-2012)",
        "Generation Alpha (2013-Present)"
      ],
      interest: ["Pohoda", "Podnikanie"],
      experience: ["Žiadne skúsenosti", "Niektoré skúsenosti", "Skúsený používateľ"],
      connect: [
        "Naplánovať Zoom schôdzu",
        "Pridať sa k Telegram kanálu",
        "Pridať sa k Facebook skupine",
        "Chatovať cez Messenger",
        "Prihlásiť sa k YouTube kanálu",
      ],
    },
    buttons: {
      next: "Ďalší",
      submit: "Odoslať",
      back: "Späť",
    },
    placeholders: {
      name: "Zadajte svoje meno",
      email: "Zadajte svoj e-mail",
      phone: "Zadajte svoje mobilné číslo",
      goals: "napr. zdravie, energia, sebavedomie, finančná sloboda...",
      time: "Hodiny týždenne",
      motivation: "Podeľte sa o svoju motiváciu a ciele...",
      selectGeneration: "-- Vyberte svoju generáciu --",
      selectPath: "-- Vyberte svoju cestu --",
      selectExperience: "-- Vyberte svoju úroveň skúseností --",
    },
  },

  pl: {
    langName: "Polski",
    subtitle: "💧 Odkryj swoją ścieżkę do dobrego samopoczucia i przeznaczenia w naturalny sposób.",
    quotes: {
      mission: '🔥 "Przekształć swoją pasję do naturalnego życia w potężną misję."',
      tagline: '🌸 "Empowered by Nature. Designed for You."'
    },
    questions: {
      nameEmail: "Jak masz na imię i jaki jest Twój najlepszy adres e-mail?",
      phone: "Jaki jest Twój numer telefonu komórkowego?",
      ageGroup: "Jaka jest Twoja grupa wiekowa?",
      interest: "Czy bardziej interesujesz się 🌿 dobrym samopoczuciem czy 💼 biznesem?",
      language: "Jaki język preferujesz?",
      goals: "Co chciałbyś poprawić w swoim życiu?",
      experience: "Czy używałeś już olejków eterycznych?",
      time: "Ile godzin tygodniowo możesz temu poświęcić?",
      motivation: "Dlaczego interesujesz się tą możliwością?",
      connect: "Jak chciałbyś się połączyć? (Wybierz jedną lub więcej opcji)",
    },
    options: {
      ageGroup: [
        "Baby Boomers (1946-1964)",
        "Generation X (1965-1980)", 
        "Millennials (1981-1996)",
        "Generation Z (1997-2012)",
        "Generation Alpha (2013-Present)"
      ],
      interest: ["Dobre samopoczucie", "Biznes"],
      experience: ["Brak doświadczenia", "Niektóre doświadczenie", "Doświadczony użytkownik"],
      connect: [
        "Zaplanuj spotkanie Zoom",
        "Dołącz do kanału Telegram",
        "Dołącz do grupy Facebook",
        "Czytaj przez Messenger",
        "Subskrybuj kanał YouTube",
      ],
    },
    buttons: {
      next: "Dalej",
      submit: "Wyślij",
      back: "Wstecz",
    },
    placeholders: {
      name: "Wprowadź swoje imię",
      email: "Wprowadź swój e-mail",
      phone: "Wprowadź swój numer telefonu komórkowego",
      goals: "np. zdrowie, energia, pewność siebie, wolność finansowa...",
      time: "Godziny tygodniowo",
      motivation: "Podziel się swoją motywacją i celami...",
      selectGeneration: "-- Wybierz swoją generację --",
      selectPath: "-- Wybierz swoją ścieżkę --",
      selectExperience: "-- Wybierz swój poziom doświadczenia --",
    },
  },

  sl: {
    langName: "Slovenščina",
    subtitle: "💧 Odkrijte svojo pot do dobrega počutja in usode na naraven način.",
    quotes: {
      mission: '🔥 "Svojo strast do naravnega življenja spremenite v močno misijo."',
      tagline: '🌸 "Empowered by Nature. Designed for You."'
    },
    questions: {
      nameEmail: "Kako se imenujete in kakšen je vaš najboljši e-poštni naslov?",
      phone: "Kakšna je vaša mobilna številka?",
      ageGroup: "Kakšna je vaša starostna skupina?",
      interest: "Ali vas bolj zanima 🌿 dobro počutje ali 💼 posel?",
      language: "Kateri jezik imate raje?",
      goals: "Kaj bi radi izboljšali v svojem življenju?",
      experience: "Ali ste že kdaj uporabljali eterične olje?",
      time: "Koliko ur na teden lahko temu namenite?",
      motivation: "Zakaj vas zanima ta priložnost?",
      connect: "Kako se želite povezati? (Izberite eno ali več možnosti)",
    },
    options: {
      ageGroup: [
        "Baby Boomers (1946-1964)",
        "Generation X (1965-1980)", 
        "Millennials (1981-1996)",
        "Generation Z (1997-2012)",
        "Generation Alpha (2013-Present)"
      ],
      interest: ["Dobro počutje", "Posel"],
      experience: ["Brez izkušenj", "Nekaj izkušenj", "Izkušen uporabnik"],
      connect: [
        "Načrtujte Zoom sestanek",
        "Pridružite se Telegram kanalu",
        "Pridružite se Facebook skupini",
        "Pogovorite se preko Messenger",
        "Naročite se na YouTube kanal",
      ],
    },
    buttons: {
      next: "Naprej",
      submit: "Pošlji",
      back: "Nazaj",
    },
    placeholders: {
      name: "Vnesite svoje ime",
      email: "Vnesite svoj e-poštni naslov",
      phone: "Vnesite svojo mobilno številko",
      goals: "npr. zdravje, energija, samozavest, finančna svoboda...",
      time: "Ure na teden",
      motivation: "Delite svojo motivacijo in cilje...",
      selectGeneration: "-- Izberite svojo generacijo --",
      selectPath: "-- Izberite svojo pot --",
      selectExperience: "-- Izberite svojo raven izkušenj --",
    },
  },

  el: {
    langName: "Ελληνικά",
    subtitle: "💧 Ανακαλύψτε το μονοπάτι σας προς την ευεξία και το πεπρωμένο, με φυσικό τρόπο.",
    quotes: {
      mission: '🔥 "Μετατρέψτε το πάθος σας για τη φυσική ζωή σε μια ισχυρή αποστολή."',
      tagline: '🌸 "Empowered by Nature. Designed for You."'
    },
    questions: {
      nameEmail: "Ποιο είναι το όνομά σας και η καλύτερη διεύθυνση ηλεκτρονικού ταχυδρομείου σας;",
      phone: "Ποιος είναι ο αριθμός κινητού σας;",
      ageGroup: "Ποια είναι η ηλικιακή σας ομάδα;",
      interest: "Σας ενδιαφέρει περισσότερο 🌿 η ευεξία ή 💼 η επιχείρηση;",
      language: "Ποια γλώσσα προτιμάτε;",
      goals: "Τι θα θέλατε να βελτιώσετε στη ζωή σας;",
      experience: "Έχετε χρησιμοποιήσει αιθέρια έλαια πριν;",
      time: "Πόσες ώρες την εβδομάδα μπορείτε να αφιερώσετε σε αυτό;",
      motivation: "Γιατί σας ενδιαφέρει αυτή η ευκαιρία;",
      connect: "Πώς θα θέλατε να συνδεθείτε; (Επιλέξτε μία ή περισσότερες επιλογές)",
    },
    options: {
      ageGroup: [
        "Baby Boomers (1946-1964)",
        "Generation X (1965-1980)", 
        "Millennials (1981-1996)",
        "Generation Z (1997-2012)",
        "Generation Alpha (2013-Present)"
      ],
      interest: ["Ευεξία", "Επιχείρηση"],
      experience: ["Καμία εμπειρία", "Κάποια εμπειρία", "Έμπειρος χρήστης"],
      connect: [
        "Προγραμματίστε μια συνεδρία Zoom",
        "Γίνετε μέλος του καναλιού Telegram",
        "Γίνετε μέλος της ομάδας Facebook",
        "Συνομιλήστε μέσω Messenger",
        "Εγγραφείτε στο κανάλι YouTube",
      ],
    },
    buttons: {
      next: "Επόμενο",
      submit: "Υποβολή",
      back: "Πίσω",
    },
    placeholders: {
      name: "Εισάγετε το όνομά σας",
      email: "Εισάγετε τη διεύθυνση ηλεκτρονικού ταχυδρομείου σας",
      phone: "Εισάγετε τον αριθμό κινητού σας",
      goals: "π.χ. υγεία, ενέργεια, αυτοπεποίθηση, οικονομική ελευθερία...",
      time: "Ώρες ανά εβδομάδα",
      motivation: "Μοιραστείτε τη motivación και τους στόχους σας...",
      selectGeneration: "-- Επιλέξτε τη γενιά σας --",
      selectPath: "-- Επιλέξτε το μονοπάτι σας --",
      selectExperience: "-- Επιλέξτε το επίπεδο εμπειρίας σας --",
    },
  },

  ja: {
    langName: "日本語",
    subtitle: "💧 自然な方法で健康と運命への道を発見しましょう。",
    quotes: {
      mission: '🔥 "自然な生活への情熱を力強い使命に変えましょう。"',
      tagline: '🌸 "Empowered by Nature. Designed for You."'
    },
    questions: {
      nameEmail: "お名前と最適なメールアドレスは何ですか？",
      phone: "携帯電話番号は何ですか？",
      ageGroup: "年齢層は何ですか？",
      interest: "🌿 ウェルネスと 💼 ビジネスのどちらにより興味がありますか？",
      language: "どの言語を好みますか？",
      goals: "人生で何を改善したいですか？",
      experience: "エッセンシャルオイルを以前に使用したことがありますか？",
      time: "週に何時間これに費やすことができますか？",
      motivation: "なぜこの機会に興味がありますか？",
      connect: "どのように接続したいですか？（1つまたは複数を選択）",
    },
    options: {
      ageGroup: [
        "Baby Boomers (1946-1964)",
        "Generation X (1965-1980)", 
        "Millennials (1981-1996)",
        "Generation Z (1997-2012)",
        "Generation Alpha (2013-Present)"
      ],
      interest: ["ウェルネス", "ビジネス"],
      experience: ["経験なし", "いくらかの経験", "経験豊富なユーザー"],
      connect: [
        "Zoom会議をスケジュール",
        "Telegramチャンネルに参加",
        "Facebookグループに参加",
        "Messengerでチャット",
        "YouTubeチャンネルを購読",
      ],
    },
    buttons: {
      next: "次へ",
      submit: "送信",
      back: "戻る",
    },
    placeholders: {
      name: "お名前を入力してください",
      email: "メールアドレスを入力してください",
      phone: "携帯電話番号を入力してください",
      goals: "例：健康、エネルギー、自信、経済的自由...",
      time: "週間の時間",
      motivation: "あなたの動機と目標を共有してください...",
      selectGeneration: "-- あなたの世代を選択してください --",
      selectPath: "-- あなたの道を選択してください --",
      selectExperience: "-- あなたの経験レベルを選択してください --",
    },
  },

  zh: {
    langName: "中文",
    subtitle: "💧 以自然的方式发现您通往健康和命运的道路。",
    quotes: {
      mission: '🔥 "将您对自然生活的热情转化为强大的使命。"',
      tagline: '🌸 "Empowered by Nature. Designed for You."'
    },
    questions: {
      nameEmail: "您的姓名和最佳电子邮件地址是什么？",
      phone: "您的手机号码是什么？",
      ageGroup: "您的年龄段是什么？",
      interest: "您对 🌿 健康还是 💼 商业更感兴趣？",
      language: "您喜欢哪种语言？",
      goals: "您想在生活中改善什么？",
      experience: "您以前使用过精油吗？",
      time: "您每周可以投入多少小时？",
      motivation: "您为什么对这个机会感兴趣？",
      connect: "您希望如何连接？（选择一个或多个选项）",
    },
    options: {
      ageGroup: [
        "Baby Boomers (1946-1964)",
        "Generation X (1965-1980)", 
        "Millennials (1981-1996)",
        "Generation Z (1997-2012)",
        "Generation Alpha (2013-Present)"
      ],
      interest: ["健康", "商业"],
      experience: ["无经验", "一些经验", "有经验的用户"],
      connect: [
        "安排Zoom会议",
        "加入Telegram频道",
        "加入Facebook群组",
        "通过Messenger聊天",
        "订阅YouTube频道",
      ],
    },
    buttons: {
      next: "下一个",
      submit: "提交",
      back: "返回",
    },
    placeholders: {
      name: "输入您的姓名",
      email: "输入您的电子邮件地址",
      phone: "输入您的手机号码",
      goals: "例如：健康、能量、自信、财务自由...",
      time: "每周小时数",
      motivation: "分享您的动机和目标...",
      selectGeneration: "-- 选择您的世代 --",
      selectPath: "-- 选择您的道路 --",
      selectExperience: "-- 选择您的经验水平 --",
    },
  },

  ko: {
    langName: "한국어",
    subtitle: "💧 자연스러운 방식으로 건강과 운명으로 가는 길을 발견하세요.",
    quotes: {
      mission: '🔥 "자연스러운 삶에 대한 열정을 강력한 사명으로 바꾸세요."',
      tagline: '🌸 "Empowered by Nature. Designed for You."'
    },
    questions: {
      nameEmail: "귀하의 이름과 최고의 이메일 주소는 무엇입니까?",
      phone: "귀하의 휴대폰 번호는 무엇입니까?",
      ageGroup: "귀하의 연령대는 무엇입니까?",
      interest: "🌿 웰니스와 💼 비즈니스 중 어느 것에 더 관심이 있으십니까?",
      language: "어떤 언어를 선호하십니까?",
      goals: "인생에서 무엇을 개선하고 싶으십니까?",
      experience: "이전에 에센셜 오일을 사용해 본 적이 있습니까?",
      time: "주당 몇 시간을 이에 투자할 수 있습니까?",
      motivation: "왜 이 기회에 관심이 있으십니까?",
      connect: "어떻게 연결하고 싶으십니까? (하나 또는 여러 개 선택)",
    },
    options: {
      ageGroup: [
        "Baby Boomers (1946-1964)",
        "Generation X (1965-1980)", 
        "Millennials (1981-1996)",
        "Generation Z (1997-2012)",
        "Generation Alpha (2013-Present)"
      ],
      interest: ["웰니스", "비즈니스"],
      experience: ["경험 없음", "일부 경험", "경험 많은 사용자"],
      connect: [
        "Zoom 회의 예약",
        "Telegram 채널 가입",
        "Facebook 그룹 가입",
        "Messenger로 채팅",
        "YouTube 채널 구독",
      ],
    },
    buttons: {
      next: "다음",
      submit: "제출",
      back: "뒤로",
    },
    placeholders: {
      name: "이름을 입력하세요",
      email: "이메일 주소를 입력하세요",
      phone: "휴대폰 번호를 입력하세요",
      goals: "예: 건강, 에너지, 자신감, 재정적 자유...",
      time: "주당 시간",
      motivation: "동기와 목표를 공유하세요...",
      selectGeneration: "-- 세대를 선택하세요 --",
      selectPath: "-- 경로를 선택하세요 --",
      selectExperience: "-- 경험 수준을 선택하세요 --",
    },
  },

  pt: {
    langName: "Português",
    subtitle: "💧 Descubra seu caminho para o bem-estar e destino, de forma natural.",
    quotes: {
      mission: '🔥 "Transforme sua paixão pela vida natural em uma missão poderosa."',
      tagline: '🌸 "Empowered by Nature. Designed for You."'
    },
    questions: {
      nameEmail: "Qual é o seu nome e melhor endereço de e-mail?",
      phone: "Qual é o seu número de celular?",
      ageGroup: "Qual é o seu grupo etário?",
      interest: "Você está mais interessado em 🌿 bem-estar ou 💼 negócios?",
      language: "Qual idioma você prefere?",
      goals: "O que você gostaria de melhorar na sua vida?",
      experience: "Você já usou óleos essenciais antes?",
      time: "Quantas horas por semana você pode dedicar a isso?",
      motivation: "Por que você está interessado nesta oportunidade?",
      connect: "Como você gostaria de se conectar? (Selecione uma ou mais opções)",
    },
    options: {
      ageGroup: [
        "Baby Boomers (1946-1964)",
        "Generation X (1965-1980)", 
        "Millennials (1981-1996)",
        "Generation Z (1997-2012)",
        "Generation Alpha (2013-Present)"
      ],
      interest: ["Bem-estar", "Negócios"],
      experience: ["Sem experiência", "Alguma experiência", "Usuário experiente"],
      connect: [
        "Agendar uma reunião Zoom",
        "Entrar no canal Telegram",
        "Entrar no grupo Facebook",
        "Conversar via Messenger",
        "Inscrever-se no canal YouTube",
      ],
    },
    buttons: {
      next: "Próximo",
      submit: "Enviar",
      back: "Voltar",
    },
    placeholders: {
      name: "Digite seu nome",
      email: "Digite seu endereço de e-mail",
      phone: "Digite seu número de celular",
      goals: "ex. saúde, energia, confiança, liberdade financeira...",
      time: "Horas por semana",
      motivation: "Compartilhe sua motivação e objetivos...",
      selectGeneration: "-- Selecione sua geração --",
      selectPath: "-- Selecione seu caminho --",
      selectExperience: "-- Selecione seu nível de experiência --",
    },
  },
};

// Language to country mapping
const languageToCountry = {
  en: "US",
  de: "DE", 
  hu: "HU",
  it: "IT",
  es: "ES",
  fr: "FR",
  cs: "CZ",
  sk: "SK",
  pl: "PL",
  sl: "SI",
  el: "GR",
  ja: "JP",
  zh: "CN",
  ko: "KR",
  pt: "PT"
};

// Social links - update with your real links here
const socialLinks = {
  zoom: {
    url: "https://calendly.com/corezionteam/30min",
    icon: "📹",
    color: "from-blue-500 to-blue-600",
    hoverColor: "from-blue-400 to-blue-500"
  },
  telegram: {
    url: "https://t.me/corezionteam",
    icon: "📱",
    color: "from-blue-400 to-blue-500",
    hoverColor: "from-blue-300 to-blue-400"
  },
  facebook: {
    url: "https://www.facebook.com/profile.php?id=61573152500984",
    icon: "📘",
    color: "from-blue-600 to-blue-700",
    hoverColor: "from-blue-500 to-blue-600"
  },
  messenger: {
    url: "https://m.me/corezionteam",
    icon: "💬",
    color: "from-blue-500 to-purple-600",
    hoverColor: "from-blue-400 to-purple-500"
  },
  youtube: {
    url: "https://youtube.com/@zionteamegyesulet",
    icon: "📺",
    color: "from-red-500 to-red-600",
    hoverColor: "from-red-400 to-red-500"
  },
};

// Matrix digital rain characters
const matrixChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

export default function LeadQuizApp() {
  const languages = Object.keys(translations);
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  // Test Supabase connection on component mount
  useEffect(() => {
    testConnection().then(isConnected => {
      console.log('Supabase connection test result:', isConnected)
    })
  }, [])

  // Store answers in state
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    ageGroup: "",
    interest: "",
    language: lang,
    goals: "",
    experience: "",
    time: "",
    motivation: "",
    connect: [],
  });

  // Handle multi-select connect options
  function toggleConnect(option) {
    setForm((f) => {
      const current = f.connect || [];
      if (current.includes(option)) {
        return { ...f, connect: current.filter((o) => o !== option) };
      } else {
        return { ...f, connect: [...current, option] };
      }
    });
  }

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // On language change - update lang & form.language
  function handleLangChange(e) {
    setLang(e.target.value);
    setForm((f) => ({ ...f, language: e.target.value }));
  }

  // Submit handler - connect to Supabase
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Prepare data for Supabase - mapping to existing column names
      const leadData = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        age_group: form.ageGroup, // new age group field
        interest: form.interest,
        language: form.language,
        quiz_result: form.goals, // map goals to quiz_result
        tags: form.experience, // map experience to tags
        time_commitment: parseInt(form.time) || 0,
        motivation: form.motivation,
        connect_options: form.connect,
      };

      // Insert into Supabase
      const { data, error } = await insertLead(leadData);

      if (error) {
        console.error("Error saving lead:", error);
        alert(`Error: ${error.message || 'Unknown error occurred. Please try again.'}`);
        return;
      }

      console.log("Lead saved successfully:", data);
      alert(t.langName + ": Thank you for submitting! We will contact you soon.");
      
      // Reset form
      setStep(1);
      setForm({
        name: "",
        email: "",
        phone: "",
        ageGroup: "",
        interest: "",
        language: lang,
        goals: "",
        experience: "",
        time: "",
        motivation: "",
        connect: [],
      });
    } catch (error) {
      console.error("Submit error:", error);
      alert("Sorry, there was an error. Please try again.");
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 overflow-hidden">
      {/* Matrix-style background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-400/20 to-blue-500/20 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Matrix Digital Rain Background - Enhanced Visibility */}
      <div className="absolute inset-0 opacity-30 overflow-hidden z-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400/60 text-sm font-mono"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-100px',
              animation: `matrixRain ${8 + Math.random() * 6}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {[...Array(15)].map((_, j) => (
              <div
                key={j}
                className="block"
                style={{
                  animationDelay: `${Math.random() * 3}s`,
                  opacity: Math.random() * 0.6 + 0.3,
                }}
              >
                {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
              </div>
            ))}
          </div>
        ))}
      </div>





      <style>{`
        @keyframes matrixRain {
          0% {
            transform: translateY(-100px);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>

      {/* Main container */}
      <div className="relative z-10 max-w-2xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            {/* Logo */}
            <img 
              src="/Zion art.png" 
              alt="Zion Art Logo" 
              className="w-28 h-28 object-contain mr-6 filter drop-shadow-lg"
            />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
              Empowered by Nature
            </h1>
          </div>
          <p className="text-gray-300 text-xl font-light mb-8 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Matrix-Style Glassmorphism card */}
        <div className="bg-black/40 border border-green-500/30 rounded-3xl shadow-2xl p-8 hover:shadow-green-500/20 transition-all duration-500 relative overflow-hidden">
          {/* Matrix-style inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-green-400/3 to-transparent rounded-3xl"></div>
          {/* Language Selector */}
          <div className="mb-8">
            <label className="block text-green-400 font-semibold mb-3 text-lg">
              {t.questions.language}
            </label>
            <select 
              value={lang} 
              onChange={handleLangChange} 
              className="w-full bg-black/40 border border-green-500/40 rounded-xl p-4 text-white backdrop-blur-sm focus:border-green-400 focus:outline-none focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 hover:border-green-400/60 hover:shadow-green-500/10"
            >
              {languages.map((l) => (
                <option key={l} value={l} className="bg-gray-900">
                  {translations[l].langName}
                </option>
              ))}
            </select>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-green-400 font-semibold mb-3 text-lg">
                    {t.questions.nameEmail}
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder={t.placeholders.name}
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-green-500/40 rounded-xl p-4 text-white placeholder-gray-400 backdrop-blur-sm focus:border-green-400 focus:outline-none focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 hover:border-green-400/60 hover:shadow-green-500/10"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={t.placeholders.email}
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-green-500/40 rounded-xl p-4 text-white placeholder-gray-400 backdrop-blur-sm focus:border-green-400 focus:outline-none focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 hover:border-green-400/60 hover:shadow-green-500/10 mt-4"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/30 hover:shadow-xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">{t.buttons.next} →</span>
                </button>
              </div>
            )}

            {/* Step 2 - Phone Number */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-green-400 font-semibold mb-3 text-lg">
                    {t.questions.phone}
                  </label>
                  <div className="relative">
                    <PhoneInput
                      international
                      defaultCountry={languageToCountry[lang]}
                      value={form.phone}
                      onChange={(value) => setForm(prev => ({ ...prev, phone: value }))}
                      placeholder={t.placeholders.phone}
                      className="w-full bg-black/40 border border-green-500/40 rounded-xl p-4 text-white placeholder-gray-400 backdrop-blur-sm focus:border-green-400 focus:outline-none focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 hover:border-green-400/60 hover:shadow-green-500/10"
                      style={{
                        '--react-phone-number-input__country-select-arrow-color': '#10b981',
                        '--react-phone-number-input__country-select-arrow-color-hover': '#34d399',
                        '--react-phone-number-input__country-select-background-color': '#1f2937',
                        '--react-phone-number-input__country-select-border-color': '#10b981',
                        '--react-phone-number-input__input-background-color': 'transparent',
                        '--react-phone-number-input__input-border-color': '#10b981',
                        '--react-phone-number-input__input-color': '#ffffff',
                        '--react-phone-number-input__input-placeholder-color': '#9ca3af',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-green-400 font-semibold mb-3 text-lg">
                    {t.questions.ageGroup}
                  </label>
                  <select
                    name="ageGroup"
                    value={form.ageGroup}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-green-500/40 rounded-xl p-4 text-white backdrop-blur-sm focus:border-green-400 focus:outline-none focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 hover:border-green-400/60 hover:shadow-green-500/10"
                  >
                    <option value="" disabled className="bg-gray-900">
                      {t.placeholders.selectGeneration}
                    </option>
                    {t.options.ageGroup.map((opt) => (
                      <option key={opt} value={opt} className="bg-gray-900">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-green-400 font-semibold mb-3 text-lg">
                    {t.questions.interest}
                  </label>
                  <select
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-green-500/40 rounded-xl p-4 text-white backdrop-blur-sm focus:border-green-400 focus:outline-none focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 hover:border-green-400/60 hover:shadow-green-500/10"
                  >
                    <option value="" disabled className="bg-gray-900">
                      {t.placeholders.selectPath}
                    </option>
                    {t.options.interest.map((opt) => (
                      <option key={opt} value={opt} className="bg-gray-900">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    ← {t.buttons.back}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 hover:shadow-xl"
                  >
                    {t.buttons.next} →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-green-400 font-semibold mb-3 text-lg">
                    {t.questions.goals}
                  </label>
                  <textarea
                    name="goals"
                    value={form.goals}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder={t.placeholders.goals}
                    className="w-full bg-black/40 border border-green-500/40 rounded-xl p-4 text-white placeholder-gray-400 backdrop-blur-sm focus:border-green-400 focus:outline-none focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 resize-none hover:border-green-400/60 hover:shadow-green-500/10"
                  />
                </div>

                <div>
                  <label className="block text-green-400 font-semibold mb-3 text-lg">
                    {t.questions.experience}
                  </label>
                  <select
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-green-500/40 rounded-xl p-4 text-white backdrop-blur-sm focus:border-green-400 focus:outline-none focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 hover:border-green-400/60 hover:shadow-green-500/10"
                  >
                    <option value="" disabled className="bg-gray-900">
                      {t.placeholders.selectExperience}
                    </option>
                    {t.options.experience.map((opt) => (
                      <option key={opt} value={opt} className="bg-gray-900">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-green-400 font-semibold mb-3 text-lg">
                    {t.questions.time}
                  </label>
                  <input
                    type="number"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    min={0}
                    max={168}
                    placeholder={t.placeholders.time}
                    required
                    className="w-full bg-black/40 border border-green-500/40 rounded-xl p-4 text-white placeholder-gray-400 backdrop-blur-sm focus:border-green-400 focus:outline-none focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 hover:border-green-400/60 hover:shadow-green-500/10"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    ← {t.buttons.back}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 hover:shadow-xl"
                  >
                    {t.buttons.next} →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-green-400 font-semibold mb-3 text-lg">
                    {t.questions.motivation}
                  </label>
                  <textarea
                    name="motivation"
                    value={form.motivation}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder={t.placeholders.motivation}
                    className="w-full bg-black/40 border border-green-500/40 rounded-xl p-4 text-white placeholder-gray-400 backdrop-blur-sm focus:border-green-400 focus:outline-none focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 resize-none hover:border-green-400/60 hover:shadow-green-500/10"
                  />
                </div>

                <div>
                  <label className="block text-green-400 font-semibold mb-3 text-lg">
                    {t.questions.connect}
                  </label>
                  <div className="space-y-3">
                    {t.options.connect.map((opt, idx) => (
                      <label key={idx} className="flex items-center p-4 bg-black/20 border border-green-500/20 rounded-xl cursor-pointer hover:bg-black/30 hover:border-green-400/40 transition-all duration-300 hover:scale-105">
                        <input
                          type="checkbox"
                          checked={form.connect.includes(opt)}
                          onChange={() => toggleConnect(opt)}
                          className="mr-4 w-5 h-5 text-green-500 bg-black/30 border-green-500/30 rounded focus:ring-green-400 focus:ring-2"
                        />
                        <span className="text-white">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    ← {t.buttons.back}
                  </button>
                  <button
                    type="submit"
                    disabled={!form.name || !form.email || !form.interest}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 hover:shadow-xl disabled:transform-none disabled:shadow-none"
                  >
                    ✨ {t.buttons.submit}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Social Links - Compact and Elegant */}
          <div className="mt-12 text-center">
            <p className="text-gray-300 mb-4 text-sm font-medium">🌟 Connect with us directly:</p>
            <div className="flex justify-center space-x-3">
              {Object.entries(socialLinks).map(([platform, data]) => (
                <a
                  key={platform}
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-gradient-to-r ${data.color} hover:${data.hoverColor} border border-white/20 hover:border-white/40 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg backdrop-blur-sm font-medium text-xs flex items-center space-x-1.5`}
                >
                  <span className="text-sm">{data.icon}</span>
                  <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Inspirational Quotes */}
          <div className="mt-12 text-center space-y-4">
            <p className="text-green-400 text-lg font-medium">
              {t.quotes.mission}
            </p>
            <p className="text-blue-400 text-lg font-medium">
              {t.quotes.tagline}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 