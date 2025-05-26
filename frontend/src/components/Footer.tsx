import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { section: "Product", links: ["Features", "Pricing", "FAQ", "Testimonials"] },
    { section: "Resources", links: ["Documentation", "API Reference", "Guides", "Support"] },
    { section: "Company", links: ["About", "Blog", "Careers", "Contact"] },
    { section: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] }
  ];
  
  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Footer top section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand and description */}
          <div className="lg:col-span-2">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-5 w-5 text-white"
                >
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </div>
              <span className="ml-2 font-bold text-xl">ReconcileAI</span>
            </div>
            <p className="mt-4 text-sm text-gray-500 max-w-md">
              Streamlining bank and ledger reconciliation with intelligent matching algorithms and intuitive reporting tools.
            </p>
            <div className="mt-6 flex space-x-4">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Button>
            </div>
          </div>
          
          {/* Footer links - responsive grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:col-span-2 lg:col-span-3 lg:grid-cols-4">
            {footerLinks.map((column) => (
              <div key={column.section}>
                <h3 className="text-sm font-semibold text-gray-900">{column.section}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Footer bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 text-center md:text-left">
            © {currentYear} ReconcileAI. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <p className="text-xs text-gray-500 flex items-center">
              Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> by ReconcileAI Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}