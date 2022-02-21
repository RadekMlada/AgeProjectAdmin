var age = age || {};

$(function () { 
    function showProjectDetail(projectDetail) {
        $('.navbar-nav').find('.active').toggleClass('active');
        $('#projectsNav').parent().addClass('active');
        window.location.hash = '#'+projectDetail.data.project.data.id;
        $('#project-detail').css('display', 'block');

        var projectDetailImage = $('#project-detail-main-image');

        var title = projectDetail.data.project.data.attributes.Title;
        var images = projectDetail.data.project.data.attributes.Images.data;

        if(images.length>0) {
            projectDetailImage.find('img').prop('src', images[0].attributes.url);
        }
        for(var i = 1; i < images.length; i++) {
            var ele = '<div><img src=\'' + images[i].attributes.url + '\'/></div>';
            $('#project-detail-images').append(ele);
        }
        projectDetailImage.find('h1').text(title);
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