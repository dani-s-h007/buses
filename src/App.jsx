import React, { useState, useEffect } from 'react';
import { 
  Bus, Search, MapPin, MessageCircle, Clock, Users, AlertCircle, 
  Share2, ThumbsUp, MessageSquare, ChevronRight, PlusCircle, Save,
  ArrowRightLeft, Phone, Heart, Shield, HelpCircle, X, Menu, Home,
  Edit3, CheckCircle, Info, PlusSquare, Map, AlertTriangle
} from 'lucide-react';

// --- FIREBASE IMPORTS ---
import { initializeApp } from "firebase/app";
import { 
  getFirestore, collection, onSnapshot, addDoc, updateDoc, doc, arrayUnion, query, orderBy, increment, getDoc 
} from "firebase/firestore";

// --- FIREBASE CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyBeVILObopCwtXjmvwF4yEK-7e4GHpDK4c",
  authDomain: "navigo-87763.firebaseapp.com",
  projectId: "navigo-87763",
  storageBucket: "navigo-87763.firebasestorage.app",
  messagingSenderId: "673907255197",
  appId: "1:673907255197:web:c61b88cad3ea149c787174",
  measurementId: "G-PN4XNZ8JSF"
};

// Initialize Firebase
let db;
try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (e) {
  console.warn("Firebase not connected. Please update firebaseConfig.");
}

