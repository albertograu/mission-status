
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

// Initialize express
const app = express(); 

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));