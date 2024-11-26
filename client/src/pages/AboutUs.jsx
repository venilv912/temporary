import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './AboutUs.css';

import Venil from '../assets/Venil.jpg' 
import Parth from '../assets/parth.jpeg'
import Chintan from '../assets/chintan.jpeg'
import Mihir from '../assets/Mihir.jpg'
import Meghavi from '../assets/Meghavi.jpeg'
import Ayush from '../assets/Ayush.jpeg'
import  Harshal from '../assets/harshal.jpeg'
import Jeet from '../assets/jeet.jpeg'
import Shruti from '../assets/Shruti.jpg'
import Ashutosh from '../assets/Ashutosh.jpeg'


const teamData = {
  team: [

    {
      name: 'Venil Vekariya',
      //id: '202201078',
      photo: Venil, 
      github: 'https://github.com/venilv912',
      linkedin: 'https://www.linkedin.com/in/venilv912/',
    },

    {
      name: 'Parth Dholariya',
      //id: '202201085',
      photo: Parth,
      github: 'https://github.com/parthdholariya13',
      linkedin: 'https://www.linkedin.com/in/parth-dholariya-0804ab281/',
    },

    {
      name: 'Chintan Bhara',
      //id: '202201060',
      photo: Chintan,
      github: 'https://github.com/Pheonix2507',
      linkedin: 'https://www.linkedin.com/in/chintan-bhara-398633279/',
    },


    {
      name: 'Mihir Moolchandani',
      //id: '202201088',
      photo: Mihir,
      github: 'https://github.com/horrible-hacker',
      linkedin: 'https://www.linkedin.com/in/mihir-moolchandani/',
    },


    {
      name: 'Meghavi Gohil',
      //id: '202201015',
      photo: Meghavi,
      github: 'https://github.com/Meghavi0811',
      linkedin: 'https://www.linkedin.com/in/meghavi-gohil-108264258/',
    },

    {
      name: 'Ayush Gandhi',
      //id: '202201057',
      photo: Ayush, 
      github: 'https://github.com/Ayush202201057',
      linkedin: 'https://www.linkedin.com/in/ayush-gandhi-230620294/',
    },

    {
      name: 'Harshal Patel',
      //id: '202201070',
      photo: Harshal,
      github: 'https://github.com/Harshal9865',
      linkedin: 'https://www.linkedin.com/in/harshal-patel-254843318/',
    },

    {
      name: 'Jeet Patel',
     // id: '202201089',
      photo: Jeet,
      github: 'https://github.com/jeet30042005',
      linkedin: 'https://www.linkedin.com/in/jeet-patel-750a95258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },

    {
      name: 'Shruti Choudhary',
      //id: '202201020',
      photo: Shruti,
      github: 'https://github.com/src3004',
      linkedin: 'https://www.linkedin.com/in/shruti-ranjit-choudhary-63bbba250/',
    },

    {
      name: 'Ashutosh Singarwal',
      //id: '202201054',
      photo: Ashutosh, 
      github: 'https://github.com/Ashutosh-Singarwal',
      linkedin: 'https://linkedin.com',
    },
  ],
};

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-us-page">
      <header className="navbar">
        <h1 className='text-3xl font-semibold text-green-700 mb-3'>About Us</h1>
      </header>

      {/* Card for About Website */}
      <div className="card about-website">
        <h2>About the Website</h2>
        <p className="font-semibold">
        Our Real Estate Management System streamlines property searching, buying, and renting, making it 
        easier than ever to find your ideal space. Whether you're looking for a cozy home, 
        a prime office location, or a lucrative investment property, we provide tailored solutions to match your needs and budget. 
        Let us help you turn your property dreams into reality!
        </p>
      </div>

      {/* Card for About Team */}
      <div className="card about-team">
        <h2>Meet Our Team</h2>

        {/*The Team*/}
        <div className='team-grid'>
          {teamData.team.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>

      </div>

      
    </div>
  );
};

const TeamCard = ({ member }) => {
    return (
      <div className="team-card">
        <img src={member.photo} alt={`${member.name}'s photo`} className="team-photo" />
        <h3>{member.name}</h3>
        <div className="social-links">
          <a href={member.github} target="_blank" rel="noopener noreferrer" className="social-link github">
            GitHub
          </a>
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
            LinkedIn
          </a>
        </div>
      </div>
    );
  };
  

const styles = {
  footer: {
    backgroundColor: "#111",
    color: "#fff",
    padding: "40px 0",
  },

  footerSection: {
    padding: "0 15px",
    marginBottom: "30px", // Added margin for spacing between sections
  },

  heading: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "1rem",
  },

  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  link: {
    color: "#ddd",
    textDecoration: "none",
    display: "block",
    padding: "5px 0",
  },

  text: {
    color: "#bbb",
    fontSize: "0.9rem",
    lineHeight: "1.5",
  },

  galleryImages: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px", // Reduced gap for a more compact layout
  },

  galleryImage: {
    width: "100%",
    height: "80px", // Decreased height of images
    objectFit: "cover", // Ensures images fill the space without distortion
    borderRadius: "5px",
  },

  footerBottom: {
    borderTop: "1px solid #444",
    paddingTop: "15px",
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "-40px", // Adjusted margin for spacing
  },

  footerText: {
    fontSize: "0.9rem",
    color: "#bbb",
  },

  backToTop: {
    color: "#28a745",
    fontSize: "1.2rem",
    textDecoration: "none",
    marginLeft: "10px",
  },
};

export default AboutUs;