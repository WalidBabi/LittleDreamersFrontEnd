import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Card, CardContent, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
  const faqData = [
    {
      id: 1,
      question: 'What types of toys does your store offer?',
      answer:
        'We offer a wide range of toys including educational, creative, outdoor, electronic, and more suited for various age groups.',
    },
    // Add more questions and answers similarly
    {
        id: 2,
        question: 'How does the personalized recommendation system work?',
        answer: "Our recommendation system analyzes your child's preferences, age, interests, and past selections to suggest suitable toys.",
      },
      {
        id: 3,
        question: "Are the personalized recommendations based on my child's age group?",
        answer: "Yes, the system considers your child's age and developmental stage to recommend age-appropriate toys.",
      },
      {
        id: 4,
        question: 'Do you offer toys for children with special needs?',
        answer: 'Yes, we have a range of toys designed for children with special needs, ensuring inclusivity.',
      },
      {
        id: 5,
        question: 'What safety measures are taken for the toys?',
        answer: 'All toys go through strict safety checks and meet safety standards to ensure child safety.',
      },
      {
        id: 6,
        question: 'How can I find the best educational toys for my child?',
        answer: 'Our store categorizes toys based on educational value, making it easier to find toys that foster learning.',
      },
      {
        id: 7,
        question: 'Are there any membership perks for frequent customers?',
        answer: 'Yes, we offer membership rewards, discounts, and early access to promotions for our valued customers.',
      },
      {
        id: 8,
        question: "Can I get recommendations based on my child's hobbies or interests?",
        answer: "Absolutely! Our recommendation system tailors suggestions based on your child's specific interests and hobbies.",
      },
      {
        id: 9,
        question: 'Are the toys environmentally friendly or sustainable?',
        answer: 'We strive to offer toys that are environmentally friendly, recyclable, and made from sustainable materials',
      },
      {
        id: 10,
        question: 'Can I track the status of my order after purchase?',
        answer: 'Yes, you can track your order through our website using the provided tracking information.',
      },
      {
        id: 11,
        question: 'How often are new toys added to your collection?',
        answer: "We frequently update our collection with new and innovative toys, so there's always something fresh to explore.",
      },
      {
        id: 12,
        question: 'Do you provide toy assembly instructions?',
        answer: 'Yes, most toys come with detailed assembly instructions. If needed, our staff is also available to assist.',
      },
      {
        id: 13,
        question: 'Are there any live assistance or customer support options available?',
        answer: 'Yes, our customer support team is available during business hours to assist you with any queries or concerns.',
      },
      {
        id: 14,
        question: 'Can I find classic or vintage toys at your store?',
        answer: 'Yes, we have a selection of classic and vintage toys for those looking for nostalgic options.',
      },
      {
        id: 15,
        question: 'How can I provide feedback or suggestions regarding the toys or services?',
        answer: "We value your feedback! You can share your thoughts through our website's feedback form or directly contact our customer support.",
      }
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      {faqData.map((item) => (
        <Accordion key={item.id} className="mb-3">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FAQ;
