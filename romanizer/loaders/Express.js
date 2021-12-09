const bodyParser = require( "body-parser" );
const express = require( "express" );
const path = require( "path" );
const routes = require( "../routes/index" );
// const compression = require( "compression" );
const config = require( "../config" );

class ExpressLoader {
  constructor () {
    const app = express();

    // Setup error handling, this must be after all other middleware
    app.use( ExpressLoader.errorHandler );

    // Serve static content
    app.use( express.static( path.join( __dirname, "../public/" ) ) );

    // Set up middleware
    // app.use( compression() );
    app.use( bodyParser.urlencoded( {
      extended: false,
      limit: "20mb"
    } ) );
    app.use( bodyParser.json( { limit: "20mb" } ) );

    // Pass app to routes
    app.use('/', routes);


    // Start application
    this.server = app.listen( config.port, () => {
      console.log( `Express running, now listening on port ${config.port}` );
    } );
  }

  get Server () {
    return this.server;
  }

  /**
   * @description Default error handler to be used with express
   * @param error Error object
   * @param req {object} Express req object
   * @param res {object} Express res object
   * @param next {function} Express next object
   * @returns {*}
   */
  static errorHandler ( error, req, res, next ) {
    let parsedError;

    // Attempt to gracefully parse error object
    try {
      if ( error && typeof error === "object" ) {
        parsedError = JSON.stringify( error );
      } else {
        parsedError = error;
      }
    } catch ( e ) {
      console.error( e );
    }

    // Log the original error
    console.error( parsedError );

    // If response is already sent, don't attempt to respond to client
    if ( res.headersSent ) {
      return next( error );
    }

    res.status( 400 ).json( {
      success: false,
      error
    } );
  }
}

module.exports = ExpressLoader;
