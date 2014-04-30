using System;
using System.Collections.Generic;
using System.Linq;
using DotNetAuth.OAuth2.Framework;
using RestSharp.Contrib;
using DotNetAuth.OAuth2;

namespace web.Controllers
{
    public class AsanaProvider : OAuth2ProviderDefinition
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="FacebookOAuth2"/> class.
        /// </summary>
        public AsanaProvider()
        {
            AuthorizationEndpointUri = "https://app.asana.com/-/oauth_authorize";
            TokenEndpointUri = "https://app.asana.com/-/oauth_token";
        }

        // overrides the default Authentication URL by removing the scope, Asana does not support scopes
        public override ParameterSet GetAuthorizationRequestParameters(ApplicationCredentials appCredentials, string redirectUri, string scope, IOAuth20StateManager stateManager)
        {
            return new ParameterSet(new Dictionary<string, string>{ 
                {"client_id", appCredentials.AppId},
                {"redirect_uri", redirectUri},
             // {"scope", scope},
                {"state", stateManager != null ? stateManager.GetState() : null},
                {"response_type", "code"},
            });
        }
        /// <summary>
        /// Parses the response body to request to access token.
        /// </summary>
        /// <param name="body">The response body of request for access token.</param>
        /// <returns>A <see cref="ProcessUserResponseOutput"/> object containing access token and some additional parameters or error details.</returns>
        public override ProcessUserResponseOutput ParseAccessTokenResult(string body)
        {
            var parsedResult = Newtonsoft.Json.Linq.JObject.Parse(body);
            var allParameters = new ParameterSet();
            foreach (var property in parsedResult.Properties())
            {
                Newtonsoft.Json.Linq.JToken tok;
                if (parsedResult.TryGetValue(property.Name, out tok))
                    allParameters.Add(property.Name, tok.ToString());
            }
            var accessToken = allParameters["access_token"];
            var expiresIn = allParameters["expires_in"];
            DateTime? expiresInDateTime = null;
            if (expiresIn != null)
            {
                var seconds = int.Parse(expiresIn);
                expiresInDateTime = DateTime.Now.AddSeconds(seconds);
            }
            var refreshToken = allParameters["refresh_token"];
            return new ProcessUserResponseOutput(allParameters, accessToken, expiresInDateTime, refreshToken);
        }
    
    }
}