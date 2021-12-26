# Image Processing API

## Description

This project is an API that can be used in two different ways. As a simple placeholder API, the first allows you to place images into your frontend with the size set via URL parameters (and additional stylization if you choose) for rapid prototyping. The second use case is as a library to serve properly scaled versions of your images to the front end to reduce page load size. Rather than needing to resize and upload multiple copies of the same image to be used throughout your site, the API you create will handle resizing and serving stored images for you.

## Table of Contents

-   [Description](#description)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Development](#development)
-   [Contribute](#contribute)

## Installation

Open your terminal and run the following command<br/>
`git clone https://github.com/AhmedMohammed3/FWD-image-processing-project`

## Usage

1. Open your terminal in the cloned folder and run the following set of commands:<br/>
   1. `npm i`
   2. `npm run build`
   3. `npm start`
2. Open http://localhost:3001/api/images?filename=fjord.jpg&width=200&height=200

## Contribute

### Adding new features or fixing bugs

1. Open your terminal and clone the repository<br/>
   `git clone https://github.com/AhmedMohammed3/FWD-image-processing-project`
2. Create your branch<br/>
   `git checkout -b {YOUR_BRANCH_NAME}`
3. run `npm run dev` to start development server (It's automatically building and restarting).
4. Make your edits and review it well.
5. Commit your changes with appropriate message. Follow [these git style guides](https://udacity.github.io/git-styleguide/)<br/>
   `git checkout -b {YOUR_BRANCH_NAME}`
6. Push your changes<br/>
   `git push origin {YOUR_BRANCH_NAME}`
7. Create a pull request
