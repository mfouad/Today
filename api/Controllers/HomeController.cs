using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;


namespace web.Controllers
{
    public class HomeController : Controller
    {
        private string AccessToken
        {
            get { return (string)Session["TwitterAccessToken"]; }
            set { Session["TwitterAccessToken"] = value; }
        }
   
    }
}


