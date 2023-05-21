import React from 'react';
import '../components/AboutUs.css'
import { FaGithub } from 'react-icons/fa';
const developers = [
  {
    id: 1,
    name: 'Chloe Rodriguez',
    position: 'Back-end Developer',
    bio: 'xx.',
    git: 'https://github.com/chloerodd',
    avatar: '/images/chloe.jpeg',
  },
  {
    id: 2,
    name: 'Angelica Erazo',
    position: 'Product Lead & Release Branch Manager',
    bio: 'xx',
    git: 'https://github.com/amerazo',
    avatar: '/images/angelica.jpeg',
  },

  {
    id: 3,
    name: 'Laura',
    position: 'Front-end Developer',
    bio: 'xx',
    git: 'https://github.com/LauraBoBora',
    avatar: '/images/laura.jpeg',
  },
];

const AboutUs = () => {
  return (
    <div className='about-us-container'>
      <h1>About Us - Developers</h1>
      <div className='developers-container'>
      {developers.map((developer) => (
        <div key={developer.id} className='developer-card'>
          <img src={developer.avatar} alt={developer.name} />
          <h2>{developer.name}</h2>
          <h3>{developer.position}</h3>
          <p>{developer.bio}</p>
          <a href={developer.git} target="_blank" style={{color: '#000000', textDecoration: 'none'}}>
              <FaGithub size={30} />
        </a>
        
        </div>
      ))}
      </div>
    </div>
  );
};

export default AboutUs;
