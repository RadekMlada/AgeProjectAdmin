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

        var teamMembersData = age.teamMembersData;
        var teamMemberContainerTop = $('#content_teamMembersTop');
        var teamMemberContainer = $('#content_teamMembers');
        var tempI = 0;
        for(var i = 0; i < teamMembersData.length; i++) {
            var teamMember = teamMembersData[i];
            if(teamMember.attributes.MainDisplay == true) {
                var ele = $('<div class="atelier-member" style="background-image:url(\'' + teamMember.attributes.Avatar.data.attributes.url + '\')"><div ><label>'+ teamMember.attributes.Name +'</label><span>'+ teamMember.attributes.Position +'</span></div></div>')
                teamMemberContainerTop.append(ele);
            } else {
                teamMemberContainer.append((tempI++>0 ? ', ' : '') + teamMember.attributes.Name);
            }
        }

        var vacanciesData = age.vacanciesData;
        var vacanciesContainer = $('#content_careerPositions');
        for(var i = 0; i < vacanciesData.length; i++) {
            var vacancy = vacanciesData[i];
            var ele = $('<li>' + vacancy.attributes.Name + '</li>');
            vacanciesContainer.append(ele);
        }

        var achievementTypesData = age.achievementTypesData;
        var achievementsData = age.achievementsData;
        var achievementsContainer = $('#content_achievements');
        for(var i = 0; i < achievementTypesData.length; i++) {
            var achievementType = achievementTypesData[i];
            var achievementTypeName = achievementType.attributes.Name;
            var ele = $('<h1>' + achievementTypeName + '</h1>');
            achievementsContainer.append(ele);
            ele = $('<ul></ul>');
            achievementsContainer.append(ele);
            for(var j = 0; j < achievementsData.length; j++) {
                var achievement = achievementsData[j];
                if(achievement.attributes.Type.data.attributes.Name != achievementTypeName) {
                    continue;
                }
                var ele2 = $('<li><a href="' + achievement.attributes.Link + '">' + achievement.attributes.Name + '</a></li>');
                ele.append(ele2);
            }
        }
    }

    age.renderWebsiteContent = renderWebsiteContent;
}());