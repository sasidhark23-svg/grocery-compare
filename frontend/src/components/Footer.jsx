import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">GroceryCompare</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Compare clearly labelled sample grocery listings and plan everyday shopping with confidence.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-emerald-400 transition">Home</Link></li>
              <li><Link to="/search" className="hover:text-emerald-400 transition">Search & Compare</Link></li>
              <li><Link to="/lists" className="hover:text-emerald-400 transition">Shopping Lists</Link></li>
              <li><Link to="/favorites" className="hover:text-emerald-400 transition">Favorites</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Popular Stores</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Reliance Smart</li>
              <li>DMart</li>
              <li>BigBasket</li>
              <li>Amazon Fresh</li>
              <li>Blinkit</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform Features</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Lowest Price Engine</li>
              <li>Shopping List Optimizer</li>
              <li>Price Drop Alerts</li>
              <li>Price History Charts</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} GroceryCompare. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for smart grocery shoppers</span>
          </p>
        </div>
        <p className="mt-4 text-center text-xs text-gray-500">Sample prices and store availability are illustrative and are not live retailer data.</p>
      </div>
    </footer>
  );
}
