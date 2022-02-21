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
                    $.get(that);
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
                    $.get(that);
                }, 1000);
            }
        });

        $.get({
            url: '/api/vacancies?populate=%2A',
            dataType: 'json',
            timeout: 60000,
            success:
                function (data) {
                    age.progressBar(100, 10, 'pageData3');
                    //console.log(data);
                    age.vacanciesData = data.data;
                },
    
            error: function () {
                var that = this;
                setTimeout(function () {
                    $.get(that);
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
                    age.achievementsData = data.data;
                },
    
            error: function () {
                var that = this;
                setTimeout(function () {
                    $.get(that);
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
                    age.achievementTypesData = data.data;
                },
    
            error: function () {
                var that = this;
                setTimeout(function () {
                    $.get(that);
                }, 1000);
            }
        });

        var homepageQuery = `query {
            website {
               data {
                 attributes {
                   Homepage {
                     Gallery {
                       Title,
                      Image {
                        data {
                          attributes {
                            url
                          }
                        }
                      },
                      Project {
                         data {
                          id
                        }
                      }
                    }
                  }
                }
              }
            }
          }`;

        $.post({
            url: '/graphql',
            contentType: 'application/json',
            data: JSON.stringify({query: homepageQuery}),
            timeout: 60000,
            success:
                function (data) {
                    age.progressBar(100, 50, 'pageData6');
                    console.log(data);
                    age.homepageData = data.data;
                },
    
            error: function (ex, message) {
                var that = this;
                setTimeout(function () {
                    $.post(that);
                }, 1000);
            }
              
        });

        var projectsQuery = `query {
            website {
               data {
                 attributes {
                   Projects {
                    Projects {
                       Title,
                      Project {
                        data {
                          attributes {
                            Images {
                              data {
                                attributes {
                                  url
                                }
                              }
                            }
                          }
                        }
                      }
                    } 
          
                  }
                }
              }
            }
          }`;

          $.post({
            url: '/graphql',
            contentType: 'application/json',
            data: JSON.stringify({query: projectsQuery}),
            timeout: 60000,
            success:
                function (data) {
                    age.progressBar(100, 50, 'pageData6');
                    console.log(data);
                    age.projectsData = data.data;
                },
    
            error: function (ex, message) {
                var that = this;
                setTimeout(function () {
                    $.post(that);
                }, 1000);
            }
              
        });
    }

    age.loadWebsiteData = loadWebsiteData;
}());