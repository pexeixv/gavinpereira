---
title: History of gavinpereira.in
date: 2021-09-15
---

# History of gavinpereira.in

## Pretext

In May of 2020, I had a lot of time at hand since classes had gone online due to the pandemic. I would waste my time watching stupid TV shows. I watched a video on "How to upscale yourself as a freelancer". One of the points included having a website of your own rather than hosting your portfolio on Instagram, Behance or Dribbble. I began looking for a developer who could build me a website. I wasn't able to find any in the tight budget I had at that time. What do you need to build a website? HTML and CSS! I thought to myself "I am a programmer myself. How difficult can HTML and CSS really be? Can't I build the website by myself rather than hiring a developer?". I was taught basics of HTML in higher secondary, but I learnt it just for the sake of passing. I knew it wasn't big of a deal to learn HTML and CSS, since I already had some prior knowledge in HTML. Moreover, I had a course called 'Web designing' in the following semester, so I knew that learning this will not be waste of time.

I sat down and watched a whole HTML crash course, followed by one on CSS. I picked all of it quite easily, but still wasn't comfortable to build a whole website by myself. Creating layouts and making them responsive is what I just couldn't do. On the way, I came across a website called [Tailblocks](https://tailblocks.cc/), which is a component library for [TailwindCSS](https://tailwindcss.com/). For which, definitely, prior knowledge of Tailwind is required. I saw that Tailblocks offers pre-made code for layouts that are also responsive. Even though I had never even heard of Tailwind, I decided to build my website using the blocks of code available on Tailblocks.

I took blocks from Tailblocks and added content of my own. Changes the titles, added photos of the logos that I had made. There were certain functionalities that I wanted to have. I remember implementing a sticky navigation bar by just copying some lines of code from [Stack Overflow](https://stackoverflow.com/), without understand what's actually happening. At that my only motto was "If it works, it works!".

After nearly 5 months of trial and error, I arrived at a website that was decent enough to be published on the web. In October 2020, I purchased the domain name 'gavinpereira.in', hooked it with a hosting provider and got the website up and running.

## Need for a framework

Fast forward to August 2021, and I have added exactly 4 portfolio posts in a span of 9 months. Not because I didn't have work to display. It was because the process of adding posts was just too long. To add a new post, I would have to first manually optimize the image for the web. Then manually add a new div in the HTML markup with the new details. I added 4 posts in this way and then just didn't bother to update it.

The main issues I was facing with this website was repetitive code. The header and footer were placed in every page's markup. Updating something in the header meant that I would have to manually copy the new header to each file. Adding new post in the portfolio needed me to manually add markup.

I had now become proficient in CSS and was quite comfortable in Javascript as well. I didn't want to have my website in Tailblocks, rather write my own styling. I decided to use Sass, which is a CSS preprocessor. I didn't know how to use advance Sass features like mixins, etc., but I only chose to use it for the syntactic sugar, which I thought was quite 'cool'. I learnt a static site generator named Eleventy.js which would help me get rid of repetitive code using its 'includes' directive and ability to spit out markup when data is provided. I came across Imagekit, which helped me host high-quality images and use them without having to manually optimize.

The requirements for the website rebuild were:

- Have a better way to add new portfolio posts.
- Create components for each repetitive block and include it wherever needed.
- Have a dark mode for the website.
- Display other fields of design I have worked in ('cus the old website only showed logos and logos)

Unlike last time, I first designed the entire website in Figma. I then built it using Sass and Eleventy. I just love how easy it is to make updates to the website.
