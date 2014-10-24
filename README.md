# Simple Pickup Coding Challenge
### Developed by Danny Francken

#### Live App : http://simplepu-31174.onmodulus.net/
======

## Challenges + Solutions

### Backend
After thinking about how I wanted to lay out the backend, I came up with a couple solutions.

The first was to have two separate collections: 1 for programs and another one for lessons.

When a user clicks on a program, the app makes a GET request with the Program's ID, and returns all the lessons where the program ID matches.

This would make editing individual lessons fairly simple, since it would be just like editing a single document. However, this would be resource intensive if you performed a GET request everytime someone changed the program.

This is where I had to make a big assumption. With a production app, people might not be changing programs frequently, but with this app, I knew I would be switching between programs regularly, so I didn't want to have to perform a GET request every time.

I ended up having a lesson Array field for each Program. Whenever I want to add a lesson, which only the admin can do, I just POST to the array and its done.

As a user, the app just has to make one GET request which returns all the programs and their respective lessonArrays, so once you have the inital load done, its fast and overall a better experience.

### Frontend
Another interesting challenge was how to handle admins changing the order of lessons. Right away I thought it would be cool if the admin had a visual interface and could just drag and drop the lessons into any order they pleased. So thats what I did, using a jQuery library modifed to work with Angular (ui-sortable). 

An admin can go into each program, see the associated lessons, then drag and drop them into any order. Once he is satisifed, he just clicks save lesson order and its done.

I disabled this ability for non-admins, so the order is only up to them.


## Possible Improvements
If I were to continue working on this app, the next thing I would do would be to give lesson editing support to admins. This would be a nice feature for admins if they needed to make any changes to a video title or description and wouldn't be a huge task.

Another improvement I would make is a feature for users to check off lessons they have completed, which would either hide them or give them a different background color so they know they are done. 

Stemming off this, each program could have progress bars and as you complete the lessons in each program, the progress bar fills up. 