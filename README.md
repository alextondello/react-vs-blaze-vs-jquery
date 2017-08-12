# react-vs-blaze-vs-jquery

This project is a simple implementation of a multi-step progress bar. This could be used in an application to indicate to the user how far along the way he is to complete the setup during his registration.

The app has 2 states:
- `step` which represents in which step of the setup process users are at. This value can range from 1 to 4.
- `stepPercentage` which represents the sub-steps completion. This value can range from 0 to 100.

The goal was to implement the following behaviour:
1. Fill up all bars and nodes up to `step`
2. Fill up `stepPercentage`% of the bar in between the current node and the next node (this doesn’t apply to the last node since there are no bars on the right).
3. Buttons are used to emulate changes in `step` and a Slider is used to emulate changes in `stepPercentage`.

I then decided to compare different Javascript frameworks to see how would they differ in mindset and codewise. This resulted in this 4 applications that you can see and test here:
- jQuery (only)
- Meteor + Blaze
- React
- React + Redux

A couple of observations are worth minding:
- I did write my jQuery app with the mindset of state variables and "rendering" the "component" according with it's state.
- The Meteor app can have it's code reduced even further, but I decided to leave it like this in favor of readability.
- I could have used [classnames](https://github.com/JedWatson/classnames) in React but that would probably not change much codewise.

Lines of code (main `.js` file) for each solution (excluding comments):
- jQuery (65)
- Meteor (91)
- React (173)
- React/Redux (203)

### Running each app
You'll need to have Node and Meteor installed to run all apps:
- https://nodejs.org/en/download
- https://www.meteor.com/install

#### jQuery
- cd jquery-app
- npm install
- npm start

#### Meteor
- cd meteor-app
- meteor npm install
- meteor

#### React
- cd react-app
- npm install
- npm start

#### React + Redux
- cd react-redux-app
- npm install
- npm start

Visit http://localhost:3000/ to see the app running.
