import React from 'react';
import '../style/About.css'; 
import book1Image from '../images/book-1.png';
import book4Image from '../images/book-4.png';
import book3Image from '../images/blog-3.jpg';
import book2Image from '../images/blog-4.jpg';
import book5Image from '../images/blog-5.jpg';
import book6Image from '../images/blog6.jpg';
import book7Image from '../images/blog9.jpg';
import book8Image from '../images/book-8.png';
import book9Image from '../images/book-10.png';
import AuthorSays from '../images/says.jpg';
import Author1 from '../images/author1.webp';
import Author2 from '../images/author7.jfif';
import Author3 from '../images/author5.jfif';
import Author4 from '../images/author8.jfif';
import Author5 from '../images/author4.jpg';
import Author6 from '../images/author6.jpg';

const HomePage = () => {

  return (
    <>
     <section id="home">
        <h1 className="h-primary">Welcome to Our College Library</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, fugiat!</p>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </section>
      <section id="Gallary" class="gallary">
        <div class="menu">Gallary</div>
        <div className="picture">
          <div className="images">
          <img src={book1Image} width="100" height="100" alt="Book 1" />

          </div>
          <div className="images">
            <img src={book4Image} width="100" height="100" alt="Book 4" />
          </div>
          <div className="images">
            <img src={book3Image} width="100" height="100" alt="Blog 3" />
          </div>
        </div>
        <div className="picture1">
          <div className="images">
            <img src={book2Image} width="100" height="100" alt="Blog 4" />
          </div>
          <div className="images">
            <img src={book5Image} width="100" height="100" alt="Blog 5" />
          </div>
          <div className="images">
            <img src={book6Image} width="100" height="100" alt="Blog 6" />
          </div>
        </div>

        <div className="picture2">
          <div className="images">
            <img src={book7Image} width="100" height="100" alt="Blog 9" />
          </div>
          <div className="images">
            <img src={book8Image} width="100" height="100" alt="Book 8" />
          </div>
          <div className="images">
            <img src={book9Image} width="100" height="100" alt="Book 10" />
          </div>
        </div>
    </section>

    <section id="Member" class="member">
        <div class="member-info">
            <h1>Our <span>Information</span></h1>
            <p>What Author says</p>
        </div>
        <div class="member-card">
        <img className="dp" src={AuthorSays} alt="Says" />
         <p>“You cannot force someone to face their problems when they don’t believe there is one.”
            </p>
            <h2> ― Steven Cuoco</h2>
        </div>

        <div className="m-images">
          <img src={Author1} alt="Author 1" />
          <img src={Author2} alt="Author 7" />
          <img src={Author3} alt="Author 5" />
          <img src={Author4} alt="Author 6" />
          <img src={Author5} alt="Author 8" />
          <img src={Author6} alt="Author 4" />
        </div>


    </section>
    </>
  );
};

export default HomePage;
