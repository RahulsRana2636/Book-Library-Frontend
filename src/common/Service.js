import React, { useState, } from 'react';
import '../style/Service.css'; 

const Services = () => {
    const data = [
        {
            name: 'Rahul',
            age: 18,
            city: 'Delhi',
            language: 'JavaScript',
            framework: 'React',
            image: 'https://randomuser.me/api/portraits/men/9.jpg',
        },
        {
            name: 'Chandan',
            age: 24,
            city: 'Mumbai',
            language: 'BlockChain',
            framework: 'MongoDB',
            image: 'https://randomuser.me/api/portraits/men/22.jpg',
        },
        {
            name: 'Rohan',
            age: 22,
            city: 'Banglore',
            language: 'Python',
            framework: 'flask',
            image: 'https://randomuser.me/api/portraits/men/48.jpg',
        },
        {
            name: 'Khilesh',
            age: 28,
            city: 'Pune',
            language: 'NodeJS',
            framework: 'Angular',
            image: 'https://randomuser.me/api/portraits/men/45.jpg',
        },
        {
            name: 'Preeti',
            age: 20,
            city: 'Chenai',
            language: 'Java',
            framework: 'React',
            image: 'https://randomuser.me/api/portraits/women/10.jpg',
        },

]
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextAuthor = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const currentCandidate = data[currentIndex];
  function endBox(){
      alert('End of Author List');
      setCurrentIndex(0);
    
  }

  return (
    <>
      <section id="book">
        <div className="row">
          <div className="col-md-6 mx-auto text-center">
            <h1 className="my-3">Some Author And Their Books</h1>
            {currentCandidate ? (
              <>
                <div id="image">
                  <img src={currentCandidate.image} alt={currentCandidate.name} />
                </div>
                <br />
                <div id="profile">
                  <ul>
                    <li>Name: {currentCandidate.name}</li>
                    <li>{currentCandidate.age} years old</li>
                    <li>Lives in {currentCandidate.city}</li>
                    <li>Works on {currentCandidate.language}</li>
                    <li>Uses {currentCandidate.framework} framework</li>
                  </ul>
                </div>
              </>
            ) : (
             endBox()
            )}
            <br />
            <button className="nextBtn" onClick={nextAuthor}>
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
