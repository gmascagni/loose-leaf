// Seed initial verified tea purveyors and tea lots to Cloud Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { SHOWCASE_ROASTERS } from '../src/data/roasterShowcaseData.js';

const firebaseConfig = {
  apiKey: "AIzaSyCd8SH02GSmhtAu9rNOPRdnOdv-LK99LL8",
  authDomain: "thebrewapp-live.firebaseapp.com",
  projectId: "thebrewapp-live",
  storageBucket: "thebrewapp-live.firebasestorage.app",
  messagingSenderId: "99852741602",
  appId: "1:99852741602:web:6d18def26d37362ac9a7bb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  console.log('🚀 Starting Cloud Firestore seed for LooseLeaf...');
  let purveyorCount = 0;
  let teaCount = 0;

  for (const purveyor of SHOWCASE_ROASTERS) {
    const purveyorSlug = purveyor.slug || purveyor.id;
    const purveyorDoc = {
      id: purveyor.id,
      slug: purveyorSlug,
      name: purveyor.name,
      tagline: purveyor.tagline || '',
      founded: purveyor.founded || '',
      city: purveyor.city || '',
      state: purveyor.state || '',
      country: purveyor.country || 'Japan',
      founders: purveyor.founders || [],
      website: purveyor.website || '',
      shopUrl: purveyor.shopUrl || '',
      recommendedWater: purveyor.recommendedWater || null,
      updatedAt: new Date().toISOString()
    };

    console.log(`Uploading purveyor: ${purveyor.name} (${purveyorSlug})`);
    await setDoc(doc(db, 'purveyors', purveyorSlug), purveyorDoc, { merge: true });
    purveyorCount++;

    const teas = purveyor.teas || [];
    if (Array.isArray(teas)) {
      for (const tea of teas) {
        const teaId = tea.id || `tea_${Date.now()}`;
        const teaDoc = {
          ...tea,
          id: teaId,
          purveyor: purveyor.name,
          purveyorSlug: purveyorSlug,
          updatedAt: new Date().toISOString()
        };

        console.log(`  -> Uploading tea: ${tea.teaName || tea.beanName} (UPC: ${tea.upc || 'N/A'})`);
        await setDoc(doc(db, 'teas', teaId), teaDoc, { merge: true });
        if (tea.upc) {
          await setDoc(doc(db, 'teas', `upc_${tea.upc}`), teaDoc, { merge: true });
        }
        teaCount++;
      }
    }
  }

  console.log(`\n🎉 Seed Complete! Uploaded ${purveyorCount} tea purveyors and ${teaCount} teas to Cloud Firestore.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Error during Firestore seed:', err);
  process.exit(1);
});
