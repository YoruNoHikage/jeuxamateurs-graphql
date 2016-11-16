# JeuxAmateurs GraphQL API
GraphQL API plugged into the old MySQL database of [JeuxAmateurs](http://jeuxamateurs.fr) (French website about amateur games).

_Disclaimer: This was an experimentation to understand better how you can easily build a GraphQL schema using available tools. Of course, it isn't very optimized at all but I hope with this you can be inspired._

## Installation

Load `structure.sql`, fill it with data and run `npm install && npm start`. Here's your GraphQL API!. _Note that the structure is old and ugly, for testing and posterity only!_

## Interesting facts
### GraphQL comments as a documentation

GraphQL comments above the line can be used for documenting directly. Take a look at this:

```graphql
# My awesome type
type User {
  # This is a username
  username: String!
  # I shouldn't have exposed this
  password: String!
}
```

And the result in the GraphiQL editor: ![GraphiQL example for comments as a doc](https://cloud.githubusercontent.com/assets/969003/20368880/4456a2b4-ac56-11e6-86c1-e13a9c02725c.PNG).

### Exclamation mark inside Array

Yes it is possible and it means that the array shouldn't be null when you query it.
So `[Type]!` means you always get an array (empty or not), `[Type!]` is for a non-empty array or `null`, `[Type!]!` is always a non-empty array. Fun!