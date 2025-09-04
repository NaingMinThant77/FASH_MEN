import { Facebook, Instagram, X, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-screen-xl py-8 px-6 sm:flex justify-between mx-auto">
        {/* Brand Section */}
        <div className="p-5 sm:w-7/12 border-r border-gray-700 text-center sm:text-left">
          <h3 className="font-extrabold text-2xl text-white tracking-wide mb-4">
            FASN_MEN
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Redefining modern menswear with timeless elegance and bold statement
            pieces. Designed for confidence, crafted for comfort.
          </p>
        </div>

        {/* Contact Section */}
        <div className="p-5 sm:w-4/12 text-center sm:text-left">
          <h4 className="text-sm uppercase text-white font-semibold mb-3">
            Contact Us
          </h4>
          <ul className="space-y-2">
            <li>
              <a className="hover:text-white transition-colors" href="#">
                123 Fashion Ave, New York, NY
              </a>
            </li>
            <li>
              <a className="hover:text-white transition-colors" href="#">
                info@fash_men.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col items-center border-t border-gray-700 py-6 max-w-screen-xl mx-auto">
        <div className="flex space-x-4 mb-4">
          <a
            href="#"
            className="hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors"
            aria-label="Twitter / X"
          >
            <X className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors"
            aria-label="Youtube"
          >
            <Youtube />
          </a>
        </div>
        <div className="text-xs text-gray-500">
          © {new Date().getFullYear()} FASH_MEN. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
