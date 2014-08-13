/* global $ */
/* global WindowsAzure */

$(function() {
    var client = new WindowsAzure.MobileServiceClient('https://blocks.azure-mobile.net/', 'xnghPceVfNePtbzckrnLReQFTzyTcX70'),
        leads  = client.getTable('leads');

    // navigate to succes page
    function leadSent() {
        
    }

    function leadFailed(error) {
        var text = error + (error.request ? ' - ' + error.request.status : '');
        $('#errorlog').append($('<li>').text(text));
    }

    // Handle insert
    $('#submit').submit(function(evt) {
        var textbox = $('#email'),
            itemText = textbox.val();
        if (itemText !== '') {
            leads.insert({ text: itemText, complete: false }).then(leadSent, leadFailed);
        }
        textbox.val('').focus();
        evt.preventDefault();
    });

});