// --- CONSTANTS ---
const BUS_STOPS = [
  "THIRUVANANTHAPURAM","KOTTAYAM","ALUVA","VYTILLA HUB","THRISSUR","ERNAKULAM","ALAPPUZHA","KOTTARAKKARA","CHANGANASSERY","KOLLAM","THIRUVALLA","CHERTHALA","KOZHIKKODE","KAYAMKULAM","CHALAKUDY","KARUNAGAPPALLY","MUVATTUPUZHA","ANKAMALY","ATTINGAL","NEYYATTINKARA","THRIPPUNITHURA","NEDUMANGAD","ADOOR","ETTUMANOOR","TRIVANDRUM","PUTHUKKAD","VENJARAMOODU","CHENGANNUR","PALA","KATTAKKADA","PERUMBAVOOR","KANIYAPURAM","KILIMANOOR","PUNALUR","PATHANAMTHITTA","OACHIRA","PALAKKAD","NORTH PARAVOOR","HARIPPAD","KANJIRAPALLY","CHATHANNOOR","CHADAYAMANGALAM","PAPPANAMCODE","AYOOR","BALARAMAPURAM","PANDALAM","MANANTHAVADY","KALPETTA","KOTTIYAM","KUNNAMKULAM","AMBALAPPUZHA","KOOTHATTUKULAM","THAMARASSERY","BANGALORE","PARASSALA","EDAPPAL","MEDICAL COLLEGE THIRUVANANTHAPURAM","MUNDAKKAYAM","THODUPUZHA","PONKUNNAM","KAZHAKKOOTTAM","KASARAGOD","KOTTAKKAL","KALIYIKKAVILA","CHAVARA","KUNDARA","KODUNGALLUR","GURUVAYOOR","EAST FORT","POOVAR","KUNNAMANGALAM","CHINNAKKADA","AROOR","KUTTIPPURAM","ERAMALLOOR","THURAVOOR","VAIKKOM","ERNAKULAM JETTY","PATTOM","VIZHINJAM","PATHANAPURAM","EDAPALLI BYE-PASS JN","ERATTUPETTA","ATHANI","CALICUT UNIVERSITY","PEROORKADA","KOZHENCHERRY","THALAYOLAPARAMBU","VARAPPUZHA","KOONAMMAVU","ADIVAARAM","PERINTHALMANNA","SREEKARYAM","VADANAPPALLY","KUTHIYATHODE","KOLENCHERY","KARICODE","ERUMELY","KANHANGAD","KANNUR","EZHUKONE","KARAKULAM","AMBALLUR","PUTHENKURISH","CHAVAKKAD","SULTAN BATHERY","PEYAD","POTHENCODE","PUTHENPALAM","THIRUMALA","KARETTU","VALANCHERY","KALAMASSERY","VELLARADA","VADAKKENCHERRY","KUNDANOOR","VANDANAM MEDICAL COLLEGE","PARIPPALLY","PIRAVOM","MARAMPALLY","KODAKARA","CHINGAVANAM","ANCHAL","THRIPRAYAR","KODUVALLY","VELLANAD","KARAKONAM","MATHILAKAM","MOONUPEEDIKA","CHULLIMANOOR","ARYANAD","UDIYANKULANGARA","KOTHAMANGALAM","ALAMCODE","MANGALAPURAM","VEMBAYAM","KALLAMBALAM","MUKKOLA","KUTTIKKANAM","PAMPADY","ALATHUR","EDATHUVA","VALAKOM","KUZHALMANNAM","OLLUR","VADAKARA","THALASSERY","ANGAMALY","THIRUVALLOM","RAMANATTUKARA","BHARANAMGANAM","KATTAPPANA","KUNNIKODE","KONNI","PANAMARAM","RANNY","THIRUVANKULAM","ENGAPUZHA","KOVALAM","PALODE","K.CHAPPATH","AZHAKULAM","KOZHIKODE","KARUKACHAL","MARANALLOOR","KUMILY","MALAYINKEEZH","KALLARA","POOVACHAL","KALLUVATHUKKAL","KURAVILANGAD","VYTHIRI","MAVELIKKARA","MALAPPURAM","CHAKKULATHUKAVU","THACHOTTU KAVU","RAMANKARI","KOILANDI","VITHURA","KAKKANAD","THOTTAPPALLY","MONCOMBU","KANJIKKUZHY","KORATTY","KALOOR","KANJIRAMKULAM","NILAMEL","NEDUMUDY","MANNARKAD","MALLAPPALLY","THENMALA","KOTTAPURAM","PONNANI","KARUKUTTY","KALAVOOR","NILAMBUR","PATTAMBI","KIDANGARA","LAKKIDI","MEENANGADI","KONDOTTY","PANACHAMOODU","KADUTHURUTHY","VAMANAPURAM","ELANTHOOR","MANNUTHY","KAMBALAKKAD","THOPPUMPADY","MYSORE","BHARANIKKAVU","KUTTICHAL","VANDIPERIYAR","MUHAMMA","PUTHIYATHURA","MANGALORE","KADAKKAL","PEERMEDU","KANJIRAMATTOM","KULATHUPUZHA","UCHAKADA","KIDANGOOR","MAHE","POOTHOTTA","PATTIKKAD","PUTHUKAD","CHARUMMOODU","ELAMBAL","VATTAPPARA","OLATHANI","MADATHARA","THALAPPAADI","WALAYAR","COIMBATORE","MUTTOM","KALLADIKODE","PAYYANNUR","ENATH","THOTTILPALAM","THAKAZHY","UZHAMALAKKAL","KESAVADASAPURAM","MALA","OTTASEKHARAMANGALAM","PAZHAYAKADA","MANJESHWAR","TIRUR","THALIPARAMBA","UPPALA","NELLIMOODU","ARANMULA","THANNEERMUKKOM","KURUPPANTHARA","KUMBLA","KUTTIADY","OORUTTAMBALAM","KALLISSERY","MANNANCHERY","MANJERI","MANDAPATHINKADAVU","KURAMPALA","MUNDUR","CHERUVATHOOR","EDAKOCHI","CHETTIKULANGARA","MARTHANDAM","ELAPPARA","ULLIYERI","UZHAVOOR","THATTATHUMALA","THEKKADA","TVM GENERAL HOSPITAL","IRINJALAKUDA","UCHAKKADA","SASTHAMKOTTA","KALLIKKAD","NEELESWARAM","KURUPPAMPADY","NAGERCOVIL","MARAKKULAM","CHAKKA","CHENGANNUR RS","OORAMBU","KARAKKAD","MOOLAMATTOM","VARKALA","MANOOR","PERUMATHURA","CHENKAVILA","CHAMRAVATTOM","MUNNAR","VAZHIKKADAVU","NERIAMANGALAM","KUTTIPURAM","THENKASI","POOYAPPALLY","PULLAD","THIRUVAMBADY","MURUKKUMPUZHA","KALAYAPURAM","KUMARAKOM","KARUNAGAPPALLI","ERAVIPEROOR","RAMAPURAM","AMBALAPUZHA","VENJARAMMOODU","ARYANKAVU","PERAMBRA","CHIRAYINKEEZHU","NEDUMKANDAM","NANNIYODE","ADIMALY","PUTHUKURICHY","ANCHALUMMOODU","ARAKKUNNAM","PAIKA","COIMBATORE UKKADAM","KATTANAM","THOLICODE","CHERAI","CHERUTHONI","KUMARAMPUTHUR","THANNEERMUKKOM","NADAKKAVU","MUKKAM","NATTUKAL","NOORANADU","VYPIN","PAZHAKULAM","DHANUVACHAPURAM","NJARACKAL","SHENKOTTAI","MUNDELA","PARIYAARAM","HARIPAD","KOTTAYAM MCH","VILAPPILSALA","ATHIKKATTUKULANGARA","ARUMANOOR","KARIVELLUR","BEKAL","MAKKARAPARAMBA","OYOOR","MANNAR","NELLIKUNNAM","SASTHAMANGALAM","PALLIKKAL","HIGH COURT","OTTAPALAM","VATTIYOORKAVU","CHEMBOOR","ATHOLI","PUTHUPPALLY","CHITTUMALA","MARAYAMUTTOM","VENNIKULAM","THALAYAZHAM","KADAMPANAD","MANIMALA","CHAMPAKULAM","ELATHUR","PUTHOOR","PUTHANANGADY","ERUTHAVOOR","THALAPPUZHA","PULPALLY","IRINCHAYAM","POLLACHI","ANCHALPETTY","CHUNGATHARA","VENGANOOR","YEROOR","ELANJI","KALLODY","MUKKOOTTUTHARA","KOKKADU","KURUMASSERY","KIZHAKKAMBALAM","KATTIKULAM","PAYYOLI","AIMS HOSPITAL","VARANAD","PARAMBATH","EDAKKARA","KARAVALOOR","ARUVIKKARA","KOZHIKODE UNIVERSITY","NAGAROOR","KAVALAM","PARAPPANANGADI","PATHIRIPPALA","URAKAM","PAPPINISSERI","PERAYAM","THEKKUMBHAGAM","NADUVANNUR","CHANGARAMKULAM","THEMPAMMOODU","VEEYAPURAM","KANNANALLOOR","VELLAMUNDA","PATTAZHY","TANUR","PERUMKADAVILA","BALUSSERY","THEVARA","CHITHARA","ODANAVATTOM","PATTIMATTOM","NEYYAR DAM","KOOTTANAD","VELIYAM","KARUNAGAPALLY","PULINKUNNU","VELLANGALLUR","HMT KALAMASSERY","KALLAR","IRITTY","PADAPPANAL","VAZHICHAL","MITHIRMALA","KOZHINJAMPARA","MANNAMKONAM","CHOONDY","ANNAMANADA","KADINAMKULAM","MUTHUVILA","PANAVOOR","PEREKONAM","EDAVANNA","OONNUKAL","KOOVAPPALLY","MONIPPALLY","KOLLAM CIVIL STATION","KUNNATHUR","CHOTTANIKARA","MOOZHY","PERINGAMMALA","KAMUKINCODE","THALACHIRA","WANDOOR","PUNNAMOODU","KOZHIKKODE MCH","POZHIYOOR","ANDOORKONAM","PAKALKURI","POONJAR","ANACHAL","AYATHIL","ASHTAMICHIRA","NIRAVILPUZHA","KUTTAMASSERY","EDAMON","THAMARAKULAM","AMBALAMKUNNU","CHALAKKUDY","PERUVA","AROOKUTTY","GOPALAPURAM","VAZHAKULAM","ELAVUMTHITTA","AREACODE","AMBOORI","KAROOR","CHITTOOR","MEEYANNOOR","NEDUMBASSERY AIRPORT","CHERKALA","NIT CALICUT","KADAPUZHA","ELAMKADU","POONOOR","ILLIKKAL","OLAVAKODE","EDAKKAD","ALUR","NADAVAYAL","OMASSERY","PAMBAVALLEY","PANDIKKAD","CHALLIMUKKU","MEPPADI","KAVANATTINKARA","KALADY","MARANGATTUPALLY","THOTTAKKAD","CHELACHUVADU","PUDUNAGARAM","SHORNUR","KOOTTAPPU","VELI","VALLUVAMBRAM","BEENACHI","MANJANIKKARA","ARYANCODE","CHERUPUZHA","VADASSERIKKARA","PLAMOOTTUKADA","KULAMAVU","ANAKKAMPOYIL","TEEKOY","UPPUTHARA","THOOKKUPALAM","NELLAD","PANGODU","GUNDULPET","POOVATHUSSERY","PAIPAD","KUDAPPANAMOODU","MARYKULAM","ANAYADI","KULATHOOR HS","CHATHANAD","MARAPPALAM","CHUNKAPPARA","NANJANGUD","KENGERI","KOODAL","KUNNAMTHANAM","PULLURAMPARA","POOCHAKKAL","CHERIYAKONNI","PARA","MOOLITHODU","KUTTA COORG","KODUNGOOR","UPPUKANDAM","THOLPETTY","KAYAMKULAM RS","KANJAR","VALAT","MEENKUNNAM","AYIRAMTHENGU","THAMARAKUDY","KOZHIKKOD UNIVERSITY","ALL SAINTS COLLEGE","CHOZHIYAKODU","NELLIMATTOM","KALLOOPPARA","MANDYA","KAKKATTIL","KOTTOOR","PERINGAMALA","CHAKKUVARAKKAL","NADAPURAM","AZHEEKKAL","CHUNAKKARA","PALAPPETTY","KORUTHODU","KOLLAPALLY","CHERIAZHEEKKAL","VALLIKKUNNU","PALLICKATHODU","PERUMBALAM","DASANAKKARA","PAKKOM","PAINGOTTOOR","PUTHUSSERY","SALEM","VELIYANNOOR","KENICHIRA","KANJIRAPPALLY","UMMANNOOR","KUZHIMAVU","PADINJARETHARA","MUTHUKULAM","BHAGAVATHIPURAM","ANAPPARA","ARATTUPUZHA","VLATHANKARA","WADAKKANCHERY","POOZHIKUNNU","NARUVAMOODU","ARTHUNKAL","PUTHUPPADY","RAMANAGARA","KOTTIYOOR","CHANNAPATTANA","SRIRANGAPATNA","KRISHNAN KOTTA","KRISHNAPURAM","AMBAYATHODE","KATTILKADAVU","MADDUR","MEDICAL COLLEGE ERNAKULAM","THRIKKUNNAPPUZHA","THUMPODU","KIDANGANNOOR","PERAVOOR","PARAVUR","VALLIKKAVU","KOOTHUPARAMBA","BHARATHANOOR","VAGAMON","KAZHUTHURUTTY","KARIMBAN","POOZHANADU","KOLLAKADAVU","KEEZHAROOR","KAINAKARY","KOODARANJI","CHENAPPADY","MULLERIA","NENMARA","PALIYODU","PARAYAKADAVU","CHELLANAM","PATHARAM","KOCHEEDA JETTY","SULLIA","PUTHENTHOPE","THULAPPALLY","PALLITHURA","NANMINDA","MALAYALAPUZHA","THIRUVANIYOOR","VALAVOOR","KAKKAYANGAD","CHEPRA","EZHUMATTOOR","AYARKUNNAM","JALSOOR","MEENANKAL","VETTIKKAL","KODALY","THADIYAMPAD","PALANI","MATTANNUR","MANEED","POYYA","VYTTILA HUB","ERATTAYAR","INFOPARK","KUMBALAM","ANDHAKARANAZHY","LABBAKKADA","MALIANKARA","MAKKIYAD","MULAYARA","MEENAKSHIPURAM","ARAYANKAVU","TALIPARAMBA","KARIMUGHAL","PAYYANUR","ERUMELI","VELLIKULANGARA","CALICUT AIRPORT","ALAKKODE","KOLLENGODE","ARUVIPPURAM","KONGAD","THENNOOR","MARAYOOR","OTHERA","PAVUMBA","KOZHUVALLOOR","KAKKODI","KANICHUKULANGARA","CHITTAR","CHERPULASSERY","BADIYADKA","CHOORALMALA","PRAKKULAM","MURIKKASSERY","MANARCADU","NADUKANI","MULAGUNNATHUKAVU","ALUMKADAVU","AANAPPARA","HOSUR","CHEMPAZHANTHY","THAMBALAKKADU","GUDALLUR","VENKODE","ADIMALI","PUNALAL","SULTHAN BATHERY","PERLA","ORKKATTERI","KOTTAVASAL","PANAYAMUTTAM","SEETHATHODE","VILAKKUPARA","MUPLIYAM","CHITTARIKKAL","ERAVATHOOR","MELATTUMOOZHY","VELLARIKUND","PERIKKALLOOR","PUTTUR","POTHANICAD","PUTHUKKULAM","EDAKKUNNAM","PUNCHAVAYAL","THENGAMAM","PUTHUVELI","PANACODE","CHENNAI","VENMONY","SHORANUR","KOOMBARA","POINACHY","KOLOTH JETTY","ANGAMOOZHY","PAMBA","VETTICHIRA","CUMBUMMETTU","UDUMALPET","THACHAMPARA","SARADKA","PERUNAD","PADAPPAKKARA","KOLAHALAMEDU","THURUTHIPURAM","GUDALUR","VECHOOCHIRA","PANNIYODE","CHELAKKARA","THIRUVANVANDOOR","KAPPIL","ADIMALATHURA","KURUVILANGADU","POREDAM","THENI","ALAKODE","KOORACHUNDU","FEROKE","KOTTAVATTOM","THOPRAMKUDY","KANNAMMOOLA","KARAVUR","NEDUMPOIL","KRISHNAN KOTTA","BALAGRAM","DEVIKULAM","NEDUMBASSERY","NEDUMANKAVU","VANNAPURAM","PARAVOOR NORTH","KUNNAMKERY","POOVATTOOR","RAJAKKAD","MUTHAPPANPUZHA","VENGODE","KASARGODE","CHEMBAKAPPARA","BAVALI","KARITHOTTA","KUTTAMALA","VADUVANCHAL","KOPPAM","PAYYAVOOR","PARUTHIKUZHY","HUNSUR","VELIYANAD","PARAPPIL","MUTTAR","POOPPARA","VAZHITHALA","TVM CIVIL STATION","KODUVAYUR","SECRETARIAT","NEDUVANNOOR","MALAMPUZHA","KURUTHANCODE","KAMUKUMCHERY","VELLUMANNADI","MOONNANAKUZHY","PANAMBUKADU","MOOKKANNUR","VANDANMEDU","TECHNOPARK","KOTHAD FERRY","CHEEKKAL KADAVU","THATHAPPILLY","SENKOTTAI","GONIKOPPAL","MYLACHAL","KADAMMANITTA","KAVUMANNAM","TV PURAM","KOOTTALIDA","KADALUNDI","CHETTACHAL","KONNAKUZHY","UDUPI","THOLANUR","VELLANATHURUTHU","CHAMAMPATHAL","VENPAKAL","THADIKKAKADAVU","BHEEMANADY","PANTHA","PARUMALA","MANNADY","EDAVA","PUNKULAM","THYCATTUSSERY","NALANCHIRA","CHOONAD","PERUMON","THIDANAD","KODENCHERY","THERTHALLY","POOMALA","ORAVACKAL","PACHAMALA","THURAYIL KADAVU","PARANDODE","MOOTHEDATHUKAVU","PUNNAKULAM","KOOROPPADA","NALKAVALA","KOYILANDY","MADURAI","ADIVARAM","PAINAVU","PERUVANTHANAM","UNDAPPARA","VETTILAPPARA","CHULLIYODE","NARIKKUNNI","ASHTAMUDI","CVR PURAM","CHANNAPETTA","VALIAZHEEKAL","KANYAKUMARI","ATTUKAL TEMPLE","MANAVARY","MULANTHURUTHY","VENNIYODE","VALLIKUNNAM","VENMANY","504 COLONY","KODANKARA","KARIMBIL","PARIPPU","MUTHOLY","CHERAMBADI","KOKKUNNU","KAVALAM","KOLLADU BOAT JETTY","KUTTIYANI","KULATHOORMOZHY","THEKKADY","KUMMALLOOR","OOTY","VELIYATHUNADU","THAYAMKARI","ERODE","NILAKKAL","CHANGUVETTY","KARUVANCHAL","VALIYAPERUMPUZHA","PONMUDI","THANKAMANI","POOVAMPALLY","THADIYOOR","POOKKATTUPADY","ELOOR","MAYAM","AGRIFARM","KAPPUKAD","KONGORPILLY","THANDIRIKKAL","KALLARKUTTY","CHEPPILODE","VELLARIKUNDU","CHEMBIRIKA","DEVALA","ERNAKULAM SOUTH","THIRUVILWAMALA","GOVINDAPURAM","BAIRAKUPPA","SHANTINAGAR","THADICADU","KAREEPRA","THIRUNELLI TEMPLE","IDUKKI","KEERUKUZHI","ULLOOR","LAHA","RAJAKUMARI","KALADY PLANTATION","VARKALA SIVAGIRI","ADIVAD","MANJAPRA","VADAKKANCHERY","KUZHITHOLU","PANDAPILLY","GOKULAM MCH","THALOOR","SREEKANDAPURAM","PUTHANATHAANI","MANNATHOOR","PADANILAM","EDAPPALLY","MADIWALA ST JOHN","AGALY","VELIYAMCODE","THAVALAM","KAMBISSERY", "KUTHIRAVATTOM", "PANDIKKAD", "PERINTHALMANNA","CHANDAKUNNU"
];

