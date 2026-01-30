import React from 'react';
import { 
  Bus, Menu, PlusSquare, ChevronRight, CheckCircle, AlertCircle, Info, 
  FileText, Lock, AlertTriangle 
} from 'lucide-react';

// 0. TOAST NOTIFICATION COMPONENT
export const ToastContainer = ({ toasts }) => (
  <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none max-w-[90vw] sm:max-w-sm">
    {toasts.map((toast, index) => (
      <div 
        // FIX: Combined ID with index to prevent duplicate key warning
        key={`${toast.id}-${index}`} 
        className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg transform transition-all duration-300 animate-slide-up ${toast.type === 'success' ? 'bg-teal-900 text-white' : toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-white text-gray-800 border border-gray-100'}`}
      >
        {toast.type === 'success' ? <CheckCircle size={16} className="text-teal-400" /> : 
         toast.type === 'error' ? <AlertCircle size={16} /> : <Info size={16} className="text-blue-500"/>}
        <span className="text-xs font-bold">{toast.message}</span>
      </div>
    ))}
  </div>
);

// 1. NAVBAR
export const Navbar = ({ setView, toggleMenu }) => (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-14 items-center">
                <div className="flex items-center cursor-pointer gap-2" onClick={() => {window.location.hash = ''; setView('home');}}>
                    <div className="bg-gradient-to-br from-teal-600 to-teal-800 p-1.5 rounded-lg text-white shadow-sm transform hover:scale-105 transition-transform">
                        <Bus size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-extrabold text-gray-800 tracking-tight leading-none">
                            Evide?<span className="text-teal-600"> Bus</span>
                        </span>
                        <span className="text-[9px] text-gray-500 font-bold tracking-wide uppercase">Community Network</span>
                    </div>
                </div>
                
                <div className="hidden md:flex space-x-1">
                    <button onClick={() => {window.location.hash = ''; setView('home');}} className="px-3 py-1.5 text-xs font-bold text-gray-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-all">Home</button>
                    <button onClick={() => setView('ksrtc')} className="px-3 py-1.5 text-xs font-bold text-gray-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-all">KSRTC Timings</button>
                    <button onClick={() => setView('private')} className="px-3 py-1.5 text-xs font-bold text-gray-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-all">Private Stand</button>
                    <a href="https://blog.evidebus.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 text-xs font-bold text-gray-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-all">Blog</a>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={() => setView('add-bus')} className="bg-teal-600 text-white px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 hover:bg-teal-700 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 hidden sm:flex">
                        <PlusSquare size={14} /> <span className="hidden sm:inline">Add Bus</span>
                    </button>
                    <button className="md:hidden p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg" onClick={toggleMenu}>
                        <Menu size={20} />
                    </button>
                </div>
            </div>
        </div>
    </nav>
);

// 1.5 MOBILE MENU
export const MobileMenu = ({ isOpen, setView, closeMenu }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden animate-fade-in">
            <div className="flex flex-col gap-3">
                <button onClick={() => { setView('home'); closeMenu(); }} className="text-left text-sm font-bold text-gray-800 py-3 border-b border-gray-100">Home</button>
                <button onClick={() => { setView('ksrtc'); closeMenu(); }} className="text-left text-sm font-bold text-gray-800 py-3 border-b border-gray-100">KSRTC Timings</button>
                <button onClick={() => { setView('private'); closeMenu(); }} className="text-left text-sm font-bold text-gray-800 py-3 border-b border-gray-100">Private Stand</button>
                <a href="https://blog.evidebus.com" className="text-left text-sm font-bold text-gray-800 py-3 border-b border-gray-100">Blog</a>
                <button onClick={() => { setView('add-bus'); closeMenu(); }} className="bg-teal-600 text-white py-3 rounded-xl font-bold mt-2 flex justify-center items-center gap-2 text-sm shadow-md">
                    <PlusSquare size={16} /> Add Bus
                </button>
            </div>
        </div>
    );
};

