var age = age || {};

$(function() {
    function loadWebsiteData() {
        $.get({
            url: '/api/website?populate=%2A',
            dataType: 'json',
            timeout: 60000,
            success:
                function (data) {
                    age.progressBar(100, 15, 'pageData1');
                    //console.log(data);
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
                    age.progressBar(100, 15, 'pageData2');
                    //console.log(data);
                    age.teamMembersData = data.data;
                },
    
            error: function () {
                var that = this;
                setTimeout(function () {
                    $.json(that);
                }, 1000);
            }
        });

        $.get({
            url: '/api/vacancies?populate=%2A',
            dataType: 'json',
            timeout: 60000,
            success:
                function (data) {
                    age.progressBar(100, 15, 'pageData3');
                    //console.log(data);
                    age.vacanciesData = data.data;
                },
    
            error: function () {
                var that = this;
                setTimeout(function () {
                    $.json(that);
                }, 1000);
            }
        });

        $.get({
            url: '/api/achievements?populate=%2A',
            dataType: 'json',
            timeout: 60000,
            success:
                function (data) {
                    age.progressBar(100, 5, 'pageData4');
                    console.log(data);
                    age.achievementsData = data.data;
                },
    
            error: function () {
                var that = this;
                setTimeout(function () {
                    $.json(that);
                }, 1000);
            }
        });

        $.get({
            url: '/api/achievement-types?populate=%2A',
            dataType: 'json',
            timeout: 60000,
            success:
                function (data) {
                    age.progressBar(100, 5, 'pageData5');
                    console.log(data);
                    age.achievementTypesData = data.data;
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