const SEED_BUSES = [
  {
    name: "KSRTC Super Fast",
    type: "KSRTC",
    route: "Pandikkad - Perinthalmanna - Thrissur",
    from: "Pandikkad",
    to: "Perinthalmanna",
    time: "07:30 AM",
    description: "Official KSRTC Super Fast service connecting Malappuram to Thrissur via Perinthalmanna.",
    stops: "Pandikkad, Manjeri, Malappuram, Perinthalmanna, Pattambi, Shoranur, Thrissur",
    detailedStops: [
        {name: "Pandikkad", time: "07:30 AM"},
        {name: "Manjeri", time: "08:00 AM"},
        {name: "Perinthalmanna", time: "08:45 AM"}
    ],
    votes: 5,
    comments: [],
    status: 'On Time'
  },
  {
    name: "Sreehari Motors",
    type: "Private",
    route: "Kottakkunnu - Perinthalmanna",
    from: "Kottakkunnu",
    to: "Perinthalmanna",
    time: "08:15 AM",
    description: "Limited stop private bus service. Good music system.",
    stops: "Kottakkunnu, Oravampuram, Melattur, Perinthalmanna",
    detailedStops: [
        {name: "Kottakkunnu", time: "08:15 AM"},
        {name: "Perinthalmanna", time: "08:45 AM"}
    ],
    votes: 12,
    comments: [],
    status: 'On Time'
  }
];

