import { motion } from "framer-motion";
import { Github, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="w-full bg-[var(--color-card)] text-[var(--color-card-foreground)]">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-md flex items-center justify-center"
                style={{ background: "var(--brand-gradient)", color: "var(--primary-foreground)" }}
              >
                <span className="font-bold">W</span>
              </div>
              <div>
                <div className="font-semibold">Wasselni</div>
                <div className="text-xs text-muted-foreground">Lebanon's most advanced ridesharing platform.</div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <a aria-label="Instagram" href="#" className="p-2 rounded-full hover:bg-muted/40">
                <Instagram className="w-4 h-4" />
              </a>
              <a aria-label="Twitter" href="#" className="p-2 rounded-full hover:bg-muted/40">
                <Twitter className="w-4 h-4" />
              </a>
              <a aria-label="Github" href="#" className="p-2 rounded-full hover:bg-muted/40">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* For Riders */}
          <div>
            <h4 className="font-semibold mb-3">For Riders</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/rides">Find Rides</Link></li>
              <li><Link to="/rides">How It Works</Link></li>
              <li><Link to="/rides">Safety Features</Link></li>
              <li><Link to="/rides">Pricing</Link></li>
              <li><Link to="/rides">Mobile App</Link></li>
            </ul>
          </div>

          {/* For Drivers */}
          <div>
            <h4 className="font-semibold mb-3">For Drivers</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/rides">Become a Driver</Link></li>
              <li><Link to="/rides">Driver Requirements</Link></li>
              <li><Link to="/rides">Earnings Calculator</Link></li>
              <li><Link to="/rides">Driver Support</Link></li>
              <li><Link to="/rides">Insurance Coverage</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/rides">About Wasselni</Link></li>
              <li><Link to="/rides">Careers</Link></li>
              <li><Link to="/rides">Press & Media</Link></li>
              <li><Link to="/rides">University Partnerships</Link></li>
              <li><Link to="/rides">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-muted/20" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} Wasselni. All rights reserved. <span className="mx-2">•</span> <Link to="/rides">Privacy Policy</Link> <span className="mx-2">•</span> <Link to="/rides">Terms of Service</Link></div>
          <div className="text-xs">Made with rami et lello from Lebanon • <a href="mailto:wasselni@outlook.com">hello world!</a></div>
        </div>
      </motion.div>
    </footer>
  );
}