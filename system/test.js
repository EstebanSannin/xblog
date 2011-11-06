/*
 * bblog JS API
 *
 * Author: Stefano Viola (estebanSannin) 
 *  Email: stefanoviola85@gmail.com
 *
 */

var bblog = {

xmlDoc: '',

        getXml: function(xmlFile){
            if (window.XMLHttpRequest)
            {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp=new XMLHttpRequest();
            }
            else
            {
                // code for IE6, IE5
                var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.open("GET",xmlFile,false);
            xmlhttp.send();
            this.xmlDoc=xmlhttp.responseXML;
        }

};

bblog.getXml("menu.xml");
var title = bblog.xmlDoc.getElementsByTagName("title"); 


for(var i=0; i<title.length; i++)
{
    if(title[i].textContent != ""){
        document.getElementById("menu"+(i+1)).innerHTML=title[i].textContent;
        //modica valore href
        document.getElementById("menu"+(i+1)).href=bblog.xmlDoc.getElementsByTagName("url")[i].childNodes[0].nodeValue;
    }
}













