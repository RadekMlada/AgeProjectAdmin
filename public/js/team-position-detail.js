var age = age || {};

$(function () { 
    var detailEleId = '#team-position-detail';
    var imageEleId = '#team-position-image';
    var projectsEleId = '#team-position-projects-content';
    var navEleId = '#careerNav';

    function showTeamPositionDetail(detail) {
        $('.navbar-nav').find('.active').toggleClass('active');
        $(navEleId).parent().addClass('active');
        window.location.hash = '#career/'+detail.id;
        var detailEle = $(detailEleId);
        detailEle.css('display', 'block');
        detailEle.find('h1').text(detail.attributes.Name);
        detailEle.find('pre').html(age.createTextLinks(detail.attributes.Description));
        age.detail = 'team-position';
        $(window).scrollTop(0);
        $(document).scrollTop(0);
        
        var detailImage = $(imageEleId);
        var image = detail.attributes.Avatar.data;

        if(image) {
            detailImage.find('img').prop('src', image.attributes.url);
            detailImage.css('display', 'block');
        } else {
            detailImage.css('display', 'none');
        }
        $('body').css('background-color','#000');

        if(detail.attributes.Projects.data && detail.attributes.Projects.data.length) {
            detailEle.find('h2').text('Naš projekty, které by vás mohli zaujmout');
            age.renderProjectList(detail.attributes.Projects.data, detailEle.find(projectsEleId));
        }
        else {
            detailEle.find('h2').text('');
        }

        setTimeout(function() {
            $(window).scrollTop(0);
            $(document).scrollTop(0);
        }, 250);
    }

    function hideTeamPositionDetail() {
        var detailEle = $(detailEleId);
        detailEle.css('display', 'none');
        detailEle.find('h1').text('');
        detailEle.find('pre').text('');
        detailEle.find('h2').text('');
        detailEle.find(projectsEleId).html('');
        if(age.detail == 'team-position')
            age.detail = '';
            
        var detailImage = $(imageEleId);
        detailImage.find('img').prop('src', '');
        $('body').css('background-color','#ddd');
    }
    
    age.showTeamPositionDetail = showTeamPositionDetail;
    age.hideTeamPositionDetail = hideTeamPositionDetail;
});