import { Logo } from './Logo';

interface FooterProps {
  setCurrentPage: (page: 'home' | 'services' | 'howItWorks' | 'faq' | 'application' | 'employers') => void;
}

export function Footer({ setCurrentPage }: FooterProps) {
  const handleNavClick = (page: 'home' | 'services' | 'howItWorks' | 'faq' | 'application' | 'employers') => {
    setCurrentPage(page);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="mb-6">
              <Logo 
                size="lg"
                onClick={() => handleNavClick('home')}
                className="text-white hover:opacity-80"
                showText={true}
              />
            </div>
            <p className="text-gray-400">
              Complete credential evaluation services combined with education transition 
              support for international professionals and students seeking opportunities in the United States.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                { label: "Credential Evaluation", page: "services" as const },
                { label: "Education Transition", page: "services" as const },
                { label: "How It Works", page: "howItWorks" as const },
                { label: "For Organizations", page: "employers" as const }
              ].map((link, i) => (
                <li key={i}>
                  <button 
                    onClick={() => handleNavClick(link.page)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover-lift inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-3">
              {[
                { label: "FAQ", page: "faq" as const },
                { label: "Processing Times", page: "howItWorks" as const },
                { label: "Document Requirements", page: "howItWorks" as const },
                { label: "Success Resources", page: "services" as const }
              ].map((link, i) => (
                <li key={i}>
                  <button 
                    onClick={() => handleNavClick(link.page)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover-lift inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-3">
              {["Contact Us", "Track Application", "Customer Service", "Privacy Policy", "Terms of Service"].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 hover-lift inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Center for Education Transitions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}