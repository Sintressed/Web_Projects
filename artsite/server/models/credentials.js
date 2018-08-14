
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
    clientId: '32899cd0e03b4f469ba46815592b5cb4',
    clientSecret: 'eb0a7bd36ec747799e94c29ce3219b4e',
});
    creden = (spotifyApi.clientCredentialsGrant().then(
        function(data) {
          console.log('The access token expires in ' + data.body['expires_in']);
          console.log('The access token is ' + data.body['access_token']);
      
          // Save the access token so that it's used in future calls
          spotifyApi.setAccessToken(data.body['access_token']);
          return 'done'
        },
        function(err) {
            return 'err'
          console.log(
            'Something went wrong when retrieving an access token',
            err.message
          );
        }
      )
    )
module.exports = creden;


