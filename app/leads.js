/* global $ */
/* global WindowsAzure */

$(function() {
    console.log("loading");
    var client = new WindowsAzure.MobileServiceClient('https://blocks.azure-mobile.net/', 'xnghPceVfNePtbzckrnLReQFTzyTcX70'),
        leads  = client.getTable('leads');

    // navigate to succes page
    function leadSent() {
        $("#leadsform").hide();
        $("#msgSent").show(1000);
    }

    function leadFailed(error) {
        console.log(error);
        $("#leadsform").show();
        $('#msgError').show();
    }

    // Handle insert
    $('#newlead').submit(function(evt) {
        $('#msgError').hide();
        var textbox = $('#email'),
            itemText = textbox.val();
        if (itemText !== '') {
            
            console.log("sending " + itemText);
            leads.insert({ email: itemText }).then(leadSent, leadFailed);
        }
        textbox.val('').focus();
        $("#leadsform").hide();
    
        evt.preventDefault();
    });

});