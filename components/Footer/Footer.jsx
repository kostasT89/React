import React from 'react';
import cms from '../../config/messages';
import { getCurrentYear } from '../../utils/dateUtils';
import './Footer.scss';

const Footer = () => (
  <div className="lc-footer">
    <div className="lc-footer__logo columns medium-4">
      <span className="lc-footer__logo">fisecal</span>
    </div>
    <div className="lc-footer__toolbar columns medium-6">
      <button>Product</button>
      <button>Company</button>
      <button>Features</button>
      <button>Support</button>
      <div>
        { cms['footer.title'](getCurrentYear()) }
      </div>
    </div>
  </div>
);

export default Footer;
