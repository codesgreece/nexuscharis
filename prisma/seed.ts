import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@nexusdevstudio.gr";
  const password = process.env.ADMIN_PASSWORD || "NexusAdmin2026!Secure";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name: "Χριστόπουλος Χαράλαμπος" },
    create: {
      email,
      passwordHash,
      name: "Χριστόπουλος Χαράλαμπος",
    },
  });

  await prisma.siteSettings.deleteMany();
  await prisma.siteSettings.create({
    data: {
      siteName: "NEXUS DEV STUDIO GREECE",
      tagline: "Digital solutions designed around your business.",
      phone: "6936732844",
      email: "nexusdevstudio@outlook.com",
      logoUrl: "/images/logo.svg",
      founderImageUrl: "/images/founder.jpg",
      founderName: "Χριστόπουλος Χαράλαμπος",
      founderTitle: "Founder & Developer",
      businessHours: [
        { day: "Δευτέρα", hours: "10:00 - 15:00" },
        { day: "Τρίτη", hours: "09:00 - 21:00" },
        { day: "Τετάρτη", hours: "10:00 - 15:00" },
        { day: "Πέμπτη", hours: "09:00 - 21:00" },
        { day: "Παρασκευή", hours: "09:00 - 21:00" },
        { day: "Σάββατο", hours: "10:00 - 15:00" },
        {
          day: "Κυριακή",
          hours: "Κατόπιν συνεννόησης μέσω της φόρμας επικοινωνίας",
        },
      ],
    },
  });

  await prisma.heroContent.deleteMany();
  await prisma.heroContent.create({
    data: {
      badge: "NEXUS DEV STUDIO GREECE",
      title:
        "Ψηφιακές λύσεις που δίνουν στην επιχείρησή σου τη θέση που της αξίζει.",
      subtitle:
        "Κατασκευή σύγχρονων ιστοσελίδων, εφαρμογών και ψηφιακών λύσεων, σχεδιασμένων γύρω από τις πραγματικές ανάγκες κάθε επιχείρησης.",
      primaryCtaText: "Δες τη δουλειά μου",
      primaryCtaUrl: "#portfolio",
      secondaryCtaText: "Επικοινώνησε μαζί μου",
      secondaryCtaUrl: "#contact",
      trustLine:
        "Web Development • Applications • E-Commerce • Digital Solutions",
      stats: [
        { value: "2018", label: "Από τότε μαζί σας" },
        { value: "100%", label: "Δέσμευση στην ποιότητα" },
        { value: "24/7", label: "Υποστήριξη έργων" },
      ],
      enabled: true,
    },
  });

  await prisma.introContent.deleteMany();
  await prisma.introContent.create({
    data: {
      title: "Δεν δημιουργώ απλώς websites.",
      body: "Στόχος μου είναι να δημιουργώ ψηφιακές παρουσίες που εξυπηρετούν πραγματικές ανάγκες. Κάθε website σχεδιάζεται με βάση την επιχείρηση, το κοινό και τον στόχο του, ώστε να είναι όμορφο, γρήγορο, λειτουργικό και εύκολο στη χρήση.",
      highlight: "Η τεχνολογία πρέπει να είναι προσβάσιμη σε όλους.",
      enabled: true,
    },
  });

  await prisma.aboutContent.deleteMany();
  await prisma.aboutContent.create({
    data: {
      title: "Ποιος βρίσκεται πίσω από το NEXUS",
      description: `Ονομάζομαι Χριστόπουλος Χαράλαμπος και ασχολούμαι με την ανάπτυξη ιστοσελίδων και ψηφιακών εφαρμογών από το 2018.

Έχω ολοκληρώσει τις σπουδές μου σε τεχνικό λύκειο, στην κατεύθυνση Ανάπτυξης Εφαρμογών και Ιστοσελίδων, αποκτώντας τις βάσεις που αποτέλεσαν την αφετηρία για τη μέχρι σήμερα πορεία μου στον χώρο της τεχνολογίας.

Από το 2018 μέχρι σήμερα έχω εξελίξει τις γνώσεις και την εμπειρία μου μέσα από πραγματικά projects, επιχειρήσεις και διαφορετικές ανάγκες πελατών.

Για εμένα, η ανάπτυξη ενός website δεν είναι απλώς θέμα κώδικα. Είναι συνδυασμός σχεδιασμού, λειτουργικότητας, ταχύτητας, σωστής επικοινωνίας και κατανόησης του ανθρώπου που βρίσκεται πίσω από κάθε επιχείρηση.`,
      timeline: [
        {
          year: "2018",
          title: "Η αρχή",
          description:
            "Ξεκίνησα να ασχολούμαι ενεργά με την κατασκευή ιστοσελίδων και την ανάπτυξη ψηφιακών εφαρμογών.",
        },
        {
          year: "2020+",
          title: "Εξέλιξη",
          description:
            "Συνεχής ενασχόληση με σύγχρονες τεχνολογίες, web development και custom digital solutions.",
        },
        {
          year: "Σήμερα",
          title: "NEXUS DEV STUDIO",
          description:
            "Η εμπειρία μετατρέπεται σε ένα ολοκληρωμένο digital studio με στόχο τη δημιουργία πραγματικής αξίας για κάθε επιχείρηση.",
        },
      ],
      enabled: true,
    },
  });

  await prisma.visionContent.deleteMany();
  await prisma.visionContent.create({
    data: {
      title: "Το όραμά μου",
      statement:
        "Θέλω κάθε επιχείρηση να μπορεί να έχει μια επαγγελματική και σύγχρονη παρουσία στο διαδίκτυο.",
      description: `Πιστεύω ότι η ψηφιακή παρουσία δεν πρέπει να αποτελεί πολυτέλεια που μπορούν να αποκτήσουν μόνο οι μεγαλύτερες επιχειρήσεις.

Το NEXUS DEV STUDIO δημιουργήθηκε με έναν απλό στόχο:

Να δώσει σε κάθε επαγγελματία, freelancer, μικρή ή μεγάλη επιχείρηση τη δυνατότητα να αποκτήσει μια σύγχρονη ψηφιακή παρουσία, χωρίς περιττά κόστη και χωρίς να θυσιάζεται η ποιότητα.

Στόχος μου είναι να συνδυάζω προσιτό κόστος, σύγχρονο σχεδιασμό, σωστή τεχνολογία και πραγματική εξυπηρέτηση, ώστε κάθε project να αποτελεί μια επένδυση και όχι απλώς ένα έξοδο.`,
      principles: [
        {
          number: "01",
          title: "Προσιτό κόστος",
          description:
            "Σχεδιάζουμε λύσεις που μπορούν να προσαρμοστούν στις πραγματικές δυνατότητες κάθε επιχείρησης.",
        },
        {
          number: "02",
          title: "Ποιότητα",
          description:
            "Κάθε project αντιμετωπίζεται ως ξεχωριστή δουλειά και όχι ως ένα έτοιμο template.",
        },
        {
          number: "03",
          title: "Ικανοποίηση",
          description:
            "Στόχος δεν είναι απλώς να παραδώσουμε ένα website. Στόχος είναι να είσαι πραγματικά ικανοποιημένος με αυτό.",
        },
      ],
      enabled: true,
    },
  });

  await prisma.service.deleteMany();
  const services = [
    {
      title: "Κατασκευή Ιστοσελίδων",
      description:
        "Σύγχρονες, responsive και γρήγορες ιστοσελίδες σχεδιασμένες αποκλειστικά για την επιχείρησή σου.",
      icon: "globe",
      order: 1,
    },
    {
      title: "Landing Pages",
      description:
        "Landing pages σχεδιασμένες με έναν ξεκάθαρο στόχο: να παρουσιάσουν σωστά την υπηρεσία ή το προϊόν σου και να οδηγούν τον επισκέπτη στην επιθυμητή ενέργεια.",
      icon: "layout",
      order: 2,
    },
    {
      title: "Full Websites",
      description:
        "Ολοκληρωμένες εταιρικές και επαγγελματικές ιστοσελίδες με custom σχεδιασμό, πολλαπλές σελίδες, φόρμες επικοινωνίας και όλες τις απαραίτητες λειτουργίες.",
      icon: "layers",
      order: 3,
    },
    {
      title: "E-Commerce",
      description:
        "Ηλεκτρονικά καταστήματα με σύγχρονο σχεδιασμό, προϊόντα, κατηγορίες, παραγγελίες και διαχείριση περιεχομένου.",
      icon: "shopping-cart",
      order: 4,
    },
    {
      title: "Windows Apps",
      description:
        "Custom εφαρμογές για Windows σχεδιασμένες σύμφωνα με τις ανάγκες της επιχείρησης και της καθημερινής λειτουργίας της.",
      icon: "monitor",
      order: 5,
    },
    {
      title: "Android / Phone Apps",
      description:
        "Mobile εφαρμογές για Android και smartphones με έμφαση στην εύχρηστη εμπειρία και στις πραγματικές ανάγκες του project.",
      icon: "smartphone",
      order: 6,
    },
    {
      title: "Admin Panels",
      description:
        "Custom panels διαχείρισης που επιτρέπουν στον ιδιοκτήτη μιας επιχείρησης να ελέγχει το περιεχόμενο, τις υπηρεσίες, τις τιμές, τις παραγγελίες ή οποιοδήποτε άλλο κομμάτι της εφαρμογής.",
      icon: "settings",
      order: 7,
    },
  ];
  await prisma.service.createMany({ data: services });

  await prisma.processStep.deleteMany();
  await prisma.processStep.createMany({
    data: [
      {
        number: "01",
        title: "Συζητάμε",
        description:
          "Κατανοούμε την επιχείρηση, τις ανάγκες και τον στόχο του project.",
        icon: "message-circle",
        order: 1,
      },
      {
        number: "02",
        title: "Σχεδιάζουμε",
        description: "Δημιουργούμε τη δομή και το visual concept.",
        icon: "pen-tool",
        order: 2,
      },
      {
        number: "03",
        title: "Αναπτύσσουμε",
        description:
          "Μετατρέπουμε το concept σε πραγματικό, λειτουργικό προϊόν.",
        icon: "code-2",
        order: 3,
      },
      {
        number: "04",
        title: "Παραδίδουμε",
        description:
          "Ελέγχουμε, βελτιστοποιούμε και παραδίδουμε το τελικό project.",
        icon: "check-circle",
        order: 4,
      },
    ],
  });

  await prisma.package.deleteMany();
  await prisma.package.createMany({
    data: [
      {
        title: "Starter Website",
        description:
          "Ιδανικό για επαγγελματίες και μικρές επιχειρήσεις που χρειάζονται μια καθαρή, σύγχρονη παρουσία στο διαδίκτυο.",
        price: "από €XXX",
        oldPrice: null,
        discount: null,
        features: [
          "Έως 5 σελίδες",
          "Responsive σχεδιασμός",
          "Φόρμα επικοινωνίας",
          "Βασικό SEO",
          "Παράδοση σε συμφωνημένο χρόνο",
        ],
        ctaText: "Ζήτησε Προσφορά",
        highlighted: false,
        active: true,
        order: 1,
      },
      {
        title: "Professional Website",
        description:
          "Ολοκληρωμένη εταιρική ιστοσελίδα με custom σχεδιασμό και όλες τις απαραίτητες λειτουργίες για ανάπτυξη.",
        price: "από €XXX",
        oldPrice: null,
        discount: null,
        features: [
          "Έως 10 σελίδες",
          "Custom UI/UX",
          "SEO optimization",
          "Blog / Νέα",
          "Admin διαχείριση περιεχομένου",
          "Analytics setup",
        ],
        ctaText: "Ζήτησε Προσφορά",
        highlighted: true,
        active: true,
        order: 2,
      },
      {
        title: "Business / E-Commerce",
        description:
          "Ηλεκτρονικό κατάστημα ή business platform με προϊόντα, παραγγελίες και διαχείριση.",
        price: "από €XXX",
        oldPrice: null,
        discount: null,
        features: [
          "Κατάλογος προϊόντων",
          "Καλάθι & παραγγελίες",
          "Admin panel",
          "Πληρωμές (κατόπιν συμφωνίας)",
          "Responsive design",
          "SEO & performance",
        ],
        ctaText: "Ζήτησε Προσφορά",
        highlighted: false,
        active: true,
        order: 3,
      },
      {
        title: "Custom Project",
        description:
          "Ειδική λύση σχεδιασμένη αποκλειστικά γύρω από τις ανάγκες της επιχείρησής σου.",
        price: "Κατόπιν συνεννόησης",
        oldPrice: null,
        discount: null,
        features: [
          "Ανάλυση αναγκών",
          "Custom architecture",
          "Web ή mobile apps",
          "Admin panels",
          "Συνεχής υποστήριξη",
        ],
        ctaText: "Επικοινώνησε μαζί μου",
        highlighted: false,
        active: true,
        order: 4,
      },
    ],
  });

  // Portfolio intentionally empty — no fake projects

  await prisma.sEOSettings.deleteMany();
  const seoPages: Prisma.SEOSettingsCreateManyInput[] = [
    {
      pageKey: "home",
      title:
        "NEXUS DEV STUDIO GREECE | Κατασκευή Ιστοσελίδων & Εφαρμογών",
      metaDescription:
        "Το NEXUS DEV STUDIO GREECE δημιουργεί σύγχρονες ιστοσελίδες, landing pages, e-shops, Windows και mobile εφαρμογές και custom admin panels.",
      keywords:
        "κατασκευή ιστοσελίδων, web developer Ελλάδα, κατασκευή e-shop, landing page, κατασκευή εφαρμογών, admin panels",
      ogTitle: "NEXUS DEV STUDIO GREECE",
      ogDescription:
        "Ψηφιακές λύσεις που δίνουν στην επιχείρησή σου τη θέση που της αξίζει.",
      ogImage: "/images/founder.jpg",
      robots: "index, follow",
    },
    {
      pageKey: "about",
      title: "Σχετικά | NEXUS DEV STUDIO GREECE",
      metaDescription:
        "Γνώρισε τον Χριστόπουλο Χαράλαμπο, founder & developer του NEXUS DEV STUDIO GREECE.",
      keywords: "web developer Ελλάδα, Χριστόπουλος Χαράλαμπος, NEXUS DEV STUDIO",
    },
    {
      pageKey: "services",
      title: "Υπηρεσίες | NEXUS DEV STUDIO GREECE",
      metaDescription:
        "Κατασκευή ιστοσελίδων, landing pages, e-shops, Windows apps, mobile apps και admin panels.",
      keywords:
        "κατασκευή ιστοσελίδων, κατασκευή landing page, κατασκευή e-shop, Windows εφαρμογές",
    },
    {
      pageKey: "packages",
      title: "Πακέτα & Τιμές | NEXUS DEV STUDIO GREECE",
      metaDescription:
        "Διάλεξε το πακέτο που σου ταιριάζει: Starter, Professional, Business / E-Commerce ή Custom Project.",
      keywords: "τιμές ιστοσελίδας, πακέτα κατασκευής ιστοσελίδων",
    },
    {
      pageKey: "portfolio",
      title: "Portfolio | NEXUS DEV STUDIO GREECE",
      metaDescription:
        "Δες τα projects και τις ψηφιακές δημιουργίες του NEXUS DEV STUDIO GREECE.",
      keywords: "portfolio web development Greece",
    },
    {
      pageKey: "contact",
      title: "Επικοινωνία | NEXUS DEV STUDIO GREECE",
      metaDescription:
        "Επικοινώνησε με το NEXUS DEV STUDIO GREECE για προσφορά κατασκευής ιστοσελίδας ή εφαρμογής.",
      keywords: "επικοινωνία web developer, προσφορά ιστοσελίδας",
    },
  ];
  await prisma.sEOSettings.createMany({ data: seoPages });

  console.log("Seed completed successfully.");
  console.log(`Admin: ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
