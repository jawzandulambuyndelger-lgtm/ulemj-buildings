export const company = {
  name: "ULEMJ BUILDINGS",
  parent: "Үлэмж ХХК",
  established: 1991,
  email: "info@ulemj.mn",
  phone: "+976 77770090",
  phoneHref: "+97677770090",
  facebook: "https://www.facebook.com/ulemjllc",
  website: "https://www.ulemj.mn/",
  address: null as string | null,
  businessHours: null as string | null,
  positioning: "Европ стандарт, Монгол ур чадвар, цогц бүтээн байгуулалт.",
};

export const navigation = [
  { href: "/", label: "Нүүр" },
  { href: "/about", label: "Бидний тухай" },
  { href: "/services", label: "Үйлчилгээ" },
  { href: "/products", label: "Бүтээгдэхүүн" },
  { href: "/projects", label: "Төслүүд" },
  { href: "/marble", label: "ULEMJ MARBLE" },
  { href: "/contact", label: "Холбоо барих" },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  offerings: string[];
  outcome: string;
};
export const services: Service[] = [
  {
    slug: "construction",
    title: "Барилга угсралт",
    short: "Санаанаас бодит бүтээн байгуулалт хүртэл.",
    description:
      "Барилгын ерөнхий гүйцэтгэлийг төлөвлөлт, инженерчлэл, угсралтын ажлын уялдаанд тулгуурлан зохион байгуулна. Төслийн онцлогт нийцсэн гүйцэтгэлийн шийдлийг захиалагчтай хамт тодорхойлно.",
    image: "/images/facade.jpg",
    offerings: [
      "Барилгын ерөнхий гүйцэтгэл",
      "Барилга угсралтын ажлын зохион байгуулалт",
      "Үе шатны гүйцэтгэлийн уялдаа",
    ],
    outcome: "Нэг зорилго, нэгдсэн гүйцэтгэл.",
  },
  {
    slug: "earthworks",
    title: "Газар шорооны ажил",
    short: "Найдвартай бүтээн байгуулалтын эхлэл.",
    description:
      "Талбайн бэлтгэлээс газар шорооны гүйцэтгэл хүртэлх ажлыг төслийн баримт бичиг, талбайн нөхцөл болон ажлын дараалалтай уялдуулан төлөвлөнө.",
    image: "/images/construction.jpg",
    offerings: [
      "Барилгын талбайн бэлтгэл",
      "Газар шорооны гүйцэтгэл",
      "Суурийн ажлын бэлтгэл, зохицуулалт",
    ],
    outcome: "Дараагийн үе шатанд бэлэн талбай.",
  },
  {
    slug: "project-management",
    title: "Төслийн менежмент",
    short: "Нарийн төлөвлөлт. Нэгдсэн удирдлага.",
    description:
      "Захиалагч, зураг төслийн болон гүйцэтгэгч багуудын хамтын ажиллагааг нэгтгэн, төслийн хугацаа, чанар, ажлын дарааллыг удирдах шийдэл санал болгоно.",
    image: "/images/architecture.jpg",
    offerings: [
      "Төслийн үе шатны төлөвлөлт",
      "Оролцогч талуудын ажлын зохицуулалт",
      "Чанар болон хугацааны удирдлага",
    ],
    outcome: "Мэдээлэлтэй шийдвэр, ойлгомжтой үйл явц.",
  },
  {
    slug: "architecture",
    title: "Төлөвлөлт, зураг төсөл",
    short: "Орон зай бүрт утга учир нэмнэ.",
    description:
      "Хэрэгцээ, зориулалт, архитектурын үзэл санааг инженерийн шийдэлтэй нэгтгэнэ. Төлөвлөлт болон техникийн баримт бичгийн уялдааг төслийн эхнээс анхаарна.",
    image: "/images/building-detail.jpg",
    offerings: [
      "Архитектурын төлөвлөлт",
      "Зураг төслийн зохицуулалт",
      "Техникийн баримт бичгийн бэлтгэл",
    ],
    outcome: "Гүйцэтгэлд чиглэсэн архитектур.",
  },
  {
    slug: "windows-doors",
    title: "Цонх, хаалганы үйлдвэрлэл",
    short: "Гэрэл, тав тух, нарийн хийцлэл.",
    description:
      "Вакуум шилэн багцтай цонх, PVC болон хөнгөн цагаан цонх, хаалганы шийдлийг барилгын зориулалт, хэмжээ, ашиглалтын нөхцөлд нийцүүлэн сонгоно.",
    image: "/images/interior.jpg",
    offerings: [
      "Вакуум шилэн багцтай цонх",
      "PVC цонхны систем",
      "Хөнгөн цагаан цонх, хаалга",
    ],
    outcome: "Таны орон зайд тохирсон үйлдвэрлэл.",
  },
  {
    slug: "glass-facades",
    title: "Шилэн фасадны систем",
    short: "Барилгын дүр төрхийг тодорхойлно.",
    description:
      "Архитектурын шилэн фасад, хөнгөн цагаан систем болон барилгын гадна бүрхүүлийн шийдлийг зураг төсөл, материалын сонголт, угсралттай нь цогцоор авч үзнэ.",
    image: "/images/hero.jpg",
    offerings: [
      "Архитектурын шилэн фасад",
      "Хөнгөн цагаан фасадны систем",
      "Барилгын гадна бүрхүүлийн шийдэл",
    ],
    outcome: "Инженерчлэл ба архитектурын нэгдэл.",
  },
];

