using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace web.Controllers
{
    public class OAuth2SessionStateManager : DotNetAuth.OAuth2.IOAuth20StateManager
    {
        private readonly HttpSessionStateBase session;
        public OAuth2SessionStateManager(HttpSessionStateBase session)
        {
            this.session = session;
        }
        public string GetState()
        {
            session["tempStateCode"] = System.Guid.NewGuid().ToString();
            return session["tempStateCode"] as string;
            //return session.SessionID;
        }
        public bool CheckState(string stateCode)
        {
            //   return stateCode == session.SessionID;
            var expectedValue = session["tempStateCode"] as string;
            return expectedValue == stateCode;
        }
    }
}