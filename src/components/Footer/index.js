import React from 'react';
import classes from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <a 
        className={classes.rsLink} 
        href="https://rs.school/js/"
        rel="noreferrer"
        target="_blank"  
      >
      </a>

      <a 
        className={classes.githubLink} 
        href="https://github.com/stakebf"
        rel="noreferrer"
        target="_blank" 
      >
        stakebf
      </a>

      <a 
        className={classes.githubLink} 
        href="https://github.com/MashaLarchenko"
        rel="noreferrer"
        target="_blank" 
      >
        MashaL
      </a>
      <span className={classes.year}>2020</span>
    </footer>
  );
};

export default Footer;