export const brands = [
  {
    name: "ALUCOBOND",
    slug: "alucobond",
    category: "Фасадны систем",
    description:
      "Архитектурын гадна бүрхүүлд зориулсан хөнгөн цагаан нийлмэл хавтангийн шийдэл.",
    className: "alucobond",
  },
  {
    name: "SCHÜCO",
    slug: "schueco",
    category: "Цонх · хаалга · фасад",
    description:
      "Орчин үеийн барилгын цонх, хаалга болон шилэн фасадны цогц систем.",
    className: "schueco",
  },
  {
    name: "DECEUNINCK",
    slug: "deceuninck",
    category: "PVC цонхны систем",
    description:
      "Орон зай, хэрэглээнд нийцүүлэх боломжтой PVC цонх, хаалганы шийдэл.",
    className: "deceuninck",
  },
  {
    name: "ASTRON",
    slug: "astron",
    category: "Угсармал ган барилга",
    description:
      "Үйлдвэр, агуулахын зориулалттай угсармал ган бүтээцийн систем.",
    className: "astron",
  },
];

export type Product = {
  slug: string;
  name: string;
  brand: string;
  type: string;
  material: string;
  applications: string[];
  description: string;
  image: string;
  specifications: { label: string; value: string | null }[];
  colors: string[];
  catalog: string | null;
};
export const products: Product[] = [
  {
    slug: "alucobond-facade",
    name: "Хөнгөн цагаан нийлмэл фасад",
    brand: "ALUCOBOND",
    type: "Фасадны систем",
    material: "Хөнгөн цагаан",
    applications: ["Оффис", "Олон нийтийн барилга"],
    description:
      "Архитектурын хэлбэр, гадна бүрхүүлийн өнгө, материалын сонголтыг нэгтгэх фасадны шийдэл. Тухайн төслийн зориулалтад тохирох цуврал, хавтангийн үзүүлэлтийг албан ёсны каталогоор сонгоно.",
    image: "/images/facade.jpg",
    specifications: [
      { label: "Хавтангийн цуврал", value: null },
      { label: "Зузаан ба хэмжээ", value: null },
      { label: "Галын ангилал", value: null },
      { label: "Гадаргуу, өнгөлгөө", value: null },
    ],
    colors: [],
    catalog: null,
  },
  {
    slug: "schueco-facade",
    name: "Шилэн фасадны систем",
    brand: "SCHÜCO",
    type: "Фасадны систем",
    material: "Хөнгөн цагаан, шил",
    applications: ["Оффис", "Олон нийтийн барилга"],
    description:
      "Гэрэл, орон зай, барилгын дүр төрхийг нэгтгэсэн шилэн фасадны шийдэл. Шилэн багц болон профилийн сонголтыг төслийн тооцоо, шаардлагад тулгуурлан тодорхойлно.",
    image: "/images/hero.jpg",
    specifications: [
      { label: "Профилийн систем", value: null },
      { label: "Шилэн багц", value: null },
      { label: "Дулаан дамжуулалт", value: null },
      { label: "Дуу тусгаарлалт", value: null },
    ],
    colors: [],
    catalog: null,
  },
  {
    slug: "schueco-windows",
    name: "Хөнгөн цагаан цонхны систем",
    brand: "SCHÜCO",
    type: "Цонх, хаалга",
    material: "Хөнгөн цагаан",
    applications: ["Орон сууц", "Оффис"],
    description:
      "Архитектурын шийдэлд нийцсэн хөнгөн цагаан цонхны систем. Онгойлтын төрөл, шилэн багц, дулаан болон дуу тусгаарлах үзүүлэлтийг баталгаат техникийн баримт бичигтэй уялдуулан сонгоно.",
    image: "/images/interior.jpg",
    specifications: [
      { label: "Онгойлтын төрөл", value: null },
      { label: "Угсралтын гүн", value: null },
      { label: "Дулаан тусгаарлалт", value: null },
      { label: "Дуу тусгаарлалт", value: null },
    ],
    colors: [],
    catalog: null,
  },
  {
    slug: "deceuninck-pvc",
    name: "PVC цонх, хаалганы систем",
    brand: "DECEUNINCK",
    type: "Цонх, хаалга",
    material: "PVC",
    applications: ["Орон сууц", "Оффис"],
    description:
      "Өдөр тутмын хэрэглээ, орон зайн хэрэгцээнд нийцсэн PVC цонх, хаалганы шийдэл. Хэмжээс, өнгө, шил болон тоноглолын сонголтыг захиалгын үед мэргэжлийн багтай тохиролцоно.",
    image: "/images/architecture.jpg",
    specifications: [
      { label: "Профилийн цуврал", value: null },
      { label: "Камерын тоо", value: null },
      { label: "Дулаан тусгаарлалт", value: null },
      { label: "Дуу тусгаарлалт", value: null },
    ],
    colors: [],
    catalog: null,
  },
  {
    slug: "schueco-doors",
    name: "Хөнгөн цагаан хаалганы систем",
    brand: "SCHÜCO",
    type: "Цонх, хаалга",
    material: "Хөнгөн цагаан",
    applications: ["Олон нийтийн барилга", "Орон сууц"],
    description:
      "Орох хэсэг болон дотоод орон зайн хэрэглээнд тохируулан сонгох хөнгөн цагаан хаалганы шийдэл. Онгойлт, тоноглол, шилний сонголтыг тухайн төслийн хэрэгцээнд тулгуурлан шийднэ.",
    image: "/images/building-detail.jpg",
    specifications: [
      { label: "Хаалганы цуврал", value: null },
      { label: "Онгойлт ба тоноглол", value: null },
      { label: "Хэмжээний хязгаар", value: null },
      { label: "Дулаан тусгаарлалт", value: null },
    ],
    colors: [],
    catalog: null,
  },
  {
    slug: "astron-steel",
    name: "Угсармал ган барилгын систем",
    brand: "ASTRON",
    type: "Ган бүтээц",
    material: "Ган",
    applications: ["Үйлдвэр", "Агуулах"],
    description:
      "Үйлдвэрлэл, агуулахын зориулалтын орон зайд зориулсан угсармал ган бүтээцийн шийдэл. Алгасал, ачаалал, бүрхүүл болон ашиглалтын шаардлагыг төслийн тооцоогоор тодорхойлно.",
    image: "/images/construction.jpg",
    specifications: [
      { label: "Бүтээцийн систем", value: null },
      { label: "Алгасал, өндөр", value: null },
      { label: "Тооцооны ачаалал", value: null },
      { label: "Хана, дээврийн бүрхүүл", value: null },
    ],
    colors: [],
    catalog: null,
  },
];

