// src/components/shared/Footer.tsx
import Link from "next/link";
import { Logo } from "./Logo";

// No props are needed anymore. The component is self-contained.
export function Footer() {
  // Define the links in a structured way to make the JSX cleaner.
  // The 'href' should match the actual paths in your `app` directory.
  const footerLinkSections = {
    Services: [
      { label: "Credential Evaluation", href: "/services" },
      { label: "Education Transition", href: "/services" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "For Organizations", href: "/for-orgs" },
    ],
    Resources: [
      { label: "FAQ", href: "/faq" },
      { label: "Processing Times", href: "/how-it-works" },
      { label: "Document Requirements", href: "/application" },
      { label: "Success Resources", href: "/services" }, // Or link to a future /blog page
    ],
    Support: [
      { label: "Contact Us", href: "/contact" },
      { label: "Track Application", href: "/" },
      { label: "Privacy Policy", href: "/" },
      { label: "Terms of Service", href: "/" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo Section */}
          <div>
            <div className="mb-6">
              {/* Wrap the Logo in a Link component to make it navigable */}
              <Link href="/" className="text-white hover:opacity-80">
                <Logo size="lg" showText={true} />
              </Link>
            </div>
            <p className="text-gray-400">
              Complete credential evaluation services combined with education
              transition support for international professionals and students
              seeking opportunities in the United States.
            </p>
          </div>

          {/* Dynamically create the link columns from our data structure */}
          {Object.entries(footerLinkSections).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-bold mb-6">{title}</h4>
              <ul className="space-y-3">
                {links.map((link, i) => (
                  <li key={i}>
                    {/* Use the Link component for navigation */}
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 hover-lift inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Center for Education Transitions. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
