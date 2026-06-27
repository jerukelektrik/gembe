import type {
  LeftChoiceAlert,
  LeftChoiceBranchMeta,
  LeftChoiceCompetitor,
  LeftChoiceContentIssue,
  LeftChoiceGeoCell,
  LeftChoicePost,
  LeftChoiceRanking,
  LeftChoiceReportSummary,
  LeftChoiceReview
} from './types';

export const leftChoiceBranchNames: Record<string, string> = {
  'mock-1': 'Brain Academy Bandung',
  'mock-2': 'English Academy Bekasi',
  'mock-3': 'Ruangguru Privat Depok',
  'mock-4': 'Cabang Pak Budi Depok',
  'mock-5': 'MatChamps Surabaya Manyar',
  'mock-6': 'Alta Global School Jakarta Selatan',
  'mock-7': 'Wonderlab Tangerang BSD',
  'mock-8': 'Brain Academy Yogyakarta Seturan',
  'mock-9': 'English Academy Medan',
  'mock-10': 'Ruangguru Privat Semarang',
  'mock-11': 'Brain Academy Makassar Panakkukang',
  'mock-12': 'Wonderlab Bandung Dago'
};

export const leftChoiceBranchMeta: LeftChoiceBranchMeta[] = [
  { branchId: 'mock-1', city: 'Bandung', province: 'Jawa Barat', owner: 'SEO West Java', profileStrength: 71, completionScore: 62, suspensionRisk: 'low', issues: ['Rating below target', 'Needs fresh classroom photos'] },
  { branchId: 'mock-2', city: 'Bekasi', province: 'Jawa Barat', owner: 'English Academy Ops', profileStrength: 78, completionScore: 69, suspensionRisk: 'low', issues: ['Review count below target'] },
  { branchId: 'mock-3', city: 'Depok', province: 'Jawa Barat', owner: 'Privat Growth', profileStrength: 42, completionScore: 35, suspensionRisk: 'medium', issues: ['Unverified profile', 'Missing store code'] },
  { branchId: 'mock-4', city: 'Depok', province: 'Jawa Barat', owner: 'SEO Central', profileStrength: 31, completionScore: 28, suspensionRisk: 'medium', issues: ['Needs brand mapping', 'Missing store code'] },
  { branchId: 'mock-5', city: 'Surabaya', province: 'Jawa Timur', owner: 'MatChamps Ops', profileStrength: 93, completionScore: 91, suspensionRisk: 'low', issues: ['Monitor competitor gain'] },
  { branchId: 'mock-6', city: 'Jakarta Selatan', province: 'DKI Jakarta', owner: 'Alta Brand Team', profileStrength: 88, completionScore: 86, suspensionRisk: 'low', issues: ['Google suggested update pending'] },
  { branchId: 'mock-7', city: 'Tangerang Selatan', province: 'Banten', owner: 'Wonderlab Ops', profileStrength: 96, completionScore: 94, suspensionRisk: 'low', issues: ['High performer'] },
  { branchId: 'mock-8', city: 'Yogyakarta', province: 'DI Yogyakarta', owner: 'SEO Central', profileStrength: 18, completionScore: 20, suspensionRisk: 'high', issues: ['Suspended listing', 'Traffic collapsed'] },
  { branchId: 'mock-9', city: 'Medan', province: 'Sumatera Utara', owner: 'English Academy Ops', profileStrength: 74, completionScore: 63, suspensionRisk: 'medium', issues: ['Rating below target', 'Ranking drop'] },
  { branchId: 'mock-10', city: 'Semarang', province: 'Jawa Tengah', owner: 'Privat Growth', profileStrength: 58, completionScore: 51, suspensionRisk: 'medium', issues: ['Pending review', 'Need 10+ reviews'] },
  { branchId: 'mock-11', city: 'Makassar', province: 'Sulawesi Selatan', owner: 'Brain Academy Ops', profileStrength: 94, completionScore: 92, suspensionRisk: 'low', issues: ['High performer'] },
  { branchId: 'mock-12', city: 'Bandung', province: 'Jawa Barat', owner: 'Wonderlab Ops', profileStrength: 67, completionScore: 59, suspensionRisk: 'medium', issues: ['Missing store code', 'Need category audit'] }
];

