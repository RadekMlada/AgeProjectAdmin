var age = age || {};

$(function () { 
    function showProjectDetail(projectDetail) {
        $('.navbar-nav').find('.active').toggleClass('active');
        $('#projectsNav').parent().addClass('active');
        window.location.hash = '#'+projectDetail.id;
        $('#project-detail').css('display', 'block');
        var projectDetailImage = $('#project-detail-main-image');
        if(projectDetail.images.length>0) {
            projectDetailImage.find('img').prop('src', 'http://ageproject.radekmlada.com' + projectDetail.images[0].url);
        }
        for(var i = 1; i < projectDetail.images.length; i++) {
            var ele = '<div><img src=\'' + 'http://ageproject.radekmlada.com' + projectDetail.images[i].url + '\'/></div>';
            $('#project-detail-images').append(ele);
        }
        projectDetailImage.find('h1').text(projectDetail.name);
        $('body').css('background-color','#000');
    }

    function hideProjectDetail() {
        $('#project-detail').css('display', 'none');
        var projectDetailImage = $('#project-detail-main-image');
        projectDetailImage.find('img').prop('src', '');
        projectDetailImage.find('h1').text('');
        $('body').css('background-color','#ddd');
        $('#project-detail-images').html('');
    }
    
    age.showProjectDetail = showProjectDetail;
    age.hideProjectDetail = hideProjectDetail;
});