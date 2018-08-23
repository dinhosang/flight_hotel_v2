const siteStrings = {
  languages: ['english', 'portuguese', 'italian'],
  searchTypes: ['inspiration', 'destination'],
  searchPaths: {
    inspiration: "inspiration-search",
    destination: "destination-search"
  },
  english: {
    english: "English",
    portuguese: "Portuguese",
    italian: "Italian",
    homepage: "Homepage",
    inspiration: "Inspiration",
    inspirationSearch: {
      inspFormHeader: "Inspiration Search - Select your origin from the available list, and find your dream destination.",
      originInput: "Origin: (required)",
      departDate: "Departure Date: (required)",
      returnDate: "Return Date: (required)",
      seatClass: {
        label: "Preferred Seat Type: (required)",
        economy: "Economy",
        premiumEconomy: "Premium Economy",
        business: "Business",
        first: "First"
      },
      currencySelectLabel: "Currency: (origin's by default)",
      directCheckboxLabel: "Direct Flights Only:",
      ticketsDesired: {
        label: "Tickets Required",
        adult: "Adult:",
        children: "Children (3-17yrs):",
        infant: "Infants (0-2yrs):"
      },
      formSubmissionErrors: {
        "origin-list": {
          "empty": "Please complete origin field.",
          "invalid": "Please select a valid origin from the list"
        },
        "depart-date": {
          "empty": "Please complete departure date field.",
          "passed": "Please enter a valid departure date. Only dates from today onwards accepted."
        },
        "return-date": {
          "empty": "Please complete return date field.",
          "tooEarly": "Return date must be a minimum of one day after departure date.",
          "tooFar": "Return date must be no later than 15 days after departure date."
        },
        "currency-select": {
          "invalid": "Please select a valid currency from the list, or leave cleared to use origin's currency."
        }
      }
    },
    submit: "Submit",
    destination: "Destination",
    altLogoImgText: "logo for site, and link to home page",
    wordForLanguage: "language"
  },
  portuguese: {
    english: "Inglês",
    portuguese: "Português",
    italian: "Italiano",
    homepage: "Homepage",
    inspiration: "Inspiration",
    inspirationSearch: {
      inspFormHeader: "Inspiration Search - Select your origin from the available list, and find your dream destination.",
      originInput: "Origin: (required)",
      departDate: "Departure Date: (required)",
      returnDate: "Return Date: (required)",
      seatClass: {
        label: "Preferred Seat Type: (required)",
        economy: "Economy",
        premiumEconomy: "Premium Economy",
        business: "Business",
        first: "First"
      },
      currencySelectLabel: "Currency: (origin's by default)",
      directCheckboxLabel: "Direct Flights Only:",
      ticketsDesired: {
        label: "Tickets Required",
        adult: "Adult:",
        children: "Children (3-17yrs):",
        infant: "Infants (0-2yrs):"
      },
      formSubmissionErrors: {
        "origin-list": {
          "empty": "Please complete origin field.",
          "invalid": "Please select a valid origin from the list"
        },
        "depart-date": {
          "empty": "Please complete departure date field.",
          "passed": "Please enter a valid departure date. Only dates from today onwards accepted."
        },
        "return-date": {
          "empty": "Please complete return date field.",
          "tooEarly": "Return date must be a minimum of one day after departure date.",
          "tooFar": "Return date must be no later than 15 days after departure date."
        },
        "currency-select": {
          "invalid": "Please select a valid currency from the list, or leave cleared to use origin's currency."
        }
      }
    },
    submit: "Submit",
    destination: "Destino",
    altLogoImgText: "logo for site, and link to home page",
    wordForLanguage: "language"
  },
  italian: {
    english: "Inglese",
    portuguese: "Portoghese",
    italian: "Italiano",
    homepage: "Homepage",
    inspiration: "Inspiration",
    inspirationSearch: {
      inspFormHeader: "Inspiration Search - Select your origin from the available list, and find your dream destination.",
      originInput: "Origin: (required)",
      departDate: "Departure Date: (required)",
      returnDate: "Return Date: (required)",
      seatClass: {
        label: "Preferred Seat Type: (required)",
        economy: "Economy",
        premiumEconomy: "Premium Economy",
        business: "Business",
        first: "First"
      },
      currencySelectLabel: "Currency: (origin's by default)",
      directCheckboxLabel: "Direct Flights Only:",
      ticketsDesired: {
        label: "Tickets Required",
        adult: "Adult:",
        children: "Children (3-17yrs):",
        infant: "Infants (0-2yrs):"
      },
      formSubmissionErrors: {
        "origin-list": {
          "empty": "Please complete origin field.",
          "invalid": "Please select a valid origin from the list"
        },
        "depart-date": {
          "empty": "Please complete departure date field.",
          "passed": "Please enter a valid departure date. Only dates from today onwards accepted."
        },
        "return-date": {
          "empty": "Please complete return date field.",
          "tooEarly": "Return date must be a minimum of one day after departure date.",
          "tooFar": "Return date must be no later than 15 days after departure date."
        },
        "currency-select": {
          "invalid": "Please select a valid currency from the list, or leave cleared to use origin's currency."
        }
      }
    },
    submit: "Submit",
    destination: "Destinazione",
    altLogoImgText: "logo for site, and link to home page",
    wordForLanguage: "language"
  }
};

export {siteStrings as default};
