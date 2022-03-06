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

        var vacanciesQuery = `query {
            vacancies {
            data {
              id,
              attributes {
                Description,
                Name,
                Avatar {
                  data {
                    attributes {
                      url
                    }
                  }
                },
                Projects {
                  data {
                    id,
                    attributes {
                      Title,
                      Images (pagination: { start: 1, limit: 1 }) {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                },
                Achievements {
                  data {
                    id,
                    attributes {
                      Name,
                      Link
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
          data: JSON.stringify({query: vacanciesQuery}),
          timeout: 60000,
            success:
                function (data) {
                    age.progressBar(100, 10, 'pageData3');
                    //console.log(data);
                    age.vacanciesData = data.data.vacancies.data;
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
                     Gallery (pagination: { start: 1, limit: 50 }) {
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
                    age.progressBar(100, 25, 'pageData6');
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
                    Projects (pagination: { start: 1, limit: 200 }) {
                       Title,
                      Project {
                        data {
                        id,
                          attributes {
                            Title,
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
                    age.progressBar(100, 25, 'pageData7');
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

        var projectDetailQuery = `query {
            project(id:#projectId) {
               data {
                id,
                attributes {
                  Title,
                  Description,
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
          }`;

        function loadProjectDetail(projectId, carouselElement, complete) {
            age.carouselLoader(carouselElement, null, null, true);
            console.log('loading project detail ' + projectId + ' started');
    
            var finish = function () {
                console.log('loading project detail finished');
                age.carouselLoaderEnd(carouselElement);
                if (complete) complete();
            }
    
            var result = $.post({
                url: '/graphql',
                contentType: 'application/json',
                data: JSON.stringify({query: projectDetailQuery.replace('#projectId', projectId)}),
                timeout: 60000,
                success:
                function (data) {
                    if (result.aborted) {
                        finish();
                        return;
                    }
    
                    age.scrollTop = $(document).scrollTop();
                    age.hideFullpage();
                    age.hideTeamPositionDetail();
                    age.showProjectDetail(data);
                    finish();
                    return;
                },
                error: function () {
                    var that = this;
                    setTimeout(function () {
                        $.jsonp(that);
                    }, 1000);
                }
            });
            var baseAbort = result.abort;
            result.abort = function () {
                result.aborted = true;
                finish();
                baseAbort.call(this);
            }
            return result;
        }
    
        age.loadProjectDetail = loadProjectDetail;
    }

    age.loadWebsiteData = loadWebsiteData;
}());