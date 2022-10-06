# MovieSpot

A multi page web app for viewing movies and tv series.

## Table of contents

- [Overview](#overview)

- [The challenge](#the-challenge)

- [Screenshot](#screenshot)

- [Links](#links)

- [My process](#my-process)

- [Built with](#built-with)

- [What I learned](#what-i-learned)

- [Continued development](#continued-development)

- [Author](#author)

## Overview

### The challenge

Users should be able to

- [x] The user should be able to add/remove bookmarks from all movies and TV series
- [x] Search for relevant shows on all pages
- [x] View the optimal layout for the app depending on their device's screen size
- [x] Login/Signup
- [x] Logout

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

### Links

- Solution URL: [https://github.com/Ibarra11/Movie_App](https://your-solution-url.com)

- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup

- React

- Next

- TypeScript

- Tailwind

- Prisma

- Postgres

- Railway

### What I learned

### Deploying on Vercel

I did struggle a bit when trying to deploy my app on Vercel. In Development, I was using a development environment variable as a base URL for my API calls. What i did was just determine whether or not the app was running in production or development and set a server variable to it. I also had an issue during the static generation of my pages because in the \_app page I was making an API call to an endpoint to determine whether or not the user had a valid session. During static generation the server is not up yet so you can't make API calls during this time. To workaround this, I used a state variable to track whether the component was mounted or not. Initially, the state variable is set to false and in a useEffect that runs after the initial mount what set it to true allowing the API call to be made. This just bypassed the static generation constrains, which might not be the best approach.

#### Accessibility

These are some things I did in the app to make it more accessible

- Add aria-labels to the buttons on the slider to give them a more meaningful name.
- Add aria-labels to the navigation buttons because they just contain icons
- Ensure that all img tags have alt attributes
- I added a live region of error on the form when there is a validation error when either signup up or logging in.

#### Type Safety

To bridge the gap between the backend and the frontend I used codegen to generate types for my GraphQL queries and mutations. I also used TypeScript throughout the project and even made some hooks with TypeScript.
For Example, this useSearch hook takes in an array of objects and returns a new array of objects that match the filter string based on a property of the object. In this case, the objects are movies and I return a new array of movies based on the searchValue. With generics I can ensure that whenever I use the hook the filterBy key has to be one of the properties of the objects in the array.

```html
function useSearch<T extends {[key: string: any}> (data: T[], searchValue:
string, filterBy: keyof T){}
```

#### Authentication

##### Password Management

For my authentication, I decided to use Bcrypt and Iron-Session. The role of Bcrypt was to hash the passwords for the login and signup form. Once I verified that either they are a user or they have successfully signed up, I then create a session for the user using Iron-Session. This means that the user no longer has to sign in as long as their session is valid.

##### Protected Routes

There are some routes in that app that should only be seen by users. For Example, routes /, /movies, /tv-series, and /bookmarked. In order to protect these routes, I check the session when the user visits these pages and if there is no session they get redirected to the login page.

### Continued development

- Add more animations
- Make the slider more accessible

## Author

- Website - [Add your name here](https://www.your-site.com)
