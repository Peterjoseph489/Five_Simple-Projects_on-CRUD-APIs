const http = require('http');
PORT = 4004
const {getAllContacts, getOne, createContact, updateContact, deleteContact} = require('./bookController/bookController')


const app = http.createServer((req, res) => {
    if ( req.url === "/api/contacts" && req.method === "GET" ) {
        res.writeHead( 200, { "Content-Type": "application/json" } )
        getAllContacts( req, res );
    } else if ( req.url.match( /\/api\/contacts\/([0-9]+)/ ) && req.method === "GET" ) {
        res.writeHead( 200, { "Content-Type": "application/json" } )
        const id = req.url.split( '/' )[ 3 ];
        getOne( req, res, id );
    } else if ( req.url === "/api/contacts" && req.method === "POST" ) {
        res.writeHead( 201, { "Content-Type": "application/json" } );
        createContact( req, res );
    } else if ( req.url.match( /\/api\/contacts\/([0-9]+)/ ) && req.method === "PUT" ) {
        res.writeHead( 200, { "Content-Type": "application/json" } )
        const id = req.url.split( '/' )[ 3 ];
        updateContact( req, res, id );
    } else if ( req.url.match( /\/api\/contacts\/([0-9]+)/ ) && req.method === "DELETE" ) {
        res.writeHead( 200, { "Content-Type": "application/json" } )
        const id = req.url.split( '/' )[ 3 ];
        deleteContact( req, res, id );
    }
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})