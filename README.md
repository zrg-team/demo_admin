# About

Project for building Admin page base on [create-react-app](https://create-react-app.dev/)

We focus on:
 + Same source structure with react-native mobile application
 + Easy to develop and scale
 + Easy to handle error and finding problems
 + Worked properly even no-network
 + Enhance user experience by cached user data
 + etc

## Structure

public: base html logo

src: source code

 + assets: assets used by application, like images, jsons, etc
 + common: common components and features which can reuse by another modules
 + configs: configs server, contract, etc ,...
 + modules: the application make up by a lot of modules: user, home, etc. It make simpler to develop and easier finding problems.
 + pages

## Common Features

+ Route system: handle application route and support page change event
+ Persist system: user data like user, etc will be cached ( make sure app can work event no-network and enhance user experience )
+ State management
+ Support authentication fetch, JWT