// --- COMPONENTS ---

// 1. NAVBAR
const Navbar = ({ setView }) => (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
                <div className="flex items-center cursor-pointer gap-2" onClick={() => {window.location.hash = ''; setView('home');}}>
                    <div className="bg-gradient-to-br from-teal-600 to-teal-800 p-2 rounded-lg text-white shadow-sm">
                        <Bus size={24} />
                    </div>
                    <span className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-tight">
                        keralabuses<span className="text-teal-600">.in</span>
                    </span>
                </div>
                
                <div className="hidden md:flex space-x-1">
                    {['Home', 'KSRTC Timings', 'Private Stand', 'Blog'].map(item => (
                        <button key={item} onClick={() => {window.location.hash = ''; setView('home');}} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-teal-700 hover:bg-gray-50 rounded-lg transition-all">
                            {item}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Menu size={24} />
                    </button>
                    <button onClick={() => setView('add-bus')} className="bg-teal-600 text-white px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-teal-700 shadow-sm transition-colors">
                        <PlusSquare size={16} /> Add Bus
                    </button>
                </div>
            </div>
        </div>
    </nav>
);

// 2. SIDEBAR
const Sidebar = ({ setView }) => (
    <div className="space-y-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-500 text-white p-2 rounded-full shadow-sm">
                    <MessageCircle size={20} />
                </div>
                <h3 className="font-bold text-gray-800">Join Community</h3>
            </div>
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                Get live bus updates, strike alerts, and timing changes directly on WhatsApp.
            </p>
            <button className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white font-bold py-2.5 px-4 rounded-lg shadow-md hover:bg-green-700 transition hover:-translate-y-0.5">
                <span>Join Group</span>
            </button>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 border border-purple-100 rounded-xl p-6 text-center shadow-sm">
            <div className="flex justify-center mb-3">
                <div className="bg-white p-3 rounded-full shadow-sm text-purple-600">
                    <PlusCircle size={24} />
                </div>
            </div>
            <h3 className="font-bold text-purple-900 mb-1 text-sm">Know a Bus?</h3>
            <p className="text-[11px] text-purple-700 mb-4">Help the community by adding missing bus timings and stops.</p>
            <button onClick={() => setView('add-bus')} className="bg-purple-600 text-white text-xs font-bold py-2 px-6 rounded-full hover:bg-purple-700 shadow-sm transition-colors">Add Bus Now</button>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
            <h4 className="font-bold text-gray-800 text-sm mb-4 pb-2 border-b border-gray-50 flex items-center gap-2">
                <Phone size={16} className="text-teal-600"/> Emergency & Help
            </h4>
            <div className="grid grid-cols-2 gap-3">
                {[
                    { label: "Women", icon: Heart, color: "text-pink-600", bg: "bg-pink-50 hover:bg-pink-100", num: "1091" },
                    { label: "Police", icon: Shield, color: "text-blue-700", bg: "bg-blue-50 hover:bg-blue-100", num: "100" },
                    { label: "Ambulance", icon: PlusCircle, color: "text-red-600", bg: "bg-red-50 hover:bg-red-100", num: "108" },
                    { label: "Support", icon: HelpCircle, color: "text-amber-600", bg: "bg-amber-50 hover:bg-amber-100", num: "contact@keralabuses.in" },
                ].map((item, i) => (
                    <a key={i} href={item.num.includes('@') ? `mailto:${item.num}` : `tel:${item.num}`} className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl transition-all duration-200 ${item.bg} no-underline group`}>
                        <item.icon size={20} className={`${item.color} group-hover:scale-110 transition-transform`} />
                        <span className="text-[11px] font-bold text-gray-700">{item.label}</span>
                    </a>
                ))}
            </div>
        </div>
    </div>
);

// 3. NEWS TICKER
const NewsTicker = () => (
  <div className="bg-teal-900 text-white p-2.5 flex items-center text-sm gap-3 rounded-lg mb-6 shadow-sm mx-4 lg:mx-0 overflow-hidden">
    <span className="bg-amber-400 text-black px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider shrink-0">
      LIVE
    </span>
    <div className="flex-1 overflow-hidden relative h-5">
      <div className="absolute whitespace-nowrap animate-marquee font-medium text-xs tracking-wide top-0.5">
        New KSRTC Swift AC Services to Bangalore & Mysore • Private Bus Strike in Kozhikode withdrawn • Check updated monsoon timings for Idukki routes.
      </div>
    </div>
  </div>
);

// 4. FARE CALCULATOR
const FareCalculator = () => {
    const [km, setKm] = useState("");
    const [result, setResult] = useState(null);

    const calculate = () => {
        const val = parseFloat(km);
        if(val > 0) {
            setResult({
                ord: Math.max(10, Math.round(val * 1.10)),
                fast: Math.max(14, Math.round(val * 1.45))
            });
        }
    };

    return (
        <div className="bg-teal-50 p-5 rounded-xl border border-teal-100">
            <h4 className="font-bold text-teal-900 mb-3 text-sm">Fare Calculator (Approx)</h4>
            <div className="flex gap-2 mb-3">
                <input 
                    type="number" 
                    placeholder="Enter KM" 
                    className="w-full p-2 rounded-lg border border-teal-200 text-sm focus:outline-none focus:border-teal-500 bg-white"
                    value={km}
                    onChange={(e) => setKm(e.target.value)}
                />
                <button onClick={calculate} className="bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-teal-800">Check</button>
            </div>
            {result ? (
                <div className="bg-white/60 p-3 rounded-lg text-xs space-y-1 text-teal-800 border border-teal-100">
                    <div className="flex justify-between"><span>Ordinary / Private:</span> <span className="font-bold text-black">₹{result.ord}</span></div>
                    <div className="flex justify-between"><span>KSRTC Fast / Swift:</span> <span className="font-bold text-black">₹{result.fast}</span></div>
                </div>
            ) : (
                <p className="text-xs text-teal-600">Enter distance to see prices.</p>
            )}
        </div>
    );
};

// 5. SEO CONTENT (Must be defined BEFORE App)
const SeoContent = () => (
    <div className="pb-6">
        <div className="text-[13px] text-gray-500 leading-relaxed mb-6 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-sm font-bold text-gray-800 mb-2 pb-2 border-b border-gray-100">KeralaBuses.in - Official Bus Timing & Route Portal 2026</h2>
            <p className="mb-4">
                Welcome to <strong>KeralaBuses.in</strong>, the most comprehensive guide for <strong>Kerala Private and KSRTC bus timings</strong>. We provide up-to-date schedules for Malappuram, Kozhikode, Wayanad, Palakkad, and Thrissur districts. Whether you are looking for the <em>first bus from Pandikkad</em> or the <em>last bus to Bangalore</em>, our database helps you plan your journey.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
                {['Pandikkad - Perinthalmanna', 'Manjeri - Kozhikode', 'Perinthalmanna - Thrissur', 'Nilambur - Ernakulam', 'Chandakunnu - Wandoor', 'KSRTC Swift', 'Limited Stop'].map(tag => (
                    <span key={tag} className="bg-gray-50 text-gray-500 text-[10px] px-3 py-1.5 rounded-full border border-gray-200 hover:bg-teal-700 hover:text-white hover:border-teal-700 cursor-pointer transition-colors">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
        
        <div className="bg-gray-50 p-5 rounded-xl text-[11px] text-gray-400 text-justify leading-relaxed border border-gray-100">
             <strong>KeralaBuses.in Bus Route Finder 2026:</strong> Your trusted source for <strong>Private Bus Timings</strong> and <strong>KSRTC Schedules</strong>. Browse routes for Malappuram, Perinthalmanna, Manjeri, Nilambur, Kozhikode, and Palakkad.
             <br /><br />
            <strong>Disclaimer:</strong> All timings and fare data provided on KeralaBuses.in are for reference purposes only and may vary due to traffic, weather, or operational changes. Please confirm with the bus operators directly.
        </div>
    </div>
);

// 6. ADD BUS FORM (New)
const AddBusForm = ({ onCancel, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '', type: 'Private', from: '', to: '', time: '', stops: '', description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.from || !formData.to || !formData.time) return alert("Please fill required fields");
        const route = `${formData.from} - ${formData.to}`;
        // Create initial detailedStops from the basic info
        const initialStops = [
            { name: formData.from, time: formData.time },
            // We don't have time for the destination yet, so we just add it
            { name: formData.to, time: 'TBD' }
        ];
        onAdd({ ...formData, route, votes: 0, comments: [], detailedStops: initialStops, status: 'On Time' });
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 animate-[fadeIn_0.3s_ease-out_forwards]">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <PlusCircle className="text-teal-600" /> Add New Bus
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">From *</label>
                        <input className="w-full p-3 border rounded-lg text-sm focus:border-teal-500 outline-none" placeholder="Origin" onChange={e => setFormData({...formData, from: e.target.value})} required />
                    </div>
                    <div>
                        <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">To *</label>
                        <input className="w-full p-3 border rounded-lg text-sm focus:border-teal-500 outline-none" placeholder="Destination" onChange={e => setFormData({...formData, to: e.target.value})} required />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">Start Time *</label>
                        <input type="text" className="w-full p-3 border rounded-lg text-sm focus:border-teal-500 outline-none" placeholder="e.g. 08:30 AM" onChange={e => setFormData({...formData, time: e.target.value})} required />
                    </div>
                    <div>
                        <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">Bus Type</label>
                        <select className="w-full p-3 border rounded-lg text-sm focus:border-teal-500 outline-none" onChange={e => setFormData({...formData, type: e.target.value})}>
                            <option value="Private">Private Bus</option>
                            <option value="KSRTC">KSRTC</option>
                            <option value="Swift">KSRTC Swift</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">Bus Name (Optional)</label>
                    <input className="w-full p-3 border rounded-lg text-sm focus:border-teal-500 outline-none" placeholder="e.g. Sreehari Motors" onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">Major Stops (Comma Separated)</label>
                    <textarea className="w-full p-3 border rounded-lg text-sm focus:border-teal-500 outline-none h-20" placeholder="e.g. Stop A, Stop B, Stop C" onChange={e => setFormData({...formData, stops: e.target.value})}></textarea>
                </div>
                <div className="flex gap-3 pt-2">
                    <button type="button" onClick={onCancel} className="px-5 py-2.5 bg-gray-100 text-gray-600 rounded-lg font-bold text-sm">Cancel</button>
                    <button type="submit" className="flex-1 px-5 py-2.5 bg-teal-600 text-white rounded-lg font-bold text-sm hover:bg-teal-700 shadow-md">Submit Bus</button>
                </div>
            </form>
        </div>
    );
};

// 7. BUS POST COMPONENT (Detail View + Editing + Stop Management)
const BusPost = ({ bus, onBack, addComment, updateBusDetails, onVote, reportLate }) => {
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  
  // Edit States
  const [editName, setEditName] = useState(bus.name);
  const [editRoute, setEditRoute] = useState(bus.route);
  const [editTime, setEditTime] = useState(bus.time);
  const [editType, setEditType] = useState(bus.type);
  const [editDesc, setEditDesc] = useState(bus.description);
  
  // Manage Stops
  const [newStopName, setNewStopName] = useState("");
  const [newStopTime, setNewStopTime] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if(!newComment.trim() || !userName.trim()) return;
    addComment(bus.id, { user: userName, text: newComment, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
    setNewComment("");
  };

  const handleSaveDetails = () => {
      updateBusDetails(bus.id, {
          name: editName,
          route: editRoute,
          time: editTime,
          type: editType,
          description: editDesc,
      });
      setIsEditing(false);
  };

  const handleAddStop = () => {
      if(!newStopName || !newStopTime) return;
      const updatedStops = bus.detailedStops ? [...bus.detailedStops, {name: newStopName, time: newStopTime}] : [{name: newStopName, time: newStopTime}];
      // Also update the string version for search
      const stopsString = updatedStops.map(s => s.name).join(', ');
      
      updateBusDetails(bus.id, {
          detailedStops: updatedStops,
          stops: stopsString
      });
      setNewStopName("");
      setNewStopTime("");
  };

  return (
    <div className="animate-[fadeIn_0.3s_ease-out_forwards] pb-10">
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center text-teal-700 font-bold text-sm cursor-pointer sticky top-0 z-20 shadow-sm rounded-t-xl" onClick={onBack}>
        <ChevronRight className="rotate-180 mr-1" size={18} /> Back to Results
      </div>
      
      <div className="p-0 md:p-5">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 mt-4 md:mt-0 relative">
            
            {/* Edit Button */}
            {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="absolute top-4 right-4 text-gray-400 hover:text-teal-600 flex items-center gap-1 text-[10px] bg-gray-50 px-2 py-1 rounded border border-gray-100">
                    <Edit3 size={12} /> Edit Bus Info
                </button>
            )}

            {isEditing ? (
                /* EDIT FORM */
                <div className="space-y-4">
                    <h3 className="font-bold text-lg text-gray-800 border-b pb-2">Edit Bus Details</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Route (From - To)</label>
                            <input className="w-full p-2 border rounded text-sm" value={editRoute} onChange={e => setEditRoute(e.target.value)} />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Time</label>
                            <input className="w-full p-2 border rounded text-sm" value={editTime} onChange={e => setEditTime(e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Bus Name</label>
                            <input className="w-full p-2 border rounded text-sm" value={editName} onChange={e => setEditName(e.target.value)} />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Type (KSRTC/Private)</label>
                            <select className="w-full p-2 border rounded text-sm" value={editType} onChange={e => setEditType(e.target.value)}>
                                <option value="KSRTC">KSRTC</option>
                                <option value="Private">Private</option>
                                <option value="Swift">Swift</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Description</label>
                        <textarea className="w-full p-2 border rounded text-sm h-20" value={editDesc} onChange={e => setEditDesc(e.target.value)} />
                    </div>
                    
                    {/* ADD STOP IN EDIT MODE */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Add New Stop</label>
                        <div className="flex gap-2">
                            <input className="flex-1 p-2 border rounded text-sm" placeholder="Stop Name" value={newStopName} onChange={e => setNewStopName(e.target.value)} />
                            <input className="w-24 p-2 border rounded text-sm" placeholder="Time" value={newStopTime} onChange={e => setNewStopTime(e.target.value)} />
                            <button onClick={handleAddStop} className="bg-teal-600 text-white px-3 rounded font-bold">+</button>
                        </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button onClick={handleSaveDetails} className="bg-teal-600 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2"><Save size={16}/> Save Changes</button>
                        <button onClick={() => setIsEditing(false)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded text-sm font-bold">Cancel</button>
                    </div>
                </div>
            ) : (
                /* VIEW MODE */
                <>
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">{bus.route}</h1>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide ${bus.type === 'KSRTC' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                            {bus.type}
                        </span>
                    </div>

                    <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <Clock size={20} className="text-teal-600 mr-2" />
                            <span className="text-2xl font-bold tracking-tight text-gray-800">{bus.time}</span>
                            <span className="ml-3 text-[11px] bg-white px-2 py-0.5 rounded text-teal-700 border border-teal-100">Daily Service</span>
                        </div>
                        <button onClick={() => onVote(bus.id)} className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-teal-200 text-teal-700 hover:bg-teal-600 hover:text-white transition-colors text-xs font-bold shadow-sm">
                            <ThumbsUp size={14} /> 
                            <span>{bus.votes || 0} Reliable</span>
                        </button>
                    </div>

                    {/* STATUS ALERT */}
                    {bus.status === 'Late' && (
                        <div className="mb-6 bg-amber-50 text-amber-800 p-3 rounded-lg border border-amber-200 flex items-center gap-2 text-sm font-bold">
                            <AlertTriangle size={18} />
                            ⚠️ Reported Late by Community
                        </div>
                    )}

                    {/* DYNAMIC SEO CONTENT */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 text-sm text-gray-600 leading-relaxed shadow-inner">
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Info size={16} className="text-blue-500"/> Route Summary</h4>
                        <p>
                            This <strong>{bus.type}</strong> bus service, known as <em>{bus.name}</em>, departs at <strong>{bus.time}</strong>. 
                            It operates on the <strong>{bus.route}</strong> route. 
                            {bus.stops ? `Major stops include ${bus.stops}. ` : ''} 
                            Passengers looking for reliable travel between these destinations can choose this service for a comfortable journey.
                        </p>
                        {bus.description && <p className="mt-2 text-xs text-gray-500 italic">Operator Note: {bus.description}</p>}
                    </div>

                    {/* DETAILED SCHEDULE TIMELINE */}
                    {bus.detailedStops && bus.detailedStops.length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Full Route Schedule</h4>
                            <div className="relative border-l-2 border-teal-100 ml-3 space-y-6">
                                {bus.detailedStops.map((stop, i) => (
                                    <div key={i} className="ml-6 relative">
                                        <span className="absolute -left-[31px] top-0 w-3 h-3 bg-teal-500 rounded-full border-2 border-white shadow-sm"></span>
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-bold text-gray-800">{stop.name}</span>
                                            <span className="text-xs font-mono text-teal-600 bg-teal-50 px-2 py-0.5 rounded">{stop.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <button className="bg-green-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-md text-sm">
                            <MessageCircle size={18} /> Share WhatsApp
                        </button>
                        <button onClick={() => reportLate(bus.id)} className="bg-amber-100 text-amber-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-amber-200 transition-colors text-sm">
                            <AlertTriangle size={18} /> Report Late
                        </button>
                    </div>
                </>
            )}
        </div>

        {/* Comments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MessageSquare className="text-teal-600" size={18} /> 
            Live Community Updates
          </h3>

          <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase mb-3">Report delay or update</h4>
            <form onSubmit={handleCommentSubmit}>
              <input 
                type="text" 
                placeholder="Your Name"
                className="w-full mb-2 p-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal-500"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <textarea 
                placeholder="Bus was late? Changed route? Let others know..."
                className="w-full mb-3 p-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal-500 h-20 resize-none"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button type="submit" className="w-full bg-teal-700 text-white font-bold py-2.5 rounded-lg hover:bg-teal-800 transition text-sm">
                Post Update
              </button>
            </form>
          </div>

          <div className="space-y-4">
            {bus.comments && bus.comments.length > 0 ? (
              bus.comments.slice().reverse().map((comment, index) => (
                <div key={index} className="flex gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
                    {comment.user.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h5 className="font-bold text-gray-800 text-sm">{comment.user}</h5>
                      <span className="text-[10px] text-gray-400">{comment.time}</span>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed">{comment.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 text-xs italic py-4">No updates yet. Be the first!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 8. MAIN APP (Must be last to use sub-components)
export default function App() {
  const [view, setView] = useState('home'); // home, results, detail, add-bus
  const [selectedBus, setSelectedBus] = useState(null);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search State
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [filterType, setFilterType] = useState('all'); 
  
  // Autocomplete State
  const [suggestionsFrom, setSuggestionsFrom] = useState([]);
  const [suggestionsTo, setSuggestionsTo] = useState([]);

  // URL SYNC LOGIC (HASH ROUTER)
  useEffect(() => {
      const handleHashChange = () => {
          const hash = window.location.hash;
          if (hash.startsWith('#/bus/')) {
              const busId = hash.replace('#/bus/', '');
              // We need to wait for buses to load, or find it if loaded
              // This is a simplified check. Ideally we fetch doc by ID here.
              if (buses.length > 0) {
                  const bus = buses.find(b => b.id === busId);
                  if (bus) {
                      setSelectedBus(bus);
                      setView('detail');
                  }
              }
          } else if (hash.startsWith('#/search/')) {
              const parts = hash.split('/');
              // #/search/FROM/TO/TYPE
              if (parts[2]) setSearchFrom(decodeURIComponent(parts[2]));
              if (parts[3]) setSearchTo(decodeURIComponent(parts[3]));
              if (parts[4]) setFilterType(parts[4]);
              setView('results');
          } else {
              setView('home');
          }
      };

      // Run on mount and hash change
      window.addEventListener('hashchange', handleHashChange);
      
      // If we already have data, check hash immediately
      if(!loading && buses.length > 0) {
          handleHashChange();
      }

      return () => window.removeEventListener('hashchange', handleHashChange);
  }, [buses, loading]);

  // --- FIREBASE LOGIC ---
  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "buses"), orderBy("time"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const busData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBuses(busData);
      setLoading(false);
      // Sync selected bus if active (refresh details)
      if(selectedBus) {
        const updatedSelected = busData.find(b => b.id === selectedBus.id);
        if(updatedSelected) setSelectedBus(updatedSelected);
      }
    }, (error) => { console.error(error); setLoading(false); });
    return () => unsubscribe();
  }, [selectedBus]);

  const addComment = async (busId, comment) => {
    if (!db) return alert("Firebase not connected!");
    await updateDoc(doc(db, "buses", busId), { comments: arrayUnion(comment) });
  };

  const updateBusDetails = async (busId, details) => {
      if (!db) return alert("Firebase not connected!");
      await updateDoc(doc(db, "buses", busId), details);
  };

  const reportLate = async (busId) => {
      if (!db) return alert("Firebase not connected!");
      await updateDoc(doc(db, "buses", busId), { 
          status: 'Late',
          comments: arrayUnion({
              user: "Community Alert",
              text: "⚠️ This bus was reported late by a user.",
              time: "Just now"
          }) 
      });
      alert("Thanks for reporting! Community has been notified.");
  };

  const addNewBus = async (newBusData) => {
      if (!db) return alert("Firebase not connected!");
      try {
          await addDoc(collection(db, "buses"), newBusData);
          alert("Bus added successfully!");
          setView('home');
          window.location.hash = '';
      } catch(e) {
          console.error(e);
          alert("Error adding bus");
      }
  };

  const handleVote = async (busId) => {
      if (!db) return alert("Firebase not connected!");
      await updateDoc(doc(db, "buses", busId), { votes: increment(1) });
  };

  const seedDatabase = async () => {
    if (!db) return alert("Firebase not connected!");
    for (const bus of SEED_BUSES) await addDoc(collection(db, "buses"), bus);
    alert("Sample buses added!");
  };

  // --- SEARCH UI LOGIC ---
  const handleSwap = () => {
    const temp = searchFrom;
    setSearchFrom(searchTo);
    setSearchTo(temp);
  };

  const updateSuggestions = (val, type) => {
      if(!val) {
          type === 'from' ? setSuggestionsFrom([]) : setSuggestionsTo([]);
          return;
      }
      const filtered = BUS_STOPS.filter(stop => stop.toLowerCase().startsWith(val.toLowerCase())).slice(0, 8);
      type === 'from' ? setSuggestionsFrom(filtered) : setSuggestionsTo(filtered);
  };

  const handleInputChange = (e, type) => {
      const val = e.target.value;
      type === 'from' ? setSearchFrom(val) : setSearchTo(val);
      updateSuggestions(val, type);
  };

  const selectSuggestion = (val, type) => {
      type === 'from' ? setSearchFrom(val) : setSearchTo(val);
      type === 'from' ? setSuggestionsFrom([]) : setSuggestionsTo([]);
  };

  const handleFindBus = () => {
      // Update URL hash to trigger navigation
      window.location.hash = `#/search/${encodeURIComponent(searchFrom)}/${encodeURIComponent(searchTo)}/${filterType}`;
  };

  const handleBusClick = (bus) => {
      window.location.hash = `#/bus/${bus.id}`;
  };

  const filteredBuses = buses.filter(bus => {
    // Smart Search: Check Origin, Destination AND Intermediate Stops
    const sFrom = searchFrom.toLowerCase().trim();
    const sTo = searchTo.toLowerCase().trim();
    
    // Normalize bus data
    const origin = (bus.from || '').toLowerCase();
    const destination = (bus.to || '').toLowerCase();
    const stopsStr = (bus.stops || '').toLowerCase();
    const routeStr = (bus.route || '').toLowerCase();
    
    // Combine all location data into a single searchable string for flexibility
    // This allows "Pandikkad" search to match a bus that has it as a stop
    const fullPath = `${origin} ${stopsStr} ${destination} ${routeStr}`;

    // Match if the 'From' query exists anywhere in the bus path
    let matchesFrom = !sFrom || fullPath.includes(sFrom);
    
    // Match if the 'To' query exists anywhere in the bus path
    let matchesTo = !sTo || fullPath.includes(sTo);

    const matchesType = filterType === 'all' || (bus.type && bus.type.toLowerCase() === filterType.toLowerCase());

    return matchesFrom && matchesTo && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-700">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
          body { font-family: 'Poppins', sans-serif; }
          .animate-marquee { animation: marquee 15s linear infinite; }
          @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: #f1f1f1; }
          ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
          ::-webkit-scrollbar-thumb:hover { background: #00695c; }
        `}</style>

        <Navbar setView={setView} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* --- LEFT COLUMN (MAIN CONTENT) --- */}
                <div className="lg:col-span-8 space-y-6">
                    
                    {/* HOME VIEW: SEARCH + TOOLS */}
                    {view === 'home' && (
                        <>
                            <NewsTicker />
                            {/* HERO SEARCH */}
                            <div className="bg-white p-6 rounded-xl shadow-[0_5px_25px_rgba(0,0,0,0.06)] border border-gray-100 relative z-10">
                                <div className="flex items-center gap-2 mb-5 text-gray-800 font-extrabold text-lg">
                                    <Search className="text-teal-700" size={24} />
                                    Search Bus Routes
                                </div>

                                <div className="flex bg-gray-100 p-1 rounded-lg mb-5">
                                    {['all', 'ksrtc', 'private'].map(type => (
                                        <button 
                                            key={type}
                                            onClick={() => setFilterType(type)}
                                            className={`flex-1 py-2 text-xs font-bold rounded-md transition-all uppercase ${filterType === type ? 'bg-white text-teal-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                        >
                                            {type === 'all' ? 'All Buses' : type === 'ksrtc' ? 'KSRTC / Swift' : 'Private Bus'}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 items-center relative">
                                    <div className="w-full relative">
                                        <label className="text-[11px] font-bold text-gray-400 uppercase mb-1 block">Departure From</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                                            <input 
                                                type="text" 
                                                value={searchFrom}
                                                onChange={(e) => handleInputChange(e, 'from')}
                                                placeholder="Origin (e.g. Pandikkad)"
                                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-800 focus:outline-none focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10 transition-all"
                                            />
                                            {suggestionsFrom.length > 0 && (
                                                <div className="absolute top-full left-0 right-0 bg-white border border-gray-100 rounded-b-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                                                    {suggestionsFrom.map((s, i) => (
                                                        <div key={i} onClick={() => selectSuggestion(s, 'from')} className="px-4 py-3 hover:bg-teal-50 hover:text-teal-800 cursor-pointer text-sm border-b border-gray-50 last:border-0">{s}</div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="relative z-10 md:mt-6">
                                        <button onClick={handleSwap} className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-teal-700 shadow-sm hover:bg-teal-50 hover:rotate-180 hover:border-teal-600 transition-all duration-300">
                                            <ArrowRightLeft size={18} />
                                        </button>
                                    </div>

                                    <div className="w-full relative">
                                        <label className="text-[11px] font-bold text-gray-400 uppercase mb-1 block">Going To</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                                            <input 
                                                type="text" 
                                                value={searchTo}
                                                onChange={(e) => handleInputChange(e, 'to')}
                                                placeholder="Destination"
                                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-800 focus:outline-none focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10 transition-all"
                                            />
                                            {suggestionsTo.length > 0 && (
                                                <div className="absolute top-full left-0 right-0 bg-white border border-gray-100 rounded-b-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                                                    {suggestionsTo.map((s, i) => (
                                                        <div key={i} onClick={() => selectSuggestion(s, 'to')} className="px-4 py-3 hover:bg-teal-50 hover:text-teal-800 cursor-pointer text-sm border-b border-gray-50 last:border-0">{s}</div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-5">
                                    <button onClick={() => {setSearchFrom(''); setSearchTo('');}} className="px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl text-sm hover:bg-gray-200 transition-colors">Clear</button>
                                    <button onClick={handleFindBus} className="flex-1 py-3 bg-gradient-to-br from-teal-700 to-teal-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wider">
                                        Find My Bus
                                    </button>
                                </div>
                            </div>

                            {/* TOOLKIT & FARE GRID */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                    <h4 className="font-bold text-gray-800 mb-3 text-sm">Traveler's Toolkit</h4>
                                    <div className="space-y-0">
                                        {[
                                            { t: "Official KSRTC Booking", l: "https://online.keralartc.com" },
                                            { t: "Check Fare Rates (MVD)", l: "https://mvd.kerala.gov.in" },
                                            { t: "Live Traffic Status", l: "https://google.com/maps" }
                                        ].map((item, i) => (
                                            <a key={i} href={item.l} target="_blank" className="flex items-center gap-3 py-2.5 text-[13px] font-medium text-gray-600 hover:bg-gray-50 hover:text-teal-700 hover:pl-2 rounded-lg transition-all border-b border-gray-50 last:border-0">
                                                <ChevronRight size={14} className="text-gray-300" /> {item.t}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                <FareCalculator />
                            </div>
                            <SeoContent />
                        </>
                    )}

                    {/* ADD BUS VIEW */}
                    {view === 'add-bus' && (
                        <AddBusForm onCancel={() => setView('home')} onAdd={addNewBus} />
                    )}

                    {/* RESULTS VIEW */}
                    {view === 'results' && (
                        <div className="animate-[fadeIn_0.3s_ease-out_forwards]">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                    <Search size={20} className="text-teal-600"/> 
                                    Results for {searchFrom ? searchFrom : "All"} {searchTo && `to ${searchTo}`}
                                </h3>
                                <button onClick={() => {window.location.hash = ''; setView('home');}} className="text-sm text-gray-500 hover:text-teal-600 underline">Back to Search</button>
                            </div>

                            {loading ? (
                                <div className="py-10 text-center text-gray-400 text-sm">Loading live data...</div>
                            ) : (
                                <div className="space-y-3">
                                    {filteredBuses.length > 0 ? filteredBuses.map(bus => (
                                        <div key={bus.id} onClick={() => handleBusClick(bus)} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md cursor-pointer flex justify-between items-center group transition-all relative">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm ${bus.type === 'KSRTC' ? 'bg-red-500' : 'bg-blue-600'}`}>
                                                    <Bus size={18} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800 text-sm group-hover:text-teal-700 transition-colors">{bus.route}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[11px] font-mono font-bold">{bus.time}</span>
                                                        <span className="text-[11px] text-gray-400">• {bus.type}</span>
                                                        <span className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded border border-green-100 flex items-center gap-1">
                                                            <Shield size={10} /> Verified {bus.votes > 0 && `(${bus.votes})`}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronRight size={18} className="text-gray-300 group-hover:text-teal-600" />
                                        </div>
                                    )) : (
                                        <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-200 text-gray-400 text-sm">
                                            No buses found matching your search.
                                            {buses.length === 0 && (
                                                <div className="mt-4">
                                                    <button onClick={seedDatabase} className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold hover:bg-blue-100 border border-blue-100">
                                                        + Load Sample Data
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* DETAIL VIEW */}
                    {view === 'detail' && selectedBus && (
                        <BusPost 
                            bus={selectedBus} 
                            onBack={() => {window.location.hash = ''; setView('results');}} 
                            addComment={addComment} 
                            updateBusDetails={updateBusDetails} 
                            onVote={handleVote}
                            reportLate={reportLate}
                        />
                    )}
                </div>

                {/* --- RIGHT COLUMN (SIDEBAR) --- */}
                <div className="lg:col-span-4">
                    <Sidebar setView={setView} />
                </div>
            </div>
        </div>
    </div>
  );
}