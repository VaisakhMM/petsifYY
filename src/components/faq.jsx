import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Typography, Accordion, AccordionSummary, AccordionDetails, Container } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import '../components/faq.css';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: 'What is PeTsiFy?',
      answer: 'PeTsiFy is a platform dedicated to helping you find the perfect pet for adoption, offering resources and support for pet care and companionship.',
    },
    {
      question: 'How can I adopt a pet?',
      answer: 'You can browse through our available pets on the adoption page and follow the instructions provided to complete the adoption process.',
    },
    {
      question: 'What is the adoption process?',
      answer: 'The adoption process involves browsing pets, selecting one, and completing the adoption through our platform.',
    },
    {
      question: 'What services does PeTsiFy offer?',
      answer: 'We offer a variety of services including pet adoption, care guides, and connections to local veterinarians and pet stores.',
    },
    {
      question: 'Is there a fee for adoption?',
      answer: 'Yes, there is a small adoption fee that helps us cover the cost of medical care, food, and shelter for the animals.',
    },
    {
      question: 'How can I contact PeTsiFy for support?',
      answer: 'You can reach out to us via the contact page, where you can fill out a form or find our customer support contact details.',
    },
  ];

  return (
    <Container sx={{ py: 6 }}>
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          mb: 4,
          fontFamily: "serif",
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Let’s Answer Some of Your Questions
      </Typography>
      {faqData.map((item, index) => (
        <motion.div
          key={index}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          <Accordion 
            expanded={activeIndex === index}
            onChange={() => toggleFAQ(index)}
            sx={{ mb: 2 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-${index}-content`}
              id={`faq-${index}-header`}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        </motion.div>
      ))}
    </Container>
  );
};

export default FAQ;