export const leftChoiceReviews: LeftChoiceReview[] = [
  { id: 'rev-1', branchId: 'mock-8', reviewer: 'Rani P.', rating: 1, sentiment: 'negative', status: 'pending', text: 'Cabangnya tidak muncul di Maps saat saya cari alamatnya.', suggestedReply: 'Halo Kak Rani, maaf atas kendalanya. Tim kami sedang mengecek status listing cabang ini agar informasi alamat kembali akurat di Google Maps.', createdAt: '2026-06-26T09:20:00.000Z' },
  { id: 'rev-2', branchId: 'mock-9', reviewer: 'Andreas', rating: 3, sentiment: 'neutral', status: 'drafted', text: 'Kelasnya bagus, tapi admin lama membalas pertanyaan jadwal.', suggestedReply: 'Halo Kak Andreas, terima kasih atas masukannya. Kami akan bantu evaluasi respons admin agar informasi jadwal bisa diterima lebih cepat.', createdAt: '2026-06-25T15:10:00.000Z' },
  { id: 'rev-3', branchId: 'mock-7', reviewer: 'Dewi L.', rating: 5, sentiment: 'positive', status: 'replied', text: 'Trial class Wonderlab BSD seru, anak saya langsung mau ikut lagi.', suggestedReply: 'Terima kasih Kak Dewi. Senang sekali mendengar pengalaman trial class-nya menyenangkan untuk anak Kakak.', createdAt: '2026-06-24T11:05:00.000Z' },
  { id: 'rev-4', branchId: 'mock-2', reviewer: 'Nadia', rating: 4, sentiment: 'positive', status: 'approved', text: 'Tutor English Academy komunikatif, cuma parkir kadang penuh.', suggestedReply: 'Terima kasih Kak Nadia. Kami senang tutor membantu dengan baik, dan masukan soal parkir akan kami teruskan ke tim cabang.', createdAt: '2026-06-23T08:35:00.000Z' },
  { id: 'rev-5', branchId: 'mock-3', reviewer: 'Bima', rating: 2, sentiment: 'negative', status: 'pending', text: 'Nomor telepon di Google tidak bisa dihubungi.', suggestedReply: 'Halo Kak Bima, mohon maaf atas ketidaknyamanannya. Kami akan cek dan perbarui nomor kontak cabang secepatnya.', createdAt: '2026-06-22T13:42:00.000Z' }
];

export const leftChoiceContentIssues: LeftChoiceContentIssue[] = [
  { id: 'ci-1', branchId: 'mock-1', type: 'photo', severity: 'warning', title: 'Classroom photos are stale', recommendation: 'Upload 6 fresh classroom and front-building photos for Bandung.', owner: 'SEO West Java' },
  { id: 'ci-2', branchId: 'mock-6', type: 'description', severity: 'info', title: 'Description can mention admission program', recommendation: 'Add concise admission and curriculum copy for Alta Global School.', owner: 'Alta Brand Team' },
  { id: 'ci-3', branchId: 'mock-12', type: 'category', severity: 'critical', title: 'Primary category needs review', recommendation: 'Confirm whether Wonderlab Bandung should use learning center or children education category.', owner: 'Wonderlab Ops' },
  { id: 'ci-4', branchId: 'mock-3', type: 'service', severity: 'critical', title: 'Private tutoring services missing', recommendation: 'Add SD, SMP, SMA, UTBK, and language tutoring service entries.', owner: 'Privat Growth' },
  { id: 'ci-5', branchId: 'mock-5', type: 'brand-asset', severity: 'info', title: 'Logo is correct, cover can be improved', recommendation: 'Use MatChamps campaign cover for July math bootcamp.', owner: 'MatChamps Ops' }
];

export const leftChoicePosts: LeftChoicePost[] = [
  { id: 'post-1', branchId: 'mock-5', brandId: 'mathchamps', campaign: 'July Math Booster', type: 'offer', status: 'scheduled', scheduledFor: '2026-07-01T09:00:00.000Z', utmLabel: 'gmb_mchamps_july_booster_sby' },
  { id: 'post-2', branchId: 'mock-7', brandId: 'wonderlab', campaign: 'Weekend STEM Trial', type: 'trial-class', status: 'published', scheduledFor: '2026-06-25T10:00:00.000Z', utmLabel: 'gmb_wonderlab_bsd_trial' },
  { id: 'post-3', branchId: 'mock-6', brandId: 'altaglobal-school', campaign: 'Open House AGS', type: 'open-house', status: 'draft', scheduledFor: '2026-07-04T08:30:00.000Z', utmLabel: 'gmb_ags_open_house_jks' },
  { id: 'post-4', branchId: 'mock-9', brandId: 'englishacademy', campaign: 'IELTS Prep Intake', type: 'event', status: 'failed', scheduledFor: '2026-06-26T12:00:00.000Z', utmLabel: 'gmb_ea_medan_ielts' },
  { id: 'post-5', branchId: 'mock-11', brandId: 'brainacademy', campaign: 'UTBK Early Prep', type: 'update', status: 'scheduled', scheduledFor: '2026-07-02T11:00:00.000Z', utmLabel: 'gmb_ba_mks_utbk' }
];

