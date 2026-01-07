import { Github, Twitter, Heart } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <div className="p-1 bg-gradient-to-r from-orange-500 to-red-500 rounded">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold">GitHub Roast AI</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Making developer humor accessible to all
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Contact
            </Link>
          </div>

          {/* Social & Copyright */}
          <div className="text-center md:text-right">
            <div className="flex justify-center md:justify-end gap-4 mb-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} GitHub Roast AI. All roasts are AI-generated for entertainment.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            This project is for entertainment purposes only. All roasts are AI-generated and should be taken in good humor. 
            The creators are not responsible for any offense taken from generated content.
          </p>
        </div>
      </div>
    </footer>
  );
}