export const projectCategories = [
  "Оффисын барилга",
  "Үйлдвэрийн барилга",
  "Орон сууц",
  "Олон нийтийн барилга",
  "Дэд бүтэц",
  "Фасад, үйлдвэрлэл",
];
export type Project = {
  slug: string;
  title: string;
  category: string;
  overview: string;
  note?: string;
  location: string | null;
  scope: string | null;
  materials: string[];
  gallery: { src: string; alt: string }[];
};
export const projects: Project[] = [
  {
    slug: "mms-green-building",
    title: "MMS Green Building",
    category: "Оффисын барилга",
    overview:
      "Үлэмж Билдингсийн танилцуулгад онцолсон оффисын барилгын төсөл. Төслийн дэлгэрэнгүй танилцуулга, оролцоо болон гүйцэтгэлийн мэдээллийг компанийн баталгаажуулсны дараа нийтэлнэ.",
    note: "LEED Platinum — захиалагчийн өгсөн мэдээлэл; баталгаажуулах баримт хүлээгдэж байна.",
    location: null,
    scope: null,
    materials: [],
    gallery: [],
  },
  {
    slug: "dragon-terminal",
    title: "Шинэ Улаанбаатар Драгон терминал",
    category: "Дэд бүтэц",
    overview:
      "Тээвэр, үйлчилгээний зориулалттай томоохон бүтээн байгуулалтын онцлох төсөл. Үлэмж Билдингсийн гүйцэтгэсэн ажлын хүрээ болон төслийн албан ёсны зургийг компанийн мэдээллээр баяжуулна.",
    location: null,
    scope: null,
    materials: [],
    gallery: [],
  },
  {
    slug: "toyota-munkhkhada",
    title: "Toyota Мөнххада",
    category: "Олон нийтийн барилга",
    overview:
      "Компанийн туршлагыг илэрхийлэхээр сонгосон автомашины худалдаа, үйлчилгээний зориулалттай төсөл. Гүйцэтгэлийн хүрээ, ашигласан системийн мэдээллийг баталгаажуулсны дараа нэмж оруулна.",
    location: null,
    scope: null,
    materials: [],
    gallery: [],
  },
  {
    slug: "huleg-school",
    title: "HULEG International School",
    category: "Олон нийтийн барилга",
    overview:
      "Боловсролын орчны бүтээн байгуулалтын онцлох төсөл. Төслийн байршил, ажлын цар хүрээ, материал болон зургийн мэдээллийг компанийн баталгаатай эх сурвалжаар гүйцээнэ.",
    location: null,
    scope: null,
    materials: [],
    gallery: [],
  },
];

