import React, { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";

const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="accordion">
            {items.map((item, index) => (
                <div key={index} className="accordion-item">
                    <button
                        className="accordion-header"
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={activeIndex === index}
                    >
                        {item.question}
                    <FaChevronDown className={`accordion-icon ${activeIndex === index ? 'rotate' : ''}`} />
                    </button>
                    <div
                        className={`accordion-content ${activeIndex === index ? 'active' : ''}`}
                    >
                        <p>{item.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;
