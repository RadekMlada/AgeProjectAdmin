var age = age || {};

$(function () { 
    var initProjectItem = function (projectId, title, imageUrl, container) {
        var item = "<a class='projectItem'><h3>" + title + "</h3>";
        item += "</a>";
        var element = item = $(item);
        item.css('backgroundImage', 'url(' + imageUrl + ')');
        item.click(function () {
            projectLoader = age.loadProjectDetail(projectId, element, function() { projectLoader = null; });
        });

        container.append(item);

        return item;
    }
    
    function renderProjectList(projects, container) {
        $.each(projects, function (i, project) {
            var imageUrl = project.attributes.Images.data[0].attributes.url;
            var title = project.attributes.Title;
            var projectId = project.id;
            initProjectItem(projectId, title, imageUrl, container);
        });

        setTimeout(function() {
            $(window).scrollTop(0);
            $(document).scrollTop(0);
        }, 250);
    }

    age.renderProjectList = renderProjectList;
}());