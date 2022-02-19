var age = age || {};

$(function () { 
    function showProjectDetail(projectDetail) {
        $('#project-detail').css('display', 'block');
        var projectDetailImage = $('#project-detail-main-image');
        if(projectDetail.images.length>0) {
            projectDetailImage.find('img').prop('src', 'http://ageproject.radekmlada.com' + projectDetail.images[0].url);
        }
        projectDetailImage.find('h1').text(projectDetail.name);
    }
    
    age.showProjectDetail = showProjectDetail;
});