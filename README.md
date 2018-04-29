Unit 2 - Find Your Toys
===

Details
===
The ultimate goal of this app is to connect people with the toys they desire at the balancing the best possible price with convenience. The secondary goal is to allow users to sell their unwanted toys at the most reasonable price.


Minimum Viable Product (MVP)
===
- ability to search multiple toy sites
- CRUD searches
- **API**
-- Google


Next Steps
===
- user sign up, login and log out
- Associate searches with user
- select what sources you want to search
- **More API**
-- eBay
-- Amazon
-- Different Google Options


Updates Needed
===
- Logo for header
- Update tagline
- Use Sass for CSS
- Update colors
- Move results text to right of Results
- align update button to title
- Style Searched: and Search terms differently
- Remove header at mobile size
- Add more search hints and write better
- Make Search button bigger
- Update glow on field (Mac only?)
- Style Save Search Modal better
- Make update a Modal
- Reverse Modal buttons


Questions
===
**Routes**
- What is the point of :id?
- Why do some people have .put, .delete, etc. instead of just .post and .get?
- How to .put, etc. correlate to POST and GET?

**Controllers**
- I need to call APIs from multiple controllers, a function didn't work, what is better way?
- I was trying to do updates, then forward them to other pages with other calls, best practice?
- I get a 500 on my update, but it still updates and runs the rest of the controller?
- To add a title using EJS, I made a new obj with the title and data. Is there a better way?

**DB**
- Do we need to seed a DB?
- Do we need to add a collection to add documents to it?

**Views**
- Should scripts go in the HEAD or before BODY? Why?
- Using hidden fields to pass data? What about URL parameters? Better to do DB query to get data?
- Is there a way to make buttons submit multiple values with just a BUTTON?

**Misc**
- Why is there sometime parameters in the URL? What is the purpose?
- I'm passing data in hidden fields all over. Could that been better with URL parameters.


Resources
===
- **Trello** - https://trello.com/b/vpn1piOn/unit-2-find-your-toys
- **GitHub** - https://github.com/jasonspiller/unit-2-find-your-toys
- **Heroku** - https://find-your-toys.herokuapp.com
- **APIs** - TBD
