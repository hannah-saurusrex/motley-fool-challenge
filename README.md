# Thoughts on my submission

Hi! Here are some thoughts on my submission:
Tech Stack: I used vanilla JS & CSS on this project. I have used React & Tailwind CSS on similar projects, but didn't feel they were necessary here. (You can view that project here, if you're curious: https://hungry-morse-69d490.netlify.app/).

With more time, I would introduce tooling (webpack, etc), but didn't feel the need to do so on this size project.

There are a few things that might pose an issue on IE11 (async/await, classList.toggle). However, I used async/await and toggle for simplicity sake.

This was a really fun project! Thanks for the opportunity to showcase my skills. I appreciate it! 🙏🏻👩🏻‍💻

# Fool.com Front End Developer Test Project

Hello potential Fool! We’d love to give you the chance to show off your skills! We want to see how you would create and design a keyword "hub page" for Fool.com.
Along with your technical skills we're hoping to gain better insight into how you communicate with team members, ask for help when necessary, take instruction, and solve problems.
This is your chance to demonstrate skills beyond what we can see from your resume and from a talking-only interview.

If you are familiar with all the technologies we are requesting that you use for this challenge, we estimate it will take around **10-15 hours to complete**.
If you are learning some of these particular tools for the first time, it may take you longer, and that’s OK!
Just keep us in the loop as to how things are going. Feel free to spend more time on it if you are on a roll and can’t stop the awesome!

## What are we looking for:

- Professional development work (clean code, well-organized, appropriate comments, integration tests where necessary, no loose ends, no sloppy spelling, no browser console errors).
- Creative problem solving on the technical side and for user enjoyment
- Solid analytical approach - are you solving the business problem, or just writing code?
- Good communication with us as you are working on the project, so we can get a feel for what it would be like to work with you!
- Please change anything you would like including entire layout, fonts, image/text sizing, or anything else you feel will make this page attractive to our target market.
  - Styles and Scripts can go in `/static/` directory

## The Challenge

One of our stakeholders would like to create a new webpage on our site. The business goal is to have keyword hub pages on our website that are associated with commonly searched keywords from organic traffic.
The stakeholder would like to create these pages so that users can easily find our great articles via organic search and once on the hub page, convert into our email marketing campaigns to receive more Foolish articles.

The first keyword they want to try creating a page for is "Stock Market News".
They have provided a basic HTML page with the copy they would like displayed (/templates/news_hub.html) along with the business requirements below.

Your technical team lead has provided the technical requirements below.
Your team and the stakeholder is expecting you to use your skills and creativity to implement the pieces of this page in a way that you think will best achieve the story goals and details.

### Business Requirements

- The page should clearly display information the user might be seeking when searching the term in a search engine.
- A clear design to highlight information so users know the topic of the articles on the page along with any other relevant information on the topic
- Displays the top 5 most recent articles on the topic (http://127.0.0.1:8000/api/articles)
- Users should be able filter articles by article bureau or by article instruments
  - If you would like to display any instrument data you can access API data at (http://127.0.0.1:8000/api/instruments)
- Display "join stock advisor" call to action (/templates/join_sa_cta.html) so users are encouraged to sign up for our flagship service, Stock Advisor

### Technical Requirements

- Needs to perform quickly on desktop and mobile.
- Feel free to use any front-end frameworks or tools you would like to enhance the experience to design. (Bootstrap, tailwind, vue, etc)
- Responsive for desktop (including large monitors) and mobile
- Ideally works in IE11, as well as the latest Safari, Edge, Firefox, and Chrome
- Code considers non-happy-paths

### Bonus Requirements

- Include any relevant meta tags, schema, or information for Search Engine Optimization of the page

## Project Guidelines and Setup

1. Host the project code on github
1. This is based on Django 2.x series, you'll need to be running python3
1. You'll need to get python/django running on your computer. If you do not already have an environment the Django website outlines how to get up and running.
   - If you're comfortable doing this yourself great! If not here are some guides.
   - Windows: https://docs.djangoproject.com/en/2.2/howto/windows/
   - Mac: https://gist.github.com/hakjoon/216be7abdb5746eb579656102b91d6e3 or https://medium.com/riow/how-to-setup-a-django-development-environment-on-mac-968d129bc661
1. Install Django 2.x packages via:

   `pip install -r requirements.txt`

   (`pip` may be `pip3` depending on how you install everything)

Once that completes you can run:

```
python minimal.py runserver
```

Open the project via http://127.0.0.1:8000/stock-market-news in your web browser.
