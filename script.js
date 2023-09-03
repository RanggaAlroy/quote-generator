"use strict";
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// GET Quote grom API
let apiQuotes = [];

function showLoadingAnimation() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function hideLoadingAnimation() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show new quote
function newQuote() {
  showLoadingAnimation();
  // pick rundom Quote from API quote array
  const quote = apiQuotes[Math.trunc(Math.random() * apiQuotes.length)];
  // check quote text length to determine styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  //   check if author has value
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Set quote, complete function
  hideLoadingAnimation();
}

async function getQuotes() {
  showLoadingAnimation();
  const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text= ${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event handler
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on load
getQuotes();
