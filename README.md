#  Acquire - Trade Stocks and ETFs

Acquire aims to create a simple user experience to exchange Stocks and ETFs with real or paper currency.

Acquire features multiple portfolios, where users can group their investments however they please.

Additionally, Acquire will feature a feature-full stock querying option to make searching for your next investment as simple as possible.

## See Demo Here:

https://www.youtube.com/watch?v=8VyhEzoZgDc

# Getting Started

Download the LTS version of [Node.js](https://nodejs.org/en/). You can confirm Node is installed by running the following command in your terminal:

`node -v`

Install [Yarn](https://classic.yarnpkg.com/en/) by running the following command in your terminal:

`npm install --global yarn`

You can confirm yarn is installed by running the following command in your terminal:

`yarn -v`

Now that you have yarn installed, you can run scripts necessary to launch the app. However, since this is your first time in the project, you will have to install the project's dependencies on your local machine using the following command in the project's repository:

`yarn install`

And with that, you're ready to go!

# Starting the App

You can start the app by running:

`yarn dev`

The pages will be accessible at `localhost:3000/page-here`

# Making Changes

All changes made will be made to their own branches. These branches will be made for you ahead of time so you won't have to worry about syncing up with the main branch or anything. When you are satisfied with all of the changes you have made (or you just want to commit your changes as WORK IN PROGRESS), you can do so by running the following commands from the root directory:

`git add .` which will stage all of your changes to be commited,

`git commit -m "INSERT A BRIEF DESCRIPTION HERE"` to commit the changes to your local branch,

`git push origin BRANCH_NAME` to finally push the changes to the remote (gitlab).


[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
