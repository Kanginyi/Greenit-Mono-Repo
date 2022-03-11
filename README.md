# Greenit

## Table of Contents

* [Live Link](#live-link)
* [Video Demo](#video-demo)
* [Description](#description)
* [Technologies](#technologies)
* [Setup](#setup)
* [Design](#design)

<a name="live-link"/>

## Live Link

`Ctrl` + `Left Click` to open in a new tab!

Also as a heads up! Heroku apps may sometimes take a while to load, please be patient and give it a little time~ Thank you!! 🥰

https://greenit-reddit.herokuapp.com/

<a name="video-demo"/>

## Video Demo

`Ctrl` + `Left Click` to open in a new tab!

https://www.youtube.com/watch?v=_H0p6rSPhKg

<a name="description"/>

## Description

Reddit inspired social networking website that allows users to upload blogs and interact with each others' posts. 

________________________________________________________________________

- Implemented full CRUD actions that allows users to create, view, modify, and delete blogs
- Integrated user authentication by identifying account information with BCrypt
- Concentrated efforts on a creating responsive and accessible web page layout


<a name="technologies"/>

## Technologies/Requirements

- Ruby 2.7.4
- React
- NodeJS (v16) and npm
- Heroku CLI
- PostgreSQL

<a name="setup"/>

## Setup

First **fork** the project repository, then clone the project onto your local machine:
```
$ git clone git@github.com:**YOUR USERNAME**/Greenit-Mono-Repo.git
$ cd Greenit-Mono-Repo
$ bundle install
$ npm install --prefix client
$ sudo service postgresql start
$ rails s

<!-- Inside of a new terminal -->
$ npm start --prefix client
```

<a name="design"/>

## Design

### Data Relationships

![image](https://i.imgur.com/y2Uemzz.png)

### Component Hierarchy

![image](https://i.imgur.com/wv0cZwt.png)
