import React from 'react';

const developers = [
  {
    id: 1,
    name: 'Chloe Rodriguez',
    position: 'Back-end Developer',
    bio: 'xx.',
    avatar: 'chloe.jpg',
  },
  {
    id: 2,
    name: 'Angelica Erazo',
    position: 'Product Lead & Release Branch Manager',
    bio: 'xx',
    avatar: 'angelica.jpg',
  },

  {
    id: 3,
    name: 'Laura',
    position: 'Front-end Developer',
    bio: 'xx',
    avatar: 'angelica.jpg',
  },
];

const AboutUs = () => {
  return (
    <div>
      <h1>About Us - Developers</h1>
      {developers.map((developer) => (
        <div key={developer.id}>
          <img src={developer.avatar} alt={developer.name} />
          <h2>{developer.name}</h2>
          <h3>{developer.position}</h3>
          <p>{developer.bio}</p>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;
