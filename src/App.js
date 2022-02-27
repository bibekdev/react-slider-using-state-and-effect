import { useState, useEffect } from 'react';
import { FaQuoteRight } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import data from './data';

const App = () => {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;

    if (index < 0) setIndex(lastIndex);
    if (index > lastIndex) setIndex(0);
  }, [index, people]);

  useEffect(() => {
    let autoSlider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(autoSlider);
  }, [index]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>Reviews
        </h2>
      </div>

      <div>
        <section className="section-center">
          {people.map((person, personIndex) => {
            const { id, name, title, image, quote } = person;

            let position = 'nextSlide';

            if (personIndex === index) position = 'activeSlide';

            if (
              personIndex === index - 1 ||
              (index === 0 && personIndex === people.length - 1)
            )
              position = 'lastSlide';

            return (
              <article key={id} className={position}>
                <img src={image} alt={name} className="person-img" />
                <h4>{name}</h4>
                <p className="title">{title}</p>
                <p className="quote">{quote}</p>
                <FaQuoteRight className="icon" />
              </article>
            );
          })}
          <button className="prev" onClick={() => setIndex(index - 1)}>
            <FiChevronLeft />
          </button>
          <button className="next" onClick={() => setIndex(index + 1)}>
            <FiChevronRight />
          </button>
        </section>
      </div>
    </section>
  );
};

export default App;