// 0.2 FOOTER PAGES COMPONENT
export const FooterPage = ({ type, onBack }) => {
    const content = {
        about: { 
            title: "About Us", 
            body: (
                <>
                    <p className="mb-3">evidebus.com is a pioneering community-driven platform dedicated to digitizing the public transport network of Kerala.</p>
                    
                    <h4 className="font-bold text-sm text-gray-800 mt-4 mb-2">Our Mission</h4>
                    <p className="mb-3">To bridge the gap between passengers and bus schedules by providing a reliable, user-updated database of KSRTC and Private bus timings.</p>
                    
                    <h4 className="font-bold text-sm text-gray-800 mt-4 mb-2">Who We Are</h4>
                    <p className="mb-3">We are a team of passionate developers and transport enthusiasts who believe that information should be accessible to everyone. We are not affiliated with the government but work tirelessly to ensure the data is as accurate as possible through community verification.</p>
                    
                    <h4 className="font-bold text-sm text-gray-800 mt-4 mb-2">Why Use evidebus.com?</h4>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                        <li>Real-time updates from fellow passengers.</li>
                        <li>Comprehensive coverage of rural and urban routes.</li>
                        <li>Dedicated support for students and daily commuters.</li>
                        <li>AdSense-friendly, fast, and secure platform.</li>
                    </ul>
                </>
            )
        },
        contact: { 
            title: "Contact Support", 
            body: (
                <>
                    <p className="mb-4">We value your feedback and are here to assist you with any queries.</p>
                    
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <h5 className="font-bold text-teal-700 mb-1 text-xs uppercase">General Inquiries</h5>
                            <p className="text-xs">Email: <a href="mailto:support@evidebus.com" className="text-blue-600 hover:underline">support@evidebus.com</a></p>
                            <p className="text-xs">Phone: +91 80866 16247</p>
                        </div>
                        
                        <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                            <h5 className="font-bold text-green-700 mb-1 text-xs uppercase">WhatsApp Support</h5>
                            <p className="text-xs">Join our community or chat with admin: <span className="font-mono font-bold">+91 80866 16247</span></p>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <h5 className="font-bold text-gray-700 mb-1 text-xs uppercase">Office Address</h5>
                            <p className="text-xs text-gray-600">evidebus Tech Labs,<br/>Infopark Campus,<br/>Malappuram, Kerala, 676505</p>
                        </div>
                    </div>
                </>
            )
        },
        privacy: { 
            title: "Privacy Policy", 
            body: (
                <>
                    <p className="text-[10px] text-gray-400 mb-4 uppercase tracking-wide font-bold">Effective Date: Jan 1, 2026</p>
                    
                    <h4 className="font-bold text-sm text-gray-800 mt-4 mb-2">1. Information We Collect</h4>
                    <p className="mb-2 text-xs">We collect minimal data to provide our services. This includes:</p>
                    <ul className="list-disc pl-4 mb-3 space-y-1 text-xs">
                        <li>Information you voluntarily provide (e.g., bus timings, comments).</li>
                        <li>Non-personal data via cookies for analytics (Google Analytics) and ad personalization (Google AdSense).</li>
                    </ul>

                    <h4 className="font-bold text-sm text-gray-800 mt-4 mb-2">2. Cookies & Third-Party Advertisements</h4>
                    <ul className="list-disc pl-4 mb-3 space-y-1 text-xs">
                        <li>Third-party vendors, including Google, use cookies to serve ads based on your prior visits to our website or other websites.</li>
                        <li>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet.</li>
                        <li>You may opt-out of personalized advertising by visiting Ads Settings.</li>
                    </ul>

                    <h4 className="font-bold text-sm text-gray-800 mt-4 mb-2">3. Data Usage</h4>
                    <p className="mb-2 text-xs">Your data is used to improve route accuracy, prevent spam, and analyze traffic trends.</p>

                    <h4 className="font-bold text-sm text-gray-800 mt-4 mb-2">4. Data Protection</h4>
                    <p className="text-xs">We implement industry-standard security measures to protect your data. We do not sell your personal information to third parties.</p>
                </>
            )
        },
        terms: { 
            title: "Terms of Service", 
            body: (
                <>
                    <h4 className="font-bold text-sm text-gray-800 mt-4 mb-2">1. Acceptance of Terms</h4>
                    <p className="mb-2 text-xs">By accessing evidebus.com, you agree to be bound by these terms.</p>

                    <h4 className="font-bold text-sm text-gray-800 mt-4 mb-2">2. Accuracy of Information</h4>
                    <p className="mb-2 text-xs">This website is a community-driven platform. While we strive for accuracy, bus timings are subject to change by operators without notice. We are not liable for any loss, delay, or inconvenience caused by reliance on this information.</p>

                    <h4 className="font-bold text-sm text-gray-800 mt-4 mb-2">3. User Contributions</h4>
                    <p className="mb-2 text-xs">Users are responsible for the accuracy of the data they contribute. Malicious or false data entry will result in a ban.</p>

                    <h4 className="font-bold text-sm text-gray-800 mt-4 mb-2">4. Intellectual Property</h4>
                    <p className="mb-2 text-xs">The content, layout, and code of this website are the property of evidebus.com.</p>
                </>
            )
        },
        disclaimer: { 
            title: "Disclaimer", 
            body: (
                <>
                   <div className="bg-red-50 border border-red-100 p-3 rounded-xl mb-4">
                        <h5 className="font-bold text-red-700 flex items-center gap-2 mb-1 text-xs"><AlertTriangle size={14}/> Not an Official Government Website</h5>
                        <p className="text-red-600 text-[10px] leading-relaxed">evidebus.com is a privately maintained, community-driven informational portal. We are <strong>NOT</strong> affiliated, associated, authorized, endorsed by, or in any way officially connected with the Kerala State Road Transport Corporation (KSRTC), the Motor Vehicles Department (MVD), or any government agency.</p>
                   </div>

                   <h4 className="font-bold text-sm text-gray-800 mt-4 mb-2">Data Accuracy</h4>
                   <p className="mb-2 text-xs">All bus timings, fares, and routes are based on user contributions and public data. Schedules are subject to change due to traffic, weather, strikes, or operator decisions.</p>

                   <h4 className="font-bold text-sm text-gray-800 mt-4 mb-2">Liability</h4>
                   <p className="text-xs">We recommend verifying critical travel details with the respective bus stations or official enquiry counters. evidebus.com and its maintainers shall not be held liable for any direct, indirect, or consequential damages arising from the use of this website.</p>
                </>
            )
        }
    };

    const data = content[type] || content.about;

    return (
        <div className="animate-fade-in bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[60vh]">
            <button onClick={onBack} className="text-teal-600 font-bold text-xs flex items-center gap-1 mb-6 hover:underline">
                <ChevronRight className="rotate-180" size={14}/> Back to Home
            </button>
            <h1 className="text-xl font-extrabold text-gray-900 mb-4">{data.title}</h1>
            <div className="prose prose-sm text-xs text-gray-600 leading-relaxed">
                {data.body}
            </div>
        </div>
    );
};

