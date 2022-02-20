var age = age || {};

$(function() {
    function loadWebsiteData() {
        age.progressBar(100, 0, 'pageData');
        $.get({
            url: '/api/website?populate=%2A',
            dataType: 'json',
            timeout: 60000,
            success:
                function (data) {
                    age.progressBar(100, 50, 'pageData');
                    console.log(data);
                    age.websiteData = data.data;
                },
    
            error: function () {
                var that = this;
                setTimeout(function () {
                    $.json(that);
                }, 1000);
            }
        });

        $.get({
            url: '/api/Team-Members?populate=%2A',
            dataType: 'json',
            timeout: 60000,
            success:
                function (data) {
                    age.progressBar(100, 50, 'pageData');
                    console.log(data);
                    age.teamMembersData = data.data;
                },
    
            error: function () {
                var that = this;
                setTimeout(function () {
                    $.json(that);
                }, 1000);
            }
        });
    }

    age.loadWebsiteData = loadWebsiteData;
}());