export const leftChoiceRankings: LeftChoiceRanking[] = [
  { id: 'rank-1', branchId: 'mock-1', brandId: 'brainacademy', city: 'Bandung', keyword: 'bimbel terdekat', currentRank: 6, previousRank: 4, topCompetitor: 'Ganesha Operation Bandung' },
  { id: 'rank-2', branchId: 'mock-2', brandId: 'englishacademy', city: 'Bekasi', keyword: 'kursus bahasa inggris bekasi', currentRank: 3, previousRank: 5, topCompetitor: 'EF Bekasi' },
  { id: 'rank-3', branchId: 'mock-5', brandId: 'mathchamps', city: 'Surabaya', keyword: 'les matematika surabaya', currentRank: 2, previousRank: 3, topCompetitor: 'Kumon Manyar' },
  { id: 'rank-4', branchId: 'mock-8', brandId: 'brainacademy', city: 'Yogyakarta', keyword: 'bimbel jogja', currentRank: 18, previousRank: 7, topCompetitor: 'Primagama Jogja' },
  { id: 'rank-5', branchId: 'mock-10', brandId: 'ruangguru-privat', city: 'Semarang', keyword: 'les privat semarang', currentRank: 11, previousRank: 9, topCompetitor: 'Superprof Semarang' },
  { id: 'rank-6', branchId: 'mock-7', brandId: 'wonderlab', city: 'Tangerang Selatan', keyword: 'kelas coding anak bsd', currentRank: 1, previousRank: 2, topCompetitor: 'Coding Bee BSD' }
];

export const leftChoiceGeoCells: LeftChoiceGeoCell[] = Array.from({ length: 25 }, (_, index) => {
  const x = index % 5;
  const y = Math.floor(index / 5);
  const distance = Math.abs(x - 2) + Math.abs(y - 2);
  return {
    id: `geo-${index + 1}`,
    branchId: 'mock-7',
    keyword: 'kelas coding anak bsd',
    x,
    y,
    rank: Math.max(1, 1 + distance * 3 + (index % 3))
  };
});

export const leftChoiceCompetitors: LeftChoiceCompetitor[] = [
  { id: 'comp-1', branchId: 'mock-1', name: 'Ganesha Operation Bandung', category: 'Bimbel', city: 'Bandung', rating: 4.7, reviews: 122, keywordRank: 2, completeness: 88, gap: 'Higher review volume and stronger keyword rank.' },
  { id: 'comp-2', branchId: 'mock-2', name: 'EF Bekasi', category: 'English course', city: 'Bekasi', rating: 4.6, reviews: 210, keywordRank: 2, completeness: 91, gap: 'Competitor has 30x more reviews.' },
  { id: 'comp-3', branchId: 'mock-5', name: 'Kumon Manyar', category: 'Math tutoring', city: 'Surabaya', rating: 4.5, reviews: 64, keywordRank: 4, completeness: 80, gap: 'LeftChoice branch wins ranking but needs more photos.' },
  { id: 'comp-4', branchId: 'mock-7', name: 'Coding Bee BSD', category: 'Coding class', city: 'Tangerang Selatan', rating: 4.8, reviews: 98, keywordRank: 3, completeness: 87, gap: 'Wonderlab leads ranking, competitor leads reviews.' }
];

export const leftChoiceAlerts: LeftChoiceAlert[] = [
  { id: 'alert-1', branchId: 'mock-8', severity: 'critical', type: 'suspended-listing', title: 'Brain Academy Yogyakarta suspended', detail: 'Listing is suspended and local actions dropped more than 80%.', createdAt: '2026-06-27T03:10:00.000Z' },
  { id: 'alert-2', branchId: 'mock-3', severity: 'warning', type: 'sync-warning', title: 'Ruangguru Privat Depok not verified', detail: 'Profile cannot count toward register rate until verification is completed.', createdAt: '2026-06-26T10:00:00.000Z' },
  { id: 'alert-3', branchId: 'mock-9', severity: 'warning', type: 'ranking-drop', title: 'English Academy Medan ranking dropped', detail: 'Keyword "kursus bahasa inggris medan" moved outside top 10.', createdAt: '2026-06-25T07:15:00.000Z' },
  { id: 'alert-4', branchId: 'mock-5', severity: 'info', type: 'profile-drop', title: 'MatChamps Surabaya has competitor pressure', detail: 'Competitor review velocity increased this week.', createdAt: '2026-06-24T04:00:00.000Z' },
  { id: 'alert-5', branchId: 'mock-1', severity: 'warning', type: 'negative-review', title: 'Brain Academy Bandung rating below target', detail: 'Average rating is below 4.5, affecting completion score.', createdAt: '2026-06-23T06:40:00.000Z' }
];

export const leftChoiceReports: LeftChoiceReportSummary[] = [
  { brandId: 'brainacademy', profileStrength: 69, reviewResponseRate: 66, rankingDrops: 2, openAlerts: 2 },
  { brandId: 'englishacademy', profileStrength: 76, reviewResponseRate: 78, rankingDrops: 1, openAlerts: 1 },
  { brandId: 'ruangguru-privat', profileStrength: 50, reviewResponseRate: 40, rankingDrops: 1, openAlerts: 1 },
  { brandId: 'mathchamps', profileStrength: 93, reviewResponseRate: 88, rankingDrops: 0, openAlerts: 1 },
  { brandId: 'wonderlab', profileStrength: 82, reviewResponseRate: 92, rankingDrops: 0, openAlerts: 0 }
];
