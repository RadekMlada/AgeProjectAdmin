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

    age.createTextLinks = createTextLinks;

    function loadImage(url) {
        return $.Deferred(function (task) {
            var image = new Image();
            image.onload = function () { task.resolve(image); };
            image.onerror = function () { task.reject(); };
            image.src = url;
        }).promise();
    }

    function renderHome() {
        var bgContainer = $('#section0');
        var sectionName = 'home';
        var progressForFirstImage = 15;
        var firstPictureUrl = '';

        $.each(age.homepageData.website.data.attributes.Homepage.Gallery, function (i, image) {
            var imageUrl = image.Image.data.attributes.url;
            var projectId = image.Project.data ? image.Project.data.id : 0;

            if(i == 0)
                firstPictureUrl = imageUrl;

            var addInfo = "";
            // if (image.actionTitle && image.actionUrl) {
            //     addInfo = '<a><span class="row2"><span>' + image.actionTitle + '</span></span>' +
            //         '<span class="row1"><span class="fas fa-' + image.actionIcon + '"></span></span>' +
            //         '</a >';
            // }

            var background = $('<div class="slide slide' + i + '">' +
                '<div class="fill"></div>' +
                '<div class="news-list page-label">' + 
                addInfo +
                '</div>' +
                '<div class="page-label page-label-extended image-caption-' + sectionName + '"><a class="link"><span class="row2"><span>' + image.Title + '</span></span><span class="row1"><i class="fas fa-chevron-right"></i></span></a>' +
                '</div></div>');

            if(projectId) {
                background.find('a').click(function() {
                    age.loadProjectDetail(projectId);
                });
            }
            
            background.find('.fill').css('background-image', 'url(' + imageUrl + ')');
            if (i == 0) {
                background.addClass('active');
            }

            bgContainer.append(background);
        });

        loadImage(firstPictureUrl).done(function () {
            age.progressBar(100, progressForFirstImage, 'firstImage'+sectionName);
        });
    }

    var projectLoader = null;
    var initProjectItem = function (projectId, title, imageUrl) {
        var container = $('#projectListContainer');
        var item = "<a class='projectItem'><h3>" + title + "</h3>";
        item += "</a>";
        var element = item = $(item);
        item.css('backgroundImage', 'url(' + imageUrl.replace('image_', 'medium_image_') + ')');
        item.click(function () {
            age.scrollTop = $(document).scrollTop();
            projectLoader = age.loadProjectDetail(projectId, element, function() { projectLoader = null; });
        });

        container.append(item);

        return item;
    }
    

    function renderProjects() {
        $.each(age.projectsData.website.data.attributes.Projects.Projects, function (i, project) {
            var imageUrl = project.Project.data.attributes.Images.data[0].attributes.url;
            var title = project.Project.data.attributes.Title;
            var projectId = project.Project.data.id;
            initProjectItem(projectId, title, imageUrl);
        });
    }
    
    function renderWebsiteContent() {
        renderHome();
        renderProjects();
        
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
                var imageUrl = teamMember.attributes.Avatar.data ? teamMember.attributes.Avatar.data.attributes.url : '/images/head.png';
                var ele = $('<div class="atelier-member" style="background-image:url(\'' + imageUrl + '\')"><div ><label>'+ teamMember.attributes.Name +'</label><span>'+ teamMember.attributes.Position +'</span></div></div>')
                
                teamMemberContainerTop.append(ele);
            } else {
                teamMemberContainer.append((tempI++>0 ? ', ' : '') + teamMember.attributes.Name);
            }
        }

        var vacanciesData = age.vacanciesData;
        var vacanciesContainer = $('#content_careerPositions');
        for(var i = 0; i < vacanciesData.length; i++) {
            (function() { 
                var vacancy = vacanciesData[i];
                var ele = $('<li><a>' + vacancy.attributes.Name + '</a></li>');
                ele.find('a').click(function() {
                    age.hideFullpage();
                    setTimeout(function() {
                        age.showTeamPositionDetail(vacancy);
                    }, 10);
                });
                vacanciesContainer.append(ele);
            })();
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
                var ele2 = $('<li class="icon-' + achievement.attributes.Icon + '"><a href="' + achievement.attributes.Link + '">' + achievement.attributes.Name + '</a></li>');
                ele.append(ele2);
                if(achievement.attributes.Project) {
                    (function() { 
                        var project = achievement.attributes.Project;
                        ele2.find('a').click(function(e) {
                            age.loadProjectDetail(project.data.id);
                            e.preventDefault();
                    })})();
                }
            }
        }
    }

    age.renderWebsiteContent = renderWebsiteContent;
}());