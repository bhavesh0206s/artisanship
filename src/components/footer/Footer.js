import React from 'react';

const Footer = () => {
  return (
    <div style={{backgroundColor:"#706c61"}}>
      <footer style={{display:"flex", justifyContent:"space-around"}}>
            <div style={{color:"white", fontSize:".75rem"}}>
              Copyright &copy; 2020 Artisanship
            </div>
            <div style={{color:"white", fontSize:".75rem"}}>
              Made with &hearts; by <a href="https://github.com/bhavesh0206s" style={{ color: 'inherit'}}>Bhavesh Suthar</a>
            </div>
      </footer>
    </div>
  );
}
 
export default Footer;