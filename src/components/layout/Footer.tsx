import { Link } from 'react-router-dom';
import { Sprout, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-leaf-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="w-7 h-7 text-pastel-green" />
              <span className="font-heading text-xl font-bold">
                Bloom<span className="text-peach">AI</span>
              </span>
            </div>
            <p className="text-sm text-green-200/70 leading-relaxed">
              Learning that grows with you. Adaptive microlearning that nurtures every student's unique journey.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-peach">Platform</h4>
            <ul className="space-y-2.5">
              <li><Link to="/login" className="text-sm text-green-200/70 hover:text-white transition-colors">Student Portal</Link></li>
              <li><Link to="/teacher" className="text-sm text-green-200/70 hover:text-white transition-colors">Teacher Dashboard</Link></li>
              <li><Link to="/tree" className="text-sm text-green-200/70 hover:text-white transition-colors">Learning Tree</Link></li>
              <li><Link to="/doubt" className="text-sm text-green-200/70 hover:text-white transition-colors">AI Companion</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-peach">Resources</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-green-200/70 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-green-200/70 hover:text-white transition-colors">For Schools</a></li>
              <li><a href="#" className="text-sm text-green-200/70 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-green-200/70 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-peach">Get in Touch</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-green-200/70 hover:text-white transition-colors">hello@bloomai.edu</a></li>
              <li><a href="#" className="text-sm text-green-200/70 hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="text-sm text-green-200/70 hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-200/20 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-green-200/50">
            © 2026 BloomAI. All rights reserved.
          </p>
          <p className="text-sm text-green-200/50 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-coral fill-coral" /> for every student
          </p>
        </div>
      </div>
    </footer>
  );
}