// 2.5 FOOTER COMPONENT
export const Footer = ({ setView, onQuickSearch }) => (
    <footer className="bg-white border-t border-gray-100 mt-8 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="bg-teal-600 text-white p-1 rounded-md"><Bus size={14} /></div>
                        <span className="text-sm font-bold text-gray-800">evidebus.com</span>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-relaxed mb-3">
                        Kerala's largest community-driven public transport network. Find KSRTC and Private bus timings, stops, and routes easily.
                    </p>
                </div>
                
                <div>
                    <h4 className="font-bold text-gray-800 text-xs mb-3 uppercase tracking-wide">Quick Links</h4>
                    <ul className="space-y-1.5 text-[10px] text-gray-500 font-medium">
                        <li onClick={() => setView('about')} className="hover:text-teal-600 cursor-pointer transition-colors">About Us</li>
                        <li onClick={() => setView('contact')} className="hover:text-teal-600 cursor-pointer transition-colors">Contact Support</li>
                        <li className="hover:text-teal-600 cursor-pointer transition-colors"><a href="https://chat.whatsapp.com/KhSr7LeSW503yXSGqJW8YZ" target="_blank">Join WhatsApp</a></li>
                        <li onClick={() => setView('contact')} className="hover:text-teal-600 cursor-pointer transition-colors">Report Issue</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-gray-800 text-xs mb-3 uppercase tracking-wide">Legal & Policy</h4>
                    <ul className="space-y-1.5 text-[10px] text-gray-500 font-medium">
                        <li onClick={() => setView('terms')} className="hover:text-teal-600 cursor-pointer flex items-center gap-1 transition-colors"><FileText size={10}/> Terms of Service</li>
                        <li onClick={() => setView('privacy')} className="hover:text-teal-600 cursor-pointer flex items-center gap-1 transition-colors"><Lock size={10}/> Privacy Policy</li>
                        <li onClick={() => setView('disclaimer')} className="hover:text-teal-600 cursor-pointer flex items-center gap-1 transition-colors"><AlertCircle size={10}/> Disclaimer</li>
                        <li onClick={() => setView('privacy')} className="hover:text-teal-600 cursor-pointer transition-colors">Cookie Policy</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-gray-800 text-xs mb-3 uppercase tracking-wide">Popular Routes</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {['Kozhikode', 'Manjeri', 'Thrissur', 'Palakkad', 'Kannur', 'Aluva'].map(city => (
                            <span key={city} onClick={() => onQuickSearch(city)} className="text-[9px] font-bold bg-gray-50 text-gray-500 px-2 py-1 rounded border border-gray-100 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 cursor-pointer transition-all">
                                Bus to {city}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-3">
                <p className="text-[10px] text-gray-400 font-medium">
                    © 2026 evidebus.com. All rights reserved. Not affiliated with KSRTC.
                </p>
                <p className="text-[9px] text-gray-300 max-w-sm text-center md:text-right">
                    <strong>Disclaimer:</strong> Timings shown are based on user contributions and may vary. Please verify with official enquiry counters before travel. We are not responsible for missed buses or schedule changes.
                </p>
            </div>
        </div>
    </footer>
);