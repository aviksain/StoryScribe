import React from 'react';

const TextExtractor = ({ htmlContent, wordLimit }) => {
  const parseHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const extractWords = (text, limit) => {
    const words = text.split(' ');
    return words.slice(0, limit).join(' ');
  };

  let textContent = extractWords(parseHTML(htmlContent), wordLimit);
  if(textContent != "") textContent += '...'
  
  return <div className='text-white opacity-50'>{textContent}</div>;
};

export default TextExtractor;