export const marbleCategories = [
  "Гал тогооны тавцан",
  "Угаалгын өрөөний тавцан",
  "Угаалтуур",
  "Цонхны тавцан",
  "Захиалгат бүтээгдэхүүн",
];
export type MarbleColor = {
  id: string;
  name: string;
  hex: string;
  vein: string;
  family: "Цайвар" | "Дулаан" | "Бараан";
  sample: boolean;
};
const colorPairs = [
  ["#efede7", "#b4ada1", "Цайвар"],
  ["#e4e1d9", "#a29d94", "Цайвар"],
  ["#d7d5cf", "#8c8d8c", "Цайвар"],
  ["#f6f4ef", "#b7b5b1", "Цайвар"],
  ["#ddcbb3", "#9d8267", "Дулаан"],
  ["#cbb59c", "#8b715a", "Дулаан"],
  ["#bda78f", "#766858", "Дулаан"],
  ["#e7d9c6", "#bba286", "Дулаан"],
  ["#b2b2ae", "#737570", "Цайвар"],
  ["#858783", "#d4d3c8", "Бараан"],
  ["#555955", "#b5b6ae", "Бараан"],
  ["#323735", "#858b80", "Бараан"],
  ["#c6beb8", "#8e807c", "Дулаан"],
  ["#b8aca2", "#7b7068", "Дулаан"],
  ["#777570", "#beb3a2", "Бараан"],
  ["#282b2a", "#b1a98f", "Бараан"],
] as const;
export const marbleColors: MarbleColor[] = colorPairs.map(
  ([hex, vein, family], i) => ({
    id: `sample-${i + 1}`,
    name: `Жишиг ${String(i + 1).padStart(2, "0")}`,
    hex,
    vein,
    family,
    sample: true,
  }),
);
export const marbleClaims = [
  { value: "50+", label: "Өнгөний сонголт" },
  { value: "3 м", label: "Хүртэл залгаасгүй урт" },
  { value: "30%", label: "Байгалийн чулуунаас хөнгөн" },
  { value: "2–3", label: "Хоногийн үйлдвэрлэлийн боломж" },
];
export const marbleClaimNotice =
  "Захиалагчийн өгсөн бүтээгдэхүүний мэдээлэл. 50+ өнгө, 3 м урт, 30% хөнгөн, ойролцоогоор 4 дахин бат бөх, 2–3 хоногийн үйлдвэрлэлийн үзүүлэлтийг нийтлэхээс өмнө компани баталгаажуулна. Бодит хугацаа, боломжийг захиалгаар тохиролцоно.";
export const process = [
  "Төлөвлөлт",
  "Зураг төсөл",
  "Тооцоолол",
  "Үйлдвэрлэл",
  "Угсралт",
  "Суурилуулалт",
];
