var age = age || {};

$(function() {
    function createTextLinks(text) {
        text = (text || '').replace(/([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi, function (match, space, url) {
            var hyperlink = url;
            if (!hyperlink.match('^https?://')) {
                hyperlink = 'http://' + hyperlink;
            }
            return space + '<a href="' + hyperlink + '">' + url + '</a>';
        });
        var mailRegex = /([a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4})/ig
        text  = text.replace(mailRegex, "<a href='mailto:$1'>$1</a>");
        return text;
      }

    function renderWebsiteContent() {
        var data = age.websiteData;
        var table = {};

        table["aboutTitle"] = data.attributes.About.Title;
        table["aboutDescription"] = data.attributes.About.Description;
        table["careerTitle"] = data.attributes.Career.Title;
        table["careerPitch"] = data.attributes.Career.Pitch;
        table["careerContact"] = data.attributes.Career.Contact;
        table["contactPhone"] = data.attributes.Contact.Phone;
        table["contactEmail"] = data.attributes.Contact.Email;
        table["contactStreet"] = data.attributes.Contact.Street;
        table["contactCity"] = data.attributes.Contact.City;
        table["contactWebsite"] = data.attributes.Contact.Website;

        for(var key in table) {
            $('#content_'+key).html(createTextLinks(table[key]));
        }

    }

    age.renderWebsiteContent = renderWebsiteContent